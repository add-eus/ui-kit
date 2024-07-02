<script setup lang="ts">
import { PropType, computed, ref } from "vue";
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
const inputRef = ref<HTMLInputElement | null>(null);
const focus = () => {
  inputRef.value?.focus();
};
defineExpose({ focus });
</script>

<template>
  <div
    class="a-input"
    :style="{
      borderColor: color,
      width: full && '100%',
      '--color': color,
    }"
  >
    <input
      ref="inputRef"
      v-bind="$attrs"
      v-model="model"
      :placeholder="placeholder"
    />
    <slot name="rightAction" class="right-action"></slot>
  </div>
</template>

<style scoped lang="scss">
.a-input {
  padding: 12px 16px;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  display: flex;

  &:has(+ *) {
    padding-right: 0;
  }

  input {
    border: none;
    max-width: 100%;
    transition: opacity 0.25s, outline 0.25s;
    outline: none !important;
    border: none;
    width: 100%;

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
