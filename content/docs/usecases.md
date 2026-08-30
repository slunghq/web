---
title: Use cases
index: 3
navGroup: Overview
navGroupIndex: 1
metaTitle: Use cases
description: Where Slung fits and where it does not.
---

Slung is for systems where the important question is not “which step runs next?” but “what is true now, and what computation should that change trigger?”

## Good fits

### Reactive state derivation

An incoming event updates a fact. Rules derive status, eligibility, risk, routing, or other facts from the current state of an entity.

```text
raw event
  > current state
  > derived status
  > downstream decision
```

### Monitoring and alerting

Sensor readings and service signals become components. Rules can derive thresholds, health states, and notifications as facts change.

### Local edge decisions

The runtime is a single native binary and rule modules are Wasm binaries. This makes the core suitable for local decisions near the data source, subject to the current alpha limitations around durability and delivery.

### Event-fed entity state

Several event types can update different components of one entity. A rule can read the current combination without manually wiring a chain of callbacks.

## Current ingress

Today, the practical ingress paths are:

+ HTTP POST webhooks
+ WebSocket text frames
+ WebSocket binary frames

The current runtime does not yet provide production queue semantics, outbound WebSocket clients, or fully implemented NATS, Kafka, Postgres, and Redis connectors. Outbound HTTP is available to pipeline modules, but does not yet provide durable delivery, automatic retries, or idempotency guarantees.

## Poor fits today

Slung is not currently a replacement for:

+ A durable workflow engine with built-in retries and compensation
+ A lossless message broker
+ A general-purpose HTTP API server
+ A distributed consensus store
+ A complete stream processor with windows and joins
+ A job scheduler with durable task history

Those systems can complement Slung. For example, a queue can provide durable delivery while Slung handles fact derivation and reactive decisions.

## Choosing Slung

Slung is a good candidate when:

+ Facts change asynchronously
+ Rules should react to current entity state
+ Derived facts naturally form cascades
+ You want rule modules isolated behind Wasm
+ A lightweight host is valuable

Wait until the durability and delivery work is complete when you need acknowledged, lossless ingestion or guaranteed replay of in-flight work.
