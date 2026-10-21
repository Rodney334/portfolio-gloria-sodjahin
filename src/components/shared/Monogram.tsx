import { cn } from "@/lib/cn";

/** Monogramme « GS » en serif, utilisé pour le logo, le rideau et la couverture du livre. */
export function Monogram({ className }: { className?: string }) {
  return (
    <span className={cn("font-display font-semibold italic leading-none tracking-tight", className)}>
      G<span className="text-signature">S</span>
    </span>
  );
}
