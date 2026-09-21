"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: readonly string[];
  activeCategory: string;
  onChange: (category: string) => void;
}

const buttonVariants = {
  hidden: { opacity: 0, y: -50, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

/** The All / Frontend / Backend / Tools switcher above the constellation. */
export function CategoryFilter({
  categories,
  activeCategory,
  onChange,
}: CategoryFilterProps) {
  return (
    <motion.div
      role="group"
      aria-label="Filter skills by category"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
      }}
      className="mb-8 flex flex-wrap justify-center gap-2 md:mb-12 md:gap-3"
    >
      {categories.map((category) => (
        <motion.button
          key={category}
          type="button"
          variants={buttonVariants}
          onClick={() => onChange(category)}
          aria-pressed={activeCategory === category}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 md:px-6",
            "border-gray-300 hover:border-gray-600 dark:border-gray-700",
            activeCategory === category
              ? "border-gray-500 bg-white text-gray-900 shadow-[0_0_15px_rgba(0,0,0,0.3)] dark:border-white dark:bg-white/10 dark:text-white dark:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              : "bg-gray-100 text-gray-700 hover:text-gray-900 dark:bg-gray-900/50 dark:text-gray-400"
          )}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
}
