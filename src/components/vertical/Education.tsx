"use client";

import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { education } from "@/data/cv";

export function Education() {
  const main = education.find((e) => e.main)!;
  const others = [...education.filter((e) => !e.main)].reverse();

  return (
    <section id="formation" aria-labelledby="formation-title" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionTitle id="formation-title" index="04" eyebrow="Formation" title="Mon" accent="cursus" />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="bg-signature relative overflow-hidden rounded-[var(--radius-card)] p-8 text-white shadow-soft sm:p-10">
              <GraduationCap className="h-10 w-10 opacity-90" />
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-white/80">{main.period}</p>
              <h3 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">{main.title}</h3>
              <p className="mt-3 text-lg text-white/90">{main.detail}</p>
              <p className="mt-6 inline-flex rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur">{main.school}</p>
              <span aria-hidden className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full border-[28px] border-white/10" />
            </div>
          </Reveal>

          <ol className="relative grid grid-cols-3 gap-4">
            <span aria-hidden className="absolute left-[16%] right-[16%] top-5 h-px bg-lavande-200" />
            <motion.span
              aria-hidden
              className="bg-signature absolute left-[16%] right-[16%] top-5 h-[2px] origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
            {others.map((e, i) => (
              <li key={e.title} className="relative flex flex-col items-center text-center">
                <motion.span
                  className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white font-display text-lg font-semibold text-amethyste-600 shadow-card ring-2 ring-lavande-200"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 1 }}
                  transition={{ delay: 0.3 + i * 0.45, type: "spring", stiffness: 380, damping: 16 }}
                >
                  {i + 1}
                </motion.span>
                <Reveal delay={0.4 + i * 0.45} className="mt-4">
                  <p className="font-display text-3xl font-semibold text-prune-950">{e.period}</p>
                  <p className="mt-1 font-semibold text-amethyste-600">{e.title}</p>
                  <p className="mt-1 text-sm text-prune-800/80">{e.school}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
