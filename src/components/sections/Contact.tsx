"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { LottiePlayer } from "@/components/effects/LottiePlayer";
import { contactChannels } from "@/data/contact";
import { lotties } from "@/data/lotties";
import {
  fadeUpVariants,
  headingVariants,
  sectionTransition,
  springTransition,
  staggerContainer,
  viewportOnce,
} from "@/lib/motion";

export function ContactMe() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={sectionTransition}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10"
    >
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <Image
          src="/svgs/hero-dark.svg"
          alt=""
          aria-hidden
          width={1920}
          height={200}
          className="h-auto w-full object-cover object-bottom brightness-100 transition-all duration-500 dark:brightness-0 dark:invert"
        />
      </div>

      <div className="relative z-10 mx-auto mb-60 w-full max-w-7xl">
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-gilt-text mb-4 text-4xl font-extrabold tracking-[0.06em] uppercase md:text-5xl">
            Send a Raven
          </h2>
          <p className="mx-auto max-w-2xl text-lg italic opacity-70">
            The bird is reliable. The wizard answers within a day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -18, y: 10, scale: 0.95, rotate: -1 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
            viewport={viewportOnce}
            transition={springTransition}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="m-4 flex aspect-square w-full items-center justify-center rounded-3xl border border-blue-300 bg-gradient-to-br from-blue-500 to-blue-300 backdrop-blur-sm dark:border-purple-400/20 dark:from-purple-500/10 dark:to-blue-500/10"
            >
              <LottiePlayer
                src={lotties.mailSent}
                className="brightness-100 dark:brightness-80"
              />
            </motion.div>
          </motion.div>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex list-none flex-col gap-4"
          >
            {contactChannels.map(({ label, value, href, icon: Icon }) => (
              <motion.li key={label} variants={fadeUpVariants}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-100/50 to-gray-100/70 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 dark:border-purple-400/20 dark:from-purple-500/10 dark:to-blue-500/10 dark:hover:border-purple-400/40"
                >
                  <div className="flex items-start gap-4">
                    <Icon
                      className="h-9 w-9 flex-shrink-0 text-blue-500 dark:text-white"
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-1 text-lg font-semibold text-slate-900 dark:text-white">
                        {label}
                      </h3>
                      <p className="break-all text-sm text-gray-800 dark:text-gray-400">
                        {value}
                      </p>
                    </div>
                  </div>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </motion.section>
  );
}

export default ContactMe;
