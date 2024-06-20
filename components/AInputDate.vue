<script setup lang="ts">
import {  DatePicker } from 'v-calendar';
import AInput from './AInput.vue';
import moment from "moment";
import 'v-calendar/style.css';
import { ref } from 'vue';
import {  useVModel, syncRef } from '@vueuse/core';

export interface MomentRange {
    start: moment.Moment | null; 
    end: moment.Moment | null;
}

export interface DateRange {
    start: Date | null;
    end: Date | null;
}

export interface AInputDateProps {
    modelValue?: moment.Moment | null | MomentRange;
    format?: string;
}

const props = withDefaults(defineProps<AInputDateProps>(), {
    format: 'DD-MM-YYYY',
    modelValue: moment()
});

const emits = defineEmits(['update:modelValue']);

const date = useVModel(props, 'modelValue', emits);

const transformedDate = ref<null | undefined | Date | DateRange>(null);

function isDateRange(value: any): boolean {
    return (
        typeof value === 'object' &&
        value !== null &&
        !moment.isDate(value)
    );
}

function isMomentRange(value: any): boolean {
    return (
        typeof value === 'object' &&
        value !== null &&
        !moment.isMoment(value) 
    );
}

function parseMoment(momentValue: moment.Moment | MomentRange | undefined | null) : Date | DateRange | null | undefined {
    if (momentValue === undefined || momentValue === null) return momentValue;

    if (isMomentRange(momentValue)) {
        return {
            start: moment.isMoment(momentValue.start) ? momentValue.start.toDate() : momentValue.start,
            end: moment.isMoment(momentValue.end) ? momentValue.end.toDate() : momentValue.end
        } as DateRange;
    }
    return momentValue.toDate();
}

function formatMoment(dateValue: Date | DateRange | undefined | null) : moment.Moment | MomentRange | null | undefined {
    if (dateValue === undefined || dateValue === null) return dateValue;
    else if (isDateRange(dateValue)) {
        const start = moment(dateValue.start);
        const end = moment(dateValue.end);
        return {start, end};
    }

    return moment(date.value);
}

syncRef(date, transformedDate, {
    immediate: true,
    transform: {
        ltr(left) {
            return parseMoment(left);
        },
        rtl(right: Date | null | undefined | DateRange) {
            return formatMoment(right);
        }
    }
});

</script>

<template>
    <DatePicker v-model="transformedDate" v-if="!isDateRange(transformedDate)">
        <template #default="{ togglePopover }">
            <AInput :modelValue="!moment.isMoment(date) ? '-' : date.format(props.format)" :placeholder="displayed" @focus="togglePopover"/>
        </template>
  </DatePicker>
  <DatePicker v-model.range="transformedDate" v-else>
        <template #default="{ togglePopover }">
            <div class="flex-row">
                <AInput :modelValue="date === null || date === undefined || typeof date !== 'object' || !moment.isMoment(date.start) ? '-' : date.start.format(props.format)" @focus="togglePopover"/>
                -
                <AInput :modelValue="date === null || date === undefined || typeof date !== 'object' || !moment.isMoment(date.end) ? '-' : date.end.format(props.format)" @focus="togglePopover"/>
            </div>
        </template>
  </DatePicker>
</template>