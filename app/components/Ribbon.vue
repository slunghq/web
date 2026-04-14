<template>
    <div
        class="w-full px-0 py-9 md:py-11 border-[#4e0d0b] border-t border-dashed"
    >
        <div class="w-full flex flex-col gap-8">
            <!-- Subject Text -->
            <div class="flex flex-col items-start gap-3 w-full">
                <h2 class="inline w-fit text-[15px]">
                    <span class="text-[#4e0d0b] inline uppercase">Slung</span>
                    lets you model your systems to handle complex scenarios
                    without having to handle endless edge-cases:
                </h2>
            </div>

            <!-- Use Cases Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <NuxtLink
                    v-for="useCase in useCases"
                    :key="useCase.id"
                    :to="useCase.path"
                    class="flex flex-col items-start justify-start gap-3 py-4 px-4 bg-[#faf8f4] hover:bg-[#fcf4f0] transition-colors"
                    :id="useCase.id"
                >
                    <h3 class="font-semibold text-base text-[#4e0d0b]">
                        {{ useCase.title }}
                    </h3>
                    <p class="text-sm text-[#666666]">
                        {{ useCase.description }}
                    </p>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
const useCases = [
    {
        id: "navigation-top-left-bottom-right",
        title: "Real-time Data Pipelines",
        description:
            "Automatically react to streaming data changes and propagate updates across your pipeline without manual orchestration.",
        path: "/usecases/real-time-pipelines",
    },
    {
        id: "navigation-top-left-bottom-right",
        title: "Event-driven Workflows",
        description:
            "Execute workflows that adapt in real time based on changing facts and conditions across your system.",
        path: "/usecases/event-workflows",
    },
    {
        id: "navigation-top-left-bottom-right",
        title: "Distributed State Management",
        description:
            "Maintain consistent global state across microservices with automatic propagation of changes.",
        path: "/usecases/state-management",
    },
    {
        id: "navigation-top-left-bottom-right",
        title: "Adaptive Business Logic",
        description:
            "Build systems that automatically recalculate and adapt decisions when underlying data changes.",
        path: "/usecases/business-logic",
    },
];
</script>

<style scoped>
@import "tailwindcss";
</style>
