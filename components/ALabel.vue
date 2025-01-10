<script setup lang="ts">
defineProps({
  variant: {
    type: String,
    default: "default",
  },
  outline: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="a-label" :class="[variant, { outline }]">
    <label v-bind="$attrs">
      <slot></slot>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.a-label {
  font-size: 10px;
  font-weight: 400;
  padding: 0 7px;
  height: 20px;
  width: fit-content;
  display: flex;
  align-items: center;
  border-radius: 20px;
  color: var(--a-black);
  background: var(--a-grey-lightest);
  border: 1px solid var(--a-grey-lightest);

  &.outline {
    color: var(--a-black);
    background: var(--a-transparent);
    border: 1px solid var(--a-black);
  }

  &.accent {
    color: var(--a-primary);
    background: var(--a-primary-lightest);
    border: 1px solid var(--a-primary-lightest);

    &.outline {
      color: var(--a-primary);
      background: var(--a-transparent);
      border: 1px solid var(--a-primary);
    }
  }

  &.success {
    color: var(--a-success-dark);
    background: var(--a-success-lightest);
    border: 1px solid var(--a-success-lightest);

    &.outline {
      color: var(--a-success-dark);
      background: var(--a-transparent);
      border: 1px solid var(--a-success-dark);
    }
  }

  &.attention {
    color: var(--a-warning-dark);
    background: var(--a-warning-lightest);
    border: 1px solid var(--a-warning-lightest);

    &.outline {
      color: var(--a-warning-dark);
      background: var(--a-transparent);
      border: 1px solid var(--a-warning-dark);
    }
  }

  &.danger {
    color: var(--a-danger-dark);
    background: var(--a-danger-lightest);
    border: 1px solid var(--a-danger-lightest);

    &.outline {
      color: var(--a-danger-dark);
      background: var(--a-transparent);
      border: 1px solid var(--a-danger-dark);
    }
  }

  &.done {
    color: var(--a-info-dark);
    background: var(--a-info-lightest);
    border: 1px solid var(--a-info-lightest);

    &.outline {
      color: var(--a-info-dark);
      background: var(--a-transparent);
      border: 1px solid var(--a-info-dark);
    }
  }

  &.other {
    color: var(--a-tertiary-dark);
    background: var(--a-tertiary-lightest);
    border: 1px solid var(--a-tertiary-lightest);

    &.outline {
      color: var(--a-tertiary-dark);
      background: var(--a-transparent);
      border: 1px solid var(--a-tertiary-dark);
    }
  }
}
</style>
