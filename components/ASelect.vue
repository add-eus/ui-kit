<script setup lang="ts">
import { defineProps, computed, PropType, watch, ref } from "vue";
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
  arrowColor: {
    type: String as PropType<Colors>,
    default: "transparent",
  },
  mode: {
    type: String as PropType<"tags" | "single" | "multiple" | undefined>,
    default: "tags",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  createOption: {
    type: Boolean,
    default: false,
  },
  openDirection: {
    type: String as PropType<"top" | "bottom" | undefined>,
    default: undefined,
  },
  required: {
    type: Boolean,
    default: false,
  },
  searchable: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
  closeOnSelect: {
    type: Boolean,
    default: false,
  },
});

const color = computed(() => {
  return props.color;
});

const colorValue = useColor(color);

const colorValueInvert = useColor(color, "default", true);

const mainColor = computed(() => props.tagColor);
const tagColor = useColor(mainColor);
const tagColorInvert = useColor(mainColor, "default", true);
const value = defineModel();

const arrowColor = useColor(
  computed(() => {
    return props.arrowColor;
  })
);
</script>

<template>
  <div class="a-select">
    <Multiselect
      v-model="value"
      :mode="mode"
      :required="required"
      :addTagOn="['enter', 'tab', ',', 'space']"
      :close-on-select="closeOnSelect"
      :searchable="searchable"
      :create-option="createOption"
      :options="options"
      :clearOnSelect="mode !== 'single' && required"
      :canDeselect="mode !== 'single' && required"
      :clearOnBlur="mode !== 'single' && required"
      :hide-selected="false"
      :noOptionsText="noOptions"
      :noResultsText="noResults"
      :placeholder="placeholder"
      :canClear="mode !== 'single' && required"
      :disabled="disabled"
      :open-direction="openDirection"
      class="multiselect"
    >
      <template #option="{ option, search }">
        <template v-if="mode == 'multiple'">
          <ACheckbox
            :color="color"
            class="checkbox-select"
            :modelValue="value.indexOf(option.value) >= 0"
          />
        </template>
        <template v-else-if="mode == 'single'">
          <AInputRadio
            :name="`${props.name}${option.value.toString()}`"
            :color="color"
            class="radio-select"
            :modelValue="value"
            :value="option.value"
          />
        </template>
        <slot name="option" :option="option" :search="search">
          <p :class="mode == 'multiple' && 'checkbox-title'">
            {{ option.label }}
          </p>
        </slot>
      </template>
      <template #singlelabel="{ value }">
        <span class="label">
          <slot name="label">
            {{ value.label || "Select an option" }}
          </slot>
        </span>
      </template>
      <template #multiplelabel="{ values }">
        <span class="label">
          <slot name="label"> {{ values.length }} selected </slot>
        </span>
      </template>
      <template #placeholder>
        <span class="label multiselect-placeholder">
          <slot name="label">
            {{ placeholder }}
          </slot>
        </span>
      </template>
    </Multiselect>
  </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss">
.a-select {
  --ms-bg: transparent;
  --dark-text: var(--a-grey-darkest); //Text color
  --ms-border-color: v-bind(colorValue); //Border color
  --ms-border-width: 2px;
  --ms-radius: 5px;
  --ms-tag-bg: v-bind(tagColor); //Tag color
  --ms-tag-color: v-bind(tagColorInvert); //Tag background
  --ms-caret-color: v-bind(arrowColor); // Arrow color
  --ms-option-color-selected: v-bind(colorValue);
  --ms-option-bg-selected: transparent;
  --ms-option-bg-pointed: transparent;
  --ms-option-color-pointed: #000;
  --ms-option-bg-selected-pointed: transparent;
  --ms-option-color-selected-pointed: #000;
  --accessibility-focus-outline-color: transparent; // Remove the dash outline on focus

  .multiselect {
    .checkbox-select {
      padding-right: 20px;
      pointer-events: none;
    }
  }

  .radio-select {
    padding-right: 10px;
  }

  p {
    color: var(--a-black);
    font-weight: 500;

    &.checkbox-title {
      margin-top: 10px;
    }
  }

  input[type="checkbox"] {
    margin: 0 20px;
  }

  .label {
    margin: 0 10px;
    color: v-bind(colorValue);
    font-weight: 400;
    width: 100%;
    cursor: pointer;
    pointer-events: none;
    white-space: nowrap;
    max-width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .is-selected {
    &::after {
      display: none;
    }
  }
}
</style>
