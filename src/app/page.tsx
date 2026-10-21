import { Footer } from "@/components/shared/Footer";
import { ModeSwitcher } from "@/components/shared/ModeSwitcher";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { About } from "@/components/vertical/About";
import { Contact } from "@/components/vertical/Contact";
import { Education } from "@/components/vertical/Education";
import { Experiences } from "@/components/vertical/Experiences";
import { Expertise } from "@/components/vertical/Expertise";
import { Header } from "@/components/vertical/Header";
import { Hero } from "@/components/vertical/Hero";
import { Interests } from "@/components/vertical/Interests";
import { LanguagesQualities } from "@/components/vertical/LanguagesQualities";
import { SectorsMarquee } from "@/components/vertical/SectorsMarquee";

export default function Home() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Header />
      <main id="contenu">
        <Hero />
        <About />
        <Experiences />
        <Expertise />
        <SectorsMarquee />
        <Education />
        <LanguagesQualities />
        <Interests />
        <Contact />
      </main>
      <Footer />
      <ModeSwitcher />
    </SmoothScroll>
  );
}
