<script setup lang="ts">
import { defineProps, PropType, computed } from "vue";
import { Colors, useColor } from "../stores/color";
import { useVModel } from "@vueuse/core";

interface ABreadcrumbProps {
  step: string[];
  point: string[];
  modelValue: number;
  color: Colors;
  lastEnabledStep?: number;
  disabledSteps?: string[];
}

const props = withDefaults(defineProps<ABreadcrumbProps>(), {
  step: ["1992", "1993", "1994", "1995"],
  point: [""],
  modelValue: 2,
  color: "primary",
  lastEnabledStep: undefined,
  disabledSteps: [],
});

interface ABreadcrumbEmits {
  (e: "update:modelValue", index: number): void;
}

const emits = defineEmits<ABreadcrumbEmits>();

const activeStep = useVModel(props, "modelValue", emits);
const lastEnableStep = computed(
  () => props.lastEnabledStep ?? activeStep.value
);

const clickStep = (index) => {
  if (!props.disabledSteps.includes(index) && lastEnableStep.value >= index) {
    activeStep.value = index;
  }
};

const color = useColor(
  computed(() => {
    return props.color;
  })
);

const stepLength = props.step.length;
</script>

<template>
  <div class="a-breadcrumb" :style="{ '--color': color }">
    <div v-for="index in stepLength" :key="index" @click="clickStep(index - 1)">
      <div
        class="breadcrumb-row"
        :class="{
          'active-step': index - 1 == activeStep,
          'previous-step': index <= lastEnableStep,
          'disabled-step': props.disabledSteps.includes(index - 1),
        }"
      >
        <div
          class="breadcrumb-elements"
          :class="{
            last: index === stepLength,
          }"
          :style="{
            height:
              Array.isArray(point[index - 1]) && point[index - 1].length > 2
                ? 70 + (point[index - 1].length - 2) * 25 + 'px'
                : '70px',
          }"
        >
          <div v-if="index != stepLength" class="breadcrumb-line"></div>
          <div class="breadcrumb-circle"></div>
        </div>
        <div class="breadcrumb-text">
          {{ step[index - 1] }}

          <div class="point-container">
            <div
              v-if="index != stepLength"
              :class="
                Array.isArray(point[index - 1])
                  ? 'breadcrumb-point breadcrumb-point-' + subIndex
                  : 'breadcrumb-point'
              "
              v-for="(subPoint, subIndex) in Array.isArray(point[index - 1])
                ? point[index - 1]
                : [point[index - 1]]"
              :key="subIndex"
            >
              {{
                Array.isArray(point[index - 1]) ? subPoint : point[index - 1]
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.a-breadcrumb {
  display: flex;
  flex-direction: column;

  .breadcrumb-row {
    display: flex;
    position: relative;
    color: var(--a-grey-light);
    transition: color 0.25s ease-in-out;

    &.previous-step {
      color: var(--a-secondary-darker);

      .breadcrumb-elements {
        .breadcrumb-circle,
        .breadcrumb-line {
          background: var(--a-secondary-darker);
        }
      }

      .breadcrumb-point {
        &::after {
          background: var(--a-secondary-darker);
        }
      }
    }

    &.active-step {
      color: var(--color);

      .breadcrumb-elements {
        .breadcrumb-circle {
          background: var(--color);
        }
      }
      .breadcrumb-point {
        &::after {
          background: var(--color);
        }
      }
    }

    &.disabled-step {
      pointer-events: none;
      opacity: 0.5;

      .breadcrumb-elements {
        .breadcrumb-circle,
        .breadcrumb-line {
          background: var(--a-grey-light);
        }
      }

      .breadcrumb-point {
        &::after {
          background: var(--a-grey-light);
        }
      }
    }

    .breadcrumb-elements {
      width: 30px;
      height: 70px;
      position: relative;
      margin-top: 7px;

      &.last {
        height: 20px;
      }

      .breadcrumb-circle {
        width: 10px;
        height: 10px;
        background: var(--a-grey-light);
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
        transition: background 0.25s ease-in-out;
      }

      .breadcrumb-line {
        width: 1px;
        height: 60%;
        background: var(--a-grey-light);
        position: absolute;
        top: calc(50% + 10px);
        left: 50%;
        transform: translate(-50%, -50%);
        transition: background 0.25s ease-in-out;
      }
    }

    .breadcrumb-text {
      cursor: pointer;
      font-size: 16px;
    }

    .breadcrumb-point {
      cursor: pointer;
      position: absolute;
      top: 40px;
      left: 35px;
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 85%;
      padding-left: 13px;

      &::after {
        content: "";
        height: 4px;
        width: 4px;
        color: var(--a-grey-light);
        background: var(--a-grey-light);
        border-radius: 50%;
        position: absolute;
        top: 7px;
        left: 0;
        transition: background 0.25s ease-in-out;
      }

      &:empty {
        &::after {
          display: none;
        }
      }

      @for $i from 0 through 5 {
        &.breadcrumb-point-#{$i} {
          top: #{32px + ($i * 24px)};
        }
      }
    }
  }
}
</style>
