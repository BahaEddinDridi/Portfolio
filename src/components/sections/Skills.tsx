"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import React from "react";
const Particles = dynamic(() => import("../Particles").then(mod => React.memo(mod.default)), {
  ssr: false
});
const ShootingStars = dynamic(() => import("../ShootingStar"), { ssr: false });

interface Skill {
  name: string;
  category: string;
  level: 1 | 2 | 3;
  x: number;
  y: number;
}

const skills: Skill[] = [
  { name: "React", category: "Frontend", level: 3, x: 20, y: 20 },
  { name: "Next.js", category: "Frontend", level: 3, x: 30, y: 35 },
  { name: "Angular", category: "Frontend", level: 2, x: 40, y: 25 },
  { name: "Nuxt3", category: "Frontend", level: 2, x: 50, y: 40 },

  { name: "Spring", category: "Backend", level: 2, x: 55, y: 20 },
  { name: "Express", category: "Backend", level: 3, x: 65, y: 30 },
  { name: "Nest", category: "Backend", level: 2, x: 75, y: 20 },
  { name: ".NET", category: "Backend", level: 1, x: 85, y: 30 },
  { name: "Django", category: "Backend", level: 1, x: 70, y: 40 },
  { name: "Laravel", category: "Backend", level: 1, x: 80, y: 50 },

  { name: "Jenkins", category: "Tools", level: 2, x: 35, y: 68 },
  { name: "Docker", category: "Tools", level: 2, x: 44, y: 65 },
  { name: "Github", category: "Tools", level: 3, x: 53, y: 68 },
  { name: "Jira", category: "Tools", level: 3, x: 38, y: 75 },
  { name: "Trello", category: "Tools", level: 3, x: 47, y: 78 },
  { name: "Scrum", category: "Tools", level: 3, x: 56, y: 75 },
  { name: "Figma", category: "Tools", level: 1, x: 41, y: 83 },
  { name: "Adobe", category: "Tools", level: 2, x: 50, y: 86 },
];

const connections: Record<string, Array<[string, string]>> = {
  Frontend: [
    ["React", "Next.js"],
    ["Next.js", "Angular"],
    ["Angular", "Nuxt3"],
    ["React", "Angular"],
  ],
  Backend: [
    ["Spring", "Express"],
    ["Express", "Nest"],
    ["Nest", ".NET"],
    [".NET", "Django"],
    ["Django", "Laravel"],
    ["Express", "Django"],
  ],
  Tools: [
    ["Jenkins", "Docker"],
    ["Docker", "Github"],
    ["Jenkins", "Jira"],
    ["Docker", "Trello"],
    ["Github", "Scrum"],
    ["Jira", "Trello"],
    ["Trello", "Figma"],
    ["Scrum", "Figma"],
    ["Figma", "Adobe"],
    ["Trello", "Adobe"],
  ],
};

const categories = ["All", "Frontend", "Backend", "Tools"];

const scatteredPositions: Record<string, { x: number; y: number }> = {
  // Frontend - top left area
  React: { x: 15, y: 18 },
  "Next.js": { x: 28, y: 30 },
  Angular: { x: 20, y: 42 },
  Nuxt3: { x: 33, y: 54 },
  // Backend - top right area
  Spring: { x: 65, y: 15 },
  Express: { x: 78, y: 25 },
  Nest: { x: 73, y: 35 },
  ".NET": { x: 86, y: 45 },
  Django: { x: 68, y: 52 },
  Laravel: { x: 81, y: 64 },
  // Tools - bottom center area
  Jenkins: { x: 38, y: 78 },
  Docker: { x: 50, y: 82 },
  Github: { x: 62, y: 78 },
  Jira: { x: 42, y: 68 },
  Trello: { x: 54, y: 64 },
  Scrum: { x: 66, y: 68 },
  Figma: { x: 46, y: 56 },
  Adobe: { x: 58, y: 52 },
};

const calculateCenteredPositions = () => {
  const result: Record<string, Record<string, { x: number; y: number }>> = {};

  const categorySkills = {
    Frontend: ["React", "Next.js", "Angular", "Nuxt3"],
    Backend: ["Spring", "Express", "Nest", ".NET", "Django", "Laravel"],
    Tools: [
      "Jenkins",
      "Docker",
      "Github",
      "Jira",
      "Trello",
      "Scrum",
      "Figma",
      "Adobe",
    ],
  };

  const scaleFactors: Record<string, number> = {
    Frontend: 2.2,
    Backend: 1.7,
    Tools: 2.0,
  };

  Object.entries(categorySkills).forEach(([category, skillNames]) => {
    result[category] = {};

    // Find the bounding box of the constellation in scattered view
    const positions = skillNames.map((name) => scatteredPositions[name]);
    const minX = Math.min(...positions.map((p) => p.x));
    const maxX = Math.max(...positions.map((p) => p.x));
    const minY = Math.min(...positions.map((p) => p.y));
    const maxY = Math.max(...positions.map((p) => p.y));

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    const scaleFactor = scaleFactors[category] || 2.2;

    // Calculate new positions maintaining the exact same shape
    skillNames.forEach((name) => {
      const originalPos = scatteredPositions[name];
      // Get relative position from center
      const relativeX = originalPos.x - centerX;
      const relativeY = originalPos.y - centerY;

      // Scale up and recenter to 50, 50
      result[category][name] = {
        x: 50 + relativeX * scaleFactor,
        y: 50 + relativeY * scaleFactor,
      };
    });
  });

  return result;
};

const centeredPositions = calculateCenteredPositions();

export function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [previousCategory, setPreviousCategory] = useState("All");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setPreviousCategory(activeCategory);
  }, [activeCategory]);

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  const getActiveConnections = () => {
    if (activeCategory === "All") {
      return Object.values(connections).flat();
    }
    return connections[activeCategory] || [];
  };

  const findSkill = (name: string) => skills.find((s) => s.name === name);

  const getSkillPosition = (skill: Skill) => {
    if (activeCategory === "All") {
      return scatteredPositions[skill.name] || { x: skill.x, y: skill.y };
    }
    // Use centered positions for individual categories
    return centeredPositions[activeCategory]?.[skill.name] || { x: 50, y: 50 };
  };

  const getSkillOpacity = (skill: Skill) => {
    if (activeCategory === "All") return 1;

    // If switching between individual categories (not from/to All)
    if (previousCategory !== "All" && activeCategory !== "All") {
      // Fade out previous category, fade in new category
      if (skill.category === activeCategory) return 1;
      if (skill.category === previousCategory) return 0;
      return 0;
    }

    return skill.category === activeCategory ? 1 : 0;
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: "easeOut" }}
      onViewportEnter={() => setHasAnimated(true)}
      ref={ref}
      id="skills"
      className="
        relative min-h-screen w-full py-12 md:py-10 px-4 overflow-hidden transition-all duration-1000
        "
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight  dark:text-white text-gray-900">
            Skills & Technologies
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed  dark:text-gray-400 text-gray-600">
            A constellation of tools and technologies I use to craft exceptional
            digital experiences
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.5,
                delayChildren: 0.8, // each button animates 0.5s after the previous
              },
            },
          }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              variants={{
                hidden: { opacity: 0, y: -50, rotateX: -90 }, // Start higher with 3D rotation
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    duration: 0.6,
                  },
                },
              }}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                "border hover:border-gray-600",
                "dark:border-gray-700 border-gray-300",
                activeCategory === category
                  ? "bg-white text-gray-900 border-gray-500 dark:shadow-[0_0_15px_rgba(255,255,255,0.3)] shadow-[0_0_15px_rgba(0,0,0,0.3)] dark:bg-white/10 dark:text-white dark:border-white"
                  : "bg-gray-100 text-gray-700 hover:text-gray-900 dark:bg-gray-900/50 dark:text-gray-400"
              )}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
        <div
          className="flex flex-col lg:flex-row gap-4 md:gap-6 items-start
             dark:bg-transparent p-4 rounded-xl border border-gray-300 dark:border-transparent"
          style={{
            background: isDarkMode
              ? "transparent"
              : "radial-gradient(circle, #001f3f 0%, #0077b6 70%, #00b4d8 100%)",
          }}
        >
          <div className="relative w-full lg:flex-1 h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
            <svg
              className="absolute inset-0 w-full h-full transition-all duration-700 ease-out"
              style={{
                filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))",
              }}
            >
              {getActiveConnections().map(([from, to], index) => {
                const fromSkill = findSkill(from);
                const toSkill = findSkill(to);
                if (!fromSkill || !toSkill) return null;

                const fromPos = getSkillPosition(fromSkill);
                const toPos = getSkillPosition(toSkill);
                const opacity = Math.min(
                  getSkillOpacity(fromSkill),
                  getSkillOpacity(toSkill)
                );

                const isHighlighted =
                  hoveredSkill === from || hoveredSkill === to;

                const dx = toPos.x - fromPos.x;
                const dy = toPos.y - fromPos.y;
                const length = Math.sqrt(dx * dx + dy * dy);

                return (
                  <motion.line
                    key={`${from}-${to}-${index}`}
                    x1={`${fromPos.x}%`}
                    y1={`${fromPos.y}%`}
                    x2={`${toPos.x}%`}
                    y2={`${toPos.y}%`}
                    strokeWidth={isHighlighted ? "2" : "1"}
                    className="transition-all duration-700"
                    stroke={
                      isHighlighted
                        ? isDarkMode
                          ? "rgba(255, 255, 255, 0.9)" // White in dark mode
                          : "rgba(255, 215, 140, 0.9)" // Soft golden in light mode
                        : isDarkMode
                        ? "rgba(255, 255, 255, 0.3)" // Normal dark mode
                        : "rgba(255, 215, 140, 0.5)" // Normal soft golden in light mode
                    }
                    style={{
                      filter: isHighlighted
                        ? isDarkMode
                          ? "drop-shadow(0 0 4px rgba(255,255,255,0.8))"
                          : "drop-shadow(0 0 4px rgba(255,215,140,0.5))"
                        : isDarkMode
                        ? "none"
                        : "drop-shadow(0 0 2px rgba(255,215,140,0.2))",
                      opacity: opacity,
                    }}
                    initial={{
                      pathLength: 0,
                      opacity: 0,
                    }}
                    animate={
                      hasAnimated
                        ? {
                            pathLength: opacity,
                            opacity: opacity,
                          }
                        : {}
                    }
                    transition={{
                      pathLength: {
                        delay: 0.6 + index * 0.05, // Start after buttons, stagger each line
                        duration: 0.5,
                        ease: "easeInOut",
                      },
                      opacity: {
                        delay: 1.8 + index * 0.05,
                        duration: 0.3,
                      },
                    }}
                  />
                );
              })}
            </svg>

            {skills.map((skill, skillIndex) => {
              const isHovered = hoveredSkill === skill.name;
              const isConnected = getActiveConnections().some(
                ([from, to]) =>
                  (from === skill.name || to === skill.name) &&
                  (hoveredSkill === from || hoveredSkill === to)
              );

              const position = getSkillPosition(skill);
              const opacity = getSkillOpacity(skill);

              return (
                <motion.div
                  key={skill.name}
                  className="absolute"
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    transform: "translate(-50%, -50%)",
                    pointerEvents: opacity === 0 ? "none" : "auto",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: opacity }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Fixed container wrapper */}
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    {/* Inner star motion div with all your effects */}
                    <motion.div
                      className="group cursor-pointer transition-all duration-700 ease-out"
                      style={{
                        cursor: "url('/cursor/custom-pointer.png'), pointer",
                      }}
                      initial={{
                        scale: 0,
                        rotate: -180,
                      }}
                      animate={
                        hasAnimated
                          ? {
                              scale: opacity,
                              rotate: 0,
                            }
                          : {}
                      }
                      transition={{
                        delay: 1.5 + skillIndex * 0.08,
                        duration: 0.6,
                        ease: "easeOut",
                        scale: { type: "spring", stiffness: 200, damping: 20 },
                      }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      {/* 4-point star node */}
                      <div className="relative flex items-center justify-center">
                        {/* Outer glow ring */}
                        <motion.div
                          className={cn(
                            "absolute w-12 h-12 rounded-full blur-xl",
                            "bg-yellow-200/20 dark:bg-white/20",
                            isHovered &&
                              "w-20 h-20 bg-yellow-200/40 dark:bg-white/40",
                            isConnected &&
                              !isHovered &&
                              "w-16 h-16 bg-yellow-200/30 dark:bg-white/30"
                          )}
                          animate={{
                            scale: [1, 1.2, 1], // pulse scale
                            opacity: [0.7, 1, 0.7], // optional subtle opacity pulse
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />

                        {/* Middle glow */}
                        <motion.div
                          className={cn(
                            "absolute w-8 h-8 rounded-full blur-md",
                            "bg-yellow-200/40 dark:bg-white/40",
                            isHovered &&
                              "w-12 h-12 bg-yellow-200/60 dark:bg-white/60",
                            isConnected &&
                              !isHovered &&
                              "w-10 h-10 bg-yellow-200/50 dark:bg-white/50"
                          )}
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random(), // randomize start to make them pulse asynchronously
                          }}
                        />

                        {/* Inner SVG */}
                        <motion.svg
                          className={cn(
                            "relative transition-all duration-300",
                            isHovered ? "w-5 h-5" : "w-3 h-3",
                            isConnected && !isHovered && "w-4 h-4"
                          )}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          style={{
                            color: isDarkMode
                              ? "white"
                              : "rgba(255,215,140,0.9)",
                            filter: isHovered
                              ? isDarkMode
                                ? "drop-shadow(0 0 8px rgba(255, 255, 255, 1))"
                                : "drop-shadow(0 0 8px rgba(255,215,140,0.8))"
                              : isConnected
                              ? isDarkMode
                                ? "drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))"
                                : "drop-shadow(0 0 6px rgba(255,215,140,0.6))"
                              : isDarkMode
                              ? "drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))"
                              : "drop-shadow(0 0 4px rgba(255,215,140,0.4))",
                          }}
                          animate={{
                            scale: [1, 1.5, 1], // pulsate
                            opacity: [1, 0.85, 1], // subtle opacity pulse
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random(), // asynchronous pulse for natural look
                          }}
                        >
                          <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
                        </motion.svg>

                        {/* Tooltip */}
                        <div
                          className={cn(
                            "absolute top-full mt-4 px-4 py-2 rounded-lg transition-all duration-300 pointer-events-none whitespace-nowrap z-50",
                            "border backdrop-blur-sm",
                            " dark:bg-gray-900/95 dark:border-white/50 bg-white/95 border-gray-300",
                            "shadow-[0_0_20px_rgba(255,255,255,0.3)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] ",
                            isHovered
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-2"
                          )}
                          
                        >
                          <div className="text-center">
                            <p className="font-semibold text-sm  dark:text-white text-gray-900">
                              {skill.name}
                            </p>
                            <p className="text-xs mt-1  dark:text-gray-400 text-gray-600">
                              {skill.category}
                            </p>
                            <div className="flex justify-center gap-1 mt-2">
                              {[...Array(3)].map((_, i) => (
                                <div
                                  key={i}
                                  className={cn(
                                    "w-1.5 h-1.5 rounded-full",
                                    i < skill.level
                                      ? "bg-gray-700 shadow-[0_0_15px_rgba(0,0,0,0.3)] dark:bg-white dark:shadow-[0_0_5px_rgba(255,255,255,0.8)] "
                                      : " bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 "
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white/50 dark:border-b-white/50 " />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="w-full lg:w-40 rounded-xl border backdrop-blur-sm p-3 bg-gradient-to-br from-gray-100/80 to-gray-100/40 border-gray-300 dark:from-gray-900/80 dark:to-gray-900/40 dark:border-gray-800 ">
            <h3 className="font-semibold text-xs mb-2 flex items-center gap-1.5  dark:text-white text-gray-900">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
              </svg>
              Proficiency
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-700 shadow-[0_0_15px_rgba(0,0,0,0.3)] dark:bg-white dark:shadow-[0_0_5px_rgba(255,255,255,0.8)] " />
                  <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-gray-700 " />
                  <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-gray-700 " />
                </div>
                <span className="text-[10px] dark:text-white text-gray-900">
                  Fine
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-700 shadow-[0_0_15px_rgba(0,0,0,0.3)] dark:bg-white dark:shadow-[0_0_5px_rgba(255,255,255,0.8)] " />
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-700 shadow-[0_0_15px_rgba(0,0,0,0.3)] dark:bg-white dark:shadow-[0_0_5px_rgba(255,255,255,0.8)] " />
                  <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-gray-700 " />
                </div>
                <span className="text-[10px] dark:text-white text-gray-900">
                  Intermediate
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-700 shadow-[0_0_15px_rgba(0,0,0,0.3)] dark:bg-white dark:shadow-[0_0_5px_rgba(255,255,255,0.8)] " />
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-700 shadow-[0_0_15px_rgba(0,0,0,0.3)] dark:bg-white dark:shadow-[0_0_5px_rgba(255,255,255,0.8)] " />
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-700 shadow-[0_0_15px_rgba(0,0,0,0.3)] dark:bg-white dark:shadow-[0_0_5px_rgba(255,255,255,0.8)] " />
                </div>
                <span className="text-[10px] dark:text-white text-gray-900">
                  Advanced
                </span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-700 dark:border-gray-700 ">
              <p className="text-[9px] leading-relaxed text-gray-800 dark:text-gray-400 ">
                Hover over stars to see details
              </p>
            </div>
          </div>
        </div>

        {/* Bottom decorative text */}
        <div className="mt-4 md:mt-6 text-center">
          <p className="text-sm font-mono text-gray-600 dark:text-gray-600 ">
            Always learning, always growing
          </p>
        </div>
      </div>
    </motion.section>
  );
}
