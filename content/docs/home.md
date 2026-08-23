---
title: Welcome to Slung
index: 1
navTitle: Overview
metaTitle: Welcome to Slung
description: A lightweight runtime that turns changing facts into reactive task execution.
---

Slung is a runtime for systems that react to changing facts.

You describe:

+ **Sources** — where events enter the runtime
+ **Components** — typed facts attached to entities
+ **Rules** — code that runs when facts change

Slung loads a self-describing Wasm module, maps incoming payloads into facts, and evaluates only the rules affected by each change.

## Start here

[Quickstart](/docs/quickstart) — run the example module and send an event.

[Sources](/docs/sources) — understand HTTP and WebSocket ingestion.

[Components](/docs/components) — model typed facts and active state.

[Rules](/docs/rules) — define reactive computation and cascades.

## The execution model

A rule can write another fact. That write becomes another dirty entry and can continue the cascade until the queue is empty or the configured safety limit is reached.

## Current status

Slung is alpha software. The current host provides inbound HTTP webhook and WebSocket gateway ingestion, a Wasm module loader, active in-memory LWW state, and a dirty-driven inference loop.

SQLite WAL durability, OpenTelemetry instrumentation, outbound connectors, authentication, and production delivery guarantees are being built around this core. Do not treat an HTTP `200` or a WebSocket frame receipt as a durable acknowledgment yet.

[Use cases](/docs/usecases) — decide whether the model fits your system.

[FAQ](/docs/faq) — common questions and current limitations.


[Changelog](/docs/changelogs) — What's new.

[GitHub](https://github.com/slunghq/slung) — Contribute to Slung.
