import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Which ground the panel sits on. */
export type VellumTone = "plum" | "parchment";

interface VellumPanelProps {
  children: ReactNode;
  /** `plum` follows the theme; `parchment` is always the warm page, both themes. */
  tone?: VellumTone;
  /** Corner brackets. `false` for a plain cut-corner panel. */
  brackets?: boolean;
  /** Lit panels carry a soft candle glow — used for the active timeline entry. */
  lit?: boolean;
  as?: ElementType;
  className?: string;
}

const TONE_CLASS: Record<VellumTone, string> = {
  plum: "border-border bg-surface/60 text-foreground backdrop-blur-sm",
  parchment: "border-[rgba(122,88,32,0.35)] bg-[#f4ead5] text-[#2b2114]",
};

const BRACKET_STROKE: Record<VellumTone, string> = {
  plum: "var(--gilt)",
  parchment: "#8a5e1e",
};

/**
 * The project's panel.
 *
 * Replaces the `rounded-2xl` glass card: a 2px radius with four gold corner
 * brackets. The brackets are drawn rather than bordered so they read as
 * hardware on a book cover instead of a CSS outline.
 */
export function VellumPanel({
  children,
  tone = "plum",
  brackets = true,
  lit = false,
  as: Component = "div",
  className,
}: VellumPanelProps) {
  return (
    <Component
      className={cn(
        "rounded-sm relative border transition-all duration-300",
        TONE_CLASS[tone],
        lit && "shadow-[0_0_40px_var(--glow)]",
        className
      )}
    >
      {brackets && <Brackets stroke={BRACKET_STROKE[tone]} />}
      {children}
    </Component>
  );
}

const CORNERS = [
  { d: "M1 10 L1 1 L10 1", pos: "-left-px -top-px" },
  { d: "M23 10 L23 1 L14 1", pos: "-right-px -top-px" },
  { d: "M1 14 L1 23 L10 23", pos: "-bottom-px -left-px" },
  { d: "M23 14 L23 23 L14 23", pos: "-bottom-px -right-px" },
] as const;

function Brackets({ stroke }: { stroke: string }) {
  return (
    <>
      {CORNERS.map(({ d, pos }) => (
        <svg
          key={d}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          aria-hidden
          className={cn("pointer-events-none absolute", pos)}
        >
          <path d={d} stroke={stroke} strokeWidth="1.8" fill="none" />
        </svg>
      ))}
    </>
  );
}
