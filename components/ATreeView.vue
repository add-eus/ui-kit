<script setup lang="ts">
import { ref, defineProps, PropType } from "vue";
import FolderItem from "./AFolderItem.vue";

interface Folder {
  name: string;
  childs: Folder[];
}

const props = defineProps({
  folders: {
    type: Array as PropType<Folder[]>,
    required: true,
  },
  caret: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const emits = defineEmits(["folderSelected"]);

const openFolders = ref<Record<string, boolean>>({});

const toggleFolder = (folderName: string) => {
  openFolders.value[folderName] = !openFolders.value[folderName];
};

const isOpen = (folderName: string) => {
  return openFolders.value[folderName] || false;
};
</script>

<template>
  <div class="a-tree-view">
    <FolderItem
      class="parent-folder"
      v-for="(folder, index) in folders"
      :key="folder.name + index"
      :folder="folder"
      :isOpen="isOpen(folder.name)"
      :toggleFolder="toggleFolder"
      :caret="caret"
      @folderSelected="($event) => $emit('folderSelected', $event)"
    />
  </div>
</template>

<style lang="scss" scoped>
.a-tree-view {
  background: transparent;

  .parent-folder {
    overflow: hidden;
  }
}
</style>
