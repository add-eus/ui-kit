<script setup lang="ts">
import { defineProps, computed } from "vue";
import { useColor } from "../stores/color";

interface AIconProps {
  color?: string;
  icon: string;
  type: "rounded" | "sharp" | "outlined";
  fill: boolean;
}

const props = withDefaults(defineProps<AIconProps>(), {
  color: undefined,
  icon: "circle",
  type: "rounded",
  fill: false,
});

const color = computed(() => props.color);

const colorValue = useColor(color);
</script>

<template>
  <span
    :class="['a-icon', 'material-symbols-' + type, { 'filled-icon': fill }]"
    :style="{ color: colorValue }"
    >{{ icon }}</span
  >
</template>

<style scoped lang="scss">
.a-icon {
  display: inline-flex;
  font-size: 20px;
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;

  &.filled-icon {
    font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
  }
}
</style>
