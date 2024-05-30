<script setup lang="ts">
import ANumberAnim from "../../components/ANumberAnim.vue";
import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <ANumberAnim />
    </Variant>

    <Variant title="target">
      <ANumberAnim :target="74" />
    </Variant>

    <Variant title="percent">
      <ANumberAnim :target="112" percent />
    </Variant>
  </Story>
</template>

<docs lang="md">
# ANumberAnim

This is a number anim component incrementing to the target number.

## Props

- `target` (number, optional, default: 1): Specifies the target number.
- `percent` (boolean, optional, default: false): Add a % to the number.
</docs>
