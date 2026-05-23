'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealWrapper } from '@/components/ui/RevealWrapper';
import { cn }            from '@/lib/utils';

const SERVICES = [
  {
    id:       '01',
    name:     'Paint Correction',
    tagline:  'Every swirl mark. Removed, not hidden.',
    price:    'From $850',
    description:
      'Multi-stage machine polishing that addresses oxidation, swirl marks, buffer trails, and light scratches at the paint level — not coated over. We use RUPES, Meguiar\'s, and Mirka cutting compounds calibrated to your specific paint type and hardness. Each panel is light-tested before coating begins.',
    includes: [
      'Single or multi-stage cut & polish',
      'Paint depth measurement (before & after)',
      '3M light tunnel inspection',
      'IPA wipe-down & full decontamination',
    ],
  },
  {
    id:       '02',
    name:     'Ceramic Coating',
    tagline:  'Pro-grade SiO₂ and graphene protection.',
    price:    'From $1,200',
    description:
      'Applied only to fully corrected paint. We use Gtechniq Crystal Serum Ultra, IGL Kenzo, and Nanolex Si3D professional-grade ceramic formulations — providing 5H+ hardness, hydrophobic self-cleaning properties, and UV & chemical resistance. This is a permanently bonded glass layer, not a consumer spray.',
    includes: [
      'Surface preparation & panel wipe',
      'Single or multi-layer application',
      'Infra-red curing acceleration',
      '2–5 year manufacturer warranty',
    ],
  },
  {
    id:       '03',
    name:     '6-Month Protection Plan',
    tagline:  'Your finish maintained. Indefinitely.',
    price:    'From $280 / 6 months',
    description:
      'A maintenance subscription that includes bi-monthly hand wash, maintenance top-coat application, and minor defect touch-ups between full correction cycles. We monitor and maintain your coating so it performs year after year — not just in the first month.',
    includes: [
      'Bi-monthly maintenance washes',
      'Top-coat rejuvenation treatment',
      'Minor defect correction (light scratches)',
      'Priority rebooking access',
    ],
  },
];

export default function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="py-section-sm md:py-section bg-bg border-t border-border"
      aria-labelledby="services-heading"
    >
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <RevealWrapper>
            <div className="flex items-center gap-4 mb-5">
              <span className="w-8 h-px bg-accent" aria-hidden />
              <span className="text-accent text-label tracking-[0.25em] uppercase">Services</span>
            </div>
            <h2
              id="services-heading"
              className="font-display italic text-display-xl text-fg text-balance"
            >
              What we do.
            </h2>
          </RevealWrapper>
          <RevealWrapper delay={0.12} className="max-w-xs">
            <p className="text-fg-muted leading-relaxed text-sm">
              Three services. No upselling, no padding. Each done to an exacting
              standard — or not at all.
            </p>
          </RevealWrapper>
        </div>

        {/* Accordion list */}
        <div className="border-t border-border" role="list">
          {SERVICES.map((svc, i) => {
            const isOpen = active === i;
            return (
              <RevealWrapper key={svc.id} delay={i * 0.07} direction="fade">
                <div
                  role="listitem"
                  className={cn(
                    'border-b border-border transition-colors duration-500',
                    isOpen ? 'bg-bg-secondary' : 'hover:bg-bg-secondary/40',
                  )}
                >
                  {/* Row header */}
                  <button
                    onClick={() => setActive(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`service-panel-${svc.id}`}
                    className="w-full flex items-start md:items-center justify-between gap-6 py-8 md:py-10 text-left group"
                  >
                    <div className="flex items-start md:items-center gap-6 md:gap-10 flex-1 min-w-0">
                      <span className="text-label tracking-[0.18em] text-fg-muted shrink-0 mt-1 md:mt-0">
                        {svc.id}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-sans font-bold text-xl md:text-2xl text-fg group-hover:text-accent transition-colors duration-300 mb-1 leading-snug">
                          {svc.name}
                        </h3>
                        <p className="text-fg-muted text-sm truncate">{svc.tagline}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-5 shrink-0">
                      <span className="hidden md:block text-accent text-sm font-medium">
                        {svc.price}
                      </span>
                      {/* Plus toggle */}
                      <span
                        aria-hidden
                        className="w-8 h-8 border border-border-light flex items-center justify-center text-fg-muted group-hover:border-accent/50 transition-colors duration-300"
                      >
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="block text-lg leading-none"
                        >
                          +
                        </motion.span>
                      </span>
                    </div>
                  </button>

                  {/* Expandable panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.section
                        id={`service-panel-${svc.id}`}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                        aria-label={`${svc.name} details`}
                      >
                        <div className="pb-10 md:pl-20 grid md:grid-cols-2 gap-8 md:gap-12">
                          <div>
                            <p className="text-fg-muted leading-relaxed text-sm md:text-base mb-5">
                              {svc.description}
                            </p>
                            <span className="block md:hidden text-accent font-medium text-sm">
                              {svc.price}
                            </span>
                          </div>
                          <ul className="space-y-3.5" aria-label="What's included">
                            {svc.includes.map((item) => (
                              <li key={item} className="flex items-start gap-3 text-sm text-fg-muted">
                                <span className="mt-[0.55em] w-4 h-px bg-accent shrink-0" aria-hidden />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.section>
                    )}
                  </AnimatePresence>
                </div>
              </RevealWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
