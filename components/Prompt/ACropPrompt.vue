<script setup lang="ts">
import AModal from "../AModal.vue";
import AButton from "../AButton.vue";
import ACrop from "../ACrop.vue";
import { toValue } from "@vueuse/core";
import AInputRadio from "../AInputRadio.vue";
import { useTranslate } from "@addeus/vue3-stores/stores/translate";
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

const selectedOption = ref<string>("4:5");
const props = defineProps<ACropPromptProps>();
const portraitLabel = useTranslate("crop.portrait");
const squareLabel = useTranslate("crop.square");
const landscapeLabel = useTranslate("crop.landscape");
const model = defineModel();
</script>

<template>
  <AModal :open="true" @close="$emit('cancel')" :title="toValue(props.title)">
    <template #content>
      <div class="container-ratio">
        <label>Ratio :</label>

        <AInputRadio
          v-model="selectedOption"
          name="aspectRatio"
          value="4:5"
        >
          {{ portraitLabel || '4:5' }}
        </AInputRadio>

        <AInputRadio
          v-model="selectedOption"
          name="aspectRatio"
          value="1:1"
        >
          {{ squareLabel || '1:1' }}
        </AInputRadio>

        <AInputRadio
          v-model="selectedOption"
          name="aspectRatio"
          value="5:4"
        >
          {{ landscapeLabel || '5:4' }}
        </AInputRadio>
      </div>

      <ACrop
        v-model="model"
        :aspectRatio="selectedOption === '4:5' ? 4 / 5 : selectedOption === '5:4' ? 5 / 4 : 1"
        :maxHeight="props.maxHeight"
        :maxWidth="props.maxWidth"
        :mimeType="props.mimeType"
        :minHeight="props.minHeight"
        :minWidth="props.minWidth"
        :quality="props.quality"
      />
    </template>

    <template #action>
      <AButton @click="$emit('cancel')">{{ toValue(props.cancel) }}</AButton>
      <AButton @click="$emit('confirm')" color="primary">{{ toValue(props.confirm) }}</AButton>
    </template>
  </AModal>
</template>

<style lang="scss" scoped>
.container-ratio {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  label {
    white-space: nowrap;
  }

  .a-input-radio {
    display: flex;
    align-items: center;
    min-width: 80px;
    flex-shrink: 0;
  }

  :deep(.label-text) {
    margin-left: 0.5rem;
    white-space: nowrap;
  }
}

</style>
