"use client";

import * as React from 'react';
import {
    createContext,
    useContext,
    useMemo,
    FC,
    ReactNode,
    ElementType,
    ComponentProps,
    CSSProperties,
} from 'react';
import { motion } from "motion/react";

/**
 * Deterministic pseudo-random source.
 *
 * Sparkle placement has to match between the server render and hydration, so it
 * is seeded by the sparkle's index rather than drawn from `Math.random()`. The
 * previous version generated positions in an effect purely to dodge a hydration
 * mismatch, which meant the sparkles popped in a frame after paint.
 */
const seeded = (seed: number): number => {
    const value = Math.sin(seed * 12.9898) * 43758.5453;
    return value - Math.floor(value);
};

/**
 * Rounded to three decimals on purpose: `Math.sin` differs in its last few
 * floating-point digits between Node and the browser, and an unrounded value
 * makes React report a hydration mismatch on every sparkle.
 */
const random = (seed: number, min: number, max: number): number =>
    Math.round((seeded(seed) * (max - min) + min) * 1000) / 1000;

// --- TYPE DEFINITIONS ---

// Defines the properties for a single sparkle
interface Sparkle {
    id: string;
    color: string;
    size: number;
    duration: number;
    style: {
        top: string;
        left: string;
        animationDelay: string;
    };
}

// Defines the configuration options for the useSparkles hook
interface UseSparklesOptions {
    colors?: { first: string; second: string };
    sparkleCount?: number;
    sparkleSize?: number;
}

// Defines the shape of the context data
interface SparklesContextType {
    sparkles: Sparkle[];
}

// Defines the props for the SparkleInstance component
interface SparkleInstanceProps {
    size: number;
    color: string;
    duration: number;
    style: CSSProperties;
    key?: string; // Add key prop to fix the type error
}

// Defines the base props for the SparklesText component
interface BaseSparklesTextProps extends UseSparklesOptions {
    children?: ReactNode;
    className?: string;
}

// Makes the SparklesText component polymorphic, allowing the 'as' prop
// to change the rendered HTML element and accept its specific attributes.
type PolymorphicSparklesTextProps<T extends ElementType> = {
    as?: T;
} & BaseSparklesTextProps & Omit<ComponentProps<T>, keyof BaseSparklesTextProps>;


// --- HOOK ---

/**
 * useSparkles Hook
 * This custom hook encapsulates the logic for generating and managing sparkles.
 * @param options - Configuration for the sparkles.
 * @returns An array of sparkle objects.
 */
const useSparkles = ({
    colors = { first: '#9E7AFF', second: '#FE8BBB' },
    sparkleCount = 20,
    sparkleSize = 12,
}: UseSparklesOptions = {}): Sparkle[] => {
    return useMemo(
        () =>
            Array.from({ length: sparkleCount }, (_, index): Sparkle => {
                const seed = index + 1;
                return {
                    id: `sparkle-${index}`,
                    color: seeded(seed * 7) > 0.5 ? colors.first : colors.second,
                    size: random(seed * 2, sparkleSize * 0.7, sparkleSize * 1.3),
                    duration: random(seed * 13, 1.5, 2.5),
                    style: {
                        top: `${random(seed * 3, 0, 100)}%`,
                        left: `${random(seed * 5, 0, 100)}%`,
                        animationDelay: `${random(seed * 11, 0, 2.5)}s`,
                    },
                };
            }),
        [sparkleCount, colors.first, colors.second, sparkleSize]
    );
};

// --- CONTEXT ---
const SparklesContext = createContext<SparklesContextType | null>(null);


// --- COMPONENTS ---

/**
 * SparkleInstance Component
 * Renders a single animated sparkle using an SVG shape.
 */
const SparkleInstance: FC<SparkleInstanceProps> = React.memo(({ size, color, duration, style }) => {
    const path = "M120 80L100 0 80 80 0 100l80 20 20 80 20-80 80-20-80-20z";

    return (
        <motion.span
            className="absolute pointer-events-none z-10"
            style={style}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], scale: 1, rotate: [0, 90, 180] }}
            transition={{
                duration,
                ease: 'easeInOut',
                repeat: Infinity,
                delay: parseFloat(style.animationDelay as string),
            }}
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d={path} fill={color} />
            </svg>
        </motion.span>
    );
});

SparkleInstance.displayName = 'SparkleInstance';

/**
 * SparklesWrapper Component
 * Consumes the sparkles context and renders the SparkleInstance components.
 */
const SparklesWrapper: FC = React.memo(() => {
    const context = useContext(SparklesContext);
    if (!context) {
        // This should not happen if the component is used correctly.
        return null;
    }
    const { sparkles } = context;

    return (
        <>
            {sparkles.map((sparkle) => (
                <SparkleInstance
                    key={sparkle.id}
                    size={sparkle.size}
                    color={sparkle.color}
                    duration={sparkle.duration}
                    style={sparkle.style as CSSProperties}
                />
            ))}
        </>
    );
});

SparklesWrapper.displayName = 'SparklesWrapper';

/**
 * SparklesText Component
 * The main component that wraps text and adds a sparkling effect.
 * It's a polymorphic component, meaning you can change the underlying
 * HTML element using the `as` prop.
 */
export const SparklesText = <T extends ElementType = 'h1'>({
    as,
    children,
    className,
    ...sparkleOptions
}: PolymorphicSparklesTextProps<T>) => {
    const Component = as || 'h1';
    const sparkles = useSparkles(sparkleOptions);
    const contextValue = useMemo(() => ({ sparkles }), [sparkles]);

    return (
        <SparklesContext.Provider value={contextValue}>
            <Component className={`relative inline-block ${className || ''}`}>
                <SparklesWrapper />
                <span className="relative z-20">{children}</span>
            </Component>
        </SparklesContext.Provider>
    );
};

export default SparklesText;
