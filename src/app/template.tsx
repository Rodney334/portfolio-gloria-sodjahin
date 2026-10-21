import type { ReactNode } from "react";
import { Monogram } from "@/components/shared/Monogram";

/**
 * Rejoué à chaque changement de page : un rideau en dégradé signature balaie l'écran
 * avec le monogramme au centre. Animation 100% CSS, donc jamais bloquante.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <div aria-hidden className="curtain no-print pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-signature">
        <Monogram className="curtain-monogram text-7xl text-white [&>span]:text-white" />
      </div>
      {children}
    </>
  );
}
