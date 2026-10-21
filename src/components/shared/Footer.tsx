import { ArrowUp } from "lucide-react";
import { identity } from "@/data/cv";
import { Monogram } from "./Monogram";
import { ModeSwitcher } from "./ModeSwitcher";

export function Footer({ topHref = "#accueil" }: { topHref?: string }) {
  return (
    <footer className="relative overflow-hidden bg-prune-950 px-5 pb-32 pt-20 text-nacre-50 sm:px-8">
      <span aria-hidden className="absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-amethyste-600/30 blur-[120px]" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 text-center">
        <Monogram className="text-6xl text-white" />
        <p className="max-w-md font-display text-3xl italic leading-snug text-lavande-100">{identity.tagline}</p>
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lavande-200/70">Choisir un mode de lecture</p>
          <ModeSwitcher inline />
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-lavande-200/80 sm:flex-row">
          <p>© 2026 Gloria SODJAHIN · {identity.location}</p>
          <a href={topHref} className="no-print inline-flex items-center gap-2 rounded-full px-4 py-2 transition-colors hover:bg-white/10 hover:text-white">
            Retour en haut
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
