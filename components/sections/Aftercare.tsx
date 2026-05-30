import { RevealWrapper } from '@/components/ui/RevealWrapper';

export default function Aftercare() {
  return (
    <section className="px-6 py-24 bg-white text-black border-t border-black/10">
      <div className="mx-auto max-w-5xl text-center">

        <RevealWrapper delay={0}>
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-black/40">
            Aftercare
          </p>
        </RevealWrapper>

        <RevealWrapper delay={0.1}>
          <h2 className="text-3xl md:text-5xl font-light leading-tight">
            The service does not end at delivery.
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={0.18}>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-black/70">
            Every corrected and protected vehicle includes complimentary maintenance
            washes during the first stage after delivery, helping preserve the finish
            properly while the coating settles and the vehicle enters its maintenance cycle.
          </p>
        </RevealWrapper>

        <RevealWrapper delay={0.24}>
          <div className="mt-12 inline-flex rounded-full border border-black/10 px-6 py-3 text-sm tracking-wide">
            Included with every correction service
          </div>
        </RevealWrapper>

      </div>
    </section>
  );
}
