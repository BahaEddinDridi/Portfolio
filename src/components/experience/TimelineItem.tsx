"use client";

import { memo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { ChevronDownIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { ExperienceEntry } from "@/types";

/** The four-pointed star that marks each entry on the timeline rail. */
function TimelineStar({
  filled,
  className,
}: {
  filled: boolean;
  className?: string;
}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

const TimelineDetails = memo(function TimelineDetails({
  item,
}: {
  item: ExperienceEntry;
}) {
  return (
    <div className="slide-in-from-top-1 animate-in mt-6 space-y-6 duration-200">
      <ul className="space-y-3">
        {item.responsibilities.map((responsibility) => (
          <li key={responsibility} className="group flex items-start gap-3">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-700 transition-all duration-200 group-hover:shadow-[0_0_8px_rgba(100,116,139,0.8)] dark:bg-white dark:group-hover:shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {responsibility}
            </p>
          </li>
        ))}
      </ul>

      <ul className="flex list-none flex-wrap gap-2 border-t border-slate-200 pt-2 dark:border-white/10">
        {item.skills.map((skill) => (
          <li key={skill}>
            <Badge variant="secondary">{skill}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
});

interface TimelineItemProps {
  item: ExperienceEntry;
  expanded: boolean;
  onToggle: (id: string) => void;
}

export const TimelineItem = memo(function TimelineItem({
  item,
  expanded,
  onToggle,
}: TimelineItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;
  const headerId = `timeline-header-${item.id}`;
  const contentId = `timeline-content-${item.id}`;

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute bottom-0 left-[16px] top-10 w-[1px] -translate-x-1/2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-400 via-slate-300 to-slate-200 dark:from-white/80 dark:via-white/40 dark:to-white/20" />
        {isHovered && (
          <div className="absolute inset-0 animate-[shimmer_1s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-slate-600 to-transparent dark:via-white" />
        )}
      </div>

      <div className="absolute left-[18px] top-6 z-10 -translate-x-1/2 transition-all duration-300">
        <TimelineStar
          filled={isHovered}
          className={cn(
            "text-slate-700 transition-all duration-300 dark:text-white",
            isHovered &&
              "scale-110 drop-shadow-[0_0_8px_rgba(100,116,139,0.8)] dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]"
          )}
        />
      </div>

      <div className="mb-8 ml-12">
        <div
          className={cn(
            "rounded-lg border border-slate-200 bg-gray-100/50 backdrop-blur-md transition-all duration-200 dark:border-white/10 dark:bg-white/5",
            expanded
              ? "shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              : "shadow-md hover:shadow-lg dark:shadow-none dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          )}
        >
          <button
            id={headerId}
            type="button"
            onClick={() => onToggle(item.id)}
            aria-expanded={expanded}
            aria-controls={contentId}
            className="w-full cursor-pointer rounded-t-lg p-4 text-left transition-colors duration-200 hover:bg-slate-100 sm:p-6 dark:hover:bg-white/5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex-shrink-0 rounded-md bg-slate-200 p-2 backdrop-blur-sm dark:bg-white/10">
                    <Icon className="h-4 w-4 text-slate-900 dark:text-white" />
                  </span>
                  <h3 className="break-words text-base font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                </div>

                <div className="ml-0 flex flex-wrap items-center gap-3 sm:ml-11">
                  <Badge variant="outline" className="text-xs">
                    {item.type}
                  </Badge>
                  <span className="text-xs text-slate-600 dark:text-slate-300">
                    {item.duration}
                  </span>
                </div>
              </div>

              <ChevronDownIcon
                className={cn(
                  "h-4 w-4 flex-shrink-0 text-slate-600 transition-transform duration-200 dark:text-white/60",
                  expanded && "rotate-180"
                )}
              />
            </div>
          </button>

          {expanded && (
            <div
              id={contentId}
              role="region"
              aria-labelledby={headerId}
              className="border-t border-slate-200 px-4 pb-4 sm:px-6 sm:pb-6 dark:border-white/10"
            >
              <TimelineDetails item={item} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
