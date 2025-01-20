<script setup lang="ts">
import ATooltip from "../../components/ATooltip.vue"; // Chemin vers le composant Tooltip
import "../../index.scss";
import { ref } from "vue";

const tooltipContent = ref("This is a tooltip");

const buttonTopRef = ref<HTMLElement | null>(null);
const buttonRightRef = ref<HTMLElement | null>(null);
const buttonBottomRef = ref<HTMLElement | null>(null);
const buttonLeftRef = ref<HTMLElement | null>(null);
</script>

<template>
  <Story :layout="{ type: 'grid', width: 400 }">
    <!-- Tooltip pour chaque position -->
    <Variant title="Tooltip Top">
      <div class="container">
        <ATooltip content="Ceci est un tooltip" position="top">
          <button>Tooltip Top</button>
        </ATooltip>
      </div>
    </Variant>

    <Variant title="Tooltip Right">
      <div class="container">
        <ATooltip content="Ceci est un tooltip" position="right">
          <button>Tooltip Right</button>
        </ATooltip>
      </div>
    </Variant>

    <Variant title="Tooltip Bottom">
      <div class="container">
        <ATooltip content="Ceci est un tooltip" position="bottom">
          <button>Tooltip Bottom</button>
        </ATooltip>
      </div>
    </Variant>

    <Variant title="Tooltip Left">
      <div class="container">
        <ATooltip content="Ceci est un tooltip" position="left">
          <button>Tooltip Left</button>
        </ATooltip>
      </div>
    </Variant>
  </Story>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;

  .content {
    position: relative;
  }
}
</style>

<docs lang="md">
# ATooltip

The `ATooltip` component allows you to display contextual information when the user hovers over an element.

## Props

- `content` (string, required): The text displayed inside the tooltip.
- `position` (string, optional, default: "top"): The position of the tooltip relative to the target element. Accepted values: `"top"`, `"right"`, `"bottom"`, `"left"`.
</docs>
