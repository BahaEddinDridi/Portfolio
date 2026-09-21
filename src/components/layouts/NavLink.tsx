"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

interface NavLinkProps {
  id: string;
  label: string;
  isActive?: boolean;
  onClick: (id: string) => void;
}

export function NavLink({ id, label, isActive, onClick }: NavLinkProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onClick(id)}
      aria-current={isActive ? "true" : undefined}
      whileHover={{ scale: 1.1, textShadow: "0 0 10px rgba(255,255,150,0.7)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative px-3 py-1 text-lg font-semibold transition-colors duration-300",
        "text-black hover:text-orange-400 dark:text-white dark:hover:text-yellow-300",
        isActive && "text-orange-500 dark:text-yellow-300"
      )}
    >
      {label}

      {isActive && (
        <motion.span
          layoutId="nav-underline"
          className="absolute bottom-0 left-0 h-0.5 w-full rounded bg-orange-500 dark:bg-yellow-300"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
    </motion.button>
  );
}

export default NavLink;
