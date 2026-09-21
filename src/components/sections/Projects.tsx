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
          <h2 className="text-5xl font-bold text-slate-900 md:text-6xl dark:text-white">
            Featured Projects
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Explore my latest work and creative solutions. Click on any project
            to learn more.
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

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Drag to rotate, use arrow buttons, or click indicators to navigate
            through projects
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Projects;
