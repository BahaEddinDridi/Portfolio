"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ShootingStarProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay: number;
  id: string;
}

const ShootingStar: React.FC<ShootingStarProps> = ({
  startX,
  startY,
  endX,
  endY,
  delay,
  id,
}) => {
  const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
  const trailLength = 250;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        zIndex: 25,
        left: 0,
        top: 0,
      }}
      initial={{ x: startX, y: startY, rotate: angle, opacity: 0 }}
      animate={{
        x: endX,
        y: endY,
        rotate: angle,
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 1.5,
        delay,
        ease: "easeOut",
      }}
    >
      {/* Trail */}
      <div
        className="absolute"
        style={{
          width: `${trailLength}px`,
          height: "0.5px",
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2))",
          transformOrigin: "left center",
          left: `-${trailLength}px`,
          top: "0px",
        }}
      />
      
      {/* Main star */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "1px",
          height: "1px",
          background: "#ffffff",
          boxShadow: "0 0 6px 2px rgba(255, 255, 255, 0.8)",
          filter: "blur(0.3px)",
        }}
        animate={{
          scale: [0.6, 1, 0.6],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.5,
          delay,
          ease: "easeOut",
        }}
      />
    </motion.div>
  );
};

const ShootingStars: React.FC = () => {
  const [stars, setStars] = useState<ShootingStarProps[]>([]);

  useEffect(() => {
    let mounted = true;

    const generateTwoStars = () => {
      if (!mounted) return;

      const newStars: ShootingStarProps[] = [];
      
      // Generate exactly 2 stars
      for (let i = 0; i < 2; i++) {
        const startX = Math.random() * -150 - 50;
        const startY = Math.random() * window.innerHeight * 0.4;
        const endX = window.innerWidth + 100;
        const endY = Math.random() * window.innerHeight * 0.5 + window.innerHeight * 0.25;
        
        // 1 second delay between stars
        const delay = i * 1.0;
        const id = `star-${Date.now()}-${i}`;

        newStars.push({ startX, startY, endX, endY, delay, id });
      }

      setStars(newStars);
    };

    // Clear previous stars and generate new ones every 5 seconds
    const interval = setInterval(() => {
      if (!mounted) return;
      setStars([]); // Clear first
      setTimeout(() => {
        if (mounted) {
          generateTwoStars();
        }
      }, 100);
    }, 5000); // Exactly 5 seconds

    // Initial generation
    generateTwoStars();

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {stars.map((star) => (
        <ShootingStar
          key={star.id}
          id={star.id}
          startX={star.startX}
          startY={star.startY}
          endX={star.endX}
          endY={star.endY}
          delay={star.delay}
        />
      ))}
    </>
  );
};

export default ShootingStars;