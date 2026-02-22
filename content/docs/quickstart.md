---
title: Quickstart
index: 2
navGroup: Overview
navGroupIndex: 1
metaTitle: Quickstart
description: Get started with Slung.
---

Slung is pretty straightforward to use. All you need to do is set up your environment, pick up the [SDKs](https://github.com/slunghq/slung/tree/main/sdks), write and compile your workflow pipeline to Wasm, and run. Let's walk you through how to do this.

1. **Set up your local environment**

The hardware requirement for running is relatively low. All you need is a machine with at least 1 GB of RAM, a CPU with at least free 1 core, and a place to store your data (data ratio is about 8.7MB/1M events).

Now, we should have existing binaries for Slung provided on our [release page](https://github.com/slunghq/slung/releases). Grab one of the binaries for your platform and place it in your `$PATH`. If you're on Windows, we have first class support as well but we recommend using [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) for a better experience.

If you want to build Slung from source, it's pretty simple:

+ Make sure you have [Zig](https://ziglang.org/), and [Nix](https://nixos.org/) installed.
+ Clone the [repository](https://github.com/slunghq/slung) locally.
+ Then run the following commands.

```bash
nix develop -c zig build --release=fast
cp ./zig-out/bin/slung .
```

2. **Write your workflow pipeline**

Create a new Rust project and add our SDK to the `Cargo.toml` file.

```toml [Cargo.toml]
[dependencies]
slung = "0.1.0"
```

Write a simple workflow that subscribes to live stream updates and compares against a threshold.

```rust [main.rs] 
use slung::prelude::*;

#[main]
fn main() -> Result<()> {
    // Subscribe to live stream updates.
    let handle = query_live("SUM:temp:[sensor=1]")?;
    poll_handle(handle, on_event, 100.0)?;

    Ok(())
}

fn on_event(event: Event, alert_threshold: f64) -> Result<()> {
    // Compare against baseline in real-time
    if event.value > alert_threshold {
        for producer in event.producers {
            // Write back to producers
            writeback_ws(producer, "ALERT: threshold exceeded")?;
        }
    }

    Ok(())
}
```

Compile your workflow pipeline to Wasm and run Slung.

```bash
cargo build --target wasm32-wasi --release
cp ./target/wasm32-wasi/release/main.wasm .
# use --wasm flag to point to the Wasm file
slung --wasm main.wasm
```

> We currently only support writing workflows in [Rust](https://docs.rs/slung), with plans to support other languages soon.

3. **Create a data source**

To stream data to your workflow, we recommend using our [Typescript client SDK](https://github.com/slunghq/slung/tree/main/sdks/clients/typescript) or writing one yourself (see the [streaming API](/docs/streaming#api)).

Write a simple data publisher that streams events to your workflow:

```typescript [index.ts]
import { SlungClient } from "../src/index.ts";

async function main(): Promise<void> {
  const client = new SlungClient(
    process.env.SLUNG_WS_URL ?? "ws://127.0.0.1:2077",
  );
  await client.connect();

  console.log("connected to slung websocket");
  console.log("sending simulated events every 10ms");

  const stop = client.startSimulatedStream({
    intervalMs: 10,
    initialValue: 90,
    jitter: 1.2,
    series: "temp",
    tags: ["sensor=1", "env=dev", "service=api"],
  });

  const shutdown = () => {
    stop();
    client.close(1000, "shutdown");
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

Set up your Node project and run the publisher.

```bash
npm install ./slung/sdks/clients/typescript
npx tsx index.ts
```

You can now plug in your own data source to stream events to a custom workflow! :tada:
