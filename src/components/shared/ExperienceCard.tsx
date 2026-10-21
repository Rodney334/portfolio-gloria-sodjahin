import { RotateCcw } from "lucide-react";
import type { Experience } from "@/data/cv";
import { formatDuration, formatPeriod, yearOf } from "@/lib/dates";
import { cn } from "@/lib/cn";
import { channelIcons } from "./icons";

type ExperienceCardProps = {
  exp: Experience;
  className?: string;
  short?: boolean;
  ghostYear?: boolean;
  returnNote?: string;
};

/** Carte d'expérience partagée par les versions verticale et horizontale. */
export function ExperienceCard({ exp, className, short = false, ghostYear = true, returnNote }: ExperienceCardProps) {
  const bullets = short ? exp.bulletsShort : exp.bullets;

  return (
    <article
      className={cn(
        "border-glow group relative overflow-hidden rounded-[var(--radius-card)] border border-lavande-200 bg-white/85 p-6 shadow-card backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1 sm:p-8",
        className,
      )}
    >
      {ghostYear ? (
        <span aria-hidden className="text-stroke pointer-events-none absolute -right-2 -top-6 font-display text-[6.5rem] font-semibold leading-none opacity-70 transition-opacity duration-500 group-hover:opacity-100">
          {yearOf(exp.start)}
        </span>
      ) : null}

      <div className="relative">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-lavande-100 px-3 py-1 text-xs font-semibold text-prune-800">
            {formatPeriod(exp.start, exp.end)}
          </span>
          <span className="text-xs font-medium text-prune-600/80">{formatDuration(exp.start, exp.end)}</span>
        </div>

        <h3 className="mt-4 font-display text-[1.75rem] font-semibold leading-tight text-prune-950 sm:text-[2rem]">{exp.role}</h3>
        <p className="mt-1 font-semibold text-amethyste-600">
          {exp.company}
          {exp.companyDetail ? <span className="font-medium text-prune-600/80"> · {exp.companyDetail}</span> : null}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-[#9b2763]">{exp.sector}</span>
          {exp.badge ? (
            <span className="bg-signature inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white">
              <RotateCcw className="h-3 w-3" aria-hidden />
              {exp.badge}
            </span>
          ) : null}
          {returnNote ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-amethyste-400 px-3 py-1 text-xs font-semibold text-amethyste-600">
              {returnNote}
            </span>
          ) : null}
        </div>

        <ul className="mt-5 space-y-2.5">
          {bullets.map((b) => (
            <li key={b} className="flex gap-3 text-[0.95rem] leading-relaxed text-prune-800">
              <span aria-hidden className="bg-signature mt-[0.6em] h-1.5 w-1.5 shrink-0 rotate-45 rounded-[1px]" />
              {b}
            </li>
          ))}
        </ul>

        {exp.channels ? (
          <div className="mt-6 flex items-center gap-2">
            <span className="mr-1 text-xs font-semibold uppercase tracking-[0.18em] text-prune-600/80">Canaux gérés</span>
            {exp.channels.map((c) => {
              const Icon = channelIcons[c];
              return (
                <span
                  key={c}
                  title={c}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-lavande-100 text-amethyste-600 transition-all duration-300 hover:-translate-y-1 hover:bg-signature hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px]" />
                  <span className="sr-only">{c}</span>
                </span>
              );
            })}
          </div>
        ) : null}
      </div>
    </article>
  );
}
