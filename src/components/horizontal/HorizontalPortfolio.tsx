"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AuroraBackground } from "@/components/shared/AuroraBackground";
import { ModeSwitcher } from "@/components/shared/ModeSwitcher";
import { Monogram } from "@/components/shared/Monogram";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { cn } from "@/lib/cn";
import {
  chapters,
  ContactPanel,
  CoverPanel,
  EducationLanguagesPanel,
  ExpertisePanel,
  ParcoursPanel,
  ProfilePanel,
  QualitiesPanel,
  SectorsPanel,
} from "./Panels";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Grand écran + animations autorisées → piste épinglée pilotée par le scroll vertical. */
const PIN_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

export function HorizontalPortfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const progress = useMotionValue(0);
  const [chapter, setChapter] = useState(0);

  // Teinte de l'arrière-plan qui évolue au fil de la lecture : violet → rose → lavande
  const roseTint = useTransform(progress, [0, 0.45, 0.8], [0, 0.55, 0.15]);
  const lavenderTint = useTransform(progress, [0.55, 1], [0, 0.7]);

  const chapterOffsets = useCallback(() => {
    const track = trackRef.current;
    if (!track) return [];
    return Array.from(track.querySelectorAll<HTMLElement>("[data-chapter]")).map((el) => el.offsetLeft);
  }, []);

  const updateChapter = useCallback(
    (px: number) => {
      const offsets = chapterOffsets();
      let current = 0;
      offsets.forEach((o, i) => {
        if (o <= px + window.innerWidth * 0.5) current = i;
      });
      setChapter(current);
    },
    [chapterOffsets],
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(PIN_QUERY, () => {
        const track = trackRef.current!;
        const distance = () => track.scrollWidth - window.innerWidth;

        // Points d'aimantation : début de chaque chapitre ; zone libre dans le parcours.
        const snapTo = (value: number) => {
          const d = distance();
          const px = value * d;
          const free = track.querySelector<HTMLElement>("[data-free]");
          if (free) {
            const start = free.offsetLeft;
            const end = start + free.offsetWidth - window.innerWidth;
            if (px > start + 40 && px < end - 40) return value;
          }
          const points = chapterOffsets().map((o) => Math.min(o, d));
          if (free) points.push(free.offsetLeft + free.offsetWidth - window.innerWidth);
          const nearest = points.reduce((a, b) => (Math.abs(b - px) < Math.abs(a - px) ? b : a), points[0] ?? 0);
          return nearest / d;
        };

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: { snapTo, duration: { min: 0.25, max: 0.7 }, delay: 0.12, ease: "power2.inOut" },
            onUpdate: (self) => {
              progress.set(self.progress);
              const px = self.progress * distance();
              updateChapter(px);
              // Progression du fil du parcours (lue en CSS par le tracé SVG)
              const free = track.querySelector<HTMLElement>("[data-free]");
              if (free) {
                const local = (px + window.innerWidth * 0.7 - free.offsetLeft) / free.offsetWidth;
                track.style.setProperty("--route-progress", String(Math.min(1, Math.max(0, local))));
              }
            },
          },
        });
        stRef.current = tween.scrollTrigger ?? null;

        // Parallaxe : chaque couche glisse à sa propre vitesse pendant le défilement horizontal
        gsap.utils.toArray<HTMLElement>(".h-parallax").forEach((el) => {
          const speed = parseFloat(el.dataset.speed ?? "0.3");
          gsap.fromTo(
            el,
            { x: () => window.innerWidth * speed * 0.5 },
            {
              x: () => -window.innerWidth * speed * 0.5,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        });

        return () => {
          stRef.current = null;
          track.style.removeProperty("--route-progress");
        };
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  // Mode natif (mobile / animations réduites) : progression lue sur le conteneur qui défile
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onScroll = () => {
      if (stRef.current) return;
      const max = section.scrollWidth - section.clientWidth;
      progress.set(max > 0 ? section.scrollLeft / max : 0);
      updateChapter(section.scrollLeft);
    };
    // Avec une souris, la molette verticale fait avancer horizontalement
    const onWheel = (e: WheelEvent) => {
      if (stRef.current || !window.matchMedia("(pointer: fine)").matches) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      section.scrollLeft += e.deltaY;
    };
    section.addEventListener("scroll", onScroll, { passive: true });
    section.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      section.removeEventListener("scroll", onScroll);
      section.removeEventListener("wheel", onWheel);
    };
  }, [progress, updateChapter]);

  const goTo = useCallback(
    (index: number) => {
      const offsets = chapterOffsets();
      const i = Math.max(0, Math.min(offsets.length - 1, index));
      const st = stRef.current;
      if (st) {
        const target = st.start + Math.min(offsets[i], st.end - st.start);
        window.scrollTo({ top: target, behavior: "smooth" });
      } else {
        sectionRef.current?.scrollTo({ left: offsets[i], behavior: "smooth" });
      }
    },
    [chapterOffsets],
  );

  // Navigation clavier ← →
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable]")) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        goTo(chapter + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goTo(chapter - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chapter, goTo]);

  return (
    <div ref={rootRef} className="relative overflow-x-clip">
      <AuroraBackground fixed className="-z-10" />
      <motion.div aria-hidden style={{ opacity: roseTint }} className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_40%,#fce4ef,transparent_65%)]" />
      <motion.div aria-hidden style={{ opacity: lavenderTint }} className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_60%,#ddd0fb,transparent_65%)]" />

      <ScrollProgress progress={progress} />

      {/* Barre supérieure */}
      <header className="no-print fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" aria-label="Version verticale" className="text-3xl text-prune-950">
          <Monogram />
        </Link>
        <div className="glass flex items-center gap-3 rounded-full px-4 py-2 text-sm font-semibold text-prune-800">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={chapter}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="hidden sm:inline"
            >
              {chapters[chapter]?.label}
            </motion.span>
          </AnimatePresence>
          <span className="tabular-nums">
            <span className="text-signature">{String(chapter + 1).padStart(2, "0")}</span>
            <span className="text-prune-600/60"> / {String(chapters.length).padStart(2, "0")}</span>
          </span>
        </div>
      </header>

      <main id="contenu">
        <div
          ref={sectionRef}
          className="h-[100svh] w-full overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] pointer-coarse:snap-x pointer-coarse:snap-mandatory lg:motion-safe:overflow-hidden [&::-webkit-scrollbar]:hidden"
        >
          <div ref={trackRef} className="flex h-full w-max will-change-transform">
            <CoverPanel />
            <ProfilePanel />
            <ParcoursPanel />
            <ExpertisePanel />
            <SectorsPanel />
            <EducationLanguagesPanel />
            <QualitiesPanel />
            <ContactPanel />
          </div>
        </div>
      </main>

      {/* Points de chapitres */}
      <nav aria-label="Chapitres" className="no-print fixed bottom-7 left-6 z-50 hidden lg:block">
        <ul className="flex items-center gap-2">
          {chapters.map((c, i) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Aller au chapitre : ${c.label}`}
                aria-current={i === chapter ? "step" : undefined}
                className="group flex h-6 items-center"
              >
                <span
                  className={cn(
                    "block h-2 rounded-full transition-all duration-500",
                    i === chapter ? "bg-signature w-8" : "w-2 bg-prune-800/25 group-hover:bg-amethyste-400",
                  )}
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <p className="no-print fixed bottom-8 right-6 z-50 hidden text-xs font-medium text-prune-800/60 lg:block">
        Astuce : utilisez les flèches ← → du clavier
      </p>

      <ModeSwitcher />
    </div>
  );
}
