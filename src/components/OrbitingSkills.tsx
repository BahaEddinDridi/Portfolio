// components/ui/OrbitingSkills.tsx
'use client';

import { useEffect, useState, memo } from 'react';
import { iconComponents, IconType, getIconType } from '@/types/techIcons';

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

type GlowColor = 'cyan' | 'purple' | 'blue' | 'green';

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor: GlowColor;
  animationDelay: number;
}

// --- Memoized SkillIcon Component ---
const SkillIcon = memo(({ type }: { type: IconType }) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? (
    <IconComponent className="w-full h-full" style={{ color: iconComponents[type]?.color }} />
  ) : (
    <span className="text-xl font-bold text-gray-900 dark:text-white">?</span>
  );
});
SkillIcon.displayName = 'SkillIcon';

// --- Memoized OrbitingSkill Component ---
const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full p-2 bg-white/10 dark:bg-gray-800/70 backdrop-blur-md
          rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer
          ${isHovered ? 'scale-125 shadow-2xl' : 'shadow-md hover:shadow-lg'}
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 20px ${iconComponents[iconType]?.color}60, 0 0 40px ${iconComponents[iconType]?.color}30`
            : `0 0 10px ${iconComponents[iconType]?.color}20`,
        }}
      >
        <SkillIcon type={iconType} />
        {isHovered && (
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900/90 dark:bg-gray-800/90 text-white dark:text-gray-100 rounded-lg text-sm font-medium shadow-md pointer-events-none">
            {label}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

// --- Optimized GlowingOrbitPath Component ---
const GlowingOrbitPath = memo(({ radius, glowColor, animationDelay }: GlowingOrbitPathProps) => {
  const glowColors = {
    cyan: {
      primary: 'rgba(34, 211, 238, 0.5)', // Brighter cyan
      secondary: 'rgba(34, 211, 238, 0.2)',
      border: 'rgba(34, 211, 238, 0.4)',
    },
    purple: {
      primary: 'rgba(168, 85, 247, 0.5)', // Softer purple
      secondary: 'rgba(168, 85, 247, 0.2)',
      border: 'rgba(168, 85, 247, 0.4)',
    },
    blue: {
      primary: 'rgba(59, 130, 246, 0.5)',
      secondary: 'rgba(59, 130, 246, 0.2)',
      border: 'rgba(59, 130, 246, 0.4)',
    },
    green: {
      primary: 'rgba(16, 185, 129, 0.5)', // Vibrant green
      secondary: 'rgba(16, 185, 129, 0.2)',
      border: 'rgba(16, 185, 129, 0.4)',
    },
  };

  const colors = glowColors[glowColor] || glowColors.cyan;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, transparent 40%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
          boxShadow: `0 0 40px ${colors.primary}, inset 0 0 30px ${colors.secondary}`,
          animation: 'pulse 3.5s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${colors.border}`,
          boxShadow: `inset 0 0 15px ${colors.secondary}`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main OrbitingSkills Component ---
export function OrbitingSkills({ skills }: { skills: string[] }) {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime((prevTime) => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Define orbit configurations
  const MAX_SKILLS_PER_ORBIT = 8;
  const FIRST_ORBIT_RADIUS = { base: 150, sm: 120, md: 140, lg: 150 };
  const ORBIT_RADIUS_INCREMENT = { base: 80, sm: 60, md: 70, lg: 80 };
  const glowColorOptions: GlowColor[] = ['cyan', 'purple', 'blue', 'green'];

  // Calculate maximum container size based on the largest orbit
  const maxOrbits = Math.ceil(skills.length / MAX_SKILLS_PER_ORBIT);
  const containerSize = {
    base: `${(FIRST_ORBIT_RADIUS.base + (maxOrbits - 1) * ORBIT_RADIUS_INCREMENT.base) * 2 + 80}px`,
    sm: `${(FIRST_ORBIT_RADIUS.sm + (maxOrbits - 1) * ORBIT_RADIUS_INCREMENT.sm) * 2 + 60}px`,
    md: `${(FIRST_ORBIT_RADIUS.md + (maxOrbits - 1) * ORBIT_RADIUS_INCREMENT.md) * 2 + 70}px`,
    lg: `${(FIRST_ORBIT_RADIUS.lg + (maxOrbits - 1) * ORBIT_RADIUS_INCREMENT.lg) * 2 + 80}px`,
  };

  // Group skills into orbits (up to 8 skills per orbit)
  const orbitGroups: string[][] = [];
  for (let i = 0; i < skills.length; i += MAX_SKILLS_PER_ORBIT) {
    orbitGroups.push(skills.slice(i, i + MAX_SKILLS_PER_ORBIT));
  }

  // Generate skill configurations for each orbit
  const skillsConfig: SkillConfig[] = orbitGroups.flatMap((group, orbitIndex) => {
    const orbitRadius = {
      base: FIRST_ORBIT_RADIUS.base + orbitIndex * ORBIT_RADIUS_INCREMENT.base,
      sm: FIRST_ORBIT_RADIUS.sm + orbitIndex * ORBIT_RADIUS_INCREMENT.sm,
      md: FIRST_ORBIT_RADIUS.md + orbitIndex * ORBIT_RADIUS_INCREMENT.md,
      lg: FIRST_ORBIT_RADIUS.lg + orbitIndex * ORBIT_RADIUS_INCREMENT.lg,
    };
    const glowColor = glowColorOptions[orbitIndex % glowColorOptions.length];
    const speed = orbitIndex % 2 === 0 ? 1.2 : -0.8; // Adjusted for smoother animation

    return group.map((skill, index) => {
      const numSkillsInOrbit = group.length;
      const phaseShift = (2 * Math.PI * index) / numSkillsInOrbit;
      return {
        id: skill.toLowerCase().replace(/\s+/g, ''),
        orbitRadius: orbitRadius.lg, // Default to lg, overridden by CSS
        size: 36 + (index % 3) * 4, // Slightly smaller orbs
        speed,
        iconType: getIconType(skill),
        phaseShift,
        glowColor,
        label: skill,
      };
    });
  });

  // Define orbit paths
  const orbitConfigs: Array<{ radius: { base: number; sm: number; md: number; lg: number }; glowColor: GlowColor; delay: number }> =
    orbitGroups.map((_, orbitIndex) => ({
      radius: {
        base: FIRST_ORBIT_RADIUS.base + orbitIndex * ORBIT_RADIUS_INCREMENT.base,
        sm: FIRST_ORBIT_RADIUS.sm + orbitIndex * ORBIT_RADIUS_INCREMENT.sm,
        md: FIRST_ORBIT_RADIUS.md + orbitIndex * ORBIT_RADIUS_INCREMENT.md,
        lg: FIRST_ORBIT_RADIUS.lg + orbitIndex * ORBIT_RADIUS_INCREMENT.lg,
      },
      glowColor: glowColorOptions[orbitIndex % glowColorOptions.length],
      delay: orbitIndex * 0.4,
    }));

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(55, 65, 81, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(75, 85, 99, 0.3) 0%, transparent 50%)`,
          }}
        />
      </div>
      <div
        className="relative flex items-center justify-center w-[var(--container-size)] h-[var(--container-size)] min-w-[280px] min-h-[280px] sm:min-w-[360px] sm:min-h-[360px] md:min-w-[400px] md:min-h-[400px] lg:min-w-[480px] lg:min-h-[480px]"
        style={{
          '--container-size-base': containerSize.base,
          '--container-size-sm': containerSize.sm,
          '--container-size-md': containerSize.md,
          '--container-size': containerSize.lg,
        } as React.CSSProperties}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900 rounded-full flex items-center justify-center z-10 relative shadow-xl">
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 dark:bg-cyan-600/20 blur-xl animate-pulse"></div>
          <div
            className="absolute inset-0 rounded-full bg-purple-400/20 dark:bg-purple-600/20 blur-xl animate-pulse"
            style={{ animationDelay: '0.8s' }}
          ></div>
          <div className="relative z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
        </div>
        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius.lg}`}
            radius={config.radius.lg} // Default to lg, overridden by CSS
            glowColor={config.glowColor}
            animationDelay={config.delay}
          />
        ))}
        {skillsConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return <OrbitingSkill key={config.id} config={config} angle={angle} />;
        })}
      </div>
    </div>
  );
}