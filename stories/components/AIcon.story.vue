<script setup lang="ts">
import AIcon from "../../components/AIcon.vue";
import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <AIcon />
    </Variant>
    <Variant title="primary ">
      <AIcon icon="arrow_forward" type="rounded" color="primary" />
    </Variant>
    <Variant title="danger">
      <AIcon icon="close" type="sharp" color="danger" />
    </Variant>
    <Variant title="success">
      <AIcon icon="check" type="outlined" color="success" />
    </Variant>
    <Variant title="delete">
      <AIcon icon="delete" type="outlined" color="danger" />
    </Variant>
    <Variant title="delete/fill">
      <AIcon icon="delete" type="outlined" color="danger" fill />
    </Variant>
  </Story>
</template>

<docs lang="md">
# AIcon

This is a icon component.

## Usage

The `AIcon` component provides the following options:

- `color` (string, optional): Specifies the color of the button. Possible values are any valid color or variable like `var(--a-primary)`.
- `icon` (string, optional): Specifies the icon to be displayed inside the button. Possible values are any valid icon name.
- `type` (string, optional): Specifies the type of the icon. Possible values are `rounded`, `outlined`, or `sharp`.
- `fill` (boolean, optional): Specifies if the icon should be filled with color.
</docs>
