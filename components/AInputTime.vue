<script setup lang="ts">
import moment, { type Moment } from "moment";
import "v-calendar/style.css";
import { computed } from "vue";
import ASelect from "./ASelect.vue";

export interface AInputTimeProps {
  modelValue: Moment | undefined;
}

defineProps<AInputTimeProps>();

const model = defineModel<Moment | undefined>({ default: undefined });

const hours = computed<number | undefined>({
  get() {
    if (moment.isMoment(model.value) && model.value.isValid())
      return model.value.hours();
    return undefined;
  },
  set(value) {
    const modelValue = model.value || moment();
    if (value === undefined)
      model.value = modelValue.clone().hours(0);
    else
      model.value = modelValue.clone().hours(value);
  }
})

const minutes = computed<number | undefined>({
  get() {
    if (moment.isMoment(model.value) && model.value.isValid())
      return model.value.minutes();
    return undefined;
  },
  set(value) {
    const modelValue = model.value || moment();
    if (value === undefined)
      model.value = modelValue.clone().minutes(0);
    else
      model.value = modelValue.clone().minutes(value);
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
    <ASelect mode="single" color="primary" v-model="hours" :options="hoursOptions"> </ASelect>
    <ASelect mode="single" color="primary" v-model="minutes" :options="minutesOptions">
    </ASelect>
  </div>
</template>
