import { MaybeRef, createGlobalState, toValue } from "@vueuse/core";
import { INotyfNotificationOptions, INotyfOptions } from "notyf";
import "notyf/notyf.min.css";
import { Notyf } from "notyf";

export const useNotification = createGlobalState(() => {
  const options: Partial<INotyfOptions> = {
    duration: 5000,
    position: {
      x: "right",
      y: "top",
    },
  };
  let notyf: Notyf;
  try {
    notyf = new Notyf(options);
  } catch (error) {
    notyf = new (require("notyf").Notyf)(options);
  }

  return {
    dismissAll: () => notyf.dismissAll(),
    success(payload: MaybeRef<string | Partial<INotyfNotificationOptions>>) {
      return notyf.success(toValue(payload));
    },
    error: (payload: MaybeRef<string | Partial<INotyfNotificationOptions>>) => {
      return notyf.error(toValue(payload));
    },
  };
});
