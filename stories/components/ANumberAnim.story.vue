<script setup lang="ts">
import ANumberAnimated from "../../components/ANumberAnimated.vue";
import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <ANumberAnimated />
    </Variant>

    <Variant title="target">
      <ANumberAnimated :target="74" />
    </Variant>

    <Variant title="suffix">
      <ANumberAnimated :target="112" suffix="%" />
    </Variant>
  </Story>
</template>

<docs lang="md">
# ANumberAnimated

This is a number anim component incrementing to the target number.

## Props

- `target` (number, optional, default: 1): Specifies the target number.
- `percent` (boolean, optional, default: false): Add a % to the number.
</docs>
