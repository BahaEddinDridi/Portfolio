"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which in-page section is currently in view.
 *
 * Sections mount lazily, so this retries until it finds them rather than
 * assuming they exist on the first run.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const attach = () => {
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((element): element is HTMLElement => element !== null);

      if (sections.length === 0) return false;

      const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight * 0.3;
        const current = sections.findLast(
          (section) => scrollPosition >= section.offsetTop
        );
        setActiveSection(current?.id ?? sections[0].id);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      cleanup = () => window.removeEventListener("scroll", handleScroll);
      return true;
    };

    if (attach()) return () => cleanup?.();

    const observer = new MutationObserver(() => {
      if (attach()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanup?.();
    };
  }, [sectionIds]);

  return activeSection;
}

/** Smooth-scrolls to an in-page section by id. */
export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
