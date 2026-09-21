"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";

import { LoadingScreen } from "@/components/layouts/LoadingScreen";

/** Kept long enough that the splash reads as intentional rather than a flicker. */
const MIN_DURATION_MS = 700;

/**
 * Splash screen shown over the page on first load.
 *
 * It overlays the content rather than replacing it, so the sections are in the
 * server-rendered HTML from the start — the previous version gated every
 * section behind this state, which left crawlers an empty page.
 */
export function LoadingOverlay() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), MIN_DURATION_MS);
    return () => window.clearTimeout(timeout);
  }, []);

  return <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>;
}
