"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const offerings = [
  { title: "Web Development", desc: "High-performance websites built for speed and scale." },
  { title: "Mobile App Development", desc: "Native and cross-platform apps that users love." },
  { title: "Digital Marketing", desc: "Data-driven strategies to grow your online presence." },
  { title: "AI & Automation", desc: "Smart solutions to streamline your business workflows." },
  { title: "UI/UX Design", desc: "Beautiful, intuitive interfaces that convert." },
];

export function WhatWeOffer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [shouldLoad, setShouldLoad] = useState(false);

  // Use IntersectionObserver to start loading only when near viewport
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: "600px" }); // Start loading when 600px away

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || !containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false }); // Optimize for performance
    if (!ctx) return;

    const frameCount = 135;
    const frames: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    const render = (index: number) => {
      const img = frames[index];
      if (img && img.complete) {
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    // Preload frames in batches or use a more efficient way
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const padded = String(i).padStart(3, "0");
      img.src = `/assets/whatweoffer/frame_${padded}_delay-0.041s.webp`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) render(0); 
      };
      frames.push(img);
    }

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const progress = ScrollTrigger.getById("offerST")?.progress || 0;
      render(Math.floor(progress * (frameCount - 1)));
    };

    window.addEventListener("resize", updateSize, { passive: true });
    updateSize();

    const st = ScrollTrigger.create({
      id: "offerST",
      trigger: containerRef.current,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 0.2, 
      onUpdate: (self) => {
        const frameIndex = Math.min(
          frameCount - 1,
          Math.floor(self.progress * frameCount)
        );
        requestAnimationFrame(() => render(frameIndex));

        // Update text index
        const textIdx = Math.min(
          offerings.length - 1,
          Math.floor(self.progress * offerings.length)
        );
        if (textIdx !== activeIndex) setActiveIndex(textIdx);
      },
    });

    return () => {
      st.kill();
      window.removeEventListener("resize", updateSize);
    };

  }, [shouldLoad, activeIndex]);

  return (
    <section ref={containerRef} className="relative h-[100svh] w-full bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover opacity-100"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-20">
        <div className="max-w-4xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ember)] mb-4">
            (What we offer)
          </p>
          
          <div className="relative h-[400px] sm:h-[450px] md:h-[500px] overflow-hidden">
            {offerings.map((offering, i) => (
              <div
                key={i}
                className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-expo ${
                  i === activeIndex 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-12"
                }`}
              >
                <h2 
                  className="font-display tracking-tighter leading-[0.9] mb-6"
                  style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
                >
                  {offering.title}
                </h2>
                <p 
                  className="text-bone/60 max-w-xl leading-relaxed"
                  style={{ fontSize: "clamp(1rem, 3vw, 1.5rem)" }}
                >
                  {offering.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-6 md:left-20 flex items-center gap-4 opacity-40">
        <div className="w-12 h-px bg-[var(--ember)]" />
        <span className="font-mono text-[10px] uppercase tracking-widest">
          {String(activeIndex + 1).padStart(2, "0")} / {String(offerings.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
