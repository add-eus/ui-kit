<script setup lang="ts">
import { defineProps, ref, watch, computed } from "vue";
import { useTransition, TransitionPresets } from "@vueuse/core";

interface ANumberAnimatedProps {
  target: number;
  suffix: string;
  duration: number;
  decimal: boolean;
}

const props = withDefaults(defineProps<ANumberAnimatedProps>(), {
  target: 1,
  suffix: "",
  duration: 1000,
  decimal: false,
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
    <span v-if="!decimal">{{ Math.floor(target) }}</span>
    <span v-else>{{ Math.floor(target * 10) / 10 }}</span>
    <span>{{ suffix }}</span>
  </p>
</template>
