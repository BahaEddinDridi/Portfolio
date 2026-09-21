import type { Skill, SkillCategory, SkillConnection, Point } from "@/types";

export const skills: Skill[] = [
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

export const connections: Record<SkillCategory, SkillConnection[]> = {
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

export const categories = ["All", "Frontend", "Backend", "Tools"];

export const popupIconAlias: Record<string, string> = {
  ".NET": ".NETFramework",
  Adobe: "AdobePhotoshop",
  Nest: "Nest.js",
};

export const scatteredPositions: Record<string, Point> = {
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
