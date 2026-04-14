<template>
    <div class="w-full py-8 px-0 flex flex-col gap-8">
        <div
            class="flex flex-col items-start py-16 px-6 mt-8 gap-4"
            id="navigation-items"
        >
            <h1 class="text-2xl font-bold">Blogs & Insights</h1>
            <p class="text-base">
                We write essays just as well as we write code. Keep up with the
                latest news and insights from us.
            </p>
        </div>
        <div
            v-if="posts.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
            <Motion
                as="div"
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ staggerChildren: 0.1 }"
                class="contents"
            >
                <BlogCard
                    v-for="(post, index) in posts"
                    :key="post.path || index"
                    :post="post"
                    :index="index"
                />
            </Motion>
        </div>
        <div
            v-else
            class="flex justify-center items-center min-h-[400px] w-full text-base"
        >
            // We've not written anything, yet :)
        </div>
    </div>
</template>

<script setup>
const posts = await queryCollection("blog").order("date", "DESC").all();

useSeoMeta({
    title: "Blogs & Insights",
    ogTitle: "Blog & Insights",
    description: "Keep up with the latest news and insights from Slung.",
    ogDescription: "Keep up with the latest news and insights from Slung.",
    twitterCard: "summary_large_image",
    twitterSite: "@slunghq",
});
</script>
