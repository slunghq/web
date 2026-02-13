<template>
    <div class="w-full py-4 flex flex-col items-center text-[#010101]">
        <div class="w-[calc(100%-2.125rem)] md:w-[calc(100%-7.75rem)]">
            <div class="w-full flex justify-between items-center gap-0">
                <div
                    class="flex flex-col items-center justify-between py-8 px-6 gap-2 w-full bg-white"
                    id="navigation-items"
                >
                    <h1 class="text-2xl">Roadmap</h1>
                    <span class="inline-block w-full">
                        Here's what we've been up to. Help with reaching our
                        goals sooner will be greatly appreciated! If you want to
                        contribute, kindly check our
                        <nuxt-link
                            class="link inline-block"
                            to="https://github.com/slunghq/slung/issues"
                        >
                            <span class="font-semibold" data-text="open issues">
                                open issues</span
                            > </nuxt-link
                        >.
                    </span>
                </div>
            </div>
            <div
                class="flex flex-col gap-3 justify-start items-center py-4 min-h-100 w-full bg-[#eae7e3]"
                id="navigation-items-bottom"
            >
                <nuxt-link
                    v-for="i in items"
                    :to="i.url"
                    class="flex flex-col items-center justify-between py-4 px-6 gap-2 w-[calc(100%-1.5rem)] bg-[#faf8f4] hover:bg-[#fcf4f0]"
                    id="navigation-top-left-bottom-right"
                >
                    <h1 class="text-xl w-full">{{ i.title }}</h1>
                    <span class="inline-block w-full">
                        {{ i.description }}
                    </span>
                    <div class="w-full flex font-[Intel]">
                        <div
                            class="bg-[#eae7e3] text-[#010101] px-2 pb-1 border lowercase text-sm"
                            v-if="i.status == 'planned'"
                        >
                            {{ i.status }}
                        </div>
                        <div
                            class="bg-[#94ec94] text-[#010101] px-2 pb-1 border lowercase text-sm"
                            v-else-if="i.status == 'done'"
                        >
                            {{ i.status }}
                        </div>
                        <div
                            class="bg-[#ecdc94] text-[#010101] px-2 pb-1 border lowercase text-sm"
                            v-else-if="i.status == 'in-progress'"
                        >
                            {{ i.status }}
                        </div>
                        <div
                            class="bg-[#ea8888] text-[#010101] px-2 pb-1 border lowercase text-sm"
                            v-else
                        >
                            {{ i.status }}
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script setup>
useSeoMeta({
    title: "Roadmap",
    ogTitle: "Roadmap",
    description: "What are we working on next?",
    ogDescription: "What are we working on next?",
    // ogImage: "/hero.png",
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
        status: "in-progress",
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
        status: "deferred",
    },
];
</script>
