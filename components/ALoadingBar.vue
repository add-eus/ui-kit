<script setup lang="ts">
import { defineProps, PropType, computed } from "vue";
import { Colors, useColor } from "../stores/color";

const props = defineProps({
  target: {
    type: Number,
    default: 25,
  },
  colors: {
    type: Array as PropType<Colors[]>,
    default: () => ["grey"],
  },
  size: {
    type: Number,
    default: 20,
  },
  margin: {
    type: Number,
    default: 8,
  },
  borderColor: {
    type: String,
    default: "grey-dark",
  },
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

const borderColor = useColor(
  computed(() => {
    return props.borderColor;
  })
);
</script>
<template>
  <div
    class="a-loading-bar"
    :style="{
      '--size': size + 'px',
      '--margin': margin + 'px',
      '--borderColor': borderColor,
    }"
  >
    <div class="bar">
      <div
        class="loading"
        :style="{
          '--width': target + '%',
          transition:
            target == 0
              ? 'width 0s'
              : 'width 1s cubic-bezier(0.85, 0, 0.15, 1)',
        }"
      >
        <div
          class="gradient"
          :style="{
            background: colorB
              ? `linear-gradient(90deg, ${colorA}, ${colorB} 90%)`
              : colorA,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.a-loading-bar {
  display: flex;
  flex-direction: column;
  margin: var(--margin) 0;
  width: 100%;
  border-radius: 100px;
  overflow: hidden;

  .bar {
    position: relative;
    display: flex;
    flex-direction: column;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
      border: 1px solid var(--borderColor);
      border-radius: 100px;
    }

    .loading {
      min-width: 0.1%;
      width: var(--width);
      height: var(--size);
      -webkit-mask: linear-gradient(#fff 0 0);
      mask: linear-gradient(#fff 0 0);
      border-radius: 100px;

      .gradient {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
