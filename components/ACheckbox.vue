<script setup lang="ts">
import {  PropType, computed } from "vue";
import { Colors, useColor } from "../stores/color";

const props = defineProps({
    color: {
        type: String as PropType<Colors>,
        default: "grey",
        validator: (value) => {
            return ["grey", "primary", "danger", "success"].includes(value);
        },
    },
    value: {
        default: false
    },
    valueChecked: {
        default: true
    },
    valueUnchecked: {
        default: false
    }
});

const modelValue = defineModel();

const checkboxValue = computed({
    get() {
        return modelValue.value === props.valueChecked;
    },
    set(v) {
        modelValue.value = v ? props.valueChecked : props.valueUnchecked;
    }
})

const isChecked = computed(() => {
    return props.value === props.valueChecked;
})

const color = useColor(
  computed(() => {
    return props.color;
  })
);
</script>

<template>
  <input type="checkbox" v-model="checkboxValue"/>
</template>
