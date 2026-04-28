<template>
    <div class="relative w-full overflow-clip z-20 flex flex-col gap-12 mt-8">
        <!-- Page Header -->
        <section class="w-full flex flex-col gap-4">
            <h1 class="text-lg md:text-xl font-bold text-[#4e0d0b]">
                Distributed State Management
            </h1>
            <p class="text-base leading-relaxed text-[#2a2a2a] max-w-2xl">
                Keep state consistent across microservices with automatic
                propagation of changes. No eventual consistency surprises or
                manual synchronization.
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
                Microservices architectures create state synchronization
                challenges. Services need to know about state changes in other
                services, but maintaining consistency is hard. Caching gets
                stale, events get missed, and you end up building complex
                choreography and saga patterns to keep state in sync.
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
                When a critical state changes in one service, how do dependent
                services know? You're forced to choose between polling
                (inefficient), webhooks (brittle), or messaging systems
                (complex). Each approach has its downsides: missed updates,
                duplicates, ordering issues, or partial failures that leave you
                with inconsistent state across your system.
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
                Slung provides a unified fact store that all services can
                subscribe to. When a fact changes, dependent services
                automatically get notified. Services define rules about what
                state they care about, and Slung ensures those rules are always
                evaluated against the latest facts. No polling, no missed
                events, no manual synchronization.
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
                        Automatic Propagation
                    </h3>
                    <p class="text-sm text-[#666666] leading-relaxed">
                        State changes propagate instantly to all dependent
                        services. No polling or event replay needed.
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <h3 class="text-sm font-semibold text-[#4e0d0b]">
                        Consistent Snapshot
                    </h3>
                    <p class="text-sm text-[#666666] leading-relaxed">
                        Every service sees the same global state snapshot at the
                        moment of evaluation.
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <h3 class="text-sm font-semibold text-[#4e0d0b]">
                        No Choreography
                    </h3>
                    <p class="text-sm text-[#666666] leading-relaxed">
                        Eliminate complex saga patterns. Services declare what
                        they care about; Slung handles coordination.
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <h3 class="text-sm font-semibold text-[#4e0d0b]">
                        Traceability
                    </h3>
                    <p class="text-sm text-[#666666] leading-relaxed">
                        Understand exactly which state changes triggered which
                        service actions across your system.
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
                Example: E-commerce System
            </h2>
            <p class="text-base leading-relaxed text-[#2a2a2a]">
                In a distributed e-commerce system with separate Order,
                Inventory, and Billing services:
            </p>
            <div class="mt-2 space-y-2 text-sm text-[#666666]">
                <p>
                    • When Inventory publishes "item_low_stock", Billing
                    automatically pauses promotions for that item
                </p>
                <p>
                    • When Billing posts "refund_processed", Inventory releases
                    reserved units immediately
                </p>
                <p>
                    • When a customer is flagged as "high_risk", Order service
                    auto-requires additional verification
                </p>
                <p>
                    • All services always know the current state without polling
                    or manual syncing
                </p>
            </div>
            <p class="text-sm text-[#666666] mt-4">
                Services stay consistent, react in real time, and never need to
                rebuild state. State changes propagate once and reach all
                affected services automatically.
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
                to learn how to integrate Slung with your services, or check out
                other
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
    title: "Distributed State Management | Slung Use Cases",
    ogTitle: "Distributed State Management | Slung Use Cases",
    description:
        "Keep microservices state consistent with automatic propagation. No polling, choreography, or manual synchronization needed.",
    ogDescription:
        "Keep microservices state consistent with automatic propagation. No polling, choreography, or manual synchronization needed.",
    twitterCard: "summary_large_image",
    twitterSite: "@slunghq",
});
</script>
