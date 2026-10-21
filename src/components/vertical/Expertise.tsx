import { MonitorSmartphone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { ToolLevel } from "@/components/shared/ToolLevel";
import { skillIcons } from "@/components/shared/icons";
import { skillGroups, tools } from "@/data/cv";
import { cn } from "@/lib/cn";

const layout = ["md:col-span-4 md:row-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-6 lg:col-span-6"];

export function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionTitle id="expertise-title" index="03" eyebrow="Domaines de compétences" title="Mon" accent="expertise" />

        <div className="mt-16 grid gap-5 md:grid-cols-6">
          {skillGroups.map((g, i) => {
            const Icon = skillIcons[g.id];
            const big = i === 0;
            return (
              <Reveal key={g.id} delay={i * 0.1} className={layout[i]}>
                <TiltCard
                  className={cn(
                    "border-glow h-full overflow-hidden rounded-[var(--radius-card)] border border-lavande-200 p-7 shadow-card sm:p-9",
                    big ? "bg-prune-950 text-white" : "bg-white",
                  )}
                >
                  <div className="relative z-10 flex h-full flex-col">
                    <span
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110",
                        big ? "bg-signature text-white" : "bg-lavande-100 text-amethyste-600",
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className={cn("mt-6 font-display font-semibold leading-tight", big ? "text-4xl sm:text-5xl" : "text-[1.7rem] text-prune-950")}>
                      {g.title}
                    </h3>
                    <ul className={cn("mt-6 space-y-3", big && "mt-8 space-y-4")}>
                      {g.skills.map((s) => (
                        <li key={s} className={cn("flex gap-3 leading-snug", big ? "text-lg text-lavande-100" : "text-prune-800")}>
                          <span aria-hidden className={cn("mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full", big ? "bg-rose-300" : "bg-signature")} />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {big ? (
                    <>
                      <span aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amethyste-600/40 blur-3xl" />
                      <Icon aria-hidden className="pointer-events-none absolute -bottom-10 -right-6 h-64 w-64 rotate-[-12deg] text-white/[0.05]" strokeWidth={1} />
                    </>
                  ) : null}
                </TiltCard>
              </Reveal>
            );
          })}

          <Reveal delay={0.3} className={layout[3]}>
            <div className="border-glow relative h-full rounded-[var(--radius-card)] border border-lavande-200 bg-gradient-to-br from-white via-white to-rose-100/60 p-7 shadow-card sm:p-9">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                <div className="flex items-center gap-4 lg:w-64 lg:shrink-0">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lavande-100 text-amethyste-600">
                    <MonitorSmartphone className="h-6 w-6" />
                  </span>
                  <h3 className="font-display text-[1.7rem] font-semibold leading-tight text-prune-950">Outils bureautiques</h3>
                </div>
                <div className="grid flex-1 gap-6 sm:grid-cols-3">
                  {tools.map((t) => (
                    <div key={t.name} className="rounded-2xl bg-white/80 px-5 py-4 ring-1 ring-lavande-200">
                      <ToolLevel tool={t} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
