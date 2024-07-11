<script setup lang="ts">
import { defineProps, ref, watch, computed } from "vue";
import { useTransition, TransitionPresets } from "@vueuse/core";

const props = defineProps({
  target: {
    type: Number,
    default: 1,
  },
  suffix: {
    type: String,
    default: "",
  },
  duration: {
    type: Number,
    default: 1000,
  },
});


const baseNumber = ref(0);
const duration = computed(() => props.duration);
const target = useTransition(baseNumber, {
  duration,
  transition: TransitionPresets.easeOutSine,
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
    <span>{{ suffix }}</span>
  </p>
</template>
