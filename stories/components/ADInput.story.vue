<script setup lang="ts">
import ADInput from "../../components/ADInput.vue";
import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <ADInput />
    </Variant>
    <Variant title="violet">
      <ADInput color="var(--ad-violet)" placeholder="Violet type.." />
    </Variant>
    <Variant title="primary">
      <ADInput color="var(--ad-primary)" placeholder="Primary type.." />
    </Variant>
  </Story>
</template>

<docs lang="md">
# ADIcon

This is a icon component.

## Usage

The `ADIcon` component provides the following options:

- `color` (string, optional): Specifies the color of the button. Possible values are any valid color or variable like `var(--ad-primary)`.
- `placeholder` (string, optional): Specifies the placeholder of the button. Possible values are any valid text like `Type your text here..`.
</docs>
