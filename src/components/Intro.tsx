"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-device-detect";

interface IntroProps {
  onComplete: () => void;
}

export function Intro({ onComplete }: IntroProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Prevent scroll during intro
  useEffect(() => {
    if (!hasMounted) return;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    };
  }, [hasMounted]);

  // Preload video
  useEffect(() => {
    if (hasMounted && videoRef.current) {
      videoRef.current.load();
    }
  }, [isMobile, hasMounted]);

  // Fallback: Auto-complete after 6 seconds if video doesn't end
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!videoError) {
        onComplete();
      }
    }, 6000);

    return () => clearTimeout(fallbackTimer);
  }, [onComplete, videoError]);

  const handleVideoEnd = () => {
    onComplete();
  };

  const handleVideoError = () => {
    console.error("Video failed to load");
    setVideoError(true);
    // Complete intro immediately on error
    setTimeout(onComplete, 1000);
  };

  const videoSource = hasMounted && isMobile ? "/assets/phone_intro.webm" : "/assets/intro.webm";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          scale: 1.05,
          transition: { 
            duration: 0.6, 
            ease: [0.76, 0, 0.24, 1] 
          }
        }}
        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
      >
        {/* Ambient Background Glow - static, no continuous animation */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-(--ember)/8 blur-[180px] rounded-full opacity-40"
          />
          <div 
            className="absolute top-1/4 right-1/4 w-[60vw] h-[60vw] bg-(--gold)/4 blur-[120px] rounded-full opacity-20"
          />
        </div>

        {/* Video Container */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <motion.video
            ref={videoRef}
            key={videoSource} // Force re-render when source changes
            autoPlay
            muted
            playsInline
            preload="auto"
            onLoadedData={() => {
              setIsVideoLoaded(true);
              setVideoError(false);
            }}
            onEnded={handleVideoEnd}
            onError={handleVideoError}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ 
              opacity: isVideoLoaded ? 1 : 0,
              scale: isVideoLoaded ? 1 : 1.05
            }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover"
          >
            <source src={videoSource} type="video/webm" />
            Your browser does not support the video tag.
          </motion.video>
          
          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-50" />
          </div>

          {/* Futuristic Corner Accents */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top Left */}
            <motion.div 
              className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[var(--ember)]/30"
              initial={{ opacity: 0, x: -20, y: -20 }}
              animate={{ opacity: 0.6, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            {/* Top Right */}
            <motion.div 
              className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[var(--ember)]/30"
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 0.6, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            {/* Bottom Left */}
            <motion.div 
              className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-[var(--ember)]/30"
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 0.6, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            {/* Bottom Right */}
            <motion.div 
              className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[var(--ember)]/30"
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={{ opacity: 0.6, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

        {/* Loading Indicator */}
        <AnimatePresence>
          {!isVideoLoaded && !videoError && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
            >
              {/* Futuristic Loading Bar */}
              <div className="relative w-64 md:w-80 h-[2px] bg-white/5 overflow-hidden rounded-full">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--ember)] to-transparent"
                  animate={{ 
                    x: ["-100%", "200%"],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
                {/* Glow effect */}
                <motion.div 
                  className="absolute inset-0 bg-[var(--ember)] blur-md opacity-50"
                  animate={{ 
                    x: ["-100%", "200%"],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              </div>

              {/* Loading Text */}
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-2"
              >
                <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/60">
                  {isMobile ? "Loading Mobile Experience" : "Initializing Experience"}
                </span>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 rounded-full bg-[var(--ember)]"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        delay: i * 0.2 
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Fallback */}
        {videoError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-2 border-[var(--ember)]/20 border-t-[var(--ember)] rounded-full mx-auto mb-4"
              />
              <p className="font-mono text-xs uppercase tracking-widest text-white/40">
                Loading...
              </p>
            </div>
          </motion.div>
        )}

        {/* Skip Button (appears after 3 seconds) */}
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          transition={{ delay: 3 }}
          onClick={onComplete}
          className="absolute top-8 right-8 md:top-12 md:right-12 z-30 px-4 py-2 border border-white/20 rounded-sm font-mono text-[9px] uppercase tracking-widest text-white/60 hover:text-white hover:border-[var(--ember)]/50 transition-all duration-300 backdrop-blur-sm bg-black/20"
        >
          Skip Intro →
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
