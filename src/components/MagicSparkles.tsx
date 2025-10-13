"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export const MagicSparkles = () => {
  // ============================================
  // CONFIGURATION
  // ============================================
  const SPARKLE_COUNT = 12
  const GENERATION_INTERVAL = 2500
  const ANIMATION_DURATION = 2.5
  const MAX_DELAY = 0.5
  const BASE_SIZE = 10
  // ============================================

  const COLORS = [
    "#ffd6a5",
    "#fdffb6",
    "#caffbf",
    "#9bf6ff",
    "#bdb2ff",
    "#ffc6ff",
  ]

  const [sparkles, setSparkles] = useState<
    Array<{
      id: number
      originX: number
      originY: number
      angle: number
      distance: number
      delay: number
      color: string
      rotateStart: number
      rotateEnd: number
      size: number
    }>
  >([])

  useEffect(() => {
    const generateSparkles = () => {
      const ORIGIN_X = 80 // roughly bottom-right area
      const ORIGIN_Y = 80
      const CONE_ANGLE = 45 // spread angle in degrees

      const newSparkles = Array.from({ length: SPARKLE_COUNT }, (_, i) => {
        // pick a random angle within the cone
        const randomAngle =
          -135 + (Math.random() - 0.5) * CONE_ANGLE // around 225° direction (up-left)
        const distance = 150 + Math.random() * 100 // how far each sparkle travels
        return {
          id: Date.now() + i,
          originX: ORIGIN_X + Math.random() * 3 - 1.5, // small jitter near origin
          originY: ORIGIN_Y + Math.random() * 3 - 1.5,
          angle: randomAngle,
          distance,
          delay: Math.random() * MAX_DELAY,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          rotateStart: Math.random() * 360,
          rotateEnd: Math.random() * 720 + 360,
          size: BASE_SIZE + Math.random() * 8,
        }
      })
      setSparkles(newSparkles)
    }

    generateSparkles()
    const interval = setInterval(generateSparkles, GENERATION_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-[-20%] pointer-events-none overflow-visible">
      {sparkles.map((sparkle) => {
        // compute final trajectory based on cone angle
        const radians = (sparkle.angle * Math.PI) / 180
        const dx = Math.cos(radians) * sparkle.distance
        const dy = -Math.sin(radians) * sparkle.distance

        return (
          <motion.div
            key={sparkle.id}
            className="absolute"
            style={{
              left: `${sparkle.originX}%`,
              top: `${sparkle.originY}%`,
            }}
            initial={{
              opacity: 0,
              scale: 0.6,
              rotate: sparkle.rotateStart,
            }}
            animate={{
              opacity: [0, 1, 0.8, 0],
              scale: [1.2, 1, 0.8, 0.4],
              x: dx,
              y: -dy, // invert Y since we move upward
              rotate: sparkle.rotateEnd,
            }}
            transition={{
              duration: ANIMATION_DURATION,
              delay: sparkle.delay,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <svg
              width={sparkle.size}
              height={sparkle.size}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                color: sparkle.color,
                opacity: 0.75,
                filter: "drop-shadow(0 0 4px rgba(255,255,255,0.25))",
              }}
            >
              <path
                d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        )
      })}
    </div>
  )
}
