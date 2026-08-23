<template>
    <div class="flex flex-col justify-evenly min-h-[calc(100vh-32px)] relative">
        <DocsNavigation />
        <main class="grow w-full relative">
            <!-- Left border positioned at max-width boundary -->
            <div
                class="hidden md:block fixed top-0 bottom-0 w-px border-l border-dashed border-[var(--border-default)] pointer-events-none"
                style="left: calc(50% - 24rem)"
            />
            <!-- Content centered -->
            <div class="flex justify-center w-full">
                <div class="max-w-3xl w-full px-4 md:px-8">
                    <slot />
                </div>
            </div>
            <!-- Right border positioned at max-width boundary -->
            <div
                class="hidden md:block fixed top-0 bottom-0 w-px border-r border-dashed border-[var(--border-default)] pointer-events-none"
                style="right: calc(50% - 24rem)"
            />
        </main>
         <DocsFooter />
    </div>
</template>
