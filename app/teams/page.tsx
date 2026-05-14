"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import teamImg from "@/assets/team.webp";
import { Footer } from "@/components/Footer";

import logo from "@/assets/logo.png";

const teamMembers = [
  { name: "XYZ", role: "CEO" },
  { name: "XYZ", role: "PROJECT MANAGER" },
  { name: "XYZ", role: "ART DIRECTOR" },
  { name: "XYZ", role: "UI/UX DESIGNER" },
  { name: "XYZ", role: "WEB DEVELOPER" },
  { name: "XYZ", role: "UI DESIGNER" },
  { name: "XYZ", role: "WEB DEVELOPER" },
  { name: "XYZ", role: "UX DESIGNER" },
];

const openPositions = [
  "Marketing Manager",
  "UI Designer",
  "iOS Developer",
];

export default function TeamsPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-20">
      {/* Header */}
      <div className="px-6 md:px-20 py-12 flex items-center justify-between">
        <Link 
          href="/" 
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black hover:scale-110 transition-transform"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-display text-4xl md:text-6xl tracking-tighter">Our Team</h1>
        <div className="w-12" /> {/* Spacer */}
      </div>

      {/* Team Grid */}
      <section className="px-6 md:px-20 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-20">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="aspect-square overflow-hidden bg-white/[0.03] border border-white/5 mb-6 rounded-sm group-hover:bg-white/[0.08] transition-colors" />
              <h3 className="font-display text-lg md:text-xl mb-1">{member.name}</h3>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Join Section */}
      <section className="px-6 md:px-20 py-24 border-t border-white/10 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-12">
            <h2 className="font-display text-3xl md:text-5xl leading-tight">
              Innovate with us, explore opportunities
            </h2>
            <Link 
              href="/contact"
              className="inline-block px-8 py-3 border border-white rounded-full font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Apply Now
            </Link>
            <div className="space-y-6 pt-12">
              {openPositions.map((pos, i) => (
                <Link 
                  key={i}
                  href="/contact"
                  className="flex items-center gap-4 group"
                >
                  <span className="text-white/40 group-hover:text-white transition-colors">→</span>
                  <span className="font-display text-xl md:text-2xl group-hover:translate-x-2 transition-transform duration-300">
                    {pos}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="aspect-video overflow-hidden rounded-sm bg-white/5">
             <img 
              src={typeof teamImg === 'string' ? teamImg : teamImg.src} 
              alt="Team Office"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </section>

      {/* Large Footer Brand */}
      <div className="px-6 md:px-20 py-20 overflow-hidden flex flex-col items-center justify-center gap-4 md:flex-row md:gap-12">
        <h2 className="font-display text-[12vw] md:text-[12vw] leading-none tracking-tighter opacity-10 select-none uppercase">
          ROYALFINITY
        </h2>
        <div className="opacity-10 w-[15vw] md:w-[10vw]">
          <img 
            src={typeof logo === 'string' ? logo : logo.src} 
            alt="" 
            className="w-full h-auto grayscale brightness-200"
          />
        </div>
      </div>

      <Footer />
    </main>
  );
}
