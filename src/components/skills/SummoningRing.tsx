"use client";

import { motion } from "motion/react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CATEGORY_ORDER, getRingRadius } from "@/lib/constellation";
import type { SkillCategory } from "@/types";

/** Ring stroke per school, so the three read as distinct orders of magic. */
const RING_STROKE: Record<SkillCategory, string> = {
  Frontend: "var(--verdigris)",
  Backend: "var(--arcane)",
  Tools: "var(--gilt)",
};

/** Four daggers and four stars around the outer edge. No six-pointed shapes. */
const MARKS = ["†", "✦", "‡", "✦", "†", "✦", "‡", "✦"];

interface SummoningRingProps {
  activeCategory: string;
}

/**
 * The diagram the seals are pinned to.
 *
 * Drawn in a 0-100 viewBox with `preserveAspectRatio` left at its default, so
 * it scales with the square container and stays circular. Everything here is
 * decoration: the nodes and their connections are separate layers on top.
 */
export function SummoningRing({ activeCategory }: SummoningRingProps) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const soloed = activeCategory !== "All";

  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <circle cx="50" cy="50" r="47" fill="none" stroke="var(--gilt)" strokeOpacity="0.16" strokeWidth="0.25" />
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="var(--gilt)"
        strokeOpacity="0.3"
        strokeWidth="0.2"
        strokeDasharray="0.6 2.4"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        style={{ originX: "50px", originY: "50px" }}
      />

      {/* Two squares at 45 degrees: an octagram, never a hexagram. */}
      <motion.g
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
        style={{ originX: "50px", originY: "50px" }}
        opacity={soloed ? 0.1 : 0.22}
      >
        <path d="M23 23 H77 V77 H23 Z" fill="none" stroke="var(--gilt)" strokeWidth="0.2" />
        <path d="M50 12 L88 50 L50 88 L12 50 Z" fill="none" stroke="var(--gilt)" strokeWidth="0.2" />
      </motion.g>

      {CATEGORY_ORDER.map((category) => {
        const radius = getRingRadius(category, activeCategory);
        const dimmed = soloed && activeCategory !== category;
        return (
          <motion.circle
            key={category}
            cx="50"
            cy="50"
            /* An initial `r` is required: animating it alone leaves the
               attribute undefined on the first paint, which SVG rejects. */
            r={radius}
            fill="none"
            stroke={RING_STROKE[category]}
            strokeWidth="0.2"
            strokeDasharray="0.5 2"
            initial={{ r: radius, opacity: 0 }}
            animate={{ r: radius, opacity: dimmed ? 0 : 0.45 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        );
      })}

      <circle cx="50" cy="50" r="7" fill="none" stroke="var(--gilt)" strokeOpacity="0.35" strokeWidth="0.2" />
      <circle cx="50" cy="50" r="6" fill="var(--gilt)" fillOpacity="0.05" />

      <g fill="var(--gilt)" fillOpacity="0.4" fontSize="3.2" textAnchor="middle" fontFamily="var(--font-cinzel), serif">
        {MARKS.map((mark, index) => {
          const angle = (index * 45 + 22.5) * (Math.PI / 180);
          return (
            <text
              key={index}
              x={50 + Math.cos(angle) * 47}
              y={50 - Math.sin(angle) * 47 + 1.1}
            >
              {mark}
            </text>
          );
        })}
      </g>
    </svg>
  );
}
