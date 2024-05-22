<script setup lang="ts">
import { PropType, computed } from "vue";
import { Colors, useColor } from "../stores/color";

const props = defineProps({
    color: {
    type: String as PropType<Colors>,
    default: 'danger',
    validator: (value) => {
      return ['warning', 'danger', 'success'].includes(value);
    },
  }
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