<template>
    <div class="pt-2 my-6 text-sm">
        <div
            v-if="$props.filename"
            class="px-4 py-0.5 text-[#4e0d0b] no-select font-semibold font-mono border border-b-0! border-[#4e0d0b]/40 w-fit"
        >
            {{ $props.filename }}
        </div>
        <pre
            :class="[
                $props.class,
                { 'no-line-numbers pb-2!': $props.language === 'bash' },
            ]"
            class="p-5 pl-2! pt-2 border border-[#4e0d0b]/40 overflow-x-auto"
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
    color: #6b7280;
    user-select: none;
    padding-right: 1em;
    border-right: 1px solid #e5e7eb;
    font-variant-numeric: tabular-nums;
}

.line:hover {
    @apply bg-[#fcf4f0];
}

.no-line-numbers .line::before {
    content: "~";
    border-right: 0;
    width: 2em;
}

.no-line-numbers .line:hover {
    @apply bg-[#fffdf6];
}

.no-line-numbers .line {
    padding-left: 2em;
}

pre code .line *::-moz-selection,
pre code .line *::selection {
    background-color: #dcb !important;
    color: var(--bg-color) !important;
}
</style>
