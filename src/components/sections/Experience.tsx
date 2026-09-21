"use client";

import { motion } from "motion/react";

import { ProfessionalTimeline } from "@/components/experience/ProfessionalTimeline";
import { experiences } from "@/data/experience";
import {
  fadeUpVariants,
  headingVariants,
  sectionTransition,
} from "@/lib/motion";

export function Experience() {
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={sectionTransition}
      className="relative flex min-h-screen items-center justify-center px-4 py-10"
    >
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl dark:text-white">
            Professional Experience
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            A journey through my professional career, showcasing the projects
            and roles that shaped my expertise
          </p>
        </motion.div>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <ProfessionalTimeline data={experiences} expandMode="multi" />
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Experience;
