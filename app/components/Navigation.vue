<template>
    <div class="w-full py-4 flex justify-center items-center">
        <div
            class="min-w-[calc(100%-2.125rem)] md:min-w-[calc(100%-7.75rem)] mb-8 flex justify-between items-center fixed bottom-0 z-[999]"
        >
            <div class="w-28.5 flex justify-start items-center z-[200]">
                <nuxt-link to="/">
                    <img src="assets/img/logo.png" alt="Logo" class="w-7" />
                </nuxt-link>
            </div>
            <div class="hidden md:flex gap-2 items-end justify-center z-[200]">
                <nuxt-link class="text-start link" to="/docs">
                    <span class="px-2 font-semibold" data-text="// Docs"
                        >// Docs</span
                    >
                </nuxt-link>
                <nuxt-link class="text-start link" to="/blog">
                    <span class="px-2 font-semibold" data-text="// Blog"
                        >// Blog</span
                    >
                </nuxt-link>
            </div>
            <div
                class="z-[100] flex flex-wrap gap-2 items-center"
                ref="menuContent"
            >
                <Transition name="menu" :duration="250">
                    <div>
                        <Motion
                            as="ul"
                            :initial="{ y: 4, opacity: 0 }"
                            :animate="
                                menuOpen
                                    ? { y: 0, opacity: 1 }
                                    : { y: 4, opacity: 0 }
                            "
                            class="flex flex-col items-center justify-center py-2 gap-2 h-fit w-full absolute bottom-0 right-0 mb-12 bg-white"
                            id="navigation-items"
                            :class="{ 'pointer-events-none!': !menuOpen }"
                        >
                            <Motion
                                v-for="i in items"
                                :key="i.id"
                                as="li"
                                :initial="{ y: 4, opacity: 0 }"
                                :animate="
                                    menuOpen
                                        ? { y: 0, opacity: 1 }
                                        : { y: 4, opacity: 0 }
                                "
                                :transition="
                                    menuOpen
                                        ? {
                                              delay:
                                                  (items.length - 1 - i.id) *
                                                  0.05,
                                          }
                                        : { delay: i.id * 0.05 }
                                "
                                class="h-9 w-[calc(100%-16px)] text-center bg-[#faf8f4] hover:bg-[#fcf4f0] gap-4 relative flex justify-center items-center text-[#010101]"
                                :class="{
                                    'bg-[#ddccbb]! mt-6! hover:bg-[#dcb]!':
                                        i.cta,
                                }"
                                id="navigation-items"
                            >
                                <nuxt-link
                                    class="text-start h-full w-full flex items-center justify-between no-select"
                                    :to="i.url"
                                    :class="{
                                        'link-vertical': i.cta,
                                    }"
                                    ><span
                                        class="uppercase px-6 font-semibold"
                                        >{{ i.name }}</span
                                    >
                                    <!-- <span
                                        class="uppercase px-6 font-semibold hidden"
                                        :class="{
                                            'block!': i.cta,
                                        }"
                                        >//</span
                                    > -->
                                </nuxt-link>
                            </Motion>
                        </Motion>
                    </div>
                </Transition>
                <button
                    @click="toggleMenuState"
                    class="h-[36px] w-[114px] text-center bg-[#ddccbb] hover:bg-[#ccbbaa] gap-4 relative flex justify-center items-center"
                    id="navigation-items"
                    :class="{ 'bg-[#ccbbaa]!': menuOpen }"
                >
                    <svg
                        class="fill-[#010101] shrink-0 mr-2"
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            y="7"
                            width="16"
                            height="2"
                            rx="1"
                            class="transform origin-center translate-x-0 transition duration-200 ease-out"
                            :class="{
                                '!-rotate-180': menuOpen,
                            }"
                        />
                        <rect
                            y="7"
                            width="20"
                            height="2"
                            rx="1"
                            class="transform origin-center translate-x-0 transition duration-200 ease-out -rotate-[90deg]"
                            :class="{
                                '!-rotate-180': menuOpen,
                            }"
                        />
                    </svg>
                    <span class="uppercase text-[#010101] font-bold mr-1">
                        MENU
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Motion, useAnimate, stagger } from "motion-v";

let menuOpen = ref(false);
const toggleMenuState = () => {
    menuOpen.value = !menuOpen.value;
};

const menuContent = ref(null);

const handleClickOutside = (event: any) => {
    if (
        menuContent.value &&
        !(menuContent.value as HTMLElement).contains(event.target)
    ) {
        menuOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});

const items = [
    {
        name: "Docs",
        url: "/docs",
        // children: [],
        cta: false,
        external: false,
    },
    {
        name: "Blog",
        url: "/blog",
        // children: [],
        cta: false,
        external: false,
    },
    {
        name: "Roadmap",
        url: "/roadmap",
        cta: false,
        external: false,
    },
    {
        name: "Console",
        url: "https://console.slung.tech",
        cta: true,
        external: true,
    },
].map((i, j) => ({
    ...i,
    id: j,
}));
</script>
