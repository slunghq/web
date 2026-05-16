---
title: Sources
index: 1
navGroup: Core Concepts
navGroupIndex: 2
metaTitle: Sources
description: How external data enters the engine.
---

A source declares an external data connection and the components it produces. The host opens and manages the actual connection — modules never do I/O directly.

## Declaring a source

The `#[source]` macro compiles to a descriptor export the host reads at load time. The `builtin` attribute selects the connector.

```rust [src/main.rs]
#[source(builtin = "ws")]
struct SensorData {
    #[component(map = parse_temperature)]
    temperature: Temperature,

    #[component(map = parse_humidity)]
    humidity: Humidity,
}
```

The host mints a static `EntityId` for the source, opens the connection, and registers each component field in the capability graph.

## Connectors

| Connector | `builtin` value | Notes |
|-----------|----------------|-------|
| WebSocket | `ws` | Ingress frames routed by `/<namespace>/<source>/<component>` |
| NATS | `nats` | Subscribe to a subject |
| Kafka | `kafka` | Consumer group polling |
| Redis | `redis` | Pub/Sub channel subscription |
| Postgres | `pg` | Table polling or LISTEN/NOTIFY |
| HTTP | `http` | Request/response |
| TCP | `tcp` | Raw stream |
| UDP | `udp` | Raw datagrams |

## Mappers

Each component field that carries a `map` attribute causes the SDK to emit a mapper export. The host calls it whenever new data arrives, passing the raw bytes and an output buffer:

```rust [src/main.rs]
fn parse_temperature(raw: &[u8]) -> Result<Temperature> {
    let json: serde_json::Value = serde_json::from_slice(raw)?;
    Ok(Temperature {
        value: json["temperature"].as_f64().unwrap_or(0.0) as f32,
        unit: json["unit"].as_str().unwrap_or("C").to_string(),
        ts: json["ts"].as_u64().unwrap_or(0),
    })
}
```

If the mapper returns an error the host discards the frame — no partial writes to active memory.

## Data flow

```
raw bytes arrive on source connection
  -> host looks up the component mapper
  -> calls mapper(raw_ptr, raw_len, out_ptr, out_len)
  -> mapper deserializes raw bytes into the component type
  -> host writes serialized value to active memory
  -> signals dirty: (EntityId, ComponentId)
  -> inference loop wakes, dispatches affected rules
```

The mapper is the precise boundary between raw source data and the typed facts the engine reasons about. The host never interprets source bytes directly.

## Dynamic entities

Setting `dynamic = true` on a component field tells the host the mapper returns an `EntityKey` alongside the component value. The host mints a distinct `EntityId` per key — so different instances of the same source become separate entities with independent component state and rule invocations.

```rust [src/main.rs]
#[source(builtin = "ws")]
struct SensorData {
    #[component(map = parse_reading, dynamic = true)]
    reading: Reading,
}
```

When `dynamic` is false (the default) all incoming data for that component writes to the single static `EntityId` minted for the source.
