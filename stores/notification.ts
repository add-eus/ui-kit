import { MaybeRef, createGlobalState, toValue } from "@vueuse/core";
import { INotyfNotificationOptions, INotyfOptions } from "notyf";
import "notyf/notyf.min.css";
import { Notyf } from "notyf";
import { useColor } from "./color";

const getNotyf = (): Notyf => {
  if ((window as any).notyf === undefined) {
    (window as any).notyf = new Notyf({
      duration: 5000,
      dismissible: true,
      position: {
        x: "right",
        y: "top",
      },
    });
  }
  return (window as any).notyf;
};

class Notification {
  private options: Partial<INotyfNotificationOptions>;
  private notyf: Notyf;
  private internalNotification: any;

  constructor(data: Partial<INotyfNotificationOptions>) {
    this.options = data;
    this.notyf = getNotyf();
  }

  show() {
    this.internalNotification = this.notyf.open(this.options);
  }

  close() {
    this.notyf.dismiss(this.internalNotification);
  }
}

export const useNotification = createGlobalState(() => {
  const colors = {
    default: useColor("grey-lightest"),
    warning: useColor("warning-lightest"),
    success: useColor("success-lightest"),
    info: useColor("info-lightest"),
    error: useColor("danger-lightest"),
  };

  const createNotification = (
    type: keyof typeof colors,
    payload: MaybeRef<string | Partial<INotyfNotificationOptions>>
  ) => {
    let payloadValue = toValue(payload);

    if (typeof payloadValue === "string") {
      payloadValue = { message: payloadValue };
    }

    // payloadValue.type = type;
    payloadValue.className = `notyf__toast--${type}`;
    payloadValue.background = colors[type].value;

    const notification = new Notification(payloadValue);
    notification.show();
    return notification;
  };

  return {
    dismissAll: () => getNotyf().dismissAll(),
    default: (payload) => createNotification("default", payload),
    warning: (payload) => createNotification("warning", payload),
    success: (payload) => createNotification("success", payload),
    info: (payload) => createNotification("info", payload),
    error: (payload) => createNotification("error", payload),
  };
});
