import type { ComponentType } from "react";

import { schoolNames } from "@/data/skills";
import { cn } from "@/lib/utils";
import type { Skill } from "@/types";

const MAX_LEVEL = 3;

interface SkillTooltipProps {
  skill: Skill;
  icon: ComponentType<{ className?: string }>;
  iconColor: string;
  visible: boolean;
}

/** Hover card for a constellation star: name, category and proficiency dots. */
export function SkillTooltip({
  skill,
  icon: Icon,
  iconColor,
  visible,
}: SkillTooltipProps) {
  return (
    <div
      role="tooltip"
      aria-hidden={!visible}
      className={cn(
        "pointer-events-none absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 whitespace-nowrap rounded-sm border px-4 py-2 backdrop-blur-sm transition-all duration-300",
        "border-gilt/50 bg-[var(--surface)]/95 shadow-[0_0_24px_var(--glow)]",
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      )}
    >
      <div className="text-center">
        <div className="flex items-center justify-center gap-2">
          <span
            className="inline-flex h-5 w-5 items-center justify-center"
            style={{ color: iconColor }}
          >
            <Icon className="h-4 w-4" />
          </span>
          <p className="font-display text-gilt-text text-xs font-bold tracking-[0.08em] uppercase">
            {skill.name}
          </p>
        </div>
        <p className="mt-1 text-[11px] italic opacity-60">
          School of {schoolNames[skill.category] ?? skill.category}
        </p>
        <ProficiencyDots level={skill.level} className="mt-2 justify-center" />
      </div>
      <div className="border-b-gilt/50 absolute bottom-full left-1/2 h-0 w-0 -translate-x-1/2 border-b-4 border-l-4 border-r-4 border-transparent" />
    </div>
  );
}

/** Filled/empty dots showing proficiency out of three. */
export function ProficiencyDots({
  level,
  className,
}: {
  level: number;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-1", className)}>
      {Array.from({ length: MAX_LEVEL }, (_, index) => (
        <span
          key={index}
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            index < level
              ? "bg-gilt shadow-[0_0_6px_var(--glow)]"
              : "border-gilt/35 border bg-transparent"
          )}
        />
      ))}
    </div>
  );
}
