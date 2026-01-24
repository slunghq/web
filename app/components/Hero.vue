<template>
    <div class="min-h-screen relative flex flex-col gap-8">
        <header class="flex-1 relative h-full overflow-hidden">
            <div
                class="flex flex-col items-center justify-center md:grid grid-cols-6 gap-32 relative px-[1.25rem] lg:px-[1.25rem] md:pt-[calc(12.5%)] h-full max-w-[1920px] mx-auto"
            >
                <div
                    class="h-full col-[2/6] xl:col-[2/5] flex flex-col gap-8 justify-center z-10 pt-[6.25rem]"
                >
                    <h1
                        class="flex flex-col text-reveal-title-fluid tracking-headline uppercase"
                    >
                        ENGINE FOR INTELLIGENCE THAT MOVES
                    </h1>
                    <div
                        class="md:grid grid-cols-3 xl:grid-cols-4 gap-x-32 gap-y-12 flex flex-col"
                    >
                        <p
                            class="flex flex-col text-left text-medium-fluid col-[1/4] xl:col-[1/4.5]"
                        >
                            We build systems that process real-time mission
                            critical data for front-runners. Designed for speed,
                            scale, and decisive action.
                        </p>
                        <div
                            class="col-[1/3] xl:col-[1/4] flex items-center gap-12"
                        >
                            <div
                                class="w-full max-w-[800px] gap-12 flex flex-col sm:flex-row"
                            >
                                <nuxt-link
                                    class="h-[36px] px-8 text-center bg-[#ddd] relative flex justify-center items-center link-vertical"
                                    id="navigation-items"
                                    to="https://cal.com/ewanretor/slung-live"
                                >
                                    <span class="uppercase font-bold"
                                        >see it live</span
                                    >
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="h-full col-[2/6] xl:col-[2/5] flex flex-col gap-8 justify-center z-10 pt-[6.25rem]"
                ></div>
            </div>
        </header>
    </div>
</template>

<script setup></script>

<style scoped>
@import "tailwindcss";

.hero {
    @apply relative px-2 rounded-xl flex justify-start items-center;
    * {
        @apply z-10 relative text-[#010101];
    }
}
.text-reveal-title-fluid {
    font-size: clamp(
        2.25rem,
        calc(2.25rem + (5 - 2.25) * ((85vw - 30rem) / (120 - 30))),
        5rem
    );
    line-height: clamp(
        2.025rem,
        calc(2.025rem + (4.5 - 2.025) * ((100vw - 30rem) / (120 - 30))),
        4.5rem
    );
}

.text-medium-fluid {
    font-size: clamp(
        1.125rem,
        calc(1.125rem + (1.25 - 1.125) * ((100vw - 30rem) / (120 - 30))),
        1.25rem
    );
    line-height: clamp(
        1.5rem,
        calc(1.5rem + (1.75 - 1.5) * ((100vw - 30rem) / (120 - 30))),
        1.75rem
    );
}
</style>
