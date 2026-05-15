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
  { name: "Jatin", role: "AI Video Editor", image: member5 },
  { name: "Trilok", role: "AI Video Developer", image: member7 },
  { name: "Monika", role: "Graphic Designer", image: member6 },
];

export function Teams() {
  return (
    <section className="pt-48 pb-24 px-6 md:px-12 lg:px-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-5xl md:text-7xl tracking-tighter text-[var(--bone)] mb-24">
          Our Team
        </h2>

        {/* Founders Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24 mb-32 max-w-5xl mx-auto">
          {teamMembers.slice(0, 2).map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-[#0A0A0A]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                />
              </div>

              <div className="space-y-1">
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

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-24">
          {teamMembers.slice(2).map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`group ${member.name === "Monika" ? "lg:col-start-2" : ""}`}
            >
              <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-[#0A0A0A]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>

              <div className="space-y-1">
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
    </section>
  );
}
