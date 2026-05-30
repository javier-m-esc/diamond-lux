'use client';

import { RevealWrapper } from '@/components/ui/RevealWrapper';

const TESTIMONIALS = [
  {
    quote:  "I've had three cars detailed in Sydney over five years. Diamond Lux is in a different category entirely. The paint on my M4 looked factory-new. Genuinely, I didn't think it was possible.",
    name:   'James R.',
    detail: 'BMW M4 Competition · Paint Correction + Ceramic',
    stars:  5,
  },
  {
    quote:  "What sold me was the written guarantee. Most detailers give verbal assurances and then disappear. These guys gave me a signed document. The coating is still performing flawlessly seven months on.",
    name:   'Sarah K.',
    detail: '2022 Porsche Cayenne · Ceramic Coating + Protection Plan',
    stars:  5,
  },
  {
    quote:  "Booked three months out — worth every week of waiting. They spent 14 hours on my GT3 RS. The hologram removal alone was worth the entire bill. The result is museum-quality.",
    name:   'Michael T.',
    detail: 'Porsche 911 GT3 RS · Full 3-Stage Correction',
    stars:  5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`} role="img">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 11 11" fill="#C8C4BC" aria-hidden>
          <path d="M5.5 0L7 3.5l3.8.6-2.8 2.7.7 3.8L5.5 8.8 2.3 10.6l.7-3.8L.2 4.1l3.8-.6z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      className="py-section-sm md:py-section bg-bg border-t border-border"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <RevealWrapper className="flex items-center gap-4 mb-6">
          <span className="w-8 h-px bg-accent" aria-hidden />
          <span className="text-accent text-label tracking-[0.25em] uppercase">Client Feedback</span>
        </RevealWrapper>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <RevealWrapper delay={0.06}>
            <h2
              id="testimonials-heading"
              className="font-display italic text-display-xl text-fg"
            >
              Straight from the clients.
            </h2>
          </RevealWrapper>
          <RevealWrapper delay={0.12} className="max-w-xs">
            <p className="text-fg-muted text-sm leading-relaxed">
              Unedited. Unfiltered. From people who've been through the process.
            </p>
          </RevealWrapper>
        </div>

        {/* Grid */}
        <div
          className="grid md:grid-cols-3 border border-border bg-border gap-px"
          role="list"
          aria-label="Client testimonials"
        >
          {TESTIMONIALS.map((t, i) => (
            <RevealWrapper
              key={t.name}
              delay={i * 0.1}
              direction="up"
              className="bg-bg p-8 md:p-10 flex flex-col"
              role="listitem"
            >
              <Stars count={t.stars} />

              <blockquote className="mt-6 flex-1">
                <p className="text-fg-muted text-sm leading-[1.85] text-pretty">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              <footer className="mt-8 pt-6 border-t border-border">
                <cite className="not-italic">
                  <p className="font-sans font-medium text-sm text-fg">{t.name}</p>
                  <p className="text-fg-muted text-xs mt-1 tracking-wide">{t.detail}</p>
                </cite>
              </footer>
            </RevealWrapper>
          ))}
        </div>

        {/* Trust indicators */}
        <RevealWrapper
          delay={0.2}
          className="mt-10 flex flex-wrap items-center gap-6 text-fg-muted text-xs tracking-wide"
        >
          <span className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-accent shrink-0" aria-hidden />
            5.0 average — 47 Google reviews
          </span>
          <span className="hidden sm:block w-px h-4 bg-border-light" aria-hidden />
          <span>All clients verified by appointment record</span>
        </RevealWrapper>
      </div>
    </section>
  );
}
