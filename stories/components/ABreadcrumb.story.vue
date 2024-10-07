<script setup lang="ts">
import ABreadcrumb from "../../components/ABreadcrumb.vue";
import "../../index.scss";
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
        :point="[
          'First',
          ['Second 1', 'Second 2'],
          'Third',
          ['Fourth 1', 'Fourth 2', 'Fourth 3', 'Fourth 4'],
          'Fifth',
        ]"
        :modelValue="3"
        color="secondary"
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
- `modelValue` (number, optional, default: 2): Specifies the default active index of the breadcrumb.
- `v-model` (number, default: 2): Specifies the index of the active step of the breadcrumb.
</docs>
