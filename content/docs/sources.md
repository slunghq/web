---
title: Sources
index: 1
navGroup: Core Concepts
navGroupIndex: 2
metaTitle: Sources
description: Bring external payloads into Slung.
---

A source names an input and the components it can produce. The Wasm module declares source descriptors; the host opens the matching ingress route and invokes the declared mappers.

## Current transports

The current runtime supports two inbound transports:

| Transport | Default port | Route | Payloads |
|---|---:|---|---|
| WebSocket gateway | `2073` | `/<namespace>/<source>` | Text and binary frames |
| HTTP webhook | `2074` | `/<namespace>/<source>` | HTTP request body |

The route is source-level. It is not currently component-level, so this is not a supported route:

```text
/<namespace>/<source>/<component>
```

The host uses the source's registered mappers to decide which components accept the payload.

## Source declaration

A Rust SDK source declaration looks like this:

```rust
#[source(builtin = "ws")]
struct SensorData {
    #[component(map = parse_temperature)]
    temperature: Temperature,
}
```

The module exports metadata describing the source, its connector, its components, and each mapper. The host reads this metadata when the module is loaded.

## Mapping payloads

A mapper translates raw bytes into a serialized component value:

```rust
fn parse_temperature(raw: &[u8]) -> Result<Temperature> {
    let json: serde_json::Value = serde_json::from_slice(raw)?;

    Ok(Temperature {
        value: json["temperature"].as_f64().unwrap_or(0.0) as f32,
        unit: json["unit"].as_str().unwrap_or("C").to_string(),
        ts: json["ts"].as_u64().unwrap_or(0),
    })
}
```

A mapper failure is logged and the mapper's output is not written. A payload can be accepted by the transport while every mapper declines it.

## Data flow

```text
raw payload
  > route lookup
  > source buffer
  > mapper invocation
  > LWW active memory
  > dirty entry
  > inference loop
```

The host does not interpret application payloads. The mapper is the boundary between transport bytes and typed facts.

## Delivery semantics today

Ingress is currently in-memory and polling-based:

+ HTTP request bodies are copied into a source buffer.
+ WebSocket frames are copied into a source buffer.
+ A source currently retains one pending value rather than a durable message log.
+ A later payload can replace an earlier pending payload before polling.
+ There is no transport acknowledgment tied to WAL commit or cascade completion.
+ Retry, deduplication, authentication, and backpressure are not implemented.

Do not use the current webhook or gateway as a lossless queue until these semantics change.

## Planned integration work

The storage and connector layers are being extended with SQLite WAL persistence, durable pending work, retry state, idempotency, and OpenTelemetry instrumentation. Outbound WebSocket and HTTP clients are not part of the current runtime.
