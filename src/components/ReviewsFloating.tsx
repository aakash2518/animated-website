"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Mansi Chopra",
    text: "Took SEO & Social Media services for my food business and saw a clear increase in orders and reach. Best marketing & website design company in Faridabad.",
    rating: 5,
    date: "1 week ago",
    x: "5%",
    y: "15%",
    delay: "0s",
  },
  {
    name: "SHYAM DHANI BABA",
    text: "Really happy with the growth in my clothing business after their SEO & Social Media work. Truly the best marketing & website design company.",
    rating: 5,
    date: "1 week ago",
    x: "62%",
    y: "8%",
    delay: "1.2s",
  },
  {
    name: "Deeksha Dubey",
    text: "Great experience working with RoyalFinity. Their team is professional and delivered exactly what was promised on time.",
    rating: 5,
    date: "1 month ago",
    x: "33%",
    y: "38%",
    delay: "0.6s",
  },
  {
    name: "Rahul Sharma",
    text: "Exceptional service! They handled our branding and website development with such precision. Highly recommended for any tech needs.",
    rating: 5,
    date: "2 months ago",
    x: "72%",
    y: "55%",
    delay: "1.8s",
  },
  {
    name: "Priya Varma",
    text: "The AI automation solutions they implemented for our CRM have saved us countless hours. A forward-thinking team indeed.",
    rating: 5,
    date: "3 months ago",
    x: "14%",
    y: "65%",
    delay: "0.9s",
  },
  {
    name: "Amit Goel",
    text: "Professional, creative, and data-driven. They don't just build sites; they build businesses online. Best agency in the region.",
    rating: 5,
    date: "1 month ago",
    x: "48%",
    y: "75%",
    delay: "1.5s",
  },
];

function ReviewCard({ r }: { r: typeof reviews[0] }) {
  return (
    <div className="flex justify-between items-start mb-4">
      <div className="flex flex-col">
        <span className="font-display text-white text-sm tracking-tight">{r.name}</span>
        <span className="font-mono text-[9px] text-white/30 uppercase mt-1">{r.date}</span>
      </div>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, s) => (
          <Star
            key={s}
            size={10}
            fill={s < r.rating ? "#D4AF37" : "transparent"}
            className={s < r.rating ? "text-[#D4AF37]" : "text-white/20"}
          />
        ))}
      </div>
    </div>
  );
}

export function ReviewsFloating() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "0px 0px -100px 0px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[600px] md:h-[800px] bg-black overflow-hidden pt-12 pb-24 border-t border-white/5"
    >
      {/* Glow */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/10 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 md:px-10 mb-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] block mb-4">
          ( Customer Feedback )
        </span>
        <h2 className="section-title tracking-tighter text-white leading-[0.9]">
          TRUSTED BY <br /> <span className="italic text-[#D4AF37]">LOCAL LEADERS.</span>
        </h2>
      </div>

      {/* Desktop floating cards — CSS animation, no JS loop */}
      <div className="absolute inset-0 mt-40 pointer-events-none md:pointer-events-auto">
        {reviews.map((r, i) => (
          <div
            key={i}
            className={`hidden md:block absolute w-[300px] p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl hover:border-[#D4AF37]/30 transition-colors transform-gpu review-float ${isInView ? "review-float-active" : "opacity-0"}`}
            style={{
              left: r.x,
              top: r.y,
              animationDelay: r.delay,
              animationPlayState: isInView ? "running" : "paused",
            }}
          >
            <ReviewCard r={r} />
            <p className="text-[11px] leading-relaxed text-white/60 font-sans italic">
              &quot;{r.text}&quot;
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">G</div>
              <span className="text-[8px] uppercase tracking-widest text-white/40">Verified Google Review</span>
            </div>
          </div>
        ))}

        {/* Mobile horizontal scroll */}
        <div className="flex md:hidden overflow-x-auto gap-6 px-6 pb-12 scrollbar-hide snap-x snap-mandatory pointer-events-auto">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="shrink-0 w-[85vw] snap-center p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl"
            >
              <ReviewCard r={r} />
              <p className="text-[11px] leading-relaxed text-white/60 font-sans italic">
                &quot;{r.text}&quot;
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">G</div>
                <span className="text-[8px] uppercase tracking-widest text-white/40">Verified Google Review</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
