"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ExperienceCard } from "@/components/shared/ExperienceCard";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { experiences } from "@/data/cv";
import { cn } from "@/lib/cn";

const RAZ_FIRST = experiences.findIndex((e) => e.id === "raz-2022");

export function Experiences() {
  const listRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="parcours" aria-labelledby="parcours-title" className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-36">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-lavande-100/60 to-transparent" />
      <div className="mx-auto max-w-6xl">
        <SectionTitle id="parcours-title" index="02" eyebrow="Expériences professionnelles" title="Mon" accent="parcours" />
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-prune-800">
            Plus de cinq ans au service de directions, de clients et d&apos;équipes, dans six secteurs différents.
          </p>
        </Reveal>

        <ol ref={listRef} className="relative mt-20">
          {/* Ligne de temps */}
          <span aria-hidden className="absolute bottom-0 left-5 top-0 w-px -translate-x-1/2 bg-lavande-200 md:left-1/2" />
          <motion.span
            aria-hidden
            className="bg-signature absolute bottom-0 left-5 top-0 w-[3px] origin-top -translate-x-1/2 rounded-full md:left-1/2"
            style={{ scaleY: lineProgress }}
          />

          {experiences.map((exp, i) => {
            const left = i % 2 === 0;
            return (
              <li
                key={exp.id}
                className={cn(
                  "relative pb-10 pl-14 md:w-1/2 md:pb-0 md:pl-0",
                  left ? "md:pr-16" : "md:ml-auto md:pl-16",
                  i > 0 && "md:-mt-24",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-5 top-9 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center",
                    left ? "md:left-auto md:right-0 md:translate-x-1/2" : "md:left-0",
                  )}
                >
                  <motion.span
                    className="bg-signature h-4 w-4 rounded-full ring-[6px] ring-nacre-50"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 1, margin: "0px 0px -35% 0px" }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  />
                </span>
                <Reveal x={left ? -40 : 40} y={10}>
                  <ExperienceCard
                    exp={exp}
                    returnNote={i === RAZ_FIRST ? "De retour en 2026" : undefined}
                  />
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
