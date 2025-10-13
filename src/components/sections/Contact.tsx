"use client";
import dynamic from "next/dynamic";
import Lottie from "lottie-react";
const Particles = dynamic(() => import("../Particles"), { ssr: false });
const ShootingStars = dynamic(() => import("../ShootingStar"), { ssr: false });
import messageSentAnimation from "@/../public/lotties/mail-sent.json";
import { SiDiscord } from "react-icons/si";
import Image from "next/image";

export function ContactMe() {
  const contactInfo = [
    {
      label: "Email",
      value: "hello@example.com",
      icon: "📧",
      link: "mailto:hello@example.com",
    },
    {
      label: "Phone",
      value: "+1 (555) 123-4567",
      icon: "📱",
      link: "tel:+15551234567",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/yourname",
      icon: "💼",
      link: "https://linkedin.com/in/yourname",
    },
    {
      label: "GitHub",
      value: "github.com/yourname",
      icon: "💻",
      link: "https://github.com/yourname",
    },
    {
      label: "Discord",
      value: "username#1234",
      icon: <SiDiscord className="text-blue-400 dark:text-white w-10 h-10" />,
      link: "https://discord.com/users/youruserid",
    },
  ];
  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-white dark:bg-[#030f18] transition-all duration-1000"
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
  className={`
    w-full h-auto object-cover object-bottom
    transition-all duration-500
    filter brightness-100 dark:brightness-0 dark:invert
  `}
  priority
/>
</div>
      <div className="max-w-7xl mx-auto w-full relative z-10 mb-60">
        <div className="mb-16 text-center transition-all duration-1000 delay-200">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
            Feel free to reach out through any of these channels
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side: Lottie animation */}
          <div className="flex justify-center">
            <div className="w-full m-4 aspect-square rounded-3xl bg-gradient-to-br from-blue-500 to-blue-300 dark:from-purple-500/10 dark:to-blue-500/10 backdrop-blur-sm border border-blue-300 dark:border-purple-400/20 flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center">
                <Lottie
                  animationData={messageSentAnimation}
                  loop
                  className="mx-auto dark:brightness-80 brightness-100"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
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
    </section>
  );
}
