<script setup lang="ts">
import { defineProps, computed, PropType } from "vue";
import { useColor } from "../stores/color";
import type { Colors } from "../stores/color";
import ALoader from "./ALoader.vue";

const props = defineProps({
  color: {
    type: String as PropType<Colors>,
    default: undefined,
    validator: (value) => {
      return [
        "default",
        "grey",
        "primary",
        "secondary",
        "tertiary",
        "danger",
        "warning",
        "success",
        "info",
      ].includes(value);
    },
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  full: {
    type: Boolean,
    default: false,
  },
  paddingxl: {
    type: Boolean,
    default: false,
  },
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
</script>

<template>
  <button
    class="a-button"
    v-bind="$attrs"
    :class="{ outlined: outlined }"
    :style="{
      width: full && '100%',
      padding: paddingxl && '3px 20px',
    }"
  >
    <slot v-if="!loading"></slot>
    <ALoader v-else></ALoader>
  </button>
</template>

<style lang="scss" scoped>
.a-button {
  border: none;
  border-radius: 6px;
  padding: 3px 8px;
  height: 35px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;

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
}
</style>
