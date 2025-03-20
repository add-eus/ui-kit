<script setup lang="ts">
import { defineProps, PropType, computed } from "vue";
import { Colors, useColor } from "../stores/color";

interface ComponentProps {
  progress: number;
  color: string;
  background: string;
  size: number;
  number: number;
  mask: string;
}

const props = withDefaults(defineProps<ComponentProps>(), {
  progress: 50,
  color: "warning",
  background: "white",
  size: 30,
  number: 5,
  mask: "assets/star-mask.svg",
});

const color = useColor(
  computed(() => {
    return props.color;
  })
);

const background = useColor(
  computed(() => {
    return props.background;
  })
);
</script>

<template>
  <div
    class="a-star-rating"
    :style="{
      '--background': background,
      '--color': color,
      '--size': size + 'px',
      '--progress': progress + '%',
    }"
  >
    <div class="color-bar"></div>
    <div
      v-for="n in number"
      :key="n"
      class="star"
      :style="{
        maskImage:
          mask !== 'assets/star-mask.svg'
            ? 'url(' + mask + ')'
            : 'url(/ui-kit/components/' + mask + ')',
      }"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.a-star-rating {
  height: var(--size);
  width: max-content;
  background: var(--a-grey-lighter);
  display: flex;
  position: relative;

  .color-bar {
    z-index: 0;
    position: absolute;
    max-width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    background: var(--color);
    width: var(--progress);
  }

  .star {
    z-index: 0;
    background: var(--background);
    width: var(--size);
    mask-size: cover;
    transform: scale(1.06); // REMOVE BORDER SPACING
  }
}
</style>
