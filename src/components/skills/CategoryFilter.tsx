"use client";

import { motion } from "motion/react";

import { schoolNames } from "@/data/skills";
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
            "font-display rounded-sm border px-5 py-2 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300",
            activeCategory === category
              ? "border-gilt bg-gilt/15 text-gilt-text shadow-[0_0_18px_var(--glow)]"
              : "border-border text-foreground/60 hover:border-gilt/60 hover:text-foreground"
          )}
        >
          {schoolNames[category] ?? category}
        </motion.button>
      ))}
    </motion.div>
  );
}
