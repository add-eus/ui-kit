<script setup lang="ts">
import { defineProps, computed, PropType } from 'vue';
import { useColor } from "../stores/color";
import type { Colors } from "../stores/color";

const props = defineProps({
  color: {
    type: Object as PropType<Colors>,
    default: 'grey',
    validator: (value) => {
      return ['grey', 'primary', 'danger', 'success'].includes(value);
    },
  },
});

const mainColor = computed(() => props.color);

const color = useColor(mainColor);
const colorInvert = useColor(mainColor, 'default', true);

const colorLight = useColor(mainColor, 'light');
const colorLightInvert = useColor(mainColor, 'light', true);


const colorDarker = useColor(mainColor, 'darker');
const colorDarkerInvert = useColor(mainColor, 'darker', true);

</script>

<template>
    <button :class="['ad-button', color]">
      <slot></slot>
    </button>
</template>
  
<style lang="scss" scoped>

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
  
  background-color: v-bind(colorLight);
  color: v-bind(colorInvert);

  i {
    color: v-bind(colorInvert);
    transition: color 0.15s ease-in-out;
  }

  &:hover {
    background-color: v-bind(color);
    color: v-bind(colorInvert);
    i {
      color: v-bind(color);
    }
  }
  
  &:active {
    background-color: v-bind(colorDarker);
    color: v-bind(colorDarkerInvert);
    i {
      color: v-bind(colorDarkerInvert);
    }
  }
}
</style>
