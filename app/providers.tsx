"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Intro } from "@/components/Intro";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";

import { VisibilityContext } from "@/context/VisibilityContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

  // Check if intro has been shown in this session
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("intro-shown");
    if (hasSeenIntro === "true") {
      setShowIntro(false);
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("intro-shown", "true");
    setShowIntro(false);
    setIntroComplete(true);
  };

  return (
    <VisibilityContext.Provider value={{ isVisible: true }}>
      <div className="relative">
        {/* Intro Video */}
        <AnimatePresence mode="wait">
          {showIntro && (
            <Intro key="intro" onComplete={handleIntroComplete} />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className={!introComplete ? "invisible h-0 overflow-hidden" : ""}>
          <SmoothScroll />
          <Cursor />
          <Nav />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: introComplete ? 1 : 0 }}
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
