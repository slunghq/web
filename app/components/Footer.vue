<template>
    <div
        class="w-full px-4 md:px-16 py-9 md:py-11 z-999 footer bottom-0 bg-[#fffdf6] border-[#4e0d0b] border-t border-dashed"
    >
        <ul class="uppercase font-semibold">
            <li class="link w-fit">
                <nuxt-link to="https://github.com/slunghq/slung"
                    ><span>gitHub</span></nuxt-link
                >
            </li>
            <li class="link w-fit">
                <nuxt-link to="https://x.com/s3ndotxyz"
                    ><span
                        >x <span class="line-through">twitter</span></span
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
        <div class="w-full flex justify-between items-center py-4">
            <div class="flex items-center font-bold text-lg">
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
</template>

<style scoped>
@import "tailwindcss";

li {
    @apply px-2;
    display: block;
}
</style>
