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
      <ALabel outline>Default</ALabel>
    </Variant>
    <!-- GREY -->
    <Variant title="grey">
      <ALabel variant="grey">Grey</ALabel>
    </Variant>
    <Variant title="grey/outline">
      <ALabel variant="grey" outline>Grey</ALabel>
    </Variant>
    <!-- ACCENT -->
    <Variant title="accent">
      <ALabel variant="accent">Accent</ALabel>
    </Variant>
    <Variant title="accent/outline">
      <ALabel variant="accent" outline>Accent</ALabel>
    </Variant>
    <!-- SUCCESS -->
    <Variant title="success">
      <ALabel variant="success">Success</ALabel>
    </Variant>
    <Variant title="success/outline">
      <ALabel variant="success" outline>Success</ALabel>
    </Variant>
    <!-- ATTENTION -->
    <Variant title="attention">
      <ALabel variant="attention">Attention</ALabel>
    </Variant>
    <Variant title="attention/outline">
      <ALabel variant="attention" outline>Attention</ALabel>
    </Variant>
    <!-- DANGER -->
    <Variant title="danger">
      <ALabel variant="danger">Danger</ALabel>
    </Variant>
    <Variant title="danger/outline">
      <ALabel variant="danger" outline>Danger</ALabel>
    </Variant>
    <!-- DONE -->
    <Variant title="done">
      <ALabel variant="done">Done</ALabel>
    </Variant>
    <Variant title="done/outline">
      <ALabel variant="done" outline>Done</ALabel>
    </Variant>
    <!-- OTHER -->
    <Variant title="other">
      <ALabel variant="other">Other</ALabel>
    </Variant>
    <Variant title="other/outline">
      <ALabel variant="other" outline>Other</ALabel>
    </Variant>
  </Story>
</template>

<docs lang="md">
# ALabel

This is a label component.

## Usage

The `ALabel` component provides the following options:

- `variant` (string, optional): Specifies the variant of the label. Possible values are `default`, `grey`, `accent`, `success`, `attention`, `danger`, `done`, `other`.
- `outline` (boolean, optional): Specifies if the label should have an outline.
</docs>
