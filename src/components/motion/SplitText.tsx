"use client";

import { motion } from "motion/react";
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
  const words = text.split(" ");
  const offsets = words.map((_, i) =>
    words.slice(0, i).reduce((sum, w) => sum + (by === "char" ? w.length : 1), 0),
  );

  const piece = (content: string, index: number, key: string | number) => {
    const hidden = { y: "110%", opacity: 0 };
    const shown = {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.9, delay: delay + index * stagger, ease: EASE_OUT_EXPO },
    };
    const trigger =
      active !== undefined
        ? { animate: active ? shown : hidden }
        : { whileInView: shown, viewport: { once: true, amount: 0.5 } };
    return (
      <motion.span key={key} data-reveal className="inline-block will-change-transform" initial={hidden} {...trigger}>
        {content}
      </motion.span>
    );
  };

  return (
    <span className={cn("inline", className)} aria-label={text} role="text">
      {words.map((word, wi) => (
        <span key={wi} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          {by === "word"
            ? piece(word, offsets[wi], wi)
            : word.split("").map((char, ci) => piece(char, offsets[wi] + ci, ci))}
          {wi < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
