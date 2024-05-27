<script setup lang="ts">
import ASearch from "../../components/ASearch.vue";
import { ref } from "vue";
import "../../index.scss";

const items = [
  {
    name: "Item 1",
    id: 1
  },
  {
    name: "Item 2",
    id: 2
  },
  {
    name: "Item 3",
    id: 3
  },
  {
    name: "Item 4",
    id: 4
  }
]
</script>

<template>
  <Story :layout="{ type: 'grid', width: 250 }">
    <Variant title="default">
      <ASearch :items="items"></ASearch>
    </Variant>
  </Story>
</template>

<docs lang="md">
# ASearch

This is a search component.

## Usage

The `ASearch` component provides the following options:

- `items` ({id: any; name: string}[], required): Specifies the item where to search.
</docs>
