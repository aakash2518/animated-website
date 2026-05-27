"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;

    // Use quickSetter for zero-overhead direct property writes
    const setRingX = gsap.quickSetter(ringRef.current, "x", "px");
    const setRingY = gsap.quickSetter(ringRef.current, "y", "px");
    const setDotX = gsap.quickSetter(dotRef.current, "x", "px");
    const setDotY = gsap.quickSetter(dotRef.current, "y", "px");

    // Ring lerp state — updated in RAF, not on every mousemove
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafId = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      setRingX(ringX);
      setRingY(ringY);
      rafId = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows instantly
      setDotX(mouseX);
      setDotY(mouseY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor]");
      gsap.to(ringRef.current, {
        scale: interactive ? 2.5 : 1,
        backgroundColor: interactive ? "rgba(212, 175, 55, 0.15)" : "transparent",
        duration: 0.25,
        overwrite: true,
      });
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-9999 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-(--bone)/60 hidden md:block"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-9999 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--ember) hidden md:block"
      />
    </>
  );
}
