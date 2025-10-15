"use client"

import type React from "react"
import { createPortal } from "react-dom"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, ExternalLink, Github, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Button from "./ui/button"

interface Project {
  id: number
  title: string
  shortDescription: string
  fullDescription: string
  image: string
  gallery: string[]
  video: string[]
  technologies: string[]
  liveUrl?: string
  frontendGithubUrl?: string
  backendGithubUrl?: string
  category: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Real-Time Marketing Sync ERP",
    shortDescription: "Multi-platform marketing automation system",
    fullDescription:
      "Developed during my internship at Innoway Solutions, this ERP platform synchronizes marketing operations across Microsoft, LinkedIn, Meta, and Google Ads. It enables real-time campaign management, lead extraction, and automated outreach workflows with centralized dashboards for performance insights. The system integrates OAuth authentication, API orchestration, and background job scheduling for data sync.",
    image: "/images/projects/project_1/1.png",
    video: [],
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
    frontendGithubUrl: "https://github.com/BahaEddinDridi/Marketing-Platform-Frontend",
    backendGithubUrl: "https://github.com/BahaEddinDridi/Marketing-Platform",
    category: "Full-Stack",
  },
  {
    id: 2,
    title: "Horizon Formation",
    shortDescription: "Training center management system",
    fullDescription:
      "A full-featured management platform built for a professional training center. I collaborated closely with the team, managing the workflow by preparing tasks and organizing sprints, while also actively contributing to coding. The system streamlines administration for students, teachers, sessions, and billing, featuring role-based dashboards, salary management for instructors, scheduling tools, and payment tracking. Designed for efficient data handling and an intuitive experience for administrators.",
    image: "/images/projects/project_2/1.webp",
    video: [],
    gallery: [],
    technologies: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    liveUrl: "",
    frontendGithubUrl: "https://github.com/BahaEddinDridi/Horizon-Formation/tree/main/Frontend",
    backendGithubUrl: "https://github.com/BahaEddinDridi/Horizon-Formation/tree/main/Backend",
    category: "Full-Stack",
  },
  {
    id: 3,
    title: "Chalet Booking Platform",
    shortDescription: "Online chalet reservation system",
    fullDescription:
      "A Nuxt 3-based booking platform developed as a freelance project, allowing users to explore, book, and manage chalet reservations online. I worked on fixing existing issues, implementing new features, and translating the entire website into multiple languages, gaining valuable experience with real-world project requirements. Features include availability calendars, dynamic pricing, service add-ons, and admin management for listings, all integrated within a responsive and elegant interface for a smooth booking experience.",
    image: "/images/projects/project_3/1.jpg",
    video: [],
    gallery: [
      "/images/projects/project_3/1.jpg",
      "/images/projects/project_3/2.png",
      "/images/projects/project_3/3.png",
      "/images/projects/project_3/4.png",
      "/images/projects/project_3/5.png",
      "/images/projects/project_3/6.png",
    ],
    technologies: ["Nuxt 3", "Vue.js", "Node.js", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://chaletsissi-www.vercel.app",
    frontendGithubUrl: "https://github.com/fairplay-digital-admin/chaletsissi-www",
    backendGithubUrl: "",
    category: "Frontend",
  },
  {
    id: 4,
    title: "Yopex Platform Enhancements",
    shortDescription: "Workspace management and performance optimization",
    fullDescription:
      "During my internship at Yopex Hub, I worked on improving both the backend performance and user experience of their existing platform. I added a role-based access system that allows seamless transitions between personal and team workspaces, and optimized data queries to boost responsiveness across the app.",
    image: "/images/projects/project_4/1.png",
    video: ["/images/projects/project_4/1.mp4", "/images/projects/project_4/2.mp4", "/images/projects/project_4/3.mp4"],
    gallery: [],
    technologies: ["React", "Node.js", "MongoDB", "Redux", "Tailwind CSS"],
    liveUrl: "",
    frontendGithubUrl: "",
    backendGithubUrl: "",
    category: "Full-Stack",
  },
  {
    id: 5,
    title: "Smart For Green Onboarding Platform",
    shortDescription: "Interactive employee training system",
    fullDescription:
      "An onboarding web platform designed to simplify employee training using video tutorials, interactive quizzes, and progress tracking. Built during my internship at Smart For Green, the system makes onboarding more engaging and data-driven for HR departments.",
    image: "/images/projects/project_5/1.png",
    video: [],
    gallery: [],
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    liveUrl: "",
    frontendGithubUrl: "",
    backendGithubUrl: "",
    category: "Full-Stack",
  },
  {
    id: 6,
    title: "Dormitory Management Platform",
    shortDescription: "Room allocation and maintenance system",
    fullDescription:
      "An academic project developed with Angular and Spring to manage dormitory operations efficiently. Features include room assignment, maintenance requests, and resident records. Built with modular architecture and secure REST APIs.",
    image: "/images/projects/project_6/1.png",
    video: [],
    gallery: [],
    technologies: ["Angular", "Spring Boot", "MySQL"],
    liveUrl: "",
    frontendGithubUrl: "https://github.com/BAferiel/GestionFoyerAngular",
    backendGithubUrl: "https://github.com/BahaEddinDridi/springBoot",
    category: "Full-Stack",
  },
  {
    id: 7,
    title: "Esprit Career Platform",
    shortDescription: "Career management and resume analysis system",
    fullDescription:
      "A MERN stack web platform designed to help students and graduates create, analyze, and manage resumes while connecting them with professional opportunities. Includes resume parsing, career analytics, and admin dashboards for job listings.",
    image: "/images/projects/project_7/1.jpg",
    video: [],
    gallery: [
      "/images/projects/project_7/1.jpg",
      "/images/projects/project_7/2.png",
      "/images/projects/project_7/3.png",
      "/images/projects/project_7/4.png",
      "/images/projects/project_7/5.png",
      "/images/projects/project_7/6.png",
    ],
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    liveUrl: "",
    frontendGithubUrl: "https://github.com/BahaEddinDridi/Hestia_PIDEV_Frontend",
    backendGithubUrl: "https://github.com/BahaEddinDridi/Hestia_PIDEV_Backend",
    category: "Full-Stack",
  },
  {
    id: 8,
    title: "Food Rescue Platform",
    shortDescription: "Donation coordination system to reduce food waste",
    fullDescription:
      "A Laravel-based platform connecting restaurants with organizations to redistribute surplus food and minimize waste. Includes donation management, pickup scheduling, and reporting tools for sustainability impact tracking.",
    image: "/images/projects/project_8/1.png",
    video: [],
    gallery: ["/images/projects/project_8/1.png", "/images/projects/project_8/2.png"],
    technologies: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    liveUrl: "",
    frontendGithubUrl: "",
    backendGithubUrl: "https://github.com/BahaEddinDridi/RescueFood",
    category: "Backend",
  },
]

export function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isRotating, setIsRotating] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [velocity, setVelocity] = useState(0)
  const [lastMoveTime, setLastMoveTime] = useState(0)
  const [lastMoveX, setLastMoveX] = useState(0)
  const [momentum, setMomentum] = useState(0)
  const [hasDragged, setHasDragged] = useState(false)
  const [isSnapping, setIsSnapping] = useState(false)
  const [snapStartIndex, setSnapStartIndex] = useState(0)
  const [snapTargetIndex, setSnapTargetIndex] = useState(0)
  const [snapProgress, setSnapProgress] = useState(0)
  const animationFrameRef = useRef<number | null>(null)

  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!isDragging && Math.abs(momentum) > 0.1) {
      const animate = () => {
        setMomentum((prev) => {
          const newMomentum = prev * 0.85

          if (Math.abs(newMomentum) < 0.1) {
            setCurrentIndex((currentIdx) => {
              const targetIdx = Math.round(currentIdx)
              setSnapStartIndex(currentIdx)
              setSnapTargetIndex(targetIdx)
              setSnapProgress(0)
              setIsSnapping(true)
              return currentIdx
            })
            return 0
          }

          const rotationAmount = newMomentum / 400

          setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex - rotationAmount
            const wrappedIndex = ((newIndex % projects.length) + projects.length) % projects.length
            return wrappedIndex
          })

          return newMomentum
        })

        animationFrameRef.current = requestAnimationFrame(animate)
      }

      animationFrameRef.current = requestAnimationFrame(animate)

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    }
  }, [isDragging, momentum, projects.length])

  useEffect(() => {
    if (isSnapping) {
      const duration = 300 // ms
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        const easeProgress = 1 - Math.pow(1 - progress, 3)

        setSnapProgress(easeProgress)

        const newIndex = snapStartIndex + (snapTargetIndex - snapStartIndex) * easeProgress
        setCurrentIndex(newIndex)

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate)
        } else {
          setIsSnapping(false)
          setCurrentIndex(snapTargetIndex)
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    }
  }, [isSnapping, snapStartIndex, snapTargetIndex])

  const rotateCarousel = (direction: "next" | "prev") => {
    if (isRotating) return
    setIsRotating(true)

    if (direction === "next") {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    } else {
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
    }

    setTimeout(() => setIsRotating(false), 400)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsSnapping(false)
    setIsDragging(true)
    setStartX(e.clientX)
    setCurrentX(e.clientX)
    setLastMoveX(e.clientX)
    setLastMoveTime(Date.now())
    setMomentum(0)
    setVelocity(0)
    setHasDragged(false)

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const now = Date.now()
    const timeDelta = now - lastMoveTime
    const xDelta = e.clientX - lastMoveX

    if (timeDelta > 0) {
      const currentVelocity = xDelta / timeDelta
      setVelocity(currentVelocity)
    }

    setCurrentX(e.clientX)
    setLastMoveX(e.clientX)
    setLastMoveTime(now)

    if (Math.abs(e.clientX - startX) > 10) {
      setHasDragged(true)
    }
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)

    const diff = currentX - startX

    const momentumValue = velocity * 35 + diff * 0.05
    setMomentum(momentumValue)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsSnapping(false)
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setCurrentX(e.touches[0].clientX)
    setLastMoveX(e.touches[0].clientX)
    setLastMoveTime(Date.now())
    setMomentum(0)
    setVelocity(0)
    setHasDragged(false)

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const now = Date.now()
    const timeDelta = now - lastMoveTime
    const xDelta = e.touches[0].clientX - lastMoveX

    if (timeDelta > 0) {
      const currentVelocity = xDelta / timeDelta
      setVelocity(currentVelocity)
    }

    setCurrentX(e.touches[0].clientX)
    setLastMoveX(e.touches[0].clientX)
    setLastMoveTime(now)

    if (Math.abs(e.touches[0].clientX - startX) > 10) {
      setHasDragged(true)
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    const diff = currentX - startX

    const momentumValue = velocity * 35 + diff * 0.05
    setMomentum(momentumValue)
  }

  const getCardStyle = (index: number) => {
    const position = (index - currentIndex + projects.length * 2) % projects.length
    const totalCards = projects.length
    const angle = (360 / totalCards) * position

    const radius = isMobile ? 130 : 320
    const dragOffset = isDragging ? (currentX - startX) * 0.1 : 0

    const x = Math.sin(((angle + dragOffset) * Math.PI) / 180) * radius
    const z = Math.cos(((angle + dragOffset) * Math.PI) / 180) * radius
    const scale = isMobile ? 0.5 + (z + radius) / (radius * 4) : 0.7 + (z + radius) / (radius * 3)
    const opacity = z > -radius / 2 ? 1 : 0.3

    const isFront = Math.abs(position) < 0.5 || Math.abs(position - projects.length) < 0.5

    return {
      transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
      opacity,
      zIndex: Math.round(z),
      pointerEvents: isFront ? ("auto" as const) : ("none" as const),
    }
  }

  return (
    <>
      <div className="space-y-6">
        <div
          ref={carouselRef}
          className="relative w-full h-[380px] sm:h-[500px] md:h-[650px] lg:h-[700px] flex items-center justify-center overflow-visible select-none"
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
              perspective: isMobile ? "600px" : "1200px",
              perspectiveOrigin: "50% 50%",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="absolute w-[240px] sm:w-[320px] md:w-[350px] h-[320px] sm:h-[400px] md:h-[450px] transition-all duration-400 ease-out cursor-pointer"
                  style={{
                    ...getCardStyle(index),
                    cursor: "url('/cursor/custom-pointer.png'), pointer",
                  }}
                  onClick={() => {
                    if (hasDragged) return

                    const roundedIndex = Math.round(currentIndex)
                    const normalizedIndex = ((roundedIndex % projects.length) + projects.length) % projects.length

                    if (index === normalizedIndex) {
                      setSelectedProject(project)
                      setGalleryIndex(0)
                    }
                  }}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#f3e8ff]/60 dark:bg-white/5 backdrop-blur-sm border border-[#f3e8ff]/60 dark:border-white/10 shadow-2xl hover:shadow-white/20 dark:hover:shadow-white/20 transition-all group">
                    {/* Project Image */}
                    <div className="relative h-[55%] sm:h-[60%] overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={500}
                        height={500}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        priority={index === Math.round(currentIndex)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 dark:from-slate-950/90 to-transparent" />
                    </div>

                    {/* Project Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                      <Badge className="bg-white/90 dark:bg-white/10 text-slate-900 dark:text-white border-white/20 dark:border-white/20">
                        {project.category}
                      </Badge>
                      <h3 className="text-base sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-white/90 transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-[11px] sm:text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
                        {project.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                        {project.technologies.slice(0, isMobile ? 2 : 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-white/90 dark:bg-white/10 text-slate-900 dark:text-white border border-white/20 dark:border-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > (isMobile ? 2 : 3) && (
                          <span className="text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-white/90 dark:bg-white/10 text-slate-900 dark:text-white border border-white/20 dark:border-white/20">
                            +{project.technologies.length - (isMobile ? 2 : 3)}
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
            size={isMobile ? "sm" : "default"}
            className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 
             bg-yellow-50/30 dark:bg-white/10 backdrop-blur-sm 
             border-yellow-200/30 dark:border-white/20 
             hover:bg-yellow-50/50 dark:hover:bg-white/20 
             text-gray-800 dark:text-white"
            onClick={() => rotateCarousel("prev")}
            disabled={isRotating}
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </Button>

          <Button
            variant="outline"
            size={isMobile ? "sm" : "default"}
            className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 
             bg-yellow-50/30 dark:bg-white/10 backdrop-blur-sm 
             border-yellow-200/30 dark:border-white/20 
             hover:bg-yellow-50/50 dark:hover:bg-white/20 
             text-gray-800 dark:text-white"
            onClick={() => rotateCarousel("next")}
            disabled={isRotating}
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </Button>
        </div>

        {/* Carousel Indicators */}
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="text-gray-900 dark:text-white/50 text-xs sm:text-sm pointer-events-none">
            {isMobile ? "Swipe to rotate" : "Drag to rotate"}
          </div>
          <div className="flex gap-1.5 sm:gap-2 justify-center">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  Math.round(currentIndex) === index
                    ? "bg-gray-900 dark:bg-white w-6 sm:w-8"
                    : "bg-gray-900/30 dark:bg-white/30 hover:bg-gray-900/50 dark:hover:bg-white/50 w-2"
                }`}
                onClick={() => {
                  if (!isRotating) {
                    setCurrentIndex(index)
                  }
                }}
                aria-label={`Go to project ${index + 1}`}
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
              className="relative w-full max-w-7xl max-h-[98vh] sm:max-h-[95vh] bg-slate-50 dark:bg-slate-950 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 p-1.5 sm:p-2 rounded-full bg-gray-200 dark:bg-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/20 hover:bg-gray-300 dark:hover:bg-white/20 text-black dark:text-white transition-all"
                onClick={() => setSelectedProject(null)}
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <div className="flex flex-col h-full max-h-[98vh] sm:max-h-[95vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                <div className="p-4 sm:p-6 md:p-8 lg:p-10 space-y-4 sm:space-y-6 bg-slate-50 dark:bg-slate-950">
                  <div>
                    <Badge className="bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 mb-3 sm:mb-4 text-xs sm:text-sm">
                      {selectedProject.category}
                    </Badge>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 pr-8">
                      {selectedProject.title}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                      {selectedProject.shortDescription}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 text-slate-900 dark:text-white">
                      About This Project
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedProject.fullDescription}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-slate-900 dark:text-white">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-4">
                    {selectedProject.liveUrl && (
                      <Button
                        className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 h-10 sm:h-11 md:h-12 text-sm sm:text-base"
                        onClick={() => window.open(selectedProject.liveUrl, "_blank")}
                      >
                        <ExternalLink className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        View Live Demo
                      </Button>
                    )}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                      {selectedProject.frontendGithubUrl && (
                        <Button
                          variant="outline"
                          className="flex-1 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 bg-transparent h-10 sm:h-11 md:h-12 text-sm sm:text-base"
                          onClick={() => window.open(selectedProject.frontendGithubUrl, "_blank")}
                        >
                          <Github className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                          <span className="hidden sm:inline">View Frontend Source</span>
                          <span className="sm:hidden">Frontend Code</span>
                        </Button>
                      )}

                      {selectedProject.backendGithubUrl && (
                        <Button
                          variant="outline"
                          className="flex-1 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 bg-transparent h-10 sm:h-11 md:h-12 text-sm sm:text-base"
                          onClick={() => window.open(selectedProject.backendGithubUrl, "_blank")}
                        >
                          <Github className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                          <span className="hidden sm:inline">View Backend Source</span>
                          <span className="sm:hidden">Backend Code</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Section - Image Gallery */}
                {(selectedProject.gallery.length > 0 ||
                  (selectedProject.video && selectedProject.video.length > 0)) && (
                  <div className="relative bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4">
                    {/* Main Image/Video */}
                    <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] rounded-lg overflow-hidden">
                      {galleryIndex >= selectedProject.gallery.length &&
                      selectedProject.video[galleryIndex - selectedProject.gallery.length] ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <video
                            src={selectedProject.video[galleryIndex - selectedProject.gallery.length]}
                            controls
                            className="w-full h-full object-contain"
                            preload="metadata"
                          />
                        </div>
                      ) : (
                        <Image
                          src={
                            selectedProject.gallery[galleryIndex] ||
                            "/placeholder.svg" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg"
                          }
                          alt={`${selectedProject.title} - Image ${galleryIndex + 1}`}
                          width={1200}
                          height={800}
                          className="w-full h-full object-contain"
                        />
                      )}

                      {/* Gallery Navigation */}
                      {selectedProject.gallery.length + selectedProject.video.length > 1 && (
                        <>
                          <button
                            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-gray-200 dark:bg-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/20 hover:bg-gray-300 dark:hover:bg-white/20 text-black dark:text-white transition-all"
                            onClick={() =>
                              setGalleryIndex(
                                (prev) =>
                                  (prev - 1 + selectedProject.gallery.length + selectedProject.video.length) %
                                  (selectedProject.gallery.length + selectedProject.video.length),
                              )
                            }
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                          <button
                            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-gray-200 dark:bg-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/20 hover:bg-gray-300 dark:hover:bg-white/20 text-black dark:text-white transition-all"
                            onClick={() =>
                              setGalleryIndex(
                                (prev) => (prev + 1) % (selectedProject.gallery.length + selectedProject.video.length),
                              )
                            }
                            aria-label="Next image"
                          >
                            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Thumbnail Gallery */}
                    <div className="flex gap-1.5 sm:gap-2 overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 p-1 sm:p-2">
                      {selectedProject.gallery.map((img, idx) => (
                        <button
                          key={`image-${idx}`}
                          className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                            galleryIndex === idx
                              ? "border-gray-600 scale-105"
                              : "border-gray-200 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/50"
                          }`}
                          onClick={() => setGalleryIndex(idx)}
                          aria-label={`View image ${idx + 1}`}
                        >
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                            width={500}
                            height={500}
                          />
                        </button>
                      ))}
                      {selectedProject.video.map((vid, idx) => (
                        <button
                          key={`video-${idx}`}
                          className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all bg-slate-800 dark:bg-slate-800 flex items-center justify-center ${
                            galleryIndex === selectedProject.gallery.length + idx
                              ? "border-gray-600 scale-105"
                              : "border-gray-200 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/50"
                          }`}
                          onClick={() => setGalleryIndex(selectedProject.gallery.length + idx)}
                          aria-label={`View video ${idx + 1}`}
                        >
                          <span className="text-white text-[10px] sm:text-xs">Video {idx + 1}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.getElementById("modal-root") || document.body,
        )}
    </>
  )
}
