<script setup lang="ts">
import { useFocus } from "@vueuse/core";
import { computed, ref, vModelCheckbox, watch } from "vue";
import type { Colors } from "../stores/color";
import { useColor } from "../stores/color";

export interface ATextareaEmits {
  (event: "update:modelValue", value?: any): void;
}
export interface ATextareaProps {
  raw?: boolean;
  modelValue?: any;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  color?: Colors;
  placeholder?: string;
}

const emits = defineEmits<ATextareaEmits>();
const props = withDefaults(defineProps<ATextareaProps>(), {
  modelValue: "",
  label: "",
  required: false,
  color: "grey-lighter",
  placeholder: "",
});
const value = ref(props.modelValue);

const textarea = ref<HTMLTextAreaElement | null>(null);
const { focused } = useFocus(textarea);

watch(value, () => {
  emits("update:modelValue", value.value);
});
watch(
  () => props.modelValue,
  () => {
    value.value = props.modelValue;
  }
);

const classes = computed(() => {
  if (props.raw) return [];

  return ["textarea"];
});

defineExpose({
  focused,
  textarea,
});

const mainColor = computed(() => props.color);
const color = useColor(mainColor);

const isInputFilledToChangeBorderColor = computed(() => {
  const currentValue = value.value;
  if (currentValue === null || currentValue === undefined) {
    return false;
  }
  if (typeof currentValue === 'string') {
    return currentValue.length > 0;
  }
  if (Array.isArray(currentValue)) {
    return currentValue.length > 0;
  }
  return true;
});

</script>

<template>
  <div class="a-text-area" :class="[{ hasLabel: label }, { 'is-not-empty': isInputFilledToChangeBorderColor},]">
    <p v-if="label">{{ label }} <span v-if="required">*</span></p>
    <textarea
      ref="textarea"
      v-model="value"
      :class="classes"
      :disabled="disabled"
      :placeholder="placeholder"
    >
    </textarea>
  </div>
</template>

<style lang="scss" scoped>
.a-text-area {
  position: relative;
  border: 1px solid v-bind(color);
  border-radius: 5px;
  overflow: hidden;

  &.is-not-empty {
    border-color: var(--a-grey-light);
  }

  &.hasLabel {
    padding-top: 30px;

    .textarea {
      font-family: inherit;
      background-color: inherit;
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 30px;
      background-color: inherit;
      pointer-events: none;
      border-radius: 10px;
    }
  }

  .textarea {
    font-family: inherit;
    position: relative;
    border: none;
    padding: 10px;
    width: 100%;
    max-width: 100%;

    &:focus-visible {
      outline-style: none;
    }
  }

  p {
    font-size: 12px;
    color: var(--a-black);
    margin: 0 0 5px 0;
    font-weight: 400;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 2;

    span {
      color: var(--a-danger);
    }
  }
}
</style>
