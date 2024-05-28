import { toValue, useCssVar } from "@vueuse/core";
import type { Ref, MaybeRef } from "vue";

export type Colors =
  | "default-darker"
  | "default-dark"
  | "default"
  | "default-light"
  | "default-lighter"
  | "primary-darker"
  | "primary-dark"
  | "primary"
  | "primary-light"
  | "primary-lighter"
  | "primary-lightest"
  | "secondary-darker"
  | "secondary-dark"
  | "secondary"
  | "secondary-light"
  | "secondary-lighter"
  | "secondary-lightest"
  | "tertiary-darker"
  | "tertiary-dark"
  | "tertiary"
  | "tertiary-light"
  | "tertiary-lighter"
  | "tertiary-lightest"
  | "danger-darker"
  | "danger-dark"
  | "danger"
  | "danger-light"
  | "danger-lighter"
  | "danger-lightest"
  | "warning-darker"
  | "warning-dark"
  | "warning"
  | "warning-light"
  | "warning-lighter"
  | "warning-lightest"
  | "success-darker"
  | "success-dark"
  | "success"
  | "success-light"
  | "success-lighter"
  | "success-lightest"
  | "info-darker"
  | "info-dark"
  | "info"
  | "info-light"
  | "info-lighter"
  | "info-lightest"
  | "black"
  | "grey-darker"
  | "grey-dark"
  | "grey"
  | "grey-light"
  | "grey-lighter"
  | "grey-lightest"
  | "white"
  | "gold"
  | "silver"
  | "bronze"
  | "orange"
  | "yellow"
  | "green"
  | "turquoise"
  | "cyan"
  | "blue-dark"
  | "blue"
  | "purple"
  | "red"
  | "violet";

export type Hues = "default" | "dark" | "darker" | "light" | "lighter";

export function useColor(
  color: MaybeRef<Colors | undefined> | Colors,
  hue: MaybeRef<Hues> = "default",
  isInverted: MaybeRef<boolean> = false
) {
  return useCssVar(() => {
    let colorValue = toValue(color);
    const hueValue = toValue(hue);
    let isInvertedValue = toValue(isInverted);

    // If no color defined return transparent main and grey inverted
    if (!colorValue) {
      if (isInvertedValue) {
        colorValue = "grey";
        isInvertedValue = false;
      }
      else 
        return "default";

    }
    return `--a-${colorValue}${hueValue === "default" ? "" : `-${hueValue}`}${
      isInvertedValue ? "-invert" : ""
    }`;
  }, document.body);
}
