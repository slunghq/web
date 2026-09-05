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

Node-local fact and pending-work durability is now provided by an append-only WAL. Source checkpoints and completed cascade checkpoints are queued for persistence; the runtime executes cascades in memory.

Eventual mode returns after enqueueing, so a crash can lose records still waiting in the WAL queue. Strict mode waits for the WAL commit and `fsync`. A transport response is not automatically a durability acknowledgment.

### Eventual vs. strict WAL durability

**Eventual durability** prioritizes throughput and latency. The runtime updates active memory and queues the WAL record, then continues without waiting for disk. The WAL writer batches queued records and commits them in the background. A process or machine failure can lose records that have not yet been committed, and a sustained producer faster than the WAL can drain will encounter backpressure.

**Strict durability** prioritizes recovery guarantees. The operation does not complete until its WAL record has been written and synced to disk. Once it succeeds, the checkpoint can be recovered after a process restart, but each strict operation pays storage latency and can reduce throughput.

Both modes can retry a completed cascade after a crash. Neither mode makes external effects such as HTTP exactly-once; those operations need idempotency keys.

</Accordion>

<Accordion title="What does an HTTP 200 mean?">

Currently it means that the request was accepted by the registered route. It does not by itself mean that mapping, WAL commit, or rule execution succeeded. Use strict durability when the caller must wait for the source checkpoint.

</Accordion>

<Accordion title="Are WebSocket messages lossless?">

No. The transport layer is not a durable per-connection message queue, and delivery is not lossless. The WAL protects accepted runtime checkpoints, but transport buffering and acknowledgment semantics are still alpha.

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

<Accordion title="Can rules make HTTP requests?">

Yes. Rust pipeline modules can use the outbound HTTP host API:

```rust
let response = slung::host::http::get(
    "http://service.internal/status",
    &[("X-Request-ID", "order-123")],
)?;

if response.status == 200 {
    // response.body contains the response bytes.
    // response.headers contains (name, value) pairs.
}
```

`http::get`, `http::post`, `http::put`, and `http::delete` accept request headers. Responses expose the actual HTTP status code, response headers, and body. A transport failure returns an error; an HTTP error response such as `404` or `500` is still returned as a response.

The connector does not yet provide automatic retries or native idempotency guarantees. Outbound requests may be repeated after recovery; use an application idempotency key. WebSocket client requests are not implemented.

</Accordion>

<Accordion title="Which languages can produce modules?">

The runtime consumes Wasm modules. The Rust SDK is the current supported SDK. Other languages are possible if they can emit the expected descriptor exports, mapper exports, rule entrypoints, and Wasm ABI.

</Accordion>

<Accordion title="Does Slung replace a database?">

No. Active memory is the runtime's working fact state, restored from the node-local append-only WAL after a restart. SQLite is retained for module-owned `slung_store_*` data. Distributed replication and conflict resolution remain separate concerns from local crash recovery.

</Accordion>

</AccordionFamily>
