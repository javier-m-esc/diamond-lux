'use client';

import { RevealWrapper } from '@/components/ui/RevealWrapper';

const STATS = [
  { value: '12–16', label: 'hrs per vehicle' },
  { value: '8',     label: 'slots per month' },
  { value: '100%',  label: 'correction rate' },
];

export default function ProblemPromise() {
  return (
    <section
      id="promise"
      className="py-section-sm md:py-section bg-bg"
      aria-labelledby="promise-heading"
    >
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">

        {/* Section label */}
        <RevealWrapper className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="w-8 h-px bg-accent" aria-hidden />
          <span className="text-accent text-label tracking-[0.25em] uppercase">
            The Problem &amp; Our Promise
          </span>
        </RevealWrapper>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 lg:gap-32">

          {/* ── Problem ─────────────────────────────────── */}
          <div>
            <RevealWrapper delay={0.08}>
              <span className="block text-label tracking-[0.2em] uppercase text-fg-muted mb-6">
                01 — The Problem
              </span>
            </RevealWrapper>
            <RevealWrapper delay={0.16}>
              <h2
                id="promise-heading"
                className="font-display italic text-display-lg text-fg leading-[1.02] mb-8 text-balance"
              >
                Most detailers hide damage. We remove it.
              </h2>
            </RevealWrapper>
            <RevealWrapper delay={0.24}>
              <p className="text-fg-muted leading-relaxed text-pretty mb-5">
                The industry standard is to polish over swirl marks, fill scratches
                with filler wax, and coat a surface that was never properly corrected.
                Six months later, the damage is back — and so is your bill.
              </p>
            </RevealWrapper>
            <RevealWrapper delay={0.3}>
              <p className="text-fg-muted leading-relaxed text-pretty">
                High-volume shops can't afford to spend 12–16 hours on a single car.
                We do. That's the entire model.
              </p>
            </RevealWrapper>
          </div>

          {/* ── Promise ─────────────────────────────────── */}
          <div>
            <RevealWrapper delay={0.12}>
              <span className="block text-label tracking-[0.2em] uppercase text-fg-muted mb-6">
                02 — Our Promise
              </span>
            </RevealWrapper>
            <RevealWrapper delay={0.2}>
              <h2 className="font-display italic text-display-lg text-accent leading-[1.02] mb-8 text-balance">
                Maximum correction. Guaranteed in writing.
              </h2>
            </RevealWrapper>
            <RevealWrapper delay={0.28}>
              <p className="text-fg-muted leading-relaxed text-pretty mb-5">
                We correct every last scratch. We protect every surface with pro-grade
                ceramic coatings. And we put it all in writing — including a commitment
                to rework any section that doesn't meet our standard.
              </p>
            </RevealWrapper>
            <RevealWrapper delay={0.34}>
              <p className="text-fg-muted leading-relaxed text-pretty">
                One car at a time. Eight clients per month. Full stop.
              </p>
            </RevealWrapper>

            {/* Stats row */}
            <RevealWrapper delay={0.44} className="mt-12 pt-10 border-t border-border grid grid-cols-3 gap-6">
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <p className="font-display italic text-3xl md:text-4xl text-accent mb-1.5">{value}</p>
                  <p className="text-fg-muted text-[0.6875rem] tracking-[0.15em] uppercase">{label}</p>
                </div>
              ))}
            </RevealWrapper>
          </div>

        </div>
      </div>
    </section>
  );
}
