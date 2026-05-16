---
title: Quickstart
index: 2
navGroup: Overview
navGroupIndex: 1
metaTitle: Quickstart
description: Write and run your first Slung module.
---

Slung modules are Wasm binaries. You write rules in Rust using the SDK macros, compile to Wasm, and point the host at the binary. The host discovers everything it needs from the module's exports — no config files, no manual registration.

## 1. Install Slung

Grab a binary from the [releases page](https://github.com/slunghq/slung/releases) and place it in your `$PATH`.

To build from source you need [Zig](https://ziglang.org/) and [Nix](https://nixos.org/):

```bash
nix develop -c zig build --release=fast
cp ./zig-out/bin/slung .
```

## 2. Write a module

Create a new Rust project and add the SDK:

```toml [Cargo.toml]
[dependencies]
slung = "0.1.0"

[profile.release]
opt-level = "z"
lto = true
```

A module has three parts: **sources**, **components**, and **rules**.

```rust [src/main.rs]
use slung::prelude::*;

// Source — declares the entity and which connector to use.
// Each field is a component this source produces.
#[source(builtin = "ws")]
struct SensorData {
    #[component(map = parse_temperature)]
    temperature: Temperature,

    #[component(map = parse_humidity)]
    humidity: Humidity,

    #[component]
    status: SensorStatus,
}

// Components — typed fact payloads.
#[component]
struct Temperature {
    value: f32,
    unit: String,
    ts: u64,
}

#[component]
struct Humidity {
    value: f32,
    unit: String,
    ts: u64,
}

#[component]
enum SensorStatus {
    Ok { temp: f32, humidity: f32, since: u64 },
    Alert { reason: String, since: u64 },
}

// Mappers — translate raw WebSocket bytes into typed component values.
fn parse_temperature(raw: &[u8]) -> Result<Temperature> {
    let json: serde_json::Value = serde_json::from_slice(raw)?;
    Ok(Temperature {
        value: json["temperature"].as_f64().unwrap_or(0.0) as f32,
        unit: json["unit"].as_str().unwrap_or("C").to_string(),
        ts: json["ts"].as_u64().unwrap_or(0),
    })
}

fn parse_humidity(raw: &[u8]) -> Result<Humidity> {
    let json: serde_json::Value = serde_json::from_slice(raw)?;
    Ok(Humidity {
        value: json["humidity"].as_f64().unwrap_or(0.0) as f32,
        unit: "%".to_string(),
        ts: json["ts"].as_u64().unwrap_or(0),
    })
}

// Rules — fire when watched components go dirty.
#[rule(watch = [SensorData::temperature, SensorData::humidity], priority = 5)]
fn on_sensor_update(ctx: &RuleContext) -> Result<()> {
    let temp = ctx.get::<Temperature>(SensorData::temperature)?;
    let humidity = ctx.get::<Humidity>(SensorData::humidity)?;

    let status = if temp.value > 40.0 {
        SensorStatus::Alert {
            reason: format!("temperature critical: {:.1}°{}", temp.value, temp.unit),
            since: ctx.now(),
        }
    } else {
        SensorStatus::Ok {
            temp: temp.value,
            humidity: humidity.value,
            since: ctx.now(),
        }
    };

    ctx.set(SensorData::status, status)?;
    Ok(())
}

fn main() {}
```

## 3. Compile to Wasm

```bash
cargo build --target wasm32-wasip1 --release
```

## 4. Run the host

```bash
slung run \
  --module ./target/wasm32-wasip1/release/my_module.wasm \
  --namespace default \
  --node-id node-1 \
  --ws-port 2073
```

The host scans the module's exports, opens the WebSocket gateway on port `2073`, and registers the ingress route at `/<namespace>/<source>/<component>`. Rules start firing as soon as data arrives.

## 5. Send data

Stream JSON frames to the WebSocket gateway:

```bash
wscat -c ws://localhost:2073/default/SensorData/Temperature
> {"temperature": 42.5, "unit": "C", "ts": 1700000000}
```

The host calls the mapper, writes the result to active memory, signals dirty, and dispatches `on_sensor_update` — all within the same cycle.

> Only Rust is supported today. Additional SDK languages are on the [roadmap](/roadmap).
