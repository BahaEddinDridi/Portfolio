"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";

import {
  fadeUpVariants,
  headingVariants,
  sectionTransition,
  viewportOnce,
} from "@/lib/motion";

/** Drag-driven and image-heavy, so it stays out of the initial chunk. */
const ProjectCarousel = dynamic(
  () =>
    import("@/components/projects/ProjectCarousel").then(
      (mod) => mod.ProjectCarousel
    ),
  { ssr: false }
);

export function Projects() {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={sectionTransition}
      className="relative min-h-screen px-4 py-10"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="space-y-4 text-center"
        >
          <h2 className="font-display text-gilt-text text-5xl font-extrabold tracking-[0.08em] uppercase md:text-6xl">
            Artifacts
          </h2>
          <p className="mx-auto max-w-2xl text-lg italic opacity-70">
            Nine things I built and did not entirely regret. Turn the wheel.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <ProjectCarousel />
        </motion.div>

      </div>
    </motion.section>
  );
}

export default Projects;
