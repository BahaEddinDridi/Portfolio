import { ProficiencyDots } from "@/components/skills/SkillTooltip";
import { StarGlyph } from "@/components/ui/star-glyph";

const LEVELS = [
  { level: 1, label: "Apprentice" },
  { level: 2, label: "Adept" },
  { level: 3, label: "Archmage" },
] as const;

/** Key explaining what the proficiency dots on each star mean. */
export function ProficiencyLegend() {
  return (
    <aside className="border-border bg-surface/55 w-full rounded-sm border p-4 backdrop-blur-sm lg:w-44">
      <h3 className="font-display text-gilt-text mb-3 flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase">
        <StarGlyph className="text-gilt h-3 w-3" />
        Mastery
      </h3>

      <ul className="space-y-2">
        {LEVELS.map(({ level, label }) => (
          <li key={label} className="flex items-center gap-2">
            <ProficiencyDots level={level} className="gap-0.5" />
            <span className="text-xs opacity-75">{label}</span>
          </li>
        ))}
      </ul>

      <p className="border-border mt-4 border-t pt-3 text-[11px] leading-relaxed italic opacity-55">
        Hover a seal to read its entry.
      </p>
    </aside>
  );
}
