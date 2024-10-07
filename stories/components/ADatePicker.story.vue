<script setup lang="ts">
import ADatePicker from "../../components/ADatePicker.vue";
import "../../index.scss";
</script>

<template>
  <Story :layout="{ type: 'grid', width: 600 }">
    <Variant title="default">
      <div class="container-story-date-picker">
        <ADatePicker />
      </div>
    </Variant>
  </Story>
</template>

<docs lang="md">
# ADatePicker

This is a date picker component that can be used to select a date.

## Usage

The `ADatePicker` component provides the following options:

- `color` (string, optional): Specifies the color of the button. Possible values are `default`,`grey`, `primary`, `secondary`, `tertiary`, `danger`, `warning`, `success` & `info`
</docs>

<style lang="scss" scoped>
.container-story-date-picker {
  height: 500px;
}
</style>
