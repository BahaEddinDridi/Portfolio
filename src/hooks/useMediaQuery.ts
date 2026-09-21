"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Tailwind's `md` breakpoint, the one the layout switches on. */
export const MOBILE_BREAKPOINT = 768;

/**
 * Subscribes to a media query.
 *
 * Uses `useSyncExternalStore` because `matchMedia` is exactly that — an
 * external store. Reading it in an effect and calling `setState` would render
 * once with the wrong answer and then again with the right one.
 *
 * The server snapshot is `false`, so markup matches on first paint and settles
 * during hydration.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    },
    [query]
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** True once the viewport is wider than the mobile breakpoint. */
export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${MOBILE_BREAKPOINT + 1}px)`);
}

/** True once the viewport is at or below the mobile breakpoint. */
export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);
}
