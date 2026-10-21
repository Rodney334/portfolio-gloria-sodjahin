import { Counter } from "@/components/motion/Counter";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { profile, stats } from "@/data/cv";

export function About() {
  return (
    <section id="a-propos" aria-labelledby="a-propos-title" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionTitle id="a-propos-title" index="01" eyebrow="Qui suis-je" title="Une assistante au service de" accent="votre organisation" />

        <ScrollWords
          text={profile}
          className="mt-14 max-w-5xl font-display text-[clamp(1.6rem,3.4vw,2.9rem)] leading-[1.25] text-prune-950"
        />

        <Stagger className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4" stagger={0.1}>
          {stats.map((s) => (
            <StaggerItem
              key={s.label}
              className="relative overflow-hidden rounded-[var(--radius-card)] border border-lavande-200 bg-gradient-to-br from-white to-lavande-100/70 p-6 shadow-card sm:p-8"
            >
              <Counter value={s.value} suffix={s.suffix} className="text-signature block font-display text-[clamp(3.2rem,6vw,5rem)] font-semibold leading-none" />
              <p className="mt-3 text-sm font-medium text-prune-800">{s.label}</p>
              <span aria-hidden className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-rose-300/25 blur-2xl" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
