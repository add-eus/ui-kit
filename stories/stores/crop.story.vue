<script setup lang="ts">
import { ref } from "vue";
import AButton from "../../components/AButton.vue";
import "../../index.scss";
import { useCrop } from "../../stores/crop";
import { computedAsync } from "@vueuse/core/index.cjs";
import { computed } from "vue";

const crop = useCrop();
const image = ref("https://picsum.photos/400/300");

const blobImage = computedAsync(async () => {
    const response = await fetch(image.value);
    return response.blob();
}, null);

const blobUrl = computed((oldValue) => {
    if (typeof oldValue === "string")
        URL.revokeObjectURL(oldValue);
    if (blobImage.value !== null)
        return URL.createObjectURL(blobImage.value);
});

async function startCroping() {
    if (blobImage.value === null)
        throw new Error("No image to crop");
    const result = await crop(blobImage.value, {
        title: "Crop",
        confirm: "Crop",
        cancel: "Cancel",
    });
    try {
        URL.revokeObjectURL(image.value);
    } catch {}
    image.value = URL.createObjectURL(result);
}
</script>

<template>
  <Story :layout="{ type: 'grid', width: 200 }">
    <Variant title="crop">
      <AButton
        @click="
          startCroping()
        "
        >Crop</AButton
      >
      <br>
      <p>Result:</p>
      <img :src="blobUrl" style="width: 100%"/>
    </Variant>
  </Story>
</template>

<docs lang="md">
# crop

The `crop` store provides a function to crop an image.

## Usage

The `crop` store provides the following options:
- `blob` (Blob): The image to crop.
- `options.title` (string, optional) The title of the crop dialog.
- `options.confirm` (string, optional) The text for the confirm button in the crop dialog.
- `options.cancel` (string, optional) The text for the cancel button in the crop dialog.
- `options.aspectRatio` (number, optional): The aspect ratio of the crop box. By default, the crop box is free ratio.
- `options.minWidth` (number, optional): The minimum width of the crop box. By default, the crop box has no minimum width.
- `options.minHeight` (number, optional): The minimum height of the crop box. By default, the crop box has no minimum height.
- `options.maxWidth` (number, optional): The maximum width of the crop box. By default, the crop box has no maximum width.
- `options.maxHeight` (number, optional): The maximum height of the crop box. By default, the crop box has no maximum height.
- `options.mimeType` (string, optional): The mime type of the cropped image. By default, the mime type is `image/png`.
- `options.quality` (number, optional): The quality of the cropped image. By default, the quality is `1`.

</docs>
