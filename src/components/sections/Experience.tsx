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
          <h2 className="font-display text-gilt-text mb-4 text-4xl font-extrabold tracking-[0.06em] uppercase md:text-5xl">
            The Chronicle
          </h2>
          <p className="mx-auto max-w-2xl text-lg italic opacity-70">
            Quests undertaken, in the order they were survived.
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
