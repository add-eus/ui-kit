<script setup lang="ts">
import { ref } from "vue";
import AButton from "./AButton.vue";

const props = defineProps({
  position: {
    type: String,
    default: "auto",
    validator: (value: string) => {
      return ["left", "right", "auto"].includes(value);
    },
  },
});
</script>

<template>
  <AButton v-bind="$attrs" role="menuitem" class="a-dropdown-item" full>
    <div class="dropdown-content">
      <div class="dropdown-main">
        <slot></slot>
      </div>
      <div class="dropdown-subtitle">
        <slot name="subtitle"></slot>
      </div>
    </div>
  </AButton>
</template>

<style lang="scss" scoped>
.a-dropdown-item {
  padding: 5px;
  height: inherit !important;

  .dropdown-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 15px;
    box-shadow: none;
    background: transparent;

    .dropdown-main {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      height: 25px;
      color: var(--a-grey-dark);

      :slotted(span) {
        margin-right: 8px;
      }
    }

    .dropdown-subtitle {
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 120%;
      height: 25px;
      margin-top: 10px;

      &:empty {
        display: none;
      }
    }
  }
  @media screen and (max-width: 767px) {
    .dropdown-content {
      padding: 0;

      .dropdown-main {
        font-size: 11.2px;
      }

      .dropdown-subtitle {
        font-size: 9.6px;
      }
    }
  }
}
</style>
