"use client";

import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import Image from "next/image";
import image6 from "@/assets/6.webp";

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
            className="font-display tracking-tighter leading-none mb-12"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            CREATING SOLUTIONS <br />
            THAT <span className="italic text-[var(--gold)]">MAKE A DIFFERENCE</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl text-white/60 leading-relaxed"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
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
              <h2 
                className="font-display tracking-tight"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}
              >
                Empowering Businesses Through Technology
              </h2>
              <p className="text-white/50 leading-relaxed">
                Every project is approached with expertise, care, and a focus on results that truly matter. We started Royalfinity Technologies to solve challenges with creativity, clarity, and care.
              </p>
            </div>
            <div className="p-8 border border-white/5 bg-white/[0.02] rounded-2xl">
              <h3 className="font-display text-2xl text-[var(--gold)] mb-4">Our Mission</h3>
              <p className="text-white/70 italic">
                &quot;To empower businesses with intelligent technology and carefully crafted strategies that drive measurable results, foster growth, and create lasting impact.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-32 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 
            className="mb-20 text-center tracking-tight font-display"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
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
      <CTA 
        title={<>Ready to <span className="italic text-black/80">start?</span></>}
        subtitle="Whether you’re starting small or scaling globally, our team is ready to support your journey."
        linkText="Let's build something great →"
      />

      <Footer />
    </main>
  );
}
