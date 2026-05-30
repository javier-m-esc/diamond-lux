import { RevealWrapper } from '@/components/ui/RevealWrapper';

const steps = [
  { number: "01", title: "Vehicle inspection" },
  { number: "02", title: "Paint condition assessment" },
  { number: "03", title: "Correction plan" },
  { number: "04", title: "Protection stage" },
  { number: "05", title: "Final delivery" },
];

export default function Process() {
  return (
    <section className="px-6 py-24 bg-white text-black border-t border-black/10">
      <div className="mx-auto max-w-6xl">

        {/* ── Header ───────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <RevealWrapper delay={0}>
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-black/40">
                Our Process
              </p>
            </RevealWrapper>
            <RevealWrapper delay={0.08}>
              <h2 className="text-4xl md:text-5xl font-light leading-tight text-black">
                Precision before polish.
              </h2>
            </RevealWrapper>
          </div>
          <RevealWrapper delay={0.14} className="max-w-xs">
            <p className="text-black/50 text-sm leading-relaxed md:text-right">
              Every vehicle follows the same sequence. No shortcuts, no skipped steps.
            </p>
          </RevealWrapper>
        </div>

        {/* ── Step list — staggered ─────────────────────────── */}
        <div className="border-t border-black/10">
          {steps.map((step, i) => (
            <RevealWrapper key={step.number} delay={i * 0.07} direction="up">
              <div className="flex items-baseline gap-8 py-7 border-b border-black/10 group">
                <span className="text-black/25 text-xs tracking-widest shrink-0 w-6">
                  {step.number}
                </span>
                <h3 className="text-xl md:text-2xl font-light text-black group-hover:translate-x-1 transition-transform duration-300">
                  {step.title}
                </h3>
              </div>
            </RevealWrapper>
          ))}
        </div>

      </div>
    </section>
  );
}
