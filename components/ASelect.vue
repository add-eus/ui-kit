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
    default: "grey",
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
  appendToBody: {
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

//CHECK IF INPUT IS FILLED
const inputValue = ref(props.modelValue);
const isInputFilled = computed(() => inputValue?.value?.length > 0);

const onInputChange = (newValue: string[]) => {
  inputValue.value = newValue;
};
</script>

<template>
  <div
    class="a-select"
    :class="{ labelised: label, 'is-not-empty': isInputFilled }"
  >
    <Multiselect
      v-model="value"
      :mode="mode"
      :required="required"
      :addTagOn="['enter', 'tab', ',', 'space']"
      :close-on-select="closeOnSelect"
      :searchable="searchable"
      :create-option="createOption"
      :options="options"
      :append-to-body="appendToBody"
      :clearOnSelect="mode !== 'single' && required"
      :canDeselect="mode !== 'single' && required"
      :clearOnBlur="true"
      :hide-selected="false"
      :noOptionsText="noOptions"
      :noResultsText="noResults"
      :placeholder="placeholder"
      :canClear="mode !== 'single' && required"
      :disabled="disabled"
      :open-direction="openDirection"
      class="multiselect"
      @change="onInputChange($event)"
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
    <label
      v-if="label"
      class="select-label"
      :class="{ 'is-not-empty': isInputFilled }"
      >{{ label }}<span v-if="required">*</span></label
    >
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
  --ms-caret-color: v-bind(arrowColor); // Arrow color
  --ms-option-color-selected: v-bind(colorValue);
  --ms-option-bg-selected: transparent;
  --ms-option-bg-pointed: transparent;
  --ms-option-color-pointed: #000;
  --ms-option-bg-selected-pointed: transparent;
  --ms-option-color-selected-pointed: #000;
  --accessibility-focus-outline-color: transparent; // Remove the dash outline on focus
  --ms-border-color-active: #0969da; //Active border color
  --ms-ring-color: transparent; //Green box shadow
  --ms-spinner-color: transparent; //Spinner color
  --ms-option-bg-selected: transparent; //Selected option background color
  --ms-tag-bg: transparent; //Tag background color

  &:focus-within {
    --ms-border-color: #0969da;

    .select-label {
      top: 8px !important;
      font-size: 12px !important;
    }

    .multiselect-placeholder {
      opacity: 1 !important;
    }
  }

  // LABEL
  &.labelised {
    .multiselect-search,
    .multiselect-tags {
      padding-top: 20px;
    }

    .select-label {
      position: absolute;
      top: 20px;
      left: 16px;
      font-size: 14px;
      transition: top 0.25s, font-size 0.25s;
      pointer-events: none;

      //IS NOT EMPTY
      &.is-not-empty {
        top: 8px;
        font-size: 12px;
      }

      span {
        color: var(--a-danger);
      }
    }

    //PLACEHOLDER
    .multiselect-placeholder {
      width: 88%;
      padding-top: 20px;
      opacity: 0;
      transition: opacity 0.25s;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
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

      .multiselect-tags-search-wrapper {
        margin: 0;
      }

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
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    margin-right: 10px;
    padding-left: 16px;

    &.multiselect-placeholder {
      padding-left: 16px !important;
    }
  }

  .is-selected {
    &::after {
      display: none;
    }
  }
}
</style>
