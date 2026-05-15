"use client";

import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import image6 from "@/assets/6.webp";
import image7 from "@/assets/7.webp";

const values = [
  { title: "Trust First", desc: "Building relationships based on honesty and transparency." },
  { title: "Innovation Everyday", desc: "Adopting the latest tools and ideas to stay ahead." },
  { title: "Client-Centric", desc: "Putting your goals at the center of everything we do." },
  { title: "Collaboration", desc: "Working as an extension of your team." },
  { title: "Simplicity", desc: "Making complex solutions easy to use and understand." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-[var(--bone)]">
      <Nav />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs uppercase tracking-widest text-[var(--gold)] mb-6"
          >
            (Our Story)
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-8xl tracking-tighter leading-none mb-12"
          >
            CREATING SOLUTIONS <br />
            THAT <span className="italic text-[var(--gold)]">MAKE A DIFFERENCE</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl text-lg md:text-xl text-white/60 leading-relaxed"
          >
            At Royalfinity Technologies, we do more than provide digital services—we create solutions that genuinely make a difference. With over a decade of hands-on experience, we’ve helped businesses across industries grow, innovate, and succeed in today’s fast-changing digital landscape.
          </motion.p>
        </div>
      </section>

      {/* Image & Mission Section */}
      <section className="py-20 px-6 md:px-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square overflow-visible floating"
          >
            <Image 
              src={image6} 
              alt="Technology" 
              fill 
              className="object-contain transition-all duration-1000"
            />
          </motion.div>
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="font-display text-4xl md:text-6xl tracking-tight">
                Empowering Businesses Through Technology
              </h2>
              <p className="text-white/50 leading-relaxed">
                Every project is approached with expertise, care, and a focus on results that truly matter. We started Royalfinity Technologies to solve challenges with creativity, clarity, and care.
              </p>
            </div>
            <div className="p-8 border border-white/5 bg-white/[0.02] rounded-2xl">
              <h3 className="font-display text-2xl text-[var(--gold)] mb-4">Our Mission</h3>
              <p className="text-white/70 italic">
                "To empower businesses with intelligent technology and carefully crafted strategies that drive measurable results, foster growth, and create lasting impact."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-32 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl mb-20 text-center tracking-tight">
            What <span className="italic text-[var(--gold)]">Drives Us</span> Forward
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-10 bg-white/[0.02] border border-white/5 rounded-sm hover:border-[var(--gold)]/30 transition-colors"
              >
                <span className="font-mono text-[10px] text-[var(--gold)]/40 mb-6 block">0{i+1}</span>
                <h4 className="font-display text-2xl mb-4 text-[var(--bone)]">{v.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6 md:px-20 relative overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none">
          <Image src={image7} alt="" fill className="object-cover blur-3xl scale-150" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-12">
          <h2 className="font-display text-5xl md:text-8xl tracking-tight leading-none">
            LET'S BUILD THE <br /> <span className="italic text-[var(--gold)]">FUTURE TOGETHER</span>
          </h2>
          <p className="text-white/60 text-lg">
            Whether you’re starting small or scaling globally, our team is ready to support your journey.
          </p>
          <a 
            href="/contact"
            className="inline-block px-12 py-5 bg-[var(--gold)] text-black font-mono text-xs uppercase tracking-[0.3em] hover:scale-105 transition-transform"
          >
            Get Started Now
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
