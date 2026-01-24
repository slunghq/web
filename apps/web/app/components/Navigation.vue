<template>
  <div class="w-full py-4 flex justify-center items-center">
    <div
      class="min-w-[calc(100%-2.125rem)] md:min-w-[calc(100%-7.75rem)] mb-8 flex justify-between items-center fixed bottom-0 z-[999]"
    >
      <div class="w-[114px] flex justify-start items-center">
        <img src="assets/img/logo.png" alt="Logo" class="w-7" />
      </div>
      <div class="hidden md:flex gap-2 items-end justify-center">
        <nuxt-link class="text-start link" to="/docs">
          <span class="px-2 font-semibold" data-text="// Docs">// Docs</span>
        </nuxt-link>
        <nuxt-link class="text-start link" to="/blog">
          <span class="px-2 font-semibold" data-text="// Blog">// Blog</span>
        </nuxt-link>
      </div>
      <div
        class="z-[999] flex flex-wrap gap-2 justify-end items-center text-white"
        ref="menuContent"
      >
        <!-- <Transition name="menu" :duration="250">
          <ul
            class="gap-2 contents"
            :class="{ '!pointer-events-none': !menuOpen }"
          >
            <Motion
              v-for="i in items"
              :key="i.id"
              as="li"
              :initial="{ x: 4, opacity: 0 }"
              :animate="menuOpen ? { x: 0, opacity: 1 } : { x: 4, opacity: 0 }"
              :transition="
                menuOpen
                  ? { delay: (items.length - 1 - i.id) * 0.05 }
                  : { delay: i.id * 0.05 }
              "
              class="inline-block"
            >
              <nuxt-link class="text-start" :to="i.url"
                ><span class="uppercase px-2 text-[#EE6F53] font-semibold"
                  >_{{ i.name }}</span
                >
              </nuxt-link>
            </Motion>
          </ul>
        </Transition> -->
        <button
          @click="toggleMenuState"
          class="h-[36px] w-[114px] text-center bg-[#ddd] gap-4 relative flex justify-center items-center"
          id="navigation-items"
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
          <span class="uppercase text-[#010101] font-bold mr-1"> MENU </span>
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
    name: "Cloud",
    url: "https://cloud.s3n.xyz",
    // children: [],
    external: false,
  },
  {
    name: "Docs",
    url: "https://docs.s3n.xyz",
    // children: [],
    external: false,
  },
].map((i, j) => ({
  ...i,
  id: j,
}));
</script>
