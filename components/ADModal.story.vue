<script setup lang="ts">
import ADModal from "./ADModal.vue";
import ADButton from "./ADButton.vue";
import { ref } from "vue";
import "../index.scss";

const open = ref(false);
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <ADButton @click="open = 'default'">Open default Modal</ADButton>
      <ADModal
        :open="open === 'default'"
        @close="open = false"
        title=".defaultTitle"
      >
        <template #content> Content test </template>
      </ADModal>
    </Variant>
    <Variant title="small">
      <ADButton @click="open = 'small'">Open Small Modal</ADButton>
      <ADModal
        :open="open === 'small'"
        @close="open = false"
        size="small"
        title=".smallTitle"
      >
        <template #content> Content test </template>
      </ADModal>
    </Variant>
    <Variant title="medium">
      <ADButton @click="open = 'medium'">Open Medium Modal</ADButton>
      <ADModal
        :open="open === 'medium'"
        @close="open = false"
        size="medium"
        title=".mediumTitle"
      >
        <template #content> Content test </template>
      </ADModal>
    </Variant>
    <Variant title="large">
      <ADButton @click="open = 'large'">Open Large Modal</ADButton>
      <ADModal
        :open="open === 'large'"
        @close="open = false"
        size="large"
        title=".largeTitle"
      >
        <template #content> Content test </template>
      </ADModal>
    </Variant>
    <Variant title="big">
      <ADButton @click="open = 'big'">Open Big Modal</ADButton>
      <ADModal
        :open="open === 'big'"
        @close="open = false"
        size="big"
        title=".bigTitle"
      >
        <template #content> Content test </template>
      </ADModal>
    </Variant>
    <Variant title="giant">
      <ADButton @click="open = 'giant'">Open Giant Modal</ADButton>
      <ADModal
        :open="open === 'giant'"
        @close="open = false"
        size="giant"
        title=".giantTitle"
      >
        <template #content> Content test </template>
      </ADModal>
    </Variant>
  </Story>
</template>

<docs lang="md">
# ADModal

This is a modal component.

## Usage

The `ADModal` component provides the following options:

- `title` (string, optional): Specifies the title of modal.
- `size` (string, optional): Specifies the size of the modal. Possible values are `small`, `medium`, `large`, `big`, and `giant`.
- `open` (boolean, required): Specifies whether the modal is open or not.
- `close` (function, required): Specifies the function to close the modal.
- `actionAlignment` (string, optional): Specifies the position of the actions. Possible values are `center` and `right`.
</docs>
