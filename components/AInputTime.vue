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

let localHours: number | undefined = model.value?.hours();
let localMinutes: number | undefined = model.value?.minutes();
const hours = computed<number | undefined>({
  get() {
    if (moment.isMoment(model.value) && model.value.isValid())
      return model.value.hours();
    return localHours;
  },
  set(value) {
    const modelValue = model.value || markRaw(moment());
    if (value === undefined || localMinutes === undefined) {
      if (value === undefined) localHours = undefined;
      else localHours = value;
      model.value = undefined;
    } else {
      localHours = value;
      const cloned = modelValue.clone();
      cloned.minutes(localMinutes);
      cloned.hours(value);
      model.value = cloned;
    }
  },
});

const minutes = computed<number | undefined>({
  get() {
    if (moment.isMoment(model.value) && model.value.isValid())
      return model.value.minutes();
    return localMinutes;
  },
  set(value) {
    const modelValue = model.value || markRaw(moment());
    if (value === undefined || localHours === undefined) {
      if (value === undefined) localMinutes = undefined;
      else localMinutes = value;
      model.value = undefined;
    } else {
      localMinutes = value;
      const cloned = modelValue.clone();
      cloned.hours(localHours);
      cloned.minutes(value);
      model.value = cloned;
    }
  },
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
  <div class="a-input-time">
    <svg
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.71875 13.9375C4.40516 13.9375 1.71973 11.2511 1.71973 7.93852C1.71973 4.62493 4.40516 1.93848 7.71875 1.93848C11.0323 1.93848 13.7178 4.62493 13.7178 7.93852C13.7178 11.2511 11.0323 13.9375 7.71875 13.9375ZM7.71875 0.71875C11.7052 0.71875 14.9375 3.95103 14.9375 7.93852C14.9375 11.925 11.7052 15.1562 7.71875 15.1562C3.73228 15.1562 0.5 11.925 0.5 7.93852C0.5 3.95103 3.73228 0.71875 7.71875 0.71875ZM7.71875 3.15871C7.38129 3.15871 7.10889 3.43213 7.10889 3.76959V7.92886C7.10889 7.92988 7.10889 7.93089 7.10889 7.93191C7.10787 8.09047 7.16581 8.24904 7.28676 8.37L10.2344 11.3167C10.3534 11.4366 10.5089 11.4955 10.6654 11.4955C10.8209 11.4955 10.9775 11.4366 11.0964 11.3167C11.3342 11.0788 11.3342 10.6926 11.0964 10.4547L8.32861 7.68695V3.76959C8.32861 3.43213 8.05621 3.15871 7.71875 3.15871Z"
        fill="#666666"
      />
    </svg>

    <ASelect
      mode="single"
      color="black"
      v-model="hours"
      :options="hoursOptions"
      name="hours"
      close-on-select
      placeholder="--"
    >
    </ASelect>
    :
    <ASelect
      mode="single"
      color="black"
      v-model="minutes"
      :options="minutesOptions"
      name="minutes"
      close-on-select
      placeholder="--"
    >
    </ASelect>
  </div>
</template>

<style lang="scss">
.a-input-time {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 107px;
  height: 21px;
  border-radius: 4px;
  background: var(--a-grey-lightest);

  svg {
    margin-left: 5px;
  }

  .a-select {
    width: 30px;
    height: 21px;

    .multiselect {
      border: 1px solid transparent;
      min-height: inherit;

      .multiselect-wrapper {
        margin: 0;
        padding: 0;
        min-height: inherit;

        .multiselect-search {
          margin: 0;
          padding: 0;
          padding-left: 5px;
        }

        .label {
          white-space: inherit;
          max-width: inherit;
          overflow: inherit;
          text-overflow: inherit;
          margin: 0;
          position: absolute;
          top: -1px;
          left: 5px;
          font-weight: 500;
          font-size: 14px;
          padding: 0;
        }

        .multiselect-placeholder {
          margin: 0;
          padding: 0 !important;
          position: absolute;
          top: 3px;
          left: 5px;
          font-weight: 500;
          font-size: 14px;
        }

        .multiselect-caret {
          opacity: 0;
        }
      }
      .multiselect-dropdown {
        width: 60px;

        .multiselect-options {
          .multiselect-option {
            margin: 0;

            .a-input-radio {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
