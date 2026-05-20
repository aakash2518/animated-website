"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { faqs } from "@/data/site";
import image6 from "@/assets/6.webp";

export function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-item", {
        y: 40, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={ref} className="px-6 md:px-10 py-32 md:py-48 border-t border-border overflow-hidden">
      <div className="flex flex-col items-center text-center mb-16 md:mb-24 px-6">
        <p 
          className="font-mono uppercase tracking-[0.25em] text-[var(--bone)]/60 mb-6"
          style={{ fontSize: "clamp(0.65rem, 1.5vw, 0.8rem)" }}
        >
          (FAQ)
        </p>
        <h2 className="section-title tracking-tight leading-[1.1] max-w-4xl">
          Quick answers, <span className="italic text-[var(--ember)]">no fluff.</span>
        </h2>
      </div>
      <div className="grid grid-cols-12 gap-10 items-start">
        <div className="col-span-12 md:col-span-9 md:order-1">
          {faqs.map((f, i) => (
            <div key={i} className="faq-item border-t border-border last:border-b">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-baseline justify-between gap-6 py-6 md:py-8 text-left group"
                data-cursor
                style={{ padding: `clamp(1rem, 2.5vw, 1.5rem) 0` }}
              >
                <span 
                  className="font-display tracking-tight group-hover:text-[var(--ember)] transition-colors"
                  style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
                >
                  {f.q}
                </span>
                <span className="font-mono text-xs text-[var(--bone)]/60 shrink-0">
                  {open === i ? "—" : "+"}
                </span>
              </button>
              <div
                className="grid transition-all duration-500 ease-out"
                style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p 
                    className="pb-6 max-w-2xl text-[var(--bone)]/70"
                    style={{ fontSize: "clamp(0.85rem, 2vw, 1rem)" }}
                  >
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-12 md:col-span-3 md:order-2 flex justify-center md:block floating mt-12 md:mt-0">
          <Image 
            src={image6} 
            alt="FAQ Illustration" 
            className="w-full h-auto object-contain transition-all duration-700"
            style={{ width: "clamp(130px, 28vw, 300px)", height: "auto" }}
          />
        </div>
      </div>
    </section>
  );
}
