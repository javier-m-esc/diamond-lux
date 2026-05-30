'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade';

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

const OFFSET: Record<Direction, { x?: number; y?: number }> = {
  up:    { y:  24 },
  down:  { y: -24 },
  left:  { x:  24 },
  right: { x: -24 },
  fade:  {},
};

export function RevealWrapper({
  children,
  delay     = 0,
  duration  = 0.9,
  direction = 'up',
  distance,
  className,
  once   = true,
  amount = 0.12,
  ...htmlProps
}: RevealWrapperProps) {
  const ref          = useRef<HTMLDivElement>(null);
  const isInView     = useInView(ref, { once, amount });
  const prefersReduced = useReducedMotion();

  const baseOffset  = OFFSET[direction];
  const scaledOffset = distance
    ? Object.fromEntries(
        Object.entries(baseOffset).map(([k, v]) => [
          k,
          (v as number) > 0 ? distance : -distance,
        ])
      )
    : baseOffset;

  const hidden  = prefersReduced ? { opacity: 0 } : { opacity: 0, ...scaledOffset };
  const visible = prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{ hidden, visible }}
      transition={
        prefersReduced
          ? { duration: 0.2 }
          : {
              // Spring physics — organic deceleration, no bounce
              type:      'spring',
              stiffness: 60,
              damping:   22,
              mass:      0.8,
              delay,
            }
      }
      className={cn(className)}
      {...htmlProps}
    >
      {children}
    </motion.div>
  );
}
