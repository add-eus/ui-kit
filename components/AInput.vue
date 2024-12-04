<script setup lang="ts">
import { PropType, computed, ref } from "vue";
import { VueTelInput } from "vue-tel-input";
import AIcon from "./AIcon.vue";
import "vue-tel-input/vue-tel-input.css";

export interface VTelInputEmits {
  (e: "update:modelValue", value: string | number): void;
}

const props = defineProps({
  state: {
    type: String,
    default: "default",
    validator: (value) => {
      return ["default", "error", "success", "disabled"].includes(value);
    },
  },
  placeholder: {
    type: String,
    default: "Type here..",
  },
  label: {
    type: String,
    default: null,
  },
  full: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "text",
    validator: (value) => {
      return ["text", "phone", "password"].includes(value);
    },
  },
  modelValue: {
    type: Object as PropType<Array<string> | string | undefined>,
    default: undefined,
  },
});

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

// TYPE PASSWORD
const inputPasswordRef = ref<HTMLInputElement | null>(null);
const showPassword = ref(false);

const seePassword = () => {
  if (inputPasswordRef.value) {
    showPassword.value = !showPassword.value;
    inputPasswordRef.value.type = showPassword.value ? "text" : "password";
  }
};
</script>

<template>
  <div
    class="a-input"
    :class="[
      type === 'phone' && 'a-input-phone',
      state !== 'default' && `a-input-${state}`,
    ]"
    :style="{
      width: full && '100%',
    }"
  >
    <div class="left-action-container">
      <slot name="leftAction"></slot>
    </div>
    <!-- TYPE PHONE -->
    <template v-if="type === 'phone'">
      <div class="input-container">
        <VueTelInput
          v-model="telInputModel"
          :class="{ labelised: label }"
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
        <label v-if="label" class="phone-label">{{ label }}</label>
      </div>
    </template>
    <!-- TYPE PASSWORD -->
    <template v-if="type === 'password'">
      <AIcon icon="lock" color="grey" class="lock-input" />
      <div class="input-container">
        <input
          ref="inputPasswordRef"
          v-bind="$attrs"
          v-model="model"
          :disabled="state === 'disabled'"
          :placeholder="placeholder"
          :type="type"
          :class="{ labelised: label }"
        />
        <label v-if="label">{{ label }}</label>
      </div>
      <button class="input-password-button" @click="seePassword">
        <AIcon
          :icon="showPassword ? 'visibility_off' : 'visibility'"
          color="grey"
        />
      </button>
    </template>
    <!-- TYPE TEXT -->
    <template v-else>
      <div class="input-container">
        <input
          ref="inputRef"
          v-bind="$attrs"
          v-model="model"
          :disabled="state === 'disabled'"
          :placeholder="placeholder"
          :type="type"
          :class="{ labelised: label }"
        />
        <label v-if="label">{{ label }}</label>
      </div>
    </template>
    <div class="right-action-container">
      <slot name="rightAction"></slot>
    </div>
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

      &.labelised {
        .vti__input {
          padding-top: 20px;
        }
      }
    }
  }
}
</style>

<style scoped lang="scss">
.a-input {
  padding: 8px 16px;
  border-radius: 5px;
  height: 58px;
  display: flex;
  background: var(--a-white);
  overflow: visible;
  border: 1px solid var(--a-grey-light);

  &:focus-within {
    border-color: #0969da;
  }

  &.a-input-error {
    border-color: var(--a-danger);
  }

  &.a-input-success {
    border-color: var(--a-success);
  }

  &.a-input-disabled {
    cursor: not-allowed;
    background: var(--a-grey-lightest);

    label,
    input {
      cursor: not-allowed;
    }
  }

  // PHONE
  &.a-input-phone {
    padding: 6.5px;
    position: relative;

    .vue-tel-input {
      border: 1px solid transparent;
      box-shadow: none;
      width: 100%;
    }

    .phone-label {
      position: absolute;
      left: 74px;
    }
  }

  // LABEL
  label {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 12px;
  }

  // GENERAL
  .input-container {
    display: flex;
    position: relative;
    width: 100%;

    input {
      border: none;
      max-width: 100%;
      transition: opacity 0.25s, outline 0.25s;
      outline: none !important;
      border: none;
      width: 100%;
      text-overflow: ellipsis;
      font-size: 14px;

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

      // WITH LABEL
      &.labelised {
        padding: 20px 0 0 0;
      }
    }
  }

  :slotted(span) {
    align-items: center;
  }

  // SLOT ACTIONS
  .left-action-container {
    display: flex;
    align-items: center;

    &:not(:empty) {
      padding-right: 16px;
    }
  }

  .right-action-container {
    display: flex;
    align-items: center;

    &:not(:empty) {
      padding-left: 16px;
    }
  }

  // PASSWORD
  .input-password-button {
    display: flex;
    align-items: center;
    background: transparent;
    cursor: pointer;
    padding: 0 0 0 16px;
  }

  .lock-input {
    display: flex;
    align-items: center;
    padding: 0 16px 0 0;
  }
}
</style>
