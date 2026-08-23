---
title: FAQ
index: 1
navGroup: Misc
navGroupIndex: 4
metaTitle: Slung FAQ
description: Frequently asked questions about Slung.
---

<AccordionFamily>

<Accordion title="What is Slung?" default-open>

Slung is a Wasm-hosted reactive compute runtime. Sources produce typed component facts, and rules run when watched facts change.

</Accordion>

<Accordion title="Is Slung a workflow engine?">

No. A workflow describes an explicit sequence of steps. Slung describes facts and dependencies between facts. It is a better fit for changing, stateful systems where the next computation depends on what is true now.

A workflow engine remains a better fit for durable task orchestration, compensations, human approvals, and explicit retry histories.

</Accordion>

<Accordion title="What is supported today?">

The current host supports:

+ Self-describing Wasm module loading
+ Source, component, and rule descriptors
+ Inbound HTTP webhooks
+ Inbound WebSocket frames
+ Wasm mappers
+ In-memory LWW active state with HLC timestamps
+ Dirty-driven inference and transitive rule writes
+ A basic maximum-depth safety limit

</Accordion>

<Accordion title="Are events durable?">

Not yet. The current HTTP and WebSocket ingress path uses in-memory source buffers and an in-memory dirty queue. A process crash can lose buffered events and in-flight inference work.

SQLite WAL is the planned node-local durability layer. Until it is integrated into the write and pending-work path, a transport response is not a durability acknowledgment.

</Accordion>

<Accordion title="What does an HTTP 200 mean?">

Currently it means that a non-empty request body was received for a registered route and copied into the in-memory source buffer. It does not mean that mapping, fact storage, WAL commit, or rule execution succeeded.

</Accordion>

<Accordion title="Are WebSocket messages lossless?">

No. The current implementation has a single pending source value rather than a durable per-connection message queue. Do not use it for lossless delivery yet.

</Accordion>

<Accordion title="How are rules ordered?">

Rules are selected through a precomputed capability graph and sorted by priority, with higher values first. Equal-priority ordering is not currently guaranteed. LWW/HLC ordering resolves competing writes independently of dispatch order.

</Accordion>

<Accordion title="What happens when rules loop?">

The inference loop stops when it converges or reaches its maximum depth. A complete causal trace and cycle diagnosis are planned through OpenTelemetry instrumentation and runtime inspection APIs.

</Accordion>

<Accordion title="What observability is available?">

The runtime currently has basic log output. OpenTelemetry traces, metrics, and correlated structured events are planned for cascade diagnosis, connector retries, WAL recovery, and queue health. The documented OTel port should not be interpreted as a complete telemetry implementation yet.

</Accordion>

<Accordion title="Can rules make HTTP or WebSocket requests?">

Not currently. Inbound HTTP and WebSocket gateway support exists; outbound client connectors are not implemented.

</Accordion>

<Accordion title="Which languages can produce modules?">

The runtime consumes Wasm modules. The Rust SDK is the current supported SDK. Other languages are possible if they can emit the expected descriptor exports, mapper exports, rule entrypoints, and Wasm ABI.

</Accordion>

<Accordion title="Does Slung replace a database?">

No. Active memory is the runtime's working fact state. SQLite is being introduced for node-local durability. Distributed replication and conflict resolution remain separate concerns from local crash recovery.

</Accordion>

</AccordionFamily>
