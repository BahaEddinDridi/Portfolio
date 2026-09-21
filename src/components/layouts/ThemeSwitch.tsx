"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

import { useTheme } from "@/hooks/useTheme";

const BUTTON_CLASS =
  "absolute flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full md:h-16 md:w-16";

/** Both faces enter from the top-right and leave to the bottom-right. */
const transition = {
  initial: { opacity: 0, x: 40, y: -40, scale: 0.8, rotate: -15 },
  animate: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 },
  exit: { opacity: 0, x: 40, y: 40, scale: 0.8, rotate: 15 },
  transition: { duration: 1, ease: [0.4, 0, 0.2, 1] as const },
};

export function ThemeSwitch() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="relative flex h-12 w-12 items-center justify-center md:h-16 md:w-16">
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.button
            key="moon"
            type="button"
            onClick={toggleTheme}
            aria-label="Switch to light theme"
            className={BUTTON_CLASS}
            style={{ backgroundColor: "#ffffff", boxShadow: "0 0 40px #fff" }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 60px #fff", rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            {...transition}
          >
            <Image
              src="/svgs/moon2.svg"
              alt=""
              width={40}
              height={40}
              className="h-8 w-8 md:h-10 md:w-10"
            />
          </motion.button>
        ) : (
          <motion.button
            key="sun"
            type="button"
            onClick={toggleTheme}
            aria-label="Switch to dark theme"
            className={BUTTON_CLASS}
            style={{ backgroundColor: "#FACC15", boxShadow: "0 0 8px #FFD700" }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px #FFD700", rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            {...transition}
          >
            <span className="h-8 w-8 rounded-full bg-yellow-400 md:h-10 md:w-10" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ThemeSwitch;
