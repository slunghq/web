<template>
    <div class="w-full py-8 px-0 flex flex-col gap-8">
        <div
            class="flex flex-col items-start py-8 px-6 gap-4"
            id="navigation-items"
        >
            <h1 class="text-2xl font-bold">Roadmap</h1>
            <p class="text-base">
                Here's what we've been up to. Help with reaching our goals
                sooner will be greatly appreciated! If you want to contribute,
                kindly check our
                <nuxt-link
                    class="link inline-block"
                    to="https://github.com/slunghq/slung/issues"
                >
                    <span class="font-semibold">open issues</span>
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
        title: "Stream pipeline",
        description:
            "System in-charge of managing and processing websocket streams.",
        url: "https://github.com/slunghq/slung/issues/1",
        status: "in-progress",
    },
    {
        title: "TSM tree",
        description:
            "Time-structured merge tree. A timeseries optimised tree with a fast row-based memtable and a columnar disk format.",
        url: "https://github.com/slunghq/slung/issues/2",
        status: "done",
    },
    {
        title: "Parallel data query engine",
        description:
            "Processes the temporal data from the stream and feeds it to the main compute execution. Sits between the ingestion pipeline, TSM and Wasm runtime.",
        url: "https://github.com/slunghq/slung/issues/3",
        status: "in-progress",
    },
    {
        title: "Wasm execution",
        description:
            "Runs multi-tenanted durable functions that consume processed stream data and accesses TSM tree.",
        url: "",
        status: "done",
    },
    {
        title: "Gateway",
        description:
            "Authenticated gateway and more streaming primitives for handling incoming data streams. Right now, we have plans for NATS and Kafka.",
        url: "",
        status: "planned",
    },
    {
        title: "Object storage sync",
        description: "Sync local data to the cloud with S3 or R2.",
        url: "",
        status: "planned",
    },
    {
        title: "Write-ahead log (WAL)",
        description:
            "Ensures durability and consistency by logging system operations before commiting them.",
        url: "",
        status: "deferred",
    },
    {
        title: "WebTransport",
        description:
            "Fast, effecient, secure transport protocol over UDP. Replaces websocket for streams.",
        url: "",
        status: "planned",
    },
];
</script>
