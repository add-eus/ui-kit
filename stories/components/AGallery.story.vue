<script setup lang="ts">
import AGallery from "../../components/AGallery.vue";
import AIcon from "../../components/AIcon.vue";
import { ref } from "vue";
import "../../index.scss";

const inputFileRef = ref<any>(null);

function handleMediaClick(index) {
  console.log(`Media at index ${index} clicked`);
}

function handleEmptyClick() {
  console.log("Placeholder clicked");
}
</script>

<template>
  <Story :layout="{ type: 'grid', width: 400 }">
    <Variant title="default">
      <AGallery
        class="gallery-container-story"
        :medias="[
          'https://indonesiaexpat.id/wp-content/uploads/2020/09/la-brisa.jpg',
          'https://fashionweekdaily.com/wp-content/uploads/2022/04/Copy-of-DX6A8927-scaled.jpg',
        ]"
        :container-width="300"
        :container-height="430"
        placeholder="This is the placeholder sentence"
        inspiration="https://thenational-the-national-prod.cdn.arcpublishing.com/resizer/v2/T5ZBPKDG7DCVPV2JI7HQU5UWAM.jpg?smart=true&auth=24ed8dc54447f1b8518c41077a2cfd708fe0c6609b3a2bc3651d44cf482474c3&width=800&height=1000"
        @click-media="handleMediaClick"
        @click-empty="handleEmptyClick"
      >
        <template #placeholder>
          <!-- <ImageFirestore
                  v-if="inspiration !== undefined"
                  :path="inspiration"
                  alt="Inspiration image" /> -->
          <!-- <img
            v-else
            src="https://thenational-the-national-prod.cdn.arcpublishing.com/resizer/v2/T5ZBPKDG7DCVPV2JI7HQU5UWAM.jpg?smart=true&auth=24ed8dc54447f1b8518c41077a2cfd708fe0c6609b3a2bc3651d44cf482474c3&width=800&height=1000"
            alt="Inspiration image"
          /> -->
        </template>
        <template #medias="{ imageSrc }">
          <!-- <ImageFirestore :path="imageSrc" alt="Post media" controls /> -->
        </template>
        <template #actions="{ index, setActiveMedia }">
          <div class="icons-container-story">
            <AButton>
              <AIcon icon="edit" color="var(--a-grey)" />
            </AButton>
            <AButton>
              <AIcon icon="add_to_photos" color="var(--a-grey)" />
            </AButton>
            <AButton>
              <AIcon icon="close" color="var(--a-danger)" />
            </AButton>
          </div>
        </template>
      </AGallery>
    </Variant>
  </Story>
</template>

<style lang="scss">
.gallery-container-story {
  .upload-container {
    padding-top: 0 !important;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }

  .icons-container-story {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>

<docs lang="md">
# AGallery

This is a gallery component that displays a series of media items and allows navigation through them.

## Props

- `containerWidth` (number, optional, default: 300): Specifies the width of the input container.
- `containerHeight` (number, optional, default: 300): Specifies the height of the input container.
- `medias` (Array<string>, optional, default: []): An array of media URLs to be displayed in the gallery.
- `placeholder` (string, optional, default: ""): Placeholder text to be displayed when there are no media items.

## Events

- `click-media` (index: number): Emitted when a media item is clicked, providing the index of the clicked media.
- `click-empty` Emitted when the placeholder area is clicked (i.e., when there are no media items).

## Methods

- `nextMedia()` Moves to the next media item in the gallery.
- `prevMedia()` Moves to the previous media item in the gallery.
- `setActiveMedia(index: number)` Sets the active media item to the specified index.

## Slots

- `medias` Scoped slot for customizing the display of each media item. Receives imageSrc as a prop.
- `placeholder` Slot for customizing the placeholder content when no media items are present.
- `actions` Scoped slot for adding custom actions, receiving index and setActiveMedia as props.
</docs>
