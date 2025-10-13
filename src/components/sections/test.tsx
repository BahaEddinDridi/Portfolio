"use client"
import Lottie from "lottie-react"
import RotatingText from "./rotating-text"
import { useEffect, useState } from "react"
import SparklesText from "./sparkles-text"
import magicAnimation from "@/../public/lotties/magic.json"
import { motion } from "framer-motion"

// Magic sparkle particles that flow from wand to text
const MagicSparkles = () => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
      }))
      setSparkles(newSparkles)
    }

    generateSparkles()
    const interval = setInterval(generateSparkles, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.5, 1, 0],
            x: [0, 50, 100],
            y: [0, -20, -40],
          }}
          transition={{
            duration: 2,
            delay: sparkle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

export default function HeroSection() {
  const roles = ["Developer", "Engineer", "Wizard", "Creator"]

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-32 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#00041f] dark:to-[#0a1628] text-gray-900 dark:text-white overflow-hidden"
    >
      {/* Animated background stars */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white dark:bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 w-full max-w-7xl mx-auto">
        {/* Left side - Text content */}
        <motion.div
          className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left gap-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-3xl sm:text-4xl lg:text-6xl font-bold">
            <span className="text-slate-800 dark:text-white">Hi, I'm </span>
            <SparklesText
              as="span"
              className="text-3xl sm:text-4xl lg:text-6xl font-bold text-purple-600 dark:text-purple-400 tracking-tight"
              sparkleCount={15}
              sparkleSize={18}
              colors={{
                first: "#d946ef",
                second: "#8b5cf6",
              }}
            >
              Baha Eddine
            </SparklesText>
          </div>

          <div className="text-2xl sm:text-3xl lg:text-5xl font-semibold">
            <span className="text-slate-700 dark:text-slate-200">I'm an inspiring </span>
            <div className="inline-block relative">
              <RotatingText
                texts={roles}
                mainClassName="inline-block text-purple-600 dark:text-purple-400 font-bold"
                staggerFrom="last"
                initial={{ x: "100%", y: "100%", opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                exit={{ x: "-100%", y: "-100%", opacity: 0 }}
                staggerDuration={0.03}
                splitLevelClassName="overflow-hidden inline-block"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2500}
              />
            </div>
          </div>

          <motion.p
            className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl lg:text-2xl mt-4 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Building modern web experiences and bringing ideas to life with a touch of magic.
          </motion.p>

          <motion.div
            className="flex gap-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl">
              View Projects
            </button>
            <button className="px-8 py-3 border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950 rounded-lg font-semibold transition-colors">
              Contact Me
            </button>
          </motion.div>
        </motion.div>

        {/* Right side - Wizard animation with magic sparkles */}
        <motion.div
          className="relative flex-none w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-32 h-32 z-20">
            <MagicSparkles />
          </div>

          <div className="relative w-full h-full">
            <Lottie animationData={magicAnimation} loop className="w-full h-full drop-shadow-2xl" />
          </div>

          {/* Glowing orb effect behind wizard */}
          <div className="absolute inset-0 -z-10">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 dark:bg-purple-400/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="w-6 h-10 border-2 border-slate-400 dark:border-slate-500 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 bg-slate-600 dark:bg-slate-400 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </motion.div>
    </section>
  )
}
