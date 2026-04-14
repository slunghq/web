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
    ],
});
</script>
