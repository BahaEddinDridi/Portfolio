import type { NavItem } from "@/types";

/** Single source of truth for the in-page sections, used by the navbar and the footer. */
export const navItems: NavItem[] = [
  { id: "hero", label: "Hearth" },
  { id: "about", label: "Wizard" },
  { id: "skills", label: "Grimoire" },
  { id: "experience", label: "Chronicle" },
  { id: "projects", label: "Artifacts" },
  { id: "contact", label: "Raven" },
];

export const sectionIds = navItems.map((item) => item.id);
