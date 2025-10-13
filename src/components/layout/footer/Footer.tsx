"use client";

import { useMotionValue, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function Footer() {
  const [activeSection, setActiveSection] = useState("hero");
  const scrollY = useMotionValue(0);

  const navLinks = [
    { name: "Home", href: "#hero", id: "hero" },
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const socialIcons = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/baha-eddine-dridi-88b039203",
      svg: (
        <svg
          className="size-6 transition-transform duration-200 hover:scale-110"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
          ></path>
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/baha.eddine.385810",
      svg: (
        <svg
          className="size-6 transition-transform duration-200 hover:scale-110"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
          ></path>
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/bahaeddine170",
      svg: (
        <svg
          className="size-6 transition-transform duration-200 hover:scale-110"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
          ></path>
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const handleScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
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

  // Interpolate morph values based on scrollY
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
    <motion.footer
      style={{ width, borderRadius, padding, marginTop, boxShadow }}
      className="py-10 px-4 sm:px-6 lg:px-8 font-inter relative overflow-hidden bg-[#030f18] dark:bg-white "
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        <div className="mb-6 flex items-center justify-center">
          <span className="text-white dark:text-gray-900 text-3xl font-extrabold tracking-wide">
            Baha Eddine Dridi
          </span>
        </div>

        <nav className="mb-2 w-full">
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-base font-medium">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className={`text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-all duration-300 relative ${
                    activeSection === link.id
                      ? "text-white dark:text-gray-900 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-white dark:after:bg-gray-900 after:transition-all after:duration-300"
                      : "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white dark:after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
                  }`}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="my-2 flex flex-wrap justify-center gap-4 text-sm">
          {socialIcons.map((icon) => (
            <a
              key={icon.name}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={icon.name}
              className="text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors duration-300"
              href={icon.href}
            >
              {icon.svg}
            </a>
          ))}
        </div>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
          Made with 💻, ☕, and a sprinkle of ✨ by Baha Eddine Dridi ©{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </motion.footer>
  );
}
