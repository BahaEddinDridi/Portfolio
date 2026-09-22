"use client";

import { memo, useRef, useState } from "react";
import { useInView } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { StarGlyph } from "@/components/ui/star-glyph";
import { WaxSeal } from "@/components/ui/wax-seal";
import { ChevronDownIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { ExperienceEntry } from "@/types";

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
            <StarGlyph className="text-gilt mt-1.5 h-2.5 w-2.5 flex-shrink-0 opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
            <p className="text-sm leading-relaxed opacity-80">
              {responsibility}
            </p>
          </li>
        ))}
      </ul>

      <ul className="border-border flex list-none flex-wrap gap-2 border-t pt-3">
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
  const ref = useRef<HTMLDivElement>(null);
  /* Lights as the wisp reaches it, and settles again on the way back up. */
  const lit = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const Icon = item.icon;
  const headerId = `timeline-header-${item.id}`;
  const contentId = `timeline-content-${item.id}`;

  return (
    <div
      ref={ref}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "absolute left-[18px] top-4 z-10 -translate-x-1/2 transition-all duration-500",
          lit ? "scale-110 opacity-100" : "scale-95 opacity-45"
        )}
      >
        <WaxSeal tone="ember" size="sm" active={lit || isHovered}>
          <StarGlyph className="h-3 w-3" />
        </WaxSeal>
      </div>

      <div className="mb-8 ml-14">
        <div
          className={cn(
            "border-border bg-surface/55 rounded-sm border backdrop-blur-md transition-all duration-500",
            lit
              ? "border-gilt/45 opacity-100 shadow-[0_0_34px_var(--glow)]"
              : "opacity-55 hover:opacity-90"
          )}
        >
          <button
            id={headerId}
            type="button"
            onClick={() => onToggle(item.id)}
            aria-expanded={expanded}
            aria-controls={contentId}
            className="hover:bg-gilt/8 w-full cursor-pointer rounded-t-sm p-4 text-left transition-colors duration-200 sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="border-gilt/35 flex-shrink-0 rounded-sm border p-2">
                    <Icon className="text-gilt h-4 w-4" />
                  </span>
                  <h3 className="text-base font-semibold break-words">
                    {item.title}
                  </h3>
                </div>

                <div className="ml-0 flex flex-wrap items-center gap-3 sm:ml-11">
                  <Badge variant="outline" className="text-xs">
                    {item.type}
                  </Badge>
                  <span className="font-mono text-[11px] tracking-wider uppercase opacity-60">
                    {item.duration}
                  </span>
                </div>
              </div>

              <ChevronDownIcon
                className={cn(
                  "text-gilt h-4 w-4 flex-shrink-0 transition-transform duration-200",
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
              className="border-border border-t px-4 pb-4 sm:px-6 sm:pb-6"
            >
              <TimelineDetails item={item} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
