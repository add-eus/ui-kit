<script setup lang="ts">
import AProgressBar from "../../components/AProgressBar.vue";
import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 320 }">
    <Variant title="default">
      <AProgressBar />
    </Variant>

    <Variant title="target">
      <AProgressBar :target="74" :colors="['secondary']" />
    </Variant>

    <Variant title="color">
      <AProgressBar :target="92" :colors="['primary']" />
      <AProgressBar :target="22" :colors="['primary']" />
      <AProgressBar :target="54" :colors="['primary']" />
    </Variant>

    <Variant title="color/size/margin">
      <AProgressBar
        :target="47"
        :colors="['primary-light', 'secondary']"
        :size="35"
        :margin="4"
      />
      <AProgressBar
        :target="0"
        :colors="['primary-light', 'secondary']"
        :size="35"
        :margin="4"
      />
      <AProgressBar
        :target="98"
        :colors="['primary-light', 'secondary']"
        :size="35"
        :margin="4"
      />
    </Variant>
  </Story>
</template>

<docs lang="md">
# AProgressBar

This is a progress bar component incrementing to the target number.

## Props

- `target` (number, optional, default: 25): Specifies the target number of the bars.
- `colors` (array of string, optional, default: ["gold"]): Specifies the color of the graph. You can specifie two color to have a gradient like ['primary', 'secondary']
- `size` (number, optional, default: 25): Specifies the height of the bars.
- `margin` (number, optional, default: 5): Specifies the margin between the bars.
</docs>
