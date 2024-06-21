<script setup lang="ts">
import { PropType, ref, computed, watchEffect, defineProps } from "vue";
import { Colors, useColor } from "../stores/color";

const props = defineProps({
  name: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    required: false,
  },
  modelValue: {
    type: String,
    required: false,
  },
  color: {
    type: String as PropType<Colors>,
    default: "primary",
  },
});

const mainColor = computed(() => props.color);

const color = useColor(mainColor);
const colorInvert = useColor(mainColor, "default", true);

const emit = defineEmits(["update:modelValue"]);

const onChange = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="a-input-radio">
    <label :class="{ selected: modelValue === value }">
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
  width: 115px;
  min-width: fit-content;

  input[type="radio"] {
    display: none;
  }

  label {
    display: flex;
    justify-content: center;
    padding: 4px 10px;
    border: 2px solid v-bind(color);
    color: v-bind(color);
    border-radius: 5px;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
  }

  .label-text {
    display: inline-block;
  }

  label.selected {
    background-color: v-bind(color);
    color: v-bind(colorInvert);
    border-color: v-bind(color);
  }
}
</style>
