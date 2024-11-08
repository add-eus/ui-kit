<script setup lang="ts">
import AInputRadio from "../../components/AInputRadio.vue";
import { ref } from "vue";

const selectedOptionA = ref("tuesday");
const selectedOptionB = ref("monday");
const selectedOptionC = ref("monday");
</script>

<template>
  <Story :layout="{ type: 'grid', width: 300 }">
    <Variant title="default">
      <AInputRadio> Default </AInputRadio>
    </Variant>
    <Variant title="caption & color">
      <AInputRadio
        name="days"
        value="monday"
        v-model:modelValue="selectedOptionA"
        color="tertiary"
      >
        Monday
        <template #caption>
          <span>This is the caption I</span>
        </template>
      </AInputRadio>
      <br />
      <AInputRadio
        name="days"
        value="tuesday"
        v-model:modelValue="selectedOptionA"
        color="tertiary"
      >
        Tuesday
        <template #caption>
          <span>This is the caption II</span>
        </template>
      </AInputRadio>
      <br />
      <AInputRadio
        name="days"
        value="wednesday"
        v-model:modelValue="selectedOptionA"
        color="tertiary"
      >
        Wednesday
        <template #caption>
          <span>This is the caption III</span>
        </template>
      </AInputRadio>
      <p>Selected: {{ selectedOptionA }}</p>
    </Variant>
    <Variant title="disabled & color">
      <AInputRadio
        name="days"
        value="monday"
        v-model:modelValue="selectedOptionB"
        color="primary"
        disabled
      >
        Monday
      </AInputRadio>
      <br />
      <AInputRadio
        name="days"
        value="tuesday"
        v-model:modelValue="selectedOptionB"
        color="primary"
        disabled
      >
        Tuesday
      </AInputRadio>
      <br />
      <AInputRadio
        name="days"
        value="wednesday"
        v-model:modelValue="selectedOptionB"
        color="primary"
        disabled
      >
        Wednesday
      </AInputRadio>
      <p>Selected: {{ selectedOptionB }}</p>
    </Variant>
    <Variant title="hide radio">
      <AInputRadio
        name="days"
        value="monday"
        v-model:modelValue="selectedOptionC"
        color="secondary"
        :hideRadio="true"
      >
        Monday
      </AInputRadio>
      <br />
      <AInputRadio
        name="days"
        value="tuesday"
        v-model:modelValue="selectedOptionC"
        color="secondary"
        :hideRadio="true"
      >
        Tuesday
      </AInputRadio>
      <br />
      <AInputRadio
        name="days"
        value="wednesday"
        v-model:modelValue="selectedOptionC"
        color="secondary"
        :hideRadio="true"
      >
        Wednesday
      </AInputRadio>
      <p>Selected: {{ selectedOptionC }}</p>
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
- `textColor` (string, optional): Specifies the color of the text.
- `hideRadio` (boolean, optional): Hide the radio basis design.
</docs>
