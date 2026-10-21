"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { sectors } from "@/data/cv";
import { cn } from "@/lib/cn";

function Row({ reverse = false, outline = false }: { reverse?: boolean; outline?: boolean }) {
  const items = [...sectors, ...sectors];
  return (
    <div className="flex overflow-hidden" aria-hidden>
      <div className={cn("flex shrink-0 whitespace-nowrap", reverse ? "animate-marquee-reverse" : "animate-marquee")}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((s, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span
                  className={cn(
                    "px-6 font-display text-[clamp(2.6rem,7vw,6rem)] italic leading-tight",
                    outline ? "text-stroke" : "text-prune-950",
                  )}
                >
                  {s}
                </span>
                <span className="text-signature text-[clamp(1.4rem,3vw,2.4rem)]">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Bandeau défilant des secteurs ; il s'incline légèrement selon la vitesse du scroll. */
export function SectorsMarquee() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 60, damping: 30 });
  const skew = useTransform(smooth, [-2500, 0, 2500], [4, 0, -4]);

  return (
    <section aria-label={`Secteurs d'activité : ${sectors.join(", ")}`} className="relative overflow-hidden py-20">
      <motion.div style={{ skewY: skew }} className="flex flex-col gap-2 py-6">
        <Row />
        <Row reverse outline />
      </motion.div>
    </section>
  );
}
