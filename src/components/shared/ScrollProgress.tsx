"use client";

import { motion, useScroll, useSpring, type MotionValue } from "motion/react";

/** Fine barre de progression en dégradé, en haut de l'écran. */
export function ScrollProgress({ progress }: { progress?: MotionValue<number> }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(progress ?? scrollYProgress, { stiffness: 140, damping: 28 });
  return (
    <motion.div
      aria-hidden
      className="bg-signature no-print fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
      style={{ scaleX }}
    />
  );
}
