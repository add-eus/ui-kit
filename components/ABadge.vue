<script setup lang="ts">
import { ref, computed } from 'vue'
import { Colors, useColor } from '../stores/color';


export interface ABadgeProps {
  color: Colors
}

const props = defineProps<ABadgeProps>();
const color = useColor(computed(() => props.color));
</script>

<template>
    <span class="a-badge">
  </span>
</template>

<style lang="scss" scoped>
.a-badge {
    background-color: v-bind(color);
    min-height: 14px;
    min-width: 14px;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    display: inline-block;
}
</style>