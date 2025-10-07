"use client";
import Lottie from "lottie-react";
import RotatingText from "../RotatingText";
import Image from "next/image";
import { useRef } from "react";
import SparklesText from "../SparklyText";
import Particles from "../Particles";
import ShootingStars from "../ShootingStar";
import magicAnimation from "@/../public/lotties/magic.json";

export default function Hero() {
  const roles = ["Developer", "Engineer", "Wizard", "Creator"];
  const revealImgRef = useRef(null);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-start px-4 sm:px-8 md:px-16 lg:px-32 bg-gradient-to-b from-blue-100 to-gray-200 dark:from-[#00041f] dark:to-[#09232e] text-gray-900 dark:text-white overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0"
        style={{ width: "100%", height: "100%", zIndex: 0 }}
      >
        <Particles
          particleColors={["#ffffff", "#a5b4fc"]}
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
        className="absolute inset-0 z-25"
        style={{ width: "100%", height: "100%", zIndex: 5 }}
      >
        <ShootingStars />
      </div>
      <div className="absolute bottom-0 left-[825px] -translate-x-1/2 w-20 sm:w-30 lg:w-36 h-[40%] bg-gradient-to-t from-gray-600 to-stone-500 dark:from-indigo-900 dark:to-slate-800 rounded-t-lg shadow-2xl z-15 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-gray-500 to-gray-600 dark:from-slate-800 dark:to-indigo-900 flex justify-between px-2">
          <div className="w-1/6 h-full bg-gray-600 dark:bg-[#1a3176]"></div>
          <div className="w-1/6 h-full bg-gray-600 dark:bg-[#1a3176]"></div>
          <div className="w-1/6 h-full bg-gray-600 dark:bg-[#1a3176]"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-gray-700/20 dark:to-indigo-900/20 opacity-50"></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <Image
          src="/svgs/hero-dark.svg"
          alt="Background trees"
          width={1920}
          height={200}
          className="w-full h-auto object-cover object-bottom"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-12 w-full max-w-7xl mx-auto">
        <div className="flex-none max-w-lg flex flex-col justify-center items-start text-left gap-4 sm:gap-6">
          <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 dark:text-white">
            Hi, I’m{" "}
            <SparklesText
              as="h1"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 dark:text-white tracking-tight dark:[--sparkle-first:#f0abfc] dark:[--sparkle-second:#a78bfa]"
              sparkleCount={15}
              sparkleSize={18}
              colors={{
                first: "var(--sparkle-first, #d946ef)",
                second: "var(--sparkle-second, #8b5cf6)",
              }}
            >
              Baha Eddine
            </SparklesText>
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-5xl text-rose-600 dark:text-white font-semibold whitespace-nowrap">
            I’m an inspiring{" "}
            <RotatingText
              texts={roles}
              mainClassName="inline-block text-violet-600 dark:text-violet-300"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
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
        <div className="relative flex-none w-40 h-40 sm:w-48 sm:h-48 lg:w-72 lg:h-72 z-10">
          <Lottie
            animationData={magicAnimation}
            loop
            className="w-full h-full relative z-10"
          />
        </div>
      </div>
    </section>
  );
}
