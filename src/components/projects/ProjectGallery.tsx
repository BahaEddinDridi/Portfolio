"use client";

import { useState } from "react";
import Image from "next/image";

import { ChevronLeftIcon, ChevronRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectGalleryProps {
  project: Project;
}

const SCROLLBAR_CLASS =
  "[&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500";

const ARROW_CLASS =
  "absolute top-1/2 -translate-y-1/2 rounded-full border border-gray-300 bg-gray-200 p-1.5 text-black backdrop-blur-sm transition-all hover:bg-gray-300 sm:p-2 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20";

/**
 * Images and videos for one project.
 *
 * Both media lists are addressed through a single index: images occupy
 * `0..gallery.length - 1` and videos follow, which is what lets one pair of
 * arrows walk the whole set.
 */
export function ProjectGallery({ project }: ProjectGalleryProps) {
  const [index, setIndex] = useState(0);

  const { gallery, video } = project;
  const total = gallery.length + video.length;

  if (total === 0) return null;

  const activeVideo = index >= gallery.length ? video[index - gallery.length] : null;
  const move = (delta: number) => setIndex((prev) => (prev + delta + total) % total);

  return (
    <div className="relative flex flex-col gap-3 bg-slate-50 p-4 sm:gap-4 sm:p-6 md:p-8 dark:bg-slate-950">
      <div className="relative h-[250px] overflow-hidden rounded-lg sm:h-[350px] md:h-[450px] lg:h-[500px]">
        {activeVideo ? (
          <video
            src={activeVideo}
            controls
            preload="metadata"
            className="h-full w-full object-contain"
          />
        ) : (
          <Image
            src={gallery[index]}
            alt={`${project.title} — image ${index + 1} of ${gallery.length}`}
            width={1200}
            height={800}
            className="h-full w-full object-contain"
          />
        )}

        {total > 1 && (
          <>
            <button
              type="button"
              className={cn(ARROW_CLASS, "left-1 sm:left-2")}
              onClick={() => move(-1)}
              aria-label="Previous media"
            >
              <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              type="button"
              className={cn(ARROW_CLASS, "right-1 sm:right-2")}
              onClick={() => move(1)}
              aria-label="Next media"
            >
              <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </>
        )}
      </div>

      <div className={cn("flex gap-1.5 overflow-x-auto p-1 sm:gap-2 sm:p-2", SCROLLBAR_CLASS)}>
        {gallery.map((image, thumbIndex) => (
          <Thumbnail
            key={image}
            isActive={index === thumbIndex}
            onClick={() => setIndex(thumbIndex)}
            label={`View image ${thumbIndex + 1}`}
          >
            <Image
              src={image}
              alt=""
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
          </Thumbnail>
        ))}

        {video.map((source, videoIndex) => (
          <Thumbnail
            key={source}
            isActive={index === gallery.length + videoIndex}
            onClick={() => setIndex(gallery.length + videoIndex)}
            label={`View video ${videoIndex + 1}`}
          >
            <span className="flex h-full w-full items-center justify-center bg-slate-800 text-[10px] text-white sm:text-xs">
              Video {videoIndex + 1}
            </span>
          </Thumbnail>
        ))}
      </div>
    </div>
  );
}

function Thumbnail({
  isActive,
  onClick,
  label,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-current={isActive}
      className={cn(
        "relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:h-20 sm:w-20",
        isActive
          ? "scale-105 border-gray-600"
          : "border-gray-200 hover:border-gray-400 dark:border-white/20 dark:hover:border-white/50"
      )}
    >
      {children}
    </button>
  );
}
