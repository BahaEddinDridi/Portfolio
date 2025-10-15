"use client";
import Lottie from "lottie-react";
import RotatingText from "../RotatingText";
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
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: "easeOut" }}
      id="hero"
      className="relative min-h-screen flex justify-center items-center pt-40 px-4 sm:px-8 md:px-16 lg:px-32 text-gray-900 dark:text-white overflow-hidden"
    >
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-12 w-full max-w-7xl mx-auto">
        <div className="flex-none max-w-lg flex flex-col justify-center items-start text-left gap-4 sm:gap-6">
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white"
          >
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
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-2xl sm:text-3xl lg:text-5xl text-gray-900 dark:text-white font-semibold whitespace-nowrap"
          >
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
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-gray-800 dark:text-gray-200 text-lg sm:text-xl lg:text-2xl mt-2 max-w-lg"
          >
            Building modern web experiences and bringing ideas to life.
          </motion.p>
        </div>

        {/* Wizard animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }} 
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            duration: 0.8,
          }}
          className="relative flex-none w-1/3 h-1/3 z-10 hidden sm:block"
        >
          <div className="absolute -left-24 top-30 -translate-y-1/2 w-32 h-32 z-20">
            <MagicSparkles />
          </div>
          <Lottie
            animationData={magicAnimation}
            loop
            className="w-full h-full relative z-10 brightness-100 dark:brightness-70"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
