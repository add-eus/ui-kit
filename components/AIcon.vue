<script setup lang="ts">
import { defineProps, computed } from "vue";
import { useColor } from "../stores/color";

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

const color = computed(() => props.color);

const colorValue = useColor(color);
</script>

<template>
  <span
    :class="['a-icon', 'material-symbols-' + type]"
    :style="{ color: colorValue }"
    >{{ icon }}</span
  >
</template>

<style scoped lang="scss">
.a-icon {
  display: inline-flex;
  font-size: 20px;
  /* font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48; */
}
</style>
