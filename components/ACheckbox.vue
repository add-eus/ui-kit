<script setup lang="ts">
import { PropType, computed } from "vue";
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
      return ["checkbox", "switch", 'hidden'].includes(value);
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
  hideCheckbox: {
    type: Boolean,
    default: false,
  },
  toggleSwitch: {
    type: Boolean,
    default: false,
  },
});

const modelValue = defineModel();

const checkboxValue = computed({
  get() {
    return modelValue.value === props.valueChecked;
  },
  set(v) {
    modelValue.value = v ? props.valueChecked : props.valueUnchecked;
  },
});

const mainColor = computed(() => props.color);

const color = useColor(mainColor);
const colorInvert = useColor(mainColor, "default", true);
</script>

<template>
  <div :class="props.type === 'switch' ? 'a-input-toggle-switch' : 'a-input-checkbox'">
    <label
      :class="{
        'hide-checkbox': props.type === 'hidden',
        selected: checkboxValue,
        'no-label': !$slots.default,
      }"
    >
      <input type="checkbox" v-model="checkboxValue" />
      <span v-if="type === 'switch'" class="slider"></span>
      <span class="label-text"><slot></slot></span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.a-input-checkbox {
  min-width: fit-content;

  label {
    display: flex;
    justify-content: center;
    padding: 4px 10px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;

    input[type="checkbox"] {
      accent-color: v-bind(color);
      cursor: pointer;
      margin-right: 5px;
    }

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

    &:not(:empty) {
      min-width: 90px;
      width: fit-content;
      min-height: 16px;
    }
  }
}

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
</style>
