"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import NavLink from "./NavLink";
import dynamic from "next/dynamic";
import { SmallCloud } from "./Clouds";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Button from "@/components/ui/button";
import { Menu } from "lucide-react";
const ThemeSwitch = dynamic(
  () => import("@/components/layout/Navbar/ThemeSwitch"),
  { ssr: false }
);
const Particles = dynamic(() => import("@/components/Particles"), {
  ssr: false,
});

const links = ["hero", "about", "skills", "experience", "projects", "contact"];
const labels = ["Home", "About", "Skills", "Experience", "Projects", "Contact"];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isDesktop, setIsDesktop] = useState(true);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollY = useMotionValue(0);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) setTheme(savedTheme);
    else if (systemPrefersDark) setTheme("dark");
    else setTheme("light");
  }, []);
  useEffect(() => {
    // Determine if desktop
    const checkScreen = () => setIsDesktop(window.innerWidth > 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  useEffect(() => {
    const handleScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  useEffect(() => {
    let scrollHandler: (() => void) | null = null;

    const initScrollDetection = () => {
      const sections = links
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      if (sections.length === 0) return false;

      const handleScroll = () => {
        const scrollPos = window.scrollY + window.innerHeight * 0.3;
        let activeSection = "hero";

        for (const section of sections) {
          const sectionTop = section.offsetTop;
          const nextSection = sections[sections.indexOf(section) + 1];
          const nextSectionTop = nextSection ? nextSection.offsetTop : Infinity;

          if (scrollPos >= sectionTop && scrollPos < nextSectionTop) {
            activeSection = section.id;
            break;
          }
        }

        setActiveSection(activeSection);
      };

      if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
      }

      scrollHandler = handleScroll;
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();

      return true;
    };

    if (initScrollDetection()) return;

    const observer = new MutationObserver(() => {
      if (initScrollDetection()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const timeout = setTimeout(() => {
      if (initScrollDetection()) {
        observer.disconnect();
      }
    }, 500);

    return () => {
      observer.disconnect();
      if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
      }
      clearTimeout(timeout);
    };
  }, []);

  // interpolate morph values based on scrollY
  const width = useTransform(scrollY, [0, 300], ["85%", "100%"]);
  const borderRadius = useTransform(scrollY, [0, 300], ["24px", "0px"]);
  const padding = useTransform(scrollY, [0, 300], ["1rem 2rem", "1rem 3rem"]);
  const marginTop = useTransform(scrollY, [0, 300], ["20px", "0px"]);
  const boxShadow = useTransform(
    scrollY,
    [0, 300],
    ["0 5px 15px rgba(0,0,0,0.2)", "0 10px 20px rgba(0,0,0,0.3)"]
  );

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    setActiveSection(id);
    setMobileMenuOpen(false);
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <motion.div
        style={{ width, borderRadius, padding, marginTop, boxShadow }}
        className="relative mx-auto flex items-center justify-between
          bg-gradient-to-r from-[#9ec0f3] via-[#b7d4f5] to-[#dce8f9] text-black
          dark:from-[#030f18] dark:via-[#030f18] dark:to-[#1a1f3a] dark:text-white
          overflow-hidden"
      >
        {isDesktop && (
          <div
            className="absolute inset-0 z-0"
            style={{ width: "100%", height: "100%" }}
          >
            <Particles
              particleColors={["#ffffff", "#ffffff", "#ffffff"]}
              darkParticleColors={["#ffffff", "#a5b4fc"]}
              particleCount={2000}
              particleSpread={70}
              speed={0.5}
              particleBaseSize={200}
              moveParticlesOnHover={false}
              alphaParticles={true}
              disableRotation={true}
            />
          </div>
        )}

        <div className="hidden md:flex gap-4 lg:gap-8 relative z-10">
          {links.map((id, i) => (
            <NavLink
              key={id}
              id={id}
              label={labels[i]}
              isActive={activeSection === id}
              onClick={scrollToSection}
            />
          ))}
        </div>

        <div className="md:hidden relative z-10">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="text-black dark:text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[280px] bg-gradient-to-b from-[#9ec0f3] via-[#b7d4f5] to-[#dce8f9] dark:from-[#030f18] dark:via-[#0a1628] dark:to-[#1a1f3a] border-r-2 border-white/20"
            >
              {/* Visually hidden title for accessibility */}
              <span className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
              </span>
              <div className="flex flex-col gap-6 mt-8">
                {links.map((id, i) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`text-left text-xl font-semibold px-4 py-3 rounded-lg transition-all
                      ${
                        activeSection === id
                          ? "bg-orange-500/20 dark:bg-yellow-300/20 text-orange-600 dark:text-yellow-300 border-l-4 border-orange-500 dark:border-yellow-300"
                          : "text-black dark:text-white hover:bg-white/10"
                      }`}
                  >
                    {labels[i]}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="relative z-10 ml-auto">
          <div className="absolute -top-2 -left-8 w-12 h-6 md:w-16 md:h-8 pointer-events-none z-30">
            <SmallCloud delay={0} />
          </div>
          <div className="absolute -bottom-2 -right-6 w-10 h-5 md:w-14 md:h-7 pointer-events-none z-30">
            <SmallCloud delay={2} />
          </div>
          <ThemeSwitch />
        </div>
      </motion.div>
    </nav>
  );
}
