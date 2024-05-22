<script setup lang="ts">
import AButton from "../../components/AButton.vue";
import "../../index.scss";
import { useNotification } from "../../stores/notification";
// import '../scss/_color.scss';
// import '../scss/_color-declaration.scss';

const { success } = useNotification();
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="success">
      <AButton @click="success('Success')" color="success">Success</AButton>
    </Variant>
  </Story>
</template>

<docs lang="md">
# AButton

This is a button component that can be used to trigger an action.

## Usage

The `AButton` component provides the following options:

- `color` (string, optional): Specifies the color of the button. Possible values are `primary`, `danger` or `success`
</docs>
