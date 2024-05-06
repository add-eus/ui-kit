<script setup lang="ts">
import ADLoader from "../../components/ADLoader.vue";
import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <ADLoader />
    </Variant>
  </Story>
</template>

<docs lang="md">
# ADLoader

This is a loader component.

## Usage

The `ADLoader` component have no options.
</docs>
