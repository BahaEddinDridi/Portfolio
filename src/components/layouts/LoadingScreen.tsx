"use client";

import { motion } from "motion/react";

import { LottiePlayer } from "@/components/effects/LottiePlayer";
import { lotties } from "@/data/lotties";

export function LoadingScreen() {
  return (
    <motion.div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-[#030f18]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <LottiePlayer
        src={lotties.loading}
        className="relative z-10 h-1/2 w-1/2 brightness-100 dark:brightness-70"
      />
    </motion.div>
  );
}

export default LoadingScreen;
