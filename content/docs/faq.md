---
title: FAQ
index: 1
navGroup: Misc
navGroupIndex: 4
metaTitle: FAQ
description: Common questions about Slung.
---

## How is this different from a workflow engine like Temporal?

Temporal models work as explicit sequences of steps with durable execution guarantees. Slung has no concept of steps or sequences — rules fire based on facts, and the order of execution is determined by what data has arrived, not what you prescribed in advance. Slung is for workloads where the shape of computation is dynamic and driven by real-time facts. For predictable linear processes with retries and saga semantics, Temporal is the better fit.

## How is this different from a stream processor like Flink?

Flink is built around data pipelines with explicit windowing, joins, and state backends. Slung is built around an entity model — facts attach to entities, and rules fire per entity when their watched components go dirty. There is no windowing and no explicit join syntax; the capability graph handles fact composition implicitly. Slung is also significantly lighter to deploy — a single binary versus a JVM cluster.

## Can I write rules in a language other than Rust?

Not yet. Rust is the only supported SDK today. Because modules compile to Wasm with a C-compatible ABI, any language that can target `wasm32-wasip1` is a candidate. Additional SDKs are on the [roadmap](/roadmap).

## What happens if a rule crashes?

A panicking rule exits its Wasm instance. The host catches the trap, logs the failure, and releases the claim for that `(RuleId, EntityId)` pair so the next cycle can retry. Active memory is not affected by a crashed rule — writes are only committed if the rule returns successfully.

## Can two rules write to the same component?

Yes. The LWW store resolves conflicts by causal timestamp — the most recent write wins. The causal inhibition system also prevents a lower-priority rule from overwriting a fact written by a higher-priority rule in the same cycle.

## How does the host discover what a module needs?

At load time the host sweeps the module's Wasm exports for three descriptor namespaces: `__slung_source_*_descriptor`, `__slung_component_*_descriptor`, and `__slung_rule_*_descriptor`. No init function is called. The module is fully self-describing from its exports.

## Is there a size limit on modules?

No hard limit. The host loads the Wasm binary into memory once and instantiates it per worker. Larger modules use more memory per worker instance. In practice, rule modules tend to be small — the SDK macros emit minimal glue code and the Wasm target with `opt-level = "z"` and LTO produces compact binaries.
