<template>
    <div class="min-h-[calc(40vh-113px)] relative flex flex-col gap-8 w-full">
        <header class="flex-1 relative h-full overflow-hidden w-full">
            <div
                class="flex flex-col items-center justify-center relative px-0 h-full w-full"
            >
                <div
                    class="flex flex-col gap-4 justify-center z-10 pt-[6.25rem] w-full"
                >
                    <h1
                        class="flex flex-col text-reveal-title-fluid tracking-headline uppercase"
                    >
                        COMPUTE ENGINE FOR REAL-TIME DECISIONS
                    </h1>
                    <div class="flex flex-col gap-8 w-full">
                        <p class="flex flex-col text-left text-base">
                            Orchestrate complex mission critical systems for
                            real-time emergent data. Designed for
                            <span class="font-semibold inline">
                                decisive autonomous action!
                            </span>
                        </p>
                        <div class="flex items-center gap-6 w-full">
                            <div
                                class="w-full gap-6 lg:gap-12 flex flex-col lg:flex-row text-sm"
                            >
                                <nuxt-link
                                    class="h-7 no-select px-8 text-center bg-[#dcb] relative flex justify-center items-center link-vertical"
                                    id="navigation-items"
                                    to="https://cal.com/ewanretor/slung-live"
                                    target="_blank"
                                >
                                    <span class="uppercase font-bold"
                                        >see it live</span
                                    >
                                </nuxt-link>
                                <nuxt-link
                                    class="h-7 no-select px-8 text-center bg-[#fcf4f0] relative flex justify-center items-center link-vertical"
                                    id="navigation-items"
                                    to="/"
                                >
                                    <span class="uppercase font-bold"
                                        >try it out yourself</span
                                    >
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<script setup></script>

<style>
@import "tailwindcss";

.hero {
    @apply relative px-2 rounded-xl flex justify-start items-center;
    * {
        @apply z-10 relative text-[#010101];
    }
}
.text-reveal-title-fluid {
    font-size: clamp(
        1.25rem,
        calc(1.25rem + (1.5 - 1.25) * ((95vw - 30rem) / (120 - 30))),
        5rem
    );
    line-height: clamp(
        2.025rem,
        calc(2.025rem + (3.5 - 2.025) * ((100vw - 30rem) / (120 - 30))),
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
