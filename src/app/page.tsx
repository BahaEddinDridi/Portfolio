import Ribbons from "@/components/Ribbons";
import { AboutMe } from "@/components/sections/About";
import ContactMe from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import Card from "@/components/test/Card";
import SectionTitle from "@/components/test/SectionTitle";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <AboutMe />
      <Skills />
      <Experience />
      <Projects />
      <ContactMe />
    </main>
  );
}
