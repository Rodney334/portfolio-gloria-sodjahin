"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { identity } from "@/data/cv";
import { cn, EASE_OUT_EXPO } from "@/lib/cn";

/** Portrait dans une arche, entouré d'un anneau en dégradé qui tourne lentement. */
export function PhotoArch({ className, priority = false, sizes = "(min-width: 1024px) 420px, 80vw" }: { className?: string; priority?: boolean; sizes?: string }) {
  return (
    <div className={cn("relative aspect-[4/5] w-full", className)}>
      <div aria-hidden className="absolute -inset-[4px] overflow-hidden rounded-t-full rounded-b-[30px]">
        <div className="absolute left-1/2 top-1/2 aspect-square w-[170%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow bg-[conic-gradient(from_0deg,#7b3fe4,#f06ba8,#eee7fd,#a47cf3,#7b3fe4)]" />
      </div>
      <motion.div
        className="relative h-full overflow-hidden rounded-t-full rounded-b-[26px] bg-lavande-100"
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE_OUT_EXPO, delay: 0.3 }}
      >
        <Image
          src={identity.photo}
          alt="Portrait de Gloria Sodjahin"
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-[50%_25%]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-prune-950/25 via-transparent to-transparent" />
      </motion.div>
    </div>
  );
}
