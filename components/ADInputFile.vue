<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import type { PropType } from "vue";
import { ref } from "vue";

interface ADInputFileEmits {
  (e: "delete", index: number): boolean;
  (e: "update:modelValue", files: Array<string> | string | undefined): boolean;
  (
    e: "process-files",
    files: FileList,
    callback: (response: FileUploadResponse[]) => void
  ): void;
}

export interface FileUploadResponse {
  path?: string;
  errors?: string[];
}

const props = defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Object as PropType<Array<string> | string | undefined>,
    default: undefined,
  },
});
const emits = defineEmits<ADInputFileEmits>();

const filesModel = useVModel(props, "modelValue", emits);
const lastUploadErrors = ref<string[][]>([]);

const openFileSelector = async (index?: number): Promise<void> => {
  const inputPromise = new Promise<FileList>((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = props.multiple;
    input.accept = "image/*";
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        resolve(files);
      } else {
        reject("No files selected");
      }
    };
    input.click();
  });
  const fileList = await inputPromise;
  const processFilePromise = new Promise<FileUploadResponse[]>((resolve) => {
    emits("process-files", fileList, (response) => {
      resolve(response);
    });
  });
  const files = await processFilePromise;
  addFiles(files, index);
};

const deleteFile = (index?: number) => {
  if (props.multiple) {
    if (index === undefined)
      throw new Error("Index is required for multiple files");
    if (filesModel.value === undefined) filesModel.value = [];
    if (filesModel.value.constructor !== Array)
      throw new Error("props multiple is true but files is not an array");
    filesModel.value = [
      ...filesModel.value.slice(0, index),
      ...filesModel.value.slice(index + 1),
    ];
  } else {
    filesModel.value = undefined;
  }
};

const addFiles = (files: FileUploadResponse[], index?: number) => {
  if (props.multiple) {
    if (filesModel.value === undefined) filesModel.value = [];
    if (filesModel.value.constructor !== Array)
      throw new Error("props multiple is true but filesModel is not an array");
    if (index !== undefined) {
      filesModel.value = [
        ...filesModel.value.slice(0, index),
        ...files
          .filter(({ path }) => path !== undefined)
          .map((file) => file.path!),
        ...filesModel.value.slice(index + 1),
      ];
    } else {
      filesModel.value = [
        ...filesModel.value,
        ...files
          .filter(({ path }) => path !== undefined)
          .map((file) => file.path!),
      ];
    }
  } else {
    if (files.length !== 1)
      throw new Error("Multiple files uploaded but multiple is false");
    filesModel.value = files[0].path;
  }
  lastUploadErrors.value = files
    .filter(({ errors }) => errors !== undefined)
    .map(({ errors }) => errors!);
};
</script>

<template>
  <slot :openFileSelector="openFileSelector" :deleteFile="deleteFile" :errors="lastUploadErrors"> </slot>
</template>
