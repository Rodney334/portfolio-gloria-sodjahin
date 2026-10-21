"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, List, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { AuroraBackground } from "@/components/shared/AuroraBackground";
import { ModeSwitcher } from "@/components/shared/ModeSwitcher";
import { Monogram } from "@/components/shared/Monogram";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/lib/useHydrated";
import { playFlipSound } from "./flipSound";
import { BookNav, bookPages } from "./pages";

/** Format de conception d'une page (A5) : le livre entier est ensuite mis à l'échelle. */
const PAGE_W = 440;
const PAGE_H = 622;
const FLIP_MS = 900;

type Side = "left" | "right";

function Paper({ index, side, children }: { index: number; side: Side; children: ReactNode }) {
  const page = bookPages[index];
  const isCover = index === 0 || index === bookPages.length - 1;
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden",
        page.dark ? "bg-prune-950" : "paper",
        side === "right" ? "rounded-r-[6px]" : "rounded-l-[6px]",
      )}
    >
      {page.dark ? (
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgb(123_63_228/0.55),transparent_60%),radial-gradient(ellipse_at_80%_90%,rgb(217_70_143/0.35),transparent_55%)]" />
      ) : null}
      <div aria-hidden className="grain-layer absolute inset-0" />
      {/* Ombre de reliure côté intérieur */}
      {!isCover ? (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 z-20 w-12",
            side === "right" ? "left-0 bg-gradient-to-r from-prune-950/15 to-transparent" : "right-0 bg-gradient-to-l from-prune-950/15 to-transparent",
          )}
        />
      ) : null}
      {page.header ? (
        <p className="absolute inset-x-10 top-6 z-10 flex justify-between text-[9px] font-semibold uppercase tracking-[0.3em] text-prune-600/60">
          <span>Gloria Sodjahin</span>
          <span>{page.header}</span>
        </p>
      ) : null}
      <div className={cn("absolute inset-0 z-10", isCover ? "" : "px-10 pb-12 pt-14")}>{children}</div>
      {!isCover && index > 1 ? (
        <p className="absolute inset-x-0 bottom-5 z-10 text-center font-display text-[13px] text-prune-600/70">{index + 1}</p>
      ) : null}
    </div>
  );
}

function BlankBack() {
  return (
    <div className="paper relative h-full w-full overflow-hidden rounded-l-[6px]">
      <div aria-hidden className="grain-layer absolute inset-0" />
    </div>
  );
}

export function Book() {
  const spread = useMediaQuery("(min-width: 900px)");
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);
  const [flipped, setFlipped] = useState(0);
  const [moving, setMoving] = useState<{ leaf: number; forward: boolean; id: number }[]>([]);
  const [sound, setSound] = useState(false);
  const pointerStart = useRef<number | null>(null);

  const total = bookPages.length;
  const leaves = spread ? total / 2 : total;
  // En mode page simple, la dernière page reste affichée (elle n'est jamais tournée)
  const maxFlip = spread ? leaves : total - 1;

  // Mise à l'échelle du livre pour qu'il tienne dans l'espace disponible
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      const bookW = spread ? PAGE_W * 2 : PAGE_W;
      const s = Math.min((stage.clientWidth - 24) / bookW, (stage.clientHeight - 16) / PAGE_H);
      setScale(Math.max(0.3, Math.min(s, 1.35)));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [spread]);

  // Changement de mode (simple ↔ double page) : on conserve la page courante
  const [prevSpread, setPrevSpread] = useState(spread);
  if (prevSpread !== spread) {
    setPrevSpread(spread);
    setFlipped((f) => (spread ? Math.ceil(f / 2) : Math.max(0, f * 2 - 1)));
  }

  const flipTo = useCallback(
    (target: number, withSound = true) => {
      const t = Math.max(0, Math.min(maxFlip, target));
      if (t === flipped) return;
      const forward = t > flipped;
      const leaf = forward ? flipped : flipped - 1;
      const id = Date.now() + Math.random();
      setMoving((m) => [...m, { leaf, forward, id }]);
      setTimeout(() => setMoving((m) => m.filter((x) => x.id !== id)), FLIP_MS);
      setFlipped(forward ? flipped + 1 : flipped - 1);
      if (sound && withSound) playFlipSound();
    },
    [flipped, maxFlip, sound],
  );

  const next = useCallback(() => flipTo(flipped + 1), [flipTo, flipped]);
  const prev = useCallback(() => flipTo(flipped - 1), [flipTo, flipped]);

  // Saut vers une page (sommaire) : les pages défilent une à une
  const [jumpTarget, setJumpTarget] = useState<number | null>(null);
  const goToPage = useCallback(
    (index: number) => {
      const target = spread ? Math.ceil(index / 2) : index;
      if (target !== flipped) setJumpTarget(target);
    },
    [spread, flipped],
  );

  useEffect(() => {
    if (jumpTarget === null || jumpTarget === flipped) return;
    const step = jumpTarget > flipped ? flipped + 1 : flipped - 1;
    const timer = setTimeout(() => {
      flipTo(step, false);
      if (step === jumpTarget) setJumpTarget(null);
    }, 110);
    return () => clearTimeout(timer);
  }, [jumpTarget, flipped, flipTo]);

  // Clavier
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") flipTo(0);
      else if (e.key === "End") flipTo(maxFlip);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, flipTo, maxFlip]);

  // Glisser (tactile) ou clic sur une moitié de page
  function onPointerDown(e: PointerEvent) {
    pointerStart.current = e.clientX;
  }
  function onPointerUp(e: PointerEvent<HTMLDivElement>) {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (start === null) return;
    if ((e.target as HTMLElement).closest("a, button")) return;
    const dx = e.clientX - start;
    if (Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
      return;
    }
    if (flipped === 0) return next();
    if (flipped === maxFlip) return prev();
    const r = e.currentTarget.getBoundingClientRect();
    if (e.clientX > r.left + r.width / 2) next();
    else prev();
  }

  // Pages visibles (pour déclencher leurs animations)
  const visible = useMemo(() => {
    if (!spread) return new Set([flipped]);
    return new Set([2 * flipped - 1, 2 * flipped].filter((p) => p >= 0 && p < total));
  }, [spread, flipped, total]);

  const label = useMemo(() => {
    const nums = [...visible].sort((a, b) => a - b).map((p) => p + 1);
    return nums.length === 2 ? `Pages ${nums[0]}–${nums[1]}` : `Page ${nums[0]}`;
  }, [visible]);

  // Décalage pour centrer le livre fermé (couverture ou 4e de couverture)
  const shift = spread ? (flipped === 0 ? -PAGE_W / 2 : flipped === leaves ? PAGE_W / 2 : 0) : 0;

  const leafNodes = Array.from({ length: leaves }, (_, i) => {
    const isFlipped = i < flipped;
    const mv = moving.filter((m) => m.leaf === i).at(-1);
    const z = mv ? 3 * leaves + (mv.forward ? i : leaves - i) : isFlipped ? leaves + i : leaves - i;
    const frontIndex = spread ? 2 * i : i;
    const backIndex = spread ? 2 * i + 1 : null;

    const face = (index: number | null, side: Side) => {
      if (index === null) return <BlankBack />;
      const page = bookPages[index];
      const isVisible = visible.has(index);
      return (
        <div aria-label={`Page ${index + 1} : ${page.title}`} aria-hidden={!isVisible} inert={!isVisible} className="h-full w-full">
          <Paper index={index} side={side}>
            {page.render({ active: isVisible })}
          </Paper>
        </div>
      );
    };

    return (
      <div
        key={i}
        className="absolute top-0"
        style={{
          left: spread ? PAGE_W : 0,
          width: PAGE_W,
          height: PAGE_H,
          zIndex: z,
          visibility: !spread && isFlipped && !mv ? "hidden" : undefined,
          transformOrigin: "left center",
          transformStyle: "preserve-3d",
          transform: `rotateY(${isFlipped ? -180 : 0}deg)`,
          transition: `transform ${FLIP_MS}ms cubic-bezier(0.645, 0.045, 0.355, 1)`,
        }}
      >
        <div className="absolute inset-0 [backface-visibility:hidden]">
          {face(frontIndex, "right")}
          {mv ? <div key={mv.id} aria-hidden className="flip-shade pointer-events-none absolute inset-0 z-30 rounded-r-[6px]" /> : null}
        </div>
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {face(backIndex, "left")}
          {mv ? <div key={mv.id} aria-hidden className="flip-shade pointer-events-none absolute inset-0 z-30 rounded-l-[6px]" /> : null}
        </div>
      </div>
    );
  });

  return (
    <BookNav.Provider value={{ goToPage }}>
      <div className="relative flex h-[100svh] flex-col overflow-hidden">
        <AuroraBackground className="opacity-70" />

        <header className="relative z-10 flex items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" aria-label="Version verticale" className="text-3xl text-prune-950">
            <Monogram />
          </Link>
          <h1 className="font-display text-xl italic text-prune-800 sm:text-2xl">Le carnet de Gloria</h1>
          <Link href="/" className="rounded-full px-3 py-2 text-xs font-semibold text-prune-800 hover:bg-white/60">
            Version texte
          </Link>
        </header>

        <main id="contenu" className="relative z-10 flex min-h-0 flex-1 flex-col">
          <div
            ref={stageRef}
            className="relative flex min-h-0 flex-1 touch-pan-y select-none items-center justify-center"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            aria-roledescription="livre"
            aria-label={`Portfolio de Gloria Sodjahin, ${label} sur ${total}`}
          >
            <div style={{ width: (spread ? 2 : 1) * PAGE_W * scale, height: PAGE_H * scale }} className="relative">
              <div
                className="absolute left-0 top-0 origin-top-left"
                style={{ transform: `scale(${scale})`, width: (spread ? 2 : 1) * PAGE_W, height: PAGE_H }}
              >
                <div
                  className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.645,0.045,0.355,1)] [perspective:2600px]"
                  style={{ transform: `translateX(${shift}px)` }}
                >
                  {/* Ombre portée du livre */}
                  <div
                    aria-hidden
                    className="absolute -bottom-6 left-[6%] right-[6%] h-10 rounded-[50%] bg-prune-950/25 blur-2xl transition-all duration-700"
                    style={
                      spread && flipped === 0
                        ? { left: "52%", right: "4%" }
                        : spread && flipped === leaves
                          ? { left: "4%", right: "52%" }
                          : undefined
                    }
                  />
                  {leafNodes}
                </div>
              </div>
            </div>
          </div>

          {/* Commandes */}
          <div className="no-print relative z-10 mx-auto mb-24 mt-3 flex items-center gap-2 sm:gap-3">
            <button type="button" onClick={prev} disabled={flipped === 0} aria-label="Page précédente" className="glass flex h-11 w-11 items-center justify-center rounded-full text-prune-800 transition hover:text-amethyste-600 disabled:opacity-40">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => goToPage(3)} className="glass flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-prune-800 transition hover:text-amethyste-600">
              <List className="h-4 w-4" /> <span className="hidden sm:inline">Sommaire</span>
            </button>
            <p className="glass min-w-[9.5rem] rounded-full px-4 py-2.5 text-center text-sm font-semibold tabular-nums text-prune-800" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={label} className="inline-block" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -6, opacity: 0 }} transition={{ duration: 0.2 }}>
                  {label}
                </motion.span>
              </AnimatePresence>
              <span className="text-prune-600/60"> / {total}</span>
            </p>
            <button type="button" onClick={() => setSound((s) => !s)} aria-pressed={sound} aria-label={sound ? "Couper le son" : "Activer le son des pages"} className="glass flex h-11 w-11 items-center justify-center rounded-full text-prune-800 transition hover:text-amethyste-600">
              {sound ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
            <button type="button" onClick={next} disabled={flipped === maxFlip} aria-label="Page suivante" className="bg-signature flex h-11 w-11 items-center justify-center rounded-full text-white shadow-soft transition hover:scale-105 disabled:opacity-40">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </main>

        <ModeSwitcher />
      </div>
    </BookNav.Provider>
  );
}
