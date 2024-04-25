<script setup lang="ts">
import { ref, watch } from "vue";
import ADIcon from "./ADIcon.vue";

const props = defineProps({
  containerWidth: {
    type: Number,
    default: 300,
  },
  containerHeight: {
    type: Number,
    default: 300,
  },
  medias: {
    type: Array<String>,
    default: [],
  },
});
interface ADInputFileEmits {
  (e: "delete", index: number): boolean;
}
const emits = defineEmits<ADInputFileEmits>();

const mediaContainerTranslate = ref(0);
const activeButtonIndex = ref(0);
const borderSpace = ref(40);

const dotButtonClick = (index: number) => {
  mediaContainerTranslate.value =
    (-props.containerWidth + borderSpace.value) * index;
  activeButtonIndex.value = index;
};

const nextMedia = () => {
  if (activeButtonIndex.value < props.medias.length - 1) {
    activeButtonIndex.value++;
    setActiveMedia(activeButtonIndex.value);
  }
};

const prevMedia = () => {
  if (activeButtonIndex.value > 0) {
    activeButtonIndex.value--;
    setActiveMedia(activeButtonIndex.value);
  }
};

const deleteMedia = () => {
  const isLastMedia = activeButtonIndex.value == props.medias.length - 1;
  emits("delete", activeButtonIndex.value);
  if (isLastMedia) {
    prevMedia();
  }
};

const setActiveMedia = (index: number) => {
  if (index < 0 || index >= props.medias.length)
    throw new Error("Index out of range");
  activeButtonIndex.value = index;
  mediaContainerTranslate.value =
    (-props.containerWidth + borderSpace.value) * index;
};

defineExpose({
  nextMedia,
  prevMedia,
  setActiveMedia,
});
</script>

<template>
  <div
    class="container-input-file"
    :style="{
      '--width': containerWidth + 'px',
      '--height': containerHeight + 'px',
      '--media-container-translate': mediaContainerTranslate + 'px',
      '--border-space': borderSpace + 'px',
      '--index': medias.length > 0 ? medias.length : 1,
    }"
  >
    <!-- Media Container -->
    <div class="media-container">
      <div
        class="media-content"
        :style="{ transform: `translateX(var(--media-container-translate))` }"
      >
        <div
          v-for="(imageSrc, index) in medias"
          :key="index"
          class="upload-container"
        >
          <slot name="medias" :imageSrc="imageSrc">
            <img
              v-if="imageSrc"
              class="output"
              :src="imageSrc"
              alt="Post img"
            />
          </slot>
          <!-- Switch between image and video icon -->
          <ADIcon
            v-if="medias.length >= 2"
            class="icon-carousel media-img"
            icon="filter_none"
            color="var(--ad-white)"
          />
          <ADIcon
            v-if="medias.length >= 2"
            class="icon-carousel media-video"
            icon="video_library"
            color="var(--ad-white)"
          />
        </div>
        <!-- Inspiration Media -->
        <transition name="fade-slow">
          <div
            v-if="medias.length == 0 && inspiration != ''"
            class="inspiration-media"
          >
            <slot name="inspi">
              <!-- <img v-if="imageSrc" class="output" :src="inspiration" alt="Inspiration img" /> -->
            </slot>
          </div>
        </transition>
        <!-- Icon Upload -->
        <transition name="fade-slow">
          <ADIcon
            v-if="medias.length == 0"
            icon="cloud_upload"
            color="var(--ad-grey)"
            class="icon-upload"
          />
        </transition>
      </div>
    </div>
    <!-- Dot Container -->
    <div class="dot-container">
      <transition name="fade-slow">
        <div v-if="medias.length >= 2" class="dot-content">
          <button
            v-for="(imageSrc, index) in medias"
            :key="index"
            class="dot"
            :class="{ active: activeButtonIndex === index }"
            @click="dotButtonClick(index)"
          >
            <div></div>
          </button>
        </div>
      </transition>
    </div>
    <!-- Icon Carousel -->
    <!-- <ADIcon
      v-if="medias.length >= 2"
      class="icon-carousel"
      icon="note_stack"
      color="var(--ad-grey)"
    /> -->
    <!-- Icon Delete -->
    <button v-if="medias.length >= 1" class="icon-delete" @click="deleteMedia">
      <ADIcon icon="close" color="var(--ad-danger)" />
    </button>
    <!-- Icon Add -->
    <button v-if="medias.length >= 1" class="icon-add">
      <ADIcon icon="add_to_photos" color="var(--ad-grey)" />
    </button>
    <!-- Add media Input File -->
    <div :class="medias.length >= 1 ? 'input-icon-add' : 'input-media-cover'">
      <slot name="input">
        <input type="file" />
      </slot>
    </div>
    <!-- Icon Edit -->
    <button v-if="medias.length >= 1" class="icon-edit">
      <ADIcon icon="edit" color="var(--ad-grey)" />
    </button>
    <!-- Edit media input -->
    <div
      v-if="medias.length >= 1"
      :class="
        medias.length >= 1 ? 'input-icon-edit' : 'input-icon-edit-disable'
      "
    >
      <slot name="input" :index="activeButtonIndex">
        <input type="file" />
      </slot>
    </div>
    <!-- Icon Back -->
    <button
      v-if="medias.length >= 2 && activeButtonIndex != 0"
      class="icon-back"
      @click="prevMedia"
    >
      <ADIcon icon="keyboard_arrow_left" color="var(--ad-grey)" />
    </button>
    <!-- Icon Next -->
    <button
      v-if="medias.length >= 2 && activeButtonIndex != medias.length - 1"
      class="icon-next"
      @click="nextMedia"
    >
      <ADIcon icon="keyboard_arrow_right" color="var(--ad-grey)" />
    </button>
    <!-- Inspiration Sentence -->
    <transition name="fade-slow">
      <div
        v-if="medias.length == 0 && inspiration != ''"
        class="inspiration-sentence"
      >
        Inspiration image to be replaced with your own content
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
//If v-image-firebase content video his next brother element media-img is display: none
.container-input-file {
  .v-image-firebase:has(> video) + .media-img {
    display: none;
  }
  .v-image-firebase:has(> img) + .media-video {
    display: none;
  }
}
</style>

<style scoped lang="scss">
//MEDIA CONTAINER
.container-input-file {
  /* overflow: hidden; */
  width: var(--width);
  position: relative;
  background: transparent;

  .media-container {
    width: calc(var(--width) - var(--border-space));
    margin-left: calc(var(--border-space) / 2);
    border-radius: 8px;
    overflow: hidden;
    background: var(--ad-grey-light);

    .media-content {
      position: relative;
      display: flex;
      height: calc(var(--height) - var(--border-space));
      width: calc((var(--width) * var(--index)) - var(--border-space));
      transition: transform 0.5s ease-in-out;

      .upload-container {
        height: calc(var(--height) - var(--border-space));
        width: calc(var(--width) - var(--border-space));
        object-fit: contain;
        max-width: inherit;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 5px;
        position: relative;
        /* img {
                    height: calc(var(--height) - var(--border-space));
                    width: calc(var(--width) - var(--border-space));
                    object-fit: contain;
                    max-width: inherit;
                    overflow: hidden;
                } */
      }
    }
  }

  //DOT
  .dot-container {
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .dot-content {
      display: flex;
      align-items: center;

      .dot {
        width: 12px;
        height: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        background: transparent;
        border: none;
        cursor: pointer;

        div {
          width: 6px;
          height: 6px;
          border-radius: 50px;
          background: var(--ad-grey);
        }

        &.active {
          div {
            width: 8px;
            height: 8px;
          }
        }
      }
    }
  }

  //INPUT FILE ADD / EDIT
  .input-icon-add,
  .input-icon-edit {
    position: absolute;
    top: calc(var(--height) - var(--border-space));
    opacity: 0;

    :slotted(input) {
      height: 30px;
      width: 30px;
      cursor: pointer;
    }

    :slotted(input[type="file"]::file-selector-button) {
      cursor: pointer;
    }

    &.input-icon-add {
      right: calc((var(--border-space) / 2) + 30px);
    }

    &.input-icon-edit {
      right: calc((var(--border-space) / 2) + 60px);
    }
  }

  .input-media-cover {
    position: absolute;
    top: 0;
    left: calc(var(--border-space) / 2);
    opacity: 0;

    :slotted(input) {
      height: calc(var(--height) - var(--border-space));
      width: calc(var(--width) - var(--border-space));
      cursor: pointer;
    }

    :slotted(input[type="file"]::file-selector-button) {
      cursor: pointer;
    }

    &:hover {
      + .inspiration-sentence {
        opacity: 1;
      }
    }
  }

  //ICON
  .icon-delete,
  .icon-add,
  .icon-next,
  .icon-back,
  .icon-edit {
    background: transparent;
    border: none;
  }

  //ICON ADD / DELETE / EDIT
  .icon-add,
  .icon-delete,
  .icon-edit {
    position: absolute;
    height: 30px;
    width: 30px;
    padding: 0;
    cursor: pointer;
    top: calc(var(--height) - var(--border-space));

    &.icon-add {
      right: calc((var(--border-space) / 2) + 30px);
    }

    &.icon-delete {
      right: calc((var(--border-space) / 2));
    }

    &.icon-edit {
      right: calc((var(--border-space) / 2) + 60px);
    }
  }

  //ICON CAROUSEL
  .icon-carousel {
    position: absolute;
    top: 10px;
    /* right: calc((var(--border-space) / 2) + 10px); */
    right: 10px;
    z-index: 1;
    transform: scaleX(-1);
    font-variation-settings: "FILL" 1;
  }

  //ICON ARROW
  .icon-next,
  .icon-back {
    position: absolute;
    top: calc((var(--height) * 0.5) - var(--border-space));
    height: 30px;
    width: 20px;
    padding: 0;
    cursor: pointer;

    &.icon-next {
      right: 0;
    }

    &.icon-back {
      left: 0;
    }
  }

  //ICON UPLOAD
  .icon-upload {
    position: absolute;
    font-size: 30px;
    top: calc((var(--height) * 0.5) - var(--border-space));
    right: calc((var(--width) * 0.5) - var(--border-space));
  }

  //INSPIRATION
  .inspiration-sentence {
    position: absolute;
    top: calc((var(--height) * 0.8) - var(--border-space));
    right: -10px;
    z-index: 1;
    background: #fafafa;
    padding: 7px 15px;
    font-size: 10px;
    border-radius: 8px;
    color: var(--ad-grey);
    box-shadow: 5px 5px 5px 0 #0000001a;
    transition: opacity 0.5s ease;
    pointer-events: none;
    opacity: 0;
  }

  .inspiration-media {
    height: 100%;
    width: 100%;
    opacity: 0.25;
    //DEFAULT
    :slotted(img) {
      height: 100%;
      width: 100%;
      background: red;
      object-fit: cover;
    }
    //FIRESTORE
    :slotted(div) {
      height: 100%;
      width: 100%;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
