"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeSwitch() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme as "light" | "dark");

    if (initialTheme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    setTimeout(() => {
      if (nextTheme === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", nextTheme);
    }, 500); // Increased to sync with longer animation
  };

  return (
    <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.button
            key="moon"
            onClick={toggleTheme}
            className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full cursor-pointer flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0, x: 40, y: -40, scale: 0.8, rotate: -15 }} // Moon enters from top-right corner
            animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, x: 40, y: 40, scale: 0.8, rotate: 15 }} // Moon exits to bottom-right corner
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }} // Custom cubic-bezier for bouncy feel
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 60px #fff",
              rotate: 5, // Subtle hover rotation
            }}
            whileTap={{ scale: 0.95 }} // Slight scale down on click
            style={{ backgroundColor: "#ffffff", boxShadow: "0 0 40px #fff" }}
          >
            <img
              src="/svgs/moon2.svg"
              alt="moon"
              className="w-8 h-8 md:w-10 md:h-10"
            />
          </motion.button>
        ) : (
          <motion.button
            key="sun"
            onClick={toggleTheme}
            className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full cursor-pointer flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0, x: 40, y: -40, scale: 0.8, rotate: -15 }} // Sun enters from top-right corner
            animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, x: 40, y: 40, scale: 0.8, rotate: 15 }} // Sun exits to bottom-right corner
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }} // Custom cubic-bezier for bouncy feel
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px #FFD700",
              rotate: 5, // Subtle hover rotation
            }}
            whileTap={{ scale: 0.95 }} // Slight scale down on click
            style={{ backgroundColor: "#FACC15", boxShadow: "0 0 8px #FFD700" }}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-yellow-400" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}