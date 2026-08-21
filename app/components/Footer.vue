<template>
    <div
        class="w-full bg-[var(--bg-primary)] border-[var(--border-default)] border-t border-dashed text-sm z-999 footer flex justify-center"
    >
        <div
            class="max-w-3xl w-full px-4 md:px-8 py-9 md:py-11 md:border-l md:border-r border-dashed border-[var(--border-default)]"
        >
            <div class="w-full flex justify-between items-start">
                <ul class="uppercase font-semibold">
                    <li class="link w-fit">
                        <nuxt-link to="https://github.com/slunghq/slung"
                            ><span>gitHub</span></nuxt-link
                        >
                    </li>
                    <li class="link w-fit">
                        <nuxt-link to="https://x.com/slunghq"
                            ><span
                                >x
                                <span class="line-through">twitter</span></span
                            ></nuxt-link
                        >
                    </li>
                    <li class="link w-fit">
                        <nuxt-link to="/docs">
                            <span>docs</span>
                        </nuxt-link>
                    </li>
                    <li class="link w-fit">
                        <nuxt-link to="/blog">
                            <span>blog</span>
                        </nuxt-link>
                    </li>
                    <li class="link w-fit">
                        <nuxt-link to="/roadmap">
                            <span>roadmap</span>
                        </nuxt-link>
                    </li>
                </ul>
                <!-- <div class="font-semibold text-sm w-fit">
                    <span class="mr-1">Backed by: </span>
                    <nuxt-link to=""
                        ><img
                            src="@/assets/img/.svg"
                            class="md:inline h-4.5 w-auto"
                    /></nuxt-link>
                </div> -->
            </div>
            <div class="w-full flex justify-between items-center py-4">
                <div class="flex items-center font-bold text-base">
                    Slung © {{ new Date().getFullYear() }}.
                </div>
                <span class="h-[40px]"
                    ><img
                        src="@/assets/img/logo.png"
                        class="w-7 cursor-pointer"
                        @click="useRouter().push('/')"
                    />
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "tailwindcss";

li {
    @apply px-2;
    display: block;
}
</style>
