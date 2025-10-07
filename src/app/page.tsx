"use client";
import { AboutMe } from "@/components/sections/About";
import ContactMe from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import dynamic from "next/dynamic";
const Skills = dynamic(() => import("@/components/sections/Skills").then(mod => mod.Skills), { ssr: false });

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
