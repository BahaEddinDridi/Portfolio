"use client";

import { useCallback, useState } from "react";

import { TimelineItem } from "@/components/experience/TimelineItem";
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
    <div className="relative">
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
