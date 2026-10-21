"use client";

import { Check, Copy, Mail, MapPin, Phone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { identity } from "@/data/cv";
import { getEmail, telHref, whatsappHref } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { useHydrated } from "@/lib/useHydrated";
import { WhatsAppIcon } from "./icons";

function Row({ icon, label, children, copy }: { icon: ReactNode; label: string; children: ReactNode; copy?: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    if (!copy) return;
    try {
      await navigator.clipboard.writeText(copy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* presse-papiers indisponible : on ignore */
    }
  }

  return (
    <li className="group flex items-center gap-4 rounded-2xl px-3 py-3 transition-colors hover:bg-lavande-100/70">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lavande-100 text-amethyste-600 transition-colors group-hover:bg-signature group-hover:text-white">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-prune-600/80">{label}</p>
        <div className="truncate text-[0.98rem] font-medium text-prune-950">{children}</div>
      </div>
      {copy ? (
        <button
          type="button"
          onClick={onCopy}
          className="no-print relative flex h-9 w-9 items-center justify-center rounded-full text-prune-600 transition hover:bg-white hover:text-amethyste-600"
          aria-label={`Copier : ${label}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span key="ok" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }}>
                <Check className="h-4 w-4 text-emerald-600" />
              </motion.span>
            ) : (
              <motion.span key="copy" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }}>
                <Copy className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
          <span role="status" className="sr-only">
            {copied ? "Copié" : ""}
          </span>
        </button>
      ) : null}
    </li>
  );
}

export function ContactLinks({ className }: { className?: string }) {
  const hydrated = useHydrated();
  const email = hydrated ? getEmail() : "";

  return (
    <ul className={cn("flex flex-col gap-1", className)}>
      <Row icon={<WhatsAppIcon className="h-5 w-5" />} label="WhatsApp">
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-amethyste-600">
          {identity.phones[0]}
        </a>
      </Row>
      <Row icon={<Mail className="h-5 w-5" />} label="E-mail" copy={email || undefined}>
        {email ? (
          <a href={`mailto:${email}`} className="hover:text-amethyste-600">
            {email}
          </a>
        ) : (
          <span className="text-prune-600">Activez JavaScript pour afficher l&apos;adresse</span>
        )}
      </Row>
      <Row icon={<Phone className="h-5 w-5" />} label="Téléphone">
        {identity.phones.map((p, i) => (
          <span key={p}>
            {i > 0 ? <span className="px-1.5 text-prune-600/50">/</span> : null}
            <a href={telHref(p)} className="hover:text-amethyste-600">
              {p.replace("+229 ", "")}
            </a>
          </span>
        ))}
      </Row>
      <Row icon={<MapPin className="h-5 w-5" />} label="Localisation">
        {identity.location}
      </Row>
    </ul>
  );
}
