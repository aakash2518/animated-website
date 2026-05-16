"use client";

import { stats } from "@/data/site";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        y: 60, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="border-y border-border px-6 md:px-10 py-16 md:py-24">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 md:gap-10">
        {stats.map((s) => (
          <div key={s.label} className="stat-item">
            <div className="font-display text-[clamp(3rem,8vw,5rem)] tracking-tight text-[var(--ember)]">{s.n}</div>
            <div className="mt-2 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/60">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
