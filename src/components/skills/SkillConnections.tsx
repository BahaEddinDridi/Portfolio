"use client";

import { motion } from "motion/react";

import { getSkillOpacity, getSkillPosition, skillByName } from "@/lib/constellation";
import type { SkillConnection } from "@/types";

interface SkillConnectionsProps {
  connections: SkillConnection[];
  activeCategory: string;
  hoveredSkill: string | null;
  hasAnimated: boolean;
}

/**
 * The lines binding the seals.
 *
 * Drawn in a 0-100 viewBox on the same square as the ring, so a chord between
 * two seals is a straight line rather than a skewed one.
 */
export function SkillConnections({
  connections,
  activeCategory,
  hoveredSkill,
  hasAnimated,
}: SkillConnectionsProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {connections.map(([from, to], index) => {
        const fromSkill = skillByName[from];
        const toSkill = skillByName[to];
        if (!fromSkill || !toSkill) return null;

        const a = getSkillPosition(fromSkill, activeCategory);
        const b = getSkillPosition(toSkill, activeCategory);
        const opacity = Math.min(
          getSkillOpacity(fromSkill, activeCategory),
          getSkillOpacity(toSkill, activeCategory)
        );
        const lit = hoveredSkill === from || hoveredSkill === to;

        return (
          <motion.line
            key={`${from}-${to}`}
            stroke="var(--gilt)"
            strokeWidth={lit ? 0.45 : 0.18}
            strokeOpacity={lit ? 0.95 : 0.3}
            style={{ filter: lit ? "drop-shadow(0 0 1px var(--gilt))" : undefined }}
            animate={{
              x1: a.x,
              y1: a.y,
              x2: b.x,
              y2: b.y,
              opacity: hasAnimated ? opacity : 0,
              pathLength: hasAnimated ? 1 : 0,
            }}
            initial={{ x1: a.x, y1: a.y, x2: a.x, y2: a.y, opacity: 0, pathLength: 0 }}
            transition={{
              x1: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
              y1: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
              x2: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
              y2: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
              pathLength: { delay: 0.3 + index * 0.03, duration: 0.5 },
              opacity: { delay: 0.3 + index * 0.03, duration: 0.4 },
            }}
          />
        );
      })}
    </svg>
  );
}
