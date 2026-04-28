<template>
    <div class="relative w-full overflow-clip z-20 flex flex-col gap-12 mt-8">
        <section class="w-full flex flex-col gap-4">
            <h1 class="text-lg md:text-xl font-bold text-[#4e0d0b]">
                Real-time Data Pipelines
            </h1>
            <p class="text-base leading-relaxed text-[#2a2a2a] max-w-2xl">
                Build pipelines that automatically react to streaming data
                changes
            </p>
        </section>

        <!-- Overview -->
        <section class="w-full flex flex-col gap-4">
            <h2
                class="text-xs uppercase font-semibold tracking-widest text-[#4e0d0b] opacity-60"
            >
                Overview
            </h2>
            <p class="text-base leading-relaxed text-[#2a2a2a]">
                Traditional data pipelines require explicit orchestration at
                every step. When new data arrives, you manually trigger
                transformations, validate outputs, and propagate changes
                downstream. Slung eliminates this manual wiring by treating data
                sources as first-class entities with automatic dependency
                resolution and change propagation.
            </p>
        </section>

        <!-- The Challenge -->
        <section
            class="w-full flex flex-col gap-4 border-t border-[#4e0d0b] border-dashed pt-8"
        >
            <h2
                class="text-xs uppercase font-semibold tracking-widest text-[#4e0d0b] opacity-60"
            >
                The Challenge
            </h2>
            <p class="text-base leading-relaxed text-[#2a2a2a]">
                Building scalable data pipelines with traditional tools means
                managing complex DAGs, handling backpressure, implementing retry
                logic, and ensuring idempotency across stages. When a source
                changes unexpectedly, you need to manually trace dependencies
                and recompute affected stages. This creates brittle systems
                prone to data loss and inconsistency.
            </p>
        </section>

        <!-- How Slung Helps -->
        <section
            class="w-full flex flex-col gap-4 border-t border-[#4e0d0b] border-dashed pt-8"
        >
            <h2
                class="text-xs uppercase font-semibold tracking-widest text-[#4e0d0b] opacity-60"
            >
                How Slung Helps
            </h2>
            <p class="text-base leading-relaxed text-[#2a2a2a]">
                Slung models data sources and transformations as entities with
                relationships. When a source receives new data, the affected
                components are automatically marked dirty. Rules that depend on
                those components re-evaluate instantly. Changes cascade through
                your entire pipeline without explicit triggering, with built-in
                handling for ordering, idempotency, and consistency.
            </p>
        </section>

        <!-- Key Benefits -->
        <section
            class="w-full flex flex-col gap-6 border-t border-[#4e0d0b] border-dashed pt-8"
        >
            <h2
                class="text-xs uppercase font-semibold tracking-widest text-[#4e0d0b] opacity-60"
            >
                Key Benefits
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col gap-2">
                    <h3 class="text-sm font-semibold text-[#4e0d0b]">
                        Implicit Orchestration
                    </h3>
                    <p class="text-sm text-[#666666] leading-relaxed">
                        No DAGs to manage. Relationships between data sources
                        and transformations define execution automatically.
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <h3 class="text-sm font-semibold text-[#4e0d0b]">
                        Real-time Propagation
                    </h3>
                    <p class="text-sm text-[#666666] leading-relaxed">
                        Changes flow instantly through dependent stages with
                        guaranteed consistency and no manual triggering.
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <h3 class="text-sm font-semibold text-[#4e0d0b]">
                        Built-in Resilience
                    </h3>
                    <p class="text-sm text-[#666666] leading-relaxed">
                        Automatic retry logic, idempotency guarantees, and
                        ordering semantics prevent data loss and duplication.
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <h3 class="text-sm font-semibold text-[#4e0d0b]">
                        Language Agnostic
                    </h3>
                    <p class="text-sm text-[#666666] leading-relaxed">
                        Write transformations in any language. Compile to
                        WebAssembly for universal deployment and execution.
                    </p>
                </div>
            </div>
        </section>

        <!-- Use Case Example -->
        <section
            class="w-full flex flex-col gap-4 border-t border-[#4e0d0b] border-dashed pt-8"
        >
            <h2
                class="text-xs uppercase font-semibold tracking-widest text-[#4e0d0b] opacity-60"
            >
                Example: Analytics Pipeline
            </h2>
            <p class="text-base leading-relaxed text-[#2a2a2a]">
                Imagine a real-time analytics pipeline ingesting user events.
                With Slung, you define rules that:
            </p>
            <div class="mt-2 space-y-2 text-sm text-[#666666]">
                <p>• Listen for new events on your data stream</p>
                <p>• Automatically deduplicate and validate them</p>
                <p>• Enrich with user context from your database</p>
                <p>• Aggregate metrics that depend on enriched data</p>
                <p>• Trigger alerts when thresholds are crossed</p>
            </div>
            <p class="text-sm text-[#666666] mt-4">
                When a source changes or new data arrives, all dependent stages
                automatically re-evaluate. You write the logic once; Slung
                handles the orchestration.
            </p>
        </section>

        <!-- CTA -->
        <section
            class="w-full flex flex-col gap-6 border-t border-[#4e0d0b] border-dashed pt-8"
        >
            <h2
                class="text-xs uppercase font-semibold tracking-widest text-[#4e0d0b] opacity-60"
            >
                Get Started
            </h2>
            <p class="text-base leading-relaxed text-[#2a2a2a]">
                Explore the
                <NuxtLink
                    to="/docs"
                    class="font-semibold text-[#4e0d0b] hover:underline"
                    >documentation</NuxtLink
                >
                to learn how to build your first pipeline, or view other
                <NuxtLink
                    to="/"
                    class="font-semibold text-[#4e0d0b] hover:underline"
                    >use cases</NuxtLink
                >.
            </p>
        </section>

        <Ribbon />
    </div>
</template>

<script setup>
useSeoMeta({
    title: "Real-time Data Pipelines | Slung Use Cases",
    ogTitle: "Real-time Data Pipelines | Slung Use Cases",
    description:
        "Build automatic data pipelines with real-time propagation and implicit orchestration. No manual DAG management required.",
    ogDescription:
        "Build automatic data pipelines with real-time propagation and implicit orchestration. No manual DAG management required.",
    twitterCard: "summary_large_image",
    twitterSite: "@slunghq",
});
</script>
