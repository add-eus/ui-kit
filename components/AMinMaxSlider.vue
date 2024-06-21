<script setup lang="ts">
import { PropType, ref, computed, watchEffect, defineProps } from "vue";
import { Colors, useColor } from "../stores/color";

const props = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  minValue: {
    type: Number,
    default: 50,
  },
  maxValue: {
    type: Number,
    default: 80,
  },
  color: {
    type: String as PropType<Colors>,
    default: "primary",
  },
});

const color = useColor(
  computed(() => {
    return props.color;
  })
);

const emit = defineEmits(["update:minValue", "update:maxValue"]);

const slider = ref<HTMLDivElement | null>(null);
const inputMin = ref<HTMLInputElement | null>(null);
const inputMax = ref<HTMLInputElement | null>(null);
const sliderMinValue = ref(props.minValue);
const sliderMaxValue = ref(props.maxValue);

const getPercent = (value: number, min: number, max: number) => {
  return ((value - min) / (max - min)) * 100;
};

// DIFF BETWEEN MIN & MAX
const sliderDifference = computed(() => {
  return Math.abs(sliderMaxValue.value - sliderMinValue.value);
});

const setCSSProps = (left: number, right: number) => {
  if (slider.value) {
    slider.value.style.setProperty("--progressLeft", `${left}%`);
    slider.value.style.setProperty("--progressRight", `${right}%`);
  }
};

//UPDATED ON SLIDE
watchEffect(() => {
  if (slider.value) {
    emit("update:minValue", sliderMinValue.value);
    emit("update:maxValue", sliderMaxValue.value);

    const leftPercent = getPercent(sliderMinValue.value, props.min, props.max);
    const rightPercent =
      100 - getPercent(sliderMaxValue.value, props.min, props.max);

    setCSSProps(leftPercent, rightPercent);
  }
});

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target.name === "min") {
    if (parseFloat(target.value) > sliderMaxValue.value) {
      target.value = sliderMaxValue.value.toString();
    } else {
      sliderMinValue.value = parseFloat(target.value);
    }
  }

  if (target.name === "max") {
    if (parseFloat(target.value) < sliderMinValue.value) {
      target.value = sliderMinValue.value.toString();
    } else {
      sliderMaxValue.value = parseFloat(target.value);
    }
  }
};
</script>

<template>
  <div
    ref="slider"
    class="custom-slider minmax"
    :style="{
      '--color': color,
    }"
  >
    <div class="minmax-indicator"></div>
    <input
      ref="inputMin"
      type="range"
      name="min"
      id="min"
      :min="props.min"
      :max="props.max"
      :value="props.minValue"
      :step="props.step"
      @input="onInput"
    />
    <input
      ref="inputMax"
      type="range"
      name="max"
      id="max"
      :min="props.min"
      :max="props.max"
      :value="props.maxValue"
      :step="props.step"
      @input="onInput"
    />
  </div>
</template>

<style lang="scss" scoped>
.custom-slider {
  --trackHeight: 6px;
  --thumbRadius: 20px;

  * {
    margin: 0;
  }

  /* style the input element with type "range" */
  input[type="range"] {
    position: relative;
    appearance: none;
    background: none;
    border-radius: 999px;
    z-index: 0;
    height: 100%;
    pointer-events: none;
  }

  /* ::before element to replace the slider track */
  input[type="range"]::before {
    content: "";
    display: block;
    position: absolute;
    width: var(--ProgressPercent, 100%);
    height: 100%;
    background: #00865a;
    border-radius: 999px;
  }

  /* `::-webkit-slider-runnable-track` targets the track (background) of a range slider in chrome and safari browsers. */
  input[type="range"]::-webkit-slider-runnable-track {
    appearance: none;
    background: #005a3c;
    height: var(--trackHeight);
    border-radius: 999px;
  }

  input[type="range"]::-webkit-slider-thumb {
    position: relative;
    width: var(--thumbRadius);
    height: var(--thumbRadius);
    margin-top: calc((var(--trackHeight) - var(--thumbRadius)) / 2);
    background: var(--a-white);
    border: 2px solid var(--color);
    border-radius: 999px;
    pointer-events: all;
    appearance: none;
    z-index: 1;
    cursor: pointer;
  }

  /* `::-moz-range-track` targets the track (background) of a range slider in Mozilla Firefox. */
  .default input[type="range"]::-moz-range-track {
    appearance: none;
    background: var(--a-white);
    height: var(--trackHeight);
    border-radius: 999px;
  }

  input[type="range"]::-moz-range-thumb {
    position: relative;
    box-sizing: border-box;
    width: var(--thumbRadius);
    height: var(--thumbRadius);
    margin-top: calc((var(--trackHeight) - var(--thumbRadius)) / 2);
    background: var(--a-white);
    border: 2px solid var(--color);
    border-radius: 999px;
    pointer-events: all;
    appearance: none;
    z-index: 1;
    cursor: pointer;
  }

  &.minmax {
    position: relative;
    height: var(--trackHeight);
    background: var(--a-grey-light);
    border-radius: 999px;
    margin: 0.5rem 0;
    --progressLeft: 0%;
    --progressRight: 0%;
  }

  .minmax-indicator {
    position: absolute;
    height: 100%;
    pointer-events: none;
    left: var(--thumbRadius);
    right: var(--thumbRadius);
  }

  .minmax-indicator::before {
    content: "";
    position: absolute;
    background: var(--color);
    height: 100%;
    left: var(--progressLeft);
    right: var(--progressRight);
  }

  &.minmax input[type="range"] {
    position: absolute;
    width: calc(100% - var(--thumbRadius));
  }

  &.minmax input[type="range"][name="max"] {
    left: var(--thumbRadius);
  }

  &.minmax input[type="range"]::-webkit-slider-runnable-track {
    background: none;
  }

  &.minmax input[type="range"]::before {
    display: none;
  }

  .minmax-inputs {
    display: flex;
    justify-content: space-between;
  }

  .minmax-inputs input {
    width: 50px;
  }
}
</style>
