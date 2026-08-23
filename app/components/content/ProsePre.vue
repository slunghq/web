<template>
    <div class="pt-2 my-6 text-sm">
        <div
            v-if="props.filename"
            class="px-4 py-0.5 text-[var(--accent-primary)] no-select font-semibold font-mono border border-b-0! border-[var(--border-default)] w-fit"
        >
            {{ props.filename }}
        </div>
        <div class="relative">
            <button
                v-if="props.language != 'text'"
                type="button"
                class="absolute top-2 right-2 z-1 flex h-6 w-6 items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                :aria-label="copied ? 'Code copied' : 'Copy code'"
                :title="copied ? 'Code copied' : 'Copy code'"
                @click="copyCode"
            >
                <font-awesome
                    v-if="!copied"
                    :icon="['far', 'clone']"
                    aria-hidden="true"
                />
                <font-awesome
                    v-else
                    :icon="['fas', 'check']"
                    aria-hidden="true"
                />
            </button>
            <pre
                :class="props.class"
                class="p-5 pl-2! pt-2! pr-12! border border-[var(--border-default)] overflow-x-auto"
            ><slot /></pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
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

const copied = ref(false);

async function copyCode() {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    window.setTimeout(() => {
        copied.value = false;
    }, 2000);
}
</script>

<style>
@import "tailwindcss";
pre code .line {
    display: block;
}

pre code:not(:has(.line)) {
    padding-left: 1em !important;
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
.language-shell,
.language-text {
    @apply pb-2!;
    .line::before {
        display: none;
    }
    .line:hover {
        @apply bg-[var(--bg-inset)];
    }
    .line {
        padding-left: 1em;
    }
}

pre code .line *::-moz-selection,
pre code .line *::selection {
    background-color: #275736 !important;
    color: var(--bg-color) !important;
}
</style>
