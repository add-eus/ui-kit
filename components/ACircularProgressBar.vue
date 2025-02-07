<script setup lang="ts">
import { defineProps, PropType, computed } from "vue";
import { Colors, useColor } from "../stores/color";

interface ACircularProgressBarProps {
  target: number;
  colors: Colors[];
  size: number;
}

const props = withDefaults(defineProps<ACircularProgressBarProps>(), {
  target: 1,
  colors: () => ["gold"],
  size: 200,
});

const color = useColor(
  computed(() => {
    return props.colors[0];
  })
);

const secondColor = useColor(
  computed(() => {
    return props.colors[1];
  })
);

const thirdColor = useColor(
  computed(() => {
    return props.colors[2];
  })
);

// Range from -120deg to 250deg * target (in degree) / 100 to get the percent
const dotRotation = -120 + 250 * (props.target * 0.01);

const gradientId =
  "gradient-" + Date.now().toString(36) + Math.random().toString(36);
</script>

<template>
  <div
    class="a-circular-progress-bar"
    :style="{
      '--size': size + 'px',
      '--rotate': dotRotation + 'deg',
    }"
  >
    <span class="dots"></span>
    <div class="svg-container">
      <svg width="240" height="240" viewBox="0 0 240 240">
        <defs>
          <linearGradient :id="gradientId" gradientTransform="rotate(25)">
            <stop v-if="thirdColor" offset="0%" :stop-color="thirdColor" />
            <stop
              v-if="secondColor"
              :offset="thirdColor ? '60%' : '0%'"
              :stop-color="secondColor"
            />
            <stop offset="95%" :stop-color="color" />
          </linearGradient>
        </defs>
        <circle
          cx="120"
          cy="120"
          r="100"
          class="back"
          stroke-width="15"
          stroke-dasharray="628"
          stroke-dashoffset="188"
        ></circle>
        <circle
          cx="120"
          cy="120"
          r="100"
          fill="none"
          :stroke="`url(#${gradientId})`"
          stroke-width="20"
          stroke-dasharray="628"
          stroke-dashoffset="188"
          :style="{ '--percent': target / 1.43 }"
        ></circle>
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
.a-circular-progress-bar {
  position: relative;
  width: var(--size);
  height: var(--size);

  .svg-container {
    transform: rotate(145deg);
  }

  .svg-container,
  svg {
    position: relative;
    width: var(--size);
    height: var(--size);

    circle {
      width: 100%;
      height: 100%;
      fill: none;
      stroke-linecap: round;

      &.back {
        fill: none;
        stroke: var(--a-grey-lighter);
        stroke-dashoffset: calc(625px - (625px * (100 / 1.43)) / 100);
      }

      &:last-of-type {
        stroke-dasharray: 625px;
        stroke-dashoffset: 625px;
        transition: stroke-dashoffset 1s ease-out;
        animation: barLoading 1s cubic-bezier(0.47, 1.64, 0.41, 0.8) forwards;
      }
    }
  }

  .number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: bold;
  }

  .dots {
    display: block;
    position: absolute;
    z-index: 2;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    transition: 2s transform;
    transform: rotate(var(--rotate));
    animation: dotLoading 1s cubic-bezier(0.47, 1.64, 0.41, 0.8) forwards;

    &::after {
      position: absolute;
      content: "";
      width: 25px;
      height: 25px;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      background-color: var(--a-white);
      box-shadow: 0 0 5px 0.5px var(--a-grey);
      transform: translate(-50%, calc(-50% - calc(var(--size) / 2.4)));
    }
  }
}

@keyframes barLoading {
  0% {
    stroke-dashoffset: 625px;
  }
  100% {
    stroke-dashoffset: calc(625px - (625px * var(--percent)) / 100);
  }
}

@keyframes dotLoading {
  0% {
    transform: rotate(-120deg);
  }
  100% {
    transform: rotate(var(--rotate));
  }
}
</style>
