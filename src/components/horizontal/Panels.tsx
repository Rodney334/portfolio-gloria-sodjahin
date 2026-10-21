"use client";

import { motion } from "motion/react";
import { ArrowRight, MonitorSmartphone, Paperclip } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Counter } from "@/components/motion/Counter";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Stamp } from "@/components/motion/Stamp";
import { AvailabilityBadge } from "@/components/shared/AvailabilityBadge";
import { DownloadPdfButton, WhatsAppButton } from "@/components/shared/Buttons";
import { ContactLinks } from "@/components/shared/ContactLinks";
import { Envelope } from "@/components/shared/Envelope";
import { ExperienceCard } from "@/components/shared/ExperienceCard";
import { InterestBubbles } from "@/components/shared/InterestBubbles";
import { PhotoArch } from "@/components/shared/PhotoArch";
import { ToolLevel } from "@/components/shared/ToolLevel";
import { sectorIcons, skillIcons } from "@/components/shared/icons";
import {
  education,
  experiences,
  identity,
  languages,
  profile,
  qualities,
  sectors,
  skillGroups,
  stats,
  tools,
} from "@/data/cv";
import { yearOf } from "@/lib/dates";
import { cn } from "@/lib/cn";

export const chapters = [
  { id: "h-couverture", label: "Couverture" },
  { id: "h-profil", label: "Profil" },
  { id: "h-parcours", label: "Parcours" },
  { id: "h-expertise", label: "Expertise" },
  { id: "h-secteurs", label: "Secteurs" },
  { id: "h-formation", label: "Formation & langues" },
  { id: "h-qualites", label: "Qualités & intérêts" },
  { id: "h-contact", label: "Contact" },
];

function Panel({ id, children, className, label }: { id: string; children: ReactNode; className?: string; label: string }) {
  return (
    <section
      id={id}
      data-chapter
      aria-label={label}
      className={cn(
        "relative flex h-full w-screen shrink-0 snap-start overflow-y-auto px-6 py-24 sm:px-12 lg:overflow-visible lg:px-[7vw]",
        className,
      )}
    >
      {/* my-auto : centré quand il y a la place, sans être rogné en haut quand le contenu dépasse */}
      <div className="my-auto w-full">{children}</div>
    </section>
  );
}

function PanelTitle({ index, eyebrow, title, accent }: { index: string; eyebrow: string; title: string; accent: string }) {
  return (
    <div>
      <Reveal>
        <p className="eyebrow">
          {index} — {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="h-section mt-3 text-prune-950">
          {title} <em className="text-signature pr-[0.08em] italic">{accent}</em>
        </h2>
      </Reveal>
    </div>
  );
}

/* 1 ─ Couverture */
export function CoverPanel() {
  return (
    <Panel id="h-couverture" label="Couverture" className="overflow-hidden">
      <div className="relative grid w-full items-center gap-10 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="relative z-10">
          <AvailabilityBadge />
          <h1 className="mt-6">
            <motion.span
              className="text-signature block font-script text-[clamp(4.5rem,12vw,11rem)] leading-[0.85]"
              initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.75, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {identity.firstName}
            </motion.span>
            <span className="block whitespace-nowrap font-display text-[clamp(3.5rem,13vw,13rem)] font-medium leading-[0.85] tracking-tight text-prune-950">
              <SplitText text={identity.lastName} delay={1} stagger={0.05} />
            </span>
          </h1>
          <Reveal delay={1.3}>
            <p className="mt-6 text-[0.8rem] font-semibold uppercase tracking-[0.3em] text-amethyste-600">{identity.title}</p>
            <p className="mt-3 max-w-lg font-display text-[clamp(1.5rem,2.4vw,2.2rem)] italic text-prune-800">{identity.tagline}</p>
          </Reveal>
          <Reveal delay={1.6} className="mt-10 flex items-center gap-3 text-sm font-semibold text-prune-800">
            <span className="hidden lg:inline">Faites défiler</span>
            <span className="lg:hidden">Glissez</span>
            <motion.span animate={{ x: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
              <ArrowRight className="h-5 w-5 text-amethyste-600" />
            </motion.span>
          </Reveal>
        </div>
        <div className="h-parallax relative mx-auto w-full max-w-[260px] lg:max-w-[380px]" data-speed="0.25">
          <PhotoArch priority sizes="(min-width: 1024px) 380px, 260px" />
        </div>
      </div>
    </Panel>
  );
}

/* 2 ─ Profil */
export function ProfilePanel() {
  return (
    <Panel id="h-profil" label="Profil">
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
        <div>
          <PanelTitle index="01" eyebrow="Profil" title="Qui" accent="suis-je" />
          <Reveal delay={0.25}>
            <p className="mt-8 font-display text-[clamp(1.5rem,2.3vw,2.4rem)] leading-[1.3] text-prune-950">{profile}</p>
          </Reveal>
        </div>
        <Stagger className="grid grid-cols-2 gap-4" stagger={0.12} delay={0.3}>
          {stats.map((s) => (
            <StaggerItem key={s.label} className="rounded-[var(--radius-card)] border border-lavande-200 bg-white/85 p-6 shadow-card">
              <Counter value={s.value} suffix={s.suffix} className="text-signature block font-display text-6xl font-semibold leading-none" />
              <p className="mt-2 text-sm font-medium text-prune-800">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Panel>
  );
}

/* 3 ─ Parcours : les expériences sont suspendues à un fil, comme des documents épinglés */
const chronological = [...experiences].reverse();

export function ParcoursPanel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [geo, setGeo] = useState<{ width: number; xs: number[] } | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => {
      const xs = cardRefs.current.map((el) => (el ? el.offsetLeft + el.offsetWidth / 2 : 0));
      setGeo({ width: wrap.scrollWidth, xs });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  const LINE_Y = 70;
  const routeD = geo
    ? geo.xs.reduce((d, x, i) => {
        if (i === 0) return `M 0 ${LINE_Y} L ${x} ${LINE_Y}`;
        const prev = geo.xs[i - 1];
        return `${d} Q ${(prev + x) / 2} ${LINE_Y + 34} ${x} ${LINE_Y}`;
      }, "") + ` L ${geo.xs[geo.xs.length - 1] + 160} ${LINE_Y}`
    : "";
  const razA = chronological.findIndex((e) => e.id === "raz-2022");
  const razB = chronological.findIndex((e) => e.id === "raz-2026");
  const arcD = geo
    ? `M ${geo.xs[razA]} ${LINE_Y - 6} C ${geo.xs[razA] + 80} -30, ${geo.xs[razB] - 80} -30, ${geo.xs[razB]} ${LINE_Y - 6}`
    : "";

  return (
    <section id="h-parcours" data-chapter data-free aria-label="Parcours" className="relative h-full shrink-0">
      <div ref={wrapRef} className="relative flex h-full items-stretch">
        {/* Le fil */}
        {geo ? (
          <svg aria-hidden className="pointer-events-none absolute left-0 top-[11vh] overflow-visible" width={geo.width} height={120}>
            <path id="h-route" d={routeD} fill="none" stroke="url(#route-gradient)" strokeWidth={2.5} strokeLinecap="round" pathLength={1} strokeDasharray="1" style={{ strokeDashoffset: "calc(1 - var(--route-progress, 1))" }} />
            <path d={arcD} fill="none" stroke="#a47cf3" strokeWidth={1.6} strokeDasharray="5 7" />
            <text x={(geo.xs[razA] + geo.xs[razB]) / 2} y={-22} textAnchor="middle" className="fill-amethyste-600 font-sans text-[12px] font-semibold uppercase tracking-[0.2em]">
              RAZ BTP & Consulting · le retour
            </text>
            <defs>
              <linearGradient id="route-gradient" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#7b3fe4" />
                <stop offset="55%" stopColor="#b44fcf" />
                <stop offset="100%" stopColor="#f06ba8" />
              </linearGradient>
            </defs>
          </svg>
        ) : null}

        {/* Intro */}
        <div data-snap className="flex w-screen shrink-0 snap-start flex-col justify-center px-6 sm:px-12 lg:w-[46vw] lg:pl-[7vw] lg:pr-[4vw]">
          <PanelTitle index="02" eyebrow="Expériences professionnelles" title="Mon" accent="parcours" />
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-prune-800">
              De la saisie de données à l&apos;assistanat de direction : sept postes, six secteurs, une progression continue.
            </p>
            <p className="mt-8 font-display text-5xl text-prune-950">
              2020 <span className="text-signature">→</span> 2026
            </p>
          </Reveal>
        </div>

        {chronological.map((exp, i) => (
          <div
            key={exp.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="relative flex w-[88vw] shrink-0 snap-center flex-col items-center px-3 pt-[calc(11vh+62px)] sm:w-[60vw] lg:w-[30rem] lg:px-6"
          >
            <span aria-hidden className="h-parallax text-stroke pointer-events-none absolute bottom-[6vh] left-1/2 -translate-x-1/2 font-display text-[clamp(7rem,14vw,13rem)] font-semibold leading-none opacity-60" data-speed="0.6">
              {yearOf(exp.start)}
            </span>
            {/* Trombone */}
            <span aria-hidden className="relative z-10 -mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-amethyste-600 shadow-card ring-1 ring-lavande-200">
              <Paperclip className="h-4 w-4" />
            </span>
            <motion.div
              className="relative w-full origin-top"
              initial={{ rotate: i % 2 ? 9 : -9, opacity: 0 }}
              whileInView={{ rotate: i % 2 ? 1.2 : -1.2, opacity: 1 }}
              whileHover={{ rotate: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 70, damping: 7 }}
            >
              <ExperienceCard exp={exp} short ghostYear={false} returnNote={exp.id === "raz-2022" ? "De retour en 2026" : undefined} className="max-h-[calc(89vh-140px)] overflow-y-auto" />
            </motion.div>
          </div>
        ))}
        <div aria-hidden className="w-[10vw] shrink-0" />
      </div>
    </section>
  );
}

/* 4 ─ Expertise */
export function ExpertisePanel() {
  return (
    <Panel id="h-expertise" label="Expertise">
      <div className="w-full">
        <PanelTitle index="03" eyebrow="Domaines de compétences" title="Mon" accent="expertise" />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {skillGroups.map((g, i) => {
            const Icon = skillIcons[g.id];
            return (
              <Reveal key={g.id} delay={0.15 + i * 0.15} y={i % 2 ? -40 : 40}>
                <div className={cn("border-glow relative h-full rounded-[var(--radius-card)] border border-lavande-200 p-7 shadow-card", i === 0 ? "bg-prune-950 text-white" : "bg-white")}>
                  <span className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", i === 0 ? "bg-signature" : "bg-lavande-100 text-amethyste-600")}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className={cn("mt-5 font-display text-[1.8rem] font-semibold leading-tight", i !== 0 && "text-prune-950")}>{g.title}</h3>
                  <ul className="mt-4 space-y-2">
                    {g.skills.map((s) => (
                      <li key={s} className={cn("flex gap-3 text-[0.95rem] leading-snug", i === 0 ? "text-lavande-100" : "text-prune-800")}>
                        <span aria-hidden className={cn("mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full", i === 0 ? "bg-rose-300" : "bg-signature")} />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.6} className="mt-5">
          <div className="flex flex-col gap-5 rounded-[var(--radius-card)] border border-lavande-200 bg-white/85 p-6 shadow-card lg:flex-row lg:items-center">
            <p className="flex items-center gap-3 font-display text-2xl font-semibold text-prune-950 lg:w-60">
              <MonitorSmartphone className="h-6 w-6 text-amethyste-600" /> Outils
            </p>
            <div className="grid flex-1 gap-4 sm:grid-cols-3">
              {tools.map((t) => (
                <div key={t.name} className="rounded-2xl bg-lavande-100/60 px-5 py-3">
                  <ToolLevel tool={t} compact />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Panel>
  );
}

/* 5 ─ Secteurs : couches typographiques en parallaxe */
export function SectorsPanel() {
  return (
    <Panel id="h-secteurs" label="Secteurs d'activité" className="overflow-hidden lg:w-[130vw]">
      <div className="w-full">
        <PanelTitle index="04" eyebrow="Six secteurs" title="Une grande" accent="polyvalence" />
        <div className="mt-12 flex flex-col gap-4">
          {[sectors.slice(0, 3), sectors.slice(3)].map((row, r) => (
            <div key={r} className="h-parallax flex flex-wrap gap-4 lg:flex-nowrap" data-speed={r === 0 ? "-0.15" : "0.15"}>
              {row.map((s, i) => {
                const Icon = sectorIcons[s];
                return (
                  <Reveal key={s} delay={0.1 + (r * 3 + i) * 0.08}>
                    <div className="group flex items-center gap-4 whitespace-nowrap rounded-full border border-lavande-200 bg-white/80 py-3 pl-3 pr-8 shadow-card transition-colors hover:border-amethyste-400">
                      <span className="bg-signature flex h-14 w-14 items-center justify-center rounded-full text-white transition-transform duration-500 group-hover:rotate-12">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="font-display text-[clamp(2rem,4.5vw,4.5rem)] italic leading-none text-prune-950">{s}</span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* 6 ─ Formation & langues */
export function EducationLanguagesPanel() {
  return (
    <Panel id="h-formation" label="Formation et langues">
      <div className="grid w-full gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <PanelTitle index="05" eyebrow="Formation" title="Mon" accent="cursus" />
          <ol className="relative mt-10 space-y-6 border-l-2 border-lavande-200 pl-8">
            {education.map((e, i) => (
              <Reveal key={e.title} delay={0.15 + i * 0.12} x={-20} y={0}>
                <li className="relative">
                  <span aria-hidden className={cn("absolute -left-[41px] top-1.5 h-4 w-4 rounded-full ring-4 ring-nacre-50", e.main ? "bg-signature" : "bg-amethyste-400")} />
                  <p className="text-sm font-semibold text-amethyste-600">{e.period}</p>
                  <p className={cn("font-display font-semibold text-prune-950", e.main ? "text-3xl" : "text-2xl")}>{e.title}</p>
                  <p className="text-sm text-prune-800">
                    {e.detail ? `${e.detail} · ` : ""}
                    {e.school}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
        <div>
          <PanelTitle index="06" eyebrow="Langues" title="Quatre" accent="langues" />
          <div className="mt-10 grid grid-cols-2 gap-4">
            {languages.map((l, i) => (
              <Reveal key={l.name} delay={0.2 + i * 0.1}>
                <div className="relative h-full overflow-hidden rounded-[var(--radius-card)] border border-lavande-200 bg-white p-6 shadow-card">
                  <span aria-hidden className="text-stroke absolute -bottom-3 -right-1 font-display text-6xl italic leading-none">
                    {l.greeting ?? l.name}
                  </span>
                  <p className="relative font-display text-3xl font-semibold text-prune-950">{l.name}</p>
                  <p className="relative mt-1 text-sm text-prune-800">{l.level}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* 7 ─ Qualités & intérêts */
const rotations = [-7, 5, -3, 8, -9, 4];

export function QualitiesPanel() {
  return (
    <Panel id="h-qualites" label="Qualités et centres d'intérêt">
      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="paper relative overflow-hidden rounded-[var(--radius-card)] border border-lavande-200 px-6 py-10 shadow-soft sm:px-10">
          <div aria-hidden className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_35px,rgb(221_208_251/0.45)_36px)]" />
          <div className="relative">
            <p className="eyebrow">07 — Qualités professionnelles</p>
            <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-10">
              {qualities.map((q, i) => (
                <Stamp key={q} rotate={rotations[i]} delay={0.2 + i * 0.18} tone={i % 3 === 1 ? "rose" : "violet"} className="text-base">
                  {q}
                </Stamp>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="eyebrow text-center">08 — Centres d&apos;intérêt</p>
          <Reveal delay={0.3}>
            <InterestBubbles className="mt-8" size="sm" />
          </Reveal>
        </div>
      </div>
    </Panel>
  );
}

/* 8 ─ Contact */
export function ContactPanel() {
  return (
    <section id="h-contact" data-chapter aria-label="Contact" className="relative flex h-full w-screen shrink-0 snap-start overflow-y-auto px-6 py-24 sm:px-12 lg:overflow-visible lg:px-[7vw]">
      <div className="my-auto grid w-full items-center gap-12 lg:grid-cols-2">
        <div>
          <PanelTitle index="09" eyebrow="Contact" title="Travaillons" accent="ensemble" />
          <Reveal delay={0.25} className="mt-6 rounded-[var(--radius-card)] border border-lavande-200 bg-white/85 p-3 shadow-card">
            <ContactLinks />
          </Reveal>
          <Reveal delay={0.35} className="mt-6 flex flex-wrap gap-3">
            <WhatsAppButton />
            <DownloadPdfButton />
          </Reveal>
        </div>
        <div className="mx-auto w-full max-w-[520px]">
          <Envelope />
        </div>
      </div>
    </section>
  );
}
