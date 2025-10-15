"use client";
import dynamic from "next/dynamic";
import Lottie from "lottie-react";
const Particles = dynamic(() => import("../Particles"), { ssr: false });
const ShootingStars = dynamic(() => import("../ShootingStar"), { ssr: false });
import messageSentAnimation from "@/../public/lotties/mail-sent.json";
import { SiDiscord } from "react-icons/si";
import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";

export function ContactMe() {
  const ref = useRef(null);
  const contactInfo = [
    {
      label: "Email",
      value: "BahaEddine.Dridi@esprit.tn",
      icon: "📧",
      link: "mailto:BahaEddine.Dridi@esprit.tn",
    },
    {
      label: "Phone",
      value: "+216 51 255 758",
      icon: "📱",
      link: "tel:+21651255758",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/baha-eddine-dridi-88b039203",
      icon: "💼",
      link: "https://linkedin.com/in/baha-eddine-dridi-88b039203",
    },
    {
      label: "GitHub",
      value: "github.com/BahaEddinDridi",
      icon: "💻",
      link: "https://github.com/BahaEddinDridi",
    },
    {
      label: "Discord",
      value: "geodaddy1591",
      icon: <SiDiscord className="text-blue-400 dark:text-white w-10 h-10" />,
      link: "https://discord.com/users/geodaddy1591",
    },
  ];

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  return (
    <motion.section
      ref={ref}
      id="contact"
      className="relative min-h-screen flex items-center justify-center px-4 py-10 overflow-hidden  transition-all duration-1000"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
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

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <Image
          src="/svgs/hero-dark.svg"
          alt="Background trees"
          width={1920}
          height={200}
          className="w-full h-auto object-cover object-bottom transition-all duration-500 filter brightness-100 dark:brightness-0 dark:invert"
          priority
        />
      </div>
      <div className="max-w-7xl mx-auto w-full relative z-10 mb-60">
        <motion.div className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
            Feel free to reach out through any of these channels
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side: Lottie animation */}
          <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
             className="flex justify-center">
            <motion.div 
            animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-full m-4 aspect-square rounded-3xl bg-gradient-to-br from-blue-500 to-blue-300 dark:from-purple-500/10 dark:to-blue-500/10 backdrop-blur-sm border border-blue-300 dark:border-purple-400/20 flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center">
                <Lottie
                  animationData={messageSentAnimation}
                  loop
                  className="mx-auto dark:brightness-80 brightness-100"
                />
              </div>
            </motion.div>
          </motion.div>
          <div
            className="flex flex-col gap-4">
            {contactInfo.map((contact, index) => (
              <a
                key={index}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-gray-100/50 to-gray-100/70 dark:from-purple-500/10  dark:to-blue-500/10 backdrop-blur-sm border border-gray-200 dark:border-purple-400/20 dark:hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{contact.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-slate-900 dark:text-white font-semibold text-lg mb-1">
                      {contact.label}
                    </h3>
                    <p className="text-gray-800 dark:text-gray-400 text-sm break-all">
                      {contact.value}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
