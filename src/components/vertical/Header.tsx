"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Monogram } from "@/components/shared/Monogram";
import { WhatsAppIcon } from "@/components/shared/icons";
import { whatsappHref } from "@/lib/contact";
import { cn, EASE_OUT_EXPO } from "@/lib/cn";

export const navLinks = [
  { id: "a-propos", label: "À propos" },
  { id: "parcours", label: "Parcours" },
  { id: "expertise", label: "Expertise" },
  { id: "formation", label: "Formation" },
  { id: "contact", label: "Contact" },
];

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 80));

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="no-print fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6",
          scrolled ? "glass mx-3 shadow-soft xl:mx-auto" : "bg-transparent",
        )}
      >
        <a href="#accueil" aria-label="Retour en haut" className="text-3xl text-prune-950">
          <Monogram />
        </a>

        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={cn(
                    "relative px-3.5 py-2 text-sm font-medium transition-colors",
                    active === l.id ? "text-prune-950" : "text-prune-800/75 hover:text-prune-950",
                  )}
                >
                  {l.label}
                  {active === l.id ? (
                    <motion.span layoutId="nav-underline" className="bg-signature absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full" />
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-signature hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Me contacter
          </a>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-prune-950 md:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="paper fixed inset-0 -z-10 flex flex-col justify-center px-8"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          >
            <ul className="flex flex-col gap-3">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.06, duration: 0.6, ease: EASE_OUT_EXPO } }}
                >
                  <a href={`#${l.id}`} onClick={() => setOpen(false)} className="font-display text-5xl text-prune-950">
                    <span className="mr-3 font-sans text-sm text-amethyste-600">0{i + 2}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
