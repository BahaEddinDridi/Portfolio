import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type SealTone = "ember" | "arcane" | "verdigris" | "gilt";
export type SealSize = "sm" | "md" | "lg";

interface WaxSealProps {
  /** A short label, an initial, or an icon. Kept decorative by default. */
  children?: ReactNode;
  tone?: SealTone;
  size?: SealSize;
  /** Adds a lit ring, for the entry the reader is currently on. */
  active?: boolean;
  className?: string;
}

/**
 * A blob of wax pressed with a stamp.
 *
 * Replaces the pill badge for anything that marks or classifies: project
 * categories, timeline nodes, the active marker. The off-centre highlight is
 * what makes it read as wax rather than a coloured circle.
 */
const TONE_CLASS: Record<SealTone, string> = {
  ember:
    "bg-[radial-gradient(circle_at_36%_32%,#e2703a_0%,#b8461e_68%,#8a3214_100%)] text-[#fbe2ce]",
  arcane:
    "bg-[radial-gradient(circle_at_36%_32%,#a97be0_0%,#6b3fa0_70%,#4a2a74_100%)] text-[#eadcfa]",
  verdigris:
    "bg-[radial-gradient(circle_at_36%_32%,#57a894_0%,#2f6b5a_70%,#1f4a3e_100%)] text-[#d6f0e8]",
  gilt: "bg-[radial-gradient(circle_at_36%_32%,#f5d08a_0%,#c48b3c_70%,#8a5e1e_100%)] text-[#2a1b08]",
};

const SIZE_CLASS: Record<SealSize, string> = {
  sm: "h-7 w-7 text-[9px]",
  md: "h-11 w-11 text-[10px]",
  lg: "h-14 w-14 text-[11px]",
};

const GLOW: Record<SealTone, string> = {
  ember: "shadow-[0_0_24px_rgba(226,112,58,0.5)]",
  arcane: "shadow-[0_0_24px_rgba(169,123,224,0.5)]",
  verdigris: "shadow-[0_0_24px_rgba(87,168,148,0.5)]",
  gilt: "shadow-[0_0_24px_rgba(227,168,87,0.5)]",
};

export function WaxSeal({
  children,
  tone = "ember",
  size = "md",
  active = false,
  className,
}: WaxSealProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "font-display inline-flex flex-shrink-0 items-center justify-center rounded-full text-center leading-tight font-extrabold tracking-[0.06em] shadow-[0_4px_12px_rgba(0,0,0,0.4)]",
        TONE_CLASS[tone],
        SIZE_CLASS[size],
        active && GLOW[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
