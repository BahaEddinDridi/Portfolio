import { scatteredPositions, skills } from "@/data/skills";
import type { Point, Skill, SkillCategory } from "@/types";

/** How far each category's constellation is blown up when viewed on its own. */
const SCALE_FACTORS: Record<SkillCategory, number> = {
  Frontend: 2.2,
  Backend: 1.7,
  Tools: 2.0,
};

/**
 * Re-centres one category's constellation on the canvas.
 *
 * The scattered layout spreads all three categories across the panel. When a
 * single category is selected its stars are scaled about their own bounding-box
 * centre and moved to the middle, so the shape a viewer just saw is preserved
 * rather than re-laid out.
 */
function centreCategory(categorySkills: Skill[], scale: number) {
  const points = categorySkills.map(
    (skill) => scatteredPositions[skill.name] ?? { x: skill.x, y: skill.y }
  );

  const centreX = (Math.min(...points.map((p) => p.x)) + Math.max(...points.map((p) => p.x))) / 2;
  const centreY = (Math.min(...points.map((p) => p.y)) + Math.max(...points.map((p) => p.y))) / 2;

  const result: Record<string, Point> = {};
  categorySkills.forEach((skill, index) => {
    result[skill.name] = {
      x: 50 + (points[index].x - centreX) * scale,
      y: 50 + (points[index].y - centreY) * scale,
    };
  });
  return result;
}

/** Positions per category, computed once at module load. */
export const centeredPositions = Object.fromEntries(
  (Object.keys(SCALE_FACTORS) as SkillCategory[]).map((category) => [
    category,
    centreCategory(
      skills.filter((skill) => skill.category === category),
      SCALE_FACTORS[category]
    ),
  ])
) as Record<SkillCategory, Record<string, Point>>;

export const skillByName: Record<string, Skill> = Object.fromEntries(
  skills.map((skill) => [skill.name, skill])
);

/**
 * Per-star offsets so the pulse animations do not beat in unison.
 *
 * Derived from the index rather than random so the values are stable between
 * server and client renders.
 */
export const pulseDelays: Record<string, { midGlow: number; starGlow: number }> =
  Object.fromEntries(
    skills.map((skill, index) => [
      skill.name,
      { midGlow: (index % 7) * 0.1, starGlow: ((index * 3) % 10) * 0.07 },
    ])
  );

/** Where a star sits for the currently selected category. */
export function getSkillPosition(skill: Skill, activeCategory: string): Point {
  if (activeCategory === "All") {
    return scatteredPositions[skill.name] ?? { x: skill.x, y: skill.y };
  }
  return (
    centeredPositions[activeCategory as SkillCategory]?.[skill.name] ?? {
      x: 50,
      y: 50,
    }
  );
}

/** Stars outside the selected category fade out entirely. */
export function getSkillOpacity(skill: Skill, activeCategory: string): number {
  if (activeCategory === "All") return 1;
  return skill.category === activeCategory ? 1 : 0;
}
