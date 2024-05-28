<script setup lang="ts">
import { useFocus } from "@vueuse/core";
import { useVModel } from "@vueuse/core";
import { computed, ref, watch } from "vue";

export interface AInputSizerEmits {
  (event: "update:modelValue", value?: any): void;
}
export interface AInputSizerProps {
  raw?: boolean;
  modelValue?: any;
  placeholder?: string;
}

const emits = defineEmits<AInputSizerEmits>();
const props = withDefaults(defineProps<AInputSizerProps>(), { modelValue: "" });

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
      ref="textarea"
      v-model="value"
      :class="classes"
      rows="1"
      :placeholder="placeholder"
    ></textarea>
  </div>
</template>

<style lang="scss" scoped>
.a-input-sizer {
  display: inline-grid;
  vertical-align: top;
  align-items: center;
  position: relative;
  border: 1px solid var(--a-grey-lighter);
  border-radius: 4px;
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
    min-height: 80px;
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
    outline: solid 1px var(--a-grey);

    textarea:focus,
    input:focus {
      outline: none;
      box-shadow: none;
    }
  }
}
</style>
