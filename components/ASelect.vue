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
  label: {
    type: String,
    default: null,
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
</script>

<template>
  <div class="a-select" :class="{ labelised: label }">
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
    <label v-if="label" class="select-label">{{ label }}</label>
  </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss">
.a-select {
  position: relative;
  --ms-bg: transparent;
  --dark-text: var(--a-grey-darkest); //Text color
  --ms-border-color: v-bind(colorValue); //Border color
  --ms-border-width: 1px;
  --ms-radius: 5px;
  --ms-tag-font-size: 10px;
  --ms-tag-radius: 5px;
  --ms-tag-bg: v-bind(tagColor); //Tag color
  --ms-tag-color: v-bind(tagColorInvert); //Tag background
  --ms-caret-color: v-bind(colorValue); // Arrow color
  --ms-option-color-selected: v-bind(colorValue);
  --ms-option-bg-selected: transparent;
  --ms-option-bg-pointed: transparent;
  --ms-option-color-pointed: #000;
  --ms-option-bg-selected-pointed: transparent;
  --ms-option-color-selected-pointed: #000;
  --accessibility-focus-outline-color: transparent; // Remove the dash outline on focus

  &:focus-within {
    --ms-border-color: #0969da;
  }

  // LABEL
  &.labelised {
    .multiselect-search,
    .multiselect-tags {
      padding-top: 20px;
    }

    .select-label {
      position: absolute;
      top: 8px;
      left: 16px;
      font-size: 12px;
    }

    .label {
      padding-top: 20px;
    }
  }

  .multiselect {
    min-height: 58px;
    font-size: 14px;

    .multiselect-search,
    .multiselect-tags {
      padding-left: 16px;

      .multiselect-tag {
        height: 20px;
        padding: 1px 0 1px 5px;

        .multiselect-tag-remove {
          margin: 0;
        }
      }
    }

    // CHECKBOX
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
  }

  input[type="checkbox"] {
    margin: 0 20px;
  }

  .label {
    font-weight: 400;
    width: 100%;
    cursor: pointer;
    pointer-events: none;
    white-space: nowrap;
    max-width: 88%;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    padding-left: 14px;
  }

  .is-selected {
    &::after {
      display: none;
    }
  }
}
</style>
