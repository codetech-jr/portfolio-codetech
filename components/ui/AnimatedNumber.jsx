"use client";
import React, { useEffect, useRef, useState } from "react";

// Lightweight number animator using requestAnimationFrame.
// Avoids framer-motion to keep bundle small and deterministic.
export default function AnimatedNumber({ value = 0, duration = 1500 }) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef(null);
  const fromRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    startRef.current = start;
    fromRef.current = display;

    function tick(now) {
      const elapsed = Math.min(now - startRef.current, duration);
      const progress = elapsed / duration;
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(fromRef.current + (value - fromRef.current) * eased);
      setDisplay(current);
      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span>{display}</span>;
}