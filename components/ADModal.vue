<script setup lang="ts">
import { ref, watchEffect, onUnmounted } from "vue";
import { ADCardAction } from "./ADCard.vue";
import ADCard from "./ADCard.vue";
import ADButton from "./ADButton.vue";
import ADIcon from "./ADIcon.vue";

export type ADModalSize = "small" | "medium" | "large" | "big" | "giant";


export interface ADModalEmits {
    (e: "close"): void;
}

export interface ADModalProps {
    title?: string;
    size?: ADModalSize;
    actionAlignment?: ADCardAction;
    open?: boolean;
    rounded?: boolean;
    noscroll?: boolean;
    noclose?: boolean;
    cancelLabel?: string;
}

const emit = defineEmits<ADModalEmits>();
const props = withDefaults(defineProps<ADModalProps>(), {
    title: ".title",
    size: "medium",
    actions: undefined,
    cancelLabel: undefined,
});

const wasOpen = ref(false);

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

defineExpose({
    close: () => {
        wasOpen.value = false;
        emit("close");
    },
    open: () => {
        wasOpen.value = true;
    },
});
</script>

<template>
    <Teleport to="body">
        <div :class="[open && 'is-active', `is-${size}`]" class="modal ad-modal" v-if="open">
            <button
                class="modal-background ad-modal-close"
                tabindex="0"
                @keydown.space.prevent="() => noclose === false && emit('close')"
                @click="() => noclose === false && emit('close')"></button>
            <div class="modal-content">
                <ADCard :action-alignment="actionAlignment">
                    <template #header>
                        <h3>
                            <slot name="title"
                                ><Translate>{{ title }}</Translate></slot
                            >
                        </h3>
                        <ADButton
                            class="ad-modal-close ml-auto"
                            icon="close"
                            circle
                            :disabled="noclose"
                            @keydown.space.prevent="emit('close')"
                            @click="emit('close')">
                            <ADIcon icon="close"></ADIcon>
                        </ADButton>
                    </template>
                    <template #content>
                        <slot name="content"></slot>
                    </template>
                    <template #actions>
                        <slot name="action" :close="() => emit('close')"></slot>
                    </template>
                </ADCard>
            </div>
        </div>
    </Teleport>
</template>

<style lang="scss">
@import "../scss/color";

.modal {
    transition: all 0.5s;

    &.is-giant {
        .modal-content {
            width: 100%;
            max-width: 1100px;

            .modal-card {
                width: 100%;
            }
        }
    }

    &.is-big {
        .modal-content {
            width: 100%;
            max-width: 840px;

            .modal-card {
                width: 100%;
            }
        }
    }

    &.is-large {
        .modal-content {
            width: 100%;
            max-width: 720px;

            .modal-card {
                width: 100%;
            }
        }
    }

    &.is-medium {
        .modal-content {
            width: 100%;
            max-width: 640px;

            .modal-card {
                width: 100%;
            }
        }
    }

    &.is-small {
        .modal-content {
            width: 100%;
            max-width: 420px;

            .modal-card {
                width: 100%;
            }
        }
    }

    .modal-content {
        transition: all 0.4s;
    }
}

.ad-modal {
    &.is-active {
        z-index: 200 !important;
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        .ad-modal-close {
            cursor: pointer;
        }
    }

    .ad-modal-card {
        width: 100%;
        //background: var(--white);
        //border: 1px solid var(--fade-grey);
        border-radius: 8px;
        padding: 40px;
        
    }

    .modal-background {
        height: 100%;
        width: 100%;
        background-color: $ad-grey;
        opacity: 0.5;
        backdrop-filter: blur(5px);
    }

    .modal-content {
        transform: scale(1) translate(-50%, -50%) !important;
        opacity: 1 !important;
        max-width: 540px;
        overflow-x: hidden;
        animation: fadeInDown 0.5s;
        margin: 0;
        padding: 0 10px;
        z-index: 300;
        top: 50%;
        left: 50%;
        // right: 0;
        // bottom: 0;
        position: absolute;

        .modal-card {
            max-width: 100%;
            margin: 0 auto;

            &.is-rounded {
                border-radius: 12px;
            }

            .modal-card-head {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                background: var(--white);
                border-bottom-color: var(--fade-grey-dark-3);

                &.no-border {
                    border-bottom-color: transparent;
                }

                h3 {
                    font-family: var(--font-alt);
                    color: var(--dark-text);
                    font-weight: 600;
                    font-size: 1rem;
                }
            }

            .modal-card-body {
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

            .modal-card-foot {
                background-color: var(--white);
                padding: 15px 20px;
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
}

.is-dark {
    .ad-modal {
        .modal-background {
            background: rgb(101 101 104 / 80%) !important;
        }

        .modal-content {
            .modal-card {
                .modal-card-head {
                    background: var(--dark-sidebar-light-6) !important;
                    border-color: var(--dark-sidebar-light-12);

                    h3 {
                        color: var(--dark-dark-text);
                    }

                    .ad-modal-close {
                        &:hover {
                            svg {
                                color: var(--primary);
                            }
                        }
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
        .modal-content {
            width: 800px !important;
        }
    }

    .modal.modal-sm {
        .modal-card,
        .modal-content {
            width: 400px !important;
        }
    }
}
</style>
