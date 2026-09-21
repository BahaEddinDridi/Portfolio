"use client";

import { motion } from "motion/react";

import { LottiePlayer } from "@/components/effects/LottiePlayer";
import { MagicSparkles } from "@/components/effects/MagicSparkles";
import RotatingText from "@/components/effects/RotatingText";
import SparklesText from "@/components/effects/SparklyText";
import { lotties } from "@/data/lotties";
import { site } from "@/data/site";
import { EASE_OUT_EXPO, sectionTransition, springTransition } from "@/lib/motion";

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={sectionTransition}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-40 text-gray-900 sm:px-8 md:px-16 lg:px-32 dark:text-white"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-12">
        <div className="flex max-w-lg flex-none flex-col items-start justify-center gap-4 text-left sm:gap-6">
          <motion.span
            initial={{ opacity: 0, x: -18, y: 6, scale: 0.985 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.85, ease: EASE_OUT_EXPO }}
            className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl dark:text-white"
          >
            Hi, I&rsquo;m{" "}
            <SparklesText
              as="h1"
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white dark:[--sparkle-first:#f0abfc] dark:[--sparkle-second:#a78bfa]"
              sparkleCount={15}
              sparkleSize={18}
              colors={{
                first: "var(--sparkle-first, #5b21b6)",
                second: "var(--sparkle-second, #14b8a6)",
              }}
            >
              {site.name.split(" ").slice(0, 2).join(" ")}
            </SparklesText>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16, scale: 0.99 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay: 0.06 }}
            className="text-2xl font-semibold whitespace-nowrap text-gray-900 sm:text-3xl lg:text-5xl dark:text-white"
          >
            I&rsquo;m an inspiring{" "}
            <RotatingText
              texts={[...site.roles]}
              mainClassName="inline-block text-teal-600 dark:text-purple-400 font-bold"
              staggerFrom="last"
              initial={{ x: "100%", y: "100%", opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={{ x: "-100%", y: "-100%", opacity: 0 }}
              staggerDuration={0.03}
              splitLevelClassName="overflow-hidden inline-block"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2500}
            />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.75, ease: EASE_OUT_EXPO, delay: 0.08 }}
            className="mt-2 max-w-lg text-lg text-gray-800 sm:text-xl lg:text-2xl dark:text-gray-200"
          >
            {site.tagline}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24, y: 10, scale: 0.92, rotate: 2 }}
          whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={springTransition}
          className="relative z-10 hidden h-1/3 w-1/3 flex-none sm:block"
        >
          <div className="absolute -left-24 top-30 z-20 h-32 w-32 -translate-y-1/2">
            <MagicSparkles />
          </div>
          <LottiePlayer
            src={lotties.magic}
            className="relative z-10 brightness-100 dark:brightness-70"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Hero;
