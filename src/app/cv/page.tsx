import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { EmailLink, PrintToolbar } from "@/components/cv/PrintToolbar";
import { WhatsAppIcon, interestIcons, skillIcons } from "@/components/shared/icons";
import {
  education,
  experiences,
  identity,
  interests,
  languages,
  profileShort,
  qualities,
  sectors,
  skillGroups,
  stats,
  tools,
  type Experience,
} from "@/data/cv";
import { telHref, whatsappHref } from "@/lib/contact";
import { formatPeriod } from "@/lib/dates";
import "./print.css";

export const metadata: Metadata = {
  title: "CV imprimable",
  alternates: { canonical: "/cv/" },
};

function SideTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-2.5 flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.22em] text-amethyste-600">
      {children}
      <span className="h-px flex-1 bg-amethyste-400/40" />
    </h2>
  );
}

function MainTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-4 font-display text-[26px] font-semibold leading-none text-prune-950">
      {children}
      <span className="bg-signature mt-2 block h-[2px] w-12" />
    </h2>
  );
}

function Entry({ exp }: { exp: Experience }) {
  return (
    <article className="cv-entry relative pl-5">
      <span className="bg-signature absolute left-0 top-[6px] h-2.5 w-2.5 rounded-full" />
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-[17px] font-semibold leading-tight text-prune-950">{exp.role}</h3>
        <span className="shrink-0 text-[10px] font-semibold text-prune-600">{formatPeriod(exp.start, exp.end)}</span>
      </div>
      <p className="text-[11.5px] font-semibold text-amethyste-600">
        {exp.company}
        {exp.companyDetail ? <span className="font-medium text-prune-600"> · {exp.companyDetail}</span> : null}
        {exp.badge ? <span className="ml-2 rounded-full bg-rose-100 px-2 py-px text-[9px] font-bold text-[#9b2763]">{exp.badge}</span> : null}
      </p>
      <ul className="mt-1.5 space-y-[3px]">
        {exp.bulletsShort.map((b) => (
          <li key={b} className="flex gap-2 text-[11px] leading-[1.45] text-prune-800">
            <span className="mt-[0.55em] h-1 w-1 shrink-0 rotate-45 bg-amethyste-400" />
            {b}
          </li>
        ))}
      </ul>
    </article>
  );
}

function Sheet({ children }: { children: ReactNode }) {
  return <section className="cv-sheet relative mx-auto overflow-hidden bg-white">{children}</section>;
}

export default function CvPage() {
  const firstPage = experiences.slice(0, 4);
  const secondPage = experiences.slice(4);

  return (
    <div className="cv-root min-h-dvh bg-lavande-100/70 pb-16 print:bg-white print:pb-0">
      <PrintToolbar />
      <main id="contenu" className="flex flex-col items-center gap-8 pt-8 print:block print:gap-0 print:pt-0">
        {/* ───────────── Page 1 ───────────── */}
        <Sheet>
          <header className="relative flex h-[232px] items-center gap-7 overflow-hidden bg-prune-950 px-12 text-white">
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_30%,rgb(123_63_228/0.7),transparent_55%),radial-gradient(ellipse_at_90%_100%,rgb(217_70_143/0.45),transparent_55%)]" />
            <div className="relative h-[150px] w-[150px] shrink-0 rounded-full bg-[conic-gradient(#7b3fe4,#f06ba8,#eee7fd,#a47cf3,#7b3fe4)] p-[4px]">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-lavande-100">
                <Image src={identity.photo} alt="Portrait de Gloria Sodjahin" fill sizes="150px" className="object-cover object-[50%_25%]" priority />
              </div>
            </div>
            <div className="relative">
              <p className="font-script text-[58px] leading-[0.85] text-rose-300">{identity.firstName}</p>
              <h1 className="font-display text-[46px] font-medium leading-none tracking-[0.08em]">{identity.lastName}</h1>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-lavande-200">{identity.title}</p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[11px] text-lavande-100">
                <li className="flex items-center gap-1.5">
                  <Phone className="h-3 w-3 text-rose-300" />
                  {identity.phones.map((p, i) => (
                    <span key={p}>
                      {i ? " / " : ""}
                      <a href={telHref(p)}>{p}</a>
                    </span>
                  ))}
                </li>
                <li className="flex items-center gap-1.5">
                  <Mail className="h-3 w-3 text-rose-300" />
                  <EmailLink />
                </li>
                <li className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-rose-300" />
                  {identity.location}
                </li>
                <li className="flex items-center gap-1.5">
                  <WhatsAppIcon className="h-3 w-3 text-rose-300" />
                  <a href={whatsappHref}>WhatsApp</a>
                </li>
              </ul>
            </div>
          </header>

          <div className="grid h-[891px] grid-cols-[262px_1fr]">
            <aside className="space-y-6 bg-lavande-100/80 px-7 py-8">
              <div>
                <SideTitle>Profil</SideTitle>
                <p className="text-[11px] leading-[1.6] text-prune-800">{profileShort}</p>
              </div>
              <div>
                <SideTitle>Compétences</SideTitle>
                <div className="space-y-3">
                  {skillGroups.map((g) => {
                    const Icon = skillIcons[g.id];
                    return (
                      <div key={g.id}>
                        <p className="flex items-center gap-1.5 text-[11px] font-bold text-prune-950">
                          <Icon className="h-3.5 w-3.5 text-amethyste-600" /> {g.title}
                        </p>
                        <ul className="mt-1 space-y-[2px]">
                          {g.skills.map((s) => (
                            <li key={s} className="flex gap-1.5 text-[10.5px] leading-snug text-prune-800">
                              <span className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-orchidee-500" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <SideTitle>Outils</SideTitle>
                <ul className="space-y-1.5">
                  {tools.map((t) => (
                    <li key={t.name} className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-prune-950">
                        {t.name} <span className="font-normal text-prune-600">· {t.label}</span>
                      </span>
                      <span className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <span key={i} className={i < t.level ? "bg-signature h-2 w-2 rounded-full" : "h-2 w-2 rounded-full bg-lavande-200"} />
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <SideTitle>Secteurs</SideTitle>
                <div className="flex flex-wrap gap-1.5">
                  {sectors.map((s) => (
                    <span key={s} className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-semibold text-prune-800 ring-1 ring-lavande-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </aside>

            <div className="px-10 py-8">
              <MainTitle>Expériences professionnelles</MainTitle>
              <div className="relative space-y-5">
                <span className="absolute bottom-2 left-[4.5px] top-2 w-px bg-lavande-200" />
                {firstPage.map((e) => (
                  <Entry key={e.id} exp={e} />
                ))}
              </div>
            </div>
          </div>
          <p className="absolute bottom-4 right-10 text-[9px] uppercase tracking-[0.25em] text-prune-600/60">1 / 2</p>
        </Sheet>

        {/* ───────────── Page 2 ───────────── */}
        <Sheet>
          <div className="bg-signature h-2" />
          <div className="grid h-[1115px] grid-cols-[262px_1fr]">
            <aside className="space-y-6 bg-lavande-100/80 px-7 py-9">
              <div>
                <SideTitle>Langues</SideTitle>
                <ul className="space-y-2">
                  {languages.map((l) => (
                    <li key={l.name} className="text-[11px]">
                      <p className="font-bold text-prune-950">{l.name}</p>
                      <p className="text-prune-800">{l.level}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <SideTitle>Qualités</SideTitle>
                <div className="flex flex-wrap gap-1.5">
                  {qualities.map((q) => (
                    <span key={q} className="rounded-md border border-dashed border-amethyste-400 px-2 py-0.5 text-[10px] font-semibold text-amethyste-600">
                      {q}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <SideTitle>Centres d&apos;intérêt</SideTitle>
                <ul className="grid grid-cols-2 gap-2">
                  {interests.map((n) => {
                    const Icon = interestIcons[n];
                    return (
                      <li key={n} className="flex items-center gap-1.5 text-[11px] font-medium text-prune-800">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-amethyste-600 ring-1 ring-lavande-200">
                          <Icon className="h-3 w-3" />
                        </span>
                        {n}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            <div className="flex flex-col px-10 py-9">
              <MainTitle>Expériences (suite)</MainTitle>
              <div className="relative space-y-5">
                <span className="absolute bottom-2 left-[4.5px] top-2 w-px bg-lavande-200" />
                {secondPage.map((e) => (
                  <Entry key={e.id} exp={e} />
                ))}
              </div>

              <div className="mt-14">
                <MainTitle>Formation</MainTitle>
                <ul className="space-y-4">
                  {education.map((e) => (
                    <li key={e.title} className="flex items-baseline justify-between gap-4">
                      <div>
                        <p className="font-display text-[16px] font-semibold leading-tight text-prune-950">{e.title}</p>
                        <p className="text-[11px] text-amethyste-600">
                          {e.school}
                          {e.detail ? <span className="text-prune-600"> · {e.detail}</span> : null}
                        </p>
                      </div>
                      <span className="shrink-0 text-[10.5px] font-semibold text-prune-600">{e.period}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-14 grid grid-cols-4 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl bg-lavande-100/80 px-3 py-5 text-center">
                    <p className="font-display text-[42px] font-semibold leading-none text-amethyste-600">
                      {s.value}
                      {s.suffix}
                    </p>
                    <p className="mt-1 text-[9.5px] font-semibold text-prune-800">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="relative mt-auto overflow-hidden rounded-2xl bg-prune-950 px-7 py-6 text-white">
                <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_0%,rgb(217_70_143/0.5),transparent_60%)]" />
                <p className="relative font-display text-[22px] italic leading-snug text-lavande-100">« {identity.tagline} »</p>
                <p className="relative mt-3 text-[11px] text-lavande-200">
                  Disponible immédiatement · <a href={whatsappHref} className="font-semibold text-rose-300">Écrire sur WhatsApp</a>
                </p>
                <p className="absolute bottom-3 right-6 font-script text-[40px] leading-none text-rose-300">{identity.firstName}</p>
              </div>
            </div>
          </div>
          <p className="absolute bottom-4 right-10 text-[9px] uppercase tracking-[0.25em] text-prune-600/60">2 / 2</p>
        </Sheet>
      </main>
    </div>
  );
}
