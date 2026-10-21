"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type StampProps = {
  children: ReactNode;
  rotate?: number;
  delay?: number;
  active?: boolean;
  className?: string;
  tone?: "violet" | "rose";
};

/** Effet « tampon administratif » : le tampon s'abat sur le papier avec un léger rebond. */
export function Stamp({ children, rotate = -6, delay = 0, active, className, tone = "violet" }: StampProps) {
  const hidden = { opacity: 0, scale: 1.9, rotate: rotate - 14 };
  const shown = {
    opacity: 1,
    scale: 1,
    rotate,
    transition: { type: "spring" as const, stiffness: 520, damping: 17, mass: 0.9, delay },
  };
  const trigger =
    active !== undefined
      ? { animate: active ? shown : hidden }
      : { whileInView: shown, viewport: { once: true, amount: 0.6 } };

  return (
    <motion.span
      data-reveal
      initial={hidden}
      {...trigger}
      className={cn(
        "relative inline-flex select-none items-center justify-center rounded-lg border-[3px] border-double px-4 py-2 text-center font-display text-lg font-semibold uppercase leading-tight tracking-[0.14em] mix-blend-multiply",
        tone === "violet"
          ? "border-amethyste-600/80 text-amethyste-600/90"
          : "border-orchidee-500/80 text-orchidee-500/90",
        className,
      )}
    >
      {children}
      {/* Encre irrégulière */}
      <span aria-hidden className="grain-layer absolute inset-0 rounded-[inherit] !opacity-15 mix-blend-screen" />
    </motion.span>
  );
}
