"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import image5 from "@/assets/5.webp";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".about-line");
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 65%",
          end: "bottom 55%",
          scrub: true,
        },
      });

      lines.forEach((line, i) => {
        // Set initial state: dim bone
        gsap.set(line, { color: "#F5F1E6", opacity: 0.15 });

        // Phase 1: Light up in Gold when scrolling into focus
        tl.to(line, {
          color: "#D4AF37",
          opacity: 1,
          duration: 0.5,
        }, i * 0.5);

        // Phase 2: Fade back to clean bone-white as the scroll moves to next lines
        tl.to(line, {
          color: "#F5F1E6",
          opacity: 0.8,
          duration: 0.5,
        }, (i * 0.5) + 0.5);
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section id="about" ref={ref} className="py-16 md:py-20 overflow-hidden px-0">
      <div className="responsive-container grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-20 items-center">
        {/* Left Section: Label and Text */}
        <div className="w-full lg:w-[70%] space-y-6 md:space-y-8">
          <p 
            className="font-mono uppercase tracking-[0.3em] text-[var(--bone)]/50"
            style={{ fontSize: "clamp(0.65rem, 1.2vw, 0.75rem)" }}
          >
            (Why RoyalFinity Technologies)
          </p>
          
          <h2 
            className="font-display leading-[1.1] tracking-tight space-y-3 md:space-y-4"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)" }}
          >
            <p className="about-line">We turn ideas into <br className="hidden md:block" /> digital impact —</p>
            <p className="about-line">from brand to product <br className="hidden md:block" /> to growth,</p>
            <p className="about-line italic underline decoration-[var(--gold)]/20 underline-offset-[6px] md:underline-offset-[8px]">one stack, one team, one outcome.</p>
            <p className="about-line mt-4 md:mt-6">Understanding your <br className="hidden md:block" /> business comes first.</p>
            <p className="about-line">Results that last <br className="hidden md:block" /> come second.</p>
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
