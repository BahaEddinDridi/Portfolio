"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { LottiePlayer } from "@/components/effects/LottiePlayer";
import { lotties } from "@/data/lotties";
import {
  fadeUpVariants,
  headingVariants,
  sectionTransition,
  springTransition,
  textTransition,
} from "@/lib/motion";

const CARD_CLASS =
  "rounded-2xl border border-gray-400/50 bg-gray-300/50 p-6 text-gray-800 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-50/50 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:hover:border-white/20 dark:hover:bg-white/10";

/** The four-pointed star used as a decorative accent. */
function StarGlyph({ size = 12, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
        fill="#4b5563"
        className="dark:fill-white"
      />
    </svg>
  );
}

function ProfilePortrait() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ ...springTransition, delay: 0.05 }}
      className="group relative mb-8 flex justify-center"
    >
      <div className="group relative">
        <div className="absolute inset-0 scale-110 animate-pulse rounded-full border border-gray-200/20 dark:border-white/20" />
        <div className="absolute inset-0 scale-125 rounded-full border border-gray-200/30 dark:border-white/30" />
        <div className="absolute inset-0 rounded-full bg-gray-200/10 blur-3xl transition-all duration-700 group-hover:bg-gray-200/20 dark:bg-white/10 dark:group-hover:bg-white/20" />

        <div className="relative h-48 w-48 overflow-hidden rounded-full border-2 border-gray-200/40 shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:border-white/40 dark:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          <Image
            src="/images/user.jpg"
            alt="Portrait of Baha Eddine Dridi"
            fill
            sizes="192px"
            className="object-cover"
            priority
          />
        </div>

        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="absolute left-1/2 top-1/2 animate-[orbit_8s_linear_infinite]"
            style={{ animationDelay: `${index * 2}s` }}
          >
            <StarGlyph className="opacity-60" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function AboutMe() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={sectionTransition}
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10"
    >
      <div className="relative z-10 w-full max-w-5xl">
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className="mb-8 text-center md:mb-16"
        >
          <h2 className="font-display text-gilt-text mb-4 text-4xl font-extrabold tracking-[0.06em] uppercase md:text-5xl lg:text-6xl">
            The Wizard
          </h2>
          <p className="mx-auto max-w-2xl text-lg italic opacity-70">
            Who keeps turning up at the workshop before the coffee does.
          </p>
        </motion.div>

        <div className="space-y-10 text-center">
          <ProfilePortrait />

          <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed">
            <motion.p
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              className={CARD_CLASS}
            >
              Hey there! I&apos;m a passionate developer who loves crafting
              beautiful and functional web experiences. I believe in writing
              clean code and creating interfaces that feel magical to use.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ ...textTransition, delay: 0.05 }}
              className={CARD_CLASS}
            >
              When I&apos;m not coding, you&apos;ll find me exploring new
              technologies, contributing to open source, or diving deep into the
              latest web development trends.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.995 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="group relative"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gray-200/10 opacity-50 blur-xl transition duration-500 group-hover:opacity-100 dark:bg-white/10" />

              <div className="relative overflow-hidden rounded-2xl border border-gray-400/50 bg-gray-300/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500 dark:border-white/20 dark:bg-white/5 dark:hover:border-white/30">
                <div className="relative z-10 flex items-start gap-4">
                  <StarGlyph
                    size={32}
                    className="mt-1 flex-shrink-0 drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                  />
                  <div className="max-w-[80%] text-left">
                    <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                      Coffee &amp; Code
                    </h3>
                    <p className="leading-relaxed text-gray-800 dark:text-white/90">
                      My secret recipe? A cup of coffee, a dash of curiosity,
                      and a sprinkle of chaos. Together, they turn ideas into
                      pixels and bugs into happy little features ✨.
                    </p>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 22, y: 10, scale: 0.92, rotate: 1 }}
                  whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ ...springTransition, stiffness: 130, delay: 0.12 }}
                  className="pointer-events-none absolute -right-10 bottom-0 hidden h-48 w-48 select-none opacity-90 brightness-100 md:block md:h-56 md:w-56 dark:brightness-75"
                >
                  <LottiePlayer src={lotties.coffee} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default AboutMe;
