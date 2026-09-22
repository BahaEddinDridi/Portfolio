import { StarGlyph } from "@/components/ui/star-glyph";
import { cn } from "@/lib/utils";

/** A hairline rule that fades out from a central star. Separates sections. */
export function RuneDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("flex w-full items-center gap-3", className)}
    >
      <span className="from-gilt/0 to-gilt/50 h-px flex-grow bg-gradient-to-r" />
      <StarGlyph className="text-gilt h-3 w-3" />
      <span className="from-gilt/0 to-gilt/50 h-px flex-grow bg-gradient-to-l" />
    </div>
  );
}
