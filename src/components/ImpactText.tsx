"use client";

import { motion } from "framer-motion";

export function ImpactText() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-black px-6 md:px-10 py-24">
      <div className="max-w-[1400px] w-full">
        <div className="space-y-12 md:space-y-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            viewport={{ once: true }}
          >
            <h2 
              className="font-display leading-[1.1] tracking-tighter text-white"
              style={{ fontSize: "clamp(1.8rem, 5vw, 4rem)" }}
            >
              We turn ideas into <br />
              <span className="text-[var(--gold)] italic">digital impact —</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-12"
          >
            <div className="max-w-2xl">
              <p 
                className="font-sans text-white/90 leading-[1.2] tracking-tight uppercase"
                style={{ fontSize: "clamp(1rem, 2.5vw, 1.8rem)" }}
              >
                from brand to product <br />
                to growth,
              </p>
              <p 
                className="font-mono text-[var(--gold)] mt-4 tracking-[0.2em] uppercase"
                style={{ fontSize: "clamp(0.6rem, 1vw, 0.8rem)" }}
              >
                one stack, one team, one outcome.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-1">
                <p className="font-mono text-[8px] uppercase tracking-widest text-white/30">( Philosophy )</p>
                <p 
                  className="font-display text-white italic"
                  style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}
                >
                  Understanding your business comes first.
                </p>
              </div>
              <div className="space-y-1">
                <p 
                  className="font-display text-[var(--gold)]"
                  style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}
                >
                  Results that last come second.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
