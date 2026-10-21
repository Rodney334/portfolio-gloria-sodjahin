import { Reveal } from "@/components/motion/Reveal";
import { DownloadPdfButton, WhatsAppButton } from "@/components/shared/Buttons";
import { ContactLinks } from "@/components/shared/ContactLinks";
import { Envelope } from "@/components/shared/Envelope";
import { SectionTitle } from "@/components/shared/SectionTitle";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-36">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-rose-100/60 to-lavande-100/80" />
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionTitle id="contact-title" index="07" eyebrow="Contact" title="Travaillons" accent="ensemble" />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-prune-800">
              Disponible immédiatement pour un poste d&apos;assistante administrative, de direction ou de chargée de clientèle.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-8 rounded-[var(--radius-card)] border border-lavande-200 bg-white/80 p-3 shadow-card backdrop-blur">
            <ContactLinks />
          </Reveal>
          <Reveal delay={0.4} className="mt-8 flex flex-wrap gap-4">
            <WhatsAppButton />
            <DownloadPdfButton />
          </Reveal>
        </div>
        <div className="mx-auto w-full max-w-[560px]">
          <Envelope />
        </div>
      </div>
    </section>
  );
}
