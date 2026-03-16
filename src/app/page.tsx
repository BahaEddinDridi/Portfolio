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

const ShootingStars = dynamic(() => import("../components/ShootingStar"), {
  ssr: false,
});
const Particles = dynamic(() => import("../components/Particles"), {
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);
  const [particleCount, setParticleCount] = useState(1400);

  useEffect(() => {
    // Determine if desktop
    const checkScreen = () => {
      const width = window.innerWidth;
      setIsDesktop(width > 768);
      setParticleCount(width > 1536 ? 1800 : width > 1200 ? 1400 : 1000);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const minLoadingDuration = 700;
    const startedAt = performance.now();

    const finishLoading = () => {
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, minLoadingDuration - elapsed);
      window.setTimeout(() => setIsLoading(false), remaining);
    };

    const preloadDeferredComponents = () => {
      void Promise.all([
        import("@/components/sections/Skills"),
        import("@/components/sections/Experience"),
        import("@/components/sections/Projects"),
        import("@/components/sections/Contact"),
        import("@/components/project-carousel"),
        import("@/components/professional-timeline"),
      ]).catch(() => {
        // Keep UI responsive even if deferred preloading fails.
      });
    };

    finishLoading();

    if (typeof window !== "undefined" && typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(preloadDeferredComponents, {
        timeout: 3000,
      });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = setTimeout(preloadDeferredComponents, 1200);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="relative bg-[linear-gradient(to_top,#f5e6d3,#faf5f0,#ffffff,#fefefe,#f8f9fa,#f0f4f8,#e8f0f7,#dfe9f3)] dark:bg-[linear-gradient(to_top,#09232e,#0a1f3d,#0d1b4c,#1a1a4e,#2d1b4e,#1f0a3b,#0f0820,#000000)]  min-h-screen">
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>
      {!isLoading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {isDesktop && (
            <>
              <div className="absolute inset-0 z-0 w-full h-full">
                <Particles
                  particleColors={["#4b5563", "#a5b4fc", "#10B981"]}
                  darkParticleColors={["#ffffff", "#a5b4fc"]}
                  particleCount={particleCount}
                  particleSpread={10}
                  speed={0.1}
                  particleBaseSize={120}
                  moveParticlesOnHover={false}
                  alphaParticles={true}
                  disableRotation={true}
                />
              </div>
              <div className="absolute inset-0 z-[5] w-full h-full">
                <ShootingStars />
              </div>
            </>
          )}
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
