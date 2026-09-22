import { cn } from "@/lib/utils";

/**
 * The four-pointed star.
 *
 * The one ornament that runs through the whole site — sparkles, bullets,
 * dividers, constellation nodes. Deliberately four points, never six.
 */
export const STAR_PATH = "M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z";

export function StarGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={cn("h-3 w-3", className)}
    >
      <path d={STAR_PATH} />
    </svg>
  );
}
