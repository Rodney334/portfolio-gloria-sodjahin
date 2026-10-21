import { cn } from "@/lib/cn";

export function AvailabilityBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm font-medium text-prune-800",
        className,
      )}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>
      Disponible immédiatement
    </span>
  );
}
