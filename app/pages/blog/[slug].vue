<script setup lang="ts">
const formatDate = (date: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const slug = useRoute().params.slug;
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
    return queryCollection("blog").path(`/blog/${slug}`).first();
});

useSeoMeta({
    title: `${post.value?.title || "Blog"} | Blogs & Insights`,
    ogTitle: `${post.value?.title || "Blog"} | Blog & Insights`,
    description: post.value?.description || "Slung Blog Post",
    ogDescription: post.value?.description || "Slung Blog Post",
    ogImage: post.value?.hero || "/default.png",
    twitterCard: "summary_large_image",
    twitterSite: "@slunghq",
});
</script>

<template>
    <div class="w-full py-8 px-0 flex flex-col gap-8">
        <article class="w-full">
            <div class="mb-8 text-[var(--accent-secondary)] text-xs">
                <span class="mr-3" v-if="post?.date">{{
                    formatDate(post.date || "")
                }}</span>
                /
                <nuxt-link
                    to="/blog"
                    class="uppercase font-semibold inline-flex items-center ml-1 px-2 link text-xs"
                >
                    <span>Blog</span>
                </nuxt-link>
            </div>

            <div v-if="post">
                <!-- Post header -->
                <div class="mb-10">
                    <h1 class="text-lg font-bold mb-3">
                        {{ post.title }}
                    </h1>

                    <h2 class="text-sm text-[var(--accent-secondary)] mb-8">
                        {{ post.description }}
                    </h2>

                    <!-- Featured image -->
                    <div v-if="post.hero" class="mb-8 overflow-hidden">
                        <img
                            :src="post.hero"
                            :alt="post.title"
                            class="h-auto w-full object-cover"
                        />
                    </div>
                </div>

                <!-- Post content -->
                <div class="blog-content-wrapper">
                    <ContentRenderer :value="post" class="blog-content" />
                </div>

                <!-- Post footer -->
                <div
                    class="mt-16 pt-8 border-t border-[var(--border-default)] flex justify-between flex-col sm:flex-row gap-4"
                >
                    <nuxt-link
                        to="/blog"
                        class="uppercase font-semibold inline-flex items-center link px-2 text-xs h-fit"
                    >
                        <span> // all posts </span>
                    </nuxt-link>
                    <div class="font-semibold inline flex gap-2 text-xs">
                        <span>Share:</span>
                        <nuxt-link
                            :to="`https://x.com/intent/post?url=https://slung.tech${encodeURIComponent($route.fullPath)}`"
                            class="inline-flex items-center link px-1 h-full mx-2"
                        >
                            <span>X <span class="line-through">Twitter</span></span>
                        </nuxt-link>
                        <nuxt-link
                            :to="`https://www.linkedin.com/sharing/share-offsite/?url=https://slung.tech${encodeURIComponent($route.fullPath)}`"
                            class="inline-flex items-center link px-1 h-full"
                        >
                            <span>LinkedIn</span>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>
