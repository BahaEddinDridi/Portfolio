import { motion } from "framer-motion";
import { iconComponents } from "@/types/techIcons";

interface TooltipIconProps {
  skill: string;
}

export default function TooltipIcon({ skill }: TooltipIconProps) {
  const iconType = skill as keyof typeof iconComponents;
  const { component: Component, color } = iconComponents[iconType];

  return (
    <div className="relative flex justify-center items-center">
      <motion.div
        className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
        style={{ backgroundColor: `${color}20` }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { duration: 0.4 } }}
        whileHover={{ scale: 1.2, boxShadow: `0 0 15px ${color}80` }}
        whileTap={{ scale: 0.9 }}
        aria-label={`${skill} icon`}
        tabIndex={0}
      >
        <Component style={{ color, fontSize: '1.5rem' }} />
      </motion.div>
      <div
        className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-violet-500 text-white text-sm px-3 py-1 rounded-md opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:top-[-50px]"
        aria-hidden="true"
      >
        {skill}
      </div>
    </div>
  );
}