<script setup lang="ts">
import { defineProps, computed, PropType } from "vue";
import { useColor } from "../stores/color";
import type { Colors } from "../stores/color";
import Multiselect from "@vueform/multiselect";
import ACheckbox from "./ACheckbox.vue";
import AInputRadio from "./AInputRadio.vue";
import "../scss/_color-declaration.scss";

const props = defineProps({
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
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
  mode: {
    type: String as PropType<"tags" | "single" | "multiple" | undefined>,
    default: "tags",
  },
  createOption: {
    type: Boolean,
    default: false,
  },
});

const color =   computed(() => {
    return props.color;
  });

const colorValue = useColor(
  color
);

const colorValueInvert = useColor(
  color,
  "default",
  true
);

const mainColor = computed(() => props.tagColor);
const tagColor = useColor(mainColor);
const tagColorInvert = useColor(mainColor, "default", true);
const value = defineModel();
</script>

<template>
  <div class="a-select">
    <Multiselect
      v-model="value"
      :mode="mode"
      :close-on-select="false"
      :searchable="true"
      :create-option="createOption"
      :options="options"
      :hide-selected="false"
      :noOptionsText="noOptions"
      :noResultsText="noResults"
      :placeholder="placeholder"
      :canClear="mode !== 'single'"
      class="multiselect"
    >
      <template #option="{option, search}">
        <ACheckbox :color="color" :modelValue="value.indexOf(option.value) >= 0" v-if="mode == 'multiple'" />
        <AInputRadio :name="option.value" :color="color" :modelValue="value" :value="option.value" v-else-if="mode == 'single'" />
        <slot name="option" :option="option" :search="search">
        {{ option.label }}
        </slot>
      </template>
      <template #singlelabel>
        <span class="label">
          <slot name="label"></slot>
        </span>
       
      </template>
      <template #multiplelabel>
        <span class="label">
          <slot name="label"></slot>
        </span>
      </template>
      <template #placeholder>
        <span class="label">
          <slot name="label"></slot>
        </span>
      </template>
    </Multiselect>
  </div>
</template>

<style lang="scss">
.a-select {
    --ms-bg: transparent;
  --dark-text: var(--a-grey-darkest); //Text color
  --ms-border-color: v-bind(colorValue); //Border color
  --ms-tag-bg: v-bind(tagColor); //Tag color
  --ms-tag-color: v-bind(tagColorInvert); //Tag background
  --ms-caret-color: transparent; // Remove the arrow color
  --ms-option-color-selected: #000;
  --ms-option-bg-selected: transparent;
  --ms-option-bg-pointed: transparent;
  --ms-option-color-pointed: #000;
  --ms-option-bg-selected-pointed: transparent;
  --ms-option-color-selected-pointed: #000;;
  --accessibility-focus-outline-color: transparent; // Remove the dash outline on focus

  input[type="checkbox"] {
    margin: 0 20px;
  }

  .label {
    margin: 0 10px;
    color: v-bind(colorValue);
    font-weight: 400;
    width: 100%;
    cursor: pointer;
  }

  .is-selected {
    &::after {
        display: none;
    }
  }
}
</style>
