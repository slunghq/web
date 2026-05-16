<template>
    <div class="w-full py-8 px-0 flex flex-col gap-8">
        <div
            class="flex flex-col items-start py-8 px-6 gap-4"
            id="navigation-items"
        >
            <h1 class="text-2xl font-bold">Roadmap</h1>
            <p class="text-base">
                Building a distributed dataflow engine with durable, composable
                rules. We're building the foundation first, then scaling up.
                Want to help? Check our
                <nuxt-link
                    class="link inline-block"
                    to="https://github.com/slunghq/slung"
                >
                    <span class="font-semibold">GitHub</span>
                </nuxt-link>
                .
            </p>
        </div>
        <div class="flex flex-col gap-6 w-full">
            <nuxt-link
                v-for="i in items"
                :to="i.url"
                class="flex flex-col items-start justify-start gap-3 py-4 px-4 bg-[#faf8f4] hover:bg-[#fcf4f0]"
                id="navigation-top-left-bottom-right"
            >
                <div class="flex items-start justify-between w-full gap-4">
                    <h2 class="font-semibold flex-1 text-lg">{{ i.title }}</h2>
                    <div class="font-[Intel] text-xs flex-shrink-0">
                        <span
                            class="px-2 py-1 border text-xs"
                            :class="{
                                'bg-[#eae7e3] text-[#010101]':
                                    i.status === 'planned',
                                'bg-[#94ec94] text-[#010101]':
                                    i.status === 'done',
                                'bg-[#ecdc94] text-[#010101]':
                                    i.status === 'in-progress',
                                'bg-[#ea8888] text-[#010101]':
                                    i.status === 'deferred',
                            }"
                        >
                            {{ i.status }}
                        </span>
                    </div>
                </div>
                <p class="text-base">{{ i.description }}</p>
            </nuxt-link>
        </div>
    </div>
</template>

<script setup>
useSeoMeta({
    title: "Roadmap",
    ogTitle: "Roadmap",
    description: "What are we working on next?",
    ogDescription: "What are we working on next?",
    twitterCard: "summary_large_image",
    twitterSite: "@slunghq",
});

const items = [
    {
        title: "Core Abstractions",
        description:
            "Core types, memory primitives (CRDT-based LWW store), dirty signal queue, and capability graph indices for rule discovery.",
        url: "https://github.com/slunghq/slung",
        status: "done",
    },
    {
        title: "Module Loading",
        description:
            "Wasm descriptor parsing, graph builder, and host ABI context injection. Parse Rust-compiled modules; populate forward/reverse indices deterministically.",
        url: "https://github.com/slunghq/slung",
        status: "done",
    },
    {
        title: "Generic ABI",
        description:
            "Implement slung_get, slung_set, slung_now, slung_emit. Core read/write interface between Wasm rules and distributed state. Blocker for inference loop.",
        url: "https://github.com/slunghq/slung",
        status: "done",
    },
    {
        title: "Rust SDK",
        description:
            "High-level API for writing rules: #[rule], #[source], #[component] macros with type-safe context and built-in serialization.",
        url: "https://github.com/slunghq/slung",
        status: "in-progress",
    },
    {
        title: "Inference Loop",
        description:
            "Single-worker dirty -> graph -> dispatch -> write cycle. Subscribe to dirty signal; discover affected rules; execute in priority order; merge results.",
        url: "https://github.com/slunghq/slung",
        status: "in-progress",
    },
    {
        title: "Connector ABI",
        description:
            "HTTP, WebSocket, NATS, Kafka, Redis, TCP/UDP socket APIs. Let rules ingest from and emit to external systems.",
        url: "https://github.com/slunghq/slung",
        status: "in-progress",
    },
    {
        title: "Concurrency (Multi-Worker)",
        description:
            "Worker pool per namespace with shared state, atomic claims, and concurrent rule execution without data loss or duplication.",
        url: "https://github.com/slunghq/slung",
        status: "planned",
    },
    {
        title: "Distributed Coordination",
        description:
            "Multi-node cluster, CRDT replication, cross-node dirty signal propagation, distributed claims, and module broadcasting.",
        url: "https://github.com/slunghq/slung",
        status: "deferred",
    },
    {
        title: "Additional SDKs (C, Zig, Go)",
        description:
            "Language bindings and code generation for writing rules in C, Zig, Go, and other languages.",
        url: "https://github.com/slunghq/slung",
        status: "deferred",
    },
];
</script>
