import { toValue, useCssVar } from "@vueuse/core";
import type { Ref, MaybeRef } from "vue";

export type Colors =
    | "primary"
    | "primary-dark"
    | "primary-light"
    | "info"
    | "info-light"
    | "info-dark"
    | "warning"
    | "warning-light"
    | "warning-dark"
    | "danger"
    | "danger-light"
    | "danger-dark"
    | "success"
    | "success-light"
    | "success-dark"
    | "black-bis"
    | "black-ter"
    | "grey-darker"
    | "grey-dark"
    | "grey"
    | "grey-light"
    | "grey-lighter"
    | "white-ter"
    | "white-bis"
    | "gold"
    | "silver"
    | "bronze"
    | "orange"
    | "yellow"
    | "green"
    | "turquoise"
    | "cyan"
    | "blue"
    | "purple"
    | "red";

export type Hues = "default"
    | "dark"
    | "darker"
    | "light"
    | "lighter";

export function useColor(color: MaybeRef<Colors> | Colors, hue: MaybeRef<Hues> = 'default', isInverted: MaybeRef<boolean> = false) {
    return useCssVar(() => {
        const colorValue = toValue(color);
        const hueValue = toValue(hue);
        const isInvertedValue = toValue(hueValue);
        return `--ad-${colorValue}${hueValue === 'default' ? '' : `-${hueValue}`}${isInverted ? '-invert' : ''}`;
    }, document.body);
}
