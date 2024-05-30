<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
import { useTransition, TransitionPresets } from "@vueuse/core";

const props = defineProps({
  target: {
    type: Number,
    default: 1,
  },
  percent: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 1000,
  },
});

const duration = props.duration;

const baseNumber = ref(0);

const target = useTransition(baseNumber, {
  duration,
  transition: TransitionPresets.easeOutExpo,
});

watch(
  () => props.target,
  (newValue) => {
    baseNumber.value = newValue;
  },
  { immediate: true }
);
</script>

<template>
  <p>
    <span>{{ Math.floor(target) }}</span>
    <span>{{ percent ? "%" : "" }}</span>
  </p>
</template>
