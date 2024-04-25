<script setup lang="ts">
import ADModal from "./ADModal.vue";
import ADButton from "./ADButton.vue";
import { ref } from "vue";
import '../index.scss';

const open = ref(false);
</script>

<template>
    <Story :layout="{ type: 'grid', width: 200 }">
        <Variant title="default">
            <ADButton @click="open = 'default'">Open Modal</ADButton>
            <ADModal :open="open === 'default'" @close="open = false">
                <template #content>
                    Content test
                </template>
            </ADModal> 
        </Variant>
        <Variant title="small">
            <ADButton @click="open = 'small'">Open Modal</ADButton>
            <ADModal :open="open === 'small'" @close="open = false" size="small">
                <template #content>
                    Content test
                </template>
            </ADModal> 
        </Variant>
        <Variant title="medium">
            <ADButton @click="open = 'medium'">Open Modal</ADButton>
            <ADModal :open="open === 'medium'" @close="open = false" size="medium">
                <template #content>
                    Content test
                </template>
            </ADModal> 
        </Variant>
        <Variant title="large">
            <ADButton @click="open = 'large'">Open Modal</ADButton>
            <ADModal :open="open === 'large'" @close="open = false" size="large">
                <template #content>
                    Content test
                </template>
            </ADModal> 
        </Variant>
        <Variant title="big">
            <ADButton @click="open = 'big'">Open Modal</ADButton>
            <ADModal :open="open === 'big'" @close="open = false" size="big">
                <template #content>
                    Content test
                </template>
            </ADModal> 
        </Variant>
        <Variant title="giant">
            <ADButton @click="open = 'giant'">Open Modal</ADButton>
            <ADModal :open="open === 'giant'" @close="open = false" size="giant">
                <template #content>
                    Content test
                </template>
            </ADModal> 
        </Variant>
    </Story>
</template>

<docs lang="md">
# ADModal

This is a modal component.

## Usage

The `ADModal` component provides the following options:

- `title` (string, optional): Specifies the title of modal.
- `size` (string, optional): Specifies the size of the modal. Possible values are `small`, `medium`, `large`, `big`, and `giant`.
- `open` (boolean, required): Specifies whether the modal is open or not.
- `close` (function, required): Specifies the function to close the modal.
- `actionAlignment` (string, optional): Specifies the position of the actions. Possible values are `center` and `right`.
</docs>