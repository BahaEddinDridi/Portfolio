"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/**
 * Inlined in `<head>` so the class is on `<html>` before first paint.
 *
 * Without it the page renders in the default theme for a frame and then
 * repaints, which is visible as a flash on every load.
 */
export const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch (e) {}
})();
`.trim();

/** The `dark` class on `<html>` is the store; this watches it for changes. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/** Matches the pre-hydration default so server and client markup agree. */
function getServerSnapshot(): Theme {
  return "dark";
}

interface ThemeValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

/**
 * The app's only theme source.
 *
 * The `dark` class on `<html>` is the single source of truth and everything
 * reads it through here — four components used to run their own
 * `MutationObserver` or their own `localStorage` read, which meant four
 * independent notions of the current theme.
 */
export function useTheme(): ThemeValue {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private browsing can reject writes; the toggle still works in-session.
    }
  }, []);

  return useMemo(
    () => ({ theme, isDark: theme === "dark", toggleTheme }),
    [theme, toggleTheme]
  );
}

