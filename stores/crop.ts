import { useComponent } from "@addeus/vue3-stores/stores/component";
import ACropPrompt from "../components/Prompt/ACropPrompt.vue";
import { useTranslate } from "@addeus/vue3-stores/stores/translate";


export interface CropOptions {
    title?: string;
    confirm?: string;
    cancel?: string;
    modelValue: Blob;
    aspectRatio?: number;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    mimeType?: string;
    quality?: number;
}

export function useCrop() {
    const { initialize, destroy } = useComponent();
    const tTitle = useTranslate(".crop.title");
    const tConfirm = useTranslate(".crop.confirm");
    const tCancel = useTranslate(".crop.cancel");

    return async (blob: Blob | File, options?: CropOptions) : Promise<Blob> => {
        return new Promise((resolve, reject) => {
            let newBlob: Blob | undefined = blob;
            const node = initialize(ACropPrompt, {
                title: tTitle,
                confirm: tConfirm,
                cancel: tCancel,
                ...options,
                modelValue: blob,
                "onUpdate:modelValue"(blobExport) {
                    newBlob = blobExport;
                },
                
                onCancel() {
                    destroy(node);
                    reject(new Error("User cancelled"));
                },
                onConfirm() {
                    destroy(node);
                    resolve(newBlob);
                },
            });
          });
    }
}