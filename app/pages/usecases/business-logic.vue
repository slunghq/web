<template>
    <div class="relative w-full overflow-clip z-20 flex flex-col gap-12 mt-8">
        <!-- Page Header -->
        <section class="w-full flex flex-col gap-4">
            <h1 class="text-lg md:text-xl font-bold text-[#4e0d0b]">
                Adaptive Business Logic
            </h1>
            <p class="text-base leading-relaxed text-[#2a2a2a] max-w-2xl">
                Build systems that automatically recalculate and adapt decisions
                when underlying data changes. No manual recomputation or cache
                invalidation needed.
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
                Business logic often depends on multiple data sources. When any
                source changes, decisions become stale. Traditional systems
                require manual recomputation, cache invalidation, or event
                choreography. Slung automatically handles dependency tracking
                and recomputation when facts change.
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
                Complex business logic depends on many factors: user segments,
                pricing tiers, inventory levels, regional rules, and compliance
                requirements. When any factor changes, you need to recompute
                affected decisions. This leads to stale caches, inconsistent
                decisions, and brittle systems that break when new factors are
                added.
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
                Define business logic as rules that depend on facts. Slung
                automatically tracks which facts each rule depends on. When a
                fact changes, all affected rules automatically re-evaluate. Your
                business logic is always consistent with the current state, and
                new rules can be added without breaking existing ones.
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
                        Always Fresh Decisions
                    </h3>
                    <p class="text-sm text-[#666666] leading-relaxed">
                        Business logic automatically recomputes when any
                        dependency changes. No stale caches or manual
                        invalidation.
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <h3 class="text-sm font-semibold text-[#4e0d0b]">
                        Automatic Dependency Tracking
                    </h3>
                    <p class="text-sm text-[#666666] leading-relaxed">
                        Slung tracks which facts each decision depends on. Only
                        affected rules re-evaluate when changes occur.
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <h3 class="text-sm font-semibold text-[#4e0d0b]">
                        Easy to Extend
                    </h3>
                    <p class="text-sm text-[#666666] leading-relaxed">
                        Add new rules and facts without breaking existing logic.
                        Dependencies are automatically resolved.
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <h3 class="text-sm font-semibold text-[#4e0d0b]">
                        Audit Trail
                    </h3>
                    <p class="text-sm text-[#666666] leading-relaxed">
                        See exactly which facts triggered which decisions and
                        when. Full traceability for compliance.
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
                Example: Pricing Engine
            </h2>
            <p class="text-base leading-relaxed text-[#2a2a2a]">
                A pricing engine that depends on multiple factors:
            </p>
            <div class="mt-2 space-y-2 text-sm text-[#666666]">
                <p>• Customer segment (enterprise, SMB, startup)</p>
                <p>• Purchase volume and history</p>
                <p>• Regional pricing regulations</p>
                <p>• Current inventory levels</p>
                <p>• Competitor pricing and market conditions</p>
                <p>• Active promotions and discounts</p>
            </div>
            <p class="text-sm text-[#666666] mt-4">
                Define rules for each pricing factor. When inventory drops,
                competitor prices change, or a promotion starts, all affected
                price calculations automatically re-evaluate. Customers always
                see current, accurate prices without manual recomputation or
                cache busting.
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
                to learn how to build adaptive business logic, or check out
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
    title: "Adaptive Business Logic | Slung Use Cases",
    ogTitle: "Adaptive Business Logic | Slung Use Cases",
    description:
        "Build business logic that automatically adapts when underlying facts change. Always consistent, always fresh, easily extensible.",
    ogDescription:
        "Build business logic that automatically adapts when underlying facts change. Always consistent, always fresh, easily extensible.",
    twitterCard: "summary_large_image",
    twitterSite: "@slunghq",
});
</script>
