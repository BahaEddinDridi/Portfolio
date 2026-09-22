"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

/** Motes trailing behind the wisp. Offsets are in px up the rail. */
const TRAIL = [
  { up: 14, side: -7, size: 3, delay: 0 },
  { up: 30, side: 8, size: 2.5, delay: 0.4 },
  { up: 48, side: -5, size: 2, delay: 0.8 },
  { up: 70, side: 6, size: 1.5, delay: 1.2 },
] as const;

interface TimelineRailProps {
  /** 0 at the top of the chronicle, 1 at the bottom. */
  progress: MotionValue<number>;
}

/**
 * The rail the Chronicle hangs from, and the light that walks down it.
 *
 * The rail is always drawn dim; a second copy scales down over it as you
 * scroll, so everything above the wisp is lit and everything below is still
 * waiting. The wisp itself is the only thing that moves with you.
 */
export function TimelineRail({ progress }: TimelineRailProps) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const wispTop = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-[18px] top-4 w-px -translate-x-1/2"
    >
      <div className="bg-gilt/15 absolute inset-0" />

      <motion.div
        className="from-gilt via-gilt/70 to-gilt/40 absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b"
        style={{ scaleY: progress }}
      />
      <motion.div
        className="bg-gilt/25 absolute -inset-x-[3px] top-0 h-full origin-top blur-[3px]"
        style={{ scaleY: progress }}
      />

      <motion.div className="absolute left-1/2 h-0 w-0" style={{ top: wispTop }}>
        <span
          className="absolute rounded-full"
          style={{
            width: 34,
            height: 34,
            marginLeft: -17,
            marginTop: -17,
            background: "radial-gradient(circle, var(--glow) 0%, transparent 70%)",
          }}
        />
        <motion.span
          className="absolute rounded-full bg-[#fff8e6]"
          style={{
            width: 9,
            height: 9,
            marginLeft: -4.5,
            marginTop: -4.5,
            boxShadow: "0 0 16px 5px var(--glow), 0 0 32px 12px var(--halo)",
          }}
          animate={reduceMotion ? undefined : { scale: [1, 1.25, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {!reduceMotion &&
          TRAIL.map((mote, index) => (
            <motion.span
              key={index}
              className="bg-gilt absolute rounded-full"
              style={{
                width: mote.size,
                height: mote.size,
                marginLeft: -mote.size / 2,
                marginTop: -mote.size / 2 + mote.up,
                boxShadow: "0 0 6px 2px var(--glow)",
              }}
              animate={{
                x: [0, mote.side, mote.side * 1.4],
                opacity: [0.9, 0.45, 0],
              }}
              transition={{
                duration: 2.2,
                delay: mote.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
      </motion.div>
    </div>
  );
}
