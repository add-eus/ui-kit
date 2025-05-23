<script setup lang="ts">
import { defineProps, computed, PropType, withDefaults } from "vue";
import { useColor } from "../stores/color";
import type { Colors } from "../stores/color";
import ALoader from "./ALoader.vue";
import { ref } from "vue";

interface AButtonProps {
  color?: Colors;
  outlined?: boolean;
  loading?: boolean;
  full?: boolean;
  images?: string[];
  imagesNumber?: number;
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  size?: "small" | "medium" | "large";
}

const props = withDefaults(defineProps<AButtonProps>(), {
  outlined: false,
  loading: false,
  full: false,
  images: () => [],
  imagesNumber: 10,
  tooltipPosition: "right",
  size: "medium",
});

const mainColor = computed(() => props.color);

const color = useColor(mainColor);
const colorInvert = useColor(mainColor, "default", true);

const colorLight = useColor(mainColor, "light");
const colorLightInvert = useColor(mainColor, "light", true);

const colorDark = useColor(mainColor, "dark");
const colorDarkInvert = useColor(mainColor, "darker", true);

const colorDarker = useColor(mainColor, "darker");
const colorDarkerInvert = useColor(mainColor, "darker", true);

//CONGRAT PART
const randomRotation = ref(Math.floor(Math.random() * 80) - 40);
const randomTurbulence = ref(Math.floor(Math.random() * 10) - 5);
const randdomVelocity = ref(Math.floor(Math.random() * -80) - 20);
const numberOfElements = props.imagesNumber;

const animate = ref(false);
const selectedImage = ref<string | null>(null);

function startAnimation() {
  if (props.images.length > 0) {
    if (animate.value == false) {
      setTimeout(() => {
        animate.value = false;
      }, 1750 + numberOfElements * 100);
    }
    animate.value = true;
    const randomIndex = Math.floor(Math.random() * props.images.length);
    selectedImage.value = props.images[randomIndex];
  }
}
</script>

<template>
  <button
    class="a-button"
    v-bind="$attrs"
    @click="startAnimation"
    :class="[size, { outlined, loading }]"
    :style="{
      width: full && '100%',
      '--rotate': randomRotation + 'deg',
      '--velocity': randdomVelocity + 'px',
      '--turbulence': randomTurbulence + 'px',
    }"
  >
    <slot v-if="!loading"></slot>
    <ALoader v-else></ALoader>
    <div v-if="images.length > 0" class="congrat-container">
      <div
        v-for="index in numberOfElements"
        :key="index"
        class="congrat-element"
        :class="{ animate: animate }"
        :style="{
          left: `calc(${Math.random() * 80}%)`,
          animationDelay: `${index * 0.1}s`,
        }"
      >
        <img :src="selectedImage" alt="Congrat icon" />
      </div>
    </div>
    <div
      class="a-button-tooltip"
      v-if="tooltip !== undefined"
      :class="'tootltip-' + tooltipPosition"
    >
      <p>
        {{ tooltip }}
      </p>
    </div>
  </button>
</template>

<style lang="scss">
.a-button {
  z-index: 1;
  position: relative;
  border: none;
  border-radius: 5px;
  padding: 10px 30px;
  font-size: 14px;
  font-weight: 500;
  gap: 3px;
  height: 37px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;

  &.large {
    padding: 12px 16px;
    height: 43px;
  }

  &.small {
    padding: 7px 8px;
    height: 28px;
  }

  &:not(.outlined) {
    background-color: v-bind(color);
    color: v-bind(colorInvert);

    &:hover {
      background-color: v-bind(colorDark);
      color: v-bind(colorDarkInvert);

      i {
        color: v-bind(color);
      }
    }

    &:active {
      background-color: v-bind(colorDarker);
      color: v-bind(colorDarkerInvert);

      i {
        color: v-bind(colorDarkerInvert);
      }
    }
  }

  &.outlined {
    background-color: transparent;
    border: 1px solid v-bind(color);
    color: v-bind(color);

    &:hover {
      border: 1px solid v-bind(colorDark);
      color: v-bind(colorDark);
      background-color: v-bind(colorDarkInvert);

      i {
        color: v-bind(colorDarkInvert);
      }
    }

    &:active {
      border: 1px solid v-bind(colorDarker);
      color: v-bind(colorDarker);

      i {
        color: v-bind(colorDarkerInvert);
      }
    }
  }

  .loader-icon {
    position: absolute;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.25;

    &:hover {
      background-color: v-bind(colorLight);
      color: v-bind(colorLightInvert);

      i {
        color: v-bind(colorLightInvert);
      }
    }
  }

  //CONGRAT PART
  .congrat-container {
    position: absolute;
    width: 100%;

    .congrat-element {
      position: absolute;
      bottom: 5px;
      z-index: -1;
      height: 25px;
      width: 25px;
      opacity: 0;
      pointer-events: none;

      &.animate {
        animation: fly 1s ease-in-out forwards;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      @keyframes fly {
        0% {
          opacity: 0;
          margin-left: 0;
          transform: translateY(0) rotate(0deg);
        }
        20% {
          opacity: 1;
          margin-left: -2px;
        }
        40% {
          margin-left: calc(2px * var(--randomTurbulence));
        }
        60% {
          margin-left: -1px;
        }
        80% {
          margin-left: calc(1px * var(--randomTurbulence));
          opacity: 1;
        }
        100% {
          margin-left: 0;
          transform: translateY(-70px) rotate(var(--rotate));
          opacity: 0;
        }
      }
    }
  }

  //TOOLTIP
  .a-button-tooltip {
    position: absolute;
    top: 50%;
    left: calc(100% + 5px);
    transform: translateY(-50%);
    background: var(--a-black);
    border-radius: 5px;
    padding: 10px;
    height: 37px;
    display: flex;
    align-items: center;
    z-index: 1;
    max-width: 290px;
    opacity: 0;
    transition: 0.25s opacity;
    pointer-events: none;

    p {
      white-space: nowrap;
      color: var(--a-white);
      max-width: 290px;
      line-height: normal;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &.tootltip-top {
      top: -5px;
      left: 50%;
      transform: translateX(-50%) translateY(-100%);
    }

    &.tootltip-bottom {
      top: calc(100% + 5px);
      left: 50%;
      transform: translateX(-50%) translateY(0);
    }

    &.tootltip-left {
      top: 50%;
      left: -5px;
      transform: translateX(-100%) translateY(-50%);
    }
  }

  &:hover {
    .a-button-tooltip {
      opacity: 1;
    }
  }
}
</style>
