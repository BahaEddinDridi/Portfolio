import type { NavItem } from "@/types";

/** Single source of truth for the in-page sections, used by the navbar and the footer. */
export const navItems: NavItem[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const sectionIds = navItems.map((item) => item.id);
