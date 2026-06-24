import { Variants, TargetAndTransition, Transition } from 'framer-motion';

export const CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.1
    }
  }
};

export const CONTENT_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const BIG_CIRCLE_ANIMATE: TargetAndTransition = {
  scale: [1, 1.12, 1],
  y: [-8, 8, -8]
};

export const BIG_CIRCLE_TRANSITION: Transition = {
  duration: 12,
  repeat: Infinity,
  ease: 'easeInOut'
};

export const SQUARE_ANIMATE: TargetAndTransition = {
  rotate: [12, -12, 12],
  x: [0, 12, 0],
  y: [-15, 0, -15]
};

export const SQUARE_TRANSITION: Transition = {
  duration: 18,
  repeat: Infinity,
  ease: 'easeInOut'
} as const;

export const SMALL_CIRCLE_ANIMATE: TargetAndTransition = {
  scale: [1, 1.15, 1],
  rotate: [0, 8, 0]
};

export const SMALL_CIRCLE_TRANSITION: Transition = {
  duration: 9,
  repeat: Infinity,
  ease: 'easeInOut'
} as const;

export const DOT_ANIMATE: TargetAndTransition = {
  scale: [1, 1.4, 1],
  opacity: [0.6, 1, 0.6]
};

export const DOT_TRANSITION: Transition = {
  duration: 3,
  repeat: Infinity,
  ease: 'easeInOut'
};
