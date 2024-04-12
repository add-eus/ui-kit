<script setup lang="ts">
import { ref, } from "vue";
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
    inspiration: {
        type: String,
        default: "",
    },
    medias: {
        type: Array<String>,
        default: [],
    }
});
interface ADInputFileEmits {
    (e: "delete", index: number): boolean;
}
const emits = defineEmits<ADInputFileEmits>();

const mediaContainerTranslate = ref(0);
const activeButtonIndex = ref(0);
const borderSpace = ref(40);

const dotButtonClick = (index: number) => {
    mediaContainerTranslate.value = (-props.containerWidth + borderSpace.value) * index;
    activeButtonIndex.value = index;
};

const nextMedia = () => {
    if (activeButtonIndex.value < props.medias.length - 1) {
        activeButtonIndex.value++;
        mediaContainerTranslate.value =
            (-props.containerWidth + borderSpace.value) * activeButtonIndex.value;
    }
};

const prevMedia = () => {
    if (activeButtonIndex.value > 0) {
        activeButtonIndex.value--;
        mediaContainerTranslate.value =
            (-props.containerWidth + borderSpace.value) * activeButtonIndex.value;
    }
};

const deleteMedia = () => {
    const deleted = emits("delete", activeButtonIndex.value);
    if (deleted && activeButtonIndex.value == props.medias.length - 1) {
        activeButtonIndex.value--;
        mediaContainerTranslate.value =
            (-props.containerWidth + borderSpace.value) * activeButtonIndex.value;
    }
};
</script>

<template>
    <div
        class="container-input-file"
        :style="{
            '--width': containerWidth + 'px',
            '--height': containerHeight + 'px',
            '--media-container-translate': mediaContainerTranslate + 'px',
            '--border-space': borderSpace + 'px',
        }">
        <!-- Media Container -->
        <div class="media-container">
            <div
                class="media-content"
                :style="{ transform: `translateX(var(--media-container-translate))` }">
                <div
                    v-for="(imageSrc, index) in medias"
                    :key="index"
                    class="upload-container">
                        <slot name="medias" :imageSrc="imageSrc">
                            <img v-if="imageSrc" class="output" :src="imageSrc" alt="Post img" />
                        </slot>
                </div>
                <!-- Inspiration Media -->
                <transition name="fade-slow">
                    <img v-if="medias.length == 0 && inspiration!=''" class="inspiration-media" :src="inspiration" alt="Inspiration picture" >
                </transition>
                <!-- Icon Upload -->
                <transition name="fade-slow">
                    <ADIcon v-if="medias.length == 0" icon="cloud_upload" color="var(--ad-grey)" class="icon-upload"/>
                </transition>
            </div>
        </div>

        <!-- current media input -->
        <slot name="input" :index="activeButtonIndex">
            <input type="file" />
        </slot>
        <!-- Dot Container -->
        <div class="dot-container">
            <transition name="fade-slow">
                <div v-if="medias.length >= 2" class="dot-content">
                    <button
                        v-for="(imageSrc, index) in medias"
                        :key="index"
                        class="dot"
                        :class="{ active: activeButtonIndex === index }"
                        @click="dotButtonClick(index)">
                        <div></div>
                    </button>
                </div>
            </transition>
        </div>
        <!-- Icon Carousel -->
        <ADIcon v-if="medias.length >= 2" class="icon-carousel" icon="note_stack" color="var(--ad-grey)"/>
        <!-- Icon Delete -->
        <button v-if="medias.length >= 1" class="icon-delete" @click="deleteMedia">
            <ADIcon icon="close" color="var(--ad-danger)"/>
        </button>
        <!-- Icon Add -->
        <button v-if="medias.length >= 1" class="icon-add">
            <ADIcon icon="add_to_photos" color="var(--ad-grey)"/>
        </button>
        <!-- new media Input File -->
        <div :class="medias.length >= 1 ? 'input-icon' : 'input-media-cover'">
            <slot name="input">
                <input type="file" />
            </slot>
        </div>
        <!-- Icon Back -->
        <button v-if="medias.length >= 2 && activeButtonIndex != 0" class="icon-back" @click="prevMedia">
            <ADIcon icon="keyboard_arrow_left" color="var(--ad-grey)"/>
        </button>
        <!-- Icon Next -->
        <button v-if="medias.length >= 2 && activeButtonIndex != medias.length - 1" class="icon-next" @click="nextMedia">
            <ADIcon icon="keyboard_arrow_right" color="var(--ad-grey)"/>
        </button>
        <!-- Inspiration Sentence -->
        <transition name="fade-slow">
            <div v-if="medias.length == 0 && inspiration!=''" class="inspiration-sentence">Inspiration image to be replaced with your own content</div>
        </transition>
    </div>
</template>


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
            width: calc(var(--width) - var(--border-space));
            transition: transform 0.5s ease-in-out;

            .upload-container {
                img {
                    height: calc(var(--height) - var(--border-space));
                    width: calc(var(--width) - var(--border-space));
                    object-fit: contain;
                    max-width: inherit;
                    overflow: hidden;
                }
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


    //INPUT FILE
    .input-icon {
        position: absolute;
        top: calc(var(--height) - var(--border-space));
        right: calc((var(--border-space) / 2) + 30px);
        opacity: 0;

        :slotted(input) {
            height: 30px;
            width: 30px;
            cursor: pointer;
        }

        :slotted(input[type=file]::file-selector-button) {
            cursor: pointer;
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

        :slotted(input[type=file]::file-selector-button) {
            cursor: pointer;
        }

        &:hover {
            + .inspiration-sentence {
                opacity: 1;
            }
        }
    }

    //ICON
    .icon-delete, .icon-add, .icon-next, .icon-back {
        background: transparent;
        border: none;
    }
    
    //ICON ADD DELETE
    .icon-add, .icon-delete {
        position: absolute;
        height: 30px;
        width: 30px;
        padding: 0;
        cursor: pointer;

        &.icon-add {
            top: calc(var(--height) - var(--border-space));
            right: calc((var(--border-space) / 2) + 30px);
        }

        &.icon-delete {
            top: calc(var(--height) - var(--border-space));
            right: calc((var(--border-space) / 2));
        }
    }


    //ICON CAROUSEL
    .icon-carousel {
        position: absolute;
        top: 10px;
        right: calc((var(--border-space) / 2) + 10px);
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
        opacity: 0;
        transition: opacity 0.5s ease;
        pointer-events: none;
    }

    .inspiration-media {
        height: 100%;
        width: 100%;
        object-fit: cover;
        opacity: 0.25;
    }
}
</style>