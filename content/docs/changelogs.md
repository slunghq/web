---
title: Changelog
index: 2
navGroup: Misc
navGroupIndex: 4
metaTitle: Slung changelog
description: Changes to the Slung documentation and runtime.
---

## Unreleased

Slung is in alpha. This page records the current direction without presenting planned capabilities as shipped behavior.

### Current runtime

+ Wasm modules declare sources, components, and rules through exports.
+ Inbound HTTP webhook ingestion is available on port `2074` by default.
+ Inbound WebSocket gateway ingestion is available on port `2073` by default.
+ Payloads are mapped by Wasm functions into component values.
+ Component values enter an in-memory LWW registry and dirty queue.
+ The inference loop dispatches affected rules and follows transitive writes.
+ Outbound HTTP requests are available to Rust pipeline modules with request and response headers.
+ Node-local fact and pending-work durability uses a custom append-only WAL with eventual/strict modes, recovery, batching, and backpressure.
+ SQLite remains available for module-owned `slung_store_*` data.

### In progress

+ Native idempotency keys for source events, cascades, and outbound HTTP
+ Crash-injection coverage for WAL recovery and failure paths
+ Deterministic tie-breaking for equal-priority rules
+ OpenTelemetry traces, metrics, and correlated structured events
+ Graph and cascade inspection APIs
+ Connector retries and durable transport acknowledgments
+ OpenTelemetry traces, metrics, and correlated structured events

### Not currently shipped

+ Outbound WebSocket client connector

+ Production-ready NATS, Kafka, Postgres, or Redis connectors
+ Authentication and authorization for ingress routes
+ Lossless WebSocket or HTTP delivery
+ Distributed consensus through Raft
