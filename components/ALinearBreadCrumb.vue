<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  pathSegments: {
    type: Array as () => string[],
    required: true,
  },
  root: {
    type: String,
    default: "Home",
  },
  path: {
    type: String,
    required: true,
  },
  separator: {
    type: String,
    default: ">",
  },
});

const emit = defineEmits(["updatePath"]);

const goToFolderLevel = (level: number) => {
  const newPath = props.pathSegments.slice(0, level + 1).join("/");
  emit("updatePath", level);
};

const isBreadcrumbEmpty = computed(() => props.pathSegments?.length === 0);
</script>

<template>
  <div class="breadcrumb-container">
    <button
      :class="{ 'empty-breadcrumb': isBreadcrumbEmpty }"
      @click="goToFolderLevel(-1)"
    >
      {{ root }}
    </button>

    <span
      v-for="(segment, index) in pathSegments"
      :key="index"
      class="breadcrumb-content"
    >
      <p class="separator">{{ separator }}</p>
      <button class="breadcrumb" @click="goToFolderLevel(index)">
        {{ segment }}
      </button>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb-container {
  display: flex;

  button {
    font-size: 12px;
    height: 20px;
    color: var(--a-secondary);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    &.empty-breadcrumb {
      color: var(--a-black);
    }
  }

  .breadcrumb-content {
    display: flex;
    color: var(--a-secondary);

    button {
      cursor: pointer;
      font-size: 12px;
      color: var(--a-secondary);
    }

    &:nth-last-child(1) {
      color: var(--a-black);

      button {
        color: var(--a-black);
      }
    }

    .separator {
      margin: 1px 3px 0 3px;
    }
  }
}
</style>
