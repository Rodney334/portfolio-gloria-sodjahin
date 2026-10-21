"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Respecte automatiquement « réduire les animations » du système. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
