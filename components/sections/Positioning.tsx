import { RevealWrapper } from '@/components/ui/RevealWrapper';

export default function Positioning() {
  return (
    <section className="px-6 py-24 border-t border-[#2E2E32] bg-[#0A0A0A]">
      <div className="mx-auto max-w-5xl text-center">

        <RevealWrapper delay={0}>
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#C8C4BC]">
            Boutique Vehicle Preservation
          </p>
        </RevealWrapper>

        <RevealWrapper delay={0.08}>
          <h2 className="text-3xl md:text-5xl font-light leading-tight text-[#E8E4DC]">
            Correction. Not cosmetics.
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={0.16}>
          <p className="mx-auto mt-6 max-w-2xl text-[#C8C4BC] text-lg leading-relaxed">
            Diamond Lux is built for owners who value precision, depth and long-term protection —
            not rushed cosmetic shine.
          </p>
        </RevealWrapper>

      </div>
    </section>
  );
}
