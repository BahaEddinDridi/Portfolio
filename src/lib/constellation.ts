import { skills } from "@/data/skills";
import type { Point, Skill, SkillCategory } from "@/types";

/**
 * The summoning circle.
 *
 * Skills sit on three concentric rings rather than a scatter: the inner ring
 * is what the visitor sees, the middle is what runs underneath, the outer is
 * the workshop. Coordinates are percentages of a square container, so the
 * rings stay circular at any size.
 */

/** Ring radius as a percentage of the container, per school. */
const RING_RADIUS: Record<SkillCategory, number> = {
  Frontend: 17,
  Backend: 29,
  Tools: 41,
};

/** When one school is selected it moves out to a single, roomier ring. */
const SOLO_RADIUS = 34;

/** Rotation offset per ring, so nodes never line up into spokes. */
const RING_PHASE: Record<SkillCategory, number> = {
  Frontend: 45,
  Backend: 0,
  Tools: 22.5,
};

const CENTRE = 50;

export const CATEGORY_ORDER: SkillCategory[] = ["Frontend", "Backend", "Tools"];

function onRing(index: number, count: number, radius: number, phase: number): Point {
  const angle = ((360 / count) * index + phase) * (Math.PI / 180);
  return {
    x: CENTRE + Math.cos(angle) * radius,
    y: CENTRE - Math.sin(angle) * radius,
  };
}

/** Skills grouped by school, in data order. */
export const skillsByCategory = Object.fromEntries(
  CATEGORY_ORDER.map((category) => [
    category,
    skills.filter((skill) => skill.category === category),
  ])
) as Record<SkillCategory, Skill[]>;

/** Every skill's seat on its own ring, used by the "All" view. */
export const ringPositions: Record<string, Point> = Object.fromEntries(
  CATEGORY_ORDER.flatMap((category) => {
    const group = skillsByCategory[category];
    return group.map((skill, index) => [
      skill.name,
      onRing(index, group.length, RING_RADIUS[category], RING_PHASE[category]),
    ]);
  })
);

/** Each school's seats when it alone is showing. */
export const soloPositions = Object.fromEntries(
  CATEGORY_ORDER.map((category) => {
    const group = skillsByCategory[category];
    return [
      category,
      Object.fromEntries(
        group.map((skill, index) => [
          skill.name,
          onRing(index, group.length, SOLO_RADIUS, RING_PHASE[category]),
        ])
      ),
    ];
  })
) as Record<SkillCategory, Record<string, Point>>;

export const skillByName: Record<string, Skill> = Object.fromEntries(
  skills.map((skill) => [skill.name, skill])
);

/**
 * Per-node offsets so the pulses do not beat in unison. Derived from the index
 * rather than random, so server and client agree.
 */
export const pulseDelays: Record<string, { glow: number; core: number }> =
  Object.fromEntries(
    skills.map((skill, index) => [
      skill.name,
      { glow: (index % 7) * 0.18, core: ((index * 3) % 10) * 0.13 },
    ])
  );

/** Where a seal sits for the currently selected school. */
export function getSkillPosition(skill: Skill, activeCategory: string): Point {
  if (activeCategory === "All") return ringPositions[skill.name];
  return (
    soloPositions[activeCategory as SkillCategory]?.[skill.name] ??
    ringPositions[skill.name]
  );
}

/** Seals outside the selected school fade out entirely. */
export function getSkillOpacity(skill: Skill, activeCategory: string): number {
  if (activeCategory === "All") return 1;
  return skill.category === activeCategory ? 1 : 0;
}

/** Radius of the ring currently drawn for a school, in container percent. */
export function getRingRadius(
  category: SkillCategory,
  activeCategory: string
): number {
  return activeCategory === category ? SOLO_RADIUS : RING_RADIUS[category];
}
