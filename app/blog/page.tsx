"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BlogPost {
  slug: string;
  img: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
}

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogPosts(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      // Reveal header
      gsap.from(".blog-header", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      });

      // Stagger reveal posts
      gsap.from(".blog-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".blog-grid",
          start: "top 85%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [loading]);

  return (
    <main ref={containerRef} className="relative pt-32 bg-black min-h-screen">
      {/* Header */}
      <section className="px-6 md:px-10 pb-20 blog-header">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--gold)]/60">(Insights & Articles)</p>
        <h1 className="mt-6 font-display text-[9vw] md:text-[6vw] leading-[0.85] tracking-[-0.04em] text-white">
          Our <span className="italic text-[var(--gold)]">Journal.</span>
        </h1>
        <p className="mt-8 max-w-xl text-[var(--bone)]/60 text-sm md:text-base leading-relaxed">
          Exploring the intersection of technology, design, and business growth. 
          Fresh perspectives from the RoyalFinity team.
        </p>
      </section>

      {/* Blog Grid */}
      <section className="px-6 md:px-10 pb-32 blog-grid">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
          {blogPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="blog-card group"
              data-cursor
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#0A0A0A] border border-white/5 transition-all duration-700 group-hover:border-[var(--gold)]/30">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full font-mono text-[8px] uppercase tracking-widest text-[var(--gold)]">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-widest text-white/40">
                  <span>{post.date}</span>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span>{post.readTime}</span>
                </div>
                
                <h2 className="font-display text-2xl md:text-3xl tracking-tight text-white group-hover:text-[var(--gold)] transition-colors duration-500">
                  {post.title}
                </h2>
                
                <p className="text-white/50 text-sm leading-relaxed max-w-md">
                  {post.excerpt}
                </p>

                <div className="pt-4 flex items-center gap-3 group/btn">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 group-hover/btn:text-[var(--gold)] transition-colors">Read Article</span>
                  <div className="w-8 h-px bg-white/10 group-hover/btn:w-12 group-hover/btn:bg-[var(--gold)] transition-all duration-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
