<script setup lang="ts">
import ABadge from "../../components/ABadge.vue";
import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="primary">
      <ABadge color="primary"/>
    </Variant>
    <Variant title="secondary">
      <ABadge color="secondary"/>
    </Variant>
    <Variant title="tertiary">
      <ABadge color="tertiary"/>
    </Variant>
    
  </Story>
</template>

<docs lang="md">
# ABadge

This is a button component that can be used to trigger an action.

## Usage

The `ABadge` component provides the following options:

- `color` (string, optional): Specifies the color of the button. Possible values are `default`,`grey`, `primary`, `secondary`, `tertiary`, `danger`, `warning`, `success` & `info`
</docs>
