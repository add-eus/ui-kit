<script setup lang="ts">
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
    <i :class="['ad-icon', 'material-symbols-'+type]" :style="{color:color}">{{ icon }}</i>
</template>


<style scoped lang="scss">
@import "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined";
@import "https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp";
@import "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded";

.ad-icon {
    display: inline-flex;
    font-size: 20px;
}
</style>