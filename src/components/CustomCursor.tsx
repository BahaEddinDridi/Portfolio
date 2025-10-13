"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Track mouse movement
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    // Detect when hovering over clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("a, button, input, textarea")) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", move)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 z-[9999] pointer-events-none transition-transform duration-150 ease-out
        ${isHovering ? "scale-150 bg-blue-400 opacity-70" : "bg-white opacity-40"}
      `}
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        transform: `translate3d(${position.x - 10}px, ${position.y - 10}px, 0)`,
        mixBlendMode: "difference",
      }}
    />
  )
}
