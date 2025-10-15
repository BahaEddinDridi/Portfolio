"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { LoadingScreen } from "@/components/layout/loading/LoadingScreen";

// Dynamic imports for all sections to optimize initial load
const Hero = dynamic(() => import("@/components/sections/Hero"), {
  ssr: false,
});
const AboutMe = dynamic(
  () => import("@/components/sections/About").then((mod) => mod.AboutMe),
  { ssr: false }
);
const Skills = dynamic(
  () => import("@/components/sections/Skills").then((mod) => mod.Skills),
  { ssr: false }
);
const Experience = dynamic(
  () =>
    import("@/components/sections/Experience").then((mod) => mod.Experience),
  { ssr: false }
);
const Projects = dynamic(
  () => import("@/components/sections/Projects").then((mod) => mod.Projects),
  { ssr: false }
);
const ContactMe = dynamic(
  () => import("@/components/sections/Contact").then((mod) => mod.ContactMe),
  { ssr: false }
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      import("@/components/sections/Hero"),
      import("@/components/sections/About"),
      import("@/components/sections/Skills"),
      import("@/components/sections/Experience"),
      import("@/components/sections/Projects"),
      import("@/components/sections/Contact"),
      import("@/components/Particles"),
      import("@/components/ShootingStar"),
      import("@/components/project-carousel"),
      import("@/components/professional-timeline"),
    ])
      .then(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to load components:", err);
        setIsLoading(false); 
      });
  }, []);

  return (
    <div className="relative bg-[linear-gradient(to_top,#f5e6d3,#faf5f0,#ffffff,#fefefe,#f8f9fa,#f0f4f8,#e8f0f7,#dfe9f3)] dark:bg-[linear-gradient(to_top,#09232e,#0a1f3d,#0d1b4c,#1a1a4e,#2d1b4e,#1f0a3b,#0f0820,#000000)]  min-h-screen">
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>
      {!isLoading && (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Hero />
            <AboutMe />
            <Skills />
            <Experience />
            <Projects />
            <ContactMe />
        </motion.main>
      )}
    </div>
  );
}
