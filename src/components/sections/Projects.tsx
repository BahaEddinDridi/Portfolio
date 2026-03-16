"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ProjectCarousel = dynamic(
  () => import("../project-carousel").then((mod) => mod.ProjectCarousel),
  { ssr: false } // disable server-side rendering
);
import { useRef } from "react";

export function Projects() {
  const ref = useRef(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      ref={ref}
      id="projects"
      className="relative min-h-screen py-10 px-4  transition-all duration-1000"
    >
      

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-4"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white">
            Featured Projects
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore my latest work and creative solutions. Click on any project
            to learn more.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
        >
          <ProjectCarousel />
        </motion.div>

        {/* Navigation Hint */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          className="text-center mt-12"
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
