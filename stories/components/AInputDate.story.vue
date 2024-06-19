<script setup lang="ts">
import { get } from "@vueuse/core";
import AInputDate from "../../components/AInputDate.vue";
import moment from "moment";
import { ref, computed } from "vue";
import "../../index.scss";

const start = ref(moment());
const end = ref(moment().add(10, 'days'));

const range = computed({
    get: () => ({ start: start.value, end: end.value }),
    set: (value) => {
        start.value = value.start;
        end.value = value.end;
    }
})
</script>

<template>
  <Story :layout="{ type: 'grid', width: '100%' }">
    <Variant title="default">
        <AInputDate v-model="start" />
    </Variant>

    <Variant title="default">
        <AInputDate v-model="range" />
    </Variant>
    
  </Story>
</template>

<docs lang="md">
# AIcon

This is a icon component.

## Usage

The `AIcon` component provides the following options:

- `color` (string, optional): Specifies the color of the button. Possible values are any valid color or variable like `var(--a-primary)`.
- `placeholder` (string, optional): Specifies the placeholder of the button. Possible values are any valid text like `Type your text here..`.
</docs>
