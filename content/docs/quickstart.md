---
title: Quickstart
index: 2
navGroup: Overview
navGroupIndex: 1
metaTitle: Quickstart
description: Write a Slung module, compile it to Wasm, and run it.
---

This guide builds a small sensor module from scratch. The module accepts JSON over WebSocket, maps it into typed components, and derives a sensor status when the temperature changes.

You need:

+ [Rust](https://www.rust-lang.org/tools/install)
+ The `wasm32-wasip1` Rust target
+ [Zig](https://ziglang.org/) if building the Slung host from source
+ A WebSocket client such as [`wscat`](https://github.com/websockets/wscat)

## 1. Build the host

From the Slung repository:

```bash
zig build
```

This produces the host binary at `zig-out/bin/slung`.

## 2. Create a module

Create a Rust binary crate outside the Slung repository:

```bash
cargo new sensor-module
cd sensor-module
rustup target add wasm32-wasip1
```

Add the SDK and serialization dependencies to `Cargo.toml`:

```toml
[package]
name = "sensor-module"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = { version = "1", features = ["derive"] }
serde_json = "1"
slung = "0.2.1"

[profile.release]
opt-level = "z"
lto = true
```

For local SDK development, replace the published dependency with a path to the SDK checkout:

```toml
slung = { path = "../slung/sdks/pipeline/rust" }
```

## 3. Declare a source

Replace `src/main.rs` with:

```rust
use slung::prelude::*;

#[source(builtin = "ws")]
struct SensorData {
    // This becomes the source route component used by the host.
    #[config(value = "sensor-data")]
    path: &'static str,

    #[component(map = parse_temperature)]
    temperature: Temperature,

    #[component]
    status: SensorStatus,
}
```

A source declaration describes an input and the components it can produce. The `#[source]` macro emits a descriptor that the host discovers when it loads the Wasm module.

The `#[config]` field is source metadata. It does not become a component. Each `#[component]` field is a fact associated with the source entity.

## 4. Define components

Add the types produced by the source and derived by the rule:

```rust
#[component]
struct Temperature {
    value: f32,
    unit: String,
    ts: u64,
}

#[component]
enum SensorStatus {
    Ok { temperature: f32, since: u64 },
    Alert { reason: String, since: u64 },
}
```

`#[component]` emits type metadata for the host. Structs contain named fields; enums represent named states and can carry data.

## 5. Write a mapper

The mapper turns raw transport bytes into a typed component value:

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

The host calls this mapper for incoming payloads. If the mapper returns an error, that component is not written.

## 6. Write a rule

Rules watch source components and can write derived components:

```rust
#[rule(watch = [SensorData::temperature], priority = 10)]
fn on_temperature_update(ctx: &RuleContext) -> Result<()> {
    let temperature = ctx.get::<Temperature>(SensorData::temperature)?;

    let status = if temperature.value > 40.0 {
        SensorStatus::Alert {
            reason: format!(
                "temperature is high: {:.1}°{}",
                temperature.value, temperature.unit
            ),
            since: ctx.now(),
        }
    } else {
        SensorStatus::Ok {
            temperature: temperature.value,
            since: ctx.now(),
        }
    };

    ctx.set(SensorData::status, status)?;
    Ok(())
}

fn main() {}
```

`watch` is the list of components that can wake the rule. `priority` orders candidate rules for the same dirty entry; equal-priority ordering is not currently guaranteed.

`ctx.get` reads the current fact. `ctx.set` writes a derived fact, signals it as dirty, and may wake another rule.

## 7. Compile the module

From the module directory:

```bash
cargo build --target wasm32-wasip1 --release
```

The module is now at:

```text
target/wasm32-wasip1/release/sensor-module.wasm
```

The host does not need a separate registration file. It discovers source, component, mapper, and rule descriptors from the module's Wasm exports.

## 8. Run the module

From the Slung repository, point the host at the compiled module:

```bash
./slung run \
  --module /absolute/path/to/sensor-module/target/wasm32-wasip1/release/sensor-module.wasm \
  --namespace default \
  --node-id node-1 \
  --ws-port 2073 \
  --http-port 2074
```

The current host opens:

+ WebSocket gateway: `0.0.0.0:2073`
+ HTTP webhook listener: `0.0.0.0:2074`

The source route is:

```text
/<namespace>/<source>
```

For this module:

```text
/default/SensorData
```

## 9. Send an event

Connect with `wscat`:

```bash
wscat -c ws://localhost:2073/default/SensorData
```

Send a text frame:

```json
{"temperature":42.5,"unit":"C","ts":1700000000}
```

The runtime processes it as:

```text
WebSocket frame
  > SensorData source
  > parse_temperature mapper
  > Temperature fact
  > dirty signal
  > on_temperature_update
  > SensorStatus fact
```

You can send the same payload through the HTTP webhook:

```bash
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{"temperature":42.5,"unit":"C","ts":1700000000}' \
  http://localhost:2074/default/SensorData
```

## Current limitations

The quickstart demonstrates the current alpha runtime, not a lossless production ingestion path:

+ HTTP and WebSocket ingress use in-memory source buffers.
+ A successful HTTP response does not yet mean that the fact is durably stored.
+ A source currently has one pending value rather than a durable message queue.
+ Outbound HTTP is available to pipeline modules; outbound WebSocket clients are not implemented.
+ SQLite WAL recovery and OpenTelemetry cascade tracing are being integrated.

Continue with [Sources](/docs/sources) to understand ingress, [Components](/docs/components) to model state, and [Rules](/docs/rules) to understand cascades.
