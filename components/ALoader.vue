<script setup lang="ts">
import { defineProps, PropType, computed } from "vue";
import { Colors, useColor } from "../stores/color";

const props = defineProps({
  color: {
    type: String as PropType<Colors>,
    default: "white",
  },
});

const color = useColor(
  computed(() => {
    return props.color;
  })
);
</script>

<template>
  <div class="loader-icon">
    <div class="spinner" :style="{ borderTop: `4px solid ${color}` }"></div>
  </div>
</template>

<script></script>

<style scoped>
.loader-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 22px;
  overflow: hidden;

  > .spinner {
    border: 4px solid rgba(255, 255, 255, 0.25);
    border-radius: 50%;
    border-top: 4px solid var(--a-white);
    width: 22px;
    height: 22px;
    animation: spin 1s linear infinite;
    -webkit-animation: spin 1s linear infinite;
  }
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
