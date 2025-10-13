"use client";
import Lottie from "lottie-react";
import RotatingText from "../RotatingText";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SparklesText from "../SparklyText";
import dynamic from "next/dynamic";
const Particles = dynamic(() => import("../Particles"), { ssr: false });
const ShootingStars = dynamic(() => import("../ShootingStar"), { ssr: false });
import magicAnimation from "@/../public/lotties/magic.json";
import { MagicSparkles } from "../MagicSparkles";
import { motion } from "framer-motion";

export default function Hero() {
  const roles = ["Developer", "Engineer", "Wizard", "Creator"];
  const revealImgRef = useRef(null);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-start px-4 sm:px-8 md:px-16 lg:px-32 bg-gradient-to-b from-[#E0F2FF] to-[#D9CBFF] dark:from-[#00041f] dark:to-[#09232e] text-gray-900 dark:text-white overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0"
        style={{ width: "100%", height: "100%", zIndex: 0 }}
      >
        <Particles
          particleColors={["#4b5563", "#a5b4fc", "#10B981"]}
          darkParticleColors={["#ffffff", "#a5b4fc"]} 
          particleCount={1000}
          particleSpread={20}
          speed={0.5}
          particleBaseSize={160}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={true}
        />
      </div>
      <div
        className="absolute inset-0 z-[5]"
        style={{ width: "100%", height: "100%", zIndex: 5 }}
      >
        <ShootingStars />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
  <Image
    src="/svgs/hero-dark.svg"
    alt="Background trees"
    width={1920}
    height={200}
    className="w-full h-auto object-cover object-bottom
               filter brightness-0 invert transition-all duration-500
               dark:filter-none"
    priority
  />
</div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-12 w-full max-w-7xl mx-auto">
        <div className="flex-none max-w-lg flex flex-col justify-center items-start text-left gap-4 sm:gap-6">
          <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Hi, I’m{" "}
            <SparklesText
              as="h1"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight dark:[--sparkle-first:#f0abfc] dark:[--sparkle-second:#a78bfa]"
              sparkleCount={15}
              sparkleSize={18}
              colors={{
                first: "var(--sparkle-first, #5b21b6)", // Indigo-800 for light mode
                second: "var(--sparkle-second, #14b8a6)", // Teal-500 for light mode
              }}
            >
              Baha Eddine
            </SparklesText>
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-5xl text-gray-900 dark:text-white font-semibold whitespace-nowrap">
            I’m an inspiring{" "}
            <RotatingText
              texts={roles}
              mainClassName="inline-block text-teal-600 dark:text-purple-400 font-bold"
              staggerFrom="last"
              initial={{ x: "100%", y: "100%", opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={{ x: "-100%", y: "-100%", opacity: 0 }}
              staggerDuration={0.03}
              splitLevelClassName="overflow-hidden inline-block"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2500}
            />
          </h2>

          <p className="text-gray-800 dark:text-gray-200 text-lg sm:text-xl lg:text-2xl mt-2 max-w-lg">
            Building modern web experiences and bringing ideas to life.
          </p>
        </div>

        {/* Wizard animation */}
        <div className="relative flex-none w-40 h-40 sm:w-48 sm:h-48 lg:w-72 lg:h-72 z-10 hidden sm:block">
          <div className="absolute -left-28 top-24 -translate-y-1/2 w-32 h-32 z-20">
            <MagicSparkles />
          </div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-0"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <div className="absolute inset-0 rounded-full bg-blue-100/20 dark:bg-white/10 blur-3xl hover:bg-blue-100/30 dark:hover:bg-white/20 transition-all duration-700" />
          </motion.div>
          <Lottie
            animationData={magicAnimation}
            loop
            className="w-full h-full relative z-10 brightness-100 dark:brightness-70"
          />
          <Image
            src="/svgs/tower.svg"
            alt="Wizard tower"
            width={300}
            height={300}
            className="absolute -bottom-39 left-35 -translate-x-1/2 w-full h-auto z-20 brightness-100 saturate-120 dark:brightness-50"
            priority
          />
        </div>
      </div>
    </section>
  );
}