"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image5 from "@/assets/5.webp";

export function About() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".about-line");
      gsap.from(lines, {
        opacity: 0.15, ease: "none", stagger: 0.5,
        scrollTrigger: { trigger: ref.current, start: "top 70%", end: "bottom 60%", scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section id="about" ref={ref} className="px-6 md:px-10 py-32 md:py-48 overflow-hidden">
      <div className="grid grid-cols-12 gap-10 items-center">
        <p className="col-span-12 md:col-span-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/60 self-start pt-4">
          (Why RoyalFinity Technologies)
        </p>
        <div className="col-span-12 md:col-span-6 font-display text-3xl md:text-6xl leading-[1.1] tracking-tight space-y-4">
          <p className="about-line">We turn ideas into digital impact —</p>
          <p className="about-line">from brand to product to growth,</p>
          <p className="about-line italic text-[var(--gold)]">one stack, one team, one outcome.</p>
          <p className="about-line">Understanding your business comes first.</p>
          <p className="about-line">Results that last come second.</p>
        </div>
        <div className="col-span-12 md:col-span-4 flex justify-center md:justify-end floating">
          <img 
            src={typeof image5 === 'string' ? image5 : image5.src} 
            alt="" 
            className="w-full max-w-[500px] h-auto object-contain transition-all duration-1000 hover:scale-110"
          />
        </div>
      </div>
    </section>
  );
}
