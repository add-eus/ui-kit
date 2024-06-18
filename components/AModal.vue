<script setup lang="ts">
import { ref, watchEffect, onUnmounted, watch } from "vue";
import { ACardAction, ACardTitle } from "./ACard.vue";
import ACard from "./ACard.vue";
import AButton from "./AButton.vue";
import AIcon from "./AIcon.vue";

export type AModalSize = "small" | "medium" | "large" | "big" | "giant";

export interface AModalEmits {
  (e: "close"): void;
}

export interface AModalProps {
  title?: string;
  size?: AModalSize;
  titleAlignement?: ACardTitle;
  actionAlignement?: ACardAction;
  open?: boolean;
  rounded?: boolean;
  noscroll?: boolean;
  noclose?: boolean;
  cancelLabel?: string;
  classList?: string;
  confirmation?: boolean;
}

const emit = defineEmits<AModalEmits>();
const props = withDefaults(defineProps<AModalProps>(), {
  title: ".title",
  size: "medium",
  actions: undefined,
  cancelLabel: undefined,
  confirmation: false,
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
        :class="[open && 'is-active', `is-${size}`, `${classList}`]"
        class="modal a-modal"
        v-if="open"
      >
        <button
          class="a-modal-background a-modal-close"
          tabindex="0"
          @keydown.space.prevent="() => noclose === false && close()"
          @click="() => noclose === false && close()"
        ></button>
        <div class="a-modal-content">
          <ACard
            :title-alignement="titleAlignement"
            :action-alignement="actionAlignement"
          >
            <template #header>
              <h3>
                <slot name="title"
                  ><Translate>{{ title }}</Translate></slot
                >
              </h3>
              <AButton
                class="a-modal-close"
                icon="close"
                circle
                :disabled="noclose"
                @keydown.space.prevent="close()"
                @click="close()"
              >
                <AIcon icon="close"></AIcon>
              </AButton>
            </template>
            <template #content>
              <slot
                v-if="showConfirmation"
                name="confirmation"
                :cancel="cancelConfirmation"
              ></slot>
              <slot name="content"></slot>
            </template>
            <template #action>
              <slot name="action" :close="() => close()"></slot>
            </template>
          </ACard>
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
  }

  .a-modal-close {
    position: absolute;
    cursor: pointer;
    top: 10px;
    right: 10px;
    background: transparent;

    &.a-modal-background {
      top: 0;
      right: 0;
    }
  }

  .a-card {
    width: 100%;
    border-radius: 8px;
    padding: 20px 40px 40px 40px;
    max-height: 100vh;

    > .a-card-body {
      overflow: auto;
    }
  }

  .a-modal-background {
    height: 100%;
    width: 100%;
    background: $a-black;
    opacity: 0.45;
    border: none;
  }

  .a-modal-content {
    opacity: 1 !important;
    max-width: 540px;
    animation: fadeInDown 0.5s;
    margin: 0;
    padding: 0 10px;
    z-index: 300;
    top: 50vh;
    left: 50vw;
    position: fixed;
    /* transform: scale(1) translate(-50%, -50%) !important; */
    animation: goup 0.25s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    transform-origin: left;

    @keyframes goup {
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

      animation: upscale 0.25s cubic-bezier(0.23, 1, 0.32, 1) forwards;
      transform-origin: center;

      @keyframes upscale {
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

      .a-card-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 20px;

        h3 {
          font-weight: bold;
          color: var(--a-grey-darker);
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

      .a-card-body {
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

      .a-card-foot {
        border-top: 1px solid var(--fade-grey-dark-3);

        &:empty {
          display: none;
        }

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
  }

  //SIZING

  &.is-giant {
    .a-modal-content {
      width: 100%;
      max-width: 1390px;

      .modal-card {
        width: 100%;
      }
    }
  }

  &.is-big {
    .a-modal-content {
      width: 100%;
      max-width: 840px;

      .modal-card {
        width: 100%;
      }
    }
  }

  &.is-large {
    .a-modal-content {
      width: 100%;
      max-width: 720px;

      .modal-card {
        width: 100%;
      }
    }
  }

  &.is-medium {
    .a-modal-content {
      width: 100%;
      max-width: 640px;

      .modal-card {
        width: 100%;
      }
    }
  }

  &.is-small {
    .a-modal-content {
      width: 100%;
      max-width: 420px;

      .modal-card {
        width: 100%;
      }
    }
  }

  &.is-dark {
    .a-modal-background {
      background: rgb(101 101 104 / 80%) !important;
    }

    .a-modal-content {
      .modal-card {
        .modal-card-head {
          background: var(--dark-sidebar-light-6) !important;
          border-color: var(--dark-sidebar-light-12);

          h3 {
            color: var(--dark-dark-text);
          }
        }

        .modal-card-body {
          background: var(--dark-sidebar-light-6) !important;
        }

        .modal-card-foot {
          background: var(--dark-sidebar-light-6) !important;
          border-color: var(--dark-sidebar-light-12);
        }
      }
    }
  }
}

@media screen and (min-width: 769px) {
  .modal.modal-lg {
    .modal-card,
    .a-modal-content {
      width: 800px !important;
    }
  }

  .modal.modal-sm {
    .modal-card,
    .a-modal-content {
      width: 400px !important;
    }
  }
}
</style>
