import { useBreakpoints as useBreakpointsVueuse } from "@vueuse/core";

export function useBreakpoints() {
  return useBreakpointsVueuse({
    xl: "1224px",
    lg: "1024px",
    md: "768px",
    sm: "576px",
    xs: "320px",
  });
}
