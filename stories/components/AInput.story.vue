<script setup lang="ts">
import AInput from "../../components/AInput.vue";
import AIcon from "../../components/AIcon.vue";
import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <AInput />
    </Variant>
    <Variant title="violet">
      <AInput color="violet" placeholder="Violet type.." />
    </Variant>
    <Variant title="primary">
      <AInput color="primary" placeholder="Primary type..">
        <template #rightAction>
          <AIcon icon="arrow_forward" color="primary" />
        </template>
      </AInput>
    </Variant>
  </Story>
</template>

<docs lang="md">
# AIcon

This is a icon component.

## Usage

The `AIcon` component provides the following options:

- `color` (string, optional): Specifies the color of the button. Possible values are any valid color or variable like `primary`.
- `placeholder` (string, optional): Specifies the placeholder of the button. Possible values are any valid text like `Type your text here..`.

## Slots

- `rightAction` (optional): Specifies the right action slot like an icon.
</docs>
