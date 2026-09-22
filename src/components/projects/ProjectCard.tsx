"use client";

import Image from "next/image";

import { StarGlyph } from "@/components/ui/star-glyph";
import { WaxSeal } from "@/components/ui/wax-seal";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/types";

/** Seal colour per kind of work. */
const SEAL_TONE: Record<ProjectCategory, "ember" | "arcane" | "verdigris"> = {
  "Full-Stack": "ember",
  Frontend: "verdigris",
  Backend: "arcane",
};

/** Two words, stacked, so the seal reads at 44px. */
const SEAL_LABEL: Record<ProjectCategory, string[]> = {
  "Full-Stack": ["FULL", "STACK"],
  Frontend: ["FORE", "CRAFT"],
  Backend: ["DEEP", "CRAFT"],
};

interface ProjectCardProps {
  project: Project;
  /** Cards outside the viewing arc render a placeholder instead of an image. */
  isVisible: boolean;
  isFront: boolean;
  isMobile: boolean;
  style: React.CSSProperties;
  onSelect: () => void;
}

export function ProjectCard({
  project,
  isVisible,
  isFront,
  isMobile,
  style,
  onSelect,
}: ProjectCardProps) {
  const visibleTechCount = isMobile ? 2 : 3;
  const hiddenTechCount = project.technologies.length - visibleTechCount;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Open details for ${project.title}`}
      className="absolute h-[320px] w-[240px] cursor-pointer text-left transition-all duration-600 ease-out sm:h-[400px] sm:w-[320px] md:h-[450px] md:w-[350px]"
      style={{ ...style, contain: "layout style paint" }}
    >
      {/* An illuminated plate: warm vellum in both themes, like a page. */}
      <div className="group relative flex h-full w-full flex-col rounded-sm border border-[rgba(122,88,32,0.45)] bg-[linear-gradient(180deg,#f4ead5_0%,#e6d7b8_100%)] p-3 shadow-[0_24px_54px_rgba(0,0,0,0.45)] transition-shadow duration-300 hover:shadow-[0_24px_54px_rgba(0,0,0,0.55),0_0_34px_var(--glow)]">
        <span className="pointer-events-none absolute inset-[6px] rounded-[1px] border border-[rgba(122,88,32,0.35)]" />
        <Flourishes />

        {/* The gothic arch is what turns a screenshot into a window. */}
        <div className="relative mx-1 mt-1 h-[48%] overflow-hidden rounded-t-[999px] rounded-b-sm border border-[rgba(122,88,32,0.5)] bg-[#2e2350] sm:h-[50%]">
          {isVisible ? (
            <Image
              src={project.image}
              alt={project.title}
              width={500}
              height={500}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              priority={isFront}
              loading={isFront ? "eager" : "lazy"}
              quality={isMobile ? 75 : 90}
            />
          ) : (
            <div className="h-full w-full bg-[#2e2350]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,12,34,0.5)] to-transparent" />
        </div>

        <div className="absolute left-1/2 top-[46%] -translate-x-1/2 sm:top-[48%]">
          <WaxSeal tone={SEAL_TONE[project.category]} size="md">
            <span className="leading-[1.05]">
              {SEAL_LABEL[project.category][0]}
              <br />
              {SEAL_LABEL[project.category][1]}
            </span>
          </WaxSeal>
        </div>

        <div className="mt-8 flex flex-1 flex-col items-center px-3 text-center">
          <h3 className="font-display line-clamp-2 text-sm font-extrabold text-[#2b2114] sm:text-lg md:text-xl">
            {project.title}
          </h3>

          <div className="my-2 flex items-center gap-2">
            <span className="h-px w-7 bg-[rgba(122,88,32,0.45)]" />
            <StarGlyph className="h-2.5 w-2.5 text-[#8a5e1e]" />
            <span className="h-px w-7 bg-[rgba(122,88,32,0.45)]" />
          </div>

          <p className="line-clamp-2 text-[11px] italic leading-snug text-[#5c4a31] sm:text-sm">
            {project.shortDescription}
          </p>

          <div className="mt-auto flex flex-wrap justify-center gap-1 pb-1 sm:gap-1.5">
            {project.technologies.slice(0, visibleTechCount).map((tech) => (
              <span key={tech} className={TECH_PILL}>
                {tech}
              </span>
            ))}
            {hiddenTechCount > 0 && (
              <span className={TECH_PILL}>+{hiddenTechCount}</span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

const TECH_PILL =
  "rounded-sm border border-[rgba(122,88,32,0.45)] px-1.5 py-0.5 font-mono text-[8px] tracking-wide text-[#6b5320] sm:px-2 sm:text-[10px]";

const CORNERS = [
  { d: "M2 12 L2 2 L12 2", pos: "left-1 top-1" },
  { d: "M22 12 L22 2 L12 2", pos: "right-1 top-1" },
  { d: "M2 12 L2 22 L12 22", pos: "bottom-1 left-1" },
  { d: "M22 12 L22 22 L12 22", pos: "bottom-1 right-1" },
] as const;

function Flourishes() {
  return (
    <>
      {CORNERS.map(({ d, pos }) => (
        <svg
          key={d}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          aria-hidden
          className={cn("pointer-events-none absolute", pos)}
        >
          <path d={d} stroke="#8a5e1e" strokeWidth="1.5" fill="none" />
        </svg>
      ))}
    </>
  );
}
