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
        bg: {
          DEFAULT:   '#0A0A0A',
          secondary: '#111111',
          tertiary:  '#161616',
        },
        fg: {
          DEFAULT: '#F0EDE8',
          muted:   '#8A8580',
          subtle:  '#3A3835',
        },
        accent: {
          DEFAULT: '#C9A97A',
          dark:    '#A88552',
          light:   '#DFC49C',
          glow:    'rgba(201,169,122,0.12)',
        },
        border: {
          DEFAULT: '#1C1C1C',
          light:   '#262626',
          accent:  'rgba(201,169,122,0.22)',
        },
      },
      // ── Typography ───────────────────────────────────
      fontFamily: {
        display: ['var(--font-instrument)', 'Georgia', 'serif'],
        sans:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
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
