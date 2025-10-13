"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import Image from "next/image";
const ShootingStars = dynamic(() => import("../ShootingStar"), { ssr: false });
const Particles = dynamic(() => import("../Particles"), { ssr: false });

export function AboutMe() {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-white dark:bg-[#030f18] transition-all duration-1000"
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

      <div className="relative z-10 max-w-5xl w-full">
        <div className="text-center space-y-12">
          {/* Profile image with constellation-style glow */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute inset-0 rounded-full border border-gray-200/20 dark:border-white/20 scale-110 animate-pulse" />
              <div
                className="absolute inset-0 rounded-full border border-gray-200/30 dark:border-white/30 scale-125"
                style={{ animationDelay: "0.5s" }}
              />

              <div className="absolute inset-0 rounded-full bg-gray-200/10 dark:bg-white/10 blur-3xl group-hover:bg-gray-200/20 dark:group-hover:bg-white/20 transition-all duration-700" />

              {/* Image */}
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-gray-200/40 dark:border-white/40 shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                <Image
                  src="/images/user.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>

              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    animation: `orbit 8s linear infinite`,
                    animationDelay: `${i * 2}s`,
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="opacity-60"
                  >
                    <path
                      d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
                      fill="#4b5563" // Gray-600 for light mode
                      className="dark:fill-white"
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
              About Me
            </h2>
            <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-gray-400 dark:via-white to-transparent mx-auto" />
          </div>

          <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed">
            <p className="text-gray-800 dark:text-white/90 backdrop-blur-sm bg-gray-100/50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200/50 dark:border-white/10 hover:border-indigo-500 dark:hover:border-white/20 hover:bg-indigo-50/50 dark:hover:bg-white/10 transition-all duration-300">
              Hey there! I&apos;m a passionate developer who loves crafting
              beautiful and functional web experiences. I believe in writing
              clean code and creating interfaces that feel magical to use.
            </p>

            <p className="text-gray-800 dark:text-white/90 backdrop-blur-sm bg-gray-100/50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200/50 dark:border-white/10 hover:border-indigo-500 dark:hover:border-white/20 hover:bg-indigo-50/50 dark:hover:bg-white/10 transition-all duration-300">
              When I&apos;m not coding, you&apos;ll find me exploring new
              technologies, contributing to open source, or diving deep into the
              latest web development trends.
            </p>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gray-200/10 dark:bg-white/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition duration-500" />
              <div className="relative backdrop-blur-sm bg-gray-100/50 dark:bg-white/5 p-8 rounded-2xl border border-gray-200/50 dark:border-white/20 hover:border-indigo-500 dark:hover:border-white/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="flex-shrink-0 mt-1 drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                  >
                    <path
                      d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
                      fill="#4b5563" // Gray-600 for light mode
                      className="dark:fill-white"
                    />
                  </svg>
                  <div className="text-left">
                    <h3 className="font-semibold text-xl mb-3 text-gray-900 dark:text-white">
                      Coffee &amp; Code
                    </h3>
                    <p className="text-gray-800 dark:text-white/90 leading-relaxed">
                      I&apos;ve calculated that approximately 60% of my code is
                      powered by coffee. The other 40%? Also coffee, but iced.
                      My debugging skills are directly proportional to my
                      caffeine levels!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes orbit {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(120px)
              rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(120px)
              rotate(-360deg);
          }
        }
      `}</style>
    </section>
  );
}
