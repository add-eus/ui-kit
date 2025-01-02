<script setup lang="ts">
import ACircularProgressBar from "../../components/ACircularProgressBar.vue";
import ANumberAnimated from "../../components/ANumberAnimated.vue";

import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 400 }">
    <Variant title="default">
      <ACircularProgressBar />
    </Variant>

    <Variant title="target">
      <ACircularProgressBar :target="74" />
    </Variant>

    <Variant title="target/colors/size">
      <div class="container">
        <ACircularProgressBar
          :target="92"
          :colors="['secondary', 'success']"
          :size="250"
        />
        <div class="number">
          <ANumberAnimated :target="92" suffix="%" />
        </div>
      </div>
    </Variant>

    <Variant title="target/colors/size">
      <div class="container">
        <ACircularProgressBar
          :target="87"
          :colors="['danger-light', 'warning-light', 'success-light']"
          :size="250"
        />
        <div class="number">
          <ANumberAnimated :target="87" suffix="%" />
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style scoped lang="scss">
.container {
  width: fit-content;
  position: relative;

  .number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: bold;
  }
}
</style>

<docs lang="md">
# ACircularProgressBar

This is a circular progress bar component incrementing to the target number.

## Props

- `target` (number, optional, default: 1): Specifies the target number.
- `colors` (array of string, optional, default: ["gold"]): Specifies the color of the graph. You can specifie two color to have a gradient like ['primary', 'secondary']
- `size` (number, optional, default: 200): Specifies the height & width of the graph.
</docs>
