<script setup lang="ts">
import { ref, watch } from "vue";
import AIcon from "./AIcon.vue";

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
    type: Array<string>,
    default: [],
  },
  tootlip: {
    type: String,
    default: "",
  },
});

interface AGalleryEmits {
  (e: "click-media", index: number): void;
  (e: "click-empty"): void;
}

const emits = defineEmits<AGalleryEmits>();

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

const setActiveMedia = (index: number) => {
  if (index < 0 || index >= props.medias.length)
    throw new Error("Index out of range");
  activeButtonIndex.value = index;
  mediaContainerTranslate.value =
    (-props.containerWidth + borderSpace.value) * index;
};

const clickMedia = () => {
  emits("click-media", activeButtonIndex.value);
};

const clickEmpty = () => {
  emits("click-empty");
};

defineExpose({
  nextMedia,
  prevMedia,
  setActiveMedia,
});
</script>

<template>
  <div
    class="container-gallery"
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
        :style="{
          transform: `translateX(var(--media-container-translate))`,
        }"
      >
        <div
          v-for="(imageSrc, index) in medias"
          :key="index"
          class="upload-container"
          @click="clickMedia(index)"
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
          <AIcon
            v-if="medias.length >= 2"
            class="icon-carousel media-img"
            icon="filter_none"
            color="white"
          />
          <AIcon
            v-if="medias.length >= 2"
            class="icon-carousel media-video"
            icon="video_library"
            color="white"
          />
        </div>
        <!-- Placeholder -->
        <transition name="fade-slow">
          <div
            v-if="medias.length === 0"
            class="inspiration-media"
            @click="clickEmpty"
          >
            <slot name="placeholder"> </slot>
            <AIcon icon="upload" class="icon-upload" />
          </div>
        </transition>
      </div>
    </div>
    <!-- Tootlip sentence -->
    <transition name="fade-slow">
      <div
        class="inspiration-sentence"
        v-if="medias.length === 0 && tootlip !== ''"
      >
        <p>{{ tootlip }}</p>
      </div>
    </transition>
    <!-- Dot Container -->
    <div
      class="dot-container"
      :style="{
        width: `${medias.length * 12}px`,
      }"
    >
      <transition name="fade-slow">
        <div
          v-if="medias.length >= 2"
          class="dot-content"
          :style="{
            transform:
              activeButtonIndex >= 2 &&
              `translateX(-${(activeButtonIndex - 2) * 12}px)`,
          }"
        >
          <button
            v-for="(imageSrc, index) in medias"
            :key="index"
            class="dot"
            :class="{
              active: activeButtonIndex === index,
              'scale-down':
                activeButtonIndex >= index + 3 ||
                (activeButtonIndex !== 0 &&
                  activeButtonIndex !== 1 &&
                  activeButtonIndex <= index - 2),
            }"
            @click="dotButtonClick(index)"
          >
            <div></div>
          </button>
        </div>
      </transition>
    </div>
    <!-- Icon Back -->
    <button
      v-if="medias.length >= 2 && activeButtonIndex != 0"
      class="icon-back"
      @click="prevMedia"
    >
      <AIcon icon="keyboard_arrow_left" color="grey" />
    </button>
    <!-- Icon Next -->
    <button
      v-if="medias.length >= 2 && activeButtonIndex != medias.length - 1"
      class="icon-next"
      @click="nextMedia"
    >
      <AIcon icon="keyboard_arrow_right" color="grey" />
    </button>
    <slot
      name="actions"
      :index="activeButtonIndex"
      :setActiveMedia="setActiveMedia"
    ></slot>
  </div>
</template>

<!-- :style="{
  transform: `translateX(-${visibleDotsStart * 12}px)`,
}" -->

<style lang="scss">
//If v-image-firebase content video his next brother element media-img is display: none
.container-gallery {
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
.container-gallery {
  overflow: hidden;
  width: var(--width);
  position: relative;
  background: transparent;

  .media-container {
    width: calc(var(--width) - var(--border-space));
    margin-left: calc(var(--border-space) / 2);
    border-radius: 8px;
    overflow: hidden;
    background: var(--a-grey-light);

    .media-content {
      position: relative;
      display: flex;
      overflow: hidden;
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
      }
    }

    &:hover {
      + .inspiration-sentence {
        opacity: 1;
      }
    }
  }

  //INSPI SENTENCE
  .inspiration-sentence {
    position: absolute;
    padding: 5px 12px;
    border-radius: 6px;
    background: var(--a-white);
    bottom: 65px;
    right: 7px;
    opacity: 0;
    pointer-events: none;
    font-size: 9px;
    box-shadow: 0 0 1rem 0 rgba(10, 10, 10, 0.2);
    transition: opacity 0.2s ease-in-out;

    p {
      margin: 0;
    }
  }

  //DOT
  .dot-container {
    height: 30px;
    width: 100%;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    overflow: hidden;
    /* padding: 0 4px; */
    max-width: 48px;
    margin-left: 50%;
    transform: translateX(-50%);
    justify-content: left;
    position: relative;

    &::before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      z-index: 1;
      box-shadow: inset 0px 0px 2px 2px var(--a-white);
      pointer-events: none;
    }

    .dot-content {
      display: flex;
      align-items: center;
      transition: transform 0.5s ease-in-out;

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
          background: var(--a-grey);
        }

        &.active {
          div {
            width: 8px;
            height: 8px;
          }
        }

        &.scale-down {
          div {
            width: 4px;
            height: 4px;
            transition: height 0.1s ease-in-out, width 0.1s ease-in-out;
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
  }

  //ICON
  .icon-next,
  .icon-back {
    background: transparent;
    border: none;
  }

  //ICON CAROUSEL
  .icon-carousel {
    position: absolute;
    top: 10px;
    /* right: calc((var(--border-space) / 2) + 10px); */
    right: 10px;
    z-index: 1;
    font-variation-settings: "FILL" 1;
    transform: scaleX(-1);
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

  .inspiration-media {
    height: 100%;
    width: 100%;
    opacity: 0.25;
    border-radius: 8px;
    overflow: hidden;

    //DEFAULT
    :slotted(img) {
      height: 100%;
      width: 100%;
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

    .icon-upload {
      color: var(--a-black);
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 35px;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
