<script setup lang="ts">
import { PropType, computed } from "vue";
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
  color: {
    type: String as PropType<Colors>,
    default: "primary",
  },
  textColor: {
    type: String as PropType<Colors>,
    default: "grey-darker",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  hideRadio: {
    type: Boolean,
    default: false,
  },
});

const modelValue = defineModel();

const mainColor = computed(() => props.color);
const textColor = computed(() => props.textColor);

const color = useColor(mainColor);
const colorInvert = useColor(mainColor, "default", true);
const colorText = useColor(textColor);

const onChange = (event: Event) => {
  modelValue.value = (event.target as HTMLInputElement).value;
};
</script>

<template>
  <div class="a-input-radio">
    <label
      :class="{
        selected: modelValue === value,
        'hide-radio': hideRadio,
        'radio-content': !hideRadio,
        'input-disabled': props.disabled,
      }"
    >
      <input
        type="radio"
        :name="name"
        :value="value"
        :checked="modelValue === value"
        @change="onChange"
      />
      <span class="label-text"><slot></slot></span>
      <template v-if="!hideRadio">
        <span class="checkmark-lab"></span>
        <p class="caption-text">
          <slot name="caption"></slot>
        </p>
      </template>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.a-input-radio {
  min-width: fit-content;
  min-height: 20px;
  width: 25px;

  label {
    display: flex;
    justify-content: center;
    padding: 4px 10px;
    color: v-bind(colorText);
    border-radius: 5px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.3s, border-color 0.3s;

    @media screen and (max-width: 767px) {
      border-radius: 3px;
    }

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

  //CUSTOM RADIO
  .radio-content {
    display: flex;
    position: relative;
    cursor: pointer;
    user-select: none;
    justify-content: flex-start;
    padding: 2px 0 0 25px;

    &:hover input ~ .checkmark-lab {
      background-color: var(--a-grey-light);
    }

    //Hide native radio
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;

      &:checked ~ .checkmark-lab {
        background-color: v-bind(color);

        &:after {
          display: block;
        }
      }
    }

    &.selected {
      .checkmark-lab {
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
      height: 21px;
      width: 21px;
      border-radius: 50%;
      border: 1px solid var(--a-grey-light);
      background-color: var(--a-white);
      transition: background-color 0.3s, border-color 0.3s;

      &:after {
        content: "";
        position: absolute;
        display: none;
        left: 5px;
        top: 5px;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background-color: var(--a-white);
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

//DISABLED
.a-input-radio {
  //ALL
  .input-disabled {
    color: var(--a-grey);
    pointer-events: none;

    //CUSTOM RADIO
    .checkmark-lab {
      background-color: var(--a-grey-lighter);
      border: 1px solid var(--a-grey-lighter);
    }

    &.selected {
      .checkmark-lab {
        background-color: var(--a-grey-lighter);
      }
    }

    //HIDDEN RADIO
    &.hide-radio {
      color: var(--a-grey-lighter);
      border: 2px solid var(--a-grey-lighter);

      &.selected {
        background-color: var(--a-grey-lighter);
        color: v-bind(colorInvert);
        border-color: var(--a-grey-lighter);
      }
    }
  }
}
</style>
