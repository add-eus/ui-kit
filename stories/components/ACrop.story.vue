<script setup lang="ts">
import ACrop from "../../components/ACrop.vue";
import { ref, computed } from "vue";
import "../../index.scss";


const image = ref("https://picsum.photos/400/300");

const blobImage = ref<null|Blob>(null);
(async () => {
  const response = await fetch(image.value);
  blobImage.value = await response.blob();
})();

const blobUrl = computed((oldValue) => {
  if (oldValue)
    URL.revokeObjectURL(oldValue);
  if (blobImage.value !== null)
    return URL.createObjectURL(blobImage.value)
})
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <ACrop v-model="blobImage"></ACrop>
      <br>
      <p>Result:</p>
      <img :src="blobUrl" style="width: 100%"/>
    </Variant>
  </Story>
</template>

<docs lang="md">
# ACrop

The `ACrop` component allows you to crop an image.

## Usage

The `ACrop` component provides the following options:

- `modelValue` (Blob): The image to crop
- `aspectRatio` (number, optional): The aspect ratio of the crop box. By default, the crop box is free ratio.
- `minWidth` (number, optional): The minimum width of the crop box. By default, the crop box has no minimum width.
- `minHeight` (number, optional): The minimum height of the crop box. By default, the crop box has no minimum height.
- `maxWidth` (number, optional): The maximum width of the crop box. By default, the crop box has no maximum width.
- `maxHeight` (number, optional): The maximum height of the crop box. By default, the crop box has no maximum height.
- `mimeType` (string, optional): The mime type of the cropped image. By default, the mime type is `image/png`.
- `quality` (number, optional): The quality of the cropped image. By default, the quality is `1`.
</docs>
