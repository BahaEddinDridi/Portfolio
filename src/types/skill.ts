export type SkillCategory = "Frontend" | "Backend" | "Tools";
export type SkillLevel = 1 | 2 | 3;

export interface Skill {
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  x: number;
  y: number;
}

export interface Point {
  x: number;
  y: number;
}

export type SkillConnection = [string, string];
