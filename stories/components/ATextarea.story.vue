<script setup lang="ts">
import ATextarea from "../../components/ATextarea.vue";
import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 400 }">
    <Variant title="default">
      <ATextarea />
    </Variant>
    <Variant title="placeholder">
      <ATextarea placeholder="Type your text" />
    </Variant>
    <Variant title="placeholder/label">
      <ATextarea placeholder="Type your text" label="Label" />
    </Variant>
    <Variant title="placeholder/label/modelValue/required">
      <ATextarea
        modelValue="Default text..."
        placeholder="Type your text"
        label="Label"
        required
      />
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
