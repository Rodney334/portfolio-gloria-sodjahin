import Link from "next/link";
import { AuroraBackground } from "@/components/shared/AuroraBackground";
import { Monogram } from "@/components/shared/Monogram";

export default function NotFound() {
  return (
    <main id="contenu" className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <AuroraBackground />
      <Monogram className="relative text-6xl text-prune-950" />
      <p className="text-stroke relative mt-6 font-display text-[9rem] font-semibold leading-none">404</p>
      <h1 className="relative mt-2 font-display text-4xl text-prune-950">
        Ce dossier semble <em className="text-signature italic">introuvable</em>…
      </h1>
      <p className="relative mt-4 max-w-md text-prune-800">Il a peut-être été rangé ailleurs. Revenons à l&apos;accueil.</p>
      <Link href="/" className="bg-signature relative mt-8 rounded-full px-6 py-3 font-semibold text-white shadow-soft">
        Retour au portfolio
      </Link>
    </main>
  );
}
