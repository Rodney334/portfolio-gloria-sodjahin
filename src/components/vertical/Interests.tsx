import { InterestBubbles } from "@/components/shared/InterestBubbles";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { Reveal } from "@/components/motion/Reveal";

export function Interests() {
  return (
    <section id="interets" aria-labelledby="interets-title" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle id="interets-title" index="06" eyebrow="Centres d'intérêt" title="En dehors du" accent="bureau" align="center" />
        <Reveal delay={0.2}>
          <InterestBubbles className="mt-16" />
        </Reveal>
      </div>
    </section>
  );
}
