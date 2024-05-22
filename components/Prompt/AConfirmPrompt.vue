<script setup lang="ts">
import AModal from "../AModal.vue";
import AButton from "../AButton.vue";
import { toValue } from "@vueuse/core";

export interface AConfirmPromptEmits {
  (e: "cancel"): void;
  (e: "confirm"): void;
}

export interface AConfirmPromptProps {
  title: string;
  body: string;
  confirm: string;
  cancel: string;
}

defineProps<AConfirmPromptProps>();
</script>

<template>
  <AModal :open="true" @close="$emit('cancel')" :title="toValue(title)">
    <template #content>
      <p>{{ toValue(body) }}</p>
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
