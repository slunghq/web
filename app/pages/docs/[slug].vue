<script setup lang="ts">
definePageMeta({
    layout: "docs",
});

const route = useRoute();
const slug = computed(() => String(route.params.slug || "home"));
const docPath = computed(() => `/docs/${slug.value}`);
const docsSourcePath = computed(() => `content/docs/${slug.value}.md`);

const { data: doc } = await useAsyncData(
    () => `docs-${slug.value}`,
    () => queryCollection("docs").path(docPath.value).first(),
);

const editUrl = computed(
    () => `https://github.com/slunghq/web/edit/main/${docsSourcePath.value}`,
);

const markdownToCopy = computed(() => {
    if (!doc.value) return "";
    if (typeof doc.value.rawbody === "string" && doc.value.rawbody.trim()) {
        return doc.value.rawbody;
    }

    const title = `# ${doc.value.title}`;
    const description = doc.value.description
        ? `\n\n${doc.value.description}`
        : "";
    return `${title}${description}\n`;
});

const copiedMarkdown = ref(false);
const copyAsMarkdown = async () => {
    if (!markdownToCopy.value) return;
    if (!import.meta.client) return;
    await navigator.clipboard.writeText(markdownToCopy.value);
    copiedMarkdown.value = true;
    setTimeout(() => {
        copiedMarkdown.value = false;
    }, 1800);
};

useSeoMeta({
    title: () =>
        `${doc.value?.metaTitle || doc.value?.title || "Docs"} | Documentation`,
    ogTitle: () =>
        `${doc.value?.metaTitle || doc.value?.title || "Docs"} | Documentation`,
    description: () =>
        doc.value?.description ||
        "Build and deploy durable data streaming applications.",
    ogDescription: () =>
        doc.value?.description ||
        "Build and deploy durable data streaming applications.",
    ogImage: () => doc.value?.hero || "/default.png",
    twitterCard: "summary_large_image",
    twitterSite: "@slunghq",
});
</script>

<template>
    <div class="w-full py-8 px-0 flex flex-col gap-8">
        <div v-if="doc" class="w-full">
            <article class="w-full">
                <div
                    id="navigation-items"
                    class="bg-[var(--bg-elevated)] p-6 mb-8"
                >
                    <p
                        class="text-sm uppercase font-semibold tracking-wide text-[var(--accent-secondary)]"
                    >
                        Overview
                    </p>
                    <h1
                        class="text-2xl font-bold mb-4"
                    >
                        {{ doc.title }}
                    </h1>
                    <p
                        v-if="doc.description"
                        class="text-base mb-6"
                    >
                        {{ doc.description }}
                    </p>
                    <div class="flex flex-wrap items-center gap-2">
                        <button
                            class="h-7 px-4 bg-[var(--bg-elevated)] hover:bg-[var(--bg-inset)] font-semibold text-sm cursor-pointer"
                            id="navigation-items"
                            @click="copyAsMarkdown"
                        >
                            <font-awesome
                                :icon="['far', 'clone']"
                                v-if="!copiedMarkdown"
                            />
                            <font-awesome
                                :icon="['fas', 'check']"
                                v-else
                            />
                        </button>
                        <a
                            class="h-7 px-4 bg-[var(--bg-elevated)] hover:bg-[var(--bg-inset)] font-semibold text-sm inline-flex items-center"
                            id="navigation-items"
                            :href="editUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <font-awesome :icon="['fas', 'pen']" />
                        </a>
                    </div>
                </div>

                <div class="blog-content-wrapper">
                    <ContentRenderer
                        :value="doc"
                        class="blog-content"
                    />
                </div>
            </article>
        </div>

        <div
            v-else
            id="navigation-items"
            class="bg-[var(--bg-elevated)] p-8"
        >
            <h1 class="text-2xl font-bold">Document Not Found</h1>
            <p class="mt-2 text-base">This docs page does not exist.</p>
            <nuxt-link to="/docs" class="link mt-4 inline-flex px-2">
                <span class="font-semibold">Back to docs</span>
            </nuxt-link>
        </div>
    </div>
</template>
