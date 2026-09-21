"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { SkillConstellation } from "@/components/skills/SkillConstellation";
import {
  fadeUpVariants,
  headingVariants,
  sectionTransition,
} from "@/lib/motion";

export function Skills() {
  // The constellation's staggered entrance only starts once the section is seen.
  const [hasAnimated, setHasAnimated] = useState(false);

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={sectionTransition}
      onViewportEnter={() => setHasAnimated(true)}
      className="relative min-h-screen w-full overflow-hidden px-4 py-12 md:py-10"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mb-8 text-center md:mb-16"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Skills &amp; Technologies
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg dark:text-gray-400">
            A constellation of tools and technologies I use to craft exceptional
            digital experiences
          </p>
        </motion.div>

        <SkillConstellation hasAnimated={hasAnimated} />

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-4 text-center md:mt-6"
        >
          <p className="font-mono text-sm text-gray-600 dark:text-gray-600">
            Always learning, always growing
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Skills;
