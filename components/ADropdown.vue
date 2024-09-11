<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import AButton from "./AButton.vue";
import ACard from "./ACard.vue";
import { useElementBounding, onClickOutside } from "@vueuse/core";

const isOpen = defineModel("isOpen");

const baseElement = ref(null);
const dropdownStyles = ref({
  top: "0px",
  left: "0px",
  width: "0px",
});

const boundingElement = useElementBounding(baseElement);

const updateDropdownPosition = () => {
  dropdownStyles.value = {
    top: `${boundingElement.bottom.value + window.scrollY}px`,
    left: `${boundingElement.left.value + window.scrollX}px`,
    width: `${boundingElement.width.value}px`,
  };
};

onMounted(() => {
  updateDropdownPosition();
  window.addEventListener("scroll", updateDropdownPosition);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateDropdownPosition);
});

onClickOutside(baseElement, () => {
  isOpen.value = false;
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) updateDropdownPosition();
};

const openDropdown = () => {
  isOpen.value = true;
  updateDropdownPosition();
};

const closeDropdown = () => {
  isOpen.value = false;
};
</script>

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
      <ACard v-if="isOpen" class="a-dropdown-content" :style="dropdownStyles">
        <template #content>
          <div class="flex-column">
            <slot name="content"></slot>
          </div>
        </template>
      </ACard>
    </Teleport>
  </div>
</template>

<style lang="scss">
.a-dropdown {
  position: relative;
  display: inline-block;
}

.a-dropdown-content {
  .a-button {
    display: flex;
    justify-content: flex-start;
    padding: 7px 8px;
  }
}

.a-card {
  &.a-dropdown-content {
    position: absolute !important;
    max-height: none !important;
    min-width: 120px;
    width: fit-content !important;
    z-index: 100;

    > .a-card-body > .inner-content {
      padding: 0;
    }

    .a-card-body {
      margin: 0 5px !important;
    }
  }
}
</style>
