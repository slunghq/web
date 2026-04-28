<template>
    <div class="relative w-full overflow-clip z-20 flex flex-col gap-12 mt-8">
        <!-- Page Header -->
        <section class="w-full flex flex-col gap-4">
            <h1 class="text-lg md:text-xl font-bold text-[#4e0d0b]">
                Event-driven Workflows
            </h1>
            <p class="text-base leading-relaxed text-[#2a2a2a] max-w-2xl">
                Execute workflows that adapt in real time based on changing
                facts and conditions across your system. No rigid step
                sequencing required.
            </p>
        </section>

        <!-- Overview -->
        <section
            class="w-full flex flex-col gap-4 border-t border-[#4e0d0b] border-dashed pt-8"
        >
            <h2
                class="text-xs uppercase font-semibold tracking-widest text-[#4e0d0b] opacity-60"
            >
                Overview
            </h2>
            <p class="text-base leading-relaxed text-[#2a2a2a]">
                Traditional workflow engines force you into rigid sequences:
                step 1 → step 2 → step 3. When conditions change mid-workflow,
                you're stuck. Slung replaces this linear thinking with
                relationship-based execution. Rules fire based on facts, not
                predetermined steps. Your workflow adapts automatically when
                underlying conditions change.
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
                Building flexible workflows with step-based engines means
                hardcoding branching logic, handling state machine explosion,
                and rebuilding workflows for every variation. When business
                rules change or external systems emit unexpected events, your
                workflow doesn't adapt—it fails or requires manual intervention.
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
                Define workflows as sets of rules that trigger based on facts
                rather than step sequences. When a fact changes—a user reaches a
                threshold, a payment succeeds, an approval is granted—affected
                rules automatically re-evaluate. Your workflow adapts instantly
                without redefining branches or triggering new executions
                manually.
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
                        Fact-based Execution
                    </h3>
                    <p class="text-sm text-[#666666] leading-relaxed">
                        Workflows trigger based on real-time facts, not
                        predetermined steps. Rules fire when conditions are met.
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <h3 class="text-sm font-semibold text-[#4e0d0b]">
                        Adaptive Logic
                    </h3>
                    <p class="text-sm text-[#666666] leading-relaxed">
                        When facts change, affected rules automatically
                        re-evaluate. No manual branching or state machine
                        updates needed.
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <h3 class="text-sm font-semibold text-[#4e0d0b]">
                        No State Explosion
                    </h3>
                    <p class="text-sm text-[#666666] leading-relaxed">
                        Describe rules and relationships instead of building
                        massive state machines with hundreds of edge cases.
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <h3 class="text-sm font-semibold text-[#4e0d0b]">
                        Real-time Reactions
                    </h3>
                    <p class="text-sm text-[#666666] leading-relaxed">
                        External events trigger immediate rule evaluation and
                        propagation across dependent systems.
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
                Example: Order Processing
            </h2>
            <p class="text-base leading-relaxed text-[#2a2a2a]">
                Instead of a rigid workflow: "Payment → Fulfillment →
                Notification", Slung lets you define facts and rules:
            </p>
            <div class="mt-2 space-y-2 text-sm text-[#666666]">
                <p>
                    • When an order is received, check inventory and payment
                    status
                </p>
                <p>• If inventory is low, flag for expedited processing</p>
                <p>• If payment fails, emit a retry signal</p>
                <p>• If inventory check is pending, hold fulfillment</p>
                <p>
                    • Only fulfill when both inventory and payment facts are
                    resolved
                </p>
                <p>• Notify customer based on final fulfillment status</p>
            </div>
            <p class="text-sm text-[#666666] mt-4">
                When any fact changes—payment succeeds, inventory updates,
                customer status changes—the system automatically re-evaluates
                affected rules. No hardcoded branching needed.
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
                to learn how to build event-driven workflows, or check out other
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
    title: "Event-driven Workflows | Slung Use Cases",
    ogTitle: "Event-driven Workflows | Slung Use Cases",
    description:
        "Build adaptive workflows that react to changing facts in real time. Replace rigid step sequences with fact-based execution.",
    ogDescription:
        "Build adaptive workflows that react to changing facts in real time. Replace rigid step sequences with fact-based execution.",
    twitterCard: "summary_large_image",
    twitterSite: "@slunghq",
});
</script>
