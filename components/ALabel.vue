<script setup lang="ts"></script>

<template>
  <label v-bind="$attrs">
    <slot></slot>
  </label>
</template>

<style scoped lang="scss">
label {
  color: var(--a-grey-darker);
}
</style>
