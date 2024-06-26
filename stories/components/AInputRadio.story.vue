<script setup lang="ts">
import AInputRadio from "../../components/AInputRadio.vue";
import { ref } from "vue";

const selectedOption = ref("monday");
</script>

<template>
  <Story :layout="{ type: 'grid', width: 300 }">
    <Variant title="default">
      <AInputRadio> Default </AInputRadio>
    </Variant>
    <Variant title="Multi options">
      <AInputRadio
        name="days"
        value="monday"
        v-model:modelValue="selectedOption"
        color="tertiary"
      >
        Monday
      </AInputRadio>
      <AInputRadio
        name="days"
        value="tuesday"
        v-model:modelValue="selectedOption"
        color="tertiary"
      >
        Tuesday
      </AInputRadio>
      <AInputRadio
        name="days"
        value="wednesday"
        v-model:modelValue="selectedOption"
        color="tertiary"
      >
        Wednesday
      </AInputRadio>
      <p>Selected: {{ selectedOption }}</p>
    </Variant>
  </Story>
</template>

<docs lang="md">
# AInputRadio

The `AInputRadio` component represents a customizable radio button.

## Usage

The `AInputRadio` component accepts the following properties:

- `name` (string, required): Name of the radio button group.
- `value` (string, required): Value of the radio button.
- `modelValue` (string, required): Current selected value.
- `color` (string, optional): Specifies the color of the input.
</docs>
