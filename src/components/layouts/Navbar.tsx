"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useTransform } from "motion/react";

import { NavLink } from "@/components/layouts/NavLink";
import Button from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems, sectionIds } from "@/data/navigation";
import { scrollToSection, useActiveSection } from "@/hooks/useActiveSection";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { MenuIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const ThemeSwitch = dynamic(
  () => import("@/components/layouts/ThemeSwitch"),
  { ssr: false }
);

/** WebGL; desktop only and never server-rendered. */
const Particles = dynamic(() => import("@/components/effects/Particles"), {
  ssr: false,
});

/** Scroll distance over which the bar morphs from floating pill to full width. */
const MORPH_RANGE = [0, 300];

export function Navbar() {
  const isDesktop = useIsDesktop();
  const activeSection = useActiveSection(sectionIds);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollY = useMotionValue(0);
  useEffect(() => {
    const onScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY]);

  const width = useTransform(scrollY, MORPH_RANGE, ["85%", "100%"]);
  const borderRadius = useTransform(scrollY, MORPH_RANGE, ["24px", "0px"]);
  const padding = useTransform(scrollY, MORPH_RANGE, ["1rem 2rem", "1rem 3rem"]);
  const marginTop = useTransform(scrollY, MORPH_RANGE, ["20px", "0px"]);
  const boxShadow = useTransform(scrollY, MORPH_RANGE, [
    "0 5px 15px rgba(0,0,0,0.2)",
    "0 10px 20px rgba(0,0,0,0.3)",
  ]);

  const navigate = (id: string) => {
    setMobileMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <nav className="fixed left-0 top-0 z-50 w-full">
      <motion.div
        style={{ width, borderRadius, padding, marginTop, boxShadow }}
        className="rail-ground border-border text-foreground relative mx-auto flex items-center justify-between overflow-hidden border"
      >
        {isDesktop && (
          <div className="absolute inset-0 z-0 h-full w-full">
            <Particles
              particleColors={["#b8842a", "#f5d08a", "#2f6b5a"]}
              darkParticleColors={["#e3a857", "#a97be0", "#f5d08a"]}
              particleCount={2000}
              particleSpread={70}
              speed={0.5}
              particleBaseSize={200}
              moveParticlesOnHover={false}
              alphaParticles
              disableRotation
            />
          </div>
        )}

        <ul className="relative z-10 hidden list-none gap-4 md:flex lg:gap-8">
          {navItems.map(({ id, label }) => (
            <li key={id}>
              <NavLink
                id={id}
                label={label}
                isActive={activeSection === id}
                onClick={navigate}
              />
            </li>
          ))}
        </ul>

        <div className="relative z-10 md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                className="text-foreground"
              >
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="rail-ground border-border w-[280px] border-r"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <ul className="mt-8 flex list-none flex-col gap-6">
                {navItems.map(({ id, label }) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => navigate(id)}
                      aria-current={activeSection === id ? "true" : undefined}
                      className={cn(
                        "w-full rounded-lg px-4 py-3 text-left text-xl font-semibold transition-all",
                        activeSection === id
                          ? "border-gilt bg-gilt/15 text-gilt-text border-l-2"
                          : "text-foreground hover:bg-gilt/10"
                      )}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>

        {/* The wisp carries its own motes, so it needs no decoration around it. */}
        <div className="relative z-10 ml-auto">
          <ThemeSwitch />
        </div>
      </motion.div>
    </nav>
  );
}

export default Navbar;
