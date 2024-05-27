<script setup lang="ts">
import { defineProps, PropType, computed } from "vue";
import { Colors, useColor } from "../stores/color";

const props = defineProps({
  color: {
    type: String as PropType<Colors>,
    default: "grey",
    validator: (value) => {
      return ["grey", "primary", "danger", "success"].includes(value);
    },
  },
  placeholder: {
    type: String,
    default: "Type here..",
  },
  full: {
    type: Boolean,
    default: false,
  },
});

const color = useColor(
  computed(() => {
    return props.color;
  })
);
</script>

<template>
  <input
    v-bind="$attrs"
    :style="{
      borderColor: color,
      width: full && '100%',
      '--color': color,
    }"
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
  outline: 1px solid rgba(255, 255, 255, 0);
  transition: opacity 0.25s, outline 0.25s;

  &::placeholder {
    color: var(--a-grey-light);
    opacity: 1; /* Firefox */
  }

  &::-ms-input-placeholder {
    /* Edge 12 -18 */
    color: var(--a-grey-light);
  }

  &:focus {
    outline: 1px solid rgba(255, 255, 255, 0.5);
    outline-offset: -1px;

    &::placeholder {
      opacity: 0.75;
    }

    &::-ms-input-placeholder {
      opacity: 0.75;
    }
  }
}
</style>