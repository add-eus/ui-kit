<script setup lang="ts">
import { PropType, computed, ref } from "vue";
import { Colors, useColor } from "../stores/color";
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";

export interface VTelInputEmits {
  (e: "update:modelValue", value: string | number): void;
}

const props = defineProps({
  color: {
    type: String as PropType<Colors>,
    default: "grey",
    validator: (value) => {
      return ["grey", "primary", "danger", "success"].includes(value);
    },
  },
  placeholder: {
    type: String,
    default: "Type here..",
  },
  full: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: Object as PropType<Array<string> | string | undefined>,
    default: undefined,
  },
});

const color = useColor(
  computed(() => {
    return props.color;
  })
);

const model = defineModel();
const inputRef = ref<HTMLInputElement | null>(null);
const focus = () => {
  inputRef.value?.focus();
};
defineExpose({ focus });

const telInputModel = ref(props.modelValue || "");

const emit = defineEmits<VTelInputEmits>();

function onInput(phone, phoneObject) {
  telInputModel.value = phoneObject.formatted.replace(
    "+" + phoneObject.countryCallingCode + " ",
    ""
  );

  emit("update:modelValue", phoneObject.formatted);
}
</script>

<template>
  <div
    class="a-input"
    :class="type === 'phone' && 'a-input-phone'"
    :style="{
      borderColor: color,
      width: full && '100%',
      '--color': color,
    }"
  >
    <template v-if="type === 'phone'">
      <VueTelInput
        v-model="telInputModel"
        mode="international"
        default-country="FR"
        :enabled-country-code="true"
        :preferred-countries="['FR']"
        autocomplete="off"
        :validCharactersOnly="true"
        :autoFormat="true"
        :dropdown-options="{
          showDialCodeInList: true,
          showDialCodeInSelection: true,
          showFlags: true,
        }"
        :input-options="{
          placeholder: placeholder,
          required: true,
          showDialCode: false,
          type: 'tel',
        }"
        @on-input="onInput"
      ></VueTelInput>
    </template>
    <template v-else>
      <input
        ref="inputRef"
        v-bind="$attrs"
        v-model="model"
        :placeholder="placeholder"
        :type="type"
      />
    </template>
    <slot name="rightAction" class="right-action"></slot>
  </div>
</template>

<style lang="scss">
.a-input {
  &.a-input-phone {
    .vue-tel-input {
      .vti__dropdown {
        position: initial !important;
      }

      .vti__input {
        border: none;
        padding-left: 0px !important;
        outline: none;
        box-shadow: none;
        width: 100%;
      }
    }
  }
}
</style>

<style scoped lang="scss">
.a-input {
  padding: 12px 16px;
  border-radius: 3px;
  border-style: solid;
  border-width: 1px;
  display: flex;
  background: var(--a-white);
  overflow: visible;

  &.a-input-phone {
    padding: 6.5px;
    position: relative;

    .vue-tel-input {
      border: 1px solid transparent;
      box-shadow: none;
      width: 100%;
    }
  }

  input {
    border: none;
    max-width: 100%;
    transition: opacity 0.25s, outline 0.25s;
    outline: none !important;
    border: none;
    width: 100%;
    text-overflow: ellipsis;

    &::placeholder {
      color: var(--a-grey-light);
      opacity: 1; /* Firefox */
    }

    &::-ms-input-placeholder {
      /* Edge 12 -18 */
      color: var(--a-grey-light);
    }

    &:focus {
      outline: 1px solid rgba(255, 255, 255, 0.5);
      outline-offset: -1px;

      &::placeholder {
        opacity: 0.75;
      }

      &::-ms-input-placeholder {
        opacity: 0.75;
      }
    }
  }
}
</style>
