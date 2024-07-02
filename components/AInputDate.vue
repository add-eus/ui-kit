<script setup lang="ts">
import { syncRef } from "@vueuse/core";
import moment from "moment";
import { DatePicker } from "v-calendar";
import "v-calendar/style.css";
import { computed, defineProps, markRaw, ref } from "vue";
import type { Colors } from "../stores/color";
import { useColor } from "../stores/color";
import AInput from "./AInput.vue";

export interface MomentRange {
  start: moment.Moment | null | undefined;
  end: moment.Moment | null | undefined;
}

export interface DateRange {
  start: Date | null | undefined;
  end: Date | null | undefined;
}

export interface AInputDateProps {
  modelValue: moment.Moment | null | undefined | MomentRange;
  format?: string;
  color?: Colors;
  borderColor?: string;
  labelA?: string;
  labelB?: string;
  min?: moment.Moment;
  max?: moment.Moment;
}

const props = withDefaults(defineProps<AInputDateProps>(), {
  format: "DD-MM-YYYY",
  color: "tertiary",
  borderColor: "grey-light",
  labelA: "Begin",
  labelB: "End",
});

const mainColor = computed(() => props.color);
const color = useColor(mainColor);
const colorInvert = useColor(mainColor, "default", true);
const colorLighter = useColor(mainColor, "lighter");

const date = defineModel<moment.Moment | MomentRange | null | undefined>();

const transformedDate = ref<null | undefined | Date | DateRange>(null);
const inputRef = ref<InstanceType<typeof AInput> | null>(null);

function isDateRange(value: any): boolean {
  return typeof value === "object" && value !== null && !moment.isDate(value);
}

function isMomentRange(value: any): boolean {
  return typeof value === "object" && value !== null && !moment.isMoment(value);
}

function parseMoment(
  momentValue: moment.Moment | MomentRange | undefined | null
): Date | DateRange | null | undefined {
  if (momentValue === undefined || momentValue === null) return momentValue;

  if (isMomentRange(momentValue)) {
    return {
      start: moment.isMoment(momentValue.start)
        ? momentValue.start.toDate()
        : momentValue.start,
      end: moment.isMoment(momentValue.end)
        ? momentValue.end.toDate()
        : momentValue.end,
    } as DateRange;
  }
  return momentValue.toDate();
}

function formatMoment(
  dateValue: Date | DateRange | undefined | null
): moment.Moment | MomentRange | null | undefined {
  if (dateValue === undefined || dateValue === null) return dateValue;
  else if (isDateRange(dateValue)) {
    const start = markRaw(moment(dateValue.start));
    const end = markRaw(moment(dateValue.end));
    if (start.isSame(date.value.start) && end.isSame(date.value.end))
      return date.value;
    return { start, end };
  }

  const m = moment(dateValue);

  if (m.isSame(date.value)) return date.value;

  return markRaw(m);
}

syncRef(date, transformedDate, {
  immediate: true,
  flush: "sync",
  transform: {
    ltr(left) {
      return parseMoment(left);
    },
    rtl(right: Date | null | undefined | DateRange) {
      return formatMoment(right);
    },
  },
});

const displayed = computed(() => {
  if (isMomentRange(date.value)) {
    return [
      moment.isMoment(date.value.start)
        ? date.value.start.format(props.format)
        : "-",
      moment.isMoment(date.value.end)
        ? date.value.end.format(props.format)
        : "-",
    ];
  } else if (moment.isMoment(date.value)) {
    return date.value.format(props.format);
  }
  return "-";
});

const open = () => {
  inputRef.value?.focus();
};

defineExpose({ open });
</script>

<template>
  <div class="input-date-container">
    <DatePicker
      v-model="transformedDate"
      v-if="!isDateRange(transformedDate)"
      :min-date="props.min?.toDate()"
      :max-date="props.max?.toDate()"
       :columns="2"
    >
      <template #default="{ togglePopover }">
        <AInput
          ref="inputRef"
          :modelValue="displayed"
          @focus="togglePopover"
          :color="borderColor"
        />
      </template>
    </DatePicker>
    <DatePicker
      v-model.range="transformedDate"
      v-else
      :min-date="props.min?.toDate()"
      :max-date="props.max?.toDate()"
       :columns="2"
    >
      <template #default="{ togglePopover }">
        <div class="input-range-container">
          <div class="input-range-content">
            <label class="label">{{ labelA }}</label>
            <AInput
              ref="inputRef"
              :modelValue="`${displayed[0]} - ${displayed[1]}`"
              @focus="togglePopover"
              :color="borderColor"
              class="input-range begin"
            />
          </div>
        </div>
      </template>
    </DatePicker>
  </div>
</template>

<style lang="scss">
.input-date-container {
  .input-range-container {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    .input-range-content {
      position: relative;
      width: calc(50% - 15px);

      &::after {
        content: "";
        position: absolute;
        top: 20px;
        right: 20px;
        height: 0;
        width: 0;
        border-top: 6px solid var(--a-grey);
        border-right: 3px solid transparent;
        border-left: 3px solid transparent;
      }

      .input-range {
        padding-top: 11px;
        padding-bottom: 3px;
        font-size: 10px;
        width: 100%;
        cursor: pointer;
      }

      .label {
        position: absolute;
        pointer-events: none;
        top: 5px;
        left: 18px;
        font-size: 13px;
        color: var(--a-grey);
      }
    }
  }

  .vc-popover-content-wrapper {
    .vc-popover-content {
      border: 1px solid var(--a-grey-light);

      .vc-container {
        .vc-pane-container {
          .vc-pane-header-wrapper {
            //HEADER ARROW
            .vc-header {
              width: 75%;
              .vc-arrow {
                background: transparent;
                svg {
                  height: 15px;
                  width: 15px;
                  stroke-width: 3px;
                  color: var(--a-black);
                }
              }
            }
          }

          //HEADER TITLE
          .vc-pane-layout {
            .vc-pane {
              .vc-header {
                width: 75%;
                .vc-title-wrapper {
                  .vc-title {
                    background: transparent;
                    font-weight: 700;
                  }
                }
              }

              //BODY
              .vc-weeks {
                //DAYS LETTERS
                .vc-weekdays {
                  .vc-weekday {
                    color: var(--a-black);

                    //DAYS LETTERS WEEK-END
                    &.vc-weekday-7,
                    &.vc-weekday-1 {
                      color: v-bind(colorLighter);
                    }
                  }
                }

                //DAYS NUMBERS
                .vc-week {
                  .vc-day {
                    //DAYS NUMBERS WEEK-END
                    &.weekday-7,
                    &.weekday-1 {
                      color: v-bind(colorLighter);
                    }

                    //SELECTED DATE BACKGROUND
                    .vc-highlights {
                      .vc-day-layer {
                        .vc-highlight {
                          background-color: v-bind(color) !important;
                        }

                        .vc-highlight-bg-outline {
                          border: 2px solid transparent;
                        }
                      }
                    }

                    //SELECTED DATE NUMBER
                    .vc-day-content {
                      &.vc-focusable {
                        box-shadow: none;
                      }

                      &.vc-highlight-content-light {
                        color: v-bind(colorInvert);
                      }

                      &.vc-highlight-content-outline {
                        color: v-bind(colorInvert);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
