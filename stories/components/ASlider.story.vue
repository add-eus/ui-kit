<script setup lang="ts">
import ASlider from "../../components/ASlider.vue";
import "../../index.scss";
import { ref } from "vue";

const sliderValuesA = ref<[number, number]>([65, 100]);
const sliderValuesB = ref<[number, number]>([20, 60]);
</script>

<template>
  <Story :layout="{ type: 'grid', width: 520 }">
    <Variant title="default">
      <div class="slider-min-max-container">
        <h3>Min: {{ sliderValuesA[0] }} - Max: {{ sliderValuesA[1] }}</h3>
        <ASlider class="slider-min-max" v-model="sliderValuesA" />
      </div>
    </Variant>

    <Variant title="Exemple">
      <div class="slider-min-max-container">
        <h3>Min: {{ sliderValuesB[0] }} - Max: {{ sliderValuesB[1] }}</h3>
        <ASlider
          class="slider-min-max"
          :min="0"
          :max="250"
          :step="10"
          v-model="sliderValuesB"
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
