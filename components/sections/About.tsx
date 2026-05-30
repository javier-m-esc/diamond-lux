import { RevealWrapper } from '@/components/ui/RevealWrapper';

export default function About() {
  return (
    <section className="px-6 py-24 bg-[#0A0A0A] text-white border-t border-[#2E2E32]">
      <div className="mx-auto max-w-6xl">

        <RevealWrapper delay={0}>
          <p className="mb-16 text-xs uppercase tracking-[0.35em] text-[#C8C4BC]">
            About
          </p>
        </RevealWrapper>

        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left — portrait */}
          <RevealWrapper direction="left" delay={0.05}>
            <div className="relative">
              <div className="aspect-[3/4] bg-[#1C1C1E] border border-[#2E2E32] overflow-hidden">
                {/* Replace with: <img src="/images/founder.jpg" ... /> */}
                <div className="absolute inset-0 flex items-end p-8">
                  <p className="text-[#3A3A3E] text-xs uppercase tracking-widest">
                    /images/founder.jpg
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-8 h-px bg-[#2E2E32]" />
                <span className="text-[#555550] text-xs uppercase tracking-[0.25em]">
                  Founder &nbsp;·&nbsp; Sydney, NSW
                </span>
              </div>
            </div>
          </RevealWrapper>

          {/* Right — copy */}
          <div className="flex flex-col justify-start">

            <RevealWrapper delay={0.12}>
              <h2 className="text-4xl md:text-5xl font-light leading-[1.1] text-[#E8E4DC] mb-10">
                One person.<br />One standard.
              </h2>
            </RevealWrapper>

            <RevealWrapper delay={0.18}>
              <div className="w-full h-px bg-[#2E2E32] mb-10" />
            </RevealWrapper>

            <div className="space-y-5 text-[#C8C4BC] leading-[1.85]">
              <RevealWrapper delay={0.22}>
                <p>
                  Diamond Lux was built from years of working with vehicles
                  that deserved more than a wash-and-wax. The craft came first —
                  understanding paint at a microscopic level, learning when to
                  cut, when to stop, and how to protect what has been properly
                  restored.
                </p>
              </RevealWrapper>
              <RevealWrapper delay={0.28}>
                <p>
                  The decision to cap bookings was not commercial. It was about
                  maintaining a standard that cannot survive volume. Eight clients
                  per month means every vehicle receives the same attention,
                  regardless of make or price.
                </p>
              </RevealWrapper>
              <RevealWrapper delay={0.34}>
                <p>
                  Every vehicle that leaves this studio has been assessed,
                  corrected and protected by one pair of hands. That is not a
                  limitation — it is the point.
                </p>
              </RevealWrapper>
            </div>

            <RevealWrapper delay={0.4}>
              <div className="mt-12 border-l border-[#2E2E32] pl-6">
                <blockquote className="text-[#E8E4DC] text-xl font-light italic leading-relaxed">
                  &ldquo;I do one thing. I do it at a level most people have
                  never seen. And it shows.&rdquo;
                </blockquote>
              </div>
            </RevealWrapper>

          </div>
        </div>

      </div>
    </section>
  );
}
