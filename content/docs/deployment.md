---
title: Deployment and configuration
index: 3
navGroup: Overview
navGroupIndex: 2
metaTitle: Slung deployment and configuration
description: Configure and run Slung in development and deployment environments.
---

Slung has two host-side modes:

+ `slung dev` runs one module for local development.
+ `slung run` starts the deployment supervisor and its configured runtime services.

Both modes load `slung.toml` from the current directory by default. Select another file with `--config`.

## Install the host

Download the latest release binary from the [GitHub Releases page](https://github.com/slunghq/slung/releases), place it in the project directory, and make it executable.

If you need to build the host from source, use Zig's optimized build and copy the binary into the project directory:

```bash
zig build --release=fast
cp zig-out/bin/slung .
```

## Minimal configuration

```toml
version = 1

[run]
module = "target/wasm32-wasip1/release/my_module.wasm"
namespace = "orders"

[deployment]
node_id = "node-1"
ws_port = 2073
http_port = 2074
discovery_port = 2072

[storage]
path = "data/slung.db"
durability = "eventual"
```

The WAL is separate from SQLite. `storage.path` is the SQLite database used by module-owned `slung_store_*` data; the fact and pending-work WAL is stored alongside it with the `.slung.wal` suffix.

## Durability modes

`eventual` is the default. The runtime queues source and cascade checkpoints and continues execution without waiting for the WAL commit. It provides high throughput, but a process or machine failure can lose records still waiting in the WAL queue.

`strict` waits for the WAL write and sync before the operation succeeds. Use it when the caller must know that the source checkpoint has reached durable storage. It adds storage latency and reduces throughput.

Configure it in TOML:

```toml
[storage]
durability = "strict"
```

For local development or an emergency deployment override:

```bash
./slung dev --module module.wasm --durability strict
./slung run --durability eventual
```

The command-line value overrides `[storage].durability`. Valid values are `eventual` and `strict`.

## Development

```bash
./slung dev \
  --module target/wasm32-wasip1/release/my_module.wasm \
  --namespace orders \
  --durability eventual
```

The development host exposes the WebSocket gateway on `2073` and the HTTP webhook listener on `2074` by default. Override either port with `--ws-port` or `--http-port`.

## Deployment

Build a Wasm module for the host ABI:

```bash
cargo build --target wasm32-wasip1 --release
```

Run a local deployment:

```bash
./slung run --config slung.toml
```

Deploy a module to a deployment endpoint:

```bash
./slung deploy \
  --module target/wasm32-wasip1/release/my_module.wasm \
  --namespace orders \
  --target http://127.0.0.1:2072
```

The deployment command sends the Wasm module and configuration envelope to the target. Configure deployment-side durability in the target's `slung.toml`; a client-side deploy command does not change the target's storage policy.

## Operational files

Keep the SQLite database and `.slung.wal` on persistent local storage. Do not place them on an ephemeral container filesystem if restart recovery matters. Back up or rotate them according to the node's recovery policy; deleting the WAL while the database is running can discard pending fact work.

The current runtime is single-node. Transport authentication, distributed replication, and exactly-once external effects are not provided by deployment configuration.

See [Sources](/docs/sources) for ingress routes, [ABI](/docs/abi) for the Wasm contract, and [FAQ](/docs/faq) for durability trade-offs.
