"use client";

import Link from "next/link";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { pdfFileName, pdfHref } from "@/lib/contact";
import { getEmail } from "@/lib/contact";
import { useHydrated } from "@/lib/useHydrated";

export function PrintToolbar() {
  return (
    <div className="no-print sticky top-0 z-50 flex flex-wrap items-center justify-center gap-3 border-b border-lavande-200 bg-white/80 px-4 py-3 backdrop-blur">
      <Link href="/" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-prune-800 hover:bg-lavande-100">
        <ArrowLeft className="h-4 w-4" /> Retour au portfolio
      </Link>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 rounded-full border border-amethyste-400/50 px-4 py-2 text-sm font-semibold text-prune-800 hover:border-amethyste-600"
      >
        <Printer className="h-4 w-4" /> Imprimer / Enregistrer en PDF
      </button>
      <a href={pdfHref} download={pdfFileName} className="bg-signature inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white">
        <Download className="h-4 w-4" /> Télécharger le PDF
      </a>
    </div>
  );
}

/** L'adresse e-mail n'est assemblée qu'au chargement (anti-spam), y compris dans le PDF généré. */
export function EmailLink({ className }: { className?: string }) {
  const hydrated = useHydrated();
  if (!hydrated) return <span className={className}>—</span>;
  const email = getEmail();
  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  );
}
