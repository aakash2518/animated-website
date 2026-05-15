"use client";

import { Nav } from "@/components/Nav";
import { Teams } from "@/components/Teams";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import teamImg from "@/assets/team.webp";
import Image from "next/image";

export default function TeamsPage() {
  return (
    <main className="min-h-screen bg-black">
      <Nav />
      
      {/* Hero Space */}
      <div className="h-[20vh] bg-black" />

      {/* Main Teams Component */}
      <Teams />

      {/* Join Section */}
      <section className="border-t border-white/5 bg-black py-40 px-6 md:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center justify-between">
          <div className="lg:max-w-md space-y-8">
            <h2 className="font-display text-5xl md:text-7xl tracking-tight text-white leading-none">
              Join our team
            </h2>
            <p className="text-white/40 font-mono text-xs uppercase tracking-widest leading-relaxed">
              We are always looking for visionary talent to join our collective.
            </p>
            <Link 
              href="/contact"
              className="inline-block px-10 py-3 border border-white/20 rounded-full font-mono text-[10px] uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all"
            >
              Apply Now
            </Link>
          </div>
          
          <div className="relative w-full lg:flex-1 aspect-video bg-[#0A0A0A] overflow-hidden group rounded-sm shadow-2xl">
            <Image 
              src={teamImg}
              alt="Team"
              fill
              className="object-contain transition-all duration-1000 group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
