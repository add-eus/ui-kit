<script setup lang="ts">
import AInputSizer from "../../components/AInputSizer.vue";

let value =
  "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum";

import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <AInputSizer />
    </Variant>
    <Variant title="raw/placeholder">
      <AInputSizer raw placeholder="Type here.." />
    </Variant>
    <Variant title="data">
      <AInputSizer v-model="value" />
    </Variant>
  </Story>
</template>

<docs lang="md">
# AIcon

This is a icon component.

## Usage

The `AInputSizer` component offers the following options:

- `raw` (boolean, optional): Specifies if the component should be displayed without default styles. Possible values are `true` or `false`.
- `modelValue` (any, optional): The value of the text field. It can be of any type, but usually it is a string.
- `placeholder` (string, optional): The placeholder text to be displayed in the input field.
</docs>
