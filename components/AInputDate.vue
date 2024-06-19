<script setup lang="ts">
import {  DatePicker } from 'v-calendar';
import AInput from './AInput.vue';
import moment from "moment";
import 'v-calendar/style.css';
import { ref, computed } from 'vue';
import {  useVModel, syncRef, refDebounced } from '@vueuse/core';

export interface AInputDateRangeMoment {
    start: moment.Moment | null; 
    end: moment.Moment | null;
}

export interface AInputDateRange {
    start: Date | null;
    end: Date | null;
}

export interface AInputDateProps {
    modelValue: moment.Moment | null | AInputDateRangeMoment;
}

const props = defineProps<AInputDateProps>();

const emits = defineEmits(['update:modelValue']);

const date = useVModel(props, 'modelValue', emits);

const transformedDate = ref<null | undefined | Date | AInputDateRange>(null);

syncRef(date, transformedDate, {
    immediate: true,
    transform: {
        ltr(left) {
            if (left === undefined || left === null)
                return left;
            else if (left.start instanceof moment && left.end instanceof moment) {
                // Vérifier si la transformation est nécessaire
                const current = transformedDate.value;
                if (current && current.start === left.start.toDate() && current.end === left.end.toDate()) {
                    return current; // Retourner la valeur actuelle pour éviter la modification circulaire
                }
                return {
                    start: left.start?.toDate(),
                    end: left.end?.toDate(),
                };
            }
            return left.toDate();
        },
        rtl(right: Date | null | undefined | AInputDateRange) {
            if (right === undefined || right === null)
                return right;
            else if (right.start || right.end) {
                return {
                    start: moment(right.start),
                    end: moment(right.end),
                };
            }
            return moment(right);
        }
    }
});

const displayed = computed(() => {
    if (date.value === null || date.value === undefined)
        return "no";
    if (date.value.start instanceof moment && date.value.end instanceof moment)
        return `${date.value.start.calendar()} - ${date.value.end.calendar()}`;
    return date.value.calendar();
});
</script>

<template>
    <DatePicker v-model="transformedDate" v-if="transformedDate === null || transformedDate === undefined || !transformedDate.start">
        <template #default="{ togglePopover }">
            <AInput :modelValue="displayed" :placeholder="displayed" @focus="togglePopover"/>
        </template>
  </DatePicker>
  <DatePicker v-model.range="transformedDate" v-else-if="transformedDate.start">
        <template #default="{ togglePopover }">
            <div class="flex-row">
                <AInput :modelValue="displayed" @focus="togglePopover"/>
                -
                <AInput :modelValue="displayed" @focus="togglePopover"/>
            </div>
        </template>
  </DatePicker>
</template>