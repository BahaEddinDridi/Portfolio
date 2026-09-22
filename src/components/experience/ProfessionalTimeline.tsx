"use client";

import { useCallback, useRef, useState } from "react";
import { useScroll } from "motion/react";

import { TimelineItem } from "@/components/experience/TimelineItem";
import { TimelineRail } from "@/components/experience/TimelineRail";
import type { ExpandMode, ExperienceEntry } from "@/types";

interface ProfessionalTimelineProps {
  data: ExperienceEntry[];
  /** Defaults to every entry open. */
  defaultExpandedIds?: string[];
  /** `single` behaves like an accordion; `multi` lets several stay open. */
  expandMode?: ExpandMode;
}

export function ProfessionalTimeline({
  data,
  defaultExpandedIds,
  expandMode = "multi",
}: ProfessionalTimelineProps) {
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(defaultExpandedIds ?? data.map((item) => item.id))
  );

  const containerRef = useRef<HTMLDivElement>(null);
  /*
   * Measured against 55% of the viewport rather than its edges, so the wisp
   * sits a little above centre — where the reader's eye already is — instead
   * of racing ahead at the top and lagging at the bottom.
   */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 55%", "end 55%"],
  });

  const onToggle = useCallback(
    (id: string) => {
      setExpanded((previous) => {
        if (expandMode === "single") {
          return previous.has(id) ? new Set<string>() : new Set([id]);
        }

        const next = new Set(previous);
        if (!next.delete(id)) next.add(id);
        return next;
      });
    },
    [expandMode]
  );

  return (
    <div ref={containerRef} className="relative">
      <TimelineRail progress={scrollYProgress} />

      {data.map((item) => (
        <TimelineItem
          key={item.id}
          item={item}
          expanded={expanded.has(item.id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default ProfessionalTimeline;
