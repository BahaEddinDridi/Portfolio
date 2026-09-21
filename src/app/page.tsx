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
    <div className="page-ground relative min-h-screen">
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
