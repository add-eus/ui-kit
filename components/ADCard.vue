<script setup lang="ts">
import { ref } from 'vue'

export type ADCardAction = "center" | "right";

export interface ADCardProps {
    actionAlignment?: ADCardAction;
}

withDefaults(defineProps<ADCardProps>(), {
    actionAlignment: undefined,
});
</script>

<template>
  <div class="modal-card">
        <header class="modal-card-head">
            <slot name="header"></slot>
        </header>
        <div class="modal-card-body">
            <div class="inner-content">
                <Suspense>
                    <template #default>
                        <slot name="content"></slot>
                    </template>
                    <template #fallback>
                        <VPlaceload
                            height="100px"
                            width="100%"
                            class="mx-2" />
                    </template>
                </Suspense>
            </div>
        </div>
        <div
            class="modal-card-foot"
            :class="[
                actionAlignment === 'center' && 'is-centered',
                actionAlignment === 'right' && 'is-end',
            ]">
            <slot name="action"></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../scss/color';

.modal-card {
    background-color: $ad-white;
    border-radius: 0.5rem;
    box-shadow: 0 0 1rem 0 rgba(10, 10, 10, 0.1);
    display: flex;
    flex-direction: column;
    max-height: 100%;
    overflow: hidden;
    width: 100%;
}
</style>