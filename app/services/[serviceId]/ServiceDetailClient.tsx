"use client";

import { services, serviceDetails } from "@/data/site";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const slugToId: Record<string, string> = {
  "website-development":    "01",
  "mobile-apps":            "02",
  "digital-marketing":      "03",
  "social-media-marketing": "04",
  "seo":                    "05",
  "google-ads":             "06",
  "content-marketing":      "07",
  "progressive-web-apps":   "08",
  "ui-ux-design":           "09",
  "software-erp-solution":  "10",
  "business-automation":    "11",
};

const serviceConfig: Record<string, { folder: string; frames: number; padding: number }> = {
  "01": { folder: "webdevelopment_service",       frames: 69,  padding: 2 },
  "02": { folder: "mobileapp_service",            frames: 192, padding: 3 },
  "03": { folder: "digitalmarketing_service",     frames: 88,  padding: 2 },
  "04": { folder: "digitalmarketing_service",     frames: 88,  padding: 2 },
  "05": { folder: "digitalmarketing_service",     frames: 88,  padding: 2 },
  "06": { folder: "digitalmarketing_service",     frames: 88,  padding: 2 },
  "07": { folder: "digitalmarketing_service",     frames: 88,  padding: 2 },
  "08": { folder: "mobileapp_service",            frames: 192, padding: 3 },
  "09": { folder: "UIUXdesign_service",           frames: 75,  padding: 2 },
  "10": { folder: "softwareandERPsystem_service", frames: 98,  padding: 2 },
  "11": { folder: "businessautomation_service",   frames: 104, padding: 3 },
};

export function ServiceDetailClient({ serviceId }: { serviceId: string }) {
  const id      = slugToId[serviceId];
  const service = services.find((s) => s.n === id);
  const config  = id ? serviceConfig[id] : null;

  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const framesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    if (!config) return;

    framesRef.current = [];
    setIsLoaded(false);
    setLoadProgress(0);
    let loaded = 0;

    for (let i = 0; i < config.frames; i++) {
      const img   = new Image();
      const pad   = String(i).padStart(config.padding, "0");
      img.src     = `/assets/${config.folder}/frame_${pad}_delay-0.041s.webp`;
      img.onload  = () => {
        loaded++;
        setLoadProgress((loaded / config.frames) * 100);
        if (loaded >= Math.min(20, config.frames)) setIsLoaded(true);
      };
      framesRef.current.push(img);
    }

    return () => { framesRef.current = []; };
  }, [config]);

  useEffect(() => {
    if (!isLoaded || !canvasRef.current || !containerRef.current || !config) return;

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const draw = (idx: number) => {
      const img = framesRef.current[idx];
      if (!img?.complete || !img.naturalWidth) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x     = (canvas.width  - img.width  * scale) / 2;
      const y     = (canvas.height - img.height * scale) / 2;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    draw(0);

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start:   "top top",
      end:     "+=300%",
      pin:     true,
      scrub:   0.3,
      onUpdate: (self) => {
        const idx = Math.min(
          Math.floor(self.progress * (config.frames - 1)),
          framesRef.current.length - 1,
        );
        draw(idx);
      },
    });

    return () => {
      st.kill();
      window.removeEventListener("resize", setSize);
    };
  }, [isLoaded, config]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!service || !config) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-6xl text-[var(--ember)]">404</h1>
          <p className="text-bone/60 mt-4">Service not found.</p>
          <Link
            href="/services"
            className="mt-8 inline-block px-6 py-3 border border-[var(--ember)]/30 text-[var(--ember)] font-mono text-xs uppercase tracking-widest hover:bg-[var(--ember)]/10 transition-all"
          >
            ← All Services
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      {mounted && !isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-2 border-[var(--ember)]/20 border-t-[var(--ember)] rounded-full mx-auto mb-6"
            />
            <p className="font-mono text-xs uppercase tracking-widest text-bone/60">
              Loading Experience
            </p>
            <div className="mt-4 w-48 h-1 bg-white/5 rounded-full overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-[var(--ember)]"
                style={{ width: `${loadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      )}

      <div ref={containerRef} className="h-screen w-full relative overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40 pointer-events-none" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        <div className="absolute inset-0 z-10 flex items-center px-6 md:px-20 pointer-events-none">
          <motion.div
            key={serviceId}
            className="max-w-4xl pt-24 md:pt-0"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-mono text-[10px] md:text-sm uppercase tracking-[0.3em] text-[var(--ember)]/80 mb-4"
            >
              ( Service / {service.n} )
            </motion.p>

            <h1 className="font-display text-[clamp(2.5rem,10vw,5rem)] md:text-[clamp(4rem,6vw,8rem)] leading-[0.95] tracking-tighter mb-6 md:mb-8">
              {service.title.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  className={i % 2 === 1 ? "italic text-[var(--ember)]" : ""}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start"
            >
              <p className="text-base md:text-xl text-bone/70 leading-relaxed max-w-md">
                {service.tagline}
              </p>

              <ul className="space-y-2 md:space-y-3 pointer-events-auto">
                {service.points.map((p, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                    className="flex gap-3 md:gap-4 group cursor-default"
                  >
                    <span className="text-[var(--ember)] shrink-0 transition-transform group-hover:translate-x-1">→</span>
                    <span className="text-sm md:text-base text-bone/60 group-hover:text-bone transition-colors">{p}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none animate-bounce"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-[var(--ember)] to-transparent" />
        </motion.div>
      </div>

      {/* Detailed Service Section */}
      {serviceDetails[id] && (
        <section className="bg-black py-32 px-6 md:px-20 overflow-hidden relative border-t border-white/5">
          {/* Subtle tech background elements */}
          <div className="absolute top-20 left-10 opacity-[0.05] pointer-events-none select-none font-mono text-[8px] space-y-1 text-white/40">
            <p>{"<html>"}</p>
            <p>{"<head>"}</p>
            <p>{"<title>"}</p>
          </div>
          <div className="absolute top-40 right-10 opacity-[0.05] pointer-events-none select-none font-mono text-[8px] space-y-1 text-right text-white/40">
            <p>{"function() {"}</p>
            <p>{"return true;"}</p>
            <p>{"}"}</p>
          </div>

          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
              <span className="font-mono text-[9px] md:text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">
                {serviceDetails[id].badge}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="font-display text-5xl md:text-7xl lg:text-8xl text-white tracking-tighter mb-8 leading-[0.9] uppercase"
            >
              {serviceDetails[id].title.split(" ").map((word, i) => {
                const isAccent = ["website", "mobile", "digital", "graphic", "software", "business"].includes(word.toLowerCase());
                return (
                  <span key={i} className={isAccent ? "text-[var(--gold)] italic" : ""}>
                    {word}{" "}
                  </span>
                );
              })}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-white/40 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-20 font-sans"
            >
              {serviceDetails[id].desc}
            </motion.p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {serviceDetails[id].features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 p-8 md:p-10 rounded-[32px] border border-white/5 hover:border-[var(--gold)]/30 hover:bg-white/[0.08] transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="text-4xl md:text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                      {feature.icon === "apple-logo" ? (
                        <svg viewBox="0 0 384 512" className="w-12 h-12 fill-white group-hover:fill-[var(--gold)] transition-colors">
                          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                        </svg>
                      ) : feature.icon === "android-logo" ? (
                        <svg viewBox="0 0 576 512" className="w-12 h-12 fill-white group-hover:fill-[var(--gold)] transition-colors">
                          <path d="M420.6 301.9c0-15-12.2-27.2-27.2-27.2s-27.2 12.2-27.2 27.2 12.2 27.2 27.2 27.2 27.2-12.2 27.2-27.2zm-265.1 0c0-15-12.2-27.2-27.2-27.2s-27.2 12.2-27.2 27.2 12.2 27.2 27.2 27.2 27.2-12.2 27.2-27.2zm314.4-114.6l33.3-57.6c2.4-4.1 .9-9.3-3.1-11.7-4.1-2.4-9.3-.9-11.7 3.1l-33.5 58.1c-30.5-23.9-69-38.3-111-38.3-42 0-80.5 14.4-111 38.3l-33.5-58.1c-2.4-4.1-7.6-5.5-11.7-3.1-4.1 2.4-5.5 7.6-3.1 11.7l33.3 57.6C110.3 224.2 44.3 304.5 44.3 399.1h487.3c0-94.6-65.9-174.9-155.3-207.8z" />
                        </svg>
                      ) : feature.icon === "cross-logo" ? (
                        <svg viewBox="0 0 448 512" className="w-12 h-12 fill-white group-hover:fill-[var(--gold)] transition-colors">
                          <path d="M448 341.6c0 6.6-4.2 12.4-10.4 14.3l-192 64c-3.1 1-6.1 1.5-9.1 1.5s-6.1-.5-9.1-1.5l-192-64C4.2 354 0 348.2 0 341.6V170.4c0-6.6 4.2-12.4 10.4-14.3l192-64c6.2-2.1 12.4-2.1 18.5 0l192 64c6.2 1.9 10.4 7.7 10.4 14.3v171.2zM224 133.1l-141.1 47 141.1 47 141.1-47-141.1-47z" />
                        </svg>
                      ) : feature.icon === "pwa-logo" ? (
                        <svg viewBox="0 0 512 512" className="w-12 h-12 fill-white group-hover:fill-[var(--gold)] transition-colors">
                          <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.1-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64h185.4c2.1 20.4 3.3 41.8 3.3 64zm28.8-64h123.1c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6 62.1 24.2 113.8 77.3 141.9 151.6zM320 256c0-22.6-1.2-43.9-3.4-64H195.4c-2.2 20.1-3.4 41.4-3.4 64s1.2 43.9 3.4 64h121.2c2.2-20.1 3.4-41.4 3.4-64zm-30.7-128c-12-44.7-28.7-81.2-46.7-104.1C224.7 1.5 208 38 196 82.7c-5.4 20-10.3 42.6-14 67.3h104.1c-3.7-24.7-8.6-47.3-14-67.3z" />
                        </svg>
                      ) : feature.icon}
                    </div>
                    <h4 className="font-display text-xl text-white mb-2">{feature.label}</h4>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">{feature.sub}</p>
                  </div>
                  
                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 bg-[var(--gold)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              ))}
            </div>

            {/* Why Choose Us Section */}
            <div className="mt-32 py-24 md:py-32 bg-white/[0.02] border-y border-white/5 -mx-6 md:-mx-20">
              <div className="max-w-6xl mx-auto px-6 md:px-10">
                <div className="mb-16 text-left">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] mb-4">(Value Proposition)</p>
                  <h2 className="font-display text-4xl md:text-6xl tracking-tighter text-white">Why Choose <span className="italic text-[var(--gold)]">Our Service?</span></h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {serviceDetails[id].whyChooseUs?.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="space-y-4 text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-[var(--gold)]/10 flex items-center justify-center font-mono text-xs text-[var(--gold)] border border-[var(--gold)]/20">
                        0{i + 1}
                      </div>
                      <h3 className="font-display text-2xl text-white tracking-tight">{item.title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Service Specific FAQ */}
            <div className="py-24 md:py-32">
              <div className="max-w-4xl mx-auto px-6 md:px-10">
                <div className="text-center mb-20">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] mb-4">(Questions)</p>
                  <h2 className="font-display text-4xl md:text-6xl tracking-tighter text-white">Service <span className="italic text-[var(--gold)]">FAQs</span></h2>
                </div>

                <div className="space-y-6">
                  {serviceDetails[id].faqs?.map((faq, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="group text-left"
                    >
                      <div className="p-8 rounded-[24px] bg-white/[0.03] border border-white/5 group-hover:border-[var(--gold)]/20 transition-all duration-500">
                        <h4 className="font-display text-xl text-white mb-4 flex items-center gap-4">
                          <span className="text-[var(--gold)] font-mono text-xs">Q.</span>
                          {faq.q}
                        </h4>
                        <p className="text-white/40 text-sm leading-relaxed pl-8 border-l border-[var(--gold)]/10">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <CTA />
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
