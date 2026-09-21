import type { ComponentType } from "react";

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
        "pointer-events-none absolute top-full z-50 mt-4 whitespace-nowrap rounded-lg border px-4 py-2 backdrop-blur-sm transition-all duration-300",
        "border-gray-300 bg-white/95 shadow-[0_0_20px_rgba(255,255,255,0.3)] dark:border-white/50 dark:bg-gray-900/95",
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
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {skill.name}
          </p>
        </div>
        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
          {skill.category}
        </p>
        <ProficiencyDots level={skill.level} className="mt-2 justify-center" />
      </div>
      <div className="absolute bottom-full left-1/2 h-0 w-0 -translate-x-1/2 border-b-4 border-l-4 border-r-4 border-transparent border-b-white/50 dark:border-b-white/50" />
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
              ? "bg-gray-700 shadow-[0_0_15px_rgba(0,0,0,0.3)] dark:bg-white dark:shadow-[0_0_5px_rgba(255,255,255,0.8)]"
              : "border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700"
          )}
        />
      ))}
    </div>
  );
}
