<script setup lang="ts">
import ABreadcrumb from "../../components/ABreadcrumb.vue";
import "../../index.scss";
import { logEvent } from "histoire/client";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 320 }">
    <Variant title="default">
      <ABreadcrumb />
    </Variant>

    <Variant title="step/point/color/active-step/@click-step">
      <ABreadcrumb
        :step="[
          'Social network',
          'Publications',
          'Informations',
          'Medias',
          'Publications',
          'Posts',
        ]"
        :point="['First', 'Second', 'Third', 'Fourth', 'First', 'Second']"
        active-step="3"
        color="secondary"
        @click-step="(index) => logEvent('Step', { index })"
      />
    </Variant>
  </Story>
</template>

<docs lang="md">
# ABreadcrumb

This is a breadcrumb component.

## Props

- `step` ( string, optional, default: ["1992", "1993", "1994"]) Specifies the step of the breadcrumb.
- `point` ( string, optional, default: [""]) Specifies the bullet point of the breadcrumb.
- `color` (string, optional, default: primary): Specifies the color of the component.
- `active-step` (string, optional, default: 2): Specifies the active step of the breadcrumb.

## Events

- `click-step` (index: number): Emitted when a step item is clicked, providing the index of the clicked step.
</docs>
