<script setup lang="ts">
import AModal from "../../components/AModal.vue";
import AButton from "../../components/AButton.vue";
import { ref } from "vue";
import "../../index.scss";

const open = ref<string | false>(false);
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <AButton @click="open = 'default'">Open default Modal</AButton>
      <AModal
        :open="open === 'default'"
        @close="open = false"
        title=".defaultTitle"
      >
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>

    <Variant title="small">
      <AButton @click="open = 'small'">Open Small Modal</AButton>
      <AModal
        :open="open === 'small'"
        @close="open = false"
        size="small"
        title=".smallTitle"
        action-alignement="center"
      >
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>

    <Variant title="medium">
      <AButton @click="open = 'medium'">Open Medium Modal</AButton>
      <AModal
        :open="open === 'medium'"
        @close="open = false"
        size="medium"
        title=".mediumTitle"
        action-alignement="right"
      >
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>

    <Variant title="large">
      <AButton @click="open = 'large'">Open Large Modal</AButton>
      <AModal
        :open="open === 'large'"
        @close="open = false"
        size="large"
        title=".largeTitle"
      >
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>

    <Variant title="big">
      <AButton @click="open = 'big'">Open Big Modal</AButton>
      <AModal
        :open="open === 'big'"
        @close="open = false"
        size="big"
        title=".bigTitle"
        action-alignement="center"
      >
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>

    <Variant title="giant">
      <AButton @click="open = 'giant'">Open Giant Modal</AButton>
      <AModal
        :open="open === 'giant'"
        @close="open = false"
        size="giant"
        title=".giantTitle"
        action-alignement="right"
      >
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>

    <Variant title="no header">
      <AButton @click="open = 'noHeader'">Open no header Modal</AButton>
      <AModal
        :open="open === 'noHeader'"
        @close="open = false"
        title=".noHeaderTitle"
        :has-header="false"
      >
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>

    <Variant title="no footer">
      <AButton @click="open = 'noFooter'">Open no footer Modal</AButton>
      <AModal
        :open="open === 'noFooter'"
        @close="open = false"
        title=".noFooterTitle"
        :has-footer="false"
      >
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton color="success">Open</AButton>
        </template>
      </AModal>
    </Variant>
  </Story>
</template>

<docs lang="md">
# AModal

This is a modal component.

## Usage

The `AModal` component provides the following options:

- `title` (string, optional): Specifies the title of modal.
- `size` (string, optional): Specifies the size of the modal. Possible values are `small`, `medium`, `large`, `big`, and `giant`.
- `open` (boolean, required): Specifies whether the modal is open or not.
- `close` (function, required): Specifies the function to close the modal.
- `action-alignement` (string, optional): Specifies the position of the actions. Possible values are `center` and `right`.
</docs>
