"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import NavLink from "./NavLink";
import dynamic from "next/dynamic";
import { SmallCloud } from "./Clouds";
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
    const handleScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  useEffect(() => {
    const sections = links
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.6 }
    );
    sections.forEach((el) => observer.observe(el!));
    return () => observer.disconnect();
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
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <motion.div
        style={{ width, borderRadius, padding, marginTop, boxShadow }}
        className={`relative mx-auto flex items-center justify-between
          bg-gradient-to-r from-[#9ec0f3] via-[#b7d4f5] to-[#dce8f9] text-black
          dark:from-[#030f18] dark:via-[#030f18] dark:to-[#1a1f3a] dark:text-white
          overflow-hidden`}
      >
        <div
          className="absolute inset-0 z-0"
          style={{ width: "100%", height: "100%" }}
        >
          <Particles
            particleColors={["#ffffff", "#ffffff", "#ffffff"]}
            darkParticleColors={["#ffffff", "#a5b4fc"]}
            particleCount={5000}
            particleSpread={120}
            speed={0.5}
            particleBaseSize={200}
            moveParticlesOnHover={false}
            alphaParticles={true}
            disableRotation={true}
          />
        </div>
        <div className="flex gap-8 relative z-10">
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

        <div className="relative z-10">
          <div className="absolute -top-2 -left-8 w-16 h-8 pointer-events-none z-30">
            <SmallCloud delay={0} />
          </div>
          <div className="absolute -bottom-2 -right-6 w-14 h-7 pointer-events-none z-30">
            <SmallCloud delay={2} />
          </div>
          <ThemeSwitch />
        </div>
      </motion.div>
    </nav>
  );
}
