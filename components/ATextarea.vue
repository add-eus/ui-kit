<script setup lang="ts">
import { useFocus } from "@vueuse/core";
import { computed, ref, watch } from "vue";

export interface ATextareaEmits {
  (event: "update:modelValue", value?: any): void;
}
export interface ATextareaProps {
  raw?: boolean;
  modelValue?: any;
  disabled?: boolean;
  label?: string;
  required?: boolean;
}

const emits = defineEmits<ATextareaEmits>();
const props = withDefaults(defineProps<ATextareaProps>(), {
  modelValue: "",
  label: "",
  required: false,
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
</script>

<template>
  <p v-if="label">{{ label }} <span v-if="required">*</span></p>
  <textarea
    ref="textarea"
    v-model="value"
    :class="classes"
    :disabled="disabled"
  >
  </textarea>
</template>

<style lang="scss" scoped>
.textarea:focus-visible {
  outline-style: none;
  /* outline-offset: none;
  outline-width: none;
  outline-color: none; */
}

p {
  font-size: 12px;
  color: var(--a-black);
  margin: 0 0 5px 0;
  font-weight: 400;

  span {
    color: var(--a-danger);
  }
}
</style>
