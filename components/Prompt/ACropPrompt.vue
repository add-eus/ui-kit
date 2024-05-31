<script setup lang="ts">
import AModal from "../AModal.vue";
import AButton from "../AButton.vue";
import ACrop from "../ACrop.vue";
import { toValue } from "@vueuse/core";
import { watch } from "vue";

export interface AConfirmPromptEmits {
  (e: "cancel"): void;
  (e: "confirm"): void;
  (e: "update:modelValue", value?: any): void;
}

export interface AConfirmPromptProps {
  title: string;
  modelValue: Blob | File;
  confirm: string;
  cancel: string;
}

defineProps<AConfirmPromptProps>();
const model = defineModel();
</script>

<template>
  <AModal :open="true" @close="$emit('cancel')" :title="toValue(title)">
    <template #content>
        <ACrop v-model="model"></ACrop>
    </template>
    <template #action>
      <AButton @click="$emit('confirm')" color="success">{{
        toValue(confirm)
      }}</AButton>
      <AButton @click="$emit('cancel')" color="danger">{{
        toValue(cancel)
      }}</AButton>
    </template>
  </AModal>
</template>
