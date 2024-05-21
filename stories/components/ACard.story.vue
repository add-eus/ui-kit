<script setup lang="ts">
import ACard from "../../components/ACard.vue";
import AButton from "../../components/AButton.vue";
import { ref } from "vue";
import "../../index.scss";

const open = ref(false);
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <ACard>
        <template #header>
          <h3>Header Title</h3>
        </template>
        <template #content> Content test </template>
        <template #action>
          <AButton>Close</AButton>
          <AButton>Validate</AButton>
        </template>
      </ACard>
    </Variant>
  </Story>
</template>

<docs lang="md">
# ACard

This is a card component.

## Usage

The `ACard` component provides the following options:

- `actionAlignment` (string, optional): Specifies the position of the actions. Possible values are `center` and `right`.
</docs>
