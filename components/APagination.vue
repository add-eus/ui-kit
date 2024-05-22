<script setup lang="ts">
import { computed, watch } from "vue";
import type { RouteLocationOptions } from "vue-router";
import { useRoute } from "vue-router";
import AIcon from "./AIcon.vue";

export interface APaginationProps {
  itemPerPage: number;
  totalItems: number;
  currentPage?: number;
  maxLinksDisplayed?: number;
  noRouter?: boolean;
  routerQueryKey?: string;
}

export interface APaginationEmits {
  (e: "update:currentPage", currentPage: number): void;
}

const emits = defineEmits<APaginationEmits>();
const props = withDefaults(defineProps<APaginationProps>(), {
  currentPage: 1,
  maxLinksDisplayed: 2,
  useRouter: true,
  routerQueryKey: "page",
});

const route = useRoute();
const lastPage = computed(
  () => Math.ceil(props.totalItems / props.itemPerPage) || 1
);
const totalPageDisplayed = computed(() =>
  lastPage.value > props.maxLinksDisplayed + 2
    ? props.maxLinksDisplayed + 2
    : lastPage.value
);
const pages = computed(() => {
  const _pages: number[] = [];
  let firstButton =
    props.currentPage - Math.floor(totalPageDisplayed.value / 2);
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
if (props.noRouter !== true) {
  watch(
    () => route.query.page,
    (page) => {
      if (typeof page !== "undefined" && typeof page !== "string") {
        return;
      }
      const pageNumber = parseInt(page || "1");
      if (pageNumber !== props.currentPage) {
        emits("update:currentPage", pageNumber);
      }
    },
    { immediate: true }
  );
}
</script>

<template>
  <div class="container-pagination">
    <ul class="pagination-list">
      <!-- BEFORE -->
      <div name="before-pagination">
        <li class="pagination-arrow">
          <RouterLink
            :to="paginatedLink(currentPage - 1)"
            tabindex="0"
            @keydown.space.prevent="(e) => (e.target as HTMLAnchorElement).click()"
            @click="(e) => handleLinkClick(e, currentPage - 1)"
          >
            <AIcon icon="arrow_back_ios_new" color="var(--a-blue)" />
          </RouterLink>
        </li>
      </div>

      <li class="pagination-case">
        <!-- :aria-label="t('goto-page-title', { page: 1 })" -->
        <RouterLink
          :to="paginatedLink(1)"
          tabindex="0"
          class="pagination-number"
          :class="[currentPage === 1 && 'is-current']"
          @keydown.space.prevent="(e) => (e.target as HTMLAnchorElement).click()"
          @click="(e) => handleLinkClick(e, 1)"
        >
          1
        </RouterLink>
      </li>

      <li v-if="showLastLink && (pages.length === 0 || pages[0] > 2)">
        <span class="">…</span>
      </li>

      <li v-for="page in pages" :key="page" class="pagination-case">
        <!-- :aria-label="t('goto-page-title', { page: page })" -->
        <RouterLink
          :to="paginatedLink(page)"
          tabindex="0"
          class="pagination-number"
          :aria-current="currentPage === page ? 'page' : undefined"
          :class="[currentPage === page && 'is-current']"
          @keydown.space.prevent="(e) => (e.target as HTMLAnchorElement).click()"
          @click="(e) => handleLinkClick(e, page)"
        >
          {{ page }}
        </RouterLink>
      </li>

      <li v-if="showLastLink && pages[pages.length - 1] < lastPage - 1">
        <span class="">…</span>
      </li>

      <li v-if="showLastLink" class="pagination-case">
        <!-- :aria-label="t('goto-page-title', { page: lastPage })" -->
        <RouterLink
          :to="paginatedLink(lastPage)"
          tabindex="0"
          class="pagination-number"
          :class="[currentPage === lastPage && 'is-current']"
          @keydown.space.prevent="(e) => (e.target as HTMLAnchorElement).click()"
          @click="(e) => handleLinkClick(e, lastPage)"
        >
          {{ lastPage }}
        </RouterLink>
      </li>

      <!-- AFTER -->
      <div name="after-pagination">
        <li class="pagination-arrow">
          <RouterLink
            :to="paginatedLink(currentPage + 1)"
            tabindex="0"
            @keydown.space.prevent="(e) => (e.target as HTMLAnchorElement).click()"
            @click="(e) => handleLinkClick(e, currentPage + 1)"
          >
            <AIcon icon="arrow_forward_ios" color="var(--a-blue)" />
          </RouterLink>
        </li>
      </div>
    </ul>

    <div name="before-navigation"></div>
    <div name="after-navigation"></div>
  </div>
</template>

<style lang="scss" scoped>
.container-pagination {
  .pagination-list {
    display: flex;
    li {
      cursor: pointer;
      list-style: none;
      display: flex;
      align-items: center;
    }
  }
  .pagination-arrow {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin: 0.25em;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      border-radius: 50%;
      border: 1px solid transparent;
      transition: border 0.15s ease-in-out;
      &:hover {
        border-radius: 50%;
        border: 1px solid var(--a-grey);
      }
      i {
        font-size: 1em;
      }
    }
  }
  .pagination-case {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin: 0.25em;

    .pagination-number {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1em;
      background: var(--a-white);
      color: var(--a-black);
      height: 100%;
      width: 100%;
      border-radius: 50%;
      border: 1px solid var(--a-grey);
      transition: border 0.15s ease-in-out;

      &:hover {
        border: 1px solid var(--a-grey-dark);
      }

      &.is-current {
        background: var(--a-blue);
        border: 1px solid var(--a-blue);
        color: var(--a-white);
      }
    }
  }
}
</style>
