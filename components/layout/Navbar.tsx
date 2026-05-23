'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '@/components/providers/LenisProvider';
import { cn }       from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Promise',   href: '#promise'   },
  { label: 'Services',  href: '#services'  },
  { label: 'Results',   href: '#results'   },
  { label: 'Guarantee', href: '#guarantee' },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handle = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  const scrollTo = useCallback((href: string) => {
    setMobileOpen(false);
    if (lenis) {
      lenis.scrollTo(href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lenis]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-bg/88 backdrop-blur-xl border-b border-border'
            : 'bg-transparent',
        )}
      >
        <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16 h-16 md:h-20 flex items-center justify-between">

          {/* ── Logo ── */}
          <button
            onClick={() => scrollTo('#home')}
            aria-label="Diamond Lux — scroll to top"
            className="flex items-center gap-3 group"
          >
            {/* Diamond mark */}
            <span className="w-5 h-5 border border-accent/55 rotate-45 group-hover:border-accent group-hover:scale-110 transition-all duration-300" />
            <span className="font-sans font-medium text-label tracking-[0.25em] uppercase text-fg/85 group-hover:text-fg transition-colors duration-200">
              Diamond Lux
            </span>
          </button>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="relative font-sans text-[0.8125rem] tracking-wide text-fg-muted hover:text-fg transition-colors duration-200 group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300 ease-expo-out" />
              </button>
            ))}
          </nav>

          {/* ── CTA + hamburger ── */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo('#booking')}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 border border-accent/40 text-accent text-[0.8125rem] font-medium tracking-wide hover:border-accent hover:bg-accent/8 transition-all duration-300"
            >
              Reserve Slot
              <span className="text-xs opacity-70">→</span>
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="md:hidden relative w-8 h-8 flex flex-col justify-center gap-[5px]"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={cn(
                    'block h-px w-full bg-fg origin-center transition-all duration-300',
                    mobileOpen && i === 0 && 'rotate-45 translate-y-[6px]',
                    mobileOpen && i === 1 && 'opacity-0 scale-x-0',
                    mobileOpen && i === 2 && '-rotate-45 -translate-y-[6px]',
                  )}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-bg/96 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-10" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display italic text-display-md text-fg hover:text-accent transition-colors duration-300"
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.button
                onClick={() => scrollTo('#booking')}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 px-10 py-4 bg-accent text-bg font-medium tracking-wide text-sm hover:bg-accent-light transition-colors duration-300"
              >
                Reserve Your Slot
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
