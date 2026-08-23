---
title: Components
index: 2
navGroup: Core Concepts
navGroupIndex: 2
metaTitle: Components
description: Model typed facts attached to entities.
---

A component is a typed fact about an entity. Components are the values that sources produce, rules read, and rules derive.

Examples include:

+ `Temperature { value, unit, timestamp }`
+ `OrderStatus::Backlogged { reason, since }`
+ `PaymentState::Authorized { provider_id }`

## Component types

Struct components carry named fields:

```rust
#[component]
struct Temperature {
    value: f32,
    unit: String,
    ts: u64,
}
```

Enum components represent a finite set of states and can carry data:

```rust
#[component]
enum SensorStatus {
    Ok { temperature: f32, since: u64 },
    Alert { reason: String, since: u64 },
}
```

The SDK emits a component descriptor. The host uses it to understand the type at the Wasm serialization boundary.

## Entities and components

A source normally creates a static entity. Its declared component fields are attached to that entity:

```text
SensorData entity
  ├── Temperature component
  ├── Humidity component
  └── SensorStatus component
```

Dynamic entity mapping is part of the descriptor design, but should be treated as evolving until it is covered by an end-to-end test in the host.

## Reading and writing

Rules access components through their rule context:

```rust
#[rule(watch = [SensorData::temperature], priority = 10)]
fn on_temperature(ctx: &RuleContext) -> Result<()> {
    let temperature = ctx.get::<Temperature>(SensorData::temperature)?;

    let status = if temperature.value > 40.0 {
        SensorStatus::Alert {
            reason: "temperature is high".to_string(),
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
```

A successful `set` updates active memory and signals the component as dirty. That signal can wake downstream rules.

## Active memory

The current host uses an in-memory last-write-wins registry. Each entry contains:

+ The serialized component value
+ An HLC timestamp
+ A causal tag identifying the originating component/entity/node

LWW comparison gives competing writes a total timestamp order. It does not by itself provide durable storage or distributed consensus.

SQLite WAL storage is being added as the node-local durability layer. Until that work is complete, active memory should be treated as process-local state.

## Fact changes

A component is not dirty merely because a rule reads it. It becomes dirty when an accepted source or rule write signals it. The capability graph maps that dirty `(entity, component)` pair to candidate rules.

The runtime does not yet promise transactional rule side effects. Rules that interact with external systems should use idempotency keys and an outbox once those facilities are available.
