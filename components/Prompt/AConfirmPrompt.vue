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
  colors?: string[];
}

defineProps<AConfirmPromptProps>();
</script>

<template>
  <AModal
    :class-list="'a-confirm-prompt'"
    :open="true"
    @close="$emit('cancel')"
    :title="toValue(title)"
    action-alignement="center"
    size="small"
    :has-header="false"
  >
    <template #content>
      <p class="confirm-text">{{ toValue(body) }}</p>
    </template>
    <template #action>
      <AButton @click="$emit('cancel')" :color="colors?.[0] || 'danger'">{{
        toValue(cancel)
      }}</AButton>
      <AButton @click="$emit('confirm')" :color="colors?.[1] || 'success'">{{
        toValue(confirm)
      }}</AButton>
    </template>
  </AModal>
</template>

<style lang="scss">
.a-confirm-prompt {
  .confirm-text {
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    color: var(--a-black);
  }
}
</style>
