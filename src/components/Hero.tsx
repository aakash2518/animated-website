"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useVisibility } from "@/context/VisibilityContext";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isVisible } = useVisibility();
  
  const frameCount = 73;
  const frames = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `/assets/hero/frame_${i.toString().padStart(2, "0")}_delay-0.041s.webp`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }
    frames.current = images;
  }, []);

  useEffect(() => {
    if (!isVisible || !imagesLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const render = (index: number) => {
      const img = frames.current[index];
      if (!img) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;
      const x = (canvasWidth - newWidth) / 2;
      const y = (canvasHeight - newHeight) / 2;

      context.drawImage(img, x, y, newWidth, newHeight);
    };

    const obj = { frame: 0 };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(Math.floor(obj.frame));
    };

    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
          pin: containerRef.current,
        },
      });

      // Animate frames
      tl.to(obj, {
        frame: frameCount - 1,
        ease: "none",
        onUpdate: () => render(Math.floor(obj.frame)),
      }, 0);

      // Text animations
      tl.to(".text-part-1", 
        { opacity: 0, y: -50, duration: 0.2 }, 
        0.35
      );

      tl.fromTo(".text-part-2", 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.2 }, 
        0.6
      );
      
      tl.fromTo(".hero-footer",
        { opacity: 0 },
        { opacity: 1, duration: 0.1 },
        0.8
      );
    }, root);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, [isVisible, imagesLoaded]);

  return (
    <section ref={root} className="relative h-[400vh] w-full bg-black">
      <div ref={containerRef} className="sticky top-0 h-[85svh] md:h-[100svh] w-full overflow-hidden grain">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover opacity-70 will-change-transform" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

        <div className="relative z-10 flex h-full flex-col justify-between px-6 md:px-10 pt-32 pb-24">
          <div className="flex justify-between items-start font-mono uppercase tracking-[0.25em] text-[var(--bone)]/70" style={{ fontSize: "clamp(0.6rem, 1.5vw, 0.75rem)" }}>
            <span>Faridabad / India</span>
            <span className="text-right max-w-[18ch] hidden md:block text-xs">RoyalFinity Technologies — let&apos;s grow together</span>
          </div>

          <div className="relative flex-grow flex items-center justify-start py-8 md:py-0">
            <h1 className="hero-title text-left w-full">
              <div className="text-part-1 opacity-100 absolute inset-0 flex flex-col items-start justify-center pointer-events-none">
                <span 
                  className="block font-display leading-[1.1] tracking-tighter uppercase max-w-[18ch]"
                  style={{ fontSize: "clamp(1.8rem, 5.5vw, 5rem)" }}
                >
                  Struggling <span className="hero-italic normal-case tracking-normal text-[var(--gold)]" style={{ fontSize: "clamp(1.5rem, 4.5vw, 4rem)" }}>to grow your</span> business online?
                </span>
              </div>
              <div className="text-part-2 opacity-0 absolute inset-0 flex flex-col items-start justify-center pointer-events-none">
                <span 
                  className="block font-display text-[var(--gold)] leading-[0.9] tracking-tighter uppercase italic"
                  style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)" }}
                >
                  We fix that.
                </span>
              </div>
            </h1>
          </div>

          <div className="hero-footer opacity-0 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 sm:gap-8">
            <div className="flex flex-col xs:flex-row gap-4 w-full sm:w-auto">
              <Link href="/contact" className="px-8 py-4 bg-[var(--gold)] text-[var(--accent-foreground)] text-center text-[10px] sm:text-xs uppercase tracking-[0.2em] font-mono hover:opacity-90 transition shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                Start a project →
              </Link>
              <Link href="/services" className="px-8 py-4 border border-[var(--bone)]/30 text-[var(--bone)] text-center text-[10px] sm:text-xs uppercase tracking-[0.2em] font-mono hover:border-[var(--gold)] hover:text-[var(--gold)] transition">
                Explore services
              </Link>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/70 hidden sm:block">Scroll ↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
