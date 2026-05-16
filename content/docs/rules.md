---
title: Rules
index: 3
navGroup: Core Concepts
navGroupIndex: 2
metaTitle: Rules
description: How rules watch components and fire.
---

Rules are functions that fire when the components they watch become dirty. The engine dispatches rules automatically — no polling, no explicit triggers.

## Declaring a rule

```rust [src/main.rs]
#[rule(
    watch = [SensorData::temperature, SensorData::humidity],
    priority = 5,
)]
fn on_sensor_update(ctx: &RuleContext) -> Result<()> {
    let temp = ctx.get::<Temperature>(SensorData::temperature)?;
    let humidity = ctx.get::<Humidity>(SensorData::humidity)?;

    ctx.set(SensorData::status, SensorStatus::Ok {
        temp: temp.value,
        humidity: humidity.value,
        since: ctx.now(),
    })?;

    Ok(())
}
```

`watch` is the list of components that will wake this rule. The rule fires once per dirty cycle for each entity that has at least one watched component go dirty.

## Priority

Rules with a higher `priority` value fire first within a cycle. When multiple rules watch the same component, priority determines execution order. Rules at the same priority level are unordered relative to each other.

```rust [src/main.rs]
// fires before on_sensor_update (priority 5)
#[rule(watch = [SensorData::temperature], priority = 10)]
fn on_temperature_update(ctx: &RuleContext) -> Result<()> { ... }
```

## The inference loop

On each cycle the engine:

1. Dequeues a dirty entry `(EntityId, ComponentId)`
2. Looks up affected rules via the capability graph — O(1) hash map lookup
3. Filters rules by claim availability, orders by priority
4. Checks causal tags — inhibits conflicting rules based on what caused the change
5. Dispatches rules to the Wasm runtime
6. Rule writes re-enter active memory and can extend the current cycle
7. Cycle terminates at stable state or max depth

## Claims

Claims prevent duplicate rule execution across concurrent workers. A claim is an atomic CAS on a `(RuleId, EntityId)` register. Within a node this is a cheap in-memory operation. A rule that cannot acquire its claim is skipped for that cycle — another worker holds it.

## Rule context

`RuleContext` is the only interface rules have to the engine:

| Method | Description |
|--------|-------------|
| `ctx.get::<T>(Source::component)` | Read a component from active memory |
| `ctx.set(Source::component, value)` | Write a component to active memory |
| `ctx.now()` | Current logical timestamp |
| `ctx.yield_now()` | Yield execution back to the scheduler |

Rules have no access to raw entity IDs, raw memory, or the host ABI directly. All reads and writes go through the context and cross the Wasm boundary via the host's serialization layer.

## Cycle detection

Before a module goes live the host walks the capability graph looking for rules that watch components they also write to. A rule that creates an unconditional write loop is flagged at registration time, not discovered at runtime.
