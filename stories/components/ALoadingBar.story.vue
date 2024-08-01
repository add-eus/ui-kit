<script setup lang="ts">
import ALoadingBar from "../../components/ALoadingBar.vue";
import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 320 }">
    <Variant title="default">
      <ALoadingBar />
    </Variant>

    <Variant title="target/colors" colors>
      <ALoadingBar :target="92" :colors="['secondary']" />
    </Variant>

    <Variant title="target/colors/size/margin/borderColor">
      <ALoadingBar
        :target="50"
        :colors="['primary-light', 'secondary']"
        :size="25"
        :margin="4"
        borderColor="tertiary"
      />
    </Variant>
  </Story>
</template>

<docs lang="md">
# ALoadingBar

This is a progress bar component incrementing to the target number.

## Props

- `target` (number, optional, default: 25): Specifies the target number of the bars.
- `colors` (array of string, optional, default: ["gold"]): Specifies the color of the graph. You can specifie two color to have a gradient like ['primary', 'secondary']
- `size` (number, optional, default: 25): Specifies the height of the bars.
- `margin` (number, optional, default: 5): Specifies the margin between the bars.
- `borderColor` (string, optional, default: "grey-dark"): Specifies the border color of the bars.
</docs>
