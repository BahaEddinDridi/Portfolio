"use client";

import { useMemo } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

const EMBER_COUNT = 26;

/** Deterministic, so the server and client agree and nothing pops on hydration. */
function seeded(n: number) {
  const value = Math.sin(n * 12.9898) * 43758.5453;
  return Math.round((value - Math.floor(value)) * 1000) / 1000;
}

/**
 * Embers drifting upward.
 *
 * Replaces the shooting stars. Same idea — motion in the background — but they
 * rise from the bottom of the page like sparks off a fire rather than falling
 * across it like meteors, which is the whole difference between a night sky
 * and a hearth.
 */
export function Embers() {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const embers = useMemo(
    () =>
      Array.from({ length: EMBER_COUNT }, (_, index) => {
        const seed = index + 1;
        return {
          left: seeded(seed * 3) * 100,
          size: 1.5 + seeded(seed * 5) * 3,
          duration: 9 + seeded(seed * 7) * 14,
          delay: -seeded(seed * 11) * 20,
          drift: (seeded(seed * 13) - 0.5) * 120,
          hue: seeded(seed * 17),
        };
      }),
    []
  );

  if (reduceMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {embers.map((ember, index) => (
        <span
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${ember.left}%`,
            bottom: "-6%",
            width: ember.size,
            height: ember.size,
            background:
              ember.hue > 0.72
                ? "var(--arcane)"
                : ember.hue > 0.4
                  ? "var(--gilt-bright)"
                  : "var(--gilt)",
            boxShadow: `0 0 ${ember.size * 3}px ${ember.size}px var(--glow)`,
            animation: `ember-rise ${ember.duration}s linear ${ember.delay}s infinite`,
            ["--ember-drift" as string]: `${ember.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

export default Embers;
