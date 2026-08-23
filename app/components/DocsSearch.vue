<template>
    <div ref="searchRoot">
        <button
            type="button"
            class="h-7 px-2 md:px-3 bg-[var(--bg-elevated-inset)] hover:bg-[var(--bg-inset)] gap-2 relative flex justify-center items-center"
            id="navigation-items"
            aria-label="Search documentation"
            @click="openSearch"
        >
            <font-awesome :icon="['fas', 'magnifying-glass']" aria-hidden="true" />
            <span class="hidden md:inline uppercase font-bold">Search</span>
            <kbd class="keycap w-fit! px-0.5 hidden! md:inline!">{{ isMac ? "⌘" : "Ctrl" }}</kbd>
            <kbd class="keycap hidden! md:inline!">K</kbd>
        </button>

        <Teleport to="body">
            <Transition name="search-modal">
                <div
                    v-if="isOpen"
                    class="fixed inset-0 z-[1000] flex items-start justify-center bg-black/50 px-4 pt-[15vh]"
                    role="presentation"
                    @mousedown.self="closeSearch"
                >
                    <div
                        ref="modal"
                        class="w-full max-w-2xl overflow-hidden bg-[var(--bg-elevated)] border border-[var(--border-default)]"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Search documentation"
                    >
                        <div class="flex items-center gap-3 border-b border-[var(--border-default)] px-4">
                            <font-awesome
                                :icon="['fas', 'magnifying-glass']"
                                class="text-[var(--text-secondary)] text-sm"
                                aria-hidden="true"
                            />
                            <input
                                ref="searchInput"
                                v-model="query"
                                type="search"
                                class="min-w-0 grow bg-transparent py-4 text-sm outline-none placeholder:text-[var(--text-secondary)]"
                                placeholder="Search..."
                                aria-label="Search documentation"
                                role="combobox"
                                aria-controls="search-results"
                                :aria-activedescendant="activeResultId"
                                @keydown="handleResultKeydown"
                                @keydown.escape="closeSearch"
                            />
                            <button
                                type="button"
                                class="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                                @click="closeSearch"
                            >
                                <kbd class="keycap w-fit! px-0.5 hidden! md:inline!">ESC</kbd>
                            </button>
                        </div>

                        <div
                            v-if="query.trim()"
                            id="search-results"
                            class="max-h-[min(60vh,28rem)] overflow-y-auto p-2"
                            role="listbox"
                        >
                            <NuxtLink
                                v-for="(result, index) in results"
                                :key="result.id"
                                :to="result.id"
                                :id="`search-result-${index}`"
                                role="option"
                                :aria-selected="activeIndex === index"
                                :ref="(element) => setResultRef(index, element)"
                                class="block px-3 py-3"
                                :class="{
                                    'bg-[var(--bg-inset)]': activeIndex === index,
                                }"
                                @mouseenter="activeIndex = index"
                                @click="closeSearch"
                            >
                                <span class="block font-semibold text-sm text-[var(--accent-primary)]">
                                    {{ result.title }}
                                </span>
                                <span
                                    v-if="result.titles?.length"
                                    class="mt-1 block text-xs text-[var(--text-secondary)]"
                                >
                                    {{ result.titles.join(" / ") }}
                                </span>
                                <span class="mt-1 block text-sm text-[var(--text-secondary)]">
                                    <span v-html="highlight(preview(result.content))" />
                                </span>
                            </NuxtLink>

                            <p
                                v-if="!results.length"
                                class="px-3 py-6 text-center text-sm text-[var(--text-secondary)]"
                            >
                                No results found.
                            </p>
                        </div>
                        <p v-else class="px-5 py-6 text-sm text-[var(--text-secondary)]">
                            Start typing to search the documentation.
                        </p>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import {
    computed,
    nextTick,
    onMounted,
    onUnmounted,
    ref,
    watch,
} from "vue";

const query = ref("");
const isOpen = ref(false);
const isMac = ref(false);
const searchInput = ref<HTMLInputElement | null>(null);
const activeIndex = ref(0);
const resultElements = ref<HTMLElement[]>([]);
const activeResultId = computed(() =>
    results.value.length ? `search-result-${activeIndex.value}` : undefined,
);

const { data: sections } = await useAsyncData("docs-search-sections", () =>
    queryCollectionSearchSections("docs", {
        ignoredTags: ["code"],
    }),
);

const results = computed(() => {
    const term = query.value.trim().toLowerCase();
    if (!term || !sections.value) return [];

    const terms = term.split(/\s+/);

    return sections.value
        .map((section) => {
            const title = section.title.toLowerCase();
            const headings = section.titles.join(" ").toLowerCase();
            const content = section.content.toLowerCase();
            let score = 0;

            if (title === term) score += 100;
            if (title.includes(term)) score += 50;
            if (headings.includes(term)) score += 25;
            if (content.includes(term)) score += 10;

            for (const word of terms) {
                if (title.includes(word)) score += 20;
                if (headings.includes(word)) score += 10;
                if (content.includes(word)) score += 2;
            }

            return { section, score };
        })
        .filter((result) => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
        .map((result) => result.section);
});

const setResultRef = (
    index: number,
    element: HTMLElement | { $el: HTMLElement } | null,
) => {
    if (!element) return;
    resultElements.value[index] =
        "$el" in element ? element.$el : element;
};

watch(query, () => {
    activeIndex.value = 0;
    resultElements.value = [];
});

watch(activeIndex, async () => {
    await nextTick();
    resultElements.value[activeIndex.value]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
    });
});

const handleResultKeydown = (event: KeyboardEvent) => {
    if (!results.value.length) return;

    if (event.key === "ArrowDown") {
        event.preventDefault();
        activeIndex.value = (activeIndex.value + 1) % results.value.length;
    } else if (event.key === "ArrowUp") {
        event.preventDefault();
        activeIndex.value =
            (activeIndex.value - 1 + results.value.length) % results.value.length;
    } else if (event.key === "Enter") {
        event.preventDefault();
        navigateTo(results.value[activeIndex.value].id);
        closeSearch();
    }
};

const preview = (content: string) => {
    const text = content.replace(/\s+/g, " ").trim();
    if (text.length <= 140) return text;

    const terms = query.value.toLowerCase().split(/\s+/).filter(Boolean);
    const matchIndex = terms.reduce((earliest, term) => {
        const index = text.toLowerCase().indexOf(term);
        return index !== -1 && (earliest === -1 || index < earliest)
            ? index
            : earliest;
    }, -1);

    if (matchIndex === -1) return `${text.slice(0, 140)}…`;

    const length = 140;
    const start = Math.max(
        0,
        Math.min(matchIndex - 50, text.length - length),
    );
    const excerpt = text.slice(start, start + length);

    return `${start > 0 ? "…" : ""}${excerpt}${start + length < text.length ? "…" : ""}`;
};

const escapeHtml = (value: string) =>
    value.replace(
        /[&<>"']/g,
        (character) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;",
            })[character] || character,
    );

const escapeRegex = (value: string) =>
    value.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&");

const highlight = (value: string) => {
    const terms = query.value
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((term) => escapeRegex(escapeHtml(term)))
        .sort((a, b) => b.length - a.length);
    const escapedValue = escapeHtml(value);

    if (!terms.length) return escapedValue;

    return escapedValue.replace(
        new RegExp(
            `\\b[\\w-]*(?:${terms.join("|")})[\\w-]*\\b`,
            "gi",
        ),
        '<mark class="search-highlight">$&</mark>',
    );
};

const openSearch = async () => {
    isOpen.value = true;
    await nextTick();
    searchInput.value?.focus();
};

const closeSearch = () => {
    isOpen.value = false;
    query.value = "";
};

const handleShortcut = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (isOpen.value) {
            closeSearch();
        } else {
            openSearch();
        }
    }
};

onMounted(() => {
    isMac.value = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
    window.addEventListener("keydown", handleShortcut);
});
onUnmounted(() => window.removeEventListener("keydown", handleShortcut));
</script>

<style scoped>
.search-modal-enter-active,
.search-modal-leave-active {
    transition: opacity 160ms ease;
}

.search-modal-enter-active > div,
.search-modal-leave-active > div {
    transition: transform 160ms ease;
}

.search-modal-enter-from,
.search-modal-leave-to {
    opacity: 0;
}

.search-modal-enter-from > div,
.search-modal-leave-to > div {
    transform: translateY(2px);
}

:deep(.search-highlight) {
    background-color: var(--accent-primary);
    color: white;
    padding: 0 0.15em;
}
</style>
