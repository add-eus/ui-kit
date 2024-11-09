<script setup lang="ts">
import ATextarea from "./ATextarea.vue";
import { ref, watch, computed } from "vue";

export interface AOverlayTextareaEmits {
  (event: "update:modelValue", value?: any): void;
}
export interface AOverlayTextareaProps {
  modelValue?: any;
}

const emits = defineEmits<AOverlayTextareaEmits>();
const props = withDefaults(defineProps<AOverlayTextareaProps>(), {
  modelValue: "",
});
const ATextareaRef = ref<InstanceType<typeof ATextarea> | null>(null);

const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits("update:modelValue", value);
  },
});

const insertText = (text: string) => {
  const textarea = ATextareaRef.value?.textarea;
  if (textarea) {
    value.value =
      value.value.slice(0, textarea.selectionStart) +
      text +
      value.value.slice(textarea.selectionEnd);
  }
};
</script>

<template>
  <div class="container-overlay-textarea">
    <ATextarea v-bind="$attrs" v-model="value" ref="ATextareaRef" />
    <div class="bottom-tools">
      <slot :insertText="insertText" :text="value"></slot>
    </div>
  </div>
</template>
