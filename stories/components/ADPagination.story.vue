<script setup lang="ts">
import ADPagination from "../../components/ADPagination.vue";
import '../../index.scss';

</script>

<template>
    <Story :layout="{ type: 'grid', width: 400 }">
        <Variant title="default">
            <ADPagination
                :current-page="1"
                class="mt-6"
                :item-per-page="1"
                :total-items="10"
                no-router />
                
        </Variant>
    </Story>
</template>

<docs lang="md">
# ADPagination

This is a pagination component.

## Props

- `item-per-page` (number, required): Specifies the number of items per page.
- `total-items` (number, required): Specifies the total number of items.
- `current-page` (number, optional, default: 1): Specifies the current page.
- `maxLinks-displayed` (number, optional, default: 2): Specifies the maximum number of page links to display.
- `no-router` (boolean, optional): Specifies whether to use Vue Router for navigation. If set to true, navigation will not use Vue Router.
- `router-query-key` (string, optional, default: "page"): Specifies the query key to use with Vue Router for pagination.

## Events

- `update:currentPage`: Emitted when the current page is updated.

## Slots

- `before-pagination`: Slot for content to be placed before the pagination links.
- `after-pagination`: Slot for content to be placed after the pagination links.
- `before-navigation`: Slot for content to be placed before the pagination navigation.
- `after-navigation`: Slot for content to be placed after the pagination navigation.
</docs>