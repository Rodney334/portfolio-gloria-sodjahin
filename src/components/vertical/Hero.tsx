"use client";

import { motion } from "motion/react";
import { CalendarDays, FolderOpen, Handshake } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitText } from "@/components/motion/SplitText";
import { AuroraBackground } from "@/components/shared/AuroraBackground";
import { AvailabilityBadge } from "@/components/shared/AvailabilityBadge";
import { DiscoverButton, DownloadPdfButton } from "@/components/shared/Buttons";
import { PhotoArch } from "@/components/shared/PhotoArch";
import { identity } from "@/data/cv";
import { EASE_OUT_EXPO } from "@/lib/cn";

const floatingTags = [
  { icon: FolderOpen, label: "Gestion de dossiers", className: "-left-6 top-[18%] sm:-left-14", delay: 1.1 },
  { icon: CalendarDays, label: "Agenda de direction", className: "-right-4 top-[46%] sm:-right-12", delay: 1.3 },
  { icon: Handshake, label: "Relation client", className: "-left-2 bottom-[10%] sm:-left-10", delay: 1.5 },
];

export function Hero() {
  return (
    <section id="accueil" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28">
      <AuroraBackground />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}>
            <AvailabilityBadge />
          </motion.div>

          <h1 id="hero-title" className="mt-8">
            <motion.span
              className="text-signature block font-script text-[clamp(4rem,11vw,8.5rem)] leading-[0.9]"
              initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.75, duration: 1.2, ease: EASE_OUT_EXPO }}
            >
              {identity.firstName}
            </motion.span>
            <span className="-mt-1 block whitespace-nowrap font-display text-[clamp(3rem,8.4vw,7.25rem)] font-medium leading-[0.95] tracking-tight text-prune-950">
              <SplitText text={identity.lastName} delay={0.95} stagger={0.05} />
            </span>
          </h1>

          <motion.p
            className="mt-6 max-w-md text-[0.8rem] font-semibold uppercase tracking-[0.3em] text-amethyste-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            {identity.title}
          </motion.p>

          <p className="mt-5 max-w-lg font-display text-[clamp(1.6rem,3vw,2.3rem)] italic leading-snug text-prune-800">
            <SplitText text={identity.tagline} by="word" delay={1.45} stagger={0.07} />
          </p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.8, ease: EASE_OUT_EXPO }}
          >
            <Magnetic>
              <DiscoverButton />
            </Magnetic>
            <DownloadPdfButton />
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-[360px] lg:max-w-[400px]">
          <PhotoArch priority />
          {floatingTags.map(({ icon: Icon, label, className, delay }, i) => (
            <motion.div
              key={label}
              className={`glass absolute ${className} flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold text-prune-800 shadow-soft`}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay, duration: 0.8, ease: EASE_OUT_EXPO }}
            >
              <motion.span
                className="flex items-center gap-2"
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
              >
                <span className="bg-signature flex h-7 w-7 items-center justify-center rounded-full text-white">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                {label}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Indicateur de défilement */}
      <motion.a
        href="#a-propos"
        aria-label="Faire défiler vers la présentation"
        className="no-print absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-prune-800/70 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
      >
        <span className="flex h-10 w-6 justify-center rounded-full border-2 border-prune-800/30 pt-2">
          <motion.span
            className="bg-signature h-2 w-1 rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
