<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  color: {
    type: String,
    default: undefined,
  },
  icon: {
    type: String,
    default: "circle",
  },
  type: {
    type: String,
    default: "rounded",
    validator: (value) => {
      return ["rounded", "sharp", "outlined"].includes(value);
    },
  },
});
</script>

<template>
  <span
    :class="['ad-icon', 'material-symbols-' + type]"
    :style="{ color: color }"
    >{{ icon }}</span
  >
</template>

<style scoped lang="scss">
.ad-icon {
  display: inline-flex;
  font-size: 20px;
  /* font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48; */
}
</style>
