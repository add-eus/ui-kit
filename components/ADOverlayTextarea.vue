<script setup lang="ts">
import ADTextarea from "./ADTextarea.vue";
import { ref, watch } from "vue";

export interface ADOverlayTextareaEmits {
  (event: "update:modelValue", value?: any): void;
}
export interface ADOverlayTextareaProps {
  modelValue?: any;
}

const emits = defineEmits<ADOverlayTextareaEmits>();
const props = withDefaults(defineProps<ADOverlayTextareaProps>(), {
  modelValue: "",
});
const value = ref(props.modelValue);
const ADTextareaRef = ref<InstanceType<typeof ADTextarea> | null>(null);

watch(value, (newValue) => {
  emits("update:modelValue", newValue);
});

const insertText = (text: string) => {
  const textarea = ADTextareaRef.value?.textarea;
  if (textarea) {
    value.value =
      value.value.slice(0, textarea.selectionStart) +
      text +
      value.value.slice(textarea.selectionEnd);
  }
};
</script>

<template>
  <div>
    <ADTextarea v-bind="$attrs" v-model="value" ref="ADTextareaRef" />
    <div class="bottom-tools">
      <slot :insertText="insertText" :text="value"></slot>
    </div>
  </div>
</template>
