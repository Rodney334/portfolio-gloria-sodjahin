import { ArrowDown, Download } from "lucide-react";
import type { ReactNode } from "react";
import { pdfFileName, pdfHref, whatsappHref } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { WhatsAppIcon } from "./icons";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3.5 text-[0.95rem] font-semibold transition-[transform,box-shadow] duration-300 active:scale-[0.97]";

export function PrimaryButton({ href, children, className, external }: { href: string; children: ReactNode; className?: string; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(base, "bg-signature text-white shadow-soft hover:shadow-[0_24px_60px_-18px_rgb(217_70_143/0.55)]", className)}
    >
      <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative inline-flex items-center gap-2.5">{children}</span>
    </a>
  );
}

export function GhostButton({ href, children, className, download }: { href: string; children: ReactNode; className?: string; download?: string }) {
  return (
    <a
      href={href}
      download={download}
      className={cn(base, "border border-amethyste-400/50 bg-white/60 text-prune-800 backdrop-blur hover:border-amethyste-600 hover:bg-white", className)}
    >
      {children}
    </a>
  );
}

export function DownloadPdfButton({ className, label = "Télécharger mon CV" }: { className?: string; label?: string }) {
  return (
    <GhostButton href={pdfHref} download={pdfFileName} className={className}>
      <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
      {label}
    </GhostButton>
  );
}

export function WhatsAppButton({ className, label = "Écrire sur WhatsApp" }: { className?: string; label?: string }) {
  return (
    <PrimaryButton href={whatsappHref} external className={className}>
      <WhatsAppIcon className="h-5 w-5" />
      {label}
    </PrimaryButton>
  );
}

export function DiscoverButton({ href = "#parcours", className }: { href?: string; className?: string }) {
  return (
    <PrimaryButton href={href} className={className}>
      Découvrir mon parcours
      <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
    </PrimaryButton>
  );
}
