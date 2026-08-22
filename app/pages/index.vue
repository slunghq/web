<template>
    <div class="home-page">
        <Hero />

        <section class="content-section">
            <div class="section-heading"><p class="eyebrow">the problem</p><span class="section-rule"></span></div>
            <p class="section-copy">Traditional workflow engines model work as a sequence of steps. That's fine when the process is predictable - it breaks down the moment facts change asynchronously and downstream logic needs to react. You end up hand-writing the glue: what depends on what, what re-runs when something changes, what happens when two things change at once. That glue is where the bugs live.</p>
        </section>

        <section class="content-section">
            <div class="section-heading"><p class="eyebrow">how it works</p><span class="section-rule"></span></div>
            <p class="section-copy">Your system is entities (a sensor, an order, a session) made of components - facts about that entity. Rules subscribe to components, not to a schedule or a step number. When a fact changes, the component is marked dirty. Every rule that depends on it re-evaluates automatically, and if that rule writes new facts, the cascade continues.</p>
            <p class="section-note">No DAG to maintain. No explicit "then call X" wiring. The dependency graph is implicit in what each rule reads and writes - only what's actually affected by a change recomputes.</p>
        </section>

        <section class="alpha-notice"><span>[!]</span><p><strong>Slung is alpha software.</strong> The core propagation model works; connectors are actively being hardened. <NuxtLink to="roadmap">Track our roadmap -></NuxtLink></p></section>

        <section class="content-section built-for">
            <div class="section-heading"><p class="eyebrow">built for</p><span class="section-rule"></span></div>
            <div class="feature-grid">
                <article v-for="feature in features" :key="feature.title" class="feature-card" id="navigation-top-left-bottom-right">
                    <h3>{{ feature.title }}</h3><p>{{ feature.description }}</p>
                </article>
            </div>
        </section>

        <section class="content-section get-started">
            <div class="section-heading"><p class="eyebrow">get started</p><span class="section-rule"></span></div>
            <p class="section-copy">Read the architecture doc to understand the model before you touch code, or run the quickstart to see propagation happen locally. Slung is early - the best way to help right now is small, scoped contributions. Check open issues; several don't require deep familiarity with the codebase first.</p>
            <div class="started-links"><NuxtLink to="/docs" class="link"><span>Read the docs -></span></NuxtLink><NuxtLink to="https://github.com/slunghq/slung" target="_blank" class="link"><span>View on github -></span></NuxtLink><NuxtLink to="https://github.com/slunghq/slung/issues" target="_blank" class="link"><span>Open issues -></span></NuxtLink></div>
        </section>
    </div>
</template>

<script setup lang="ts">
const features = [
    { title: "No wiring required", description: "Define what a rule reads and writes. Slung derives the dependency graph - you don't maintain one." },
    { title: "Propagation, not polling", description: "A fact change triggers only the rules that depend on it, immediately. Not a scheduled sweep." },
    { title: "Compiles to WebAssembly", description: "Write rules in Rust, Go, or anything that targets WASM. The engine doesn't care what language your logic is in." },
    { title: "Single binary, edge-ready", description: "No broker, no scheduler service, no separate state store to run alongside it." },
];

useSeoMeta({
    title: "Incremental Execution for Complex Task Orchestration",
    ogTitle: "Incremental Execution for Complex Task Orchestration",
    description: "Slung reacts to changing facts instead of running fixed steps. Model your system as entities and components, write rules that react when they change, and let the runtime handle what computes.",
    ogDescription: "Slung reacts to changing facts instead of running fixed steps. Model your system as entities and components, write rules that react when they change, and let the runtime handle what computes.",
    twitterCard: "summary_large_image",
    twitterSite: "@slunghq",
});
</script>

<style scoped>
.home-page { display: flex; flex-direction: column; gap: 4.5rem; padding-bottom: 5rem; }
.content-section { display: flex; flex-direction: column; gap: 1.5rem; }
.section-heading { display: flex; align-items: center; gap: 1rem; }
.eyebrow { color: var(--accent-secondary); font-size: .75rem; letter-spacing: .08em; text-transform: uppercase; }
.section-rule { height: 1px; background: var(--border-default); flex: 1; }
.section-copy { color: var(--text-secondary); font-size: 1rem; line-height: 1.75; max-width: 49rem; }
.section-note { color: var(--text-primary); font-size: .875rem; line-height: 1.7; border-left: 2px solid var(--accent-primary); padding-left: 1rem; max-width: 49rem; }
.alpha-notice { border: 1px dashed var(--accent-primary); background: var(--bg-elevated); display: flex; gap: 1rem; padding: 1rem; color: var(--text-secondary); font-size: .8rem; line-height: 1.6; }
.alpha-notice > span { color: var(--accent-primary); font-family: var(--font-display); }
.alpha-notice strong { color: var(--text-primary); font-weight: 500; }
.alpha-notice a { color: var(--accent-primary); text-decoration: none; }
.feature-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
.feature-card { background: var(--bg-elevated); padding: 1.25rem; min-height: 9rem; }
.feature-card h3 { color: var(--text-primary); font-family: var(--font-display); font-size: .95rem; margin-bottom: .75rem; }
.feature-card p { color: var(--text-secondary); font-size: .8rem; line-height: 1.65; }
.get-started { padding-top: 1rem; }
.started-links { display: flex; flex-wrap: wrap; gap: 1.5rem; font-size: .8rem; }
@media (min-width: 768px) { .feature-grid { grid-template-columns: 1fr 1fr; } }
</style>
