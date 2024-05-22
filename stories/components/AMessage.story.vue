<script setup lang="ts">
import AMessage from "../../components/AMessage.vue";
import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <AMessage>error message</AMessage>
    </Variant>
    <Variant title="danger">
      <AMessage color="danger">error message</AMessage>
    </Variant>
    <Variant title="warning">
      <AMessage color="warning">warning message</AMessage>
    </Variant>
    <Variant title="success">
      <AMessage color="success">success message</AMessage>
    </Variant>
  </Story>
</template>

<docs lang="md">
# AMessage

This is a message component.

## Usage

The `AMessage` component provides the following options:

- `color` (string, optional): Specifies the color of message (danger, warning, success, default to error).
</docs>
