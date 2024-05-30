<script setup lang="ts">
import ACircularProgressBar from "../../components/ACircularProgressBar.vue";
import ANumberAnim from "../../components/ANumberAnim.vue";

import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 290 }">
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
          :colors="['var(--a-secondary)', 'var(--a-success)']"
          :size="250"
        />
        <div class="number">
          <ANumberAnim :target="92" percent />
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
- `colors` (array of string, optional, default: ["orange", "gold"]): Specifies the first color of the graph.
- `size` (number, optional, default: 200): Specifies the height & width of the graph.
</docs>
