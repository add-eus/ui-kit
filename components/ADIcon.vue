<script setup lang="ts">
// import '../scss/_color.scss';

  import { defineProps } from 'vue';
  
  const props = defineProps({
    color: {
      type: String,
      default: undefined,
    },
    icon: {
      type: String,
      default: 'circle',
    },
    type: {
        type: String,
        default: 'rounded',
        validator: (value) => {
            return ['rounded', 'sharp', 'outlined'].includes(value);
        },
    },
  });
</script>

<template>
    <span :class="['ad-icon', 'material-symbols-'+type]" :style="{color:color}">{{ icon }}</span>
</template>


<style scoped lang="scss">
@import "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
@import "https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
@import "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";

.ad-icon {
    display: inline-flex;
    font-size: 20px;
    /* font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48; */
}
</style>