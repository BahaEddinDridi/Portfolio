"use client";

import React, { useCallback, useEffect, useRef } from "react";

import { useTheme } from "@/hooks/useTheme";

type Easing = "linear" | "ease-in" | "ease-out" | "ease-in-out";

interface ClickSparkProps {
  sparkColor?: string;
  /** Used in the light theme, where a white spark would be invisible. */
  sparkColorLight?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: Easing;
  extraScale?: number;
  children?: React.ReactNode;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

function ease(easing: Easing, t: number): number {
  switch (easing) {
    case "linear":
      return t;
    case "ease-in":
      return t * t;
    case "ease-in-out":
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    default:
      return t * (2 - t);
  }
}

/**
 * Draws a burst of radiating lines wherever the page is clicked.
 *
 * The render loop lives in a ref rather than a `useCallback` that references
 * itself: a self-referential callback cannot see its own latest version, so the
 * frame scheduled from inside it would pin stale props for the rest of the
 * burst.
 */
const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = "#fff",
  sparkColorLight = "#111827",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationIdRef = useRef<number | null>(null);
  const drawRef = useRef<(timestamp: number) => void>(() => {});
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Rebuilt whenever the drawing inputs change, so a burst in flight picks up
  // a theme switch on its next frame.
  useEffect(() => {
    drawRef.current = (timestamp: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) {
        animationIdRef.current = null;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = isDark ? sparkColor : sparkColorLight;
      ctx.lineWidth = 2;

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const eased = ease(easing, elapsed / duration);
        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        ctx.beginPath();
        ctx.moveTo(
          spark.x + distance * Math.cos(spark.angle),
          spark.y + distance * Math.sin(spark.angle)
        );
        ctx.lineTo(
          spark.x + (distance + lineLength) * Math.cos(spark.angle),
          spark.y + (distance + lineLength) * Math.sin(spark.angle)
        );
        ctx.stroke();

        return true;
      });

      if (sparksRef.current.length > 0) {
        animationIdRef.current = requestAnimationFrame((next) =>
          drawRef.current(next)
        );
      } else {
        animationIdRef.current = null;
      }
    };
  }, [
    duration,
    easing,
    extraScale,
    isDark,
    sparkColor,
    sparkColorLight,
    sparkRadius,
    sparkSize,
  ]);

  const spawnSpark = useCallback(
    (x: number, y: number) => {
      const now = performance.now();
      for (let i = 0; i < sparkCount; i += 1) {
        sparksRef.current.push({
          x,
          y,
          angle: (2 * Math.PI * i) / sparkCount,
          startTime: now,
        });
      }

      if (animationIdRef.current === null) {
        animationIdRef.current = requestAnimationFrame((timestamp) =>
          drawRef.current(timestamp)
        );
      }
    },
    [sparkCount]
  );

  useEffect(() => {
    // `pointerdown` alone covers mouse, touch and pen. Listening for
    // `mousedown` as well fired two bursts per mouse click.
    const onPointerDown = (event: PointerEvent) =>
      spawnSpark(event.clientX, event.clientY);

    window.addEventListener("pointerdown", onPointerDown, { capture: true });
    return () =>
      window.removeEventListener("pointerdown", onPointerDown, {
        capture: true,
      });
  }, [spawnSpark]);

  useEffect(
    () => () => {
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
    },
    []
  );

  return (
    <div className="relative w-full">
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9999] h-screen w-screen"
      />
      {children}
    </div>
  );
};

export default ClickSpark;
