<template>
    <div class="flex flex-col mb-6 h-fit">
        <nuxt-link
            :to="post.path"
            class="block bg-[#faf8f4] hover:bg-[#fcf4f0] transition-all duration-300 hover:transform border border-transparent hover:border-[#4e0d0b]"
        >
            <div
                class="relative h-auto overflow-hidden bg-[#faf8f4] hover:bg-[#fcf4f0] group"
            >
                <img
                    :src="`/blog/${post.hero}`"
                    :alt="post.title"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[106.25%] hover:transform hover:scale-[1.0625]"
                />
                <div class="absolute"></div>
                <div
                    v-if="post.tags && post.tags.length"
                    class="absolute top-3 right-3 flex gap-1 flex-wrap justify-end max-w-[60%]"
                >
                    <span
                        v-for="tag in post.tags.slice(0, 2)"
                        :key="tag"
                        class="px-2 py-0.5 text-xs bg-[#eae7e3] text-[#001917] uppercase backdrop-blur-sm font-[Intel]"
                    >
                        {{ tag }}
                    </span>
                    <span
                        v-if="post.tags.length > 2"
                        class="px-2 py-0.5 text-xs bg-[#eae7e3] text-[#001917] uppercase backdrop-blur-sm font-[Intel]"
                    >
                        +{{ post.tags.length - 2 }}
                    </span>
                </div>
            </div>
        </nuxt-link>
        <div class="pt-4 h-fit">
            <span
                v-if="post.date"
                class="inline-block mb-3 pb-1 text-[#4e0d0b]"
            >
                {{ formatDate(post.date) }} -
                <span v-for="author in post.authors">
                    {{ author
                    }}<span
                        v-if="author !== post.authors[post.authors.length - 1]"
                        >,
                    </span>
                </span>
            </span>
            <nuxt-link :to="post.path">
                <h2 class="text-2xl font-bold line-clamp-2">
                    {{ post.title }}
                </h2>
            </nuxt-link>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    post: {
        type: Object,
        required: true,
    },
    index: {
        type: Number,
        default: 0,
    },
});

const formatDate = (date: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
</script>
