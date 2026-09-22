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
          /*
           * The silhouette is filled near-black. At night that matches the
           * footer exactly and the treeline runs straight into it; by day it
           * drops to a haze so it reads as a distant ridge rather than a
           * black slab dropped on the parchment.
           */
          className="h-auto w-full object-cover object-bottom opacity-[0.22] transition-opacity duration-500 dark:opacity-100"
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
              className="border-border bg-surface/40 m-4 flex aspect-square w-full items-center justify-center rounded-sm border backdrop-blur-sm"
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
                  className="group border-border bg-surface/55 hover:border-gilt/55 relative block rounded-sm border p-5 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_28px_var(--glow)]"
                >
                  <div className="flex items-start gap-4">
                    <span className="border-gilt/40 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border">
                      <Icon className="text-gilt h-[18px] w-[18px]" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-gilt-text mb-1 text-sm font-bold tracking-[0.1em] uppercase">
                        {label}
                      </h3>
                      <p className="font-mono text-xs break-all opacity-65">
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
