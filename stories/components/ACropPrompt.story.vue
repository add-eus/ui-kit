<script setup lang="ts">
import { ref } from 'vue';
import ACropPrompt from '../../components/Prompt/ACropPrompt.vue';
import { computed } from 'vue';

const image = ref("https://picsum.photos/400/300");

const blobImage = ref<null|Blob>(null);
(async () => {
  const response = await fetch(image.value);
  blobImage.value = await response.blob();
})();

const showModal = ref(true);

const onConfirm = (croppedImage: Blob) => {
  console.log("Image recadrée : ", croppedImage);
  showModal.value = false; 
};

const onCancel = () => {
  showModal.value = false; 
};

</script>

<template>
  <Story :layout="{ type: 'grid', width: 250 }">
    <Variant title="default">
      <button @click="showModal = true">Ouvrir le recadrage</button>

      <ACropPrompt 
        v-if="showModal"
        :title="'Recadrer l\'image'"
        :modelValue="blobImage" 
        :confirm="'Confirmer'" 
        :cancel="'Annuler'"
        :aspectRatio="1"
        :minWidth="100" 
        :minHeight="100" 
        :maxWidth="1000" 
        :maxHeight="1000" 
        :mimeType="'image/jpeg'"
        :quality="80"
        @confirm="onConfirm" 
        @cancel="onCancel"
      />
    </Variant>
  </Story>
</template>
<docs lang="md">
    # ACropPrompt
    
    This component allows users to select and crop an image with a configurable aspect ratio.
    
    ## Usage
    
    The `ACropPrompt` component provides the following options:
    
    - `title` (string, required): The title of the modal.
    - `modelValue` (Blob | File, required): The file or Blob to be cropped.
    - `confirm` (string, required): The text for the confirm button.
    - `cancel` (string, required): The text for the cancel button.
    - `aspectRatio` (number, optional): The aspect ratio to crop the image.
    - `minWidth`, `minHeight`, `maxWidth`, `maxHeight` (number, optional): Size limits for the crop.
    - `mimeType` (string, optional): The allowed MIME type for the image.
    - `quality` (number, optional): The quality of the cropped image.
    
    ## Slots
    
    - `content` (optional): Additional content to display inside the modal, such as radio buttons to select the aspect ratio.
    - `action` (optional): Buttons for canceling and confirming the action.
    </docs>