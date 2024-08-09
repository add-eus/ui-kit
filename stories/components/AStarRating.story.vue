<script setup lang="ts">
import AStarRating from "../../components/AStarRating.vue";
import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 320 }">
    <Variant title="default">
      <AStarRating />
    </Variant>

    <Variant title="color/size/background/progress">
      <AStarRating
        color="tertiary"
        :size="40"
        background="grey-light"
        :progress="32"
      />
    </Variant>

    <Variant title="color/size/number/progress">
      <AStarRating color="primary" :size="20" :number="10" :progress="74" />
    </Variant>
  </Story>
</template>

<docs lang="md">
# AStarRating

The `AStarRating` component displays a series of star icons with customizable properties such as color, background, size, and number of stars.

## Props

- `color` (string, optional, default: "warning"): Specifies the color of the stars.
- `background` (string, optional, default: "white"): Specifies the background color of the stars.
- `size` (number, optional, default: 30): Specifies the size (height and width) of each star in pixels.
- `number` (number, optional, default: 5): Specifies the number of stars to display.
- `progress` (number, optional, default: 50): Specifies the percentage of stars to fill based on the progress.
</docs>
