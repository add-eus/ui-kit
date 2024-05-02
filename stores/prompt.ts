import { useComponent } from "@addeus/vue3-stores/stores/component";
import { Ref } from "vue";
import ADConfirmPrompt from "../components/Prompt/ADConfirmPrompt.vue";
import { useTranslate } from "@addeus/vue3-stores/stores/translate";

export function usePrompt() {
    const { initialize, destroy } = useComponent();
    const { translate } = useTranslate();
    return {
        confirm(options: {
            title?: string | Ref<string>,
            body?: string | Ref<string>
            cancel?: string | Ref<string>,
            confirm?: string | Ref<string>
        } = {}): Promise<boolean> {
            if (options.title === undefined) options.title = translate(".confirm.title");
            if (options.body === undefined) options.body = translate(".confirm.body");
            if (options.cancel === undefined) options.cancel = translate(".confirm.cancel");
            if (options.confirm === undefined) options.confirm = translate(".confirm.confirm");

            return new Promise((resolve, reject) => {
                const node = initialize(ADConfirmPrompt, { 
                    ...options, 
                    onCancel() {
                        destroy(node);
                        resolve(false);
                    },
                    onConfirm() {
                        destroy(node);
                        resolve(true);
                    } 
                });
            
            });
        }
    }
}
