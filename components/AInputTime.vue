<script setup lang="ts">
import moment, { type Moment } from "moment";
import "v-calendar/style.css";
import { computed, ref, watch } from "vue";
import ASelect from "./ASelect.vue";

export interface AInputTimeProps {
  modelValue: Moment | undefined;
}

defineProps<AInputTimeProps>();

const model = defineModel<Moment | undefined>({ default: undefined });

const hours = ref<number | undefined | null>(model.value?.hours());
const minutes = ref<number | undefined | null>(model.value?.minutes());

watch([hours, minutes], ([hours, minutes]) => {
  if (
    hours !== undefined &&
    hours !== null &&
    minutes !== undefined &&
    minutes !== null
  ) {
    model.value = moment().hours(hours).minutes(minutes);
  } else {
    model.value = undefined;
  }
});
watch(model, (value) => {
  if (value !== undefined) {
    hours.value = value.hours();
    minutes.value = value.minutes();
  } else if (
    hours.value !== undefined &&
    hours.value !== null &&
    minutes.value !== undefined &&
    minutes.value !== null
  ) {
    hours.value = undefined;
    minutes.value = undefined;
  }
});

const hoursOptions = Array.from({ length: 24 }, (_, i) => ({
  value: i,
  label: i.toString().padStart(2, "0"),
}));
const minutesOptions = Array.from({ length: 60 }, (_, i) => ({
  value: i,
  label: i.toString().padStart(2, "0"),
}));

</script>

<template>
  <div>
    <ASelect mode="single" v-model="hours" :options="hoursOptions"> </ASelect>
    <ASelect mode="single" v-model="minutes" :options="minutesOptions">
    </ASelect>
  </div>
</template>
