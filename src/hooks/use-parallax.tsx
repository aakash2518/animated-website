import { useScroll, useTransform, MotionValue } from "framer-motion";
import { RefObject } from "react";

export function useParallax(
  ref: RefObject<HTMLElement>,
  distance: number = 100
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return useTransform(scrollYProgress, [0, 1], [-distance, distance]);
}

export function useScrollOpacity(
  ref: RefObject<HTMLElement>
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
}

export function useScrollScale(
  ref: RefObject<HTMLElement>
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
}
