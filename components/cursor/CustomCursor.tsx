'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

type CursorVariant = 'default' | 'hover' | 'drag' | 'hidden';

export function CustomCursor() {
  const [pos,     setPos]     = useState({ x: -200, y: -200 });
  const [variant, setVariant] = useState<CursorVariant>('default');
  const prefersReducedMotion  = useReducedMotion();

  const onMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  const onOver = useCallback((e: MouseEvent) => {
    const t = e.target as HTMLElement;
    if (t.closest('[data-cursor="drag"]'))   setVariant('drag');
    else if (t.closest('a,button,label,input,select,textarea,[data-cursor="hover"]'))
                                             setVariant('hover');
    else                                     setVariant('default');
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', () => setVariant('hidden'));
    document.documentElement.addEventListener('mouseenter', () => setVariant('default'));
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [onMove, onOver]);

  // Never render on touch/mobile or when reduced motion is preferred
  if (prefersReducedMotion) return null;

  const ringSize    = variant === 'drag' ? 60 : variant === 'hover' ? 44 : 30;
  const ringOpacity = variant === 'hidden' ? 0 : 1;

  return (
    <>
      {/* Lagging outer ring — spring physics */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block rounded-full border"
        style={{ borderColor: 'rgba(201,169,122,0.55)' }}
        animate={{
          x:       pos.x - ringSize / 2,
          y:       pos.y - ringSize / 2,
          width:   ringSize,
          height:  ringSize,
          opacity: ringOpacity,
          borderColor: variant === 'hover' ? 'rgba(201,169,122,0.9)' : 'rgba(201,169,122,0.45)',
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 24, mass: 0.5 }}
      />

      {/* Snapping center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block w-1.5 h-1.5 rounded-full bg-accent"
        animate={{
          x:       pos.x - 3,
          y:       pos.y - 3,
          opacity: variant === 'hidden' ? 0 : variant === 'hover' ? 0 : 1,
          scale:   variant === 'drag' ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 600, damping: 40, mass: 0.1 }}
      />

      {/* "DRAG" micro-label inside ring when over the before/after slider */}
      <AnimatePresence>
        {variant === 'drag' && (
          <motion.div
            key="drag-label"
            className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center"
            style={{ width: 60, height: 60 }}
            initial={{ opacity: 0 }}
            animate={{ x: pos.x - 30, y: pos.y - 30, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 24, mass: 0.5 }}
          >
            <span className="text-[7px] font-sans font-medium tracking-[0.25em] text-accent uppercase select-none">
              drag
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
