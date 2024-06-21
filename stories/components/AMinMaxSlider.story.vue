<script setup lang="ts">
import AMinMaxSlider from "../../components/AMinMaxSlider.vue";
import "../../index.scss";
import { ref } from "vue";

const minValue = ref(65);
const maxValue = ref(100);

const minValueExemple = ref(20);
const maxValueExemple = ref(60);
</script>

<template>
  <Story :layout="{ type: 'grid', width: 520 }">
    <Variant title="default">
      <div class="slider-min-max-container">
        <h3>Min: {{ minValue }} - Max: {{ maxValue }}</h3>
        <AMinMaxSlider
          class="slider-min-max"
          v-model:min-value="minValue"
          v-model:max-value="maxValue"
        />
      </div>
    </Variant>

    <Variant title="Exemple">
      <div class="slider-min-max-container">
        <h3>Min: {{ minValueExemple }} - Max: {{ maxValueExemple }}</h3>
        <AMinMaxSlider
          class="slider-min-max"
          :min="0"
          :max="250"
          :step="10"
          v-model:min-value="minValueExemple"
          v-model:max-value="maxValueExemple"
          color="secondary"
        />
      </div>
    </Variant>
  </Story>
</template>

<docs lang="md">
# MinMaxSlider

This is a MinMaxSlider component that allows users to select a range between a minimum and maximum value.

## Props

- `min` (number, optional, default: 0): Specifies the minimum value of the slider.
- `max` (number, optional, default: 100): Specifies the maximum value of the slider.
- `step` (number, optional, default: 1): Specifies the step interval for the slider.
- `minValue` (number, optional, default: 50): Specifies the initial minimum value of the selected range.
- `maxValue` (number, optional, default: 80): Specifies the initial maximum value of the selected range.
- `color` (string, optional, default: "primary"): Specifies the color of the slider.

## Events

- `update:minValue` (minValue: number): Emitted when the minimum value of the selected range changes.
- `update:maxValue` (maxValue: number): Emitted when the maximum value of the selected range changes.

## Methods

- `onInput(event: Event)`: Updates the minimum or maximum value based on user input.
</docs>

<style lang="scss" scoped>
.slider-min-max-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .slider-min-max {
    width: 200px;
  }
}
</style>
