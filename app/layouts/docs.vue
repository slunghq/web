<template>
    <div class="flex flex-col justify-evenly min-h-[calc(100vh-32px)]">
        <DocsNavigation />
        <main class="grow">
            <slot />
        </main>
    </div>
</template>
