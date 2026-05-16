---
title: Components
index: 2
navGroup: Core Concepts
navGroupIndex: 2
metaTitle: Components
description: Typed fact payloads and active memory.
---

Components are typed algebraic payloads attached to entities. They are the facts the engine reasons about. Every write to a component is timestamped, causally tagged, and stored in the LWW (last-write-wins) active memory store.

## Declaring a component

The `#[component]` macro declares the type and emits the descriptor export the host reads at load time.

**Struct components** carry named fields:

```rust [src/main.rs]
#[component]
struct Temperature {
    value: f32,
    unit: String,
    ts: u64,
}
```

**Enum components** carry typed variants:

```rust [src/main.rs]
#[component]
enum SensorStatus {
    Ok { temp: f32, humidity: f32, since: u64 },
    Alert { reason: String, since: u64 },
}
```

## Reading and writing

Rules read and write components through `RuleContext`. The host handles all serialization across the Wasm boundary — no raw pointers or JSON in rule code.

```rust [src/main.rs]
#[rule(watch = [SensorData::temperature], priority = 10)]
fn on_temperature(ctx: &RuleContext) -> Result<()> {
    // read a component from active memory
    let temp = ctx.get::<Temperature>(SensorData::temperature)?;

    // derive a new fact and write it back
    let status = if temp.value > 40.0 {
        SensorStatus::Alert {
            reason: format!("critical: {:.1}°{}", temp.value, temp.unit),
            since: ctx.now(),
        }
    } else {
        SensorStatus::Ok {
            temp: temp.value,
            humidity: 0.0,
            since: ctx.now(),
        }
    };

    ctx.set(SensorData::status, status)?;
    Ok(())
}
```

`ctx.set` writes the component back to active memory. The host stamps a causal tag and signals dirty — which can trigger further rules in the same inference cycle.

## Active memory

Active memory is an LWW (last-write-wins) CRDT store. Every component write carries:

- **EntityId** — which entity this fact belongs to
- **ComponentId** — which component type
- **CausalTag** — what caused the write (component, entity, node, timestamp)

The causal tag is used by the inference loop for inhibition — preventing conflicting rules from firing based on what triggered the change.

## Lifecycle

Components have no explicit lifecycle. They exist as long as the entity exists. When a module is unloaded the host retires all `EntityId` and `ComponentId` values minted by that module and removes their entries from active memory.
