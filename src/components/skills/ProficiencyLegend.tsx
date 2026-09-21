import { ProficiencyDots } from "@/components/skills/SkillTooltip";
import { StarGlyph } from "@/components/skills/StarGlyph";

const LEVELS = [
  { level: 1, label: "Fine" },
  { level: 2, label: "Intermediate" },
  { level: 3, label: "Advanced" },
] as const;

/** Key explaining what the proficiency dots on each star mean. */
export function ProficiencyLegend() {
  return (
    <aside className="w-full rounded-xl border border-gray-300 bg-gradient-to-br from-gray-100/80 to-gray-100/40 p-3 backdrop-blur-sm lg:w-40 dark:border-gray-800 dark:from-gray-900/80 dark:to-gray-900/40">
      <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-gray-900 dark:text-white">
        <StarGlyph />
        Proficiency
      </h3>

      <ul className="space-y-2">
        {LEVELS.map(({ level, label }) => (
          <li key={label} className="flex items-center gap-2">
            <ProficiencyDots level={level} className="gap-0.5" />
            <span className="text-[10px] text-gray-900 dark:text-white">
              {label}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-3 border-t border-gray-700 pt-3 text-[9px] leading-relaxed text-gray-800 dark:border-gray-700 dark:text-gray-400">
        Hover over stars to see details
      </p>
    </aside>
  );
}
