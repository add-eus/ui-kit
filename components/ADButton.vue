<script setup lang="ts">
import { defineProps, computed } from 'vue';
// import { useColor } from "../stores/color.ts";

const props = defineProps({
  color: {
    type: String,
    default: undefined,
    validator: (value) => {
      return ['primary', 'danger', 'success'].includes(value);
    },
  },
});

// const colorClass = computed(() => {
//   return props.color ? useColor(props.color) : '';
// });
</script>

<template>
    <button :class="['ad-button', color]">
      <slot></slot>
    </button>
</template>
  
<style scoped lang="scss">
.ad-button {
  border: none;
  border-radius: 50px;
  padding: 3px 8px;
  height: 35px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
  
  //DEFAULT
  background-color: var(--ad-grey-light);
  color: var(--ad-black);
  /* color: v-bind(color); */

  i {
    color: var(--ad-grey-light);
    transition: color 0.15s ease-in-out;
  }

  &:hover {
    background-color: var(--ad-grey);
    color: var(--ad-black);
    i {
      color: var(--ad-black);
    }
  }
  
  &:active {
    background-color: var(--ad-black);
    color: var(--ad-white);
    i {
      color: var(--ad-white);
    }
  }

  @each $color in primary, danger, success {
    &.#{$color} {
      background-color: var(--ad-#{$color});
      color: var(--ad-white);

      i {
        color: var(--ad-white);
      }

      &:hover {
        background-color: var(--ad-#{$color}-light);
        color: var(--ad-white);
        i {
          color: var(--ad-white);
        }
      }

      &:active {
        background-color: var(--ad-white);
        color: var(--ad-#{$color});
        i {
          color: var(--ad-#{$color});
        }
      }
    }
  }  
}
</style>
