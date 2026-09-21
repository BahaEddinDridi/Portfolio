"use client";

import { motion } from "motion/react";

import { getSkillOpacity, getSkillPosition, skillByName } from "@/lib/constellation";
import type { SkillConnection } from "@/types";

interface SkillConnectionsProps {
  connections: SkillConnection[];
  activeCategory: string;
  hoveredSkill: string | null;
  isDark: boolean;
  hasAnimated: boolean;
}

/** Stroke and glow for a line, which differ per theme and highlight state. */
function lineStyle(isDark: boolean, isHighlighted: boolean) {
  if (isDark) {
    return {
      stroke: isHighlighted ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
      filter: isHighlighted ? "drop-shadow(0 0 4px rgba(255,255,255,0.8))" : "none",
    };
  }
  return {
    stroke: isHighlighted ? "rgba(255,215,140,0.9)" : "rgba(255,215,140,0.5)",
    filter: isHighlighted
      ? "drop-shadow(0 0 4px rgba(255,215,140,0.5))"
      : "drop-shadow(0 0 2px rgba(255,215,140,0.2))",
  };
}

/** The lines joining the constellation's stars, drawn on beneath the nodes. */
export function SkillConnections({
  connections,
  activeCategory,
  hoveredSkill,
  isDark,
  hasAnimated,
}: SkillConnectionsProps) {
  return (
    <svg
      className="absolute inset-0 h-full w-full transition-all duration-700 ease-out"
      style={{ filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))" }}
      aria-hidden
    >
      {connections.map(([from, to], index) => {
        const fromSkill = skillByName[from];
        const toSkill = skillByName[to];
        if (!fromSkill || !toSkill) return null;

        const fromPos = getSkillPosition(fromSkill, activeCategory);
        const toPos = getSkillPosition(toSkill, activeCategory);
        const opacity = Math.min(
          getSkillOpacity(fromSkill, activeCategory),
          getSkillOpacity(toSkill, activeCategory)
        );

        const isHighlighted = hoveredSkill === from || hoveredSkill === to;
        const { stroke, filter } = lineStyle(isDark, isHighlighted);

        return (
          <motion.line
            key={`${from}-${to}`}
            x1={`${fromPos.x}%`}
            y1={`${fromPos.y}%`}
            x2={`${toPos.x}%`}
            y2={`${toPos.y}%`}
            stroke={stroke}
            strokeWidth={isHighlighted ? 2 : 1}
            className="transition-all duration-700"
            style={{ filter, opacity }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={hasAnimated ? { pathLength: opacity, opacity } : {}}
            transition={{
              pathLength: {
                delay: 0.6 + index * 0.05,
                duration: 0.5,
                ease: "easeInOut",
              },
              opacity: { delay: 1.8 + index * 0.05, duration: 0.3 },
            }}
          />
        );
      })}
    </svg>
  );
}
