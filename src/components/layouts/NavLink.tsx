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
        "font-display relative px-3 py-1 text-sm font-semibold tracking-[0.17em] uppercase transition-colors duration-300",
        "text-muted-foreground hover:text-gilt",
        isActive && "text-gilt-text"
      )}
    >
      {label}

      {isActive && (
        <motion.span
          layoutId="nav-underline"
          className="bg-gilt absolute bottom-0 left-0 h-px w-full"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
    </motion.button>
  );
}

export default NavLink;
