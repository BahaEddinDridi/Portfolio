"use client";

import type React from "react";
import { createPortal } from "react-dom";
import { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  X,
} from "lucide-react";
import Button from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  video: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Real-Time Marketing Sync ERP",
    shortDescription: "Multi-platform marketing automation system",
    fullDescription:
      "Developed during my internship at Innoway Solutions, this ERP platform synchronizes marketing operations across Microsoft, LinkedIn, Meta, and Google Ads. It enables real-time campaign management, lead extraction, and automated outreach workflows with centralized dashboards for performance insights. The system integrates OAuth authentication, API orchestration, and background job scheduling for data sync.",
    image: "/images/projects/project_1/1.png",
    video: ["https://www.youtube.com/watch?v=rya6Ll5n_iU"],
    gallery: [
      "/images/projects/project_1/1.png",
      "/images/projects/project_1/2.png",
      "/images/projects/project_1/3.png",
      "/images/projects/project_1/4.png",
      "/images/projects/project_1/5.png",
      "/images/projects/project_1/6.png",
      "/images/projects/project_1/7.png",
      "/images/projects/project_1/8.png",
      "/images/projects/project_1/9.png",
    ],
    technologies: [
      "Next.js",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "TypeScript",
      "Microsoft Graph API",
      "Google Ads API",
      "LinkedIn Ads API",
      "Meta Ads API",
    ],
    liveUrl: "",
    githubUrl: "https://github.com",
    category: "Full-Stack",
  },
  {
    id: 2,
    title: "Horizon Formation",
    shortDescription: "Training center management system",
    fullDescription:
      "A full-featured management platform built for a professional training center, streamlining administration for students, teachers, sessions, and billing. The system includes role-based dashboards, salary management for instructors, scheduling tools, and payment tracking. Designed for efficient data handling and an intuitive experience for administrators.",
    image: "/images/projects/project_2/1.webp",
    video: [],
    gallery: [],
    technologies: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "Full-Stack",
  },
  {
    id: 3,
    title: "Chalet Booking Platform",
    shortDescription: "Online chalet reservation system",
    fullDescription:
      "A Nuxt 3-based booking platform that allows users to explore, book, and manage chalet reservations online. Features include availability calendars, dynamic pricing, service add-ons, and admin management for listings. Integrated with a responsive and elegant interface for a smooth booking experience.",
    image: "/images/projects/project_3/1.jpg",
    video: ["https://www.youtube.com/watch?v=rya6Ll5n_iU"],
    gallery: [
      "/images/projects/project_3/1.jpg",
      "/images/projects/project_3/2.jpg",
      "/images/projects/project_3/3.jpg",
      "/images/projects/project_3/4.jpg",
    ],
    technologies: ["Nuxt 3", "Vue.js", "Node.js", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "Frontend",
  },
  {
    id: 4,
    title: "Yopex Platform Enhancements",
    shortDescription: "Workspace management and performance optimization",
    fullDescription:
      "During my internship at Yopex Hub, I worked on improving both the backend performance and user experience of their existing platform. I added a role-based access system that allows seamless transitions between personal and team workspaces, and optimized data queries to boost responsiveness across the app.",
    image: "/images/projects/project_4/1.jpg",
    video: ["https://www.youtube.com/watch?v=rya6Ll5n_iU"],
    gallery: [
      "/images/projects/project_4/1.jpg",
      "/images/projects/project_4/2.jpg",
      "/images/projects/project_4/3.jpg",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Redux", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "Full-Stack",
  },
  {
    id: 5,
    title: "Smart For Green Onboarding Platform",
    shortDescription: "Interactive employee training system",
    fullDescription:
      "An onboarding web platform designed to simplify employee training using video tutorials, interactive quizzes, and progress tracking. Built during my internship at Smart For Green, the system makes onboarding more engaging and data-driven for HR departments.",
    image: "/images/projects/project_5/1.jpg",
    video: ["https://www.youtube.com/watch?v=rya6Ll5n_iU"],
    gallery: [
      "/images/projects/project_5/1.jpg",
      "/images/projects/project_5/2.jpg",
      "/images/projects/project_5/3.jpg",
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "Full-Stack",
  },
  {
    id: 6,
    title: "Dormitory Management Platform",
    shortDescription: "Room allocation and maintenance system",
    fullDescription:
      "An academic project developed with Angular and Spring to manage dormitory operations efficiently. Features include room assignment, maintenance requests, and resident records. Built with modular architecture and secure REST APIs.",
    image: "/images/projects/project_6/1.jpg",
    video: ["https://www.youtube.com/watch?v=rya6Ll5n_iU"],
    gallery: [
      "/images/projects/project_6/1.jpg",
      "/images/projects/project_6/2.jpg",
      "/images/projects/project_6/3.jpg",
    ],
    technologies: ["Angular", "Spring Boot", "MySQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "Full-Stack",
  },
  {
    id: 7,
    title: "Esprit Career Platform",
    shortDescription: "Career management and resume analysis system",
    fullDescription:
      "A MERN stack web platform designed to help students and graduates create, analyze, and manage resumes while connecting them with professional opportunities. Includes resume parsing, career analytics, and admin dashboards for job listings.",
    image: "/images/projects/project_7/1.jpg",
    video: ["https://www.youtube.com/watch?v=rya6Ll5n_iU"],
    gallery: [
      "/images/projects/project_7/1.jpg",
      "/images/projects/project_7/2.jpg",
      "/images/projects/project_7/3.jpg",
    ],
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "Full-Stack",
  },
  {
    id: 8,
    title: "Food Rescue Platform",
    shortDescription: "Donation coordination system to reduce food waste",
    fullDescription:
      "A Laravel-based platform connecting restaurants with organizations to redistribute surplus food and minimize waste. Includes donation management, pickup scheduling, and reporting tools for sustainability impact tracking.",
    image: "/images/projects/project_8/1.jpg",
    video: ["https://www.youtube.com/watch?v=rya6Ll5n_iU"],
    gallery: [
      "/images/projects/project_8/1.jpg",
      "/images/projects/project_8/2.jpg",
      "/images/projects/project_8/3.jpg",
    ],
    technologies: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "Backend",
  },
];

export function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const rotateCarousel = (direction: "next" | "prev") => {
    if (isRotating) return;
    setIsRotating(true);

    if (direction === "next") {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }

    setTimeout(() => setIsRotating(false), 600);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const diff = currentX - startX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        rotateCarousel("prev");
      } else {
        rotateCarousel("next");
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const diff = currentX - startX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        rotateCarousel("prev");
      } else {
        rotateCarousel("next");
      }
    }
  };

  const getCardStyle = (index: number) => {
    const position = (index - currentIndex + projects.length) % projects.length;
    const totalCards = projects.length;
    const angle = (360 / totalCards) * position;
    const radius = 320;

    const dragOffset = isDragging ? (currentX - startX) * 0.2 : 0;

    const x = Math.sin(((angle + dragOffset) * Math.PI) / 180) * radius;
    const z = Math.cos(((angle + dragOffset) * Math.PI) / 180) * radius;
    const scale = 0.7 + (z + radius) / (radius * 3);
    const opacity = z > -radius / 2 ? 1 : 0.3;

    return {
      transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
      opacity,
      zIndex: Math.round(z),
      pointerEvents: position === 0 ? ("auto" as const) : ("none" as const),
    };
  };

  return (
    <>
      <div className="space-y-6">
        <div
          ref={carouselRef}
          className="relative w-full h-[700px] flex items-center justify-center overflow-hidden select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {/* 3D Carousel Container */}
          <div
            className="relative w-full h-full"
            style={{
              perspective: "1200px",
              perspectiveOrigin: "50% 50%",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="absolute w-[350px] h-[450px] transition-all duration-600 ease-out cursor-pointer"
                  style={getCardStyle(index)}
                  onClick={() => {
                    if (
                      (index - currentIndex + projects.length) %
                        projects.length ===
                      0
                    ) {
                      setSelectedProject(project);
                      setGalleryIndex(0);
                    }
                  }}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 dark:border-white/10 shadow-2xl hover:shadow-white/20 dark:hover:shadow-white/20 transition-all group">
                    {/* Project Image */}
                    <div className="relative h-[60%] overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 dark:from-slate-950/90 to-transparent" />
                    </div>

                    {/* Project Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                      <Badge className="bg-white/10 dark:bg-white/10 text-white border-white/20 dark:border-white/20">
                        {project.category}
                      </Badge>
                      <h3 className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-300 dark:text-slate-300 line-clamp-2">
                        {project.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 rounded-full bg-white/10 dark:bg-white/10 text-white border border-white/20 dark:border-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs px-2 py-1 rounded-full bg-white/10 dark:bg-white/10 text-white border border-white/20 dark:border-white/20">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-t from-white/5 dark:from-white/5 to-transparent" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-8 top-1/2 -translate-y-1/2 z-50 bg-white/10 dark:bg-white/10 backdrop-blur-sm border-white/20 dark:border-white/20 hover:bg-white/20 dark:hover:bg-white/20 text-white"
            onClick={() => rotateCarousel("prev")}
            disabled={isRotating}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-8 top-1/2 -translate-y-1/2 z-50 bg-white/10 dark:bg-white/10 backdrop-blur-sm border-white/20 dark:border-white/20 hover:bg-white/20 dark:hover:bg-white/20 text-white"
            onClick={() => rotateCarousel("next")}
            disabled={isRotating}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Drag Hint */}
        </div>

        {/* Carousel Indicators */}
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="text-white/50 dark:text-white/50 text-sm pointer-events-none">
            Drag to rotate
          </div>
          <div className="flex gap-2 justify-center">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/30 dark:bg-white/30 hover:bg-white/50 dark:hover:bg-white/50"
                }`}
                onClick={() => {
                  if (!isRotating) {
                    setCurrentIndex(index);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedProject &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 dark:bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300 "
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="relative w-full max-w-7xl max-h-[95vh]  bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/20 hover:bg-white/20 dark:hover:bg-white/20 text-white transition-all"
                onClick={() => setSelectedProject(null)}
              >
                <X className="h-6 w-6" />
              </button>

              <div
                className="flex flex-col h-full max-h-[95vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 "
              >
                <div className="p-6 md:p-8 lg:p-10 space-y-6 bg-slate-50 dark:bg-slate-950">
                  <div>
                    <Badge className="bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 mb-4">
                      {selectedProject.category}
                    </Badge>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                      {selectedProject.title}
                    </h2>
                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
                      {selectedProject.shortDescription}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
                      About This Project
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedProject.fullDescription}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-slate-900 dark:text-white">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    {selectedProject.liveUrl && (
                      <Button
                        className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 h-12 text-base"
                        onClick={() =>
                          window.open(selectedProject.liveUrl, "_blank")
                        }
                      >
                        <ExternalLink className="mr-2 h-5 w-5" />
                        View Live Demo
                      </Button>
                    )}
                    {selectedProject.githubUrl && (
                      <Button
                        variant="outline"
                        className="flex-1 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 bg-transparent h-12 text-base"
                        onClick={() =>
                          window.open(selectedProject.githubUrl, "_blank")
                        }
                      >
                        <Github className="mr-2 h-5 w-5" />
                        View Source Code
                      </Button>
                    )}
                  </div>
                </div>
                {/* Bottom Section - Image Gallery */}
                {(selectedProject.gallery.length > 0 ||
                  (selectedProject.video &&
                    selectedProject.video.length > 0)) && (
                  <div className="relative bg-slate-50 dark:bg-slate-950 p-8 flex flex-col gap-4">
                    {/* Main Image/Video */}
                    <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden ">
                      {galleryIndex >= selectedProject.gallery.length &&
                      selectedProject.video[
                        galleryIndex - selectedProject.gallery.length
                      ] ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <video
                            src={
                              selectedProject.video[
                                galleryIndex - selectedProject.gallery.length
                              ]
                            }
                            controls
                            className="w-full h-full object-contain"
                            autoPlay
                            loop
                          />
                        </div>
                      ) : (
                        <img
                          src={
                            selectedProject.gallery[galleryIndex] ||
                            "/placeholder.svg"
                          }
                          alt={`${selectedProject.title} - Image ${
                            galleryIndex + 1
                          }`}
                          className="w-full h-full object-contain"
                        />
                      )}

                      {/* Gallery Navigation */}
                      {selectedProject.gallery.length +
                        selectedProject.video.length >
                        1 && (
                        <>
                          <button
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/20 hover:bg-white/20 dark:hover:bg-white/20 text-white transition-all"
                            onClick={() =>
                              setGalleryIndex(
                                (prev) =>
                                  (prev -
                                    1 +
                                    selectedProject.gallery.length +
                                    selectedProject.video.length) %
                                  (selectedProject.gallery.length +
                                    selectedProject.video.length)
                              )
                            }
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </button>
                          <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/20 hover:bg-white/20 dark:hover:bg-white/20 text-white transition-all"
                            onClick={() =>
                              setGalleryIndex(
                                (prev) =>
                                  (prev + 1) %
                                  (selectedProject.gallery.length +
                                    selectedProject.video.length)
                              )
                            }
                          >
                            <ChevronRight className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Thumbnail Gallery */}
                    <div
                      className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:h-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 p-2"
                    >
                      {selectedProject.gallery.map((img, idx) => (
                        <button
                          key={`image-${idx}`}
                          className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-1 transition-all ${
                            galleryIndex === idx
                              ? "border-gray-600 scale-105"
                              : "border-gray-200 dark:border-white/20 hover:border-white/50 dark:hover:border-white/50"
                          }`}
                          onClick={() => setGalleryIndex(idx)}
                        >
                          <img
                            src={img || "/placeholder.svg"}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                      {selectedProject.video.map((vid, idx) => (
                        <button
                          key={`video-${idx}`}
                          className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all bg-slate-800 dark:bg-slate-800 flex items-center justify-center ${
                            galleryIndex ===
                            selectedProject.gallery.length + idx
                              ? "border-gray-600 scale-105"
                              : "border-gray-200 dark:border-white/20 hover:border-white/50 dark:hover:border-white/50"
                          }`}
                          onClick={() =>
                            setGalleryIndex(
                              selectedProject.gallery.length + idx
                            )
                          }
                        >
                          <span className="text-white text-xs">
                            Video {idx + 1}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.getElementById("modal-root") || document.body
        )}
    </>
  );
}
