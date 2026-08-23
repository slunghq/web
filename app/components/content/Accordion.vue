<template>
    <section class="mb-2">
        <h2 class="m-0!">
            <button
                type="button"
                class="w-full px-4 py-3 text-start text-sm font-semibold text-[var(--accent-secondary)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-inset)] cursor-pointer flex items-center justify-between"
                :aria-expanded="isOpen"
                @click="
                    family ? family.toggle(props.title) : (open = !open)
                "
            >
                <span>{{ title }}</span>
                <span class="text-sm leading-none" aria-hidden="true">
                    {{ isOpen ? "−" : "+" }}
                </span>
            </button>
        </h2>
        <Transition name="accordion-content">
            <div
                v-show="isOpen"
                class="accordion-body grid overflow-hidden"
            >
                <div class="min-h-0 overflow-hidden">
                    <div class="px-4 py-3">
                        <slot />
                    </div>
                </div>
            </div>
        </Transition>
    </section>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { accordionFamilyKey } from "./accordion-context";

const props = withDefaults(
    defineProps<{
        title: string;
        defaultOpen?: boolean;
    }>(),
    {
        defaultOpen: false,
    },
);

const family = inject(accordionFamilyKey);
const open = ref(props.defaultOpen);
const isOpen = computed(() =>
    family ? family.openId.value === props.title : open.value,
);

family?.register(props.title, props.defaultOpen);
</script>

<style scoped>
.accordion-body {
    background-color: color-mix(
        in srgb,
        var(--bg-elevated) 75%,
        var(--bg-primary)
    );
}

.accordion-content-enter-active {
    grid-template-rows: 1fr;
    opacity: 1;
    will-change: grid-template-rows, opacity;
    transition:
        grid-template-rows 320ms cubic-bezier(0.22, 1, 0.36, 1),
        opacity 240ms ease;
}

.accordion-content-leave-active {
    grid-template-rows: 1fr;
    opacity: 1;
    will-change: grid-template-rows, opacity;
    transition:
        grid-template-rows 320ms cubic-bezier(0.22, 1, 0.36, 1),
        opacity 240ms ease;
}

.accordion-content-enter-from,
.accordion-content-leave-to {
    grid-template-rows: 0fr;
    opacity: 0;
}
</style>
