"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import Button from "@/components/ui/button";
import { StarGlyph } from "@/components/ui/star-glyph";
import { WaxSeal } from "@/components/ui/wax-seal";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { CloseIcon, ExternalLinkIcon, GithubIcon } from "@/lib/icons";
import type { Project } from "@/types";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const SCROLLBAR_CLASS =
  "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#e6d7b8] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#b8842a]";

/** The page is warm vellum in both themes: a grimoire spread, not a dialog. */
const PAGE = "bg-[linear-gradient(180deg,#f4ead5_0%,#ece0c6_100%)] text-[#2b2114]";
const HEADING = "font-display text-[#8a5e1e] font-extrabold tracking-[0.06em] uppercase";

/**
 * Full project detail, portalled above the carousel's 3D stacking context.
 *
 * Portals into `#modal-root` when it exists so the transformed carousel cannot
 * clip it, and falls back to `<body>` if the layout has not mounted the target.
 */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // The carousel that owns this modal is client-only, so `document` exists here.
  const [container] = useState<HTMLElement | null>(() =>
    typeof document === "undefined"
      ? null
      : (document.getElementById("modal-root") ?? document.body)
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  if (!container) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fade-in animate-in fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm duration-300 dark:bg-black/90"
      onClick={onClose}
    >
      <div
        className={`zoom-in-95 animate-in relative max-h-[98vh] w-full max-w-5xl overflow-hidden rounded-sm border border-[rgba(122,88,32,0.5)] shadow-[0_40px_90px_rgba(0,0,0,0.6)] duration-300 sm:max-h-[95vh] ${PAGE}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-3 top-3 z-50 rounded-full border border-[rgba(122,88,32,0.5)] bg-[#e6d7b8] p-2 text-[#5c4a31] transition-all hover:bg-[#d9c8a4] sm:right-4 sm:top-4"
        >
          <CloseIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <div
          className={`flex h-full max-h-[98vh] flex-col overflow-y-auto sm:max-h-[95vh] ${SCROLLBAR_CLASS}`}
        >
          <div className="relative space-y-5 p-5 sm:space-y-7 sm:p-8 md:p-10">
            <span className="pointer-events-none absolute inset-3 rounded-[1px] border border-[rgba(122,88,32,0.3)]" />

            <header className="relative text-center">
              <div className="mb-4 flex justify-center">
                <WaxSeal tone="ember" size="lg">
                  {project.category.split("-").map((part) => (
                    <span key={part} className="block leading-[1.05]">
                      {part.toUpperCase()}
                    </span>
                  ))}
                </WaxSeal>
              </div>
              <h2 className={`${HEADING} mb-3 text-2xl sm:text-3xl md:text-4xl`}>
                {project.title}
              </h2>
              <div className="mx-auto mb-3 flex w-40 items-center gap-2">
                <span className="h-px flex-grow bg-[rgba(122,88,32,0.45)]" />
                <StarGlyph className="h-3 w-3 text-[#8a5e1e]" />
                <span className="h-px flex-grow bg-[rgba(122,88,32,0.45)]" />
              </div>
              <p className="text-sm italic text-[#5c4a31] sm:text-base">
                {project.shortDescription}
              </p>
            </header>

            <section className="relative">
              <h3 className={`${HEADING} mb-2 text-xs sm:mb-3 sm:text-sm`}>
                The Working
              </h3>
              <p className="text-sm leading-relaxed text-[#4a3a22] sm:text-[15px]">
                {project.fullDescription}
              </p>
            </section>

            <section className="relative">
              <h3 className={`${HEADING} mb-3 text-xs sm:text-sm`}>
                Components of the Spell
              </h3>
              <ul className="flex list-none flex-wrap gap-1.5 sm:gap-2">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-sm border border-[rgba(122,88,32,0.45)] px-2.5 py-1 font-mono text-[11px] tracking-wide text-[#6b5320] sm:px-3 sm:py-1.5"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </section>

            <ProjectLinks project={project} />
          </div>

          <ProjectGallery project={project} />
        </div>
      </div>
    </div>,
    container
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const { liveUrl, frontendGithubUrl, backendGithubUrl } = project;
  if (!liveUrl && !frontendGithubUrl && !backendGithubUrl) return null;

  return (
    <div className="relative flex flex-col gap-3 pt-2 sm:pt-4">
      {liveUrl && (
        <Button asChild className="h-11 w-full sm:h-12">
          <a href={liveUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLinkIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            View Live Demo
          </a>
        </Button>
      )}

      <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 md:gap-4">
        {frontendGithubUrl && (
          <SourceLink href={frontendGithubUrl} label="Frontend" />
        )}
        {backendGithubUrl && (
          <SourceLink href={backendGithubUrl} label="Backend" />
        )}
      </div>
    </div>
  );
}

function SourceLink({ href, label }: { href: string; label: string }) {
  return (
    <Button
      asChild
      variant="etched"
      className="h-11 flex-1 border-[rgba(122,88,32,0.55)] text-[#6b5320] hover:bg-[rgba(122,88,32,0.1)] sm:h-12"
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <GithubIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
        <span className="hidden sm:inline">View {label} Source</span>
        <span className="sm:hidden">{label} Code</span>
      </a>
    </Button>
  );
}
