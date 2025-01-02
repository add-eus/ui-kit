<script setup lang="ts">
import { computed } from "vue";
import { useColor } from "../stores/color";
import type { Colors } from "../stores/color";

export interface ATabsItem {
  label: string;
  value: string;
  notif?: string;
  icon?: string;
}
export interface ATabsProps {
  tabs: ATabsItem[];
  selected?: string;
  slow?: boolean;
  modelValue?: string | number;
  color?: Colors;
}

export interface ATabsEmits {
  (e: "update:modelValue", value: string | number | undefined): void;
  (e: "tabSelected", value: string): void;
}

const emit = defineEmits<ATabsEmits>();

const props = withDefaults(defineProps<ATabsProps>(), {
  selected: undefined,
  modelValue: undefined,
  color: "tertiary",
});

const mainColor = computed(() => props.color);

const color = useColor(mainColor);
const colorLight = useColor(mainColor, "lightest");

const activeValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

function toggle(value: string) {
  emit("tabSelected", value);
  activeValue.value = value;
}
</script>

<template>
  <div class="a-tabs">
    <div class="a-tabs-container">
      <div
        v-for="(tab, key) in tabs"
        :key="key"
        class="a-tab"
        :class="[activeValue === tab.value && 'is-active']"
      >
        <slot
          name="tab-link"
          :active-value="activeValue"
          :tab="tab"
          :index="key"
          :toggle="toggle"
        >
          <a
            tabindex="0"
            role="button"
            @keydown.space.prevent="toggle(tab.value)"
            @click="toggle(tab.value)"
          >
            <VIcon v-if="tab.icon" :icon="tab.icon" />
            <span>
              <slot
                name="tab-link-label"
                :active-value="activeValue"
                :tab="tab"
                :index="key"
              >
                {{ tab.label }}
              </slot>
              <div class="tab-notif" v-if="tab.notif">
                {{ tab.notif }}
              </div>
            </span>
          </a>
        </slot>
      </div>
    </div>

    <div class="a-tab-content is-active">
      <Transition :name="props.slow ? 'fade-slow' : 'fade-fast'" mode="out-in">
        <slot name="tab" :active-value="activeValue"></slot>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.a-tabs-container {
  display: flex;
  flex-wrap: wrap;

  .a-tab {
    display: flex;
    outline-offset: 10px;
    border-bottom: 2px solid var(--a-grey-light);
    /* transition: background 0.25s ease-in-out; */

    &:nth-last-child(1) {
      a {
        padding-right: 0;
      }
    }

    a {
      position: relative;
      padding: 15px 20px 15px 0;
      color: var(--a-grey);
      font-size: 16px;
      font-weight: 500;
      transition: color 0.25s ease-in-out;

      //IF IMG OR SVG ADD
      span {
        display: flex;
        align-items: center;
        gap: 5px;

        :slotted(img),
        :slotted(svg) {
          width: 15px;

          path {
            fill: var(--a-grey);
            transition: fill 0.25s ease-in-out;
          }
        }
      }
    }

    &.is-active {
      &:nth-last-child(1) {
        a {
          padding-right: 0;

          &:after {
            animation: appearLast 0.25s ease-in-out forwards;
          }
        }
      }

      a {
        color: var(--a-black);

        &:after {
          content: "";
          position: absolute;
          width: 0%;
          height: 2px;
          background: v-bind(color);
          bottom: -2px;
          left: 0;
          animation: appear 0.25s ease-in-out forwards;
        }

        @keyframes appear {
          0% {
            width: 0%;
          }
          100% {
            width: calc(100% - 20px);
          }
        }

        @keyframes appearLast {
          0% {
            width: 0%;
          }
          100% {
            width: calc(100%);
          }
        }

        //IF IMG OR SVG ADD
        span {
          :slotted(img),
          :slotted(svg) {
            path {
              fill: v-bind(color);
            }
          }
        }
      }
    }

    &:hover {
      /* background: v-bind(colorLight); */

      a {
        color: v-bind(color);

        //IF IMG OR SVG ADD
        span {
          :slotted(img),
          :slotted(svg) {
            path {
              fill: v-bind(color);
            }
          }
        }
      }
    }

    &:focus {
      /* background: v-bind(colorLight); */

      a {
        -webkit-box-shadow: inset 0px 0px 0px 1px var(--a-info);
        -moz-box-shadow: inset 0px 0px 0px 1px var(--a-info);
        box-shadow: inset 0px 0px 0px 1px var(--a-info);
        border-radius: 5px;
        color: v-bind(color);
      }
    }
  }

  @media screen and (max-width: 767px) {
    .a-tab {
      a {
        padding: 2px 9px 2px 9px;
        font-size: 10px;

        span {
          height: 14px;
          gap: 5px;

          :slotted(img),
          :slotted(svg) {
            width: 9px;
          }
        }
      }
    }
  }

  .tab-notif {
    margin-top: 3px;
    height: 15px;
    width: 22px;
    background: var(--a-primary-lightest);
    color: var(--a-primary);
    font-size: 8px;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
