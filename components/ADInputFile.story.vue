<script setup lang="ts">
import ADInputFile from "./ADInputFile.vue";
import { ref } from 'vue';
import '../index.scss';

const inputFileRef = ref<any>(null);
</script>

<template>
    <Story :layout="{ type: 'grid', width: 400 }">
        <Variant title="default">
            <ADInputFile
                ref="inputFileRef"
                :container-width="350"
                :container-height="300"
                inspiration="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwSUsk_uu2KuNZRT5PintWjwyul4AujUgWNxZlExHB5Q&s">
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    @change="inputFileRef.handleImageChange($event)" />
            </ADInputFile>
        </Variant>
    </Story>
</template>

<docs lang="md">
# ADInputFile

This is an input file component.

## Props

- `containerWidth` (number, optional, default: 300): Specifies the width of the input container.
- `containerHeight` (number, optional, default: 300): Specifies the height of the input container.
- `inspiration` (string, optional, default: ""): Specifies the URL of an inspiration image.

## Events

- `handleImageChange(event: Event)`: Emitted when the user uploads an image. Need to be used with the input file ref `const inputFileRef = ref<any>(null);`.

## Slots

- `default`: Slot for the input file element.

</docs>
    