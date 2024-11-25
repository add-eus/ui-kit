<script setup lang="ts">
import { PropType, computed, watch } from "vue";
import { Colors, useColor } from "../stores/color";

const props = defineProps({
  color: {
    type: String as PropType<Colors>,
    default: "grey",
    validator: (value) => {
      return ["grey", "primary", "danger", "success"].includes(value);
    },
  },
  type: {
    type: String as PropType<"checkbox" | "switch" | "hidden">,
    default: "checkbox",
    validator: (value) => {
      return ["checkbox", "switch", "hidden"].includes(value);
    },
  },
  value: {
    default: false,
  },
  valueChecked: {
    default: true,
  },
  valueUnchecked: {
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
});

const modelValue = defineModel();

const checkboxValue = computed({
  get() {
    const isChecked = modelValue.value === props.valueChecked;
    console.log("checkboxValue computed:", {
      modelValue: modelValue.value,
      expected: props.valueChecked,
      result: isChecked,
    });
    return isChecked;
  },
  set(v) {
    console.log("Setting checkboxValue:", v);
    modelValue.value = v ? props.valueChecked : props.valueUnchecked;
  },
});

const mainColor = computed(() => props.color);

const color = useColor(mainColor);
const colorInvert = useColor(mainColor, "default", true);

watch(
  () => props.value,
  (newValue) => {
    if (props.value === true) {
      modelValue.value = newValue ? props.valueChecked : props.valueUnchecked;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div
    :class="
      props.type === 'switch' ? 'a-input-toggle-switch' : 'a-input-checkbox'
    "
  >
    <label
      :class="{
        'custom-checkbox': props.type === 'checkbox',
        'custom-checkbox-indetermitate': props.indeterminate,
        'hide-checkbox': props.type === 'hidden',
        'input-disabled': props.disabled,
        selected: checkboxValue,
        'no-label': !$slots.default,
      }"
    >
      <input
        type="checkbox"
        v-model="checkboxValue"
        :disabled="disabled"
        :checked="value"
      />
      <!-- :class="{ 'input-checked': value }" -->
      <span v-if="type === 'switch'" class="slider"></span>
      <span class="label-text"><slot></slot></span>
      <template v-if="type === 'checkbox'">
        <span class="checkmark-lab"></span>
        <p class="caption-text">
          <slot name="caption"></slot>
        </p>
      </template>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.a-input-checkbox {
  width: 20px;
  min-height: 20px;
  min-width: fit-content;

  label {
    display: flex;
    justify-content: center;
    padding: 4px 10px;
    border-radius: 5px;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;

    //HIDDEN CHECKBOX
    &.no-label {
      padding: 4px;

      input[type="checkbox"] {
        margin-right: 0;
      }
    }

    &.hide-checkbox {
      color: v-bind(color);
      border: 2px solid v-bind(color);
      text-align: center;

      &.selected {
        background-color: v-bind(color);
        color: v-bind(colorInvert);
        border-color: v-bind(color);
      }

      input[type="checkbox"] {
        display: none;
      }
    }
  }

  .label-text {
    display: inline-block;
    width: 0;
    white-space: nowrap;

    &:not(:empty) {
      min-width: 90px;
      width: fit-content;
      min-height: 16px;
    }
  }

  //CUSTOM CHECKBOX
  .custom-checkbox {
    display: flex;
    position: relative;
    cursor: pointer;
    user-select: none;
    justify-content: flex-start;
    padding: 0 0 0 25px;

    &:hover input ~ .checkmark-lab {
      background-color: var(--a-grey-light);
    }

    //Hide native checkbox
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;

      &.input-checked ~ .checkmark-lab,
      &:checked ~ .checkmark-lab {
        background-color: v-bind(color);

        &:after {
          display: block;
        }
      }
    }

    //Custom check
    .checkmark-lab {
      position: absolute;
      top: 0;
      left: 0;
      height: 20px;
      width: 20px;
      border-radius: 4px;
      background-color: var(--a-grey-lighter);
      transition: background-color 0.3s, border-color 0.3s;

      &:after {
        content: "";
        position: absolute;
        display: none;
        left: 8px;
        top: 4px;
        width: 5px;
        height: 9px;
        border: solid var(--a-white);
        border-width: 0 1px 1px 0;
        transform: rotate(45deg);
      }
    }

    &-indetermitate {
      .checkmark-lab {
        &:after {
          top: 10px;
          left: 5px;
          width: 10px;
          border-width: 1px 0 0 0;
          transform: rotate(0);
        }
      }
    }

    //Caption
    .caption-text {
      position: absolute;
      top: 8px;
      font-size: 8px;
      color: var(--a-grey);
    }
  }
}

//SWITCH
.a-input-toggle-switch {
  display: flex;

  label {
    position: relative;
    display: inline-block;
    height: 20px;
    cursor: pointer;

    input {
      opacity: 0;
      width: 0;
      height: 0;

      &:checked + .slider {
        background-color: v-bind(color);
      }

      &:focus + .slider {
        box-shadow: 0 0 1px v-bind(color);
      }

      &:checked + .slider:before {
        transform: translateX(20px);
      }
    }

    .label-text {
      margin-left: 40px;
      font-size: 12px;
    }

    .slider {
      width: 40px;
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--a-grey-lighter);
      transition: 0.25s;
      border-radius: 20px;

      &:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        transition: 0.25s;
        border-radius: 50%;
      }
    }
  }
}

//DISABLED
.a-input-checkbox,
.a-input-toggle-switch {
  //ALL
  .input-disabled {
    color: var(--a-grey);
    pointer-events: none;

    //HIDDEN CHECKBOX
    &.hide-checkbox {
      color: var(--a-grey);
      border-color: var(--a-grey-light);
    }
  }
}
</style>
