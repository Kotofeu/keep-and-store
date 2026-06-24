'use client';

import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  CONTAINER_VARIANTS,
  CONTENT_VARIANTS,
  BIG_CIRCLE_ANIMATE,
  BIG_CIRCLE_TRANSITION,
  SQUARE_ANIMATE,
  SQUARE_TRANSITION,
  SMALL_CIRCLE_ANIMATE,
  SMALL_CIRCLE_TRANSITION,
  DOT_ANIMATE,
  DOT_TRANSITION
} from '../lib';

interface ErrorPageTemplateProps {
  code: string;
  title: string;
  description: string;
  actions: ReactNode;
}

export const ErrorPageTemplate: FC<ErrorPageTemplateProps> = ({ code, title, description, actions }) => (
  <div className="custom-container flex flex-col items-center justify-center overflow-hidden">
    <motion.div
      className="relative flex flex-col items-center text-center"
      initial="hidden"
      animate="visible"
      variants={CONTAINER_VARIANTS}
    >
      <div
        aria-hidden="true"
        className="bg-accent-2/8 z-bg absolute top-1/2 left-1/2 h-70 w-70 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl sm:h-140 sm:w-140"
      />

      <motion.div
        aria-hidden="true"
        className="border-accent-3/15 z-bg absolute -top-12 -left-12 h-32 w-32 rounded-full border sm:-left-20 sm:h-40 sm:w-40"
        animate={BIG_CIRCLE_ANIMATE}
        transition={BIG_CIRCLE_TRANSITION}
      />

      <motion.div
        aria-hidden="true"
        className="border-accent-3/30 z-bg absolute -right-12 -bottom-12 h-28 w-28 rounded-2xl border sm:-right-16 sm:-bottom-14 sm:h-36 sm:w-36"
        animate={SQUARE_ANIMATE}
        transition={SQUARE_TRANSITION}
        style={{ transformOrigin: 'center' }}
      />

      <motion.div
        aria-hidden="true"
        className="border-accent-5/10 z-bg absolute top-1/3 -left-20 h-12 w-12 rounded-full border sm:-left-30 sm:h-15 sm:w-15"
        animate={SMALL_CIRCLE_ANIMATE}
        transition={SMALL_CIRCLE_TRANSITION}
      />

      <motion.div
        aria-hidden="true"
        className="bg-accent-2/60 z-bg ring-accent-2/20 absolute top-6 right-6 h-3 w-3 rounded-full ring-2 sm:top-0 sm:right-4"
        animate={DOT_ANIMATE}
        transition={{ ...DOT_TRANSITION, delay: 0 }}
      />

      <motion.div
        aria-hidden="true"
        className="bg-accent-2/10 z-bg ring-accent-2/40 absolute bottom-8 left-6 h-2 w-2 rounded-full ring-1 sm:bottom-2 sm:left-4"
        animate={DOT_ANIMATE}
        transition={{ ...DOT_TRANSITION, delay: 0.8 }}
      />

      <motion.div
        aria-hidden="true"
        className="bg-accent-2/50 z-bg ring-accent-2/30 absolute top-1/2 -right-6 h-2.5 w-2.5 rounded-full ring-1 sm:-right-8"
        animate={DOT_ANIMATE}
        transition={{ ...DOT_TRANSITION, delay: 1.6 }}
      />

      <motion.h1
        className="from-accent-4 to-accent-5 mb-4 bg-linear-to-b bg-clip-text text-7xl font-bold text-transparent sm:text-8xl md:text-9xl"
        variants={CONTENT_VARIANTS}
      >
        {code}
      </motion.h1>

      <motion.div
        aria-hidden="true"
        className="bg-accent-1/50 mb-6 h-1 w-20 rounded-full sm:w-28"
        variants={CONTENT_VARIANTS}
      />

      <motion.h2 className="text-foreground mb-2 text-2xl font-semibold sm:text-3xl" variants={CONTENT_VARIANTS}>
        {title}
      </motion.h2>

      <motion.p className="text-foreground/70 mb-8 max-w-xs sm:max-w-sm md:max-w-md" variants={CONTENT_VARIANTS}>
        {description}
      </motion.p>

      <motion.div variants={CONTENT_VARIANTS}>{actions}</motion.div>
    </motion.div>
  </div>
);
