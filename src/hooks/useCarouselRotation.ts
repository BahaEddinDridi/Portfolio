"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** How quickly flick momentum decays each frame. */
const FRICTION = 0.85;
/** Below this, momentum is spent and the carousel snaps to the nearest card. */
const MOMENTUM_EPSILON = 0.1;
/** Pixels of pointer travel before a press counts as a drag rather than a click. */
const DRAG_THRESHOLD = 10;
const SNAP_DURATION_MS = 300;
const STEP_DURATION_MS = 600;

interface UseCarouselRotationOptions {
  itemCount: number;
  /** Drag is pointer-driven, so it is disabled on touch layouts. */
  enabled: boolean;
}

interface PointerSample {
  x: number;
  time: number;
}

/**
 * Rotation state for the 3D project carousel.
 *
 * Owns the drag, the flick momentum and the snap-back so that
 * `ProjectCarousel` only has to render; all three used to be interleaved with
 * the markup in one 800-line component.
 *
 * `currentIndex` is fractional while animating — cards interpolate between
 * positions — and lands on a whole number once a snap finishes.
 */
export function useCarouselRotation({
  itemCount,
  enabled,
}: UseCarouselRotationOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const frameRef = useRef<number | null>(null);
  const startRef = useRef<PointerSample>({ x: 0, time: 0 });
  const lastRef = useRef<PointerSample>({ x: 0, time: 0 });
  const velocityRef = useRef(0);
  const draggedRef = useRef(false);

  const cancelFrame = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  useEffect(() => cancelFrame, [cancelFrame]);

  const wrap = useCallback(
    (index: number) => ((index % itemCount) + itemCount) % itemCount,
    [itemCount]
  );

  /** Eases from wherever momentum left off to the nearest whole card. */
  const snapToNearest = useCallback(() => {
    const from = currentIndex;
    const to = Math.round(from);
    const startedAt = performance.now();

    const step = () => {
      const elapsed = performance.now() - startedAt;
      const progress = Math.min(elapsed / SNAP_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCurrentIndex(from + (to - from) * eased);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setCurrentIndex(wrap(to));
        frameRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(step);
  }, [currentIndex, wrap]);

  /** Spins down a flick, then hands over to the snap. */
  const startMomentum = useCallback(
    (initialMomentum: number) => {
      let momentum = initialMomentum;

      const step = () => {
        momentum *= FRICTION;

        if (Math.abs(momentum) < MOMENTUM_EPSILON) {
          frameRef.current = null;
          snapToNearest();
          return;
        }

        setCurrentIndex((previous) => wrap(previous - momentum / 400));
        frameRef.current = requestAnimationFrame(step);
      };

      frameRef.current = requestAnimationFrame(step);
    },
    [snapToNearest, wrap]
  );

  const beginDrag = useCallback(
    (clientX: number) => {
      if (!enabled) return;
      cancelFrame();
      const sample = { x: clientX, time: Date.now() };
      startRef.current = sample;
      lastRef.current = sample;
      velocityRef.current = 0;
      draggedRef.current = false;
      setIsDragging(true);
      setDragOffset(0);
    },
    [cancelFrame, enabled]
  );

  const updateDrag = useCallback(
    (clientX: number) => {
      if (!enabled || !isDragging) return;

      const now = Date.now();
      const elapsed = now - lastRef.current.time;
      if (elapsed > 0) {
        velocityRef.current = (clientX - lastRef.current.x) / elapsed;
      }
      lastRef.current = { x: clientX, time: now };

      const travelled = clientX - startRef.current.x;
      if (Math.abs(travelled) > DRAG_THRESHOLD) draggedRef.current = true;
      setDragOffset(travelled);
    },
    [enabled, isDragging]
  );

  const endDrag = useCallback(() => {
    if (!enabled || !isDragging) return;
    setIsDragging(false);
    const momentum = velocityRef.current * 35 + dragOffset * 0.05;
    setDragOffset(0);
    startMomentum(momentum);
  }, [dragOffset, enabled, isDragging, startMomentum]);

  /** Advances exactly one card; ignored while a step is already in flight. */
  const step = useCallback(
    (direction: "next" | "prev") => {
      if (isRotating) return;
      setIsRotating(true);
      cancelFrame();
      setCurrentIndex((previous) =>
        wrap(Math.round(previous) + (direction === "next" ? 1 : -1))
      );
      window.setTimeout(() => setIsRotating(false), STEP_DURATION_MS);
    },
    [cancelFrame, isRotating, wrap]
  );

  const goTo = useCallback(
    (index: number) => {
      if (isRotating) return;
      cancelFrame();
      setCurrentIndex(wrap(index));
    },
    [cancelFrame, isRotating, wrap]
  );

  return {
    currentIndex,
    dragOffset,
    isDragging,
    isRotating,
    /** True when the last pointer sequence moved far enough to be a drag, so a click can be ignored. */
    hasDragged: () => draggedRef.current,
    beginDrag,
    updateDrag,
    endDrag,
    step,
    goTo,
  };
}
