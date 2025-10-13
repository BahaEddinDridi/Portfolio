"use client";

import { motion } from "framer-motion";

interface CloudSvgProps {
  className?: string;
  animate?: boolean;
}

export function SmallCloud({
  className = "",
  delay = 0,
}: CloudSvgProps & { delay?: number }) {
  return (
    <motion.svg
      viewBox="0 0 120 60"
      className={className}
      animate={{
        x: [0, 5, 0],
        y: [0, -5, 0],
      }}
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        delay,
        ease: "easeInOut",
      }}
    >
      <circle
        cx="20"
        cy="35"
        r="15"
        className="fill-gray-200 dark:fill-gray-600 opacity-95"
      />
      <circle
        cx="35"
        cy="30"
        r="18"
        className="fill-gray-200 dark:fill-gray-600 opacity-95"
      />
      <circle
        cx="50"
        cy="28"
        r="20"
        className="fill-gray-200 dark:fill-gray-600 opacity-95"
      />
      <circle
        cx="65"
        cy="30"
        r="18"
        className="fill-gray-100 dark:fill-gray-500 opacity-95"
      />
      <circle
        cx="80"
        cy="32"
        r="16"
        className="fill-gray-100 dark:fill-gray-500 opacity-95"
      />
      <circle
        cx="95"
        cy="35"
        r="14"
        className="fill-gray-100 dark:fill-gray-500 opacity-95"
      />

      <circle
        cx="42"
        cy="40"
        r="12"
        className="fill-gray-100 dark:fill-gray-500 opacity-90"
      />
      <circle
        cx="58"
        cy="38"
        r="14"
        className="fill-gray-100 dark:fill-gray-500 opacity-90"
      />
      <circle
        cx="72"
        cy="42"
        r="11"
        className="fill-gray-100 dark:fill-gray-500 opacity-90"
      />
    </motion.svg>
  );
}
