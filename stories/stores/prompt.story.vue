<script setup lang="ts">
import AButton from "../../components/AButton.vue";
import "../../index.scss";
import { usePrompt } from "../../stores/prompt";

const { confirm } = usePrompt();
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="confirm">
      <AButton
        @click="
          confirm({
            title: 'Confirm',
            body: 'Are you sure you want to confirm?',
            confirm: 'Confirm',
            cancel: 'Cancel',
          })
        "
        >Confirm</AButton
      >
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
