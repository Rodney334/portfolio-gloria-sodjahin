"use client";

import { motion } from "motion/react";
import type { Tool } from "@/data/cv";

/** Niveau qualitatif à 3 paliers (pas de pourcentage inventé). */
export function ToolLevel({ tool, active, compact = false }: { tool: Tool; active?: boolean; compact?: boolean }) {
  const trigger = (i: number) => {
    const shown = { scale: 1, opacity: 1, transition: { delay: 0.2 + i * 0.15, type: "spring" as const, stiffness: 400, damping: 18 } };
    return active !== undefined
      ? { animate: active ? shown : { scale: 0.3, opacity: 0.2 } }
      : { whileInView: shown, viewport: { once: true, amount: 0.8 } };
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className={compact ? "font-semibold text-prune-950" : "font-display text-2xl font-semibold text-prune-950"}>{tool.name}</p>
        <p className="text-xs font-medium text-prune-600/80">{tool.label}</p>
      </div>
      <div className="flex gap-1.5" role="img" aria-label={`${tool.name} : ${tool.label}, ${tool.level} sur 3`}>
        {[0, 1, 2].map((i) => (
          <span key={i} className="relative h-3 w-3 rounded-full bg-lavande-200">
            {i < tool.level ? (
              <motion.span data-reveal className="bg-signature absolute inset-0 rounded-full" initial={{ scale: 0.3, opacity: 0.2 }} {...trigger(i)} />
            ) : null}
          </span>
        ))}
      </div>
    </div>
  );
}
