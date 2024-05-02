import { createGlobalState } from "@vueuse/core";
import { Notyf } from "notyf";
import { toValue } from "@vueuse/core";
import 'notyf/notyf.min.css';

let notyf;

export const useNotification = createGlobalState(() => {

    return {
        success(text) {
            if (!notyf) notyf = new Notyf();
            notyf.success(toValue(text));
        }
    }
});