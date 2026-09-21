"use client";

import { LottieSvg } from "lottie-react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface LottiePlayerProps {
  /** URL of the animation JSON, from `@/data/lotties`. */
  src: string;
  className?: string;
  loop?: boolean;
  /** Decorative by default; give a label when the animation carries meaning. */
  label?: string;
}

/**
 * The app's only Lottie call site.
 *
 * Keeping the library behind one component meant the v2 -> v3 API change
 * (`animationData` object -> `src` URL, default export -> named) was a one-file
 * edit rather than a four-file one.
 *
 * Every animation here is decorative and loops indefinitely, which WCAG 2.2.2
 * asks to be stoppable. Rather than put a pause button on a background
 * flourish, they simply do not start when the viewer has asked for reduced
 * motion.
 */
export function LottiePlayer({
  src,
  className,
  loop = true,
  label,
}: LottiePlayerProps) {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <LottieSvg
      src={src}
      autoplay={!prefersReducedMotion}
      loop={loop && !prefersReducedMotion}
      className={cn("h-full w-full", className)}
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
