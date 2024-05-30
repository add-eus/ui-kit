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
      <AProgressBar :targets="[74]" color="var(--a-secondary)" />
    </Variant>

    <Variant title="color">
      <AProgressBar :targets="[37, 89, 68, 22, 94]" color="var(--a-primary)" />
    </Variant>

    <Variant title="color">
      <AProgressBar
        :targets="[28, 54, 28, 79]"
        color="var(--a-tertiary)"
        :size="35"
        :margin="3"
      />
    </Variant>
  </Story>
</template>

<docs lang="md">
# AProgressBar

This is a progress bar component incrementing to the target number.

## Props

- `targets` (array of number, optional, default: [25]): Specifies the targets number of the bars.
- `color` (string, optional, default: var(--a-tertiary)): Specifies the color of the bars.
- `size` (number, optional, default: 25): Specifies the height of the bars.
- `margin` (number, optional, default: 5): Specifies the margin between the bars.
</docs>
