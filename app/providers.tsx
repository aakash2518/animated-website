"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Intro } from "@/components/Intro";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { usePathname } from "next/navigation";
import { VisibilityContext } from "@/context/VisibilityContext";

// Lazy load non-critical UI — not needed on first paint
const FloatingSocial = dynamic(() => import("@/components/FloatingSocial").then(m => m.FloatingSocial), { ssr: false });
const Chatbot = dynamic(() => import("@/components/Chatbot").then(m => m.Chatbot), { ssr: false });

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin";
  const [showIntro, setShowIntro] = useState(!isAdmin);
  const [introComplete, setIntroComplete] = useState(isAdmin);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroComplete(true);
  };

  return (
    <VisibilityContext.Provider value={{ isVisible: introComplete }}>
      <div className="relative">
        {/* Intro Video */}
        <AnimatePresence mode="wait">
          {showIntro && (
            <Intro key="intro" onComplete={handleIntroComplete} />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className={!introComplete && !isAdmin ? "invisible h-0 overflow-hidden" : ""}>
          {!isAdmin && <SmoothScroll />}
          {!isAdmin && <Cursor />}
          {!isAdmin && <Nav />}
          {!isAdmin && <FloatingSocial />}
          {!isAdmin && <Chatbot />}
          <motion.div
            initial={isAdmin ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: (introComplete || isAdmin) ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </VisibilityContext.Provider>
  );
}
