<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
    script: [
        {
            src: "https://cdn.databuddy.cc/databuddy.js",
            async: true,
            crossorigin: "anonymous",
            "data-client-id": "eb139f28-6f26-4253-924d-a75fbf37fa85",
            "data-track-outgoing-links": "true",
            "data-track-interactions": "true",
            "data-track-scroll-depth": "true",
            "data-track-web-vitals": "true",
        },
        // JSON-LD for breadcrumb navigation
        {
            type: "application/ld+json",
            children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Home",
                        item: "https://slung.tech",
                    },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: "Docs",
                        item: "https://slung.tech/docs",
                    },
                    {
                        "@type": "ListItem",
                        position: 3,
                        name: "Blog",
                        item: "https://slung.tech/blog",
                    },
                    {
                        "@type": "ListItem",
                        position: 4,
                        name: "Use Cases",
                        item: "https://slung.tech/usecases",
                    },
                    {
                        "@type": "ListItem",
                        position: 5,
                        name: "Roadmap",
                        item: "https://slung.tech/roadmap",
                    },
                ],
            }),
        },
        // FAQ Schema
        {
            type: "application/ld+json",
            children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                    {
                        "@type": "Question",
                        name: "What is Slung?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Slung is an ontology-driven compute engine that executes work based on real-time facts about relationships between components in your system.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "How does Slung handle state changes?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Slung automatically detects fact changes and propagates them to dependent rules, triggering re-evaluation without explicit orchestration.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "Is Slung language agnostic?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Yes, you can write rules in any language. Everything compiles to WebAssembly for consistent execution across all platforms.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "What are common use cases for Slung?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Common use cases include real-time data pipelines, event-driven workflows, distributed state management, and adaptive business logic systems.",
                        },
                    },
                ],
            }),
        },
    ],
    meta: [
        {
            name: "apple-mobile-web-app-capable",
            content: "yes",
        },
        {
            name: "apple-mobile-web-app-status-bar-style",
            content: "black-translucent",
        },
        {
            name: "apple-mobile-web-app-title",
            content: "Slung",
        },
        {
            name: "msapplication-TileColor",
            content: "#4e0d0b",
        },
        {
            name: "msapplication-config",
            content: "/browserconfig.xml",
        },
    ],
    link: [
        {
            rel: "dns-prefetch",
            href: "https://cdn.databuddy.cc",
        },
        {
            rel: "preconnect",
            href: "https://fonts.googleapis.com",
        },
        {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossorigin: "anonymous",
        },
    ],
});

// Add global schema context
const route = useRoute();
const currentPath = computed(() => route.path);

// Dynamic page type schema
const getPageSchema = () => {
    const baseSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `https://slung.tech${currentPath.value}`,
        url: `https://slung.tech${currentPath.value}`,
        isPartOf: {
            "@id": "https://slung.tech",
        },
        datePublished: "2025-01-01",
        dateModified: new Date().toISOString(),
    };

    return baseSchema;
};
</script>
