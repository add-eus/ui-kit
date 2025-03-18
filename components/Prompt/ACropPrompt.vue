<script setup lang="ts">
import AModal from "../AModal.vue";
import AButton from "../AButton.vue";
import ACrop from "../ACrop.vue";
import { toValue } from "@vueuse/core";
import AInputRadio from "../AInputRadio.vue";
import { ref } from "vue";

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
  aspectRatio?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  mimeType?: string;
  quality?: number;
}

const selectedOption = ref<string | undefined>("1:1");
const props = defineProps<ACropPromptProps>();
const model = defineModel();
</script>

<template>
  <AModal :open="true" @close="$emit('cancel')" :title="toValue(title)">
    <template #content>
      <div class="container-ratio">
        <label>Ratio:</label>
        <AInputRadio
          v-model="selectedOption"
          name="aspectRatio"
          value="4:5">4:5</AInputRadio>
        <AInputRadio
          v-model="selectedOption"
          name="aspectRatio"
          value="1:1"
          label="1:1"
        >1:1</AInputRadio>
      </div>
        <ACrop v-model="model" 
              :aspectRatio="selectedOption === '4:5' ? 4/5 : 1" 
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
<style lang="scss" scoped>
.container-ratio {
  margin-bottom: 1rem;
  display: flex;
  gap: 10px;
  align-items: center;

  .a-input-radio{
    width: 50px;
    min-width: inherit;
  }
  :deep(.label-text) {
      padding: 0;
      width: 20px !important;
    }
}

</style>
