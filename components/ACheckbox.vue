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
  <div class="a-input-checkbox">
    <label
      :class="{ 'hide-checkbox': props.hideCheckbox, selected: checkboxValue }"
    >
      <input type="checkbox" v-model="checkboxValue" />
      <span class="label-text"><slot></slot></span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.a-input-checkbox {
  min-width: fit-content;

  input[type="checkbox"] {
    accent-color: v-bind(color);
    cursor: pointer;
    margin-right: 5px;
  }

  label {
    display: flex;
    justify-content: center;
    padding: 4px 10px;
    border-radius: 5px;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;

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
    width: 5px;

    &:not(:empty) {
      width: 90px;
      height: 16px;
    }
  }
}
</style>
