<script setup lang="ts">
import { defineProps, PropType, ref } from "vue";
import AIcon from "./AIcon.vue";
import FolderItem from "./AFolderItem.vue";
import AButton from "./AButton.vue";
import { useVModel } from "@vueuse/core";

interface Folder {
  name: string;
  childs: Folder[];
}

interface AFolderItemProps {
  folder: Folder;
  modelValue: string;
  isOpen: boolean;
  toggleFolder: (folderName: string) => void;
  caret?: boolean;
}

const props = withDefaults(defineProps<AFolderItemProps>(), {
  modelValue: "",
  caret: false,
});

const openChildFolders = ref<Record<string, boolean>>({});

const toggleChildFolder = (childName: string) => {
  openChildFolders.value[childName] = !openChildFolders.value[childName];
};

const isChildOpen = (childName: string) => {
  return openChildFolders.value[childName] || false;
};

const emits = defineEmits(["update:modelValue", "folderSelected"]);

const activeFolder = useVModel(props, "modelValue", emits, { passive: true });

const selectFolder = (folder: { name: string; childs: [] }, event: Event) => {
  event?.stopPropagation();
  activeFolder.value = folder;
  emits("folderSelected", folder);
};
</script>

<template>
  <div class="a-folder-item">
    <!-- PARENT FOLDER -->
    <div class="folder-header">
      <span
        v-if="folder.childs && folder.childs.length > 0"
        class="toggle-icon"
      >
        <AIcon
          :icon="isOpen ? 'keyboard_arrow_down' : 'keyboard_arrow_right'"
          color="grey-light"
          @click="toggleFolder(folder.name)"
        />
      </span>
      <div v-else class="spacing"></div>
      <span class="folder-icon"
        ><AIcon icon="folder" color="grey-light"
      /></span>
      <span class="folder-name" @click="selectFolder(folder, $event)">{{
        folder.name
      }}</span>
      <div class="line"></div>
      <AButton v-if="caret" size="small" class="select-btn">
        <AIcon icon="keyboard_arrow_right" color="grey-light" />
      </AButton>
    </div>

    <!-- CHILD FOLDERS -->
    <div
      v-if="isOpen && folder.childs && folder.childs.length > 0"
      class="child-folders"
    >
      <div v-for="(child, index) in folder.childs" :key="child.name + index">
        <div class="folder-header">
          <span
            v-if="child.childs && child.childs.length > 0"
            class="toggle-icon"
          >
            <AIcon
              :icon="
                isChildOpen(child.name)
                  ? 'keyboard_arrow_down'
                  : 'keyboard_arrow_right'
              "
              color="grey-light"
              @click="toggleChildFolder(child.name)"
            />
          </span>
          <div v-else class="spacing"></div>
          <span class="folder-icon"
            ><AIcon icon="folder" color="grey-light"
          /></span>
          <span class="folder-name" @click="selectFolder(child, $event)">{{
            child.name
          }}</span>
          <div class="line"></div>
          <AButton v-if="caret" size="small" class="select-btn">
            <AIcon icon="keyboard_arrow_right" color="grey-light" />
          </AButton>
        </div>

        <div
          v-if="
            isChildOpen(child.name) && child.childs && child.childs.length > 0
          "
          class="child-folders"
        >
          <FolderItem
            v-for="(subChild, subChildIndex) in child.childs"
            :key="subChild.name + subChildIndex"
            :folder="subChild"
            :isOpen="isChildOpen(subChild.name)"
            :toggleFolder="toggleChildFolder"
            :caret="caret"
            @folderSelected="selectFolder"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.a-folder-item {
  .folder-header {
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;

    .folder-icon {
      margin-right: 0.5em;
    }

    .folder-name {
      font-weight: normal;
      color: var(--a-black);
      width: 100%;
    }

    .line {
      position: absolute;
      width: 1px;
      height: 1000px;
      background-color: var(--a-grey-lighter);
      left: -12px;
      top: -5px;
    }

    .spacing {
      margin-left: 27px;
    }

    .select-btn {
      position: absolute;
      right: 0;
    }
  }

  .child-folders {
    margin-left: 1.5em;
  }

  .toggle-icon {
    margin-right: 0.5em;
  }
}
</style>
