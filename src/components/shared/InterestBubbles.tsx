"use client";

import { motion } from "motion/react";
import { interests } from "@/data/cv";
import { cn } from "@/lib/cn";
import { interestIcons } from "./icons";

/** Centres d'intérêt : bulles qui flottent avec un léger décalage de phase. */
export function InterestBubbles({ className, size = "lg" }: { className?: string; size?: "lg" | "sm" }) {
  return (
    <ul className={cn("flex flex-wrap items-start justify-center gap-6 sm:gap-10", className)}>
      {interests.map((name, i) => {
        const Icon = interestIcons[name];
        return (
          <li key={name}>
            <motion.div
              className="group flex flex-col items-center gap-3"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.55 }}
            >
              <span
                className={cn(
                  "relative flex items-center justify-center overflow-hidden rounded-full bg-lavande-100 text-amethyste-600 shadow-card transition-all duration-500 group-hover:scale-110 group-hover:text-white",
                  size === "lg" ? "h-24 w-24 sm:h-28 sm:w-28" : "h-16 w-16",
                )}
              >
                <span aria-hidden className="bg-signature absolute inset-0 scale-0 rounded-full transition-transform duration-500 group-hover:scale-100" />
                <Icon className={cn("relative", size === "lg" ? "h-9 w-9" : "h-6 w-6")} />
              </span>
              <span className={cn("font-display font-semibold text-prune-950", size === "lg" ? "text-2xl" : "text-lg")}>{name}</span>
            </motion.div>
          </li>
        );
      })}
    </ul>
  );
}
