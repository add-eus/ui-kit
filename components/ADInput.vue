<script setup lang="ts">
import { defineProps, PropType, computed } from "vue";
import { Colors, useColor } from "../stores/color";

const props = defineProps({
    color: {
    type: String as PropType<Colors>,
    default: 'grey',
    validator: (value) => {
      return ['grey', 'primary', 'danger', 'success'].includes(value);
    },
  },
  placeholder: {
    type: String,
    default: "Type here..",
  },
});

const color = useColor(computed(() => {
  return props.color;
}))
</script>

<template>
  <input
    v-bind="$attrs"
    :style="{ borderColor: color }"
    :placeholder="placeholder"
  />
</template>

<style scoped lang="scss">
input {
  padding: 12px 16px;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  max-width: 100%;

  &::placeholder {
    color: var(--ad-grey-light);
    opacity: 1; /* Firefox */
  }

  &::-ms-input-placeholder {
    /* Edge 12 -18 */
    color: var(--ad-grey-light);
  }
}
</style>
