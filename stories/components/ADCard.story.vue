<script setup lang="ts">
import ADCard from "../../components/ADCard.vue";
import ADButton from "../../components/ADButton.vue";
import { ref } from "vue";
import "../../index.scss";

const open = ref(false);
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <ADCard>
        <template #header>
          <h3>Header Title</h3>
        </template>
        <template #content> Content test </template>
        <template #action>
          <ADButton>Close</ADButton>
          <ADButton>Validate</ADButton>
        </template>
      </ADCard>
    </Variant>
  </Story>
</template>

<docs lang="md">
# ADCard

This is a card component.

## Usage

The `ADCard` component provides the following options:

- `actionAlignment` (string, optional): Specifies the position of the actions. Possible values are `center` and `right`.
</docs>
