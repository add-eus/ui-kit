<script setup lang="ts">
import ADButton from "../../components/ADButton.vue";
import ADIcon from "../../components/ADIcon.vue";
import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <ADButton>ADButton</ADButton>
    </Variant>
    <Variant title="grey" color="grey">
      <ADButton>ADButton</ADButton>
    </Variant>
    <Variant title="primary ">
      <ADButton color="primary">
        ADButton
        <ADIcon icon="arrow_forward" type="rounded" />
      </ADButton>
    </Variant>
    <Variant title="danger">
      <ADButton color="danger">
        <ADIcon icon="close" />
        ADButton
      </ADButton>
    </Variant>
    <Variant title="success">
      <ADButton color="success">
        ADButton
        <ADIcon icon="check" />
      </ADButton>
    </Variant>
    <Variant title="warning/paddingxl">
      <ADButton color="warning" paddingxl>
        ADButton
        <ADIcon icon="check" />
      </ADButton>
    </Variant>
    <Variant title="info">
      <ADButton color="info">
        ADButton
        <ADIcon icon="check" />
      </ADButton>
    </Variant>
    <Variant title="icon">
      <ADButton color="primary">
        <ADIcon icon="face" />
      </ADButton>
    </Variant>
    <Variant title="full">
      <ADButton color="secondary" full> ADButton Full </ADButton>
    </Variant>
    <Variant title="disabled">
      <ADButton color="terciary" disabled> ADButton Disabled </ADButton>
    </Variant>
  </Story>
</template>

<docs lang="md">
# ADButton

This is a button component that can be used to trigger an action.

## Usage

The `ADButton` component provides the following options:

- `color` (string, optional): Specifies the color of the button. Possible values are `default`,`grey`, `primary`, `secondary`, `terciary`, `danger`, `warning`, `success` & `info`
- `full` (boolean, optional): Specifies the size
- `paddingxl` (boolean, optional): Specifies big padding
</docs>
