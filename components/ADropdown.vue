<template>
  <div class="a-dropdown" ref="baseElement">
    <slot
      name="action"
      :toggle="toggleDropdown"
      :open="openDropdown"
      :close="closeDropdown"
    >
      <AButton @click="toggleDropdown()"></AButton>
    </slot>

    <Teleport to="body">
      <ACard v-if="isOpen" class="a-dropdown-content" :style="styleDropdown">
        <template #content>
          <div class="flex-column">
            <slot name="content"></slot>
          </div>
        </template>
      </ACard>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import AButton from "./AButton.vue";
import ACard from "./ACard.vue";
import { useElementBounding, onClickOutside } from "@vueuse/core";

const isOpen = defineModel("isOpen");

const baseElement = ref(null);
const boundingElement = useElementBounding(baseElement);

const styleDropdown = computed(() => {
  return {
    top: `${boundingElement.bottom.value}px`,
    left: `${boundingElement.left.value}px`,
    width: `${boundingElement.width.value}px`,
  };
});

onClickOutside(baseElement, () => {
  isOpen.value = false;
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const openDropdown = () => {
  isOpen.value = true;
};

const closeDropdown = () => {
  isOpen.value = false;
};
</script>

<style lang="scss">
.a-dropdown {
  position: relative;
  display: inline-block;
}

.a-card {
  &.a-dropdown-content {
    position: absolute !important;
    max-height: none !important;
    min-width: 120px;

    > .a-card-body > .inner-content {
      padding: 0;
    }
  }
}
</style>
