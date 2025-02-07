<script setup lang="ts">
import { defineProps, PropType, computed } from "vue";
import { Colors, useColor } from "../stores/color";

interface ATypingProps {
  color: Colors;
}

const props = withDefaults(defineProps<ATypingProps>(), {
  color: "black",
});

const color = useColor(
  computed(() => {
    return props.color;
  })
);
</script>

<template>
  <div class="a-typing" :style="{ '--color': color }">
    <div class="points"></div>
    <div class="points"></div>
    <div class="points"></div>
  </div>
</template>

<style scoped lang="scss">
.a-typing {
  width: 25px;
  height: 20px;
  padding: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .points {
    $anim-drt: 0.4s;
    $anim-ease: cubic-bezier(0.6, 0.05, 0.15, 0.95);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--color);

    &:nth-child(1) {
      animation: bouncing $anim-drt alternate infinite $anim-ease;
    }

    &:nth-child(2) {
      animation: bouncing $anim-drt calc($anim-drt / 4) alternate infinite
        $anim-ease backwards;
    }

    &:nth-child(3) {
      animation: bouncing $anim-drt calc($anim-drt / 2) alternate infinite
        $anim-ease backwards;
    }
  }
}

@keyframes bouncing {
  0% {
    transform: translate3d(0, 2px, 0) scale(1.2, 0.85);
  }

  100% {
    transform: translate3d(0, -4px, 0) scale(0.9, 1.1);
  }
}
</style>
