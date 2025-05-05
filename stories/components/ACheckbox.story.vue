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
const valueG = ref(false);
const valueH = ref(false);
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <ACheckbox v-model="valueA" />
    </Variant>
    <Variant title="caption & disabled & color">
      <ACheckbox color="primary" v-model="valueB"
        >Option I
        <template #caption> This is the caption </template>
      </ACheckbox>
      <br />
      <ACheckbox color="primary" v-model="valueC" disabled
        >Option I disabled</ACheckbox
      >
    </Variant>
    <Variant title="indeterminate & caption & color">
      <ACheckbox color="primary" v-model="valueD" indeterminate
        >Option II
        <template #caption> This is the caption </template>
      </ACheckbox>
    </Variant>
    <Variant title="type hidden">
      <ACheckbox color="secondary" type="hidden" v-model="valueE">
        Option III
      </ACheckbox>
      <br />
      <ACheckbox color="secondary" type="hidden" v-model="valueF">
        Option IV
      </ACheckbox>
      <br />
      <ACheckbox color="secondary" type="hidden" v-model="valueG">
        Option V
      </ACheckbox>
    </Variant>
    <Variant title="type switch">
      <ACheckbox color="tertiary" type="switch" v-model="valueH"
        >Option VI</ACheckbox
      >
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
