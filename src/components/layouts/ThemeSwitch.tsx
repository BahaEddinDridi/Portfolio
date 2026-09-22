"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTheme } from "@/hooks/useTheme";

/** How long the flame takes to convert from one school to the other. */
const CONVERSION_MS = 900;
/** The point in the conversion where the page itself flips. */
const SWAP_MS = 440;

/** Three motes on deliberately coprime periods, so they never re-align. */
const MOTES = [
  { radius: 24, size: 4, duration: 7, delay: 0 },
  { radius: 24, size: 3, duration: 11, delay: -3 },
  { radius: 24, size: 2.5, duration: 4, delay: -1.5 },
] as const;

/**
 * The theme toggle: one soul-flame that converts rather than two icons that
 * swap. Witchfire pinches down to a single spark, the page changes underneath
 * it, then it blooms back out as a haloed holy flame.
 */
export function ThemeSwitch() {
  const { isDark, toggleTheme } = useTheme();
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [converting, setConverting] = useState(false);

  const handleClick = () => {
    if (reduceMotion) {
      toggleTheme();
      return;
    }
    if (converting) return;

    setConverting(true);
    window.setTimeout(toggleTheme, SWAP_MS);
    window.setTimeout(() => setConverting(false), CONVERSION_MS);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isDark ? "Call the holy light" : "Return to the witching hour"}
      className="relative h-14 w-14 cursor-pointer border-none bg-transparent p-0"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full transition-colors duration-500"
        style={{
          background: `radial-gradient(circle, var(--halo) 0%, transparent 68%)`,
        }}
      />

      {!reduceMotion &&
        MOTES.map((mote, index) => (
          <motion.span
            key={index}
            aria-hidden
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: mote.size,
              height: mote.size,
              marginLeft: -mote.size / 2,
              marginTop: -mote.size / 2,
              background: isDark ? "var(--arcane)" : "var(--gilt)",
              boxShadow: `0 0 8px 2px var(--halo)`,
              originX: 0.5,
              originY: 0.5,
            }}
            animate={{
              x: [0, mote.radius, 0, -mote.radius, 0],
              y: [-mote.radius, 0, mote.radius, 0, -mote.radius],
              opacity: converting ? 0 : [0.5, 1, 0.5, 1, 0.5],
            }}
            transition={{
              duration: mote.duration,
              delay: mote.delay,
              repeat: Infinity,
              ease: "linear",
              opacity: { duration: 0.3 },
            }}
          />
        ))}

      <svg
        viewBox="0 0 56 56"
        className="absolute inset-0 h-14 w-14"
        aria-hidden
      >
        <AnimatePresence mode="wait">
          {converting ? (
            <motion.g
              key="spark"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.circle
                cx="28"
                cy="28"
                r={0}
                fill="#fff8e6"
                initial={{ r: 0 }}
                animate={{ r: [0, 6, 22, 0] }}
                transition={{ duration: CONVERSION_MS / 1000, times: [0, 0.45, 0.7, 1] }}
              />
              <motion.circle
                cx="28"
                cy="28"
                r={2}
                fill="none"
                stroke="var(--gilt-bright)"
                strokeWidth="1.5"
                initial={{ r: 2, opacity: 0 }}
                animate={{ r: [2, 4, 26], opacity: [0, 1, 0] }}
                transition={{ duration: CONVERSION_MS / 1000, times: [0, 0.5, 1] }}
              />
            </motion.g>
          ) : isDark ? (
            <Witchfire key="witchfire" reduceMotion={reduceMotion} />
          ) : (
            <HolyFlame key="holy" reduceMotion={reduceMotion} />
          )}
        </AnimatePresence>
      </svg>
    </button>
  );
}

/** Night: a violet flame in a broken summoning ring. */
function Witchfire({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.3 }}
      style={{ originX: "28px", originY: "28px" }}
    >
      <motion.circle
        cx="28"
        cy="28"
        r="25"
        fill="none"
        stroke="var(--arcane)"
        strokeOpacity="0.5"
        strokeWidth="1"
        strokeDasharray="2 7"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        style={{ originX: "28px", originY: "28px" }}
      />
      <circle
        cx="28"
        cy="28"
        r="19"
        fill="none"
        stroke="var(--arcane)"
        strokeOpacity="0.22"
        strokeWidth="1"
      />
      <motion.g
        animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "28px", originY: "31px" }}
      >
        <circle cx="28" cy="31" r="10" fill="var(--arcane)" fillOpacity="0.28" />
        <path
          d="M28 15 c-4.7 7.4 -7 10.2 -7 14.2 a7 7 0 0 0 14 0 C35 25.2 32.7 22.4 28 15 Z"
          fill="#7f4fc9"
        />
        <path
          d="M28 22 c-2.3 3.9 -3.4 5.3 -3.4 7.3 a3.4 3.4 0 0 0 6.8 0 C31.4 27.3 30.3 25.9 28 22 Z"
          fill="#e8d4fa"
        />
      </motion.g>
    </motion.g>
  );
}

/** Day: a gold flame under a closed halo, with rays instead of motes. */
function HolyFlame({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.3 }}
      style={{ originX: "28px", originY: "28px" }}
    >
      <g stroke="#b8842a" strokeOpacity="0.5" strokeWidth="1.6" strokeLinecap="round">
        <path d="M28 3 V9" />
        <path d="M28 47 V53" />
        <path d="M3 28 H9" />
        <path d="M47 28 H53" />
      </g>
      <ellipse
        cx="28"
        cy="17"
        rx="14"
        ry="4"
        fill="none"
        stroke="#c8912f"
        strokeWidth="2.2"
      />
      <motion.g
        animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "28px", originY: "34px" }}
      >
        <path
          d="M28 16 c-4.7 8 -7 11 -7 15 a7 7 0 0 0 14 0 C35 27 32.7 24 28 16 Z"
          fill="#e8a63a"
        />
        <path
          d="M28 23 c-2.3 4 -3.4 5.4 -3.4 7.4 a3.4 3.4 0 0 0 6.8 0 C31.4 28.4 30.3 27 28 23 Z"
          fill="#fff8e6"
        />
      </motion.g>
    </motion.g>
  );
}

export default ThemeSwitch;
