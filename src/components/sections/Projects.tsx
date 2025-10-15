"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ProjectCarousel = dynamic(
  () => import("../project-carousel").then((mod) => mod.ProjectCarousel),
  { ssr: false } // disable server-side rendering
);
import { useRef } from "react";
const Particles = dynamic(() => import("../Particles"), { ssr: false });
const ShootingStars = dynamic(() => import("../ShootingStar"), { ssr: false });

export function Projects() {
  const ref = useRef(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: "easeOut" }}
      ref={ref}
      id="projects"
      className="relative min-h-screen py-10 px-4  transition-all duration-1000"
    >
      

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <ProjectCarousel />
        </motion.div>

        {/* Navigation Hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
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
