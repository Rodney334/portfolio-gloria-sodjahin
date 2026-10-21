"use client";

import { motion, type Variants } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  y?: number;
  x?: number;
  /** Contrôle manuel (ex. page du livre visible). Sinon : déclenchement au scroll. */
  active?: boolean;
};

/** Apparition douce : fondu + translation + flou qui se dissipe. */
export function Reveal({ children, className, style, delay = 0, y = 24, x = 0, active }: RevealProps) {
  const hidden = { opacity: 0, y, x, filter: "blur(8px)" };
  const shown = {
    opacity: 1,
    y: 0,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay, ease: EASE_OUT_EXPO },
  };

  if (active !== undefined) {
    return (
      <motion.div data-reveal className={className} style={style} initial={hidden} animate={active ? shown : hidden}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      data-reveal
      className={className}
      style={style}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

const groupVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  active?: boolean;
  as?: "div" | "ul";
};

/** Conteneur qui révèle ses <StaggerItem> les uns après les autres. */
export function Stagger({ children, className, stagger = 0.08, delay = 0, active, as = "div" }: StaggerProps) {
  const variants = groupVariants(stagger, delay);
  const trigger =
    active !== undefined
      ? { animate: active ? "show" : "hidden" }
      : { whileInView: "show", viewport: { once: true, amount: 0.15 } };

  if (as === "ul") {
    return (
      <motion.ul className={className} variants={variants} initial="hidden" {...trigger}>
        {children}
      </motion.ul>
    );
  }
  return (
    <motion.div className={className} variants={variants} initial="hidden" {...trigger}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  if (as === "li") {
    return (
      <motion.li data-reveal className={className} variants={itemVariants}>
        {children}
      </motion.li>
    );
  }
  return (
    <motion.div data-reveal className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
