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
    <Variant title="phone">
      <AInput
        color="primary"
        placeholder="Phone number.."
        invalidMsg="Le numéro de téléphone n’est pas valide"
        type="phone"
      >
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
- `invalidMsg` (string, optional): Specifies the invalid message of the input.
- `modelValue` (any, optional): Specifies the model value of the input.
- `full` (boolean, optional): Specifies the full width of the input.
- `type` (string, optional): Specifies the type of the input. Possible custom values are `text` or `phone`.
- `modelValue` (any, optional): Specifies the model value of the input.

## Slots

- `rightAction` (optional): Specifies the right action slot like an icon.
</docs>
