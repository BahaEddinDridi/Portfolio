"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { useIsDesktop } from "@/hooks/useMediaQuery";

/** WebGL and canvas; no server rendering and desktop only. */
const Particles = dynamic(() => import("@/components/effects/Particles"), {
  ssr: false,
});
const Embers = dynamic(() => import("@/components/effects/Embers"), {
  ssr: false,
});

/** Particle budget scaled to viewport width, so laptops are not overdrawn. */
function particleCountFor(width: number) {
  if (width > 1536) return 1800;
  if (width > 1200) return 1400;
  return 1000;
}

export function BackgroundEffects() {
  const isDesktop = useIsDesktop();
  const [particleCount, setParticleCount] = useState(1400);

  useEffect(() => {
    const update = () => setParticleCount(particleCountFor(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      <div aria-hidden className="absolute inset-0 z-0 h-full w-full">
        <Particles
          particleColors={["#b8842a", "#c8912f", "#2f6b5a"]}
          darkParticleColors={["#e3a857", "#a97be0", "#f5d08a"]}
          particleCount={particleCount}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={120}
          moveParticlesOnHover={false}
          alphaParticles
          disableRotation
        />
      </div>
      <div aria-hidden className="absolute inset-0 z-[5] h-full w-full">
        <Embers />
      </div>
    </>
  );
}
