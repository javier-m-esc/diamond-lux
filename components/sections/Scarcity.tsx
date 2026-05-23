'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLenis } from '@/components/providers/LenisProvider';

// ── Update these each month ─────────────────────────────────────────────────
const TOTAL_SLOTS   = 12;
const BOOKED_SLOTS  = 8;  // slots already taken
const DISPLAY_MONTH = 'May 2026';
// ───────────────────────────────────────────────────────────────────────────

const REMAINING    = TOTAL_SLOTS - BOOKED_SLOTS;
const PROGRESS_PCT = (BOOKED_SLOTS / TOTAL_SLOTS) * 100;

export default function Scarcity() {
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [count, setCount] = useState(0);
  const lenis    = useLenis();

  // Animated counter — runs once when section enters view
  useEffect(() => {
    if (!isInView) return;
    let rafId: number;
    let startTime: number | null = null;
    const DURATION = 1400;

    function step(ts: number) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / DURATION, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * REMAINING));
      if (progress < 1) rafId = requestAnimationFrame(step);
    }
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isInView]);

  const go = (href: string) => {
    if (lenis) lenis.scrollTo(href);
    else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="py-section-sm md:py-section bg-bg border-t border-accent/18"
      aria-label="Current availability"
    >
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">
        <div
          ref={ref}
          className="border border-border-accent bg-accent-glow p-10 md:p-16 lg:p-20"
        >
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">

            {/* ── Counter side ─────────────────────────── */}
            <div>
              <span className="block text-accent text-label tracking-[0.28em] uppercase mb-8">
                Availability — {DISPLAY_MONTH}
              </span>

              {/* The big number */}
              <div className="flex items-end gap-4 mb-2" aria-hidden>
                <span className="font-display italic text-[clamp(5.5rem,14vw,9.5rem)] leading-none text-accent">
                  {count}
                </span>
                <span className="font-sans text-fg-muted text-xl md:text-2xl pb-3 leading-tight">
                  slots<br />remaining
                </span>
              </div>
              {/* Screen-reader-only accessible version */}
              <p className="sr-only">
                {REMAINING} booking slots remaining for {DISPLAY_MONTH}.
              </p>

              {/* Progress bar */}
              <div className="mt-10">
                <div className="flex justify-between text-xs text-fg-muted mb-3 tracking-wide">
                  <span>{BOOKED_SLOTS} of {TOTAL_SLOTS} slots booked</span>
                  <span>{REMAINING} available</span>
                </div>
                <div className="h-px bg-border-light overflow-hidden" aria-hidden>
                  <motion.div
                    className="h-full bg-accent"
                    initial={{ width: '0%' }}
                    animate={isInView ? { width: `${PROGRESS_PCT}%` } : {}}
                    transition={{ delay: 0.5, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            </div>

            {/* ── CTA side ──────────────────────────────── */}
            <div>
              <p className="text-fg-muted leading-relaxed mb-4 text-pretty">
                We cap bookings at {TOTAL_SLOTS} per month — not as a sales tactic,
                but because each vehicle requires 12–16 hours of focused, unrushed work.
              </p>
              <p className="text-fg-muted leading-relaxed mb-10 text-pretty">
                When the month is full, it&rsquo;s full. Early enquiries receive written
                booking confirmations within 24&nbsp;hours.
              </p>

              <button
                onClick={() => go('#booking')}
                className="group flex items-center justify-center sm:justify-start gap-3 w-full sm:w-auto px-9 py-5 bg-accent text-bg font-medium tracking-wide text-sm hover:bg-accent-light transition-colors duration-300"
              >
                Secure Your Slot Now
                <span className="group-hover:translate-x-1.5 transition-transform duration-300" aria-hidden>→</span>
              </button>

              <p className="mt-4 text-fg-muted text-xs tracking-wide">
                No payment required to enquire. Confirmation within 24&nbsp;hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
