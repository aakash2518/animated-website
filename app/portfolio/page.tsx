"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/site";
import { Footer } from "@/components/Footer";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PortfolioPage() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-img").forEach((el) => {
        gsap.fromTo(el, { scale: 1.2 }, {
          scale: 1, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
      gsap.from(".project-title", {
        y: 60, opacity: 0, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: ".project-title", start: "top 85%" },
        stagger: 0.1,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={ref} className="relative pt-32">
      <section className="px-6 md:px-10 pb-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/60">(Portfolio / 2023 — 2025)</p>
        <h1 className="mt-6 font-display text-[11vw] md:text-[8vw] leading-[0.85] tracking-[-0.04em]">
          Recent <span className="italic text-[var(--ember)]">work.</span>
        </h1>
      </section>

      <section className="px-6 md:px-10 space-y-32 md:space-y-48 pb-32">
        {projects.map((p, i) => (
          <article 
            key={p.n} 
            className={`flex flex-col gap-12 md:gap-16 items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
          >
            <div className="w-full md:w-2/3">
              <div className="overflow-hidden bg-card aspect-[16/10] rounded-2xl group relative" data-cursor>
                <Image 
                  src={p.img} 
                  alt={p.title} 
                  fill
                  className="project-img object-cover will-change-transform transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/3 flex flex-col justify-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]">
                {p.n} / {p.year}
              </div>
              <h2 className="project-title mt-4 font-display text-4xl md:text-6xl tracking-tighter leading-[0.95] text-white">
                {p.title}
              </h2>
              <p className="mt-6 text-white/60 leading-relaxed">
                {p.desc}
              </p>
              <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]/80">
                {p.tag}
              </p>
              
              <div className="mt-10 flex items-center gap-4 group cursor-pointer">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 group-hover:text-[#D4AF37] transition-colors">View Case Study</span>
                <div className="w-8 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-[#D4AF37] transition-all duration-500" />
              </div>
            </div>
          </article>
        ))}
      </section>

      <Footer />
    </main>
  );
}
