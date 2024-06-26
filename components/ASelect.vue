<script setup lang="ts">
import { defineProps, computed, PropType } from "vue";
import { useColor } from "../stores/color";
import type { Colors } from "../stores/color";
import Multiselect from "@vueform/multiselect";

const props = defineProps({
  options: {
    type: Array as PropType<string[]>,
    default: () => ["Option 1", "Option 2", "Option 3"],
  },
  noResults: {
    type: String,
    default: () => "No results found",
  },
  noOptions: {
    type: String,
    default: () => "The list is empty",
  },
  placeholder: {
    type: String,
    default: () => "Type your tag..",
  },
  color: {
    type: String as PropType<Colors>,
    default: "grey-light",
  },
  tagColor: {
    type: String as PropType<Colors>,
    default: "primary",
  },
});

const color = useColor(
  computed(() => {
    return props.color;
  })
);

const mainColor = computed(() => props.tagColor);
const tagColor = useColor(mainColor);
const tagColorInvert = useColor(mainColor, "default", true);
</script>

<template>
  <div class="a-select">
    <Multiselect
      v-model="value"
      mode="tags"
      :close-on-select="false"
      :searchable="true"
      :create-option="true"
      :options="options"
      :noOptionsText="noOptions"
      :noResultsText="noResults"
      :placeholder="placeholder"
      class="multiselect"
    />
  </div>
</template>

<style lang="scss" scoped>
.a-select {
  --dark-text: var(--a-grey-darkest); //Text color
  --ms-border-color: v-bind(color); //Border color
  --ms-tag-bg: v-bind(tagColor); //Tag color
  --ms-tag-color: v-bind(tagColorInvert); //Tag background
  --ms-caret-color: transparent; // Remove the arrow color
  --accessibility-focus-outline-color: transparent; // Remove the dash outline on focus
}
</style>
