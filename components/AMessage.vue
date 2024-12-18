<script setup lang="ts">
import { computed } from "vue";
import { Colors, useColor } from "../stores/color";

interface AMessageProps {
  color: Colors;
}

const props = withDefaults(defineProps<AMessageProps>(), {
  color: "danger",
});

const color = useColor(computed(() => props.color));
</script>

<template>
  <p>
    <slot></slot>
  </p>
</template>

<style lang="scss" scoped>
p {
  color: v-bind(color);
}
</style>
