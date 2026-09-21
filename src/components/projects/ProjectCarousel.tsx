"use client";

import { useState } from "react";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectModal } from "@/components/projects/ProjectModal";
import Button from "@/components/ui/button";
import { projects } from "@/data/projects";
import { useCarouselRotation } from "@/hooks/useCarouselRotation";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { ChevronLeftIcon, ChevronRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

/** Radius of the ring the cards sit on, in pixels. */
const RADIUS = { mobile: 130, desktop: 320 } as const;
/** How many cards either side of the front one stay mounted. */
const VISIBLE_SPAN = { mobile: 2, desktop: 3 } as const;

const NAV_BUTTON_CLASS =
  "absolute top-1/2 z-50 -translate-y-1/2 border-yellow-200/30 bg-yellow-50/30 text-gray-800 backdrop-blur-sm hover:bg-yellow-50/50 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20";

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
            variant="outline"
            size={isMobile ? "sm" : "default"}
            className={cn(NAV_BUTTON_CLASS, "left-2 sm:left-4 md:left-8")}
            onClick={() => step("prev")}
            disabled={isRotating}
            aria-label="Previous project"
          >
            <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </Button>

          <Button
            variant="outline"
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
          <p className="pointer-events-none text-xs text-gray-900 sm:text-sm dark:text-white/50">
            {isMobile ? "Use arrows to navigate" : "Drag to rotate"}
          </p>
          <div className="flex justify-center gap-1.5 sm:gap-2">
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to ${project.title}`}
                aria-current={Math.round(currentIndex) === index}
                className={cn(
                  "h-2 rounded-full transition-all",
                  Math.round(currentIndex) === index
                    ? "w-6 bg-gray-900 sm:w-8 dark:bg-white"
                    : "w-2 bg-gray-900/30 hover:bg-gray-900/50 dark:bg-white/30 dark:hover:bg-white/50"
                )}
              />
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
