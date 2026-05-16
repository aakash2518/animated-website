"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
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
    <section id="about" ref={ref} className="py-24 md:py-32 overflow-hidden px-0">
      <div className="responsive-container grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-20 items-center">
        {/* Left Section: Label and Text */}
        <div className="w-full lg:w-[65%] space-y-12">
          <p 
            className="font-mono uppercase tracking-[0.3em] text-[var(--bone)]/50"
            style={{ fontSize: "clamp(0.65rem, 1.5vw, 0.8rem)" }}
          >
            (Why RoyalFinity Technologies)
          </p>
          
          <h2 
            className="font-display leading-[1.1] tracking-tight space-y-6 md:space-y-8"
            style={{ fontSize: "clamp(2rem, 6vw, 5.5rem)" }}
          >
            <p className="about-line">We turn ideas into <br className="hidden md:block" /> digital impact —</p>
            <p className="about-line">from brand to product <br className="hidden md:block" /> to growth,</p>
            <p className="about-line italic text-[var(--gold)] underline decoration-[var(--gold)]/20 underline-offset-[8px] md:underline-offset-[12px]">one stack, one team, one outcome.</p>
            <p className="about-line text-[var(--bone)]/40 mt-8 md:mt-12">Understanding your <br className="hidden md:block" /> business comes first.</p>
            <p className="about-line text-[var(--bone)]/40">Results that last <br className="hidden md:block" /> come second.</p>
          </h2>
        </div>

        {/* Right Section: Character Image */}
        <div className="w-full flex justify-center md:justify-end floating relative px-6 md:px-0 order-2 md:order-none">
          {/* Subtle glow behind character */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[var(--gold)]/10 blur-[100px] md:blur-[120px] rounded-full pointer-events-none" />
          
          <Image 
            src={image5} 
            alt="Character" 
            className="mx-auto md:mx-0 object-contain transition-all duration-1000 hover:scale-105 relative z-10"
            style={{ width: "clamp(130px, 28vw, 300px)", height: "auto" }}
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
