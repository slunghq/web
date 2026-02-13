<template>
    <div class="flex justify-center items-center h-screen w-full">// Docs</div>
</template>

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
const { data: doc } = await useAsyncData(`docs-${slug}`, () => {
    return queryCollection("docs").path(`/docs/${slug}`).first();
});

const docsImages = import.meta.glob("~/assets/img/docs/*", {
    eager: true,
    import: "default",
}) as Record<string, string>;

const getHeroImage = (hero: string | undefined): string => {
    if (!hero) return "/docs-placeholder.png";
    const matchingKey = Object.keys(docsImages).find((k) =>
        k.endsWith(`/assets/img/docs/${hero}`),
    );
    return matchingKey ? docsImages[matchingKey] : "/placeholder.png";
};

useSeoMeta({
    title: `${doc.value.meta.metaTitle || doc.value.title} | Documentation`,
    ogTitle: `${doc.value.meta.metaTitle || doc.value.title} | Documentation`,
    description:
        doc.value.description ||
        "Build and deploy durable data streaming applications.",
    ogDescription:
        doc.value.description ||
        "Build and deploy durable data streaming applications.",
    ogImage: doc.value.hero || "/default.png",
    twitterCard: "summary_large_image",
    twitterSite: "@slunghq",
});
</script>
