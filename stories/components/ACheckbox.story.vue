<script setup lang="ts">
import ACheckbox from "../../components/ACheckbox.vue";
import { ref } from "vue";
import "../../index.scss";

const valueA = ref(false);
const valueB = ref(false);
const valueC = ref(false);
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <ACheckbox v-model="valueA" />
    </Variant>
    <Variant title="primary">
      <ACheckbox color="primary" v-model="valueB" />
    </Variant>
    <Variant title="secondary">
      <ACheckbox color="secondary" v-model="valueC" />
    </Variant>
  </Story>
</template>

<docs lang="md">
# ACheckbox

This is a checkbox component.

## Usage

The `ACheckbox` component provides the following options:

- `color` (string, optional): Specifies the color of the button. Possible values are any valid color or variable like `primary`.
- `valueChecked` (any, optional): Specifies the value when the checkbox is checked. Default is `true`.
- `modelValue` (any): Binds the value of the checkbox to a variable.
</docs>
