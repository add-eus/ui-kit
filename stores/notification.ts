import { MaybeRef, createGlobalState, toValue } from "@vueuse/core";
import { INotyfNotificationOptions, INotyfOptions } from "notyf";
import "notyf/notyf.min.css";
import { Notyf } from "notyf";

const getNotyf = () => {
  if(window.notyf === undefined) {
    window.notyf = new Notyf({
      duration: 5000,
      position: {
        x: "right",
        y: "top",
      },
    });
  }
  return window.notyf;
}

export const useNotification = createGlobalState(() => {
  return {
    dismissAll: () => getNotyf().dismissAll(),
    success(payload: MaybeRef<string | Partial<INotyfNotificationOptions>>) {
      return getNotyf().success(toValue(payload));
    },
    error: (payload: MaybeRef<string | Partial<INotyfNotificationOptions>>) => {
      return getNotyf().error(toValue(payload));
    },
  };
});
