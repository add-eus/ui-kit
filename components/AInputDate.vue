<script setup lang="ts">
import {  DatePicker } from 'v-calendar';
import AInput from './AInput.vue';
import 'v-calendar/style.css';
import { ref, markRaw, computed, watch, nextTick } from 'vue';
import { syncRef, watchPausable } from '@vueuse/core';
import moment from "moment";

export interface MomentRange {
    start: moment.Moment | null | undefined; 
    end: moment.Moment | null | undefined; 
}

export interface DateRange {
    start: Date | null | undefined;
    end: Date | null | undefined;
}

export interface AInputDateProps {
    modelValue: moment.Moment | null | undefined | MomentRange;
    format?: string;
}

const props = withDefaults(defineProps<AInputDateProps>(), {
    format: 'DD-MM-YYYY'
});

const date = defineModel<moment.Moment | MomentRange | null | undefined>();

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
        const start = markRaw(moment(dateValue.start));
        const end = markRaw(moment(dateValue.end));
        if (start.isSame(date.value.start) && end.isSame(date.value.end))
            return date.value;
        return {start, end};
    }

    const m = moment(dateValue);

    if (m.isSame(date.value))
        return date.value;
    
    return markRaw(m);
}

syncRef(date, transformedDate, {
    immediate: true,
    flush: 'sync',
    transform: {
        ltr(left) {
            return parseMoment(left);
        },
        rtl(right: Date | null | undefined | DateRange) {
            return formatMoment(right);
        }
    }
});

const displayed = computed(() => {
    if (isMomentRange(date.value)) {
        return [
            moment.isMoment(date.value.start) ? date.value.start.format(props.format) : '-', 
            moment.isMoment(date.value.end) ? date.value.end.format(props.format) : '-'
        ];
    }
    else if (moment.isMoment(date.value)) {
        return date.value.format(props.format);
    }
    return '-';
});

</script>

<template>
    <DatePicker v-model="transformedDate" v-if="!isDateRange(transformedDate)">
        <template #default="{ togglePopover }">
            <AInput :modelValue="displayed" @focus="togglePopover"/>
        </template>
    </DatePicker>
    <DatePicker v-model.range="transformedDate" v-else>
        <template #default="{ togglePopover }">
            <div class="flex-row">
                <AInput :modelValue="displayed[0]" @focus="togglePopover"/>
                -
                <AInput :modelValue="displayed[1]" @focus="togglePopover"/>
            </div>
        </template>
    </DatePicker>
</template>