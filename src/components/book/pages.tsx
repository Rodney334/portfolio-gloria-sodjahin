"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Download, MonitorSmartphone, Paperclip, RotateCcw } from "lucide-react";
import { createContext, useContext, type ReactNode } from "react";
import { Counter } from "@/components/motion/Counter";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Stamp } from "@/components/motion/Stamp";
import { ContactLinks } from "@/components/shared/ContactLinks";
import { ToolLevel } from "@/components/shared/ToolLevel";
import { channelIcons, interestIcons, sectorIcons, skillIcons, WhatsAppIcon } from "@/components/shared/icons";
import {
  education,
  experiences,
  identity,
  interests,
  languages,
  profile,
  qualities,
  sectors,
  skillGroups,
  stats,
  tools,
  type Experience,
} from "@/data/cv";
import { pdfFileName, pdfHref, whatsappHref } from "@/lib/contact";
import { formatDuration, formatPeriod, yearOf } from "@/lib/dates";
import { cn } from "@/lib/cn";

export type PageProps = { active: boolean };

export type BookPage = {
  title: string;
  header?: string;
  dark?: boolean;
  render: (p: PageProps) => ReactNode;
};

/** Permet aux pages (sommaire, 4e de couverture) de commander le livre. */
export const BookNav = createContext<{ goToPage: (index: number) => void }>({ goToPage: () => {} });

const roseGold = "linear-gradient(135deg,#f9d9e6 0%,#f5a3c7 30%,#fff1f7 50%,#d98bb5 70%,#f5c6d8 100%)";

function ChapterOpener({ numeral, title, accent, active, children }: { numeral: string; title: string; accent: string; active: boolean; children?: ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <Reveal active={active}>
        <p className="font-display text-[110px] font-semibold leading-none text-lavande-200">{numeral}</p>
      </Reveal>
      <Reveal active={active} delay={0.15}>
        <p className="eyebrow mt-2 !text-[10px]">Chapitre {numeral}</p>
        <h2 className="mt-2 font-display text-[44px] font-medium leading-[1.02] text-prune-950">
          {title} <em className="text-signature italic">{accent}</em>
        </h2>
      </Reveal>
      {children}
    </div>
  );
}

function ExperiencePage({ exp, active, note }: { exp: Experience; active: boolean; note?: string }) {
  return (
    <div className="relative flex h-full flex-col">
      <span aria-hidden className="text-stroke absolute -bottom-6 -right-4 font-display text-[110px] font-semibold leading-none opacity-70">
        {yearOf(exp.start)}
      </span>
      <Reveal active={active} className="relative">
        <span className="inline-flex rounded-full bg-lavande-100 px-3 py-1 text-[11px] font-semibold text-prune-800">
          {formatPeriod(exp.start, exp.end, true)}
        </span>
        <p className="mt-1.5 text-[11px] font-medium text-prune-600/80">{formatDuration(exp.start, exp.end)}</p>
        <h3 className="mt-5 font-display text-[32px] font-semibold leading-[1.05] text-prune-950">{exp.role}</h3>
        <p className="mt-2 text-[14px] font-semibold text-amethyste-600">
          {exp.company}
          {exp.companyDetail ? <span className="font-medium text-prune-600/80"> · {exp.companyDetail}</span> : null}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[10.5px] font-semibold text-[#9b2763]">{exp.sector}</span>
          {exp.badge ? (
            <span className="bg-signature inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold text-white">
              <RotateCcw className="h-2.5 w-2.5" /> {exp.badge}
            </span>
          ) : null}
          {note ? (
            <span className="rounded-full border border-dashed border-amethyste-400 px-2.5 py-0.5 text-[10.5px] font-semibold text-amethyste-600">{note}</span>
          ) : null}
        </div>
      </Reveal>
      <div className="my-5 h-px w-16 bg-signature" />
      <Stagger active={active} as="ul" delay={0.3} className="space-y-2.5">
        {exp.bullets.map((b) => (
          <StaggerItem as="li" key={b} className="flex gap-2.5 text-[13.5px] leading-[1.55] text-prune-800">
            <span aria-hidden className="bg-signature mt-[0.6em] h-1.5 w-1.5 shrink-0 rotate-45" />
            {b}
          </StaggerItem>
        ))}
      </Stagger>
      {exp.channels ? (
        <Reveal active={active} delay={0.8} className="mt-5 flex items-center gap-2">
          <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-prune-600/80">Canaux gérés</span>
          {exp.channels.map((c) => {
            const Icon = channelIcons[c];
            return (
              <span key={c} title={c} className="flex h-8 w-8 items-center justify-center rounded-full bg-lavande-100 text-amethyste-600">
                <Icon className="h-4 w-4" />
                <span className="sr-only">{c}</span>
              </span>
            );
          })}
        </Reveal>
      ) : null}
    </div>
  );
}

function TocList() {
  const { goToPage } = useContext(BookNav);
  const entries = [
    { label: "À propos", page: 4 },
    { label: "Chiffres clés", page: 5 },
    { label: "Parcours", page: 6 },
    { label: "Expertise", page: 12 },
    { label: "Outils & secteurs", page: 13 },
    { label: "Formation", page: 14 },
    { label: "Langues", page: 15 },
    { label: "Qualités", page: 16 },
    { label: "Centres d'intérêt", page: 17 },
    { label: "Contact", page: 18 },
  ];
  return (
    <ol className="mt-8 space-y-1">
      {entries.map((e, i) => (
        <li key={e.label}>
          <button
            type="button"
            onClick={() => goToPage(e.page)}
            className="group flex w-full items-baseline gap-2 rounded-md py-1.5 text-left transition-colors hover:text-amethyste-600"
          >
            <span className="w-6 text-[11px] font-semibold text-amethyste-400">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-display text-[19px] font-medium text-prune-950 group-hover:text-amethyste-600">{e.label}</span>
            <span aria-hidden className="mx-1 flex-1 border-b border-dotted border-prune-600/30" />
            <span className="font-display text-[16px] text-prune-600">{e.page + 1}</span>
          </button>
        </li>
      ))}
    </ol>
  );
}

function BackCover() {
  const { goToPage } = useContext(BookNav);
  return (
    <div className="flex h-full flex-col items-center justify-center px-12 text-center text-white">
      <p className="font-display text-[34px] italic leading-snug text-lavande-100">« {identity.tagline} »</p>
      <div className="my-8 h-px w-20 bg-white/30" />
      <a
        href={pdfHref}
        download={pdfFileName}
        className="bg-signature inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold text-white shadow-soft"
      >
        <Download className="h-4 w-4" /> Télécharger le PDF
      </a>
      <button type="button" onClick={() => goToPage(0)} className="mt-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-lavande-200 underline-offset-4 hover:underline">
        Relire depuis le début
      </button>
      <p className="absolute bottom-10 text-[10px] uppercase tracking-[0.35em] text-lavande-200/60">Gloria Sodjahin · 2026</p>
    </div>
  );
}

const [raz2026, popsfood, nsia, raz2022, ...shortOnes] = experiences;

export const bookPages: BookPage[] = [
  /* 1 · Couverture */
  {
    title: "Couverture",
    dark: true,
    render: ({ active }) => (
      <div className="relative flex h-full flex-col items-center justify-center text-center">
        <div aria-hidden className="absolute inset-5 rounded-[6px] border border-[#f5a3c7]/40" />
        <div aria-hidden className="absolute inset-7 rounded-[4px] border border-[#f5a3c7]/20" />
        <motion.span
          className="font-display text-[96px] font-semibold italic leading-none"
          style={{ backgroundImage: roseGold, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          GS
        </motion.span>
        <div className="my-6 h-px w-24" style={{ backgroundImage: roseGold }} />
        <p className="font-script text-[64px] leading-none text-rose-300">{identity.firstName}</p>
        <p className="mt-1 font-display text-[40px] font-medium tracking-[0.18em] text-white">{identity.lastName}</p>
        <p className="mt-5 text-[10.5px] font-semibold uppercase tracking-[0.32em] text-lavande-200">{identity.title}</p>
        <p className="absolute bottom-12 text-[10px] uppercase tracking-[0.4em] text-lavande-200/60">Portfolio · 2026</p>
      </div>
    ),
  },
  /* 2 · Intérieur de couverture */
  {
    title: "Garde",
    render: () => (
      <div aria-hidden className="absolute inset-0 -m-10 -mt-14 opacity-70">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="garde" width="44" height="44" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="44" height="44" fill="#f7f1fd" />
              <circle cx="22" cy="22" r="9" fill="none" stroke="#ddd0fb" strokeWidth="1" />
              <circle cx="0" cy="0" r="3" fill="#f5a3c7" opacity="0.5" />
              <circle cx="44" cy="44" r="3" fill="#f5a3c7" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#garde)" />
        </svg>
      </div>
    ),
  },
  /* 3 · Page de garde */
  {
    title: "Page de garde",
    render: ({ active }) => (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <Reveal active={active}>
          <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full ring-4 ring-lavande-100 ring-offset-4 ring-offset-[#fdf9f4]">
            <Image src={identity.photo} alt="Portrait de Gloria Sodjahin" fill sizes="128px" className="object-cover object-[50%_25%]" />
          </div>
        </Reveal>
        <Reveal active={active} delay={0.2}>
          <p className="mt-10 font-display text-[30px] italic leading-snug text-prune-950">« {identity.tagline} »</p>
          <p className="mt-6 font-script text-[40px] text-signature">{identity.firstName}</p>
        </Reveal>
      </div>
    ),
  },
  /* 4 · Sommaire */
  {
    title: "Sommaire",
    header: "Sommaire",
    render: ({ active }) => (
      <div>
        <Reveal active={active}>
          <h2 className="font-display text-[46px] font-medium leading-none text-prune-950">
            <em className="text-signature italic">Sommaire</em>
          </h2>
        </Reveal>
        <Reveal active={active} delay={0.2}>
          <TocList />
        </Reveal>
      </div>
    ),
  },
  /* 5 · À propos */
  {
    title: "Chapitre I : À propos",
    header: "I · À propos",
    render: ({ active }) => (
      <div className="flex h-full flex-col">
        <Reveal active={active}>
          <p className="eyebrow !text-[10px]">Chapitre I</p>
          <h2 className="mt-2 font-display text-[40px] font-medium leading-none text-prune-950">
            Qui <em className="text-signature italic">suis-je</em>
          </h2>
        </Reveal>
        <Reveal active={active} delay={0.15} className="mt-6 flex gap-5">
          <div className="relative h-[150px] w-[120px] shrink-0 overflow-hidden rounded-t-full rounded-b-2xl ring-2 ring-amethyste-400/50 ring-offset-2 ring-offset-[#fdf9f4]">
            <Image src={identity.photo} alt="" fill sizes="120px" className="object-cover object-[50%_25%]" />
          </div>
          <div className="flex flex-col justify-end">
            <p className="font-script text-[40px] leading-none text-signature">{identity.firstName}</p>
            <p className="font-display text-[22px] font-semibold tracking-[0.12em] text-prune-950">{identity.lastName}</p>
            <p className="mt-1 text-[11px] font-medium text-prune-600">{identity.location}</p>
          </div>
        </Reveal>
        <Reveal active={active} delay={0.3}>
          <p className="mt-7 font-display text-[19px] leading-[1.45] text-prune-950 first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-[58px] first-letter:leading-[0.8] first-letter:text-amethyste-600">
            {profile}
          </p>
        </Reveal>
      </div>
    ),
  },
  /* 6 · Chiffres clés */
  {
    title: "Chiffres clés",
    header: "I · À propos",
    render: ({ active }) => (
      <div className="flex h-full flex-col">
        <Reveal active={active}>
          <h2 className="font-display text-[38px] font-medium leading-none text-prune-950">
            En <em className="text-signature italic">chiffres</em>
          </h2>
          <p className="mt-3 text-[12.5px] text-prune-800">Mon parcours, résumé en quatre repères.</p>
        </Reveal>
        <div className="mt-8 grid flex-1 grid-cols-2 gap-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} active={active} delay={0.15 + i * 0.1} className="flex flex-col justify-end rounded-2xl border border-lavande-200 bg-white/80 p-5">
              <Counter active={active} value={s.value} suffix={s.suffix} className="text-signature font-display text-[62px] font-semibold leading-none" />
              <p className="mt-2 text-[12px] font-medium text-prune-800">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    ),
  },
  /* 7 · Parcours (ouverture) */
  {
    title: "Chapitre II : Parcours",
    header: "II · Parcours",
    render: ({ active }) => (
      <ChapterOpener numeral="II" title="Mon" accent="parcours" active={active}>
        <div className="relative mt-auto">
          <div className="absolute left-2 right-2 top-[7px] h-px bg-lavande-200" />
          <motion.div
            className="bg-signature absolute left-2 right-2 top-[6px] h-[3px] origin-left rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: active ? 1 : 0 }}
            transition={{ duration: 1.6, delay: 0.4, ease: "easeInOut" }}
          />
          <ol className="relative flex justify-between">
            {[...experiences].reverse().map((e, i) => (
              <li key={e.id} className="flex flex-col items-center">
                <motion.span
                  className="h-4 w-4 rounded-full bg-white ring-[3px] ring-amethyste-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: active ? 1 : 0 }}
                  transition={{ delay: 0.5 + i * 0.18, type: "spring", stiffness: 400, damping: 15 }}
                />
                <span className="mt-2 text-[10px] font-semibold text-prune-600">{yearOf(e.start)}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-[12.5px] leading-relaxed text-prune-800">
            Sept postes et six secteurs : de la saisie de données à l&apos;assistanat de direction.
          </p>
        </div>
      </ChapterOpener>
    ),
  },
  { title: `${raz2026.company}, 2026`, header: "II · Parcours", render: ({ active }) => <ExperiencePage exp={raz2026} active={active} /> },
  { title: popsfood.company, header: "II · Parcours", render: ({ active }) => <ExperiencePage exp={popsfood} active={active} /> },
  { title: nsia.company, header: "II · Parcours", render: ({ active }) => <ExperiencePage exp={nsia} active={active} /> },
  { title: `${raz2022.company}, 2022`, header: "II · Parcours", render: ({ active }) => <ExperiencePage exp={raz2022} active={active} note="De retour en 2026" /> },
  /* 12 · Premières expériences */
  {
    title: "Premières expériences",
    header: "II · Parcours",
    render: ({ active }) => (
      <div>
        <Reveal active={active}>
          <h3 className="font-display text-[30px] font-medium leading-none text-prune-950">
            Premières <em className="text-signature italic">expériences</em>
          </h3>
        </Reveal>
        <div className="mt-6 space-y-4">
          {shortOnes.map((e, i) => (
            <Reveal key={e.id} active={active} delay={0.15 + i * 0.15} className="relative rounded-xl border border-lavande-200 bg-white/70 p-4 pl-5">
              <Paperclip aria-hidden className="absolute -top-2 right-4 h-5 w-5 rotate-12 text-amethyste-400" />
              <p className="text-[10.5px] font-semibold text-prune-600">{formatPeriod(e.start, e.end)}</p>
              <p className="mt-1 font-display text-[22px] font-semibold leading-tight text-prune-950">{e.role}</p>
              <p className="text-[12.5px] font-semibold text-amethyste-600">
                {e.company}
                {e.companyDetail ? <span className="font-medium text-prune-600/80"> · {e.companyDetail}</span> : null}
              </p>
              <p className="mt-1.5 text-[12.5px] leading-snug text-prune-800">{e.bullets[0]}</p>
            </Reveal>
          ))}
        </div>
      </div>
    ),
  },
  /* 13 · Expertise */
  {
    title: "Chapitre III : Expertise",
    header: "III · Expertise",
    render: ({ active }) => (
      <div>
        <Reveal active={active}>
          <p className="eyebrow !text-[10px]">Chapitre III</p>
          <h2 className="mt-2 font-display text-[40px] font-medium leading-none text-prune-950">
            Mon <em className="text-signature italic">expertise</em>
          </h2>
        </Reveal>
        <div className="mt-6 space-y-3">
          {skillGroups.map((g, i) => {
            const Icon = skillIcons[g.id];
            return (
              <Reveal key={g.id} active={active} delay={0.15 + i * 0.12} className={cn("rounded-2xl p-4", i === 0 ? "bg-prune-950 text-white" : "border border-lavande-200 bg-white/80")}>
                <p className="flex items-center gap-2.5 font-display text-[21px] font-semibold leading-tight">
                  <span className={cn("flex h-8 w-8 items-center justify-center rounded-xl", i === 0 ? "bg-signature" : "bg-lavande-100 text-amethyste-600")}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className={i === 0 ? "" : "text-prune-950"}>{g.title}</span>
                </p>
                <ul className="mt-2 space-y-1">
                  {g.skills.map((s) => (
                    <li key={s} className={cn("flex gap-2 text-[12px] leading-snug", i === 0 ? "text-lavande-100" : "text-prune-800")}>
                      <span aria-hidden className={cn("mt-[0.5em] h-1 w-1 shrink-0 rounded-full", i === 0 ? "bg-rose-300" : "bg-amethyste-600")} />
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    ),
  },
  /* 14 · Outils & secteurs */
  {
    title: "Outils et secteurs",
    header: "III · Expertise",
    render: ({ active }) => (
      <div>
        <Reveal active={active}>
          <h3 className="flex items-center gap-2 font-display text-[28px] font-medium text-prune-950">
            <MonitorSmartphone className="h-6 w-6 text-amethyste-600" /> Outils bureautiques
          </h3>
        </Reveal>
        <div className="mt-4 space-y-2.5">
          {tools.map((t, i) => (
            <Reveal key={t.name} active={active} delay={0.1 + i * 0.1} className="rounded-xl bg-white/80 px-4 py-2.5 ring-1 ring-lavande-200">
              <ToolLevel tool={t} active={active} compact />
            </Reveal>
          ))}
        </div>
        <Reveal active={active} delay={0.4}>
          <h3 className="mt-8 font-display text-[28px] font-medium text-prune-950">
            Six <em className="text-signature italic">secteurs</em>
          </h3>
        </Reveal>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {sectors.map((s, i) => {
            const Icon = sectorIcons[s];
            return (
              <Reveal key={s} active={active} delay={0.5 + i * 0.07} className="flex items-center gap-2.5 rounded-full border border-lavande-200 bg-white/70 py-1.5 pl-1.5 pr-3">
                <span className="bg-signature flex h-8 w-8 items-center justify-center rounded-full text-white">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-[13px] font-semibold text-prune-950">{s}</span>
              </Reveal>
            );
          })}
        </div>
      </div>
    ),
  },
  /* 15 · Formation */
  {
    title: "Chapitre IV : Formation",
    header: "IV · Formation",
    render: ({ active }) => (
      <div>
        <Reveal active={active}>
          <p className="eyebrow !text-[10px]">Chapitre IV</p>
          <h2 className="mt-2 font-display text-[40px] font-medium leading-none text-prune-950">
            Mon <em className="text-signature italic">cursus</em>
          </h2>
        </Reveal>
        <ol className="relative mt-8 space-y-6 border-l-2 border-lavande-200 pl-7">
          {education.map((e, i) => (
            <Reveal key={e.title} active={active} delay={0.15 + i * 0.15} x={-16} y={0}>
              <li className="relative">
                <span aria-hidden className={cn("absolute -left-[37px] top-1 h-4 w-4 rounded-full ring-4 ring-[#fdf9f4]", e.main ? "bg-signature" : "bg-amethyste-400")} />
                <p className="text-[11px] font-semibold text-amethyste-600">{e.period}</p>
                <p className={cn("font-display font-semibold leading-tight text-prune-950", e.main ? "text-[25px]" : "text-[21px]")}>{e.title}</p>
                <p className="text-[12px] text-prune-800">
                  {e.detail ? `${e.detail} · ` : ""}
                  {e.school}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    ),
  },
  /* 16 · Langues */
  {
    title: "Langues",
    header: "IV · Langues",
    render: ({ active }) => (
      <div>
        <Reveal active={active}>
          <h2 className="font-display text-[40px] font-medium leading-none text-prune-950">
            Quatre <em className="text-signature italic">langues</em>
          </h2>
          <p className="mt-3 text-[12.5px] text-prune-800">Un atout pour l&apos;accueil et la relation client.</p>
        </Reveal>
        <div className="mt-7 space-y-3">
          {languages.map((l, i) => (
            <Reveal key={l.name} active={active} delay={0.15 + i * 0.12} className="relative overflow-hidden rounded-2xl border border-lavande-200 bg-white/80 px-5 py-4">
              <span aria-hidden className="text-stroke absolute -bottom-2 right-2 font-display text-[54px] italic leading-none">
                {l.greeting ?? l.name}
              </span>
              <p className="relative font-display text-[26px] font-semibold leading-none text-prune-950">{l.name}</p>
              <p className="relative mt-1 text-[12px] text-prune-800">{l.level}</p>
            </Reveal>
          ))}
        </div>
      </div>
    ),
  },
  /* 17 · Qualités */
  {
    title: "Qualités",
    header: "V · Qualités",
    render: ({ active }) => (
      <div className="flex h-full flex-col">
        <Reveal active={active}>
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-prune-600">Document officiel</p>
          <h2 className="mt-2 text-center font-display text-[36px] font-medium leading-none text-prune-950">
            Qualités <em className="text-signature italic">certifiées</em>
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-signature" />
        </Reveal>
        <div className="mt-8 flex flex-1 flex-wrap content-start items-center justify-center gap-x-5 gap-y-6">
          {qualities.map((q, i) => (
            <Stamp key={q} active={active} rotate={[-7, 5, -3, 8, -9, 4][i]} delay={0.3 + i * 0.2} tone={i % 3 === 1 ? "rose" : "violet"} className="!px-3 !py-1.5 !text-[13px]">
              {q}
            </Stamp>
          ))}
        </div>
        <p className="text-right font-script text-[30px] text-amethyste-600">Lu et approuvé</p>
      </div>
    ),
  },
  /* 18 · Centres d'intérêt */
  {
    title: "Centres d'intérêt",
    header: "V · Carnet personnel",
    render: ({ active }) => (
      <div className="relative h-full">
        <div aria-hidden className="absolute inset-0 -mx-2 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_29px,rgb(221_208_251/0.6)_30px)]" />
        <Reveal active={active} className="relative">
          <h2 className="font-script text-[50px] leading-none text-amethyste-600">Mes passions</h2>
        </Reveal>
        <ul className="relative mt-8 space-y-4">
          {interests.map((name, i) => {
            const Icon = interestIcons[name];
            return (
              <Reveal key={name} active={active} delay={0.15 + i * 0.12} x={-12} y={0}>
                <li className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lavande-100 text-amethyste-600" style={{ transform: `rotate(${(i % 2 ? 1 : -1) * 6}deg)` }}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-[28px] font-medium text-prune-950">{name}</span>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    ),
  },
  /* 19 · Contact */
  {
    title: "Contact",
    header: "VI · Contact",
    render: ({ active }) => (
      <div className="flex h-full flex-col">
        <Reveal active={active}>
          <div className="flex items-center justify-between border-b border-lavande-200 pb-3">
            <span className="font-display text-[26px] font-semibold italic text-prune-950">
              G<span className="text-signature">S</span>
            </span>
            <span className="text-right text-[10px] leading-tight text-prune-600">
              {identity.location}
              <br />
              Octobre 2026
            </span>
          </div>
        </Reveal>
        <Reveal active={active} delay={0.15}>
          <p className="mt-5 text-[12px] font-semibold text-prune-800">Madame, Monsieur,</p>
          <p className="mt-2 font-display text-[18px] leading-snug text-prune-950">
            Organisée, polyvalente et à l&apos;écoute, je serais ravie d&apos;échanger avec vous sur vos besoins.
          </p>
        </Reveal>
        <Reveal active={active} delay={0.3} className="mt-3 -mx-3 text-[13px] [&_li]:!py-1.5">
          <ContactLinks />
        </Reveal>
        <Reveal active={active} delay={0.45} className="mt-auto flex items-end justify-between">
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="bg-signature inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold text-white">
            <WhatsAppIcon className="h-4 w-4" /> Écrire sur WhatsApp
          </a>
          <span className="font-script text-[44px] leading-none text-signature">{identity.firstName}</span>
        </Reveal>
      </div>
    ),
  },
  /* 20 · Quatrième de couverture */
  { title: "Quatrième de couverture", dark: true, render: () => <BackCover /> },
];
