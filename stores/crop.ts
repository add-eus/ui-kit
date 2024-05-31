import { useComponent } from "@addeus/vue3-stores/stores/component";
import { ref } from "vue";
import AConfirmPrompt from "../components/Prompt/AConfirmPrompt.vue";
import ACropPrompt from "../components/Prompt/ACropPrompt.vue";
import { useTranslate } from "@addeus/vue3-stores/stores/translate";

// export function usePrompt() {
//   const { initialize, destroy } = useComponent();
//   const { translate } = useTranslate();
//   return {
//     confirm(
//       options: {
//         title?: string | Ref<string>;
//         body?: string | Ref<string>;
//         cancel?: string | Ref<string>;
//         confirm?: string | Ref<string>;
//       } = {}
//     ): Promise<boolean> {
//       if (options.title === undefined)
//         options.title = translate(".confirm.title");
//       if (options.body === undefined) options.body = translate(".confirm.body");
//       if (options.cancel === undefined)
//         options.cancel = translate(".confirm.cancel");
//       if (options.confirm === undefined)
//         options.confirm = translate(".confirm.confirm");

//       return new Promise((resolve, reject) => {
//         const node = initialize(AConfirmPrompt, {
//           ...options,
//           onCancel() {
//             destroy(node);
//             resolve(false);
//           },
//           onConfirm() {
//             destroy(node);
//             resolve(true);
//           },
//         });
//       });
//     },
//   };
// }

export interface CropOptions {
    title: string;
    confirm: string;
    cancel: string;
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
    const { translate } = useTranslate();

    return async (blob: Blob | File, options?: CropOptions) : Promise<Blob> => {
        return new Promise((resolve, reject) => {
            let newBlob: Blob | undefined = blob;
            const node = initialize(ACropPrompt, {
                title: translate(".crop.title"),
                confirm: translate(".crop.confirm"),
                cancel: translate(".crop.cancel"),
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