<script setup lang="ts">
import ATyping from "../../components/ATyping.vue";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 320 }">
    <Variant title="default">
      <ATyping />
    </Variant>

    <Variant title="color">
      <ATyping color="primary" />
    </Variant>
  </Story>
</template>

<docs lang="md">
# ATyping

This is a typing animation component.

## Props

- `color` (string, optional, default: primary): Specifies the color of the typing animation.
</docs>
