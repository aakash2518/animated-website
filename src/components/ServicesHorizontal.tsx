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
      className="shrink-0 w-[85vw] md:w-[50vw] lg:w-[45vw] group block"
      data-cursor
    >
      <div className="relative overflow-hidden bg-[#1a1a1a] border border-[var(--bone)]/10 rounded-3xl aspect-square md:aspect-[16/10] transition-all duration-700 hover:border-[var(--ember)]/30 hover:bg-[#1f1f1f]">
        {/* Number badge */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/40 z-10">
          {service.n}
        </div>

        {/* Content Grid - Left text, Right image */}
        <div className="relative z-10 h-full grid grid-cols-12 gap-6 p-8 md:p-10">
          {/* Left side - Text content */}
          <div className="col-span-12 md:col-span-7 flex flex-col justify-center">
            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl tracking-tight mb-4 leading-tight">
              {service.title}
            </h3>

            <p className="text-[var(--bone)]/70 text-sm md:text-base leading-relaxed max-w-md">
              {service.tagline}
            </p>
          </div>

          {/* Right side - Image */}
          <div className="col-span-12 md:col-span-5 flex items-center justify-center">
            {imageUrl && (
              <div className="relative w-full h-full">
                <Image 
                  src={imageUrl} 
                  alt={service.title}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/60">
        <span>{service.n}</span>
        <span className="text-[var(--ember)]/60 group-hover:text-[var(--ember)] transition-colors">View details →</span>
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
    <section id="services" className="relative py-24 md:py-32 bg-black overflow-hidden">
      <div className="px-6 md:px-10 mb-12 flex justify-between items-end font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--bone)]/70">
        <div>
          <span className="block mb-2">(What we do)</span>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight text-[var(--bone)]">Services</h2>
        </div>
        <span className="hidden md:block">↔ Scroll horizontally</span>
      </div>

      <div 
        ref={track} 
        className="flex items-center gap-8 md:gap-12 px-6 md:px-10 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="shrink-0 w-[80vw] md:w-[40vw] snap-start">
          <p className="font-display text-5xl md:text-7xl leading-[1.1] tracking-tight">
            Struggling <span className="text-[var(--ember)] italic">to grow</span>
          </p>
          <p className="font-display text-5xl md:text-7xl leading-[1.1] tracking-tight">
            your business online?
          </p>
          <p className="font-display text-5xl md:text-7xl leading-[1.1] tracking-tight mt-6">
            <span className="text-[var(--ember)]">We fix that.</span>
          </p>
          <p className="mt-8 max-w-md text-[var(--bone)]/60 text-sm md:text-base">
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
