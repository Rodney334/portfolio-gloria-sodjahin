"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeftRight, ArrowUpDown, BookOpen, FileDown } from "lucide-react";
import { pdfFileName, pdfHref } from "@/lib/contact";
import { cn } from "@/lib/cn";

const modes = [
  { href: "/", label: "Vertical", icon: ArrowUpDown },
  { href: "/horizontal", label: "Horizontal", icon: ArrowLeftRight },
  { href: "/livre", label: "Livre", icon: BookOpen },
];

/** Pilule flottante pour passer d'un mode de lecture à l'autre. */
export function ModeSwitcher({ className, inline = false }: { className?: string; inline?: boolean }) {
  const pathname = (usePathname() ?? "/").replace(/\/$/, "") || "/";

  return (
    <nav
      aria-label="Mode de lecture"
      className={cn(
        "no-print z-50",
        !inline && "fixed bottom-5 left-1/2 -translate-x-1/2",
        className,
      )}
    >
      <ul className="glass flex items-center gap-1 rounded-full p-1.5 shadow-soft">
        {modes.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <li key={href} className="relative">
              {active ? (
                <motion.span
                  layoutId={inline ? "mode-pill-inline" : "mode-pill"}
                  className="absolute inset-0 rounded-full bg-signature"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              ) : null}
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors sm:px-4",
                  active ? "text-white" : "text-prune-800 hover:text-amethyste-600",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
                <span className="hidden sm:inline">{label}</span>
                <span className="sr-only sm:hidden">{label}</span>
              </Link>
            </li>
          );
        })}
        <li className="ml-0.5 border-l border-lavande-200 pl-1">
          <a
            href={pdfHref}
            download={pdfFileName}
            className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-prune-800 transition-colors hover:bg-white hover:text-orchidee-500 sm:px-4"
          >
            <FileDown className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">PDF</span>
            <span className="sr-only sm:hidden">Télécharger le CV en PDF</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
