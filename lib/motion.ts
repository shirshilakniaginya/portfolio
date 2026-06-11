import type { Transition, Variants } from "framer-motion";

export const easeOutQuint = [0.22, 1, 0.36, 1] as const;
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const revealViewport = {
  once: true,
  amount: 0.18,
} as const;

export function createFadeUpVariants(reducedMotion: boolean, distance = 24): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0 },
    };
  }

  return {
    hidden: { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0 },
  };
}

export function createCascadeTransition(duration = 0.72, delay = 0): Transition {
  return {
    duration,
    delay,
    ease: easeOutQuint,
  };
}
