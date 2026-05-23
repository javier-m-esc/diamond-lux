'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLenis } from '@/components/providers/LenisProvider';

const WORDS = ['Precision.', 'Protection.', 'Perfection.'];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lenis    = useLenis();
  const reduced  = useReducedMotion();

  // Lazy-load video after first paint — avoids blocking LCP
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) video.load(); }, { threshold: 0 });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const go = (href: string) => {
    if (lenis) lenis.scrollTo(href);
    else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-svh flex flex-col justify-end overflow-hidden bg-bg"
      aria-label="Diamond Lux — hero"
    >
      {/* ── Background video ─────────────────────────────────────────────────
           Replace /hero.mp4  with your actual video file (ideally 1920×1080, H.264).
           Replace /hero-poster.jpg with a representative still frame.           ─────────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          style={{ opacity: 0.38 }}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/hero-poster.jpg"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Gradients — keep text legible over any footage */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/65 to-bg/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/60 via-transparent to-transparent" />
      </div>

      {/* ── Content ──────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-site mx-auto w-full px-6 md:px-10 lg:px-16 pb-16 md:pb-28">

        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-4 mb-10 md:mb-14"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="w-8 h-px bg-accent" aria-hidden />
          <span className="text-accent text-label tracking-[0.28em] uppercase font-medium">
            Premium Studio — Sydney, Australia
          </span>
        </motion.div>

        {/* Main headline — each word slides up from behind a clip mask */}
        <h1 className="mb-10 md:mb-14" aria-label={WORDS.join(' ')}>
          {WORDS.map((word, i) => (
            <div key={word} className="overflow-hidden leading-[0.88]">
              <motion.span
                className="block font-display italic text-display-hero text-fg"
                initial={reduced ? { opacity: 0 } : { y: '108%', opacity: 0 }}
                animate={reduced ? { opacity: 1 } : { y: '0%',    opacity: 1 }}
                transition={{
                  delay:    0.55 + i * 0.18,
                  duration: reduced ? 0.4 : 1.15,
                  ease:     [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </h1>

        {/* Sub-copy + CTAs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-16">
          <motion.p
            className="max-w-sm text-fg-muted text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Sydney's most precise paint correction and ceramic coating studio.
            We accept{' '}
            <strong className="text-fg font-medium">8 clients per month.</strong>{' '}
            Not one more.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Primary CTA */}
            <button
              onClick={() => go('#booking')}
              className="group flex items-center gap-3 px-8 py-4 bg-accent text-bg font-medium tracking-wide text-sm hover:bg-accent-light transition-colors duration-300"
            >
              Reserve Your Slot
              <span className="group-hover:translate-x-1.5 transition-transform duration-300" aria-hidden>→</span>
            </button>

            {/* Ghost CTA */}
            <button
              onClick={() => go('#promise')}
              className="text-fg-muted hover:text-fg text-sm tracking-wide underline underline-offset-4 decoration-fg-subtle transition-colors duration-300"
            >
              Our approach
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 right-6 md:right-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          aria-hidden
        >
          <span className="text-fg-muted text-[0.6rem] tracking-[0.25em] uppercase rotate-90 origin-right mb-6">
            Scroll
          </span>
          <span className="block w-px h-10 bg-gradient-to-b from-transparent to-fg-muted/50 animate-pulse-soft" />
        </motion.div>
      </div>

      {/* Fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent z-10 pointer-events-none" aria-hidden />
    </section>
  );
}
