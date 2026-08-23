<template>
    <div>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import { accordionFamilyKey } from "./accordion-context";

const openId = ref<string | null>(null);

const register = (id: string, defaultOpen: boolean) => {
    if (defaultOpen && openId.value === null) {
        openId.value = id;
    }
};

const toggle = (id: string) => {
    openId.value = openId.value === id ? null : id;
};

provide(accordionFamilyKey, {
    openId,
    register,
    toggle,
});
</script>
