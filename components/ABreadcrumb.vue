<script setup lang="ts">
import { defineProps, PropType, computed } from "vue";
import { Colors, useColor } from "../stores/color";
import { useVModel } from "@vueuse/core";

const props = defineProps({
  step: {
    type: Array,
    default: () => ["1992", "1993", "1994", "1995"],
  },
  point: {
    type: Array,
    default: () => [""],
  },
  modelValue: {
    type: Number,
    default: 2,
  },
  color: {
    type: String as PropType<Colors>,
    default: "primary",
  },
});

interface ABreadcrumbEmits {
  (e: "update:modelValue", index: number): void;
}

const emits = defineEmits<ABreadcrumbEmits>();

const activeStep = useVModel(props, "modelValue", emits);

const clickStep = (index) => {
  activeStep.value = index;
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
          'previous-step': index <= activeStep,
        }"
      >
        <div class="breadcrumb-elements" :class="{ last: index == stepLength }">
          <div v-if="index != stepLength" class="breadcrumb-line"></div>
          <div class="breadcrumb-circle"></div>
        </div>
        <div class="breadcrumb-text">{{ step[index - 1] }}</div>
        <div v-if="index != stepLength" class="breadcrumb-point">
          {{ point[index - 1] }}
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
      left: 45px;
      font-size: 12px;

      &::after {
        content: "";
        height: 4px;
        width: 4px;
        background: var(--a-grey-light);
        border-radius: 50%;
        position: absolute;
        top: 7px;
        left: -8px;
        transition: background 0.25s ease-in-out;
      }

      &:empty {
        &::after {
          display: none;
        }
      }
    }
  }
}
</style>
