<script setup lang="ts">
import AInputDate from "../../components/AInputDate.vue";
import moment from "moment";
import { ref, computed, markRaw } from "vue";
import "../../index.scss";

const start = ref(markRaw(moment()));
const end = ref(markRaw(moment().add(10, "days")));

const range = computed({
  get() {
    return { start: start.value, end: end.value };
  },
  set(value) {
    if (value === null) return;
    start.value = value.start;
    end.value = value.end;
  },
});
</script>

<template>
  <Story :layout="{ type: 'grid', width: '100%' }">
    <Variant title="default">
      <AInputDate v-model="start" />
    </Variant>

    <Variant title="range format color border-color label-a label-b">
      <AInputDate
        v-model="range"
        format="DD MMMM - YYYY"
        color="primary"
        border-color="secondary"
        label-a="From"
        label-b="To"
      />
    </Variant>
  </Story>
</template>

<docs lang="md">
# AInputDate

This is a input date component.

## Usage

The `AInputDate` component provides the following options:

- `v-model` (moment | {start: moment; end: moment; }): Specifies the model value of the button. Possible values are any valid moment object.
- `format` (string, optional): Specifies the format of the date. Default is `DD-MM-YYYY`.
- `color` (string, optional): Specifies the color of the calendar date selection.
- `border-color` (string, optional): Specifies the color of the border of the input.
- `label-a` (string, optional): Specifies the label of the first input.
- `label-b` (string, optional): Specifies the label of the second input.
</docs>
