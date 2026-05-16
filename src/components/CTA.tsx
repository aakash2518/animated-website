"use client";

import Link from "next/link";

interface CTAProps {
  title?: React.ReactNode;
  subtitle?: string;
  linkText?: string;
  href?: string;
}

export function CTA({ 
  title = <>Ready to <span className="italic text-black/80">start?</span></>,
  subtitle = "Whether you’re starting small or scaling globally, our team is ready to support your journey.",
  linkText = "Let's build something great →",
  href = "/contact"
}: CTAProps) {
  return (
    <section className="px-6 md:px-10 py-12 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="py-16 md:py-20 text-center bg-gradient-to-br from-[var(--gold)] to-[#AA8B2E] rounded-[40px] border border-white/20 shadow-[0_20px_50px_rgba(212,175,55,0.3)] relative overflow-hidden group">
          {/* Decorative light effect */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/20 blur-[80px] rounded-full pointer-events-none group-hover:translate-x-12 group-hover:translate-y-12 transition-transform duration-1000" />
          
          <div className="max-w-3xl mx-auto px-6 md:px-10 relative z-10 space-y-8">
            <h2 className="font-display tracking-tighter text-black leading-tight" style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)" }}>
              {title}
            </h2>
            <p className="text-black/60 font-medium max-w-xl mx-auto" style={{ fontSize: "clamp(0.875rem, 2.5vw, 1.15rem)" }}>
              {subtitle}
            </p>
            <Link 
              href={href}
              className="inline-block px-10 py-4 bg-black text-[var(--gold)] font-mono text-[10px] uppercase tracking-[0.3em] hover:scale-105 transition-transform duration-500 rounded-full shadow-2xl"
            >
              {linkText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
