"use client";

import { motion } from "framer-motion";

interface NavLinkProps {
  id: string;
  label: string;
  isActive?: boolean;
  onClick: (id: string) => void;
}

export default function NavLink({ id, label, isActive, onClick }: NavLinkProps) {
  return (
    <motion.button
      onClick={() => onClick(id)}
      whileHover={{ scale: 1.1, textShadow: "0 0 10px rgba(255,255,150,0.7)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative font-semibold text-lg px-3 py-1 transition-colors duration-300
        text-black hover:text-orange-400
        dark:text-white dark:hover:text-yellow-300
        ${isActive ? "text-orange-500 dark:text-yellow-300" : ""}`}
    >
      {label}

      {isActive && (
        <motion.span
          layoutId="underline"
          className={`absolute left-0 bottom-0 w-full h-0.5 rounded
            ${isActive ? "bg-orange-500 dark:bg-yellow-300" : ""}`}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
    </motion.button>
  );
}
