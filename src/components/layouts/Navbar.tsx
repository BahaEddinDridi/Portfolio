"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useTransform } from "motion/react";

import { SmallCloud } from "@/components/effects/Clouds";
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
        className="relative mx-auto flex items-center justify-between overflow-hidden bg-gradient-to-r from-[#9ec0f3] via-[#b7d4f5] to-[#dce8f9] text-black dark:from-[#030f18] dark:via-[#030f18] dark:to-[#1a1f3a] dark:text-white"
      >
        {isDesktop && (
          <div className="absolute inset-0 z-0 h-full w-full">
            <Particles
              particleColors={["#ffffff", "#ffffff", "#ffffff"]}
              darkParticleColors={["#ffffff", "#a5b4fc"]}
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
                className="text-black dark:text-white"
              >
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[280px] border-r-2 border-white/20 bg-gradient-to-b from-[#9ec0f3] via-[#b7d4f5] to-[#dce8f9] dark:from-[#030f18] dark:via-[#0a1628] dark:to-[#1a1f3a]"
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
                          ? "border-l-4 border-orange-500 bg-orange-500/20 text-orange-600 dark:border-yellow-300 dark:bg-yellow-300/20 dark:text-yellow-300"
                          : "text-black hover:bg-white/10 dark:text-white"
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

        <div className="relative z-10 ml-auto">
          <div className="pointer-events-none absolute -left-8 -top-2 z-30 h-6 w-12 md:h-8 md:w-16">
            <SmallCloud delay={0} />
          </div>
          <div className="pointer-events-none absolute -bottom-2 -right-6 z-30 h-5 w-10 md:h-7 md:w-14">
            <SmallCloud delay={2} />
          </div>
          <ThemeSwitch />
        </div>
      </motion.div>
    </nav>
  );
}

export default Navbar;
