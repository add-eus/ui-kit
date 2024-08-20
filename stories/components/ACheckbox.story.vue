<script setup lang="ts">
import ACheckbox from "../../components/ACheckbox.vue";
import { ref } from "vue";
import "../../index.scss";

const valueA = ref(false);
const valueB = ref(false);
const valueC = ref(false);
const valueD = ref(false);
const valueE = ref(false);
const valueF = ref(false);
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <ACheckbox v-model="valueA" />
    </Variant>
    <Variant title="primary">
      <ACheckbox color="primary" v-model="valueB">Option I</ACheckbox>
    </Variant>
    <Variant title="toggleSwitch">
      <ACheckbox color="tertiary" type="switch" v-model="valueC"
        >Option II</ACheckbox
      >
    </Variant>
    <Variant title="secondary">
      <ACheckbox color="secondary" type="hidden" v-model="valueD">
        Option III
      </ACheckbox>
      <ACheckbox color="secondary" type="hidden" v-model="valueE">
        Option IV
      </ACheckbox>
      <ACheckbox color="secondary" type="hidden" v-model="valueF">
        Option V
      </ACheckbox>
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
- `hideCheckbox` (boolean, optional): Hide the checkbox basis design.
</docs>
