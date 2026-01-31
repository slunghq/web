<template>
    <div class="w-full py-4 flex flex-col items-center text-[#010101]">
        <div class="w-[calc(100%-2.125rem)] md:w-[calc(100%-7.75rem)]">
            <div class="w-full flex justify-between items-center gap-0">
                <div
                    class="flex flex-col items-center justify-between py-16 px-6 mt-8 gap-2 w-full"
                    id="navigation-items"
                >
                    <h1 class="text-3xl">Blogs & Insights</h1>
                    <span class="inline-block w-full text-center">
                        We write essays just as well as we write code. Keep up
                        with the latest news and insights from us.
                    </span>
                </div>
            </div>
            <div class="flex justify-center items-center min-h-100 w-full">
                // We've not written anything, yet :)
            </div>
        </div>
    </div>
</template>

<script setup>
useSeoMeta({
    title: "Blogs & Insights",
    ogTitle: "Blog & Insights",
    description: "Keep up with the latest news and insights from Slung.",
    ogDescription: "Keep up with the latest news and insights from Slung.",
    // ogImage: "/hero.png",
    twitterCard: "summary_large_image",
    twitterSite: "@slunghq",
});
</script>
