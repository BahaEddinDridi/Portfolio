"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";

import { CategoryFilter } from "@/components/skills/CategoryFilter";
import { ProficiencyLegend } from "@/components/skills/ProficiencyLegend";
import { SkillConnections } from "@/components/skills/SkillConnections";
import { SkillNode } from "@/components/skills/SkillNode";
import { categories, connections, skills } from "@/data/skills";
import { useTheme } from "@/hooks/useTheme";
import { getSkillOpacity, getSkillPosition } from "@/lib/constellation";
import { EASE_OUT_EXPO } from "@/lib/motion";
import type { SkillCategory } from "@/types";

interface SkillConstellationProps {
  /** Entry animations are held until the section scrolls into view. */
  hasAnimated: boolean;
}

/** The star map: filter, connection lines, nodes and the proficiency key. */
export function SkillConstellation({ hasAnimated }: SkillConstellationProps) {
  const { isDark } = useTheme();
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
        initial={{ opacity: 0, y: 18, scale: 0.995 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.04 }}
        className="flex flex-col items-start gap-4 rounded-xl border border-gray-300 p-4 md:gap-6 lg:flex-row dark:border-transparent dark:bg-transparent"
        style={{
          background: isDark
            ? "transparent"
            : "radial-gradient(circle, #001f3f 0%, #0077b6 70%, #00b4d8 100%)",
        }}
      >
        <div className="relative h-[400px] w-full overflow-hidden md:h-[500px] lg:h-[600px] lg:flex-1">
          <SkillConnections
            connections={activeConnections}
            activeCategory={activeCategory}
            hoveredSkill={hoveredSkill}
            isDark={isDark}
            hasAnimated={hasAnimated}
          />

          {skills.map((skill, index) => (
            <SkillNode
              key={skill.name}
              skill={skill}
              index={index}
              position={getSkillPosition(skill, activeCategory)}
              opacity={getSkillOpacity(skill, activeCategory)}
              isHovered={hoveredSkill === skill.name}
              isConnected={connectedSkills.has(skill.name)}
              isDark={isDark}
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
