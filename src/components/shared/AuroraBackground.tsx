import { cn } from "@/lib/cn";

/** Halos flous violet / rose / lavande qui dérivent lentement (CSS pur) + grain. */
export function AuroraBackground({ className, fixed = false }: { className?: string; fixed?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn("no-print pointer-events-none inset-0 overflow-hidden", fixed ? "fixed" : "absolute", className)}
    >
      <div className="absolute -left-[12%] -top-[18%] h-[55vmax] w-[55vmax] animate-drift rounded-full bg-amethyste-400/30 blur-[100px] will-change-transform" />
      <div className="absolute -right-[18%] top-[8%] h-[46vmax] w-[46vmax] animate-drift rounded-full bg-rose-300/40 blur-[100px] will-change-transform [animation-delay:-8s]" />
      <div className="absolute -bottom-[25%] left-[22%] h-[42vmax] w-[42vmax] animate-drift rounded-full bg-lavande-200/80 blur-[100px] will-change-transform [animation-delay:-15s]" />
      <div className="grain-layer absolute inset-0" />
    </div>
  );
}
