"use client";

import { Code, Briefcase, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ProfessionalTimeline } from "../professional-timeline";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
const Particles = dynamic(() => import("../Particles"), { ssr: false });
const ShootingStars = dynamic(() => import("../ShootingStar"), { ssr: false });

const experienceData = [
  {
    id: "exp-1",
    title: "Freelance",
    type: "Self Employed",
    duration: "Jan 2021 - Present · 4 yrs 10 mos",
    icon: Briefcase,
    responsibilities: [
      "Providing full-stack web development services to various clients",
      "Building custom web applications and solutions",
      "Managing projects from conception to deployment",
    ],
    skills: [
      "Full-Stack Development",
      "Project Management",
      "Client Relations",
    ],
  },
  {
    id: "exp-2",
    title: "Full-Stack Web Developer Intern",
    type: "Innoway · Internship",
    duration: "Feb 2025 - Aug 2025 · 7 mos",
    icon: Code,
    responsibilities: [
      "Designed and developed a comprehensive ERP solution for real-time marketing data synchronization, integrating Microsoft, LinkedIn, Meta, and Google Ads platforms",
      "Built robust backend architecture using NestJS, PostgreSQL, and Prisma, implementing secure Microsoft authentication and automated lead extraction",
      "Created and managed multi-platform advertising campaigns via LinkedIn, Google Ads, and Meta APIs",
      "Developed responsive frontend dashboards using Next.js, providing real-time performance analytics and workflow automation",
      "Implemented real-time data synchronization and automated lead response systems",
    ],
    skills: [
      "TypeScript",
      "NestJS",
      "Next.js",
      "PostgreSQL",
      "Prisma",
      "Microsoft Graph API",
      "LinkedIn API",
      "Google Ads API",
      "Meta API",
    ],
  },
  {
    id: "exp-3",
    title: "Full-Stack Web Developer Intern",
    type: "YOPEX · Internship",
    duration: "Jul 2024 - Sep 2024 · 3 mos",
    icon: Code,
    responsibilities: [
      "Improved and added new features to an existing platform using the MERN stack and Tailwind CSS",
      "Implemented a new organization model supporting multiple types (company, university, NGO)",
      "Developed a workspace system enabling users to switch between personal and organization workspaces",
      "Introduced team challenges feature, requiring users to create and manage teams",
      "Enhanced UI elements and optimized platform performance using React Hooks",
    ],
    skills: [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "Redux.js",
      "React Hooks",
      "Tailwind CSS",
    ],
  },
  {
    id: "exp-4",
    title: "Web Developer Intern",
    type: "Smart For Green · Internship",
    duration: "Jul 2023 - Sep 2023 · 3 mos",
    icon: Code,
    responsibilities: [
      "Developed a new web platform from scratch to manage onboarding plans",
      "Created a comprehensive solution to help companies design, track, and optimize employee onboarding programs",
      "Built full-stack application using MERN stack",
    ],
    skills: ["React", "Node.js", "MongoDB", "HTML", "CSS", "JavaScript"],
  },
  {
    id: "exp-5",
    title: "Planning Associate",
    type: "WIC MIC GROUP · Full-time",
    duration: "Apr 2022 - Aug 2022 · 5 mos",
    icon: Users,
    responsibilities: [
      "Actively collaborated with manufacturing partners on a daily basis to ensure seamless progression in jeans production",
      "Proactively addressed production delays, implementing solutions to guarantee on-time deliveries",
      "Maintained a precise database of all production activities, including schedules, inventory levels, and shipment details",
      "Compiled, analyzed, and interpreted production data to generate comprehensive reports",
    ],
    skills: [
      "Microsoft Excel",
      "Planning",
      "Data Analysis",
      "Manufacturing Coordination",
    ],
  },
];

export function Experience() {
  const ref = useRef(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      ref={ref}
      id="experience"
      className="relative min-h-screen flex items-center justify-center px-4 py-10  transition-all duration-1000"
    >
     

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center transition-all duration-1000 delay-200"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Professional Experience
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
            A journey through my professional career, showcasing the projects
            and roles that shaped my expertise
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="transition-all duration-1000 delay-400"
        >
          <ProfessionalTimeline data={experienceData} expandMode="multi" />
        </motion.div>
      </div>
    </motion.section>
  );
}
