import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Design tokens ────────────────────────────────
      colors: {
        // ── Brand DNA palette ───────────────────────────
        // Void Black  #0A0A0A — primary background
        // Carbon      #1C1C1E — elevated surfaces / cards
        // Graphite    #2E2E32 — borders, dividers
        // Cold Silver #C8C4BC — body copy, secondary text
        // Raw Platinum #E8E4DC — headlines, logo, single precious accent
        // Mid         #555550 — muted labels on dark surfaces
        // Dim         #3A3A3E — very muted borders
        bg: {
          DEFAULT:   '#0A0A0A',   // Void Black
          secondary: '#1C1C1E',   // Carbon
          tertiary:  '#2E2E32',   // Graphite
        },
        fg: {
          DEFAULT: '#E8E4DC',     // Raw Platinum — headlines
          muted:   '#C8C4BC',     // Cold Silver — body copy
          subtle:  '#555550',     // Mid — muted labels
        },
        accent: {
          DEFAULT: '#E8E4DC',     // Raw Platinum — use once per composition
          light:   '#C8C4BC',     // Cold Silver
          glow:    'rgba(232,228,220,0.06)',
        },
        border: {
          DEFAULT: '#2E2E32',     // Graphite
          light:   '#3A3A3E',     // Dim
          accent:  'rgba(232,228,220,0.15)',
        },
      },
      // ── Typography — Brand DNA ───────────────────────
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        narrow:  ['var(--font-archivo-narrow)', 'system-ui', 'sans-serif'],
        sans:    ['var(--font-archivo)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid display scale
        'display-hero': ['clamp(4rem,9vw,9.5rem)',   { lineHeight: '0.88', letterSpacing: '-0.03em' }],
        'display-xl':   ['clamp(2.75rem,6vw,6rem)',  { lineHeight: '0.92', letterSpacing: '-0.025em' }],
        'display-lg':   ['clamp(1.875rem,4vw,4rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-md':   ['clamp(1.5rem,3vw,2.75rem)',{ lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'label':        ['0.6875rem', { lineHeight: '1', letterSpacing: '0.2em' }],
      },
      // ── Spacing ──────────────────────────────────────
      spacing: {
        section:    '10rem',
        'section-sm': '6rem',
        'section-xs': '4rem',
      },
      maxWidth: {
        site: '1440px',
      },
      // ── Easing ───────────────────────────────────────
      transitionTimingFunction: {
        'expo-out':   'cubic-bezier(0.16,1,0.3,1)',
        'expo-in':    'cubic-bezier(0.7,0,0.84,0)',
        'expo-inout': 'cubic-bezier(0.87,0,0.13,1)',
      },
      // ── Animations ───────────────────────────────────
      keyframes: {
        'pulse-soft': {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0.35' },
        },
      },
      animation: {
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
