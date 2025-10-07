import { motion } from "framer-motion";
import { iconComponents } from "@/types/techIcons";

interface SkillItemProps {
  skill: string;
}

export default function SkillItem({ skill }: SkillItemProps) {
  const iconType = skill as keyof typeof iconComponents;
  const { component: Component, color } = iconComponents[iconType];

  return (
    <motion.div
      className="flex items-center gap-2 py-1.5"
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.3 } }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      tabIndex={0}
      aria-label={`Skill: ${skill}`}
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center shadow-inner"
        style={{ backgroundColor: `${color}20`, boxShadow: `inset 0 0 5px ${color}50` }}
      >
        <Component style={{ color, fontSize: '1.125rem' }} />
      </div>
      <span className="text-sm text-gray-200">
        {skill.charAt(0).toUpperCase() + skill.slice(1).replace(/([A-Z])/g, ' $1')}
      </span>
    </motion.div>
  );
}