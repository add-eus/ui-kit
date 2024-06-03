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
      <AProgressBar :target="74" color="secondary" />
    </Variant>

    <Variant title="color">
      <AProgressBar :target="92" color="primary" />
      <AProgressBar :target="22" color="primary" />
      <AProgressBar :target="54" color="primary" />
    </Variant>

    <Variant title="color/size/margin">
      <AProgressBar :target="47" color="tertiary" :size="35" :margin="4" />
      <AProgressBar :target="28" color="tertiary" :size="35" :margin="4" />
      <AProgressBar :target="98" color="tertiary" :size="35" :margin="4" />
    </Variant>
  </Story>
</template>

<docs lang="md">
# AProgressBar

This is a progress bar component incrementing to the target number.

## Props

- `target` (number, optional, default: 25): Specifies the target number of the bars.
- `color` (string, optional, default: grey): Specifies the color of the bars.
- `size` (number, optional, default: 25): Specifies the height of the bars.
- `margin` (number, optional, default: 5): Specifies the margin between the bars.
</docs>
