<script setup lang="ts">
import ALoader from "../../components/ALoader.vue";
import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <ALoader />
    </Variant>
  </Story>
</template>

<docs lang="md">
# ALoader

This is a loader component.

## Usage

The `ALoader` component have no options.
</docs>
