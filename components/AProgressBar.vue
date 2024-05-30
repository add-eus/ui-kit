<script setup lang="ts">
import { defineProps, onMounted, watch, ref } from "vue";

const props = defineProps({
  targets: {
    type: Array,
    default: () => [25],
  },
  color: {
    type: String,
    default: "var(--a-tertiary)",
  },
  size: {
    type: Number,
    default: 25,
  },
  margin: {
    type: Number,
    default: 8,
  },
});

const calculateOpacity = (targetValue: number) => {
  const maxOpacity = 1;
  const minOpacity = 0;
  const opacityStep = (maxOpacity - minOpacity) / 100;
  return maxOpacity - opacityStep * (100 - targetValue);
};
</script>

<template>
  <div
    class="a-progress-bar"
    :style="{ '--size': size + 'px', '--margin': margin + 'px' }"
  >
    <div v-for="(target, index) in targets" :key="index" class="bar">
      <div
        class="progress"
        :style="{
          '--width': target + '%',
          background: color,
          opacity: calculateOpacity(target),
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.a-progress-bar {
  display: flex;
  flex-direction: column;
  gap: var(--margin);
  width: 100%;

  .bar {
    position: relative;
    display: flex;
    flex-direction: column;

    .progress {
      height: var(--size);
      border-radius: 6px;
      animation: barLoading 1s cubic-bezier(0.47, 1.64, 0.41, 0.8) forwards;
    }

    @keyframes barLoading {
      0% {
        width: 0%;
      }
      100% {
        width: var(--width);
      }
    }
  }
}
</style>
