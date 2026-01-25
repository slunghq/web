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
                        Here's what we'll be up to in a few. Help with reaching
                        our goals sooner will be greatly appreciated! If you
                        want to contribute, kindly check our
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
                class="flex justify-center items-center min-h-100 w-full bg-[#eaeaea]"
                id="navigation-items-bottom"
            >
                // Roadmap
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
</script>
