"use client";

import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types";

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
      <div className="group relative h-full w-full overflow-hidden rounded-xl border border-[#f3e8ff]/60 bg-[#f3e8ff]/60 shadow-2xl backdrop-blur-sm transition-all hover:shadow-white/20 dark:border-white/10 dark:bg-white/5 dark:hover:shadow-white/20">
        <div className="relative h-[55%] overflow-hidden sm:h-[60%]">
          {isVisible ? (
            <Image
              src={project.image}
              alt={project.title}
              width={500}
              height={500}
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
              priority={isFront}
              loading={isFront ? "eager" : "lazy"}
              quality={isMobile ? 75 : 90}
            />
          ) : (
            <div className="h-full w-full bg-slate-200 dark:bg-slate-800" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent dark:from-slate-950/90" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 space-y-3 p-6">
          <Badge className="border-white/20 bg-white/90 text-slate-900 dark:border-white/20 dark:bg-white/10 dark:text-white">
            {project.category}
          </Badge>
          <h3 className="line-clamp-2 text-base font-bold text-slate-900 transition-colors group-hover:text-slate-700 sm:text-xl md:text-2xl dark:text-white dark:group-hover:text-white/90">
            {project.title}
          </h3>
          <p className="line-clamp-2 text-[11px] text-slate-700 sm:text-sm dark:text-slate-300">
            {project.shortDescription}
          </p>
          <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
            {project.technologies.slice(0, visibleTechCount).map((tech) => (
              <span key={tech} className={TECH_PILL_CLASS}>
                {tech}
              </span>
            ))}
            {hiddenTechCount > 0 && (
              <span className={TECH_PILL_CLASS}>+{hiddenTechCount}</span>
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent dark:from-white/5" />
        </div>
      </div>
    </button>
  );
}

const TECH_PILL_CLASS =
  "rounded-full border border-white/20 bg-white/90 px-1.5 py-0.5 text-[9px] text-slate-900 sm:px-2 sm:py-1 sm:text-xs dark:border-white/20 dark:bg-white/10 dark:text-white";
