<script setup lang="ts">
import { ref } from "vue";
import AButton from "./AButton.vue";

const props = defineProps({
  position: {
    type: String,
    default: "auto",
    validator: (value: string) => {
      return ["left", "right", "auto"].includes(value);
    },
  },
});
</script>

<template>
  <AButton v-bind="$attrs" role="menuitem" class="a-dropdown-item">
    <slot></slot>
  </AButton>
</template>

<style lang="scss">
.a-dropdown-item {
  background: red;
}
</style>
