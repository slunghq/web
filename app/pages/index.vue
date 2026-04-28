<template>
    <div class="relative w-full overflow-clip z-20 flex flex-col gap-12">
        <Hero />

        <!-- Overview -->
        <!-- <section class="w-full flex flex-col gap-4">
            <h2
                class="text-xs uppercase font-semibold tracking-widest text-[#4e0d0b] opacity-60"
            >
                Overview
            </h2>
            <p class="text-base leading-relaxed text-[#2a2a2a]">
                <span class="text-[#4e0d0b] inline uppercase">Slung</span> is an ontology-driven compute engine that executes work
                based on real-time facts about relationships between components
                in your system. Instead of rigid step-based workflows, it thinks
                in terms of relationships, facts, and rules that automatically
                propagate changes across your entire system.
            </p>
        </section> -->

        <!-- The Problem -->
        <section class="w-full flex flex-col gap-4 pt-4">
            <h2
                class="text-xs uppercase font-semibold tracking-widest text-[#4e0d0b] opacity-60"
            >
                The Problem
            </h2>
            <p class="text-base leading-relaxed text-[#2a2a2a]">
                Traditional workflow engines model work as a sequence of steps.
                This works for predictable processes but breaks down when facts
                change asynchronously and decisions need to adapt in real time.
                You end up writing glue code to handle edge cases, retry logic,
                and state synchronization.
            </p>
        </section>

        <!-- How It Works -->
        <section
            class="w-full flex flex-col gap-4 border-t border-[#4e0d0b] border-dashed pt-8"
        >
            <h2
                class="text-xs uppercase font-semibold tracking-widest text-[#4e0d0b] opacity-60"
            >
                How It Works
            </h2>
            <p class="text-base leading-relaxed text-[#2a2a2a]">
                <span class="text-[#4e0d0b] inline uppercase">Slung</span>
                replaces rigid steps with relationships. Data sources become
                first-class entities in an Entity Component System (ECS) model.
                Rules fire automatically when facts about components change
                (component is then marked dirty). Fact changes propagate
                instantly to every rule that depends on them, creating implicit
                orchestration without explicit wiring between systems.
            </p>
            <div
                class="mt-4 p-2 h-fit flex! items-center border border-[#e8d4cf] text-xs font-mono text-[#6b2420] text-nowrap overflow-scroll hide-scroll"
            >
                fact changes -> components marked dirty -> rules re-evaluate ->
                updates facts -> cascade propagates
                <!--
 ○──○──○──○──○──○──○──○    main
            │
            └──○──○──○──○──○    fork-a
                  │
                  └──○──○──○──○──○    fork-b
                   -->
            </div>
        </section>

        <!-- Built For -->
        <section
            class="w-full flex flex-col gap-6 border-t border-[#4e0d0b] border-dashed pt-8"
        >
            <h2
                class="text-xs uppercase font-semibold tracking-widest text-[#4e0d0b] opacity-60"
            >
                Built For
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col gap-2">
                    <h3 class="text-sm font-semibold text-[#4e0d0b]">
                        Implicit Orchestration
                    </h3>
                    <p class="text-sm text-[#6b2420] leading-relaxed">
                        No explicit wiring between rules. Relationships define
                        everything.
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <h3 class="text-sm font-semibold text-[#4e0d0b]">
                        Real-time Propagation
                    </h3>
                    <p class="text-sm text-[#6b2420] leading-relaxed">
                        Fact changes trigger affected rules automatically across
                        your system.
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <h3 class="text-sm font-semibold text-[#4e0d0b]">
                        Language Agnostic
                    </h3>
                    <p class="text-sm text-[#6b2420] leading-relaxed">
                        Rules compile to WebAssembly for universal
                        compatibility.
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <h3 class="text-sm font-semibold text-[#4e0d0b]">
                        Edge Optimised
                    </h3>
                    <p class="text-sm text-[#6b2420] leading-relaxed">
                        Lightweight single binary deployable anywhere.
                    </p>
                </div>
            </div>
        </section>

        <!-- Get Started -->
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
                <nuxt-link to="/docs" class="font-semibold link">
                    <span>documentation</span></nuxt-link
                >
                to understand core concepts, or jump into the
                <nuxt-link
                    to="https://github.com/slunghq/slung"
                    target="_blank"
                    class="font-semibold link"
                    ><span>repository</span></nuxt-link
                >
                to start building.
            </p>
        </section>

        <Ribbon />
    </div>
</template>

<script setup>
useSeoMeta({
    title: "Compute Engine for Real-time Decisions",
    ogTitle: "Compute Engine for Real-time Decisions",
    description:
        "An ontology-driven compute engine that executes work based on real-time facts. Deploy adaptive systems that propagate changes automatically across your data stack.",
    ogDescription:
        "An ontology-driven compute engine that executes work based on real-time facts. Deploy adaptive systems that propagate changes automatically across your data stack.",
    twitterCard: "summary_large_image",
    twitterSite: "@slunghq",
});
</script>

<style>
.hide-scroll {
    &::-webkit-scrollbar {
        display: none;
    }
    scrollbar-width: none;
}
</style>
