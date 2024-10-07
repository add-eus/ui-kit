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
    <Variant title="default">
      <div class="container-story-date-picker">
        <ADatePicker type="range" :has-time="false" :has-validation="false" />
      </div>
    </Variant>
  </Story>
</template>

<docs lang="md">
# ADatePicker

This is a date picker component that can be used to select a date.

## Usage

The `ADatePicker` component provides the following options:

- `type` (string, optional, default: "default"): Specifies the type of the date picker. It can be either `default` or `range`.
- `hasValidation` (boolean, optional): Specifies if the input should have validation.
- `hasTime` (boolean, optional): Specifies if the input should have time.
- `dateFormat` (string, optional): Specifies the format of the date. Default is `DD/MM/YYYY - HH:mm`.
- `modelValue` (string, optional): Specifies the value of the input.
</docs>

<style lang="scss" scoped>
.container-story-date-picker {
  height: 500px;
}
</style>
