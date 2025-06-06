<script setup lang="ts">
import { ref, computed, watch } from "vue";
import AIcon from "./AIcon.vue";
import AButton from "./AButton.vue";
import { useWindowSize } from "@vueuse/core";
import { useBreakpoints } from "../stores/breakpoint";

const breakpoints = useBreakpoints();
const isMobile = breakpoints.smaller("md");

const { width } = useWindowSize();

interface AGalleryProps {
  containerWidth: number;
  containerHeight: number;
  medias: string[];
  inspirations: string[];
  tootlip: string;
  title: string;
  subTitle: string;
  action: string;
  autoHeight: boolean;
}

const props = withDefaults(defineProps<AGalleryProps>(), {
  containerWidth: 300,
  containerHeight: 300,
  medias: () => [],
  inspirations: () => [],
  tootlip: "",
  title: undefined,
  subTitle: undefined,
  action: undefined,
  autoHeight: false,
});

interface AGalleryEmits {
  (e: "click-media", index: number): void;
  (e: "click-insert"): void;
}

const emits = defineEmits<AGalleryEmits>();

const mediaContainerTranslate = ref(0);
const activeButtonIndex = ref(0);
const borderSpace = ref(40);

const dotButtonClick = (index: number) => {
  mediaContainerTranslate.value = isMobile.value
    ? -width.value * index
    : -props.containerWidth * index;
  activeButtonIndex.value = index;
};

const nextMedia = () => {
  const totalItems =
    props.medias.length > 0 ? props.medias.length : props.inspirations.length;

  if (activeButtonIndex.value < totalItems - 1) {
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
  const items = props.medias.length > 0 ? props.medias : props.inspirations;
  if (index < 0 || index >= items.length) {
    throw new Error("Index out of range");
  }
  activeButtonIndex.value = index;
  mediaContainerTranslate.value = isMobile.value
    ? -width.value * index
    : -props.containerWidth * index;
};

const clickInsert = () => {
  emits("click-insert");
};

defineExpose({
  nextMedia,
  prevMedia,
  setActiveMedia,
});

const mediasAndInspirations = computed((): string[] => {
  return [...props.inspirations, ...props.medias];
});

watch(
  () => props.medias.length,
  (newLength) => {
    if (activeButtonIndex.value >= newLength) {
      activeButtonIndex.value = 0;
      mediaContainerTranslate.value = 0;
    }
  }
);

</script>

<template>
  <div class="container-gallery" :class="{
    'container-gallery-auto-height': autoHeight,
  }" :style="{
      '--width': containerWidth + 'px',
      '--height': containerHeight + 'px',
      '--media-container-translate': mediaContainerTranslate + 'px',
      '--border-space': borderSpace + 'px',
      '--index':
        medias.length > 0
          ? medias.length
          : inspirations.length > 0
            ? inspirations.length
            : 1,
    }">
    <!-- Media Container -->
    <div class="media-container" :class="medias.length === 0 && 'inspi-content'">
      <div class="media-content" :style="{
        transform: `translateX(var(--media-container-translate))`,
      }">
        <div v-for="(imageSrc, index) in medias" :key="imageSrc" class="upload-container">
          <slot name="medias" :imageSrc="imageSrc">
            <img v-if="imageSrc" class="output" :src="imageSrc" alt="Post img" />
          </slot>
        </div>
        <!-- Placeholder -->
        <!-- If no inspiration -->
        <div class="upload-container" v-if="medias.length === 0 && inspirations.length === 0">
          
          <slot name="placeholder"> </slot>
        </div>
        <!-- If inspiration array -->
        <div v-if="medias.length === 0" v-for="(imageSrc, index) in inspirations" :key="imageSrc"
          class="upload-container">
          <slot name="placeholder" :imageSrc="imageSrc">
            <img v-if="imageSrc" class="output" :src="imageSrc" alt="Post img" />
          </slot>
          <!-- Switch between image and video icon -->
          <AIcon v-if="inspirations.length >= 1" class="icon-carousel media-img" icon="filter_none" color="white" />
          <AIcon v-if="inspirations.length >= 1" class="icon-carousel media-video" icon="video_library" color="white" />
        </div>
        <!-- Inspi layer -->
        <div class="inspi-layer"></div>
      </div>
      <AButton v-if="
        medias.length === 0 && inspirations.length !== 0 
      " color="secondary" @click="clickInsert(index)" class="insert-btn">
        <AIcon icon="image" color="white" />
        <Translate>
          {{ action ? action : "Use the generated image" }}
        </Translate>
      </AButton>
    </div>
    <!-- Dot Container -->
    <div class="dot-container" :style="{
      width:
        medias.length > 0
          ? `${medias.length * 12}px`
          : inspirations.length > 0
            ? `${inspirations.length * 12}px`
            : '0px',
    }">
      <transition name="fade-slow">
        <div v-if="medias.length >= 2 || inspirations.length >= 2" class="dot-content" :style="{
          transform:
            activeButtonIndex >= 2 &&
            `translateX(-${(activeButtonIndex - 2) * 12}px)`,
        }">
          <!-- Generate dot for medias & inspirations  -->
          <button v-for="(imageSrc, index) in mediasAndInspirations" :key="index" class="dot" :class="{
            active: activeButtonIndex === index,
            'scale-down':
              activeButtonIndex >= index + 3 ||
              (activeButtonIndex !== 0 &&
                activeButtonIndex !== 1 &&
                activeButtonIndex <= index - 2),
          }" @click="dotButtonClick(index)">
            <div></div>
          </button>
        </div>
      </transition>
    </div>
    <!-- Icon Back -->
    <button v-if="
      (medias.length >= 2 && activeButtonIndex != 0) ||
      (medias.length == 0 &&
        inspirations.length >= 2 &&
        activeButtonIndex != 0)
    " class="icon-back" @click="prevMedia">
      <AIcon icon="keyboard_arrow_left" color="black" />
    </button>
    <!-- Icon Next -->
    <button v-if="
      (medias.length >= 2 && activeButtonIndex != medias.length - 1) ||
      (medias.length == 0 &&
        inspirations.length >= 2 &&
        activeButtonIndex != inspirations.length - 1)
    " class="icon-next" @click="nextMedia">
      <AIcon icon="keyboard_arrow_right" color="black" />
    </button>
    <slot name="actions" :index="activeButtonIndex" :setActiveMedia="setActiveMedia"></slot>
  </div>
</template>

<style lang="scss">
//If v-image-firebase content video his next brother element media-img is display: none
.container-gallery {
  .v-image-firebase:has(> video)+.media-img {
    display: none;
  }

  .v-image-firebase:has(> img)+.media-video {
    display: none;
  }
}
</style>

<style scoped lang="scss">
//MEDIA CONTAINER
.container-gallery {
  width: var(--width);
  position: relative;
  background: transparent;
  max-width: 100%;

  // AUTO HEIGHT
  &.container-gallery-auto-height {
    .media-container {
      .media-content {
        height: inherit;

        .upload-container {
          height: inherit;

          :slotted(img),
          :slotted(video) {
            object-fit: contain;
          }

          :slotted(div) {
            img {
              object-fit: contain;
            }
          }
        }
      }
    }

    .icon-next,
    .icon-back {
      top: calc(50% - var(--border-space));
    }
  }

  .media-container {
    width: var(--width);
    overflow: hidden;
    background: var(--a-white);

    @media screen and (max-width: 767px) {
      max-width: 100%;
    }

    &.inspi-content {
      .inspi-layer {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, 0.5);
        z-index: 1;
        pointer-events: none;
      }
    }

    .media-content {
      position: relative;
      display: flex;
      overflow: hidden;
      height: calc(var(--height) - var(--border-space));
      width: calc((var(--width) * var(--index)));
      transition: transform 0.5s ease-in-out;

      @media screen and (max-width: 767px) {
        width: calc((100% * var(--index)));
      }

      .upload-container {
        height: calc(var(--height) - var(--border-space));
        width: var(--width);
        object-fit: contain;
        max-width: inherit;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        //DEFAULT
        :slotted(img) {
          height: 100%;
          width: 100%;
          object-fit: contain;
        }

        :slotted(video) {
          height: 100%;
          width: 100%;
          object-fit: contain;
        }

        //FIRESTORE
        :slotted(div) {
          height: 100%;
          width: 100%;

          img {
            height: 100%;
            width: 100%;
            object-fit: contain;
          }

          video {
            height: 100%;
            width: 100%;
            object-fit: contain;
          }
        }
      }
    }

    &:hover {
      +.inspiration-sentence {
        opacity: 1;
      }
    }
  }


  //DOT
  .dot-container {
    height: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
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
            background: var(--a-info);
          }
        }

        &.scale-down {
          div {
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
    padding: 0;
    cursor: pointer;
    background: var(--a-white);
    border-radius: 50px;
    height: 35px;
    width: 35px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;

    &.icon-next {
      right: 15px;
    }

    &.icon-back {
      left: 15px;
    }
  }

  .details-container {
    position: absolute;
    top: calc(50% - 45px);
    left: 50%;
    font-size: 30px;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    height: 90px;
    pointer-events: none;

    p {
      margin: 0;
      color: var(--a-black);
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      white-space: nowrap;
    }

    .icon-upload {
      color: var(--a-black);
      font-size: 30px;
    }
  }

  .insert-btn {
    position: absolute;
    bottom: 25px;
    left: 50%;
    padding: 10px;
    width: 260px;
    max-width: 100%;
    transform: translate(-50%, -50%);
  }
}
</style>
