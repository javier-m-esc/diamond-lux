'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { RevealWrapper } from '@/components/ui/RevealWrapper';

export default function BeforeAfter() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const isDragging    = useRef(false);
  const [sliderPos, setSliderPos] = useState(42); // show more of the "after" side

  // ── Pointer helpers ────────────────────────────────────────────────────────
  const clampedPct = useCallback((clientX: number): number => {
    if (!containerRef.current) return sliderPos;
    const { left, width } = containerRef.current.getBoundingClientRect();
    return Math.max(2, Math.min(98, ((clientX - left) / width) * 100));
  }, [sliderPos]);

  const onMouseDown  = useCallback(() => { isDragging.current = true; }, []);
  const onMouseUp    = useCallback(() => { isDragging.current = false; }, []);
  const onMouseMove  = useCallback((e: MouseEvent) => {
    if (isDragging.current) setSliderPos(clampedPct(e.clientX));
  }, [clampedPct]);

  const onTouchStart = useCallback(() => { isDragging.current = true; }, []);
  const onTouchEnd   = useCallback(() => { isDragging.current = false; }, []);
  const onTouchMove  = useCallback((e: TouchEvent) => {
    if (!isDragging.current || !e.touches[0]) return;
    e.preventDefault(); // suppress page scroll while dragging
    setSliderPos(clampedPct(e.touches[0].clientX));
  }, [clampedPct]);

  useEffect(() => {
    window.addEventListener('mousemove',  onMouseMove);
    window.addEventListener('mouseup',    onMouseUp);
    window.addEventListener('touchmove',  onTouchMove,  { passive: false });
    window.addEventListener('touchend',   onTouchEnd);
    return () => {
      window.removeEventListener('mousemove',  onMouseMove);
      window.removeEventListener('mouseup',    onMouseUp);
      window.removeEventListener('touchmove',  onTouchMove);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, [onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

  // Keyboard accessibility for the slider handle
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft')  setSliderPos((p) => Math.max(2,  p - 2));
    if (e.key === 'ArrowRight') setSliderPos((p) => Math.min(98, p + 2));
  };

  return (
    <section
      id="results"
      className="py-section-sm md:py-section bg-bg border-t border-border"
      aria-labelledby="results-heading"
    >
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <RevealWrapper className="flex items-center gap-4 mb-5">
            <span className="w-8 h-px bg-accent" aria-hidden />
            <span className="text-accent text-label tracking-[0.25em] uppercase">Before &amp; After</span>
          </RevealWrapper>
          <RevealWrapper delay={0.1}>
            <h2
              id="results-heading"
              className="font-display italic text-display-xl text-fg text-balance mb-4"
            >
              The correction speaks for itself.
            </h2>
          </RevealWrapper>
          <RevealWrapper delay={0.18}>
            <p className="text-fg-muted text-sm md:text-base">
              Drag the handle — or use arrow keys — to reveal the transformation.
            </p>
          </RevealWrapper>
        </div>

        {/* ── Comparison slider ─────────────────────────────────────────────── */}
        <RevealWrapper direction="fade" duration={0.9}>
          <div
            ref={containerRef}
            data-cursor="drag"
            className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden select-none bg-bg-tertiary"
            role="img"
            aria-label={`Before and after paint correction. Comparison at ${Math.round(sliderPos)}%. Use the slider or arrow keys to compare.`}
          >
            {/* ── BEFORE image (always full-width behind) ──
                 TODO: Replace with next/image once /public/before-1.jpg is added.
                 Recommended: 1600×900px, your actual before shot.                ─────────────────────────────────────────────────────────── */}
            <div className="absolute inset-0">
              {/* Fallback gradient shown when image file is missing */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A1310] to-[#0D0B09] flex items-center justify-center">
                <span className="text-fg-muted/40 text-sm font-sans tracking-widest uppercase">before-1.jpg</span>
              </div>
              <img
                src="/before-1.jpg"
                alt="Before — paint showing swirl marks, micro-scratches and oxidation"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>

            {/* ── AFTER image (revealed left→right by slider) ──
                 TODO: Replace with next/image once /public/after-1.jpg is added.
                 Recommended: 1600×900px, same framing as before shot.            ─────────────────────────────────────────────────────────── */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2A1F0E] to-[#160F06] flex items-center justify-center">
                <span className="text-fg-muted/40 text-sm font-sans tracking-widest uppercase">after-1.jpg</span>
              </div>
              <img
                src="/after-1.jpg"
                alt="After — fully corrected paint with ceramic coating applied"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>

            {/* Labels */}
            <span className="absolute top-4 left-4 z-10 bg-bg/75 backdrop-blur-sm text-fg-muted text-[0.6875rem] px-3 py-1.5 tracking-[0.2em] uppercase font-medium">
              Before
            </span>
            <span
              className="absolute top-4 z-10 bg-accent/90 text-bg text-[0.6875rem] px-3 py-1.5 tracking-[0.2em] uppercase font-medium pointer-events-none"
              style={{ left: `calc(${sliderPos}% + 1rem)` }}
            >
              After
            </span>

            {/* Divider line */}
            <div
              className="absolute top-0 bottom-0 w-px bg-accent z-20 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
              aria-hidden
            />

            {/* Draggable handle */}
            <button
              className="absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              style={{ left: `${sliderPos}%` }}
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
              onKeyDown={onKeyDown}
              role="slider"
              aria-label="Comparison slider"
              aria-valuemin={2}
              aria-valuemax={98}
              aria-valuenow={Math.round(sliderPos)}
            >
              <div className="w-10 h-10 rounded-full bg-accent border-2 border-bg shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                {/* Left-right chevrons */}
                <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden>
                  <path
                    d="M1 5.5H15M1 5.5L4.5 2M1 5.5L4.5 9M15 5.5L11.5 2M15 5.5L11.5 9"
                    stroke="#0A0A0A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>
        </RevealWrapper>

        {/* Caption */}
        <RevealWrapper delay={0.2} className="mt-5 flex flex-col sm:flex-row gap-2 sm:gap-8 text-fg-muted/70 text-xs tracking-wide">
          <span>Vehicle: 2021 Porsche 911 Carrera S — Gentian Blue Metallic</span>
          <span className="text-fg-subtle">Service: 2-stage paint correction + Gtechniq Crystal Serum Ultra</span>
        </RevealWrapper>
      </div>
    </section>
  );
}
