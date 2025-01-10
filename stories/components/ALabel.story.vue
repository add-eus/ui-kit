<script setup lang="ts">
import ALabel from "../../components/ALabel.vue";
import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <ALabel>Default</ALabel>
    </Variant>
    <Variant title="default/outline">
      <ALabel :outline="false">Default</ALabel>
    </Variant>
    <!-- ACCENT -->
    <Variant title="accent">
      <ALabel variant="accent">Accent</ALabel>
    </Variant>
    <Variant title="accent/no outline">
      <ALabel variant="accent" :outline="false">Accent</ALabel>
    </Variant>
    <!-- SUCCESS -->
    <Variant title="success">
      <ALabel variant="success">Success</ALabel>
    </Variant>
    <Variant title="success/no outline">
      <ALabel variant="success" :outline="false">Success</ALabel>
    </Variant>
    <!-- ATTENTION -->
    <Variant title="attention">
      <ALabel variant="attention">Attention</ALabel>
    </Variant>
    <Variant title="attention/no outline">
      <ALabel variant="attention" :outline="false">Attention</ALabel>
    </Variant>
    <!-- DANGER -->
    <Variant title="danger">
      <ALabel variant="danger">Danger</ALabel>
    </Variant>
    <Variant title="danger/no outline">
      <ALabel variant="danger" :outline="false">Danger</ALabel>
    </Variant>
    <!-- DONE -->
    <Variant title="done">
      <ALabel variant="done">Done</ALabel>
    </Variant>
    <Variant title="done/no outline">
      <ALabel variant="done" :outline="false">Done</ALabel>
    </Variant>
    <!-- OTHER -->
    <Variant title="other">
      <ALabel variant="other">Other</ALabel>
    </Variant>
    <Variant title="other/no outline">
      <ALabel variant="other" :outline="false">Other</ALabel>
    </Variant>
  </Story>
</template>

<docs lang="md">
# ALabel

This is a label component.

## Usage

The `ALabel` component provides the following options:

- `color` (string, optional): Specifies the color of message (danger, warning, success, default to error).
</docs>
