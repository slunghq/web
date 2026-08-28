<template>
    <header class="hero-shell">
        <div class="hero-copy">
            <p class="eyebrow">// incremental execution</p>
            <h1>systems that <em>propagate</em>, not pipelines you wire by hand</h1>
            <p class="hero-subhead">
                Slung reacts to changing facts instead of running fixed steps.
                Model your system as entities and components, write rules that
                depend on them, and let the runtime handle what recomputes - the
                same principle behind incremental builds, applied to orchestration.
            </p>
            <div class="hero-actions uppercase ">
                <NuxtLink id="navigation-items" data-shortcut="l" class="bracket-button primary link-vertical font-bold" to="https://cal.com/ewanretor/slung-live" target="_blank"><span class="text-(--text-primary)!">see it live <kbd class="keycap font-normal">L</kbd></span></NuxtLink>
                <NuxtLink id="navigation-items" data-shortcut="d" class="bracket-button link-vertical" to="/docs"><span class="text-(--text-primary)!">read the docs <kbd class="keycap">D</kbd></span></NuxtLink>
            </div>
        </div>
        <div class="trace-panel" aria-label="Slung runtime log">
            <div class="trace-header"><span class="status-dot"></span> runtime log <span class="trace-live">debug mode</span></div>
            <div ref="logViewport" class="trace-log">
                <template v-for="(line, index) in logLines" :key="index">
                    <div v-if="visibleLines > index" class="log-line trace-step is-visible">
                        <template v-if="logParts(line)">
                            <span :class="logClass(logParts(line)!.prefix)">{{ logParts(line)!.prefix }}</span><span v-if="logParts(line)!.message"> {{ logParts(line)!.message }}</span>
                        </template>
                        <template v-else>&nbsp;</template>
                    </div>
                </template>
                <span class="terminal-cursor" :class="{ 'is-blinking': cursorBlinking }" aria-hidden="true"></span>
            </div>
            <div class="trace-footer">
                <div>
                Check out the example:
                <nuxt-link href="https://github.com/slunghq/slung/tree/dev/sdks/pipeline/rust/examples/webhook" target="_blank" rel="noopener noreferrer" class="link"><span class="text-(--text-primary)">examples/webhook</span></nuxt-link>.
                </div>
                <button id="navigation-items" type="button" @click="replayLog"><font-awesome :icon="['fas', 'rotate-right']" aria-hidden="true" /></button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
const logLines = [
    "2026/08/28 00:06:17 slung INFO Starting deployment host",
    "  node id: node-1",
    "2026/08/28 00:06:17 slung INFO deployment server listening on http://0.0.0.0:2072",
    "2026/08/28 00:06:17 slung INFO WebSocket gateway listening on http://0.0.0.0:2073",
    "2026/08/28 00:06:17 slung INFO HTTP webhook listening on http://0.0.0.0:2074",
    "",
    "2026/08/28 00:06:21 dusty DEBUG Received: POST /deploy",
    "2026/08/28 00:06:21 slung INFO First deployment: webhook.wasm (namespace: test_ns)",
    "2026/08/28 00:06:21 slung INFO Registered route: POST /test_ns/api/inventory",
    "",
    "2026/08/28 00:06:23 dusty DEBUG Received: POST /test_ns/api/inventory",
    "2026/08/28 00:06:23 default DEBUG Mapper __slung_map_WebhookSource_order declined payload with status 1",
    "",
    "2026/08/28 00:06:23 dusty DEBUG Received: POST /test_ns/api/inventory",
    "2026/08/28 00:06:23 default DEBUG Mapper __slung_map_WebhookSource_order declined payload with status 1",
    "LOW STOCK ALERT: GADGET-002 now at 30 units",
    "",
    "2026/08/28 00:06:23 dusty DEBUG Received: POST /test_ns/api/inventory",
    "2026/08/28 00:06:23 default DEBUG Mapper __slung_map_WebhookSource_order declined payload with status 1",
    "LOW STOCK ALERT: WIDGET-001 now at 25 units",
    "",
    "2026/08/28 00:06:23 dusty DEBUG Received: POST /test_ns/api/inventory",
    "2026/08/28 00:06:23 default DEBUG Mapper __slung_map_WebhookSource_order declined payload with status 1",
    "LOW STOCK ALERT: CRITICAL-003 now at 10 units",
    "EMERGENCY: CRITICAL-003 is critically low at 10 units - initiating emergency reorder",
    "",
    "2026/08/28 00:06:23 dusty DEBUG Received: POST /test_ns/api/inventory",
    "2026/08/28 00:06:23 default DEBUG Mapper __slung_map_WebhookSource_order declined payload with status 1",
    "LOW STOCK ALERT: GADGET-002 now at 5 units",
    "EMERGENCY: GADGET-002 is critically low at 5 units - initiating emergency reorder",
    "",
    "2026/08/28 00:06:23 dusty DEBUG Received: POST /test_ns/api/inventory",
    "2026/08/28 00:06:23 default DEBUG Mapper __slung_map_WebhookSource_inventory declined payload with status 1",
    "2026/08/28 00:06:23 default DEBUG Mapper __slung_map_WebhookSource_order declined payload with status 1",
    "2026/08/28 00:06:23 default WARN No mappers accepted payload for source WebhookSource",
    "",
    "2026/08/28 00:06:23 dusty DEBUG Received: POST /test_ns/api/unknown",
    "2026/08/28 00:06:23 default INFO http webhook route not registered: test_ns/api/unknown",
];
const visibleLines = ref(0);
const cursorBlinking = ref(true);

const logViewport = ref<HTMLElement | null>(null);
const timers: number[] = [];

const logParts = (line: string) => {
    if (line.startsWith("  ")) return { prefix: "  ", message: line.trimStart() };
    const structured = line.match(/^(\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2} \w+ (?:DEBUG|INFO|WARN|ERR)) (.*)$/);
    if (structured) return { prefix: structured[1] + " ", message: structured[2] };
    const raw = line.match(/^(LOW STOCK ALERT: |EMERGENCY: |Order [^:]+: )(.*)/);
    if (raw) return { prefix: raw[1], message: raw[2] };
    return null;
};

const logClass = (prefix: string) => {
    if (prefix.includes("WARN ")) return "log-warning";
    if (prefix.includes(" ERR ")) return "log-emergency";
    if (/\d{4}\/\d{2}\/\d{2}/.test(prefix)) return "log-muted";
    if (prefix.startsWith("LOW STOCK ALERT")) return "log-warning";
    if (prefix.startsWith("EMERGENCY")) return "log-emergency";
    return "log-muted";
};

const handleShortcut = (event: KeyboardEvent) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const target = event.target as HTMLElement | null;
    if (target?.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName || "")) return;

    if (event.key.toLowerCase() === "l") {
        event.preventDefault();
        document.querySelector<HTMLElement>('[data-shortcut="l"]')?.click();
    }
    if (event.key.toLowerCase() === "d") {
        event.preventDefault();
        document.querySelector<HTMLElement>('[data-shortcut="d"]')?.click();
    }
};

const replayLog = () => {
    timers.splice(0).forEach((timer) => window.clearTimeout(timer));
    visibleLines.value = 0;
    cursorBlinking.value = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        visibleLines.value = logLines.length;
        cursorBlinking.value = false;
        return;
    }

    let elapsed = 1750;
    logLines.forEach((line, index) => {
        if (line.startsWith("LOW STOCK ALERT:")) elapsed += 400;
        if (line.startsWith("EMERGENCY:")) elapsed += 400;
        timers.push(window.setTimeout(() => {
            visibleLines.value = index + 1;
            nextTick(() => {
                if (logViewport.value) logViewport.value.scrollTop = logViewport.value.scrollHeight;
            });
        }, elapsed));
        if (!line.startsWith("LOW STOCK ALERT:") && !line.startsWith("EMERGENCY:")) elapsed += 40;
    });
};

onMounted(() => {
    replayLog();
    window.addEventListener("keydown", handleShortcut, true);
});
onUnmounted(() => {
    timers.splice(0).forEach((timer) => window.clearTimeout(timer));
    window.removeEventListener("keydown", handleShortcut, true);
});
</script>

<style scoped>
@import "tailwindcss";

.hero-shell { display: flex; flex-direction: column; gap: 3rem; padding: 5.5rem 0 2rem; }
.hero-copy { max-width: 56rem; }
.eyebrow { color: var(--accent-secondary); font-size: .75rem; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 1.5rem; }
h1 { font-family: var(--font-display); font-size: clamp(2.4rem, 7vw, 3.5rem); line-height: 1.05; letter-spacing: -.06em; max-width: 52rem; }
h1 em { font-family: var(--font-accent); font-weight: 400; letter-spacing: -.04em; }
.hero-subhead { color: var(--text-secondary); font-size: 1rem; line-height: 1.7; max-width: 43rem; margin-top: 1.75rem; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2rem; }
.bracket-button { display: inline-flex; gap: .8rem; align-items: center; min-height: 1.75rem; padding: .55rem 1rem; color: var(--text-primary); font-size: .8rem; text-decoration: none; background-color: var(--bg-elevated); }
.bracket-button.primary { background-color: var(--bg-elevated); color: var(--text-primary); }
.bracket-button span { color: var(--accent-secondary); }
.trace-panel { background: var(--bg-inset); border: 1px solid var(--border-default); padding: 1.25rem; height: 24rem; min-height: 0; display: flex; flex-direction: column; font-family: var(--font-display); }
.trace-header { color: var(--text-tertiary); font-size: .7rem; letter-spacing: .08em; text-transform: uppercase; display: flex; align-items: center; gap: .5rem; border-bottom: 1px solid var(--border-default); padding-bottom: .8rem; }
.status-dot { width: .45rem; height: .45rem; background: var(--success); display: inline-block; border-radius: 50%; }
.trace-live { margin-left: auto; color: var(--success); }
.trace-log { color: var(--text-primary); font-size: .72rem; line-height: 1.55; padding-top: 1rem; flex: 1; min-height: 0; overflow: auto; scrollbar-width: none; -ms-overflow-style: none; }
.trace-log::-webkit-scrollbar { display: none; }
.log-line { min-height: 1.55em; white-space: pre-wrap; overflow-wrap: anywhere; }
.log-muted { color: var(--text-tertiary); }
.log-warning { color: var(--accent-secondary); }
.log-emergency { color: var(--accent-primary); font-weight: 700; }
.terminal-cursor { display: block; position: relative; width: .6rem; height: 1.55em; min-height: 1.55em; margin-top: .1rem; }
.terminal-cursor::after { content: ""; position: absolute; left: 0; bottom: .16em; width: .6rem; height: 2px; background: var(--accent-primary); }.terminal-cursor.is-blinking { animation: blink 1s steps(2, end) infinite; }
.trace-footer { flex-shrink: 0; color: var(--accent-secondary); font-size: .72rem; margin-top: 1rem; padding-top: .8rem; border-top: 1px solid var(--border-default); display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.trace-footer button { display: inline-flex; align-items: center; gap: .4rem; border: 1px solid var(--border-default); color: var(--text-secondary); background: transparent; padding: .25rem .5rem; font: inherit; cursor: pointer; }
.trace-footer button:hover { border-color: var(--accent-primary); color: var(--text-primary); }
@keyframes blink { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .terminal-cursor.is-blinking { animation: none; } }
@media (min-width: 768px) { .hero-shell { padding-top: 4rem; } .trace-panel { padding: 1.25rem; height: 26rem; } .trace-log { font-size: .78rem; } }
</style>

<style>
@import "tailwindcss";

.keycap { @apply size-4 shrink-0 rounded-xs items-center justify-center gap-0.5 text-[.6875rem] border border-gray-500/20 bg-gray-50/50 sm:inline-flex hidden leading-none border-white/20! bg-white/10!; }
</style>
