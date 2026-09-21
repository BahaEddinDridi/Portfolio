import type { IconType } from "@/lib/icons";

export interface ExperienceEntry {
  id: string;
  title: string;
  type: string;
  duration: string;
  icon: IconType;
  responsibilities: string[];
  skills: string[];
}

export type ExpandMode = "single" | "multi";
