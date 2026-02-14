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

const blogImages = import.meta.glob("~/assets/img/blog/*", {
    eager: true,
    import: "default",
}) as Record<string, string>;

const getHeroImage = (hero: string | undefined): string => {
    if (!hero) return "/blog-placeholder.png";
    const matchingKey = Object.keys(blogImages).find((k) =>
        k.endsWith(`/assets/img/blog/${hero}`),
    );
    return matchingKey ? blogImages[matchingKey] : "/placeholder.png";
};

useSeoMeta({
    title: `${post.value.title} | Blogs & Insights`,
    ogTitle: `${post.value.title} | Blog & Insights`,
    description: post.value.description || "Slung Blog Post",
    ogDescription: post.value.description || "Slung Blog Post",
    ogImage: post.value.hero || "/default.png",
    twitterCard: "summary_large_image",
    twitterSite: "@slunghq",
});
</script>

<template>
    <div class="w-full py-20">
        <div class="px-5">
            <!-- Two-column layout for desktop -->
            <div class="flex flex-col gap-12">
                <!-- Main content -->
                <article
                    class="prose prose-invert container mx-auto grow max-w-3xl"
                >
                    <div class="mb-8 text-[#886655] text-sm">
                        <span class="mr-3" v-if="post.date">{{
                            formatDate(post.date)
                        }}</span>
                        /
                        <nuxt-link
                            to="/blog"
                            class="uppercase font-semibold inline-flex items-center ml-1 px-2 link"
                        >
                            <span>Blog</span>
                        </nuxt-link>
                    </div>

                    <div v-if="post">
                        <!-- Post header -->
                        <div class="mb-10">
                            <h1
                                class="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-3"
                            >
                                {{ post.title }}
                            </h1>

                            <h2 class="text-xl mb-8">
                                {{ post.description }}
                            </h2>

                            <!-- Featured image -->
                            <div
                                v-if="post.hero"
                                class="mb-8 rounded-xl overflow-visible"
                            >
                                <img
                                    :src="getHeroImage(post.hero)"
                                    :alt="post.title"
                                    class="h-auto w-full object-cover"
                                />
                            </div>
                        </div>

                        <!-- Post content -->
                        <div class="blog-content-wrapper">
                            <ContentRenderer
                                :value="post"
                                class="blog-content"
                            />
                        </div>

                        <!-- Post footer -->
                        <div
                            class="mt-16 pt-8 border-t border-[#4e0d0b] flex justify-between"
                        >
                            <div
                                class="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4"
                            >
                                <nuxt-link
                                    to="/blog"
                                    class="uppercase font-semibold inline-flex items-center link px-2 text-sm h-full"
                                >
                                    <span> // all posts </span>
                                </nuxt-link>
                            </div>
                            <div class="font-semibold inline">
                                Share:
                                <nuxt-link
                                    :to="`https://x.com/intent/post?url=https://slung.tech${encodeURIComponent($route.fullPath)}`"
                                    class="inline-flex items-center link px-1 text-sm h-full"
                                >
                                    <span
                                        >X
                                        <span class="line-through"
                                            >Twitter</span
                                        ></span
                                    >
                                </nuxt-link>
                                <nuxt-link
                                    :to="`https://www.linkedin.com/sharing/share-offsite/?url=https://slung.tech${encodeURIComponent($route.fullPath)}`"
                                    class="inline-flex items-center link px-1 text-sm h-full"
                                >
                                    <span>LinkedIn</span>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>
