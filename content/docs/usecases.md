---
title: Use cases
index: 3
navGroup: Overview
navGroupIndex: 1
metaTitle: Use cases
description: Where Slung fits.
---

Slung is a good fit anywhere you have facts changing asynchronously and decisions that need to adapt in real time — without the overhead of orchestrating explicit step sequences.

## Real-time alerting and monitoring

Sensor readings, service metrics, or infrastructure events arrive as component updates. Rules fire immediately when thresholds are crossed, derived facts are computed, and downstream rules react — all within a single inference cycle, without polling.

## Event-driven automation

Replace chains of webhooks and queued jobs with rules that watch the exact components that signal readiness. When all the facts a rule needs are present and consistent, it fires. No explicit coordination between steps.

## Stream processing pipelines

Multiple sources (WebSocket, NATS, Kafka, Redis) feed data into a shared fact space. Rules compose naturally — one rule's output becomes another's input. The capability graph tracks these dependencies at registration time, not at runtime.

## Edge compute

Slung ships as a single binary with no runtime dependencies. Deploy it to edge nodes, container sidecars, or IoT gateways where data lives. Modules are portable Wasm binaries — the same rule set runs anywhere the host runs.

## Stateful rule engines

Facts persist in active memory across events. Rules can read prior state, compare it against new arrivals, and derive conclusions without re-querying the source. The LWW store provides a consistent, causally-tagged snapshot of the world.

## What it is not

Slung is not a general-purpose workflow engine. It does not model sequential steps, retries, or durable sagas. If your workload is a predictable linear process with explicit failure handling, a workflow engine is probably the right tool. Slung is for workloads where the order of decisions is determined by the facts, not prescribed in advance.
