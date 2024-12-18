<script setup lang="ts">
import { defineProps, PropType, computed } from "vue";
import { Colors, useColor } from "../stores/color";

interface ComponentProps {
  target: number;
  colors: Colors[];
  size: number;
  margin: number;
  border: number;
  opacity: boolean;
}

const props = withDefaults(defineProps<ComponentProps>(), {
  target: 25,
  colors: () => ["grey"],
  size: 25,
  margin: 8,
  border: 5,
  opacity: true,
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
          '--border': border + 'px',
          '--width': target * 0.93 + 7 + '%',
          background: colorB
            ? `linear-gradient(90deg, ${colorA}, ${colorB} 90%)`
            : colorA,
          opacity: opacity ? calculateOpacity(target) : '1',
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
      border-radius: var(--border);
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
