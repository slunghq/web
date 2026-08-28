<template>
    <aside
        class="notice"
        :class="`notice-${variant}`"
        :role="variant === 'warning' ? 'alert' : 'note'"
    >
        <span class="notice-mark" aria-hidden="true">[{{ mark }}]</span>
        <div class="notice-content">
            <slot />
        </div>
    </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";

type NoticeVariant = "warning" | "info";

const props = withDefaults(
    defineProps<{
        variant?: NoticeVariant;
    }>(),
    {
        variant: "warning",
    },
);

const mark = computed(() => (props.variant === "info" ? "i" : "!"));
</script>

<style scoped>
.notice {
    display: flex;
    gap: 1rem;
    margin: 2rem 0;
    padding: 1rem;
    border: 1px dashed var(--accent-primary);
    background: var(--bg-elevated);
    color: var(--text-secondary);
    font-size: .8rem;
    line-height: 1.6;
}

.notice-info {
    border-color: var(--accent-secondary);
}

.notice-mark {
    flex-shrink: 0;
    color: var(--accent-primary);
    font-family: var(--font-display);
}

.notice-info .notice-mark {
    color: var(--accent-secondary);
}

.notice-content :deep(p) {
    margin: 0;
}

.notice-content :deep(p + p) {
    margin-top: .75rem;
}

.notice-content :deep(strong) {
    color: var(--text-primary);
    font-weight: 500;
}

.notice-content :deep(a) {
    color: var(--accent-primary);
    text-decoration: none;
}
</style>
