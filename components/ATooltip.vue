<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  position: {
    type: String as () => "top" | "right" | "bottom" | "left",
    default: "top",
  },
});

const tooltipVisible = ref(false);
</script>

<template>
  <div class="a-tooltip-container">
    <div
      class="tooltip-target"
      @mouseenter="tooltipVisible = true"
      @mouseleave="tooltipVisible = false"
    >
      <slot></slot>
    </div>
    <transition name="fade-fast">
      <div v-if="tooltipVisible" class="tooltip" :class="position">
        {{ content }}
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.a-tooltip-container {
  position: relative;
  width: fit-content;

  .tooltip {
    position: absolute;
    z-index: 1000;
    background-color: var(--a-black);
    color: var(--a-white);
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
    pointer-events: none;
    white-space: nowrap;

    &.top {
      bottom: calc(100% + 5px);
      left: 50%;
      transform: translateX(-50%);
    }

    &.right {
      top: 50%;
      left: calc(100% + 5px);
      transform: translateY(-50%);
    }

    &.bottom {
      top: calc(100% + 5px);
      left: 50%;
      transform: translateX(-50%);
    }

    &.left {
      top: 50%;
      right: calc(100% + 5px);
      transform: translateY(-50%);
    }
  }
}
</style>
