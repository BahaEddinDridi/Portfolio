"use client";

import { motion } from "motion/react";

import { SkillTooltip } from "@/components/skills/SkillTooltip";
import { StarGlyph } from "@/components/ui/star-glyph";
import { popupIconAlias } from "@/data/skills";
import { pulseDelays } from "@/lib/constellation";
import { getIconType, iconComponents } from "@/lib/techIcons";
import { cn } from "@/lib/utils";
import type { Point, Skill, SkillCategory } from "@/types";

/** Seal colour per school, matching its ring. */
const TONE: Record<SkillCategory, { ring: string; glow: string }> = {
  Frontend: { ring: "var(--verdigris)", glow: "rgba(87,168,148,0.55)" },
  Backend: { ring: "var(--arcane)", glow: "rgba(169,123,224,0.55)" },
  Tools: { ring: "var(--gilt)", glow: "rgba(227,168,87,0.55)" },
};

interface SkillNodeProps {
  skill: Skill;
  position: Point;
  opacity: number;
  index: number;
  isHovered: boolean;
  isConnected: boolean;
  /** Entry animations wait until the section has scrolled into view. */
  hasAnimated: boolean;
  onHoverChange: (name: string | null) => void;
}

/** One skill, as a seal pressed onto the circle. */
export function SkillNode({
  skill,
  position,
  opacity,
  index,
  isHovered,
  isConnected,
  hasAnimated,
  onHoverChange,
}: SkillNodeProps) {
  const meta = iconComponents[getIconType(popupIconAlias[skill.name] ?? skill.name)];
  const Icon = meta.component;
  const tone = TONE[skill.category];
  const delays = pulseDelays[skill.name] ?? { glow: 0, core: 0 };
  const raised = isHovered || isConnected;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
        pointerEvents: opacity === 0 ? "none" : "auto",
      }}
      animate={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        opacity,
      }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.button
        type="button"
        aria-label={`${skill.name}, ${skill.category}`}
        className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border bg-[var(--surface)]/80 backdrop-blur-sm"
        style={{ borderColor: tone.ring }}
        initial={{ scale: 0, rotate: -120 }}
        animate={hasAnimated ? { scale: opacity === 0 ? 0 : 1, rotate: 0 } : {}}
        transition={{
          delay: hasAnimated ? 0.5 + index * 0.05 : 0,
          type: "spring",
          stiffness: 220,
          damping: 18,
        }}
        whileHover={{ scale: 1.15 }}
        onMouseEnter={() => onHoverChange(skill.name)}
        onMouseLeave={() => onHoverChange(null)}
        onFocus={() => onHoverChange(skill.name)}
        onBlur={() => onHoverChange(null)}
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: `0 0 14px 2px ${tone.glow}` }}
          animate={{ opacity: raised ? 1 : [0.35, 0.7, 0.35] }}
          transition={{
            duration: 2.6,
            repeat: raised ? 0 : Infinity,
            ease: "easeInOut",
            delay: delays.glow,
          }}
        />

        <Icon
          className={cn(
            "relative transition-all duration-300",
            raised ? "h-5 w-5" : "h-[18px] w-[18px]"
          )}
          style={{ color: raised ? meta.color : undefined }}
        />

        <StarGlyph
          className={cn(
            "absolute -right-1 -top-1 h-2 w-2 transition-opacity duration-300",
            raised ? "opacity-100" : "opacity-0"
          )}
          // The accent star picks up the ring colour.
        />
      </motion.button>

      <SkillTooltip
        skill={skill}
        icon={Icon}
        iconColor={meta.color}
        visible={isHovered}
      />
    </motion.div>
  );
}
