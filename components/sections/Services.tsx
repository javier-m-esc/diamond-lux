'use client';

import { RevealWrapper } from '@/components/ui/RevealWrapper';

const method = [
  {
    number: "01",
    title: "Sanding",
    text: "Controlled sanding is used when the paint requires deeper refinement. A precise correction method to level defects safely before polishing.",
  },
  {
    number: "02",
    title: "Buffing",
    text: "Machine correction restores clarity, depth and reflection by refining the surface. This is where the paint starts to recover its true finish.",
  },
  {
    number: "03",
    title: "Protection",
    text: "Once the correction is completed, the vehicle is protected with a professional IGL coating system to preserve the result.",
  },
];

export default function Services() {
  return (
    <section className="px-6 py-24 bg-[#0A0A0A] text-white border-t border-[#2E2E32]">
      <div className="mx-auto max-w-6xl">

        {/* ── Header row ───────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
            <RevealWrapper delay={0}>
              <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[#C8C4BC]">
                Signature Service
              </p>
            </RevealWrapper>
            <RevealWrapper delay={0.08}>
              <h2 className="text-4xl md:text-6xl font-light leading-[1.05] text-[#E8E4DC]">
                One service.<br />Real vehicle<br />protection.
              </h2>
            </RevealWrapper>
          </div>
          <RevealWrapper delay={0.14} className="max-w-xs">
            <p className="text-[#C8C4BC] text-sm leading-relaxed md:text-right">
              We do not sell packages. We provide one correction and protection
              process, applied correctly, every time.
            </p>
          </RevealWrapper>
        </div>

        {/* ── Full-width rule ──────────────────────────────── */}
        <div className="w-full h-px bg-[#2E2E32]" />

        {/* ── Two-column body ──────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-0 md:divide-x md:divide-[#2E2E32]">

          {/* Left — philosophy */}
          <div className="py-14 md:pr-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[#555550] mb-6">
              The Philosophy
            </p>
            <p className="text-[#C8C4BC] leading-[1.85] mb-6">
              The goal is not to make the vehicle look temporarily shiny.
              The goal is to correct the surface, refine the finish and
              protect the result with a professional coating system.
            </p>
            <p className="text-[#C8C4BC] leading-[1.85]">
              We do not hide defects with fillers or dressings. We correct
              what can be safely corrected and protect what has been
              properly restored.
            </p>

            {/* Thin frame callout */}
            <div className="mt-10 border border-[#E8E4DC]/15 p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-[#555550] mb-3">
                Not Rejuvenation
              </p>
              <p className="text-[#E8E4DC] font-light text-lg leading-snug">
                Correction over cosmetics.
              </p>
              <p className="mt-3 text-[#C8C4BC] text-sm leading-relaxed">
                Rejuvenation creates short-term gloss. Correction removes
                actual defects and preserves the result long-term.
              </p>
            </div>
          </div>

          {/* Right — method steps */}
          <div className="py-14 md:pl-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[#555550] mb-6">
              The Method
            </p>
            <h3 className="text-2xl font-light text-[#E8E4DC] mb-10">
              Sanding. Buffing. Protection.
            </h3>

            {method.map((step, i) => (
              <RevealWrapper key={step.number} delay={0.1 + i * 0.08}>
              <div
                className={`flex gap-6 py-6 ${i < method.length - 1 ? 'border-b border-[#2E2E32]' : ''}`}
              >
                <span className="text-[#555550] text-xs pt-1 shrink-0">{step.number}</span>
                <div>
                  <h4 className="text-[#E8E4DC] font-light mb-2">{step.title}</h4>
                  <p className="text-[#C8C4BC] text-sm leading-relaxed">{step.text}</p>
                </div>
              </div>
              </RevealWrapper>
            ))}
          </div>
        </div>

        {/* ── Full-width rule ──────────────────────────────── */}
        <div className="w-full h-px bg-[#2E2E32]" />

        {/* ── CTA row ─────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-10">
          <button className="border border-[#E8E4DC]/30 px-8 py-4 text-xs uppercase tracking-[0.25em] text-[#E8E4DC] hover:bg-[#E8E4DC] hover:text-[#0A0A0A] transition-colors duration-300">
            Request an Inspection
          </button>
          <p className="text-[#555550] text-xs tracking-wide">
            Every vehicle is assessed before work begins.
          </p>
        </div>

      </div>
    </section>
  );
}
