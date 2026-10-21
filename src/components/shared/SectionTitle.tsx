import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type SectionTitleProps = {
  id?: string;
  index: string;
  eyebrow: string;
  title: string;
  accent: string;
  align?: "left" | "center";
  className?: string;
};

/** Surtitre numéroté + titre serif avec un mot en italique dégradé. */
export function SectionTitle({ id, index, eyebrow, title, accent, align = "left", className }: SectionTitleProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <Reveal>
        <p className="eyebrow">
          {index} — {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 id={id} className="h-section mt-4 text-prune-950">
          {title} <em className="text-signature pr-[0.08em] italic">{accent}</em>
        </h2>
      </Reveal>
    </div>
  );
}
