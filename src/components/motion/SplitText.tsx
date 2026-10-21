"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn, EASE_OUT_EXPO } from "@/lib/cn";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  by?: "char" | "word";
  active?: boolean;
};

/** Titre révélé lettre par lettre (ou mot par mot) derrière un masque. */
export function SplitText({ text, className, delay = 0, stagger = 0.035, by = "char", active }: SplitTextProps) {
  // La détection se fait sur le conteneur : les morceaux, masqués au départ, sont invisibles pour l'IntersectionObserver.
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const go = active ?? inView;

  const words = text.split(" ");
  const offsets = words.map((_, i) =>
    words.slice(0, i).reduce((sum, w) => sum + (by === "char" ? w.length : 1), 0),
  );

  const piece = (content: string, index: number, key: string | number) => (
    <motion.span
      key={key}
      data-reveal
      className="inline-block will-change-transform"
      initial={{ y: "110%", opacity: 0 }}
      animate={go ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
      transition={{ duration: 0.9, delay: go ? delay + index * stagger : 0, ease: EASE_OUT_EXPO }}
    >
      {content}
    </motion.span>
  );

  return (
    <span ref={ref} className={cn("inline", className)} aria-label={text} role="text">
      {words.map((word, wi) => (
        <span key={wi} aria-hidden className="inline-block overflow-hidden whitespace-nowrap pb-[0.12em] align-bottom">
          {by === "word"
            ? piece(word, offsets[wi], wi)
            : word.split("").map((char, ci) => piece(char, offsets[wi] + ci, ci))}
          {wi < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
