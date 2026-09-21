import { BackgroundEffects } from "@/components/layouts/BackgroundEffects";
import { LoadingOverlay } from "@/components/layouts/LoadingOverlay";
import { AboutMe } from "@/components/sections/About";
import { ContactMe } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

/**
 * The portfolio, as one scrolling page.
 *
 * A server component: the sections are client components for their scroll
 * animations, but they still render to HTML here. Only the canvas effects are
 * `ssr: false`, because they need a real WebGL context.
 */
export default function Home() {
  return (
    <div className="relative min-h-screen bg-[linear-gradient(to_top,#f5e6d3,#faf5f0,#ffffff,#fefefe,#f8f9fa,#f0f4f8,#e8f0f7,#dfe9f3)] dark:bg-[linear-gradient(to_top,#09232e,#0a1f3d,#0d1b4c,#1a1a4e,#2d1b4e,#1f0a3b,#0f0820,#000000)]">
      <LoadingOverlay />
      <BackgroundEffects />

      <main>
        <Hero />
        <AboutMe />
        <Skills />
        <Experience />
        <Projects />
        <ContactMe />
      </main>
    </div>
  );
}
