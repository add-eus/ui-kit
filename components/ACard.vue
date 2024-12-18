<script setup lang="ts">
import { ref } from "vue";

export type ACardTitle = "center" | "right";
export type ACardAction = "center" | "right";

export interface ACardProps {
  titleAlignement?: ACardTitle;
  actionAlignement?: ACardAction;
  hasHeader?: boolean;
  hasFooter?: boolean;
}

const props = withDefaults(defineProps<ACardProps>(), {
  titleAlignement: undefined,
  actionAlignement: undefined,
  hasHeader: true,
  hasFooter: true,
});
</script>

<template>
  <div class="a-card">
    <header
      class="a-card-head"
      v-if="props.hasHeader"
      :class="[
        props.titleAlignement === 'center' && 'is-centered',
        props.titleAlignement === 'right' && 'is-end',
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
      v-if="props.hasFooter"
      :class="[
        props.actionAlignement === 'center' && 'is-centered',
        props.actionAlignement === 'right' && 'is-end',
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
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
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
