import { RevealWrapper } from '@/components/ui/RevealWrapper';

export default function Problem() {
  return (
    <section className="px-6 py-24 bg-white text-black">
      <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-2 items-center">

        <RevealWrapper direction="left" delay={0}>
          <div className="relative overflow-hidden rounded-3xl bg-black aspect-[4/5]">
            <img
              src="/images/sanding-process.jpg"
              alt="Paint sanding process on a vehicle panel"
              className="h-full w-full object-cover"
            />
          </div>
        </RevealWrapper>

        <RevealWrapper direction="right" delay={0.1}>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-black/40">
              The Difference
            </p>

            <h2 className="text-3xl md:text-5xl font-light leading-tight">
              Shine fades. Real correction lasts.
            </h2>

            <div className="mt-8 space-y-5 text-black/70 text-lg leading-relaxed">
              <p>
                Most detailing services chase temporary gloss. Diamond Lux focuses on real paint
                refinement — removing defects properly before protection is applied.
              </p>
              <p>
                When the paint condition requires it, the process can include controlled sanding,
                machine correction and finishing refinement to achieve a deeper, cleaner and more
                durable result.
              </p>
            </div>
          </div>
        </RevealWrapper>

      </div>
    </section>
  );
}
