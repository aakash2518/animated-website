"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShareButton } from "@/components/ShareButton";

interface BlogPost {
  slug: string;
  img: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content?: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: BlogPost) => p.slug === params.slug);
        setPost(found);
        setLoading(false);
      });
  }, [params.slug]);

  if (loading) return <div className="min-h-screen bg-black" />;
  if (!post) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Post not found</div>;

  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />
      
      <article className="pt-40 pb-32 px-6 md:px-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-[var(--gold)]">
            <span>{post.category}</span>
            <span>·</span>
            <span>{post.date}</span>
          </div>

          <h1 className="font-display text-4xl md:text-7xl tracking-tighter leading-tight">
            {post.title}
          </h1>

          {/* Share */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-white/30">
              <span>{post.readTime}</span>
            </div>
            <ShareButton title={post.title} />
          </div>

          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/10">
            <Image
              src={post.img}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="prose prose-invert prose-gold max-w-none">
            <p className="text-xl text-white/70 leading-relaxed italic mb-12">
              {post.excerpt}
            </p>
            <div className="text-white/60 leading-relaxed space-y-6">
              {/* Fallback content if none exists in JSON */}
              <p>
                At RoyalFinity Technologies, we believe that understanding the nuances of {post.category.toLowerCase()} is crucial for modern businesses. This article explores how {post.title.toLowerCase()} can impact your digital strategy.
              </p>
              <p>
                As we continue to innovate and push the boundaries of what&apos;s possible in the digital space, we remain committed to sharing our insights and expertise with our community. Stay tuned for more updates and deep dives into the latest industry trends.
              </p>
            </div>
          </div>
        </motion.div>
      </article>

      <Footer />
    </main>
  );
}
