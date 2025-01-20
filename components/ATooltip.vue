<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  position: {
    type: String as () => "top" | "right" | "bottom" | "left",
    default: "top",
  },
  target: {
    type: Object as () => HTMLElement | null,
    required: true,
  },
});

const tooltipVisible = ref(false);
const tooltipRef = ref<HTMLElement | null>(null);

const showTooltip = () => {
  tooltipVisible.value = true;
};

const hideTooltip = () => {
  tooltipVisible.value = false;
};

onMounted(() => {
  if (props.target) {
    props.target.addEventListener("mouseenter", showTooltip);
    props.target.addEventListener("mouseleave", hideTooltip);
  }
});

onUnmounted(() => {
  if (props.target) {
    props.target.removeEventListener("mouseenter", showTooltip);
    props.target.removeEventListener("mouseleave", hideTooltip);
  }
});

watch(
  () => props.target,
  (newTarget, oldTarget) => {
    if (oldTarget) {
      oldTarget.removeEventListener("mouseenter", showTooltip);
      oldTarget.removeEventListener("mouseleave", hideTooltip);
    }
    if (newTarget) {
      newTarget.addEventListener("mouseenter", showTooltip);
      newTarget.addEventListener("mouseleave", hideTooltip);
    }
  }
);
</script>

<template>
  <transition name="fade-fast">
    <div
      v-if="tooltipVisible"
      ref="tooltipRef"
      class="tooltip"
      :class="[position, { visible: tooltipVisible }]"
    >
      {{ content }}
    </div>
  </transition>
</template>

<style scoped lang="scss">
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
</style>
