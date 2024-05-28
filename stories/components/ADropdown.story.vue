<script setup lang="ts">
import ADropdown from "../../components/ADropdown.vue";
import AButton from "../../components/AButton.vue";
import { ref } from "vue";
import "../../index.scss";

const open = ref(false);
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <ADropdown>
        <template #action="{toggle}">
          <AButton @click="toggle()">Click me</AButton>
        </template>
        <template #content> 
          <AButton>Option 1</AButton>
        </template>
      </ADropdown>
    </Variant>
  </Story>
</template>

<docs lang="md">
# ADropdown

This is a dropdown component.

## Usage

The `ADropdown` component provides the following options:

- `isOpen` (boolean, optional): Specifies state open.
</docs>
