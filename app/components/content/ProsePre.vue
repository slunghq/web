<template>
    <div class="pt-2 my-6 text-sm">
        <div
            v-if="$props.filename"
            class="px-4 py-0.5 text-[var(--accent-primary)] no-select font-semibold font-mono border border-b-0! border-[var(--border-default)] w-fit"
        >
            {{ $props.filename }}
        </div>
        <pre
            :class="$props.class"
            class="p-5 pl-2! pt-2 border border-[var(--border-default)] overflow-x-auto"
        ><slot /></pre>
    </div>
</template>

<script setup lang="ts">
defineProps({
    code: {
        type: String,
        default: "",
    },
    language: {
        type: String,
        default: null,
    },
    filename: {
        type: String,
        default: null,
    },
    highlights: {
        type: Array as () => number[],
        default: () => [],
    },
    meta: {
        type: String,
        default: null,
    },
    class: {
        type: String,
        default: null,
    },
});
</script>

<style>
@import "tailwindcss";
pre code .line {
    display: block;
}

.no-select {
    user-select: none;
}

.line {
    display: block;
    position: relative;
    padding-left: 4em;
    min-height: 1.5em;
}

.line::before {
    content: attr(line);
    position: absolute;
    left: 0;
    width: 3em;
    text-align: right;
    color: var(--text-tertiary);
    user-select: none;
    padding-right: 1em;
    border-right: 1px solid var(--border-default);
    font-variant-numeric: tabular-nums;
}

.line:hover {
    @apply bg-[var(--bg-elevated)];
}

.language-bash,
.language-zsh,
.language-fish,
.language-sh,
.language-shell {
    @apply pb-2!;
    .line::before {
        content: "~";
        border-right: 0;
        width: 2em;
    }
    .line:hover {
        @apply bg-[var(--bg-inset)];
    }
    .line {
        padding-left: 2em;
    }
}

pre code .line *::-moz-selection,
pre code .line *::selection {
    background-color: var(--accent-primary) !important;
    color: var(--bg-color) !important;
}
</style>
