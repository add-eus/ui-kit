<script setup lang="ts">
import { computed } from "vue";
import type { RouteLocationOptions } from "vue-router";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

export interface UiFlexPaginationProps {
    itemPerPage: number;
    totalItems: number;
    currentPage?: number;
    maxLinksDisplayed?: number;
    noRouter?: boolean;
    routerQueryKey?: string;
}

export interface UiFlexPaginationEmits {
    (e: "update:currentPage", currentPage: number): void;
}

const emits = defineEmits<UiFlexPaginationEmits>();
const props = withDefaults(defineProps<UiFlexPaginationProps>(), {
    currentPage: 1,
    maxLinksDisplayed: 2,
    useRouter: true,
    routerQueryKey: "page",
});

const { t } = useI18n();
const route = useRoute();
const lastPage = computed(() => Math.ceil(props.totalItems / props.itemPerPage) || 1);
const totalPageDisplayed = computed(() =>
    lastPage.value > props.maxLinksDisplayed + 2
        ? props.maxLinksDisplayed + 2
        : lastPage.value
);
const pages = computed(() => {
    const _pages = [];
    let firstButton = props.currentPage - Math.floor(totalPageDisplayed.value / 2);
    let lastButton =
        firstButton +
        (totalPageDisplayed.value - Math.ceil(totalPageDisplayed.value % 2));

    if (firstButton < 1) {
        firstButton = 1;
        lastButton = firstButton + (totalPageDisplayed.value - 1);
    }

    if (lastButton > lastPage.value) {
        lastButton = lastPage.value;
        firstButton = lastButton - (totalPageDisplayed.value - 1);
    }

    for (let page = firstButton; page <= lastButton; page += 1) {
        if (page === firstButton || page === lastButton) {
            continue;
        }

        _pages.push(page);
    }

    return _pages;
});

const showLastLink = computed(() => lastPage.value > 1);

const paginatedLink = (page = 1) => {
    if (props.noRouter) {
        return {};
    }

    const _page = Math.max(1, Math.min(page, lastPage.value));
    const query: any = {
        ...route.query,
    };

    if (props.routerQueryKey) {
        query[props.routerQueryKey] = _page <= 1 ? undefined : _page;
    }

    return {
        name: route.name,
        params: route.params,
        query,
    } as RouteLocationOptions;
};
const handleLinkClick = (e: MouseEvent, page = 1) => {
    const _page = Math.max(1, Math.min(page, lastPage.value));
    emits("update:currentPage", _page);

    if (props.noRouter) {
        e.preventDefault();
        e.stopPropagation();

        return false;
    }
};
</script>

<template>
    <!-- class="flex-pagination pagination is-rounded" -->
    <VFlex
    role="navigation"
        class="container-pagination flex-pagination pagination is-rounded"
        aria-label="pagination">
        <ul class="pagination-list">

            <slot name="before-pagination">
                <li>
                    <RouterLink
                        :to="paginatedLink(currentPage - 1)"
                        tabindex="0"
                        class="pagination-previous has-chevron"
                        @keydown.space.prevent="(e) => (e.target as HTMLAnchorElement).click()"
                        @click="(e) => handleLinkClick(e, currentPage - 1)">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 20 20" width="30"  height="30" >
							<path fill="#000" d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
						</svg>
                    </RouterLink>
                </li>
            </slot>

            <li>
                <RouterLink
                    :to="paginatedLink(1)"
                    tabindex="0"
                    class="pagination-link"
                    :aria-label="t('goto-page-title', { page: 1 })"
                    :class="[currentPage === 1 && 'is-current']"
                    @keydown.space.prevent="(e) => (e.target as HTMLAnchorElement).click()"
                    @click="(e) => handleLinkClick(e, 1)">
                    1
                </RouterLink>
            </li>

            <li v-if="showLastLink && (pages.length === 0 || pages[0] > 2)">
                <span class="pagination-ellipsis">…</span>
            </li>

            <li v-for="page in pages" :key="page">
                <RouterLink
                    :to="paginatedLink(page)"
                    tabindex="0"
                    class="pagination-link"
                    :aria-label="t('goto-page-title', { page: page })"
                    :aria-current="currentPage === page ? 'page' : undefined"
                    :class="[currentPage === page && 'is-current']"
                    @keydown.space.prevent="(e) => (e.target as HTMLAnchorElement).click()"
                    @click="(e) => handleLinkClick(e, page)">
                    {{ page }}
                </RouterLink>
            </li>

            <li v-if="showLastLink && pages[pages.length - 1] < lastPage - 1">
                <span class="pagination-ellipsis">…</span>
            </li>

            <li v-if="showLastLink">
                <RouterLink
                    :to="paginatedLink(lastPage)"
                    tabindex="0"
                    class="pagination-link"
                    :aria-label="t('goto-page-title', { page: lastPage })"
                    :class="[currentPage === lastPage && 'is-current']"
                    @keydown.space.prevent="(e) => (e.target as HTMLAnchorElement).click()"
                    @click="(e) => handleLinkClick(e, lastPage)">
                    {{ lastPage }}
                </RouterLink>
            </li>

            <slot name="after-pagination">  
                <li>
                    <RouterLink
                        :to="paginatedLink(currentPage + 1)"
                        tabindex="0"
                        class="pagination-next has-chevron"
                        @keydown.space.prevent="(e) => (e.target as HTMLAnchorElement).click()"
                        @click="(e) => handleLinkClick(e, currentPage + 1)">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 20 20" width="30"  height="30" >
							<path fill="#000" d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
						</svg>
                    </RouterLink>
                </li>
            </slot>

        </ul>

        <slot name="before-navigation"></slot>
        <slot name="after-navigation"></slot>
    </VFlex>
</template>
<style lang="scss" scoped>
.container-pagination {
    &.flex-pagination {
        .pagination-list li .pagination-link {
            box-shadow: none;
        }
        .pagination-next, .pagination-previous {
            &.has-chevron {
                margin-top: 2px;
                min-width: 30px;
                height: 30px;
                padding: 0;
                border: none;
                &:hover {
                    border: 1px solid var(--medium-grey);
                }
            }
        }
    }
}
</style>
