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
}

const emits = defineEmits<ATextareaEmits>();
const props = withDefaults(defineProps<ATextareaProps>(), { modelValue: "" });
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
  <textarea
    ref="textarea"
    v-model="value"
    :class="classes"
    :disabled="disabled"
  ></textarea>
</template>

<style lang="scss" scoped>
.textarea:focus-visible {
  outline-style: none;
  /* outline-offset: none;
  outline-width: none;
  outline-color: none; */
}
</style>
