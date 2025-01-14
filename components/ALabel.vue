<script setup lang="ts">
defineProps({
  variant: {
    type: String,
    default: "default",
  },
  outline: {
    type: Boolean,
    default: false,
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
  font-size: 12px;
  font-weight: 400;
  height: 20px;
  width: fit-content;
  display: flex;
  align-items: center;
  border-radius: 20px;
  color: var(--a-black);
  padding: 0;

  &.outline {
    padding: 0 7px;
    color: var(--a-black);
    background: var(--a-transparent);
    border: 1px solid var(--a-black);
  }

  &.grey {
    padding: 0 7px;
    color: var(--a-black);
    background: var(--a-grey-lightest);
    border: 1px solid var(--a-grey-lightest);

    &.outline {
      color: var(--a-black);
      background: var(--a-transparent);
      border: 1px solid var(--a-black);
    }
  }

  &.accent {
    padding: 0 7px;
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
    padding: 0 7px;
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
    padding: 0 7px;
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
    padding: 0 7px;
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
    padding: 0 7px;
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
    padding: 0 7px;
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
