<template>
    <div class="flex flex-col justify-evenly min-h-[calc(100vh-32px)]">
        <Navigation />
        <main class="grow">
            <slot />
        </main>
        <Footer />
    </div>
</template>
