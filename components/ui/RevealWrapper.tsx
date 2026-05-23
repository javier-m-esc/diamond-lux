'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade';

// Pull in only the safe HTML attributes that don't clash with Framer Motion
// (onAnimationStart et al. have incompatible signatures between React and FM).
type SafeHtmlProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  'role' | 'aria-label' | 'aria-labelledby' | 'aria-describedby' | 'aria-hidden' | 'id'
>;

type RevealWrapperProps = SafeHtmlProps & {
  children:   React.ReactNode;
  delay?:     number;
  duration?:  number;
  direction?: Direction;
  distance?:  number;
  className?: string;
  once?:      boolean;
  amount?:    number;
};

// Pixel offsets per direction
const OFFSET: Record<Direction, { x?: number; y?: number }> = {
  up:    { y:  32 },
  down:  { y: -32 },
  left:  { x:  32 },
  right: { x: -32 },
  fade:  {},
};

export function RevealWrapper({
  children,
  delay     = 0,
  duration  = 0.7,
  direction = 'up',
  distance,
  className,
  once   = true,
  amount = 0.1,
  ...htmlProps
}: RevealWrapperProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const prefersReduced = useReducedMotion();

  const baseOffset = OFFSET[direction];
  // Allow caller to override the travel distance
  const scaledOffset = distance
    ? Object.fromEntries(Object.entries(baseOffset).map(([k, v]) => [k, (v as number) > 0 ? distance : -distance]))
    : baseOffset;

  const hidden  = prefersReduced ? { opacity: 0 } : { opacity: 0, ...scaledOffset };
  const visible = prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{ hidden, visible }}
      transition={{
        delay,
        duration: prefersReduced ? 0.25 : duration,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(className)}
      {...htmlProps}
    >
      {children}
    </motion.div>
  );
}
