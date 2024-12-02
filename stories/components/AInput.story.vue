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
    <Variant title="label">
      <AInput placeholder="Your placeholder.." label="Label"> </AInput>
    </Variant>
    <Variant title="error/rightAction">
      <AInput state="error" placeholder="Error type..">
        <template #rightAction>
          <AIcon icon="close" color="danger" />
        </template>
      </AInput>
    </Variant>
    <Variant title="success/rightAction">
      <AInput state="success" placeholder="Success type..">
        <template #rightAction>
          <AIcon icon="check" color="success" />
        </template>
      </AInput>
    </Variant>
    <Variant title="disabled/lefttAction">
      <AInput state="disabled" placeholder="Disabled type.." label="Locked">
        <template #leftAction>
          <AIcon icon="lock" color="grey" />
        </template>
      </AInput>
    </Variant>
    <Variant title="phone">
      <AInput placeholder="Phone number.." type="phone"> </AInput>
    </Variant>
    <Variant title="phone/label">
      <AInput placeholder="Phone number.." type="phone" label="Phone"> </AInput>
    </Variant>
    <Variant title="password">
      <AInput placeholder="Password.." type="password"> </AInput>
    </Variant>
    <Variant title="password/label">
      <AInput placeholder="Password.." type="password" label="Password">
      </AInput>
    </Variant>
  </Story>
</template>

<docs lang="md">
# AIcon

This is a icon component.

## Usage

The `AIcon` component provides the following options:

- `state` (string, optional): Specifies the state of the input. Possible values are `default`, `error`, `success` or `disabled`.
- `placeholder` (string, optional): Specifies the placeholder of the input. Possible values are any valid text like `Type your text here..`.
- `label` (string, optional): Specifies the placeholder of the input. Possible values are any valid text like `Password`.
- `modelValue` (any, optional): Specifies the model value of the input.
- `full` (boolean, optional): Specifies the full width of the input.
- `type` (string, optional): Specifies the type of the input. Possible custom values are `text`, `phone` or `password`.
- `modelValue` (any, optional): Specifies the model value of the input.

## Slots

- `rightAction` (optional): Specifies the right action slot like an icon.
- `leftAction` (optional): Specifies the left action slot like an icon.
</docs>
