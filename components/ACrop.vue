<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

export interface ACropProps {
    modelValue: Blob;
    aspectRatio?: number;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    mimeType?: string;
    quality?: number;
}

export interface ACropEmits {
    (event: "update:modelValue", value?: any): void;
}

const props = withDefaults(defineProps<ACropProps>(), {
    aspectRatio: undefined,
    minWidth: undefined,
    minHeight: undefined,
    maxWidth: undefined,
    maxHeight: undefined,
    mimeType: undefined,
    quality: undefined,
});

const emit = defineEmits<ACropEmits>();

const initialImageBlob = ref<null|Blob>(props.modelValue || null);

watch(() => props.modelValue, () => {
    if (initialImageBlob.value === null)
        initialImageBlob.value = props.modelValue;
});

const initialImageBlobUrl = computed((oldValue) => {
  if (typeof oldValue === "string")
    URL.revokeObjectURL(oldValue);
  if (initialImageBlob.value !== null)
    return URL.createObjectURL(initialImageBlob.value)
})

const cropperRef = ref<typeof Cropper>();
const getResult = async (
    mimeType: string = "image/png",
    quality: number = 1,
): Promise<string> => {
    const { canvas } = cropperRef.value?.getResult();
    const blob = await new Promise<any>((resolve) =>
        canvas.toBlob(resolve, mimeType, quality),
    );
    return blob;
};

async function change() {
    const result = await getResult(props.mimeType, props.quality);
    emit("update:modelValue", result);
}

defineExpose({ getResult });
</script>

<template>
    <div>
        <cropper
            ref="cropperRef"
            :src="initialImageBlobUrl"
            :stencil-props="{
                aspectRatio: props.aspectRatio,
            }"
            :min-height="props.minHeight"
            :min-width="props.minWidth"
            :max-height="props.maxHeight"
            :max-width="props.maxWidth"
            :size-restrictions-algorithm="(size: any) => size"
            @change="change"
            :default-size="
                ({ imageSize, visibleArea }) => ({
                    width: (visibleArea || imageSize).width,
                    height: (visibleArea || imageSize).height,
                })
            " />
    </div>
</template>
