"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";

import { CategoryFilter } from "@/components/skills/CategoryFilter";
import { ProficiencyLegend } from "@/components/skills/ProficiencyLegend";
import { SkillConnections } from "@/components/skills/SkillConnections";
import { SkillNode } from "@/components/skills/SkillNode";
import { SummoningRing } from "@/components/skills/SummoningRing";
import { StarGlyph } from "@/components/ui/star-glyph";
import { categories, connections, skills } from "@/data/skills";
import { getSkillOpacity, getSkillPosition } from "@/lib/constellation";
import { EASE_OUT_EXPO } from "@/lib/motion";
import type { SkillCategory } from "@/types";

interface SkillConstellationProps {
  /** Entry animations are held until the section scrolls into view. */
  hasAnimated: boolean;
}

/** The circle: schools filter, binding lines, seals and the proficiency key. */
export function SkillConstellation({ hasAnimated }: SkillConstellationProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const activeConnections = useMemo(
    () =>
      activeCategory === "All"
        ? Object.values(connections).flat()
        : (connections[activeCategory as SkillCategory] ?? []),
    [activeCategory]
  );

  /** Every skill sharing a line with the hovered one, so both ends light up. */
  const connectedSkills = useMemo(() => {
    if (!hoveredSkill) return new Set<string>();
    const result = new Set<string>();
    for (const [from, to] of activeConnections) {
      if (hoveredSkill === from || hoveredSkill === to) {
        result.add(from);
        result.add(to);
      }
    }
    return result;
  }, [activeConnections, hoveredSkill]);

  return (
    <>
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onChange={setActiveCategory}
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.04 }}
        className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-12"
      >
        {/*
         * Square on purpose: the ring geometry is percentage-based, so a
         * non-square box would squash the circles into ellipses.
         */}
        <div className="relative aspect-square w-full max-w-[min(100%,34rem)] flex-shrink-0">
          <div
            aria-hidden
            className="absolute inset-[12%] rounded-full"
            style={{
              background:
                "radial-gradient(circle, var(--glow) 0%, transparent 62%)",
              opacity: 0.6,
            }}
          />

          <SummoningRing activeCategory={activeCategory} />

          <SkillConnections
            connections={activeConnections}
            activeCategory={activeCategory}
            hoveredSkill={hoveredSkill}
            hasAnimated={hasAnimated}
          />

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <StarGlyph className="text-gilt-bright h-6 w-6 drop-shadow-[0_0_10px_var(--glow)]" />
          </div>

          {skills.map((skill, index) => (
            <SkillNode
              key={skill.name}
              skill={skill}
              index={index}
              position={getSkillPosition(skill, activeCategory)}
              opacity={getSkillOpacity(skill, activeCategory)}
              isHovered={hoveredSkill === skill.name}
              isConnected={connectedSkills.has(skill.name)}
              hasAnimated={hasAnimated}
              onHoverChange={setHoveredSkill}
            />
          ))}
        </div>

        <ProficiencyLegend />
      </motion.div>
    </>
  );
}
