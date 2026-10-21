"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { identity } from "@/data/cv";
import { cn, EASE_OUT_EXPO } from "@/lib/cn";

/**
 * Enveloppe qui s'ouvre à l'arrivée dans l'écran : le cachet saute, le rabat bascule,
 * puis la lettre signée de Gloria sort de l'enveloppe.
 */
export function Envelope({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.55 });
  const [flapOpen, setFlapOpen] = useState(false);

  return (
    <div ref={ref} className={cn("@container relative w-full pt-[34%]", className)} aria-hidden>
      <div className="relative aspect-[3/2] w-full [perspective:1400px]">
        {/* Intérieur */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#c9b3f6] to-[#e4d6fb] shadow-soft" />

        {/* Lettre */}
        <motion.div
          className="paper absolute inset-x-[7%] top-[5%] z-10 h-[90%] rounded-lg px-[6cqw] py-[5cqw] shadow-[0_10px_30px_-10px_rgb(31_10_51/0.25)]"
          initial={{ y: "0%" }}
          animate={{ y: flapOpen ? "-46%" : "0%" }}
          transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
        >
          <p className="font-sans text-[2.1cqw] font-semibold uppercase tracking-[0.3em] text-amethyste-600">À l&apos;attention du recruteur</p>
          <p className="mt-[2.4cqw] font-display text-[4.2cqw] leading-tight text-prune-950">
            Organisée, polyvalente et à l&apos;écoute, je serais ravie d&apos;échanger sur vos besoins.
          </p>
          <p className="mt-[1.6cqw] font-script text-[7.5cqw] leading-none text-signature">{identity.firstName}</p>
        </motion.div>

        {/* Poche avant */}
        <div
          className="absolute inset-0 z-20 rounded-2xl bg-gradient-to-br from-lavande-100 via-white to-rose-100"
          style={{ clipPath: "polygon(0 0, 50% 54%, 100% 0, 100% 100%, 0 100%)" }}
        />
        <div
          className="absolute inset-0 z-20 rounded-2xl bg-gradient-to-t from-rose-100/80 to-lavande-100/60"
          style={{ clipPath: "polygon(0 100%, 50% 50%, 100% 100%)" }}
        />

        {/* Rabat */}
        <motion.div
          className={cn("absolute inset-x-0 top-0 h-[58%] origin-top", flapOpen ? "z-0" : "z-30")}
          style={{ transformStyle: "preserve-3d" }}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: inView ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.35 }}
          onAnimationComplete={() => inView && setFlapOpen(true)}
        >
          <div className="bg-signature h-full w-full" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
        </motion.div>

        {/* Cachet de cire */}
        <motion.div
          className="absolute left-1/2 top-[50%] z-40 flex h-[15cqw] w-[15cqw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#f06ba8,#b0336f)] shadow-[0_6px_16px_-4px_rgb(176_51_111/0.6)]"
          initial={{ scale: 1, opacity: 1 }}
          animate={inView ? { scale: [1, 1.15, 0], opacity: [1, 1, 0], rotate: [0, -8, 20] } : {}}
          transition={{ duration: 0.45, ease: "easeIn" }}
        >
          <span className="font-display text-[6cqw] font-semibold italic text-white/90">GS</span>
        </motion.div>
      </div>
    </div>
  );
}
