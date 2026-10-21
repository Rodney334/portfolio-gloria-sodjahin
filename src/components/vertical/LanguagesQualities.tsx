import { Reveal } from "@/components/motion/Reveal";
import { Stamp } from "@/components/motion/Stamp";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { languages, qualities } from "@/data/cv";

const stampLayout = [
  { rotate: -7, className: "md:translate-y-2" },
  { rotate: 5, className: "md:-translate-y-3" },
  { rotate: -3, className: "md:translate-y-5" },
  { rotate: 8, className: "" },
  { rotate: -9, className: "md:-translate-y-2" },
  { rotate: 4, className: "md:translate-y-3" },
];

export function LanguagesQualities() {
  return (
    <section id="langues" aria-labelledby="langues-title" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionTitle id="langues-title" index="05" eyebrow="Langues & qualités" title="Ce qui me" accent="caractérise" />

        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {languages.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-[var(--radius-card)] border border-lavande-200 bg-white p-6 shadow-card transition-transform duration-500 hover:-translate-y-1 sm:p-7">
                <span aria-hidden className="text-stroke pointer-events-none absolute -bottom-4 -right-2 font-display text-7xl italic leading-none opacity-80 transition-transform duration-700 group-hover:-translate-x-2">
                  {l.greeting ?? l.name}
                </span>
                <p className="relative font-display text-3xl font-semibold text-prune-950">{l.name}</p>
                <p className="relative mt-2 max-w-[14rem] text-sm leading-relaxed text-prune-800">{l.level}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* La feuille officielle et ses tampons */}
        <Reveal className="mt-16">
          <div className="paper relative overflow-hidden rounded-[var(--radius-card)] border border-lavande-200 px-6 py-12 shadow-soft sm:px-12 sm:py-16">
            <div aria-hidden className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_35px,rgb(221_208_251/0.45)_36px)]" />
            <div aria-hidden className="absolute bottom-0 left-12 top-0 w-px bg-rose-300/70 sm:left-20" />
            <div className="relative">
              <p className="eyebrow text-center">Qualités professionnelles — certifiées conformes</p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-10 sm:gap-x-12 sm:gap-y-12">
                {qualities.map((q, i) => (
                  <div key={q} className={stampLayout[i % stampLayout.length].className}>
                    <Stamp rotate={stampLayout[i % stampLayout.length].rotate} delay={i * 0.18} tone={i % 3 === 1 ? "rose" : "violet"}>
                      {q}
                    </Stamp>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
