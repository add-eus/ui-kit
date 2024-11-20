import { MaybeRef, createGlobalState, toValue } from "@vueuse/core";
import { INotyfNotificationOptions, INotyfOptions } from "notyf";
import "notyf/notyf.min.css";
import { Notyf } from "notyf";
import { useColor } from "./color";

const getNotyf = () : Notyf => {
  if((window as any).notyf === undefined) {
    (window as any).notyf = new Notyf({
      duration: 5000,
      position: {
        x: "right",
        y: "top",
      }
    });
  }
  return (window as any).notyf;
}

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
  const colorInfo = useColor("info");
  const colorSuccess = useColor("success");
  const colorError = useColor("danger");
  return {
    dismissAll: () => getNotyf().dismissAll(),
    success(payload: MaybeRef<string | Partial<INotyfNotificationOptions>>) {
      let payloadValue = toValue(payload);

      if (typeof payloadValue === "string") 
        payloadValue = {
          message: payloadValue
        };
      
      payloadValue.type = "success";
      payloadValue.background = colorSuccess.value;
      const notification = new Notification(payloadValue)
      notification.show();
      return notification;
    },
    error: (payload: MaybeRef<string | Partial<INotyfNotificationOptions>>) => {
      let payloadValue = toValue(payload);

      if (typeof payloadValue === "string") 
        payloadValue = {
          message: payloadValue
        };
      
      payloadValue.type = "error";
      payloadValue.background = colorError.value;
      const notification = new Notification(payloadValue)
      notification.show();
      return notification;
    },
    info: (payload: MaybeRef<string | Partial<INotyfNotificationOptions>>) => {
      let payloadValue = toValue(payload);

      if (typeof payloadValue === "string") 
        payloadValue = {
          message: payloadValue
        };
      
      payloadValue.type = "info";
      payloadValue.background = colorInfo.value;
      const notification = new Notification(payloadValue)
      notification.show();
      return notification;
    }
  };
});
