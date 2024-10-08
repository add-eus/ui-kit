<script setup lang="ts">
import { useFocus } from "@vueuse/core";
import { useVModel } from "@vueuse/core";
import type { Colors } from "../stores/color";
import { useColor } from "../stores/color";
import { computed, ref, watch } from "vue";

export interface AInputSizerEmits {
  (event: "update:modelValue", value?: any): void;
  (event: "blur"): void;
}
export interface AInputSizerProps {
  raw?: boolean;
  modelValue?: any;
  placeholder?: string;
  maxLength?: number;
  color?: Colors;
  textColor?: Colors;
}

const emits = defineEmits<AInputSizerEmits>();
const props = withDefaults(defineProps<AInputSizerProps>(), {
  modelValue: "",
  maxLength: 9999,
  textColor: "grey-dark",
  color: "grey-light",
});

const mainColor = computed(() => props.color);
const color = useColor(mainColor);
const colorDark = useColor(mainColor, "dark");

const textColor = computed(() => props.textColor);
const colorText = useColor(textColor);

const value = useVModel(props, "modelValue", emits);

const textarea = ref<HTMLTextAreaElement | null>(null);
const { focused } = useFocus(textarea);

const classes = computed(() => {
  if (props.raw) return [];

  return ["textarea"];
});

defineExpose({
  focused,
  textarea,
});
</script>

<template>
  <div class="a-input-sizer a-input-sizer-stacked" :data-value="value">
    <textarea
      @blur="() => emits('blur')"
      ref="textarea"
      v-model="value"
      :class="classes"
      rows="1"
      :placeholder="placeholder"
      :maxlength="props.maxLength"
    ></textarea>
  </div>
</template>

<style lang="scss" scoped>
.a-input-sizer {
  display: inline-grid;
  vertical-align: top;
  align-items: center;
  position: relative;
  border: 1px solid v-bind(color);
  border-radius: 3px;
  padding: 0.25em 0.5em;

  &.a-input-sizer-stacked {
    padding: 0.5em;
    align-items: stretch;

    &::after,
    input,
    textarea {
      grid-area: 2 / 1;
    }
  }

  &::after,
  input,
  textarea {
    width: auto;
    min-width: 1em;
    grid-area: 1 / 2;
    font: inherit;
    padding: 0.25em;
    margin: 0;
    resize: none;
    background: none;
    appearance: none;
    border: none;
    min-height: 50px;
    color: v-bind(colorText);
  }

  span {
    padding: 0.25em;
  }

  &::after {
    content: attr(data-value) " ";
    visibility: hidden;
    white-space: pre-wrap;
  }

  &:focus-within {
    outline: solid 1px v-bind(colorDark);

    textarea:focus,
    input:focus {
      outline: none;
      box-shadow: none;
    }
  }
}
</style>
