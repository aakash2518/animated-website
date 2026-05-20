"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import member1 from "@/assets/TEAM/aakash full stackdeveloper.webp";
import member2 from "@/assets/TEAM/chandan full stack.webp";
import member3 from "@/assets/TEAM/deeksha video editor.webp";
import member4 from "@/assets/TEAM/dhruv full stack developer.webp";
import member5 from "@/assets/TEAM/jatin AI video editor.webp";
import member6 from "@/assets/TEAM/monika graphic designer.webp";
import member7 from "@/assets/TEAM/trilok AI video developer.webp";
import leader1 from "@/assets/TEAM/bhumika gandhi_Co-Founder & CEO.webp";
import leader2 from "@/assets/TEAM/Lavish SachdevaCo-Founder & CTO.webp";

const teamMembers = [
  { name: "Bhumika Gandhi", role: "Co-Founder & CEO", image: leader1, isColoured: true },
  { name: "Lavish Sachdeva", role: "Co-Founder & CTO", image: leader2, isColoured: true },
  { name: "Aakash", role: "Full Stack Developer", image: member1 },
  { name: "Chandan", role: "Full Stack Developer", image: member2 },
  { name: "Dhruv", role: "Full Stack Developer", image: member4 },
  { name: "Deeksha", role: "Video Editor", image: member3 },
  { name: "Monika", role: "Graphic Designer", image: member6 },
  { name: "Trilok", role: "AI Video Developer", image: member7 },
  { name: "Jatin", role: "AI Video Editor", image: member5 },
];

export function Teams() {
  return (
    <section className="pt-24 md:pt-40 pb-24 px-6 md:px-12 lg:px-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title tracking-tighter text-[var(--bone)] mb-16 md:mb-24">
          Our Team
        </h2>

        {/* ── Mobile Layout (2 Columns) ── */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:hidden">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-[4/5] mb-4 overflow-hidden bg-[#0A0A0A] rounded-[24px] border border-white/5">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-all duration-700"
                />
              </div>
              <div className="space-y-1 text-center px-2">
                <h3 className="font-sans font-bold text-sm text-white truncate">
                  {member.name}
                </h3>
                <p className="font-mono text-[8px] uppercase tracking-wider text-[var(--gold)] line-clamp-1">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Desktop Layout (Existing) ── */}
        <div className="hidden md:block">
          {/* Founders Row */}
          <div className="grid grid-cols-2 gap-x-20 gap-y-24 mb-32 max-w-5xl mx-auto">
            {teamMembers.slice(0, 2).map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-[#0A0A0A] rounded-[40px]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="font-sans font-bold text-xl text-white">
                    {member.name}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--gold)]">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Golden Box Container for Team Members */}
          <div className="p-20 border border-[var(--gold)]/20 bg-white/[0.02] rounded-[40px] shadow-[0_0_50px_rgba(212,175,55,0.05)] relative overflow-hidden group">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-[var(--gold)]/5 blur-[100px] rounded-full pointer-events-none group-hover:translate-x-10 group-hover:translate-y-10 transition-transform duration-1000" />
            
            <div className="relative z-10">
              <div className="flex flex-wrap justify-center gap-x-12 gap-y-24 mb-24">
                {teamMembers.slice(2, 5).map((member, i) => (
                  <motion.div
                    key={i}
                    className="w-[calc(25%-2.25rem)] group/card"
                  >
                    <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-[#0A0A0A] rounded-[40px] border border-white/5 group-hover/card:border-[var(--gold)]/30 transition-colors duration-500">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover grayscale transition-all duration-700 group-hover/card:grayscale-0 group-hover/card:scale-105"
                      />
                    </div>
                    <div className="space-y-1 text-center">
                      <h3 className="font-sans font-bold text-lg text-white">
                        {member.name}
                      </h3>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                        {member.role}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-x-12 gap-y-24">
                {teamMembers.slice(5).map((member, i) => (
                  <motion.div
                    key={i}
                    className="w-[calc(25%-2.25rem)] group/card"
                  >
                    <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-[#0A0A0A] rounded-[40px] border border-white/5 group-hover/card:border-[var(--gold)]/30 transition-colors duration-500">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover grayscale transition-all duration-700 group-hover/card:grayscale-0 group-hover/card:scale-105"
                      />
                    </div>
                    <div className="space-y-1 text-center">
                      <h3 className="font-sans font-bold text-lg text-white">
                        {member.name}
                      </h3>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                        {member.role}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
