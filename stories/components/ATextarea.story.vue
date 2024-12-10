<script setup lang="ts">
import ATextarea from "../../components/ATextarea.vue";
import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 400 }">
    <Variant title="default">
      <ATextarea modelValue="Default text..." />
    </Variant>
    <Variant title="label/required">
      <ATextarea modelValue="Default text..." label="Label" required />
    </Variant>
  </Story>
</template>

<docs lang="md">
# ATextarea

This is a textarea component.

## Usage

The `ATextarea` component provides the following options:

- `modelValue` (string, optional): Specifies the text content of the textarea. Supports two-way binding with `v-model`.
</docs>
