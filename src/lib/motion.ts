import type { Transition, Variants } from "motion/react";

/** The easing curve every section entrance shares. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const sectionTransition: Transition = {
  duration: 0.9,
  ease: EASE_OUT_EXPO,
};

export const headingTransition: Transition = {
  duration: 0.8,
  ease: EASE_OUT_EXPO,
};

export const textTransition: Transition = {
  duration: 0.75,
  ease: EASE_OUT_EXPO,
};

export const springTransition: Transition = {
  type: "spring",
  stiffness: 140,
  damping: 18,
  mass: 0.9,
};

/** Entrance for a whole `<section>`. */
export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: sectionTransition },
};

/** Entrance for a section heading block. */
export const headingVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1, transition: headingTransition },
};

/** Entrance for body copy and cards. */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: textTransition },
};

/** Parent that reveals its children one after another. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/** Shared `whileInView` viewport config, so sections reveal at the same point. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
