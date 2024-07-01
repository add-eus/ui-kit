<script setup lang="ts">
import ALoader from "../../components/ALoader.vue";
import AButton from "../../components/AButton.vue";
import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <ALoader />
    </Variant>
    <Variant title="button">
      <AButton color="tertiary" paddingxl>
        <ALoader />
      </AButton>
    </Variant>
    <Variant title="color">
      <AButton color="secondary" full>
        <ALoader color="secondary" />
      </AButton>
    </Variant>
    <Variant title="color">
      <AButton color="warning" full>
        <ALoader color="tertiary" />
      </AButton>
    </Variant>
  </Story>
</template>

<docs lang="md">
# ALoader

This is a loader component.

## Usage

The `ALoader` component have no options.

- `color` (string, optional): Specifies the color of the button. Possible values are any valid color or variable like `primary`.
</docs>
