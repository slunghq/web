<template>
    <div
        class="w-full py-4 flex justify-center items-center text-sm fixed bottom-0 left-0 right-0 z-[999]"
    >
        <div
            class="max-w-3xl w-full px-4 md:px-8 mb-8 flex justify-between items-center"
        >
            <div class="w-28.5 flex justify-start items-center z-[200]">
                <nuxt-link to="/">
                    <img src="assets/img/logo.png" alt="Logo" class="w-7" />
                </nuxt-link>
            </div>
            <div
                class="hidden md:flex gap-2 items-end justify-center z-[200]"
            ></div>
            <div
                class="z-[100] flex flex-wrap gap-2 items-center max-w-3xl"
                ref="menuContent"
            >
                <Transition name="menu" :duration="250">
                    <div>
                        <Motion
                            as="ul"
                            :initial="{ y: 4, opacity: 0 }"
                            :animate="
                                menuOpen
                                    ? { y: 0, opacity: 1 }
                                    : { y: 4, opacity: 0 }
                            "
                            class="flex flex-col items-center justify-center py-2 gap-2 h-fit max-w-3xl w-full absolute bottom-full right-1/2 translate-x-1/2 mb-4 bg-[var(--bg-inset)]"
                            id="navigation-items"
                            :class="{ 'pointer-events-none!': !menuOpen }"
                        >
                            <Motion
                                v-for="group in groups"
                                :key="group.id"
                                as="li"
                                :initial="{ y: 4, opacity: 0 }"
                                :animate="
                                    menuOpen
                                        ? { y: 0, opacity: 1 }
                                        : { y: 4, opacity: 0 }
                                "
                                :transition="
                                    menuOpen
                                        ? {
                                              delay:
                                                  (groups.length -
                                                      1 -
                                                      group.id) *
                                                  0.05,
                                          }
                                        : { delay: group.id * 0.05 }
                                "
                                class="w-[calc(100%-16px)] relative text-[var(--text-primary)]"
                                id="navigation-items"
                            >
                                <button
                                    class="w-full px-4 py-2 text-xs uppercase tracking-wide text-[var(--accent-secondary)] bg-[var(--bg-elevated)] text-start font-semibold cursor-pointer flex items-center justify-between"
                                    :class="{
                                        'text-[var(--accent-primary)]!':
                                            group.name === activeGroupName,
                                    }"
                                    @click="toggleGroup(group.name)"
                                >
                                    <span>{{ group.name }}</span>
                                    <span class="text-sm leading-none">
                                        {{
                                            openGroups[group.name] === false
                                                ? "+"
                                                : "-"
                                        }}
                                    </span>
                                </button>
                                <Transition name="accordion-content">
                                    <div
                                        v-show="openGroups[group.name] !== false"
                                        class="grid overflow-hidden"
                                    >
                                        <div class="min-h-0 overflow-hidden flex flex-col">
                                            <nuxt-link
                                                v-for="item in group.items"
                                                :key="item.id"
                                                class="text-start h-9 w-full flex items-center justify-between no-select bg-[var(--bg-elevated)] hover:bg-[var(--bg-inset)]"
                                                :class="{
                                                    'bg-[#0f1814]!': isActivePath(
                                                        item.url,
                                                    ),
                                                }"
                                                :id="
                                                    isActivePath(item.url)
                                                        ? 'navigation-items'
                                                        : undefined
                                                "
                                                :to="item.url"
                                            >
                                                <span
                                                    class="uppercase px-6 font-semibold"
                                                    :class="{
                                                        'text-[var(--accent-primary)]': isActivePath(
                                                            item.url,
                                                        ),
                                                    }"
                                                >
                                                    {{ item.name }}
                                                </span>
                                            </nuxt-link>
                                        </div>
                                    </div>
                                </Transition>
                            </Motion>
                        </Motion>
                    </div>
                </Transition>
                <DocsSearch />
                <button
                    @click="toggleMenuState"
                    class="h-7 w-[120px] text-center bg-[var(--accent-primary-dim)] hover:bg-[var(--accent-primary-inset)] gap-4 relative flex justify-center items-center"
                    id="navigation-items"
                    :class="{ 'bg-[var(--accent-primary-inset)]!': menuOpen }"
                >
                    <svg
                        class="fill-[var(--text-primary)] shrink-0 mr-2"
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
                    <span class="uppercase text-[var(--text-primary)] font-bold mr-1">
                        MENU
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Motion } from "motion-v";
const route = useRoute();

let menuOpen = ref(false);
const toggleMenuState = () => {
    menuOpen.value = !menuOpen.value;
};

const menuContent = ref(null);

const handleClickOutside = (event: MouseEvent) => {
    if (
        menuContent.value &&
        !(menuContent.value as HTMLElement).contains(event.target as Node)
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

const { data: docsPages } = await useAsyncData("docs-nav-items", () =>
    queryCollection("docs")
        .select(
            "title",
            "path",
            "index",
            "navGroup",
            "navGroupIndex",
            "navTitle",
            "navHidden",
        )
        .all(),
);

const groups = computed(() => {
    const pages = docsPages.value || [];
    const sortedPages = pages
        .filter((page) => !page.navHidden)
        .sort((a, b) => {
            const ai =
                typeof a.index === "number" ? a.index : Number.MAX_SAFE_INTEGER;
            const bi =
                typeof b.index === "number" ? b.index : Number.MAX_SAFE_INTEGER;
            if (ai !== bi) return ai - bi;
            return String(a.title).localeCompare(String(b.title));
        });

    if (!sortedPages.length) {
        return [
            {
                id: 0,
                name: "General",
                items: [{ id: 1, name: "Docs Home", url: "/docs" }],
            },
        ];
    }

    const groupedMap = sortedPages.reduce(
        (acc, page) => {
            const groupName = page.navGroup?.trim() || "General";
            if (!acc[groupName]) {
                acc[groupName] = {
                    index:
                        typeof page.navGroupIndex === "number"
                            ? page.navGroupIndex
                            : Number.MAX_SAFE_INTEGER,
                    pages: [],
                };
            }
            if (
                typeof page.navGroupIndex === "number" &&
                page.navGroupIndex < acc[groupName].index
            ) {
                acc[groupName].index = page.navGroupIndex;
            }
            acc[groupName].pages.push(page);
            return acc;
        },
        {} as Record<
            string,
            {
                index: number;
                pages: typeof sortedPages;
            }
        >,
    );

    const orderedGroups = Object.entries(groupedMap).sort(
        ([aName, aData], [bName, bData]) => {
            if (aData.index !== bData.index) {
                return aData.index - bData.index;
            }
            if (aName === "General") return 1;
            if (bName === "General") return -1;
            return aName.localeCompare(bName);
        },
    );

    return orderedGroups.map(([groupName, groupData], groupId) => {
        const items = groupData.pages.map((page, itemIdx) => ({
            id: `${groupId}-${itemIdx}`,
            name: page.navTitle || page.title,
            url: page.path === "/docs/home" ? "/docs" : page.path,
        }));

        return {
            id: groupId,
            name: groupName,
            items,
        };
    });
});

const normalizeDocsPath = (path: string) => {
    if (path === "/docs/home") return "/docs";
    return path.replace(/\/+$/, "") || "/";
};

const currentDocsPath = computed(() => normalizeDocsPath(route.path));
const activeGroupName = computed(() => {
    for (const group of groups.value) {
        if (
            group.items.some(
                (item) => normalizeDocsPath(item.url) === currentDocsPath.value,
            )
        ) {
            return group.name;
        }
    }
    return "";
});

const isActivePath = (path: string) =>
    normalizeDocsPath(path) === currentDocsPath.value;

const openGroups = ref<Record<string, boolean>>({});
watch(
    groups,
    () => {
        const nextOpenState: Record<string, boolean> = {
            ...openGroups.value,
        };
        for (const group of groups.value) {
            if (!(group.name in nextOpenState)) {
                nextOpenState[group.name] = true;
            }
        }
        openGroups.value = nextOpenState;
    },
    { immediate: true },
);

const toggleGroup = (groupName: string) => {
    openGroups.value[groupName] = openGroups.value[groupName] === false;
};

const desktopItems = computed(() =>
    groups.value.flatMap((group) => group.items).slice(0, 2),
);
</script>

<style scoped>
.accordion-content-enter-active,
.accordion-content-leave-active {
    grid-template-rows: 1fr;
    opacity: 1;
    transition:
        grid-template-rows 220ms ease,
        opacity 160ms ease;
}

.accordion-content-enter-from,
.accordion-content-leave-to {
    grid-template-rows: 0fr;
    opacity: 0;
}
</style>
