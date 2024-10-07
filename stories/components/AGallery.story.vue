<script setup lang="ts">
import AGallery from "../../components/AGallery.vue";
import AIcon from "../../components/AIcon.vue";
import { ref } from "vue";
import { logEvent } from "histoire/client";
import "../../index.scss";

const inputFileRef = ref<any>(null);
</script>

<template>
  <Story :layout="{ type: 'grid', width: 400 }">
    <!-- Base Inspiration -->
    <Variant title="Base Inspiration">
      <AGallery
        class="gallery-container-story"
        :medias="[]"
        :inspirations="[]"
        :container-width="300"
        :container-height="430"
        tootlip="This is the tootlip sentence"
        @click-media="(index) => logEvent('Media at index', { index })"
        @click-empty="logEvent('Placeholder clicked', $event)"
      >
        <template #placeholder="{ imageSrc }">
          <!-- <ImageFirestore
                v-if="inspiration?.length !== 0"
                :path="imageSrc"
                alt="Inspiration image" />
            <img v-else :src="postImage" alt="Inspiration image" /> -->
          <img
            src="https://thenational-the-national-prod.cdn.arcpublishing.com/resizer/v2/T5ZBPKDG7DCVPV2JI7HQU5UWAM.jpg?smart=true&auth=24ed8dc54447f1b8518c41077a2cfd708fe0c6609b3a2bc3651d44cf482474c3&width=800&height=1000"
          />
        </template>
        <template #medias="{ imageSrc }">
          <!-- <ImageFirestore :path="imageSrc" alt="Post media" controls /> -->
        </template>
        <template #actions="{ index, setActiveMedia }"> </template>
      </AGallery>
    </Variant>

    <!-- Medias Inspiration Multiples -->
    <Variant title="Medias Inspiration Multiples">
      <AGallery
        class="gallery-container-story"
        :medias="[]"
        :inspirations="[
          'https://fashionweekdaily.com/wp-content/uploads/2022/04/Copy-of-DX6A8927-scaled.jpg',
          'https://indonesiaexpat.id/wp-content/uploads/2020/09/la-brisa.jpg',
          'https://fashionweekdaily.com/wp-content/uploads/2022/04/Copy-of-DX6A8927-scaled.jpg',
          'https://indonesiaexpat.id/wp-content/uploads/2020/09/la-brisa.jpg',
          'https://fashionweekdaily.com/wp-content/uploads/2022/04/Copy-of-DX6A8927-scaled.jpg',
          'https://indonesiaexpat.id/wp-content/uploads/2020/09/la-brisa.jpg',
        ]"
        :container-width="300"
        :container-height="430"
        tootlip="This is the tootlip sentence"
        @click-media="(index) => logEvent('Media at index', { index })"
        @click-empty="logEvent('Placeholder clicked', $event)"
      >
        <template #placeholder="{ imageSrc }"> </template>
        <template #medias="{ imageSrc }"> </template>
        <template #actions="{ index, setActiveMedia }"> </template>
      </AGallery>
    </Variant>

    <!-- Video Inspiration Multiples -->
    <Variant title="Video Inspiration Multiples">
      <AGallery
        class="gallery-container-story"
        :medias="[]"
        :inspirations="[
          '/components/assets/portrait-video.mp4',
          '/components/assets/paysage-video.mp4',
        ]"
        :container-width="300"
        :container-height="430"
        tootlip="This is the tootlip sentence"
        @click-media="(index) => logEvent('Media at index', { index })"
        @click-empty="logEvent('Placeholder clicked', $event)"
      >
        <template #placeholder="{ imageSrc }">
          <video class="output" :src="imageSrc"></video>
        </template>
        <template #medias="{ imageSrc }"> </template>
        <template #actions="{ index, setActiveMedia }"> </template>
      </AGallery>
    </Variant>

    <!-- Medias Multiples & Actions -->
    <Variant title="Medias Multiples & Actions">
      <AGallery
        class="gallery-container-story"
        :medias="[
          'https://indonesiaexpat.id/wp-content/uploads/2020/09/la-brisa.jpg',
          'https://fashionweekdaily.com/wp-content/uploads/2022/04/Copy-of-DX6A8927-scaled.jpg',
          'https://indonesiaexpat.id/wp-content/uploads/2020/09/la-brisa.jpg',
          'https://fashionweekdaily.com/wp-content/uploads/2022/04/Copy-of-DX6A8927-scaled.jpg',
          'https://indonesiaexpat.id/wp-content/uploads/2020/09/la-brisa.jpg',
          'https://fashionweekdaily.com/wp-content/uploads/2022/04/Copy-of-DX6A8927-scaled.jpg',
          'https://indonesiaexpat.id/wp-content/uploads/2020/09/la-brisa.jpg',
          'https://fashionweekdaily.com/wp-content/uploads/2022/04/Copy-of-DX6A8927-scaled.jpg',
          'https://indonesiaexpat.id/wp-content/uploads/2020/09/la-brisa.jpg',
          'https://fashionweekdaily.com/wp-content/uploads/2022/04/Copy-of-DX6A8927-scaled.jpg',
        ]"
        :container-width="300"
        :container-height="430"
        tootlip="This is the placeholder sentence"
        @click-media="(index) => logEvent('Media at index', { index })"
        @click-empty="logEvent('Placeholder clicked', $event)"
      >
        <template #placeholder> </template>
        <template #medias="{ imageSrc }"> </template>
        <template #actions="{ index, setActiveMedia }">
          <div class="icons-container-story">
            <AButton>
              <AIcon icon="edit" color="grey" />
            </AButton>
            <AButton>
              <AIcon icon="add_to_photos" color="grey" />
            </AButton>
            <AButton>
              <AIcon icon="close" color="danger" />
            </AButton>
          </div>
        </template>
      </AGallery>
    </Variant>

    <!-- Videos Multiples & Actions -->
    <Variant title="Videos Multiples & Actions">
      <AGallery
        class="gallery-container-story"
        :medias="[
          '/components/assets/paysage-video.mp4',
          '/components/assets/portrait-video.mp4',
        ]"
        :container-width="300"
        :container-height="430"
        tootlip="This is the tootlip sentence"
        @click-media="(index) => logEvent('Media at index', { index })"
        @click-empty="logEvent('Placeholder clicked', $event)"
      >
        <template #placeholder="{ imageSrc }"> </template>
        <template #medias="{ imageSrc }">
          <video class="output" :src="imageSrc" controls></video>
        </template>
        <template #actions="{ index, setActiveMedia }">
          <div class="icons-container-story">
            <AButton>
              <AIcon icon="edit" color="grey" />
            </AButton>
            <AButton>
              <AIcon icon="add_to_photos" color="grey" />
            </AButton>
            <AButton>
              <AIcon icon="close" color="danger" />
            </AButton>
          </div>
        </template>
      </AGallery>
    </Variant>
  </Story>
</template>

<style lang="scss">
.gallery-container-story {
  .media-container {
    cursor: pointer;
  }

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
    cursor: pointer;
  }
}
</style>

<docs lang="md">
# AGallery

This is a gallery component that displays a series of media items and allows navigation through them.
Work with the ImageFirestore component to display images and videos.

## Props

- `containerWidth` (number, optional, default: 300): Specifies the width of the input container.
- `containerHeight` (number, optional, default: 300): Specifies the height of the input container.
- `medias` (Array<string>, optional, default: []): An array of media URLs to be displayed in the gallery.
- `inspirations` (Array<string>, optional, default: []): An array of media URLs to be displayed in the gallery.
- `tootlip` (string, optional, default: ""): Tootlip text to be displayed when there are no media items.

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
