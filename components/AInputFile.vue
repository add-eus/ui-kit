<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import type { PropType } from "vue";
import { ref, watch } from "vue";

interface AInputFileEmits {
  (e: "delete", index: number): boolean;
  (e: "update:modelValue", files: Array<string> | string | undefined): boolean;
  (e: "update:selectedFilesCount", count: number): void;
  (
    e: "process-files",
    files: FileList,
    callback: (response: FileUploadResponse[]) => void
  ): void;
}

export interface FileUploadResponse {
  path?: string;
  errors?: string[];
  name?: string,
  mimeType? : string,
  size?: number,
}

interface AInputFileProps {
  multiple: boolean;
  modelValue: Array<string> | string | undefined;
  accept: string;
}

const props = withDefaults(defineProps<AInputFileProps>(), {
  multiple: false,
  modelValue: undefined,
  accept: "image/*",
});
const emits = defineEmits<AInputFileEmits>();

const filesModel = useVModel(props, "modelValue", emits);
const lastUploadErrors = ref<string[][]>([]);
const input = ref<HTMLInputElement>();
const selectedFilesCount = ref(0);

const openFileSelector = async (index?: number): Promise<void> => {
  const inputPromise = new Promise<FileList>((resolve, reject) => {
    if (!input.value)
      return;
    input.value.value = '';
    input.value.multiple = props.multiple;
    input.value.accept = props.accept;
    input.value.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        resolve(files);
      } else {
        reject("No files selected");
      }
    };
    input.value.click();
  });

  const fileList = await inputPromise;

  // UPDATE SELECTED FILES COUNT
  selectedFilesCount.value = fileList.length;

  updateLoadingFiles(fileList, index);

  // Traiter les fichiers sélectionnés
  const processFilePromise = new Promise<FileUploadResponse[]>((resolve) => {
    emits("process-files", fileList, (response) => {
      resolve(response);
    });
  });

  const files = await processFilePromise;

  addFiles(files, index);

  selectedFilesCount.value = 0;
};

//EMIT UPDATE SELECTED FILES COUNT AND RESET VALUE
const updateLoadingFiles = (fileList: FileList, index?: number) => {
  emits("update:selectedFilesCount", fileList.length);
  selectedFilesCount.value = 0;
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
  const hasNewFiles = files.some(({ path }) => path !== undefined);
  if (hasNewFiles && props.multiple) {
    if (filesModel.value === undefined) filesModel.value = [];
    if (filesModel.value.constructor !== Array)
      throw new Error("props multiple is true but filesModel is not an array");
    const newFilePaths = files
      .filter(({ path }) => path !== undefined)
      .map((file) => file.path!);
    if (index !== undefined) {
      filesModel.value = [
        ...filesModel.value.slice(0, index),
        ...newFilePaths,
        ...filesModel.value.slice(index + 1),
      ];
    } else {
      filesModel.value = [...filesModel.value, ...newFilePaths];
    }
  } else if (hasNewFiles) {
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
  <input type="file" style="display: none" ref="input" />
  <slot
    :openFileSelector="openFileSelector"
    :deleteFile="deleteFile"
    :errors="lastUploadErrors"
    :input="input"
  ></slot>
</template>
