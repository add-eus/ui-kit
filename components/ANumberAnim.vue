<script setup lang="ts">
import { defineProps, onMounted, watch, ref } from "vue";

const props = defineProps({
  target: {
    type: Number,
    default: 1,
  },
  percent: {
    type: Boolean,
    default: false,
  },
});

const counterRef = ref(null);

const animateCounter = (start, end, duration) => {
  const h3Element = counterRef.value;
  if (!h3Element) return;

  const totalSteps = 100;
  const stepTime = duration / totalSteps;
  const stepIncrement = (end - start) / totalSteps;
  let current = start;
  let currentStep = 0;

  const timer = setInterval(() => {
    current += stepIncrement;
    currentStep += 1;
    h3Element.textContent = `${Math.round(current)}`;
    if (currentStep >= totalSteps) {
      h3Element.textContent = `${end}`;
      clearInterval(timer);
    }
  }, stepTime);
};

onMounted(() => {
  animateCounter(0, props.target, 1000);
});

watch(
  () => props.target,
  (newValue, oldValue) => {
    animateCounter(oldValue, newValue, 1000);
  }
);
</script>

<template>
  <p>
    <span ref="counterRef">0</span>
    <span>{{ percent ? "%" : "" }}</span>
  </p>
</template>

<style scoped lang="scss">
/* Add any custom styles you need here */
</style>
