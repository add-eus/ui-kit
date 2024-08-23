<script setup lang="ts">
import { defineProps, computed } from "vue";
import AIcon from "./AIcon.vue";

const props = defineProps({
  titles: {
    type: Array,
    default: () => ["Mots clés", "Apparitions", "Evolution"],
  },
  keys: {
    type: Array,
    default: () => ["1992", "1993", "1994", "1995"],
  },
  actual: {
    type: Array,
    default: () => ["52", "148", "78", "263", "32"],
  },
  before: {
    type: Array,
    default: () => ["92", "48", "718", "63", "82"],
  },
});

const keysLength = props.keys.length;
const titlesLength = props.titles.length;

const diff = computed(() => {
  return props.actual.map((value, index) => {
    const difference = Number(value) - Number(props.before[index]);
    return Number(value) - Number(props.before[index]);
  });
});
</script>

<template>
  <div class="a-spreadsheet" :style="{ '--lenght': titlesLength }">
    <div class="spreadsheet-titles">
      <div v-for="index in titlesLength" :key="index" class="spreadsheet-title">
        {{ titles[index - 1] }}
      </div>
    </div>
    <div class="spreadsheet-column" v-for="index in keysLength" :key="index">
      <div class="spreadsheet-section">{{ keys[index - 1] }}</div>
      <div class="spreadsheet-section">{{ actual[index - 1] }}</div>
      <div
        class="spreadsheet-section"
        v-if="diff[index - 1] > 0"
        style="color: var(--a-success)"
      >
        <AIcon icon="arrow_upward" type="rounded" color="success" />
        <div class="spreadsheet-number">+{{ diff[index - 1] }}</div>
      </div>
      <div
        class="spreadsheet-section"
        v-else="diff[index - 1] > 0"
        style="color: var(--a-danger)"
      >
        <AIcon icon="arrow_downward" type="rounded" color="danger" />
        <div class="spreadsheet-number">{{ diff[index - 1] }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.a-spreadsheet {
  display: flex;
  flex-direction: column;

  .spreadsheet-titles {
    display: flex;

    .spreadsheet-title {
      width: calc(100% / var(--lenght));
      text-align: center;
      font-size: 12px;
      color: var(--a-grey);
      font-weight: 500;
      padding-bottom: 2px;

      &:first-child {
        text-align: left;
        padding-left: 10px;
      }

      &:last-child {
        text-align: right;
        padding-right: 10px;
      }
    }
  }

  .spreadsheet-column {
    text-transform: capitalize;
    display: flex;
    padding: 2px 1px;
    border-top: 1px solid var(--a-grey-lighter);

    &:last-child {
      border-bottom: 1px solid var(--a-grey-lighter);
    }

    .spreadsheet-section {
      width: calc(100% / var(--lenght));
      text-align: center;
      font-size: 12px;
      color: var(--a-grey-darker);
      font-weight: 500;

      &:first-child {
        text-align: left;
        padding-left: 20px;
      }

      &:last-child {
        text-align: right;
        padding-right: 10px;
        display: flex;
        justify-content: flex-end;

        .spreadsheet-number {
          min-width: 34px;
          text-align: center;
        }
      }
    }
  }
}
</style>
