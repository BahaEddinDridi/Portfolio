"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Badge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { CloseIcon, ExternalLinkIcon, GithubIcon } from "@/lib/icons";
import type { Project } from "@/types";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const SCROLLBAR_CLASS =
  "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500";

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
        className="zoom-in-95 animate-in relative max-h-[98vh] w-full max-w-7xl overflow-hidden rounded-xl bg-slate-50 shadow-2xl duration-300 sm:max-h-[95vh] sm:rounded-2xl dark:bg-slate-950"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-2 top-2 z-50 rounded-full border border-gray-300 bg-gray-200 p-1.5 text-black backdrop-blur-sm transition-all hover:bg-gray-300 sm:right-4 sm:top-4 sm:p-2 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
        >
          <CloseIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <div
          className={`flex h-full max-h-[98vh] flex-col overflow-y-auto sm:max-h-[95vh] ${SCROLLBAR_CLASS}`}
        >
          <div className="space-y-4 bg-slate-50 p-4 sm:space-y-6 sm:p-6 md:p-8 lg:p-10 dark:bg-slate-950">
            <header>
              <Badge className="mb-3 border-slate-300 bg-slate-200 text-xs text-slate-900 sm:mb-4 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                {project.category}
              </Badge>
              <h2 className="mb-3 pr-8 text-2xl font-bold text-slate-900 sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl dark:text-white">
                {project.title}
              </h2>
              <p className="text-sm text-slate-600 sm:text-base dark:text-slate-400">
                {project.shortDescription}
              </p>
            </header>

            <section>
              <h3 className="mb-2 text-lg font-semibold text-slate-900 sm:mb-3 sm:text-xl md:text-2xl dark:text-white">
                About This Project
              </h3>
              <p className="text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
                {project.fullDescription}
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-lg font-semibold text-slate-900 sm:mb-4 sm:text-xl md:text-2xl dark:text-white">
                Technologies Used
              </h3>
              <ul className="flex list-none flex-wrap gap-1.5 sm:gap-2">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-slate-300 bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-900 sm:px-3 sm:py-1.5 sm:text-sm md:px-4 md:py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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
    <div className="flex flex-col gap-2 pt-2 sm:gap-3 sm:pt-4 md:gap-4">
      {liveUrl && (
        <Button
          asChild
          className="h-10 w-full bg-slate-900 text-sm text-white hover:bg-slate-800 sm:h-11 sm:text-base md:h-12 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
        >
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
      variant="outline"
      className="h-10 flex-1 border-slate-300 bg-transparent text-sm text-slate-900 hover:bg-slate-100 sm:h-11 sm:text-base md:h-12 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <GithubIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
        <span className="hidden sm:inline">View {label} Source</span>
        <span className="sm:hidden">{label} Code</span>
      </a>
    </Button>
  );
}
