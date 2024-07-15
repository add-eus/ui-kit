<script setup lang="ts">
import { PropType, ref, computed, watchEffect } from "vue";
import { Colors, useColor } from "../stores/color";
import "../scss/_color-declaration.scss";

const props = defineProps({
  name: {
    type: String,
    required: false,
  },
  value: {
    type: null as unknown as PropType<any>,
    required: false,
  },
  modelValue: {
    type: null as unknown as PropType<any>,
    required: false,
  },
  color: {
    type: String as PropType<Colors>,
    default: "primary",
  },
  textColor: {
    type: String as PropType<Colors>,
    default: "grey-darker",
  },
  hideRadio: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const mainColor = computed(() => props.color);
const textColor = computed(() => props.textColor);

const color = useColor(mainColor);
const colorInvert = useColor(mainColor, "default", true);
const colorText = useColor(textColor);

const onChange = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="a-input-radio">
    <label :class="{ selected: modelValue === value, 'hide-radio': hideRadio }">
      <input
        type="radio"
        :name="name"
        :value="value"
        :checked="modelValue === value"
        @change="onChange"
      />
      <span class="label-text"><slot></slot></span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.a-input-radio {
  min-width: fit-content;

  input[type="radio"] {
    accent-color: v-bind(color);
    cursor: pointer;
    margin-right: 5px;
  }

  label {
    display: flex;
    justify-content: center;
    padding: 4px 10px;
    color: v-bind(colorText);
    border-radius: 5px;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;

    &.hide-radio {
      color: v-bind(color);
      border: 2px solid v-bind(color);
      text-align: center;

      &.selected {
        background-color: v-bind(color);
        color: v-bind(colorInvert);
        border-color: v-bind(color);
      }

      input[type="radio"] {
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
