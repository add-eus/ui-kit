<script setup lang="ts">
import { computed, ref } from "vue";

interface ATooltipProps {
  content: string;
  position?: "top" | "right" | "bottom" | "left";
  color?: "default" | "danger";
  noWrap?: boolean;
}

const props = withDefaults(defineProps<ATooltipProps>(), {
  position: "top",
  color: "default",
  noWrap: false,
});

const tooltipVisible = ref(false);
const tooltipTarget = ref<HTMLElement | null>(null);
const tooltipStyle = computed(() => {
  if (!tooltipTarget.value || !tooltipVisible.value) return {};

  const targetRect = tooltipTarget.value.getBoundingClientRect();
  const style: any = { zIndex: 99999 };

  switch (props.position) {
    case "top":
      style.bottom = `${window.innerHeight - targetRect.top + 5}px`;
      style.left = `${targetRect.left + targetRect.width / 2}px`;
      style.transform = 'translateX(-50%)';
      break;
    case "bottom":
      style.top = `${targetRect.bottom + 5}px`;
      style.left = `${targetRect.left + targetRect.width / 2}px`;
      style.transform = 'translateX(-50%)';
      break;
    case "left":
      style.top = `${targetRect.top + targetRect.height / 2}px`;
      style.right = `${window.innerWidth - targetRect.left + 5}px`;
      style.transform = 'translateY(-50%)';
      break;
    case "right":
      style.top = `${targetRect.top + targetRect.height / 2}px`;
      style.left = `${targetRect.right + 5}px`;
      style.transform = 'translateY(-50%)';
      break;
  }
  return style;
});

</script>

<template>
  <div class="a-tooltip-container">
    <div
      ref="tooltipTarget"
      class="tooltip-target"
      @mouseenter="tooltipVisible = true"
      @mouseleave="tooltipVisible = false"
    >
      <slot></slot>
    </div>
    <teleport to="body">
      <transition name="fade-fast">
        <div v-if="tooltipVisible" class="tooltip" :class="{ 'no-wrap': noWrap, 'danger': color === 'danger' }" :style="tooltipStyle">
          {{ content }}
        </div>
      </transition>
    </teleport>
  </div>
</template>

<style scoped lang="scss">
.a-tooltip-container {
  position: relative;
  width: fit-content;
  display: inline-block; 
}

.tooltip {
  position: fixed; 
  z-index: 99999; 
  background-color: var(--a-black); 
  color: var(--a-white);
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  pointer-events: none;

  &.danger {
    border: 0.5px solid var(--a-danger);
    background: var(--a-danger-lightest);
    color: var(--a-danger);
  }

  &.no-wrap {
    white-space: nowrap;
  }
}

</style>
