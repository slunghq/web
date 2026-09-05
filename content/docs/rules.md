---
title: Rules
index: 3
navGroup: Core Concepts
navGroupIndex: 2
metaTitle: Rules
description: React to changed facts and produce derived facts.
---

Rules are Wasm functions that run when watched components become dirty. They read current component state and may write derived components.

## Declaring a rule

```rust
#[rule(
    watch = [SensorData::temperature, SensorData::humidity],
    priority = 5,
)]
fn on_sensor_update(ctx: &RuleContext) -> Result<()> {
    let temperature = ctx.get::<Temperature>(SensorData::temperature)?;
    let humidity = ctx.get::<Humidity>(SensorData::humidity)?;

    ctx.set(
        SensorData::status,
        SensorStatus::Ok {
            temperature: temperature.value,
            since: ctx.now(),
        },
    )?;

    Ok(())
}
```

`watch` declares which components can wake the rule. The host registers the watch list when it loads the module.

## Inference loop

The current loop is forward-chaining and dirty-driven:

```text
dirty component
  > capability graph lookup
  > candidate rules
  > priority ordering
  > Wasm dispatch
  > rule writes
  > new dirty components
```

A full run continues until no dirty work is observed or the configured maximum depth is reached.

## Ordering

Higher numeric priority is dispatched first among candidates for the same dirty entry.

A deterministic tie-break rule for equal priorities is not yet part of the runtime contract. Until it is implemented and tested, do not rely on the relative order of equal-priority rules.

LWW/HLC timestamps resolve competing fact writes. They are separate from rule dispatch order: the rule that runs first is not automatically the write that wins.

## Claims

The runtime has an in-memory claim register keyed by `(RuleId, EntityId)`. Claims prevent simultaneous duplicate dispatch across workers. Claim lifetime and per-cycle semantics are still being hardened; the current single-worker path should be treated as the reference behavior.

## Cascades and loops

A rule can create a cascade:

```text
Temperature changed
  > classify_temperature
  > SensorStatus changed
  > notify_operator
```

A loop can also be created:

```text
A changed
  > rule_ab writes B
  > rule_ba writes A
  > ...
```

The loop has a maximum-depth safety limit. Reaching the limit halts further evaluation for that run. A full causal execution trace and graph inspection API are planned as part of the OpenTelemetry and diagnostics work.

Rules should avoid unconditional writes. Compare the current value before writing, and make external effects idempotent.

## Rule context

The SDK context is intended to provide:

| Operation | Purpose |
|---|---|
| `ctx.get::<T>(component)` | Read current component state |
| `ctx.set(component, value)` | Write a derived component |
| `ctx.now()` | Obtain logical runtime time |
| `ctx.yield_now()` | Yield execution when supported |

Rules do not directly access transport sockets or the host's internal state.

## Errors

A mapper or rule error is reported by the host and does not yet constitute a durable retry contract. The WAL preserves source checkpoints and unfinished cascade work, but native idempotency and connector retry policy are still in progress.
