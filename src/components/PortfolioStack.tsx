"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { projects } from "@/data/site";
import { ArrowUpRight } from "lucide-react";

export function PortfolioStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray(".stack-card") as HTMLElement[];
    
    // Set initial positions for cards (except the first one)
    gsap.set(cards.slice(1), { yPercent: 100 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${cards.length * 100}%`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    cards.forEach((card, i) => {
      if (i > 0) {
        // Bring the card up
        tl.to(card, {
          yPercent: 0,
          ease: "none",
        }, i - 0.5); // Start slightly before previous ends for overlap feel

        // Scale down and blur the previous card
        tl.to(cards[i - 1], {
          scale: 0.9,
          opacity: 0.5,
          filter: "blur(10px)",
          ease: "none",
        }, i - 0.5);
      }
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
      className="relative bg-black min-h-screen overflow-hidden py-20 md:py-32"
    >
      {/* Sticky Header */}
      <div className="sticky top-20 md:top-24 left-0 w-full text-center z-50 pointer-events-none mb-16 md:mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight px-6"
        >
          Impact of solutions{" "}
          <span className="text-[#D4AF37] italic">like them:</span>
        </motion.h2>
      </div>

      <div className="relative w-full h-[80vh] flex items-center justify-center">
        {projects.map((project, idx) => (
          <div 
            key={project.n} 
            className="stack-card absolute w-[90vw] lg:w-[80vw] h-[70vh] lg:h-[75vh] bg-[#0B0B0B] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            style={{ zIndex: idx }}
          >
            {/* Left Side: Image */}
            <div className="w-full lg:w-3/5 h-1/2 lg:h-full relative overflow-hidden group">
              <img 
                src={project.img} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Right Side: Info */}
            <div className="w-full lg:w-2/5 h-1/2 lg:h-full p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] font-mono text-[9px] uppercase tracking-widest rounded-full border border-[#D4AF37]/20">
                    {project.category}
                  </span>
                </div>
                
                <h3 className="font-display text-4xl lg:text-5xl text-white tracking-tighter mb-4 leading-[1.1]">
                  {project.title}
                </h3>
                
                <p className="text-white/60 text-sm lg:text-base leading-relaxed max-w-sm mb-8">
                  {project.desc}
                </p>

                <div className="grid grid-cols-2 gap-8 py-8 border-t border-white/5">
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-white/30 mb-2">Timeline</span>
                    <span className="font-display text-xl text-white">2.5 Months</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-white/30 mb-2">Metrics</span>
                    <span className="font-display text-xl text-[#D4AF37]">70% Growth</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center font-display text-black text-sm">
                    {project.title[0]}
                  </div>
                  <div>
                    <span className="block text-white text-xs font-semibold">Project Lead</span>
                    <span className="block text-white/40 text-[10px]">RoyalFinity Team</span>
                  </div>
                </div>
                
                <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group hover:bg-white hover:text-black transition-all duration-500">
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
