"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

type CounterProps = {
  value: number;
  suffix?: string;
  className?: string;
  active?: boolean;
  duration?: number;
};

/** Compteur animé de 0 à `value` quand il devient visible. */
export function Counter({ value, suffix = "", className, active, duration = 1.8 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const go = active ?? inView;
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!go) {
      mv.set(0);
      return;
    }
    const controls = animate(mv, value, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [go, value, mv, duration]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <motion.span aria-hidden data-counter={`${value}${suffix}`}>
        {display}
      </motion.span>
    </span>
  );
}
