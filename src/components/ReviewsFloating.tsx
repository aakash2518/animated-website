"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Mansi Chopra",
    text: "Took SEO & Social Media services for my food business and saw a clear increase in orders and reach. Best marketing & website design company in Faridabad.",
    rating: 5,
    date: "1 week ago",
    x: "10%",
    y: "15%",
    duration: 5,
  },
  {
    name: "SHYAM DHANI BABA",
    text: "Really happy with the growth in my clothing business after their SEO & Social Media work. Truly the best marketing & website design company.",
    rating: 5,
    date: "1 week ago",
    x: "70%",
    y: "10%",
    duration: 7,
  },
  {
    name: "Deeksha Dubey",
    text: "Great experience working with RoyalFinity. Their team is professional and delivered exactly what was promised on time.",
    rating: 5,
    date: "1 month ago",
    x: "40%",
    y: "40%",
    duration: 6,
  },
  {
    name: "Rahul Sharma",
    text: "Exceptional service! They handled our branding and website development with such precision. Highly recommended for any tech needs.",
    rating: 5,
    date: "2 months ago",
    x: "80%",
    y: "60%",
    duration: 8,
  },
  {
    name: "Priya Varma",
    text: "The AI automation solutions they implemented for our CRM have saved us countless hours. A forward-thinking team indeed.",
    rating: 5,
    date: "3 months ago",
    x: "20%",
    y: "70%",
    duration: 6.5,
  },
  {
    name: "Amit Goel",
    text: "Professional, creative, and data-driven. They don't just build sites; they build businesses online. Best agency in the region.",
    rating: 5,
    date: "1 month ago",
    x: "55%",
    y: "80%",
    duration: 9,
  }
];

export function ReviewsFloating() {
  return (
    <section className="relative w-full h-[600px] md:h-[800px] bg-black overflow-hidden py-24 border-t border-white/5">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 px-6 md:px-10 mb-20">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] block mb-4">
          ( Customer Feedback )
        </span>
        <h2 className="font-display text-4xl md:text-7xl tracking-tighter text-white leading-[0.9]">
          TRUSTED BY <br /> <span className="italic text-[#D4AF37]">LOCAL LEADERS.</span>
        </h2>
      </div>

      <div className="absolute inset-0 mt-40 pointer-events-none md:pointer-events-auto">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: r.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: r.x,
              top: r.y,
            }}
            className="w-[280px] md:w-[320px] p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl group hover:border-[#D4AF37]/30 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col">
                <span className="font-display text-white text-sm tracking-tight">{r.name}</span>
                <span className="font-mono text-[9px] text-white/30 uppercase mt-1">{r.date}</span>
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, starIdx) => (
                  <Star 
                    key={starIdx} 
                    size={10} 
                    fill={starIdx < r.rating ? "#D4AF37" : "transparent"} 
                    className={starIdx < r.rating ? "text-[#D4AF37]" : "text-white/20"} 
                  />
                ))}
              </div>
            </div>
            <p className="text-[11px] leading-relaxed text-white/60 font-sans italic">
              &quot;{r.text}&quot;
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">G</div>
              <span className="text-[8px] uppercase tracking-widest text-white/40">Verified Google Review</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
