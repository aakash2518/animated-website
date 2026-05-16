"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <Nav />
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--gold)]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--gold)] mb-8"
        >
          (Error 404)
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-7xl md:text-9xl tracking-tighter leading-none mb-12"
        >
          LOST IN <br />
          <span className="italic text-[var(--gold)]">SPACE.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-md text-white/40 text-sm md:text-base leading-relaxed mb-12"
        >
          The page you are looking for doesn&apos;t exist or has been moved to another coordinate in our digital galaxy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/"
            className="px-10 py-5 bg-white text-black font-mono text-[10px] uppercase tracking-[0.3em] rounded-full hover:bg-[var(--gold)] transition-all duration-500 shadow-2xl"
          >
            Return to Base →
          </Link>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
