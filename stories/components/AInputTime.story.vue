<script setup lang="ts">
import moment from "moment";
import { markRaw, ref } from "vue";
import AInputTime from "../../components/AInputTime.vue";
import "../../index.scss";

const time = ref(markRaw(moment()));
</script>

<template>
  <Story :layout="{ type: 'grid', width: '100%' }">
    <Variant title="default">
      <AInputTime v-model="time" />
    </Variant>
  </Story>
</template>

<docs lang="md">
# AInputDate

This is a input date component.

## Usage

The `AInputDate` component provides the following options:
- `v-model` (moment): Specifies the model value. Possible values are any valid moment object.
</docs>
