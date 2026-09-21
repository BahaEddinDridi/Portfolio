import { BriefcaseIcon, CodeIcon, UsersIcon } from "@/lib/icons";

import type { ExperienceEntry } from "@/types";

export const experiences: ExperienceEntry[] = [
  {
    id: "exp-1",
    title: "Freelance",
    type: "Self Employed",
    duration: "Jan 2021 - Present · 4 yrs 10 mos",
    icon: BriefcaseIcon,
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
    icon: CodeIcon,
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
    icon: CodeIcon,
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
    icon: CodeIcon,
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
    icon: UsersIcon,
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
