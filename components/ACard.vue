<script setup lang="ts">
import { ref } from "vue";

export type ACardTitle = "center" | "right";
export type ACardAction = "center" | "right";

export interface ACardProps {
  titleAlignement?: ACardTitle;
  actionAlignement?: ACardAction;
}

withDefaults(defineProps<ACardProps>(), {
  titleAlignement: undefined,
  actionAlignement: undefined,
});
</script>

<template>
  <div class="a-card">
    <header
      class="a-card-head"
      :class="[
        titleAlignement === 'center' && 'is-centered',
        titleAlignement === 'right' && 'is-end',
      ]"
    >
      <slot name="header"></slot>
    </header>
    <div class="a-card-body">
      <div class="inner-content">
        <Suspense>
          <template #default>
            <slot name="content"></slot>
          </template>
          <template #fallback>
            <VPlaceload height="100px" width="100%" class="mx-2" />
          </template>
        </Suspense>
      </div>
    </div>
    <div
      class="a-card-foot"
      :class="[
        actionAlignement === 'center' && 'is-centered',
        actionAlignement === 'right' && 'is-end',
      ]"
    >
      <slot name="action"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../scss/color";

.a-card {
  position: relative;
  background-color: $a-white;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem 0 rgba(10, 10, 10, 0.2);
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow: visible;
  width: 100%;

  .a-card-body {
    margin: 0;

    &:not(:empty) {
      margin: 1em 0;
    }
  }

  .a-card-foot {
    display: flex;
    margin: 0;
    gap: 1em;

    &:not(:empty) {
      margin: 1em 0 0 0;
    }
  }
}
</style>
