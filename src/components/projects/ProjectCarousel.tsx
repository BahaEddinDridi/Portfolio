"use client";

import { useState } from "react";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectModal } from "@/components/projects/ProjectModal";
import Button from "@/components/ui/button";
import { projects } from "@/data/projects";
import { useCarouselRotation } from "@/hooks/useCarouselRotation";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { StarGlyph } from "@/components/ui/star-glyph";
import { ChevronLeftIcon, ChevronRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

/** Radius of the ring the cards sit on, in pixels. */
const RADIUS = { mobile: 130, desktop: 320 } as const;
/** How many cards either side of the front one stay mounted. */
const VISIBLE_SPAN = { mobile: 2, desktop: 3 } as const;

const NAV_BUTTON_CLASS =
  "border-gilt/45 bg-surface/70 text-gilt absolute top-1/2 z-50 h-12 w-12 -translate-y-1/2 rounded-full p-0 backdrop-blur-sm hover:bg-gilt/15";

export function ProjectCarousel() {
  const isMobile = useIsMobile();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const {
    currentIndex,
    dragOffset,
    isDragging,
    isRotating,
    hasDragged,
    beginDrag,
    updateDrag,
    endDrag,
    step,
    goTo,
  } = useCarouselRotation({ itemCount: projects.length, enabled: !isMobile });

  const radius = isMobile ? RADIUS.mobile : RADIUS.desktop;
  const span = isMobile ? VISIBLE_SPAN.mobile : VISIBLE_SPAN.desktop;

  /** Places a card on the ring for the current (possibly fractional) index. */
  const cardStyle = (index: number): React.CSSProperties => {
    const position = (index - currentIndex + projects.length * 2) % projects.length;
    const angle = (360 / projects.length) * position + (isDragging ? dragOffset * 0.1 : 0);
    const radians = (angle * Math.PI) / 180;

    const x = Math.sin(radians) * radius;
    const z = Math.cos(radians) * radius;
    const scale = isMobile
      ? 0.5 + (z + radius) / (radius * 4)
      : 0.7 + (z + radius) / (radius * 3);

    return {
      transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
      opacity: z > -radius / 2 ? 1 : 0.3,
      zIndex: Math.round(z),
      pointerEvents: isFront(position) ? "auto" : "none",
    };
  };

  const isFront = (position: number) =>
    Math.abs(position) < 0.5 || Math.abs(position - projects.length) < 0.5;

  const openProject = (project: Project) => {
    // A flick ends with a click event; ignore it so dragging never opens a card.
    if (hasDragged()) return;
    setSelectedProject(project);
  };

  return (
    <>
      <div className="space-y-6">
        <div
          className="relative flex h-[380px] w-full select-none items-center justify-center overflow-visible sm:h-[500px] md:h-[650px] lg:h-[700px]"
          style={{ cursor: isMobile ? "default" : isDragging ? "grabbing" : "grab" }}
          onMouseDown={(e) => beginDrag(e.clientX)}
          onMouseMove={(e) => updateDrag(e.clientX)}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onTouchStart={(e) => beginDrag(e.touches[0].clientX)}
          onTouchMove={(e) => updateDrag(e.touches[0].clientX)}
          onTouchEnd={endDrag}
        >
          <div
            className="relative h-full w-full"
            style={{
              perspective: isMobile ? "600px" : "1200px",
              perspectiveOrigin: "50% 50%",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {projects.map((project, index) => {
                const position =
                  (index - currentIndex + projects.length * 2) % projects.length;
                const isNear =
                  position < span || position > projects.length - span;

                // Mobile keeps the DOM small; desktop keeps the ring complete.
                if (isMobile && !isNear) return null;

                return (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isVisible={isNear}
                    isFront={isFront(position)}
                    isMobile={isMobile}
                    style={cardStyle(index)}
                    onSelect={() => openProject(project)}
                  />
                );
              })}
            </div>
          </div>

          <Button
            variant="etched"
            size={isMobile ? "sm" : "default"}
            className={cn(NAV_BUTTON_CLASS, "left-2 sm:left-4 md:left-8")}
            onClick={() => step("prev")}
            disabled={isRotating}
            aria-label="Previous project"
          >
            <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </Button>

          <Button
            variant="etched"
            size={isMobile ? "sm" : "default"}
            className={cn(NAV_BUTTON_CLASS, "right-2 sm:right-4 md:right-8")}
            onClick={() => step("next")}
            disabled={isRotating}
            aria-label="Next project"
          >
            <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <p className="pointer-events-none font-mono text-[10px] tracking-[0.2em] uppercase opacity-50">
            {isMobile
              ? "Use the arrows to turn the wheel"
              : "Drag to turn the wheel · click a plate to read it"}
          </p>
          <div className="flex items-center justify-center gap-2">
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to ${project.title}`}
                aria-current={Math.round(currentIndex) === index}
                className="p-1 transition-transform hover:scale-125"
              >
                <StarGlyph
                  className={cn(
                    "transition-all",
                    Math.round(currentIndex) === index
                      ? "text-gilt-bright h-3.5 w-3.5 drop-shadow-[0_0_6px_var(--glow)]"
                      : "text-gilt/40 h-2.5 w-2.5"
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}

export default ProjectCarousel;
