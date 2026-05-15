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
    const context = canvas.getContext("2d");
    if (!context) return;

    const render = (index: number) => {
      const img = frames.current[index];
      if (!img) return;

      // Handle "cover" object-fit behavior for canvas
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;
      const x = (canvasWidth - newWidth) / 2;
      const y = (canvasHeight - newHeight) / 2;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(img, x, y, newWidth, newHeight);
    };

    const obj = { frame: 0 };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(Math.floor(obj.frame));
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: containerRef.current,
        },
      });

      // Animate frames
      tl.to(obj, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        onUpdate: () => render(Math.floor(obj.frame)),
      }, 0);

      // Text 1: "Struggling to grow your business online?"
      tl.to(".text-part-1", 
        { opacity: 0, y: -50, duration: 0.2 }, 
        0.35
      );

      // Text 2: "We fix that."
      tl.fromTo(".text-part-2", 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.2 }, 
        0.6
      );
      
      // Secondary info reveal
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
      <div ref={containerRef} className="sticky top-0 h-[100vh] w-full overflow-hidden grain">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover opacity-70 will-change-transform" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

        <div className="relative z-10 flex h-full flex-col justify-between px-6 md:px-10 pt-32 pb-24">
          <div className="flex justify-between items-start font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/70">
            <span>Faridabad / India</span>
            <span className="text-right max-w-[18ch] hidden sm:block">RoyalFinity Technologies — let&apos;s grow together</span>
          </div>

          <div className="relative flex-grow flex items-center justify-start">
            <h1 className="hero-title text-left w-full">
              <div className="text-part-1 opacity-100 absolute inset-0 flex flex-col items-start justify-center pointer-events-none">
                <span className="block text-[clamp(2rem,10vw,8rem)] font-display leading-[0.9] tracking-tighter uppercase max-w-[15ch]">
                  Struggling <span className="hero-italic normal-case tracking-normal text-[var(--gold)]">to grow your</span> business online?
                </span>
              </div>
              <div className="text-part-2 opacity-0 absolute inset-0 flex flex-col items-start justify-center pointer-events-none">
                <span className="block text-[clamp(3.5rem,15vw,12rem)] font-display text-[var(--gold)] leading-[0.85] tracking-tighter uppercase italic">
                  We fix that.
                </span>
              </div>
            </h1>
          </div>

          <div className="hero-footer opacity-0 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 sm:gap-6">
            <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
              <Link href="/contact" className="px-6 py-3 bg-[var(--gold)] text-[var(--accent-foreground)] text-center text-xs uppercase tracking-[0.2em] font-mono hover:opacity-90 transition shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                Start a project →
              </Link>
              <Link href="/services" className="px-6 py-3 border border-[var(--bone)]/30 text-[var(--bone)] text-center text-xs uppercase tracking-[0.2em] font-mono hover:border-[var(--gold)] hover:text-[var(--gold)] transition">
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
