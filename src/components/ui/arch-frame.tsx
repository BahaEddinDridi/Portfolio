import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * A gothic arch around an image.
 *
 * One border-radius does the whole job: round the top corners hard, leave the
 * bottom square. Turns a screenshot into a window in a chapel.
 */
export function ArchFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-border relative overflow-hidden rounded-t-full rounded-b-sm border",
        className
      )}
    >
      {children}
    </div>
  );
}
