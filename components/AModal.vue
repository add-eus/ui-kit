<script setup lang="ts">
import { ref, watchEffect, onUnmounted, watch } from "vue";
import { ACardAction, ACardTitle } from "./ACard.vue";
import ACard from "./ACard.vue";
import AButton from "./AButton.vue";
import AIcon from "./AIcon.vue";

export type AModalSize =
  | "small"
  | "medium"
  | "large"
  | "big"
  | "giant"
  | "full";

export type AModalPosition = "center" | "top" | "right" | "bottom" | "left";

export interface AModalEmits {
  (e: "close"): void;
}

export interface AModalProps {
  title?: string;
  subTitle?: string;
  size?: AModalSize;
  position?: AModalPosition;
  icon?: string;
  titleAlignement?: ACardTitle;
  actionAlignement?: ACardAction;
  open?: boolean;
  rounded?: boolean;
  noscroll?: boolean;
  noclose?: boolean;
  cancelLabel?: string;
  classList?: string;
  confirmation?: boolean;
  hasHeader?: boolean;
  hasFooter?: boolean;
  hasBodyPadding?: boolean;
}

const emit = defineEmits<AModalEmits>();
const props = withDefaults(defineProps<AModalProps>(), {
  title: ".title",
  subTitle: undefined,
  size: "medium",
  position: "center",
  icon: undefined,
  actions: undefined,
  cancelLabel: undefined,
  confirmation: false,
  hasHeader: true,
  hasFooter: true,
  hasBodyPadding: true,
  actionAlignement: "right",
});

const wasOpen = ref(false);
const showConfirmation = ref(false);

const checkScroll = () => {
  if (props.noscroll && props.open) {
    document.documentElement.classList.add("no-scroll");
    wasOpen.value = true;
  } else if (wasOpen.value && props.noscroll && !props.open) {
    document.documentElement.classList.remove("no-scroll");
    wasOpen.value = false;
  }
};

watchEffect(checkScroll);
onUnmounted(() => {
  document.documentElement.classList.remove("no-scroll");
});

const close = (force?: boolean) => {
  if (props.confirmation && force !== true) {
    showConfirmation.value = true;
    return;
  }
  emit("close");
};

const cancelConfirmation = () => {
  showConfirmation.value = false;
};

watch(
  () => props.open,
  (value) => {
    if (!value) {
      showConfirmation.value = false;
    }
  }
);

defineExpose({
  close: (force?: boolean) => {
    wasOpen.value = false;
    close(force);
  },
  open: () => {
    wasOpen.value = true;
  },
});
</script>

<template>
  <Teleport to="body">
    <transition name="fade-fast">
      <div
        :class="[
          open && 'is-active',
          `is-${size}`,
          `is-${position}`,
          `${classList}`,
        ]"
        class="modal a-modal"
        v-if="open"
      >
        <button
          class="a-modal-background"
          tabindex="0"
          @keydown.space.prevent="() => noclose === false && close()"
          @click="() => noclose === false && close()"
        ></button>
        <div
          class="a-modal-content"
          :class="{
            'without-subtitle': subTitle === undefined,
            'no-padding': !hasBodyPadding,
          }"
        >
          <div class="a-card">
            <header
              class="a-card-head"
              v-if="hasHeader"
              :class="[
                titleAlignement === 'center' && 'is-centered',
                titleAlignement === 'right' && 'is-end',
              ]"
            >
              <div class="header-content">
                <slot name="icon">
                  <AIcon v-if="icon" :icon="icon" color="black"></AIcon>
                </slot>
                <div class="header-text">
                  <h3>
                    <slot name="title">
                      <Translate>{{ title }}</Translate>
                    </slot>
                  </h3>
                  <p>
                    <slot name="sub-title">
                      <Translate>{{ subTitle }}</Translate>
                    </slot>
                  </p>
                </div>
                <div class="right-content">
                  <slot name="right-content"></slot>
                </div>
                <AButton
                  class="a-modal-close"
                  size="small"
                  circle
                  :disabled="noclose"
                  @keydown.space.prevent="close()"
                  @click="close()"
                >
                  <AIcon icon="close" color="black"></AIcon>
                </AButton>
              </div>
            </header>
            <div class="a-card-body">
              <div class="body-container">
                <AButton
                  v-if="!hasHeader"
                  class="a-modal-close"
                  size="small"
                  circle
                  :disabled="noclose"
                  @keydown.space.prevent="close()"
                  @click="close()"
                >
                  <AIcon icon="close" color="black"></AIcon>
                </AButton>
                <slot
                  v-if="showConfirmation"
                  name="confirmation"
                  :cancel="cancelConfirmation"
                ></slot>
                <slot name="content"></slot>
              </div>
            </div>
            <div
              class="a-card-foot"
              v-if="hasFooter"
              :class="[
                actionAlignement === 'center' && 'is-centered',
                actionAlignement === 'right' && 'is-end',
              ]"
            >
              <slot name="action" :close="() => close()"></slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style lang="scss">
@import "../scss/color";

.a-modal {
  transition: all 0.5s;

  &.is-active {
    z-index: 200 !important;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }

  .a-card {
    position: relative;
    width: 100%;
    border-radius: 5px;
    max-height: 100vh;
    background: var(--a-white);
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);

    > .a-card-body {
      overflow: auto;
    }
  }

  .a-modal-background {
    height: 100%;
    width: 100%;
    background: $a-secondary-darker;
    opacity: 0.4;
    border: none;
  }

  .a-modal-content {
    opacity: 1 !important;
    max-width: 620px;
    margin: 0;
    z-index: 300;
    top: 50vh;
    left: 50vw;
    position: fixed;
    animation: goUp 0.25s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    transform-origin: left;

    @keyframes goUp {
      0% {
        transform: scale(1) translate(-50%, -40%);
      }
      100% {
        transform: scale(1) translate(-50%, -50%);
      }
    }

    .a-card {
      max-width: 100%;
      margin: 0 auto;
      max-height: 95vh;
      overflow-y: auto;

      animation: upScale 0.25s cubic-bezier(0.23, 1, 0.32, 1) forwards;
      transform-origin: center;

      @media screen and (max-width: 768px) {
        max-height: 100svh !important;
      }

      @keyframes upScale {
        0% {
          transform: scale(0.95);
        }
        50% {
          transform: scale(0.95);
        }
        100% {
          transform: scale(1);
        }
      }

      &.is-rounded {
        border-radius: 12px;
      }

      // HEADER
      .a-card-head {
        display: flex;
        padding: 16px 44px 16px 16px;
        border-bottom: 1px solid var(--a-grey-light);
        min-height: 87px;

        .header-content {
          display: flex;
          gap: 5px;
          margin: 6px 0;

          .header-text {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            h3 {
              font-size: 14px;
              font-weight: 600;
              color: var(--a-black);
              margin: 0;
            }

            p {
              font-size: 12px;
              font-weight: 400;
              color: var(--a-grey);
              margin: 0;
            }
          }

          .right-content {
            position: absolute;
            cursor: pointer;
            top: 18px;
            right: 45px;
          }

          .a-modal-close {
            position: absolute;
            cursor: pointer;
            top: 18px;
            right: 12px;
            background: transparent;

            &.a-modal-background {
              top: 0;
              right: 0;
            }
          }
        }

        &.is-start {
          justify-content: flex-start !important;
        }

        &.is-centered {
          justify-content: center !important;
        }

        &.is-end {
          justify-content: flex-end !important;
        }
      }

      // BODY
      .a-card-body {
        margin: 0;
        padding: 16px 20px;
        max-height: 600px;
        position: relative;
        overscroll-behavior: contain;

        @media screen and (max-width: 768px) {
          max-height: calc(100svh - 141px) !important;
        }

        .body-container {
          .a-modal-close {
            position: absolute;
            cursor: pointer;
            top: 18px;
            right: 12px;
            background: transparent;

            &.a-modal-background {
              top: 0;
              right: 0;
            }
          }
        }

        .modal-form {
          padding: 10px 0 20px;
        }

        &.has-tabs {
          padding: 0;
          overflow-x: hidden;

          .tabs {
            overflow-x: auto;

            &::-webkit-scrollbar {
              height: 5px !important;
            }

            &::-webkit-scrollbar-thumb {
              border-radius: 10px !important;
              background: rgb(0 0 0 / 20%) !important;
            }

            a {
              padding: 0.75em 1em;
            }
          }
        }
      }

      // FOOTER
      .a-card-foot {
        display: flex;
        gap: 10px;
        margin: 0;
        padding: 16px;
        border-top: 1px solid var(--a-grey-light);
        min-height: 75px;
        max-height: 75px;

        &.no-border {
          border-top-color: transparent;
        }

        &.is-start {
          justify-content: flex-start !important;
        }

        &.is-centered {
          justify-content: center !important;
        }

        &.is-end {
          justify-content: flex-end !important;
        }

        .v-button {
          min-width: 110px;
        }
      }
    }

    // WITHOUT SUBTITLE
    &.without-subtitle {
      .a-card {
        .a-card-head {
          min-height: 60px;
        }
      }
    }

    // NO PADDING
    &.no-padding {
      .a-card {
        .a-card-body {
          padding: 0;
        }
      }
    }
  }

  // SIZING
  &.is-full {
    .a-modal-content {
      width: 100%;
      height: 100vh;
      max-width: 100%;

      .a-card {
        max-height: 100vh;
        width: 100%;
        height: 100%;

        .a-card-body {
          height: calc(100% - 162px);
          max-height: calc(100% - 162px);
        }
      }
    }
  }

  &.is-giant {
    .a-modal-content {
      width: 100%;
      max-width: 1390px;

      @media screen and (max-width: 1390px) {
        max-width: 100vw;
      }
    }
  }

  &.is-big {
    .a-modal-content {
      width: 100%;
      max-width: 960px;

      @media screen and (max-width: 960px) {
        max-width: 100vw;
      }
    }
  }

  &.is-large {
    .a-modal-content {
      width: 100%;
      max-width: 640px;

      @media screen and (max-width: 640px) {
        max-width: 100vw;
      }
    }
  }

  &.is-medium {
    .a-modal-content {
      width: 100%;
      max-width: 480px;

      @media screen and (max-width: 480px) {
        max-width: 100vw;
      }
    }
  }

  &.is-small {
    .a-modal-content {
      width: 100%;
      max-width: 320px;

      @media screen and (max-width: 320px) {
        max-width: 100vw;
      }
    }
  }

  &.is-dark {
    .a-modal-background {
      background: rgb(101 101 104 / 80%) !important;
    }

    .a-modal-content {
      .a-card {
        background: var(--a-grey-darker);
      }
    }
  }

  //POSITION
  &.is-center {
    .a-modal-content {
      /* top: 50%;
      left: 50%;
      transform: scale(1) translate(-50%, -50%) !important; */
    }
  }

  &.is-top {
    .a-modal-content {
      max-width: 100%;
      top: 0;
      left: 50%;
      transform: scale(1) translate(-50%, 0) !important;

      .a-card {
        max-height: 100vh;
        width: 100%;
        height: 100%;

        .a-card-body {
          height: 100%;
          max-height: 100%;
        }
      }
    }
  }

  &.is-right {
    .a-modal-content {
      height: 100vh;
      max-width: 320px;
      top: 50%;
      left: 100%;
      transform: scale(1) translate(-100%, -50%) !important;

      .a-card {
        max-height: 100vh;
        width: 100%;
        height: 100%;

        .a-card-body {
          height: calc(100% - 162px);
          max-height: calc(100% - 162px);
        }
      }
    }
  }

  &.is-bottom {
    .a-modal-content {
      max-width: 100%;
      top: 100%;
      left: 50%;
      transform: scale(1) translate(-50%, -100%) !important;

      .a-card {
        max-height: 100vh;
        width: 100%;
        height: 100%;

        .a-card-body {
          height: 100%;
          max-height: 100%;
        }
      }
    }
  }

  &.is-left {
    .a-modal-content {
      height: 100vh;
      max-width: 320px;
      top: 50%;
      left: 0;
      transform: scale(1) translate(0, -50%) !important;

      .a-card {
        max-height: 100vh;
        width: 100%;
        height: 100%;

        .a-card-body {
          height: calc(100% - 162px);
          max-height: calc(100% - 162px);
        }
      }
    }
  }
}

@media screen and (min-width: 769px) {
  .modal.modal-lg {
    .a-modal-content {
      width: 800px !important;
    }
  }

  .modal.modal-sm {
    .a-modal-content {
      width: 400px !important;
    }
  }
}
</style>
