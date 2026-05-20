"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/site";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

gsap.registerPlugin(ScrollTrigger);

import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";

// Map service titles to their image paths
const serviceImages: Record<string, StaticImageData | string> = {
  "Website Development": img1,
  "Native Mobile Apps": img2,
  "Digital Marketing": img3,
  "Social Media Marketing": img4,
  "Search Engine Optimization": img1,
  "Google Ads (SEM / PPC)": img2,
};

// Map service numbers to slugs
const serviceToSlug: Record<string, string> = {
  "01": "website-development",
  "02": "mobile-apps",
  "03": "digital-marketing",
  "04": "social-media-marketing",
  "05": "seo",
  "06": "google-ads",
};

function ServiceCard({ service }: { service: typeof services[0] }) {
  const imageUrl = serviceImages[service.title];
  const slug = serviceToSlug[service.n];

  return (
    <Link
      href={`/services/${slug}`}
      className="shrink-0 w-[88vw] md:w-[65vw] lg:w-[50vw] group block snap-start"
      data-cursor
    >
      <div className="relative overflow-hidden bg-white/[0.03] border border-white/5 rounded-[32px] md:rounded-[40px] aspect-[0.75/1] md:aspect-[1.8/1] transition-all duration-700 hover:border-[var(--gold)]/30 hover:bg-white/[0.06]">
        {/* Number badge */}
        <div className="absolute top-8 left-8 font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 z-10">
          ({service.n})
        </div>

        {/* Content Grid */}
        <div className="relative z-10 h-full flex flex-col md:flex-row items-center p-8 md:p-14 gap-8 md:gap-10">
          {/* Text content */}
          <div className="flex-1 text-center md:text-left mt-8 md:mt-0">
            <h3
              className="font-display tracking-tighter mb-4 leading-[1.1] text-white"
              style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}
            >
              {service.title}
            </h3>

            <p
              className="text-white/40 leading-relaxed max-w-sm mx-auto md:mx-0"
              style={{ fontSize: "clamp(0.95rem, 3vw, 1.1rem)" }}
            >
              {service.tagline}
            </p>
          </div>

          {/* Image */}
          <div className="flex flex-1 items-center justify-center h-full w-full max-h-[180px] md:max-h-none">
            {imageUrl && (
              <div className="relative w-4/5 h-4/5 md:w-full md:h-full transform transition-all duration-700 group-hover:scale-105 group-hover:rotate-3">
                <Image
                  src={imageUrl}
                  alt={service.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-white/20 px-4">
        <span>{service.title}</span>
        <span className="text-[var(--gold)] group-hover:tracking-[0.4em] transition-all duration-500">Explore Solution →</span>
      </div>
    </Link>
  );
}

export function ServicesHorizontal() {
  const track = useRef<HTMLDivElement>(null);

  // Filter only the required services
  const filteredServices = services.filter(service =>
    [
      "Website Development",
      "Native Mobile Apps",
      "Digital Marketing",
      "Social Media Marketing",
      "Search Engine Optimization",
      "Google Ads (SEM / PPC)"
    ].includes(service.title)
  );

  return (
    <section id="services" className="relative py-24 md:py-32 bg-black overflow-hidden lg:px-16">
      <div className="px-5 md:px-10  mb-12 flex justify-between items-end font-mono uppercase tracking-[0.25em] text-[var(--bone)]/70" style={{ fontSize: "clamp(0.65rem, 1.5vw, 0.8rem)" }}>
        <div>
          <span className="block mb-2">(What we do)</span>
          <h2 className="section-title tracking-tight text-[var(--bone)]">Services</h2>
        </div>
        <span className="hidden md:block">↔ Scroll horizontally</span>
      </div>

      <div
        ref={track}
        className="flex items-start gap-8 md:gap-12 px-5 md:px-10  overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="shrink-0 w-full md:w-[45vw] lg:w-[35vw] snap-start pr-8 mb-12 md:mb-0 hidden  md:block self-start">
          <p className="font-display leading-[1.1] tracking-tight" style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>
            Struggling <span className="text-[var(--gold)] italic">to grow</span>
          </p>
          <p className="font-display leading-[1.1] tracking-tight mt-3 md:mt-4" style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>
            your business online?
          </p>
          <p className="font-display leading-[1.1] tracking-tight mt-6 md:mt-8" style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>
            <span className="text-[var(--gold)]">We fix that.</span>
          </p>
          <p
            className="mt-8 md:mt-10 max-w-md text-[var(--bone)]/60 leading-relaxed"
            style={{ fontSize: "clamp(0.875rem, 2.5vw, 1.05rem)" }}
          >
            Full-stack digital services engineered to move real metrics — from websites and apps to marketing and automation.
          </p>
        </div>

        {filteredServices.map((service) => (
          <div key={service.n} className="snap-start">
            <ServiceCard service={service} />
          </div>
        ))}

        {/* Spacer for end of scroll */}
        <div className="shrink-0 w-12 md:w-20 h-1" />
      </div>
    </section>
  );
}
