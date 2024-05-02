<script setup lang="ts">
import ADModal from "../ADModal.vue";
import ADButton from "../ADButton.vue";
import { toValue } from "@vueuse/core";

export interface ADConfirmPromptEmits {
  (e: "cancel"): void;
  (e: "confirm"): void;
}

export interface ADConfirmPromptProps {
  title: string;
  body: string;
  confirm: string;
  cancel: string;
}

defineProps<ADConfirmPromptProps>();

</script>

<template>
  <ADModal :open="true" @close="$emit('cancel')" :title="toValue(title)">
    <template #content>
      <p>{{ toValue(body) }}</p>
    </template>
    <template #action>
      <ADButton @click="$emit('confirm')" color="success">{{ toValue(confirm) }}</ADButton>
      <ADButton @click="$emit('cancel')" color="danger">{{ toValue(cancel) }}</ADButton>
    </template>
  </ADModal>
</template>