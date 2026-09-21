export type ProjectCategory = "Full-Stack" | "Frontend" | "Backend";

export interface Project {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  video: string[];
  technologies: string[];
  liveUrl?: string;
  frontendGithubUrl?: string;
  backendGithubUrl?: string;
  category: ProjectCategory;
}
