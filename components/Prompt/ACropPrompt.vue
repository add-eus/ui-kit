<script setup lang="ts">
import AModal from "../AModal.vue";
import AButton from "../AButton.vue";
import ACrop from "../ACrop.vue";
import { toValue } from "@vueuse/core";
import { watch } from "vue";

export interface ACropPromptEmits {
  (e: "cancel"): void;
  (e: "confirm"): void;
  (e: "update:modelValue", value?: any): void;
}

export interface ACropPromptProps {
  title: string;
  modelValue: Blob | File;
  confirm: string;
  cancel: string;
  modelValue: Blob;
  aspectRatio?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  mimeType?: string;
  quality?: number;
}

const props = defineProps<ACropPromptProps>();
const model = defineModel();
</script>

<template>
  <AModal :open="true" @close="$emit('cancel')" :title="toValue(title)">
    <template #content>
        <ACrop v-model="model" 
              :aspectRatio="aspectRatio" 
              :maxHeight="maxHeight" 
              :maxWidth="maxWidth" 
              :mimeType="mimeType"
              :minHeight="minHeight"
              :minWidth="minWidth"
              :quality="quality"
              ></ACrop>
    </template>
    <template #action>
      
      <AButton @click="$emit('cancel')">{{
        toValue(cancel)
      }}</AButton>
      <AButton @click="$emit('confirm')" color="primary">{{
        toValue(confirm)
      }}</AButton>
    </template>
  </AModal>
</template>
