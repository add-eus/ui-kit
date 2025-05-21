<script setup lang="ts">
import {
  defineEmits,
  watch,
  shallowRef,
  computed,
  toRaw,
  ref,
} from "vue";
import moment from "moment";
import { useI18n } from "vue-i18n";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useTranslate } from "@addeus/vue3-stores/stores/translate";

const { locale } = useI18n();

export interface MomentRange {
  start: moment.Moment | null | undefined;
  end: moment.Moment | null | undefined;
}

export interface DateRange {
  start: Date | null | undefined;
  end: Date | null | undefined;
}

export type DateValue =
  | Date
  | [Date, Date]
  | [null, Date]
  | [undefined, Date]
  | [Date, null]
  | [Date, undefined]
  | null
  | undefined;

export interface ADatePickerProps {
  modelValue: moment.Moment | MomentRange | null;
  type: "default" | "range";
  hasValidation: boolean;
  hasTime: boolean;
  teleport: boolean;
  dateFormat: string;
  placeholder: string;
  minDate: string | null;
  maxDate: string | null;
}

const props = withDefaults(defineProps<ADatePickerProps>(), {
  modelValue: null,
  type: "default",
  hasValidation: false,
  hasTime: false,
  teleport: true,
  dateFormat: "DD/MM/YYYY - HH:mm",
  placeholder: "Date",
  minDate: null,
  maxDate: null,
});

const emits = defineEmits(["update:modelValue"]);

function isMomentRange(value: unknown): value is MomentRange {
  const rawValue = value && typeof value === "object" ? toRaw(value) : null;

  return (
    rawValue !== null &&
    rawValue !== undefined &&
    "start" in rawValue &&
    "end" in rawValue &&
    (rawValue.start === null ||
      rawValue.start === undefined ||
      moment.isMoment(toRaw(rawValue.start))) &&
    (rawValue.end === null ||
      rawValue.end === undefined ||
      moment.isMoment(toRaw(rawValue.end)))
  );
}

function parseMoment(
  momentValue: moment.Moment | MomentRange | null
): DateValue {
  if (momentValue === null) return null;

  if (isMomentRange(momentValue)) {
    if (momentValue.start?.isValid() && momentValue.end?.isValid()) {
      return [momentValue.start.toDate(), momentValue.end.toDate()];
    } else if (
      momentValue.start?.isValid() &&
      (momentValue.end === null || momentValue.end === undefined)
    ) {
      return [momentValue.start.toDate(), momentValue.end];
    } else if (
      momentValue.end?.isValid() &&
      (momentValue.start === null || momentValue.start === undefined)
    ) {
      return [momentValue.start, momentValue.end.toDate()];
    } else {
      return null;
    }
  }

  if (momentValue.isValid && momentValue.isValid()) {
    return momentValue.toDate();
  }

  console.warn("parseMoment received invalid momentValue:", momentValue);
  return null;
}

function formatMoment(
  dateValue: DateValue
): moment.Moment | MomentRange | null {
  if (dateValue === null) return null;

  if (Array.isArray(dateValue)) {
    const [startDate, endDate] = dateValue;
    if (startDate && endDate) {
      return {
        start: moment(startDate),
        end: moment(endDate),
      };
    } else if (startDate) {
      return {
        start: moment(startDate),
        end: endDate,
      };
    } else if (endDate) {
      return {
        start: startDate,
        end: moment(endDate),
      };
    } else {
      return null;
    }
  }

  if (dateValue instanceof Date && !isNaN(dateValue.getTime())) {
    return moment(dateValue);
  }

  console.warn("formatMoment received invalid dateValue:", dateValue);
  return null;
}

function isEqualMoment(
  a: moment.Moment | null | undefined,
  b: moment.Moment | null | undefined
): boolean {
  a = a ? toRaw(a) : null;
  b = b ? toRaw(b) : null;

  if ((a === null || a === undefined) && (b === null || b === undefined))
    return true;
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  if (!moment.isMoment(a) || !moment.isMoment(b)) {
    console.warn("isEqualMoment received non-moment values:", a, b);
    return false;
  }
  if (!a.isValid() && !b.isValid()) return true;
  if (!a.isValid() || !b.isValid()) return false;
  return a.isSame(b);
}

function isEqualModelValue(
  a: moment.Moment | MomentRange | null | undefined,
  b: moment.Moment | MomentRange | null | undefined
): boolean {
  a = a ? toRaw(a) : null;
  b = b ? toRaw(b) : null;

  if ((a === null || a === undefined) && (b === null || b === undefined))
    return true;
  if (a === null || a === undefined || b === null || b === undefined)
    return false;

  if (moment.isMoment(a) && moment.isMoment(b)) {
    return isEqualMoment(a, b);
  }

  if (isMomentRange(a) && isMomentRange(b)) {
    return isEqualMoment(a.start, a.start) && isEqualMoment(a.end, b.end);
  }

  console.warn("isEqualModelValue received mismatched types:", a, b);
  return false;
}

function isEqualDate(a: DateValue, b: DateValue): boolean {
  if ((a === null || a === undefined) && (b === null || b === undefined))
    return true;
  if (a === null || a === undefined || b === null || b === undefined)
    return false;

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return (
      a.length === b.length &&
      a.every((dateA, index) => {
        const dateB = b[index];

        if (
          (dateA === null || dateA === undefined) &&
          (dateB === null || dateB === undefined)
        )
          return true;
        if (
          dateA === null ||
          dateA === undefined ||
          dateB === null ||
          dateB === undefined
        )
          return false;

        return dateA.getTime() === dateB.getTime();
      })
    );
  }

  return false;
}

const date = shallowRef<DateValue>(parseMoment(props.modelValue));

watch(
  () => props.modelValue,
  (newVal) => {
    const newDateValue = parseMoment(newVal);
    if (!isEqualDate(newDateValue, date.value)) {
      date.value = newDateValue;
    }
  }
);

watch(date, (newVal) => {
  const newModelValue = formatMoment(newVal);
  if (!isEqualModelValue(newModelValue, props.modelValue)) {
    emits("update:modelValue", newModelValue);
  }
});

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

const cancelTranslate = useTranslate("datepicker.cancel");
const validateTranslate = useTranslate("datepicker.validate");
const mondayTranslate = useTranslate("datepicker.days.monday");
const tuesdayTranslate = useTranslate("datepicker.days.tuesday");
const wednesdayTranslate = useTranslate("datepicker.days.wednesday");
const thursdayTranslate = useTranslate("datepicker.days.thursday");
const fridayTranslate = useTranslate("datepicker.days.friday");
const saturdayTranslate = useTranslate("datepicker.days.saturday");
const sundayTranslate = useTranslate("datepicker.days.sunday");

const dayNames = computed(() => {
  return [
    mondayTranslate.value || "",
    tuesdayTranslate.value || "",
    wednesdayTranslate.value || "",
    thursdayTranslate.value || "",
    fridayTranslate.value || "",
    saturdayTranslate.value || "",
    sundayTranslate.value || "",
  ];
});

const isOpen = ref(false);

const onOpen = () => {
  isOpen.value = true;

  //MODIFY CLOCK POSITION ON TYPE RANGE
  setTimeout(() => {
    if (props.type === "range") {
      const element = document.querySelector(".dp__instance_calendar");
      element?.classList.add("type-range");
    }
  }, 100);
};

const close = () => {
  isOpen.value = false;
};

const isInputFilledToChangeBorderColor = computed(() => {
  const curr = date.value;
  if (!curr) return false;
  if (Array.isArray(curr)) {
    return curr.some((d) => !!d);
  }
  return true;
});
</script>

<template>
  <div
    class="a-date-picker"
    :class="[
      { 'is-not-empty': isInputFilledToChangeBorderColor },
      { 'is-calendar-open': isOpen },
    ]"
  >
    <VueDatePicker
      v-model="date"
      :auto-apply="!hasValidation"
      :format="format"
      :placeholder="placeholder"
      :cancelText="cancelTranslate"
      :selectText="validateTranslate"
      :teleport="teleport"
      :min-date="minDate"
      :max-date="maxDate"
      :day-names="dayNames"
      time-picker-inline
      @open="onOpen"
      @closed="close"
      :locale="locale"
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
<style lang="scss">
.a-date-picker {
  &.is-not-empty {
    .dp__input_wrap .dp__input {
      border-color: var(--a-grey-dark);
    }
  }

  &.is-calendar-open {
    .dp__input_wrap .dp__input {
      border-color: #0969da !important;
    }
  }
}

.dp__main {
  .dp__input_wrap {
    .dp__input {
      height: 58px;
      font-size: 14px;

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
  /* DAYS TOP*/
  .dp__calendar_header_item {
    font-size: 12px;
  }

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
  --dp-border-color: var(--a-grey-lighter);
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #aaaeb7;
  --dp-border-color-focus: #0969da;
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
