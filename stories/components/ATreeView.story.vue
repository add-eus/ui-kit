<script setup lang="ts">
import ATreeView from "../../components/ATreeView.vue";
import { ref } from "vue";
import "../../index.scss";

const customFolders = ref([
  {
    name: "Folder",
    childs: [
      {
        name: "Folder 1",
        childs: [
          {
            name: "Folder 1.1",
            childs: [
              {
                name: "Folder 1.1.1",
                childs: [
                  {
                    name: "Folder",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Folder 2",
        childs: [
          {
            name: "Folder 2.1",
            childs: [
              {
                name: "Folder 2.1.1",
                childs: [
                  {
                    name: "Folder",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
</script>

<template>
  <Story :layout="{ type: 'grid', width: 320 }">
    <Variant title="default">
      <ATreeView :folders="customFolders" caret />
    </Variant>
  </Story>
</template>

<docs lang="md">
# ATreeView

This is a tree view component.

## Props

- `folders` (array, required): Specifies the folders to display.
- `caret` (boolean, optional): Specifies whether to show the caret icon.
</docs>
