"use client";

import { services, projects } from "@/data/site";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

const navSlugs = [
  { slug: "website-development",   label: "Website Development"       },
  { slug: "mobile-apps",           label: "Mobile Apps"               },
  { slug: "ui-ux-design",          label: "UI/UX Design"              },
  { slug: "digital-marketing",     label: "Digital Marketing"         },
  { slug: "software-erp-solution", label: "Software & ERP Solution"   },
  { slug: "business-automation",   label: "Business Automation"       },
];

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

const processSteps = [
  { n: "01", title: "Discovery", desc: "We dive deep into your business goals, target audience, and competitive landscape." },
  { n: "02", title: "Strategy", desc: "Craft a tailored roadmap with clear milestones and measurable outcomes." },
  { n: "03", title: "Design", desc: "Create stunning, user-centric designs that align with your brand identity." },
  { n: "04", title: "Development", desc: "Build with cutting-edge technology, ensuring performance and scalability." },
  { n: "05", title: "Testing", desc: "Rigorous QA to ensure flawless functionality across all devices and platforms." },
  { n: "06", title: "Launch", desc: "Deploy with confidence and provide ongoing support for continuous improvement." },
];

export function ServiceDetailClient({ serviceId }: { serviceId: string }) {
  const router = useRouter();

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
  }, [config?.folder]);

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
  }, [isLoaded, config?.folder]);

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

  const relatedProjects = projects.filter(p => 
    p.category.toLowerCase().includes(service.title.toLowerCase().split(' ')[0]) ||
    service.title.toLowerCase().includes(p.category.toLowerCase().split(' ')[0])
  ).slice(0, 3);

  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      {!isLoaded && (
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

      <Footer />
    </main>
  );
}
