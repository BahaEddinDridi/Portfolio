"use client";

import dynamic from "next/dynamic";

const ProjectCarousel = dynamic(
  () => import("../project-carousel").then(mod => mod.ProjectCarousel),
  { ssr: false } // disable server-side rendering
);
import { useRef } from "react";
const Particles = dynamic(() => import("../Particles"), { ssr: false });
const ShootingStars = dynamic(() => import("../ShootingStar"), { ssr: false });


export function Projects() {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      id="projects"
      className="relative min-h-screen py-10 px-4 bg-white dark:bg-[#030f18] transition-all duration-1000"
    >
      <div
        className="absolute inset-0 z-0"
        style={{ width: "100%", height: "100%", zIndex: 0 }}
      >
        <Particles
          particleColors={["#ffffff", "#a5b4fc"]}
          particleCount={1000}
          particleSpread={20}
          speed={0.5}
          particleBaseSize={160}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={true}
        />
      </div>
      <div
        className="absolute inset-0 z-25"
        style={{ width: "100%", height: "100%", zIndex: 5 }}
      >
        <ShootingStars />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white">
            Featured Projects
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore my latest work and creative solutions. Click on any project
            to learn more.
          </p>
        </div>

        {/* 3D Carousel */}
        <ProjectCarousel />

        {/* Navigation Hint */}
        <div className="text-center mt-12">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Drag to rotate, use arrow buttons, or click indicators to navigate
            through projects
          </p>
        </div>
      </div>
    </section>
  );
}
