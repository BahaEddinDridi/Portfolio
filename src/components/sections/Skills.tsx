"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Particles from "../Particles";
import ShootingStars from "../ShootingStar";

interface Skill {
  name: string;
  category: string;
  level: 1 | 2 | 3;
  x: number;
  y: number;
}

const skills: Skill[] = [
  // Frontend Constellation - Orion pattern (spread out more)
  { name: "React", category: "Frontend", level: 3, x: 20, y: 20 },
  { name: "Next.js", category: "Frontend", level: 3, x: 30, y: 35 },
  { name: "Angular", category: "Frontend", level: 2, x: 40, y: 25 },
  { name: "Nuxt3", category: "Frontend", level: 2, x: 50, y: 40 },

  // Backend Constellation - Cassiopeia W-shape (spread out more)
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
  // Frontend - top left area (bigger spread)
  React: { x: 15, y: 18 },
  "Next.js": { x: 28, y: 30 },
  Angular: { x: 20, y: 42 },
  Nuxt3: { x: 33, y: 54 },
  // Backend - top right area (bigger spread)
  Spring: { x: 65, y: 15 },
  Express: { x: 78, y: 25 },
  Nest: { x: 73, y: 35 },
  ".NET": { x: 86, y: 45 },
  Django: { x: 68, y: 52 },
  Laravel: { x: 81, y: 64 },
  // Tools - bottom center area (bigger spread)
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

  const ref = useRef(null);

  

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
    <section
      ref={ref}
      id="skills"
      className="
        relative min-h-screen w-full py-12 md:py-20 px-4 overflow-hidden transition-all duration-1000
        bg-white dark:bg-[#030f18]"
    >
      <div
        className="absolute inset-0 z-0"
        style={{ width: "100%", height: "100%", zIndex: 0 }}
      >
        <Particles
          particleColors={["#ffffff", "#a5b4fc"]}
           particleCount={1000}
            particleSpread={20}
            speed={0.5}
            particleBaseSize={160}
            moveParticlesOnHover={false}
            alphaParticles={true}
            disableRotation={true}
        />
      </div>
      <div
        className="absolute inset-0 z-25"
        style={{ width: "100%", height: "100%", zIndex: 5 }}
      >
        <ShootingStars />
      </div>


      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight  dark:text-white text-gray-900">
            Skills & Technologies
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed  dark:text-gray-400 text-gray-600">
            A constellation of tools and technologies I use to craft exceptional
            digital experiences
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                "border hover:border-white/50",
                "dark:border-gray-700 border-gray-300",
                activeCategory === category
                  ? "bg-white/10  shadow-[0_0_15px_rgba(255,255,255,0.3)]  dark:bg-white/10 dark:text-white dark:border-white  text-white border-gray-900"
                  : "  dark:bg-gray-900/50 dark:text-gray-400 bg-white text-gray-600 hover:text-gray-900"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-start">
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

                return (
                  <line
                    key={`${from}-${to}-${index}`}
                    x1={`${fromPos.x}%`}
                    y1={`${fromPos.y}%`}
                    x2={`${toPos.x}%`}
                    y2={`${toPos.y}%`}
                    strokeWidth={isHighlighted ? "2" : "1"}
                    className="transition-all duration-700"
                    stroke={
                      isHighlighted
                        ? "rgba(255, 255, 255, 0.9)"
                        : document.documentElement.classList.contains("light")
                        ? "rgba(0, 0, 0, 0.3)"
                        : "rgba(255, 255, 255, 0.3)"
                    }
                    style={{
                      filter: isHighlighted
                        ? "drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))"
                        : document.documentElement.classList.contains("light")
                        ? "drop-shadow(0 0 2px rgba(0, 0, 0, 0.2))"
                        : "none",
                      opacity: opacity,
                    }}
                  />
                );
              })}
            </svg>

            {skills.map((skill) => {
              const isHovered = hoveredSkill === skill.name;
              const isConnected = getActiveConnections().some(
                ([from, to]) =>
                  (from === skill.name || to === skill.name) &&
                  (hoveredSkill === from || hoveredSkill === to)
              );

              const position = getSkillPosition(skill);
              const opacity = getSkillOpacity(skill);

              return (
                <div
                  key={skill.name}
                  className="absolute group cursor-pointer transition-all duration-700 ease-out"
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    transform: "translate(-50%, -50%)",
                    opacity: opacity,
                    pointerEvents: opacity === 0 ? "none" : "auto",
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {/* 4-point star node */}
                  <div className="relative flex items-center justify-center">
                    {/* Outer glow ring */}
                    <div
                      className={cn(
                        "absolute w-12 h-12 transition-all duration-300 blur-xl rounded-full",
                        "bg-white/20 dark:bg-white/20 ",
                        isHovered &&
                          "w-20 h-20 bg-white/40 dark:bg-white/40 ",
                        isConnected &&
                          !isHovered &&
                          "w-16 h-16 bg-white/30 dark:bg-white/30 "
                      )}
                    />

                    {/* Middle glow */}
                    <div
                      className={cn(
                        "absolute w-8 h-8 transition-all duration-300 blur-md rounded-full",
                        "bg-white/40 dark:bg-white/40 ",
                        isHovered &&
                          "w-12 h-12 bg-white/60 dark:bg-white/60 ",
                        isConnected &&
                          !isHovered &&
                          "w-10 h-10 bg-white/50 dark:bg-white/50 "
                      )}
                    />

                    <svg
                      className={cn(
                        "relative transition-all duration-300",
                        isHovered ? "w-5 h-5" : "w-3 h-3",
                        isConnected && !isHovered && "w-4 h-4"
                      )}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{
                        color: document.documentElement.classList.contains(
                          "light"
                        )
                          ? "#1f2937"
                          : "white",
                        filter: isHovered
                          ? document.documentElement.classList.contains("light")
                            ? "drop-shadow(0 0 8px rgba(31, 41, 55, 1))"
                            : "drop-shadow(0 0 8px rgba(255, 255, 255, 1))"
                          : isConnected
                          ? document.documentElement.classList.contains("light")
                            ? "drop-shadow(0 0 6px rgba(31, 41, 55, 0.8))"
                            : "drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))"
                          : document.documentElement.classList.contains("light")
                          ? "drop-shadow(0 0 4px rgba(31, 41, 55, 0.6))"
                          : "drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))",
                      }}
                    >
                      <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
                    </svg>

                    {/* Tooltip on hover */}
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
                                  ? "bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)] dark:bg-white dark:shadow-[0_0_5px_rgba(255,255,255,0.8)] "
                                  : " dark:bg-gray-700 bg-gray-300"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      {/* Tooltip arrow */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white/50 dark:border-b-white/50 " />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full lg:w-40 rounded-xl border backdrop-blur-sm p-3 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border-gray-800 dark:from-gray-900/80 dark:to-gray-900/40 dark:border-gray-800 ">
            <h3 className="font-semibold text-xs mb-2 flex items-center gap-1.5  dark:text-white text-gray-900">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
              </svg>
              Proficiency
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)] dark:bg-white dark:shadow-[0_0_5px_rgba(255,255,255,0.8)] " />
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-700 dark:bg-gray-700 " />
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-700 dark:bg-gray-700 " />
                </div>
                <span className="text-[10px] text-gray-300 dark:text-gray-300 ">
                  Fine
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)] dark:bg-white dark:shadow-[0_0_5px_rgba(255,255,255,0.8)] " />
                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)] dark:bg-white dark:shadow-[0_0_5px_rgba(255,255,255,0.8)] " />
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-700 dark:bg-gray-700 " />
                </div>
                <span className="text-[10px] text-gray-300 dark:text-gray-300 ">
                  Intermediate
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)] dark:bg-white dark:shadow-[0_0_5px_rgba(255,255,255,0.8)] " />
                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)] dark:bg-white dark:shadow-[0_0_5px_rgba(255,255,255,0.8)] " />
                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)] dark:bg-white dark:shadow-[0_0_5px_rgba(255,255,255,0.8)] " />
                </div>
                <span className="text-[10px] text-gray-300 dark:text-gray-300 ">
                  Advanced
                </span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-700 dark:border-gray-700 ">
              <p className="text-[9px] leading-relaxed text-gray-400 dark:text-gray-400 ">
                Hover over stars to see details
              </p>
            </div>
          </div>
        </div>

        {/* Bottom decorative text */}
        <div className="mt-8 md:mt-16 text-center">
          <p className="text-sm font-mono text-gray-600 dark:text-gray-600 ">
            Always learning, always growing
          </p>
        </div>
      </div>
    </section>
  );
}
