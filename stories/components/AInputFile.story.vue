<script setup lang="ts">
import AInputFile from "../../components/AInputFile.vue";
import AButton from "../../components/AButton.vue";
import { ref } from "vue";
import "../../index.scss";

const inputFileRef = ref<any>(null);
</script>

<template>
  <Story :layout="{ type: 'grid', width: 400 }">
    <Variant title="default">
      <AInputFile
        ref="inputFileRef"
        :container-width="350"
        :container-height="300"
        multiple
        inspiration="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwSUsk_uu2KuNZRT5PintWjwyul4AujUgWNxZlExHB5Q&s"
        v-slot="{ openFileSelector }"
      >
        <AButton @click="openFileSelector()">Open File Selector</AButton>
      </AInputFile>
    </Variant>
  </Story>
</template>

<docs lang="md">
# AInputFile

This is an input file component.

## Props

- `containerWidth` (number, optional, default: 300): Specifies the width of the input container.
- `containerHeight` (number, optional, default: 300): Specifies the height of the input container.
- `inspiration` (string, optional, default: ""): Specifies the URL of an inspiration image.

## Events

- `handleImageChange(event: Event)`: Emitted when the user uploads an image. Need to be used with the input file ref `const inputFileRef = ref<any>(null);`.
- `selectedFilesCount(count: number)`: Emitted when the user selects files. Can be used like `@update:selectedFilesCount="updateSelectedFilesCount"`.

## Slots

- `default`: Slot for the input file element.
</docs>
