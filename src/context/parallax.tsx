"use client";
import Image from "next/image";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxBackground() {
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 1000], [0, -200]);

  return (
    <motion.div
      style={{ y }}
      className="fixed inset-0 -z-10 h-screen w-full bg-black overflow-hidden"
    >
      <Image src="/images/bg.svg" alt="Night Scenery" fill className="object-cover" />
    </motion.div>
  );
}
