import { RevealWrapper } from '@/components/ui/RevealWrapper';

export default function Trust() {
  return (
    <section className="px-6 py-24 bg-white text-black border-t border-black/10">
      <div className="mx-auto max-w-5xl text-center">

        <RevealWrapper delay={0}>
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-black/40">
            Why Trust Diamond Lux
          </p>
        </RevealWrapper>

        <RevealWrapper delay={0.1}>
          <h2 className="text-3xl md:text-5xl font-light leading-tight">
            Certified experience. Documented results. Boutique standards.
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-black/65 text-lg leading-relaxed">
            Built from professional detailing experience, paint correction knowledge and a commitment
            to treating every vehicle with intention — not volume pressure.
          </p>
        </RevealWrapper>

      </div>
    </section>
  );
}
