<script setup lang="ts">
import { defineProps, PropType, computed } from "vue";
import { Colors, useColor } from "../stores/color";

const props = defineProps({
  target: {
    type: Number,
    default: 25,
  },
  colors: {
    type: Array as PropType<Colors[]>,
    default: () => ["grey"],
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

const colorA = useColor(
  computed(() => {
    return props.colors[0];
  })
);

const colorB = useColor(
  computed(() => {
    return props.colors[1];
  })
);

const calculateOpacity = (targetValue: number) => {
  const maxOpacity = 1;
  const minOpacity = 0.2;
  const opacityStep = (maxOpacity - minOpacity) / 100;
  return maxOpacity - opacityStep * (100 - targetValue);
};
</script>

<template>
  <div
    class="a-progress-bar"
    :style="{ '--size': size + 'px', '--margin': margin + 'px' }"
  >
    <div class="bar">
      <div
        class="progress"
        :style="{
          '--width': target * 0.93 + 7 + '%',
          background: colorB
            ? `linear-gradient(90deg, ${colorA}, ${colorB} 90%)`
            : colorA,
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
  margin: var(--margin) 0;
  width: 100%;

  .bar {
    position: relative;
    display: flex;
    flex-direction: column;

    .progress {
      height: var(--size);
      border-radius: 5px;
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
