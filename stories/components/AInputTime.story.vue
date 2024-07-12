<script setup lang="ts">
import { markRaw, ref } from "vue";
import AInputTime from "../../components/AInputTime.vue";
import AButton from "../../components/AButton.vue";
import moment from "moment";

const time = ref<moment.Moment | undefined>(undefined);

const setRandomTime = () => {
  time.value = moment()
    .hours(Math.floor(Math.random() * 24))
    .minutes(Math.floor(Math.random() * 60));
};
</script>

<template>
  <Story :layout="{ type: 'grid', width: 400 }">
    <Variant title="default">
      <AInputTime v-model="time" />
      <div>
        {{ time?.hours().toString().padStart(2, "0") }}:{{
          time?.minutes().toString().padStart(2, "0")
        }}
      </div>
      <AButton @click="setRandomTime">Random time</AButton>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
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
