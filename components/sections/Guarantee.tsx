'use client';

import { RevealWrapper } from '@/components/ui/RevealWrapper';

const PILLARS = [
  {
    num:   '01',
    title: 'Perfect or We Rework It',
    body:  'If any swirl mark, buffer trail, or visible scratch remains after correction, we rebook at no cost. No negotiation. No fine print. Just done properly.',
    Icon:  () => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M8 11l2.5 2.5L14 8m6 3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
  {
    num:   '02',
    title: 'Written Guarantee Certificate',
    body:  'Every job leaves with a signed, dated certificate specifying the correction level achieved and the coating applied. Keep it — it is a legal document.',
    Icon:  () => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M9 12h6m-6 4h6m2 4H5a2 2 0 01-2-2V4a2 2 0 012-2h8l6 6v12a2 2 0 01-2 2z"/>
      </svg>
    ),
  },
  {
    num:   '03',
    title: '6-Month Protection Warranty',
    body:  'Every ceramic coating comes with a 6-month maintenance plan. We monitor performance and top it up as needed — included in your package price at no extra cost.',
    Icon:  () => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M11 20s8-4 8-10V4.5L11 2 3 4.5V10c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

export default function Guarantee() {
  return (
    <section
      id="guarantee"
      className="py-section-sm md:py-section bg-bg-secondary border-t border-border"
      aria-labelledby="guarantee-heading"
    >
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">

        {/* Label */}
        <RevealWrapper className="flex items-center gap-4 mb-14 md:mb-18">
          <span className="w-8 h-px bg-accent" aria-hidden />
          <span className="text-accent text-label tracking-[0.25em] uppercase">
            Maximum Correction Guarantee
          </span>
        </RevealWrapper>

        {/* Headline + body */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-16 md:mb-24">
          <RevealWrapper>
            <h2
              id="guarantee-heading"
              className="font-display italic text-display-xl text-fg leading-[0.94] text-balance"
            >
              We don&rsquo;t move on until
              the paint is{' '}
              <span className="text-accent">perfect.</span>
            </h2>
          </RevealWrapper>

          <RevealWrapper delay={0.12}>
            <p className="text-fg-muted leading-relaxed text-pretty mb-5">
              The Maximum Correction Guarantee isn't a marketing headline — it's the
              operational constraint that defines how we work. We will not begin a
              coating application on a surface that hasn't been fully corrected, and we
              will not release a vehicle until both you and we are satisfied.
            </p>
            <p className="text-fg-muted leading-relaxed text-pretty">
              This is only possible because of our volume cap. Eight clients per month
              means we never rush. We never cut corners. We never have to.
            </p>
          </RevealWrapper>
        </div>

        {/* Three pillars */}
        <div
          className="grid md:grid-cols-3 border border-border bg-border gap-px"
          role="list"
          aria-label="Guarantee pillars"
        >
          {PILLARS.map(({ num, title, body, Icon }, i) => (
            <RevealWrapper
              key={num}
              delay={i * 0.1}
              direction="up"
              className="bg-bg-secondary p-8 md:p-10"
              // eslint-disable-next-line jsx-a11y/no-redundant-roles
              role="listitem"
            >
              <span className="block text-accent mb-6">
                <Icon />
              </span>
              <span className="block text-label tracking-[0.18em] text-fg-muted uppercase mb-3">
                {num}
              </span>
              <h3 className="font-sans font-bold text-lg text-fg mb-4 leading-snug">
                {title}
              </h3>
              <p className="text-fg-muted text-sm leading-relaxed">{body}</p>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
