<script setup lang="ts">
import moment, { type Moment } from "moment";
import "v-calendar/style.css";
import { computed, markRaw } from "vue";
import ASelect from "./ASelect.vue";

export interface AInputTimeProps {
  modelValue: Moment | undefined;
}

defineProps<AInputTimeProps>();

const model = defineModel<Moment | undefined>({ default: undefined });

let localHours: number | undefined = undefined, localMinutes: number | undefined = undefined;
const hours = computed<number | undefined>({
  get() {
    if (moment.isMoment(model.value) && model.value.isValid())
      return model.value.hours();
    return localHours;
  },
  set(value) {
    const modelValue = model.value || markRaw(moment());
    if (value === undefined || localMinutes === undefined) {
      if (value === undefined)
        localHours = undefined;
      else
        localHours = value;
      model.value = undefined;
    }
    else {
      localHours = value;
      const cloned = modelValue.clone();
      cloned.minutes(localMinutes);
      cloned.hours(value);
      model.value = cloned;
      
    }
  }
})


const minutes = computed<number | undefined>({
  get() {
    if (moment.isMoment(model.value) && model.value.isValid())
      return model.value.minutes();
    return localMinutes;
  },
  set(value) {
    const modelValue = model.value ||  markRaw(moment());
    if (value === undefined || localHours === undefined) {
      if (value === undefined)
        localMinutes = undefined;
      else 
        localMinutes = value;
      model.value = undefined;
    }
    else {
      localMinutes = value;
      const cloned = modelValue.clone();
      cloned.hours(localHours);
      cloned.minutes(value);
      model.value = cloned;
    }
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
