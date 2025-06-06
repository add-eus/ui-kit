<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import AButton from "./AButton.vue";
import ACard from "./ACard.vue";
import { useColor } from "../stores/color";
import { defineProps, computed, withDefaults } from "vue";
import { useElementBounding, onClickOutside } from "@vueuse/core";

interface DropdownProps {
  position: string;
  color: string;
  above: boolean;
  preventCloseOutside: boolean;
}

const props = withDefaults(defineProps<DropdownProps>(), {
  position: "auto",
  color: "primary",
  above: false,
  preventCloseOutside: false,
});

const isOpen = defineModel("isOpen");

const baseElement = ref<HTMLElement | null>(null);
const buttonElement = ref<HTMLElement | null>(null);
const dropdownStyles = ref({
  top: "0px",
  left: "0px",
  width: "0px",
  transform: "",
});

const boundingElement = useElementBounding(baseElement);

const updateDropdownPosition = async () => {
  await nextTick();

  const windowWidth = window.innerWidth;
  const dropdownLeft = boundingElement.left.value + window.scrollX;

  dropdownStyles.value = {
    top: `${boundingElement.bottom.value + window.scrollY}px`,
    left: `${dropdownLeft}px`,
    width: `${boundingElement.width.value}px`,
    transform: "",
  };

  const buttonWidth = buttonElement.value
    ? buttonElement.value.getBoundingClientRect().width
    : 0;

  // IF DROPDOWN IS NEXT TO THE SCREEN EDGE
  if (props.position === "auto" && dropdownLeft > windowWidth / 1.25) {
    dropdownStyles.value.transform = props.above
      ? `translate(calc(-100% + ${buttonWidth}px), calc(-100% - 50px))`
      : `translate(calc(-100% + ${buttonWidth}px))`;
  }

  if (props.position === "right") {
    dropdownStyles.value.transform = props.above
      ? `translate(calc(-100% + ${buttonWidth}px), calc(-100% - 50px))`
      : `translate(calc(-100% + ${buttonWidth}px))`;
  }
};

onMounted(() => {
  updateDropdownPosition();
  window.addEventListener("scroll", updateDropdownPosition);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateDropdownPosition);
});

onClickOutside(baseElement, () => {
  if (isOpen.value === false) return;
  if (!props.preventCloseOutside) isOpen.value = false;
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

const mainColor = computed(() => props.color);
const color = useColor(mainColor);
const colorLightest = useColor(mainColor, "lightest");
</script>

<template>
  <div class="a-dropdown" ref="baseElement">
    <div ref="buttonElement">
      <slot
        name="action"
        :toggle="toggleDropdown"
        :open="openDropdown"
        :close="closeDropdown"
        :isOpen="isOpen"
      >
        <AButton @click="toggleDropdown()"></AButton>
      </slot>
    </div>

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
    min-width: max-content;

    &:hover {
      background: v-bind(colorLightest) !important;
      .dropdown-content {
        .dropdown-main {
          color: v-bind(color);
        }
      }
    }
  }
}

.a-card {
  &.a-dropdown-content {
    position: absolute !important;
    max-height: none !important;
    min-width: 120px;
    width: fit-content !important;
    z-index: 200;

    > .a-card-body > .inner-content {
      padding: 0;
    }

    .a-card-body {
      margin: 15px !important;

      .inner-content .flex-column {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
    }

    @media screen and (max-width: 767px) {
      max-width: 80vw;
    }
  }
}
</style>
