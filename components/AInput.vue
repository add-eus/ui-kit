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

const model = defineModel();
</script>

<template>
  <span class="input">
    <input
      v-bind="$attrs"
      v-model="model"
      :style="{
        borderColor: color,
        width: full && '100%',
        '--color': color,
      }"
      :placeholder="placeholder"
    />
    <slot name="rightAction" class="right-action"></slot>
  </span>

</template>

<style scoped lang="scss">
span {
  outline: 1px solid rgba(255, 255, 255, 0);
  padding: 12px 16px;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;

  &:has(+ *) {
    padding-right: 0;
  }

  input {
    border: none;
    max-width: 100%;
    transition: opacity 0.25s, outline 0.25s;
    outline: none;
    border: none;

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

  
}
</style>
