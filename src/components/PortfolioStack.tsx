"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { projects } from "@/data/site";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export function PortfolioStack() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray(".stack-card") as HTMLElement[];
    
    // Set initial positions for cards (except the first one)
    gsap.set(cards.slice(1), { yPercent: 100, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${cards.length * 100}%`,
        scrub: 0.2,
        pin: true,
        anticipatePin: 1,
      }
    });

    cards.forEach((card, i) => {
      // Add hardware acceleration only during animation
      gsap.set(card, { willChange: "transform, opacity" });
      
      if (i > 0) {
        tl.to(card, {
          yPercent: 0,
          opacity: 1,
          ease: "none",
        }, i - 0.5); 

        tl.to(cards[i - 1], {
          scale: 0.94,
          opacity: 0.8,
          ease: "none",
        }, i - 0.5);
      }
    });

    // Clean up willChange after scroll ends to free GPU memory
    ScrollTrigger.getAll().forEach(st => {
      st.vars.onLeave = () => cards.forEach(c => (c.style.willChange = "auto"));
      st.vars.onEnterBack = () => cards.forEach(c => (c.style.willChange = "transform, opacity"));
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="work" 
      className="relative bg-black h-screen overflow-hidden flex flex-col justify-start items-center pt-20 md:pt-24 lg:pt-28 pb-8"
    >
      {/* Pinned Header */}
      <div className="w-full text-center z-50 pointer-events-none mb-4 md:mb-6 shrink-0">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="portfolio-section-title font-display text-white tracking-tight leading-tight px-6"
        >
          Impact of solutions{" "}
          <span className="text-[#D4AF37] italic">like them:</span>
        </motion.h2>
      </div>

      {/* Stack Cards Container */}
      <div className="relative w-full h-[58vh] md:h-[60vh] lg:h-[62vh] flex items-center justify-center shrink-0 overflow-hidden">
        {projects.map((project, idx) => (
          <div 
            key={project.n} 
            className="stack-card absolute w-[92vw] lg:w-[80vw] h-full bg-[#0B0B0B] border border-white/10 rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            style={{ zIndex: idx }}
          >
            {/* Left Side: Image */}
            <div className="w-full lg:w-3/5 h-1/2 lg:h-full relative overflow-hidden group">
              <Image 
                src={project.img} 
                alt={project.title}
                fill
                className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            </div>

            {/* Right Side: Info */}
            <div className="w-full lg:w-2/5 h-1/2 lg:h-full p-6 md:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] font-mono text-[9px] uppercase tracking-widest rounded-full border border-[#D4AF37]/20">
                    {project.category}
                  </span>
                </div>
                
                <h3 className="portfolio-card-title font-display text-white tracking-tighter mb-2 md:mb-4 leading-[1.1]">
                  {project.title}
                </h3>
                
                <p className="text-white/60 text-xs md:text-sm leading-relaxed max-w-sm mb-3 md:mb-6">
                  {project.desc}
                </p>

                <div className="grid grid-cols-2 gap-4 md:gap-8 py-3 md:py-6 border-t border-white/5">
                  <div>
                    <span className="block font-mono text-[8px] md:text-[9px] uppercase tracking-widest text-white/30 mb-1">Timeline</span>
                    <span className="font-display text-base md:text-lg text-white">2.5 Months</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[8px] md:text-[9px] uppercase tracking-widest text-white/30 mb-1">Metrics</span>
                    <span className="font-display text-base md:text-lg text-[#D4AF37]">70% Growth</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#D4AF37] flex items-center justify-center font-display text-black text-xs font-bold">
                    {project.title[0]}
                  </div>
                  <div>
                    <span className="block text-white text-[10px] md:text-xs font-semibold">Project Lead</span>
                    <span className="block text-white/40 text-[9px] md:text-[10px]">RoyalFinity Team</span>
                  </div>
                </div>
                
                <button
                  type="button"
                  title="View project"
                  aria-label="View project"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group hover:bg-white hover:text-black transition-all duration-500"
                >
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
