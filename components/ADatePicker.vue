<script setup lang="ts">
import { defineProps, PropType, watch } from "vue";
import { ref } from "vue";
import moment from "moment";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

// Définition des props
const props = defineProps({
  type: {
    type: String as PropType<"default" | "range">,
    default: "default",
    validator: (value) => ["default", "range"].includes(value),
  },
  hasValidation: {
    type: Boolean,
    default: true,
  },
  hasTime: {
    type: Boolean,
    default: true,
  },
  dateFormat: {
    type: String,
    default: "DD/MM/YYYY - HH:mm",
  },
  modelValue: {
    type: [Array, String, Object] as PropType<
      Array<string> | string | undefined
    >,
    default: undefined,
  },
});

const emit = defineEmits(["update:modelValue"]);
const date = ref(props.modelValue || null);

const format = (dateValue: Date | [Date, Date] | null) => {
  if (!dateValue) return "";

  if (Array.isArray(dateValue)) {
    const [startDate, endDate] = dateValue;
    return `${moment(startDate).format(props.dateFormat)} - ${moment(
      endDate
    ).format(props.dateFormat)}`;
  }

  return moment(dateValue).format(props.dateFormat);
};

const setDate = (value: Date | [Date, Date] | null) => {
  date.value = value;
  emit("update:modelValue", value);
};

watch(
  () => props.modelValue,
  (newValue) => {
    date.value = newValue;
  }
);
</script>

<template>
  <div class="a-date-picker">
    <VueDatePicker
      v-model="date"
      @update:model-value="setDate"
      :auto-apply="!hasValidation"
      :format="format"
      :placeholder="$t('date')"
      :cancelText="$t('cancel')"
      :selectText="$t('validate')"
      :day-names="[
        $t('days.monday'),
        $t('days.tuesday'),
        $t('days.wednesday'),
        $t('days.thursday'),
        $t('days.friday'),
        $t('days.saturday'),
        $t('days.sunday'),
      ]"
      time-picker-inline
      :enable-time-picker="hasTime"
      :range="type === 'range'"
      :class="{ 'type-range': type === 'range', multi: type === 'range' }"
      :multi-calendars="type === 'range'"
      :action-row="{
        showSelect: hasValidation,
        showCancel: hasValidation,
      }"
    />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Jacquarda+Bastarda+9&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
</style>

<style lang="scss">
.a-date-picker {
  .dp__main {
    .dp__input_wrap {
      .dp__input {
        font-size: 12px;

        &::placeholder {
          color: var(--a-black);
        }
      }

      .dp__input_icons {
        color: var(--a-black);
      }
    }
  }

  /* TOP ACTIONS */
  .dp__month_year_wrap {
    /* ARROW */
    .dp--arrow-btn-nav {
      .dp__inner_nav {
        border: 1px solid var(--a-grey-light);
        border-radius: 4px;

        svg {
          stroke: transparent;
          stroke-width: 1;
          fill: black;
          height: 16px;
        }
      }
    }

    /* MONTH | YEAR */
    .dp__month_year_wrap {
      justify-content: center;
      padding: 0 20px;

      .dp__month_year_select {
        border: 1px solid var(--a-grey-light);
        font-size: 14px;
        height: 33px;
        margin: 10px 2px;
        text-align: left;
        width: 75px;
      }
    }
  }

  /* DAYS TOP*/
  .dp__calendar_header_item {
    font-size: 14px;
    font-weight: 400;
  }

  /* SEPARATOR */
  .dp__calendar_header_separator {
    display: none;
  }

  /* DAYS */
  .dp__calendar_item {
    font-size: 16px;
    font-weight: 400;
  }

  /* DAYS OTHER MONTH */
  .dp__cell_offset {
    font-size: 14px;
    font-weight: 400;
    color: var(--a-grey-light);
  }

  /* CLOCK */
  .dp--tp-wrap {
    max-width: 100%;
    padding: 5px 0 10px 0;

    .dp__time_picker_inline_container {
      .dp__flex {
        /* CLOCK CIRCLE ICON */
        &::before {
          content: "";
          height: 20px;
          width: 20px;
          position: absolute;
          border-radius: 20px;
          bottom: calc(32px - 10px);
          left: calc(50% - 52px - 10px);
          border: 2px solid var(--a-black);
        }

        .dp__time_input {
          /* CLOCK NEEDLE ICON */
          &::before {
            content: "";
            height: 8px;
            width: 2px;
            position: absolute;
            bottom: calc(32px - 1px);
            left: calc(50% - 52px - 1px);
            background: var(--a-black);
          }

          &::after {
            content: "";
            height: 6px;
            width: 2px;
            position: absolute;
            transform: rotate(-45deg);
            bottom: calc(32px - 6px);
            left: calc(50% - 52px + 1px);
            background: var(--a-black);
          }

          .dp__time_col {
            height: 45px;
            font-size: 14px;
            padding: 0 2px;

            /* ARROWS APPEAR */
            &:nth-child(1),
            &:nth-child(3) {
              &:hover {
                .dp__tp_inline_btn_top,
                .dp__tp_inline_btn_bottom {
                  opacity: 1;
                }
              }
            }

            /* ARROWS */
            .dp__tp_inline_btn_top,
            .dp__tp_inline_btn_bottom {
              display: flex;
              justify-content: center;
              height: 20px;
              padding: 5px;
              opacity: 0;

              span {
                height: 1px;
                width: 8px;
                background: var(--a-black);
              }

              &:hover {
                span {
                  background: var(--a-tertiary);
                }
              }

              /* ARROWS TOP */
              &.dp__tp_inline_btn_top {
                .dp__tp_btn_in_l {
                  transform: rotate(-25deg) translateX(1px);
                }

                .dp__tp_btn_in_r {
                  transform: rotate(25deg) translateX(-1px);
                }
              }

              /* ARROWS BOTTOM */
              &.dp__tp_inline_btn_bottom {
                .dp__tp_btn_in_l {
                  transform: rotate(25deg) translateX(1px);
                }

                .dp__tp_btn_in_r {
                  transform: rotate(-25deg) translateX(-1px);
                }
              }
            }

            /* TIME NUMBERS */
            .dp__time_display {
              border: 1px solid var(--a-grey-light);
              width: 30px;
            }
          }
        }
      }
    }
  }

  /* ACTION BUTTONS */
  .dp__action_row {
    display: flex;
    justify-content: center;

    .dp__selection_preview {
      display: none;
    }

    .dp__action_buttons {
      width: 100%;
      justify-content: space-between;
      flex: inherit;
      margin-inline-start: inherit;

      .dp__action_button {
        width: 48%;
        display: flex;
        justify-content: center;
        text-align: center;
        height: 38px;

        &.dp__action_cancel {
          background: var(--a-transparent);
        }

        &.dp__action_select {
          background: var(--a-primary);
        }
      }
    }
  }

  /* TYPE RANGE */
  .type-range {
    /* CLOCK TYPE RANGE */
    .dp--tp-wrap {
      .dp__time_picker_inline_container {
        .dp__flex {
          &::before {
            left: calc(50% - 92px - 10px);
          }

          .dp__time_input {
            &::before {
              left: calc(50% - 92px - 1px);
            }

            &::after {
              left: calc(50% - 92px + 1px);
            }
          }
        }
      }
    }
  }

  /* MULTI */
  .multi {
    /* CLOCK MULTI */
    .dp--tp-wrap {
      .dp__time_picker_inline_container {
        justify-content: space-between;
        .dp__flex {
          width: 100%;

          .dp__time_input {
            padding: 0 10px;
            &:nth-child(1) {
              justify-content: flex-start;
            }

            &:nth-child(2) {
              justify-content: flex-end;
            }
          }

          &::before {
            display: none;
          }

          .dp__time_input {
            &::before {
              display: none;
            }

            &::after {
              display: none;
            }
          }
        }
      }
    }

    /* ACTION MULTI */
    .dp__action_row {
      .dp__action_buttons {
        justify-content: flex-end;
        gap: 5px;

        .dp__action_button {
          width: 23%;
          text-align: center;
          height: 38px;
        }
      }
    }

    /* SEPARATE MULTI */
    .dp__instance_calendar {
      &:nth-child(2) {
        margin-left: 10px;
        border-left: 1px solid var(--a-grey-lighter);
      }
    }
  }

  .dp__theme_light {
    --dp-background-color: #fff;
    --dp-text-color: #212121;
    --dp-hover-color: #f3f3f3;
    --dp-hover-text-color: #212121;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: var(--a-tertiary);
    --dp-primary-disabled-color: var(--a-tertiary-light);
    --dp-primary-text-color: #f8f5f5;
    --dp-secondary-color: #c0c4cc;
    --dp-border-color: var(--a-black);
    --dp-menu-border-color: #ddd;
    --dp-border-color-hover: #aaaeb7;
    --dp-border-color-focus: #aaaeb7;
    --dp-disabled-color: #f6f6f6;
    --dp-scroll-bar-background: #f3f3f3;
    --dp-scroll-bar-color: #959595;
    --dp-success-color: var(--a-success);
    --dp-success-color-disabled: #a3d9b1;
    --dp-icon-color: #959595;
    --dp-danger-color: var(--a-danger);
    --dp-marker-color: var(--a-danger);
    --dp-tooltip-color: #fafafa;
    --dp-disabled-color-text: #8e8e8e;
    --dp-highlight-color: rgb(25 118 210 / 10%);
    --dp-range-between-dates-background-color: var(--a-tertiary-lightest);
    --dp-range-between-dates-text-color: var(--a-tertiary);
    --dp-range-between-border-color: var(--a-tertiary-lightest);
  }
}

:root {
  /*General*/
  --dp-font-family: "Poppins", system-ui; /*Font family*/ //
  --dp-border-radius: 4px; /*Configurable border-radius*/
  --dp-cell-border-radius: 4px; /*Specific border radius for the calendar cell*/
  --dp-common-transition: all 0.1s ease-in; /*Generic transition applied on buttons and calendar cells*/

  /*Sizing*/
  --dp-button-height: 35px; /*Size for buttons in overlays*/
  --dp-month-year-row-height: 35px; /*Height of the month-year select row*/
  --dp-month-year-row-button-size: 35px; /*Specific height for the next/previous buttons*/
  --dp-button-icon-height: 20px; /*Icon sizing in buttons*/
  --dp-cell-size: 35px; /*Width and height of calendar cell*/
  --dp-cell-padding: 5px; /*Padding in the cell*/
  --dp-common-padding: 10px; /*Common padding used*/
  --dp-input-icon-padding: 35px; /*Padding on the left side of the input if icon is present*/
  --dp-input-padding: 6px 30px 6px 12px; /*Padding in the input*/
  --dp-menu-min-width: 260px; /*Adjust the min width of the menu*/
  --dp-action-buttons-padding: 2px 5px; /*Adjust padding for the action buttons in action row*/
  --dp-row-margin: 5px 0; /*Adjust the spacing between rows in the calendar*/
  --dp-calendar-header-cell-padding: 0.5rem; /*Adjust padding in calendar header cells*/
  --dp-two-calendars-spacing: 10px; /*Space between multiple calendars*/
  --dp-overlay-col-padding: 3px; /*Padding in the overlay column*/
  --dp-time-inc-dec-button-size: 32px; /*Sizing for arrow buttons in the time picker*/
  --dp-menu-padding: 6px 8px; /*Menu padding*/

  /*Font sizes*/
  --dp-font-size: 1rem; /*Default font-size*/
  --dp-preview-font-size: 0.8rem; /*Font size of the date preview in the action row*/
  --dp-time-font-size: 0.8rem; /*Font size in the time picker*/

  /*Transitions*/
  --dp-animation-duration: 0.1s; /*Transition duration*/
  --dp-menu-appear-transition-timing: cubic-bezier(
    0.4,
    0,
    1,
    1
  ); /*Timing on menu appear animation*/
  --dp-transition-timing: ease-out; /*Timing on slide animations*/
}
</style>
