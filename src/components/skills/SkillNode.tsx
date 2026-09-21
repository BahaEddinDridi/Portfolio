"use client";

import { motion } from "motion/react";

import { STAR_PATH } from "@/components/skills/StarGlyph";
import { SkillTooltip } from "@/components/skills/SkillTooltip";
import { popupIconAlias } from "@/data/skills";
import { getIconType, iconComponents } from "@/lib/techIcons";
import { pulseDelays } from "@/lib/constellation";
import { cn } from "@/lib/utils";
import type { Point, Skill } from "@/types";

interface SkillNodeProps {
  skill: Skill;
  position: Point;
  opacity: number;
  index: number;
  isHovered: boolean;
  isConnected: boolean;
  isDark: boolean;
  /** Entry animations wait until the section has scrolled into view. */
  hasAnimated: boolean;
  onHoverChange: (name: string | null) => void;
}

/** Glow colour differs per theme; the light theme uses a warm gold. */
function starFilter(isDark: boolean, isHovered: boolean, isConnected: boolean) {
  const strength = isHovered ? 8 : isConnected ? 6 : 4;
  const alpha = isHovered ? 1 : isConnected ? 0.8 : 0.6;
  return isDark
    ? `drop-shadow(0 0 ${strength}px rgba(255, 255, 255, ${alpha}))`
    : `drop-shadow(0 0 ${strength}px rgba(255, 215, 140, ${alpha - 0.2}))`;
}

export function SkillNode({
  skill,
  position,
  opacity,
  index,
  isHovered,
  isConnected,
  isDark,
  hasAnimated,
  onHoverChange,
}: SkillNodeProps) {
  const iconMeta = iconComponents[getIconType(popupIconAlias[skill.name] ?? skill.name)];
  const delays = pulseDelays[skill.name] ?? { midGlow: 0, starGlow: 0 };

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
        pointerEvents: opacity === 0 ? "none" : "auto",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex h-12 w-12 items-center justify-center">
        <motion.div
          className="group cursor-pointer transition-all duration-700 ease-out"
          initial={{ scale: 0, rotate: -180 }}
          animate={hasAnimated ? { scale: opacity, rotate: 0 } : {}}
          transition={{
            delay: 1.5 + index * 0.08,
            duration: 0.6,
            ease: "easeOut",
            scale: { type: "spring", stiffness: 200, damping: 20 },
          }}
          onMouseEnter={() => onHoverChange(skill.name)}
          onMouseLeave={() => onHoverChange(null)}
        >
          <div className="relative flex items-center justify-center">
            <motion.div
              className={cn(
                "absolute h-12 w-12 rounded-full bg-yellow-200/20 blur-xl dark:bg-white/20",
                isHovered && "h-20 w-20 bg-yellow-200/40 dark:bg-white/40",
                isConnected && !isHovered && "h-16 w-16 bg-yellow-200/30 dark:bg-white/30"
              )}
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className={cn(
                "absolute h-8 w-8 rounded-full bg-yellow-200/40 blur-md dark:bg-white/40",
                isHovered && "h-12 w-12 bg-yellow-200/60 dark:bg-white/60",
                isConnected && !isHovered && "h-10 w-10 bg-yellow-200/50 dark:bg-white/50"
              )}
              animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delays.midGlow,
              }}
            />

            <motion.svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className={cn(
                "relative transition-all duration-300",
                isHovered ? "h-5 w-5" : "h-3 w-3",
                isConnected && !isHovered && "h-4 w-4"
              )}
              style={{
                color: isDark ? "white" : "rgba(255,215,140,0.9)",
                filter: starFilter(isDark, isHovered, isConnected),
              }}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.85, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delays.starGlow,
              }}
              aria-hidden
            >
              <path d={STAR_PATH} />
            </motion.svg>

            <SkillTooltip
              skill={skill}
              icon={iconMeta.component}
              iconColor={iconMeta.color}
              visible={isHovered}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
