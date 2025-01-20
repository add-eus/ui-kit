<script setup lang="ts">
import ATooltip from "../../components/ATooltip.vue";
import AButton from "../../components/AButton.vue";
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
    <Variant title="Tooltip Top">
      <div class="container">
        <ATooltip content="Ceci est un tooltip" position="top">
          <AButton size="small" color="primary">Tooltip Top</AButton>
        </ATooltip>
      </div>
    </Variant>

    <Variant title="Tooltip Right">
      <div class="container">
        <ATooltip content="Ceci est un tooltip" position="right">
          <AButton size="small" color="primary">Tooltip Right</AButton>
        </ATooltip>
      </div>
    </Variant>

    <Variant title="Tooltip Bottom">
      <div class="container">
        <ATooltip content="Ceci est un tooltip" position="bottom">
          <AButton size="small" color="primary">Tooltip Bottom</AButton>
        </ATooltip>
      </div>
    </Variant>

    <Variant title="Tooltip Left">
      <div class="container">
        <ATooltip content="Ceci est un tooltip" position="left">
          <AButton size="small" color="primary">Tooltip Left</AButton>
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
