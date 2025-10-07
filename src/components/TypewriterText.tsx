"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TypewriterText({ text, className = "", delay = 0 }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const controls = useAnimation();

  useEffect(() => {
    let i = 0;
    const type = async () => {
      await controls.start({ opacity: 1 });
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    };

    const timer = setTimeout(type, delay * 1000);
    return () => clearTimeout(timer);
  }, [text, delay, controls]);

  return (
    <motion.p
      className={className}
      initial={{ opacity: 0 }}
      animate={controls}
    >
      {displayText}
      <motion.span
        className="inline-block w-1 h-4 bg-violet-500 ml-1"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
      />
    </motion.p>
  );
}