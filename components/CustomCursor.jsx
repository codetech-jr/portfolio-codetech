"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const trailingRef = useRef(null);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const pathname = usePathname();

  useEffect(() => {
    // Detect if device is touch or prefers reduced motion
    const touchQuery = window.matchMedia("(pointer: coarse)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (touchQuery.matches || motionQuery.matches) {
      setIsTouchDevice(true);
      return;
    }

    let rafId = null;
    let targetX = 0;
    let targetY = 0;
    
    // Position states for the trailing circle (elastomeric effect)
    let currentX = 0;
    let currentY = 0;

    const mouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      
      // The inner dot tracks immediately with no delay via native style
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${targetX - 4}px, ${targetY - 4}px, 0)`;
      }
    };

    // RAF loop for elastic trailing circle
    const render = () => {
      currentX += (targetX - currentX) * 0.15; // Leerp factor
      currentY += (targetY - currentY) * 0.15;
      
      if (trailingRef.current) {
        trailingRef.current.style.transform = `translate3d(${currentX - 16}px, ${currentY - 16}px, 0)`;
      }
      
      rafId = requestAnimationFrame(render);
    };
    
    rafId = requestAnimationFrame(render);
    
    const applyHoverLinks = () => {
      const links = document.querySelectorAll("a, button, input, textarea, select, [role='button']");
      links.forEach((link) => {
        link.addEventListener("mouseenter", () => setIsHovering(true));
        link.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    window.addEventListener("mousemove", mouseMove);
    
    // Re-attach hover listeners when pathname changes
    setTimeout(applyHoverLinks, 500);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      cancelAnimationFrame(rafId);
      const links = document.querySelectorAll("a, button, input, textarea, select, [role='button']");
      links.forEach((link) => {
        link.removeEventListener("mouseenter", () => setIsHovering(true));
        link.removeEventListener("mouseleave", () => setIsHovering(false));
      });
    };
  }, [pathname]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[9999]"
        style={{ willChange: "transform" }}
      />
      
      <div
        ref={trailingRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out border-2 ${
          isHovering 
            ? "border-accent bg-accent/30 scale-[2.5] backdrop-blur-[2px]" 
            : "border-accent/50 bg-transparent scale-100"
        }`}
        style={{ willChange: "transform, width, height, background-color" }}
      />
    </>
  );
}
