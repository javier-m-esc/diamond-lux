import type { Metadata } from 'next';
import { DM_Sans, Instrument_Serif } from 'next/font/google';
import './globals.css';

import { LenisProvider } from '@/components/providers/LenisProvider';
import { CustomCursor }  from '@/components/cursor/CustomCursor';
import Navbar            from '@/components/layout/Navbar';
import Footer            from '@/components/layout/Footer';

// ── Fonts ────────────────────────────────────────────────────────────────────
// DM Sans: body, UI, labels, buttons — clean geometric grotesque
const dmSans = DM_Sans({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '700'],
  variable: '--font-dm-sans',
  display:  'swap',
});

// Instrument Serif: hero display text — precise editorial serif
const instrumentSerif = Instrument_Serif({
  subsets:  ['latin'],
  weight:   '400',
  style:    ['normal', 'italic'],
  variable: '--font-instrument',
  display:  'swap',
});

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title:       'Diamond Lux — Premium Paint Correction & Ceramic Coating, Sydney',
  description: "Sydney's most precise paint correction and ceramic coating studio. Boutique, by-appointment detailing with a Maximum Correction Guarantee. Limited to 8 clients per month.",
  keywords:    ['paint correction Sydney', 'ceramic coating Sydney', 'car detailing Sydney', 'premium detailing', 'Diamond Lux'],
  openGraph: {
    title:       'Diamond Lux — Premium Detailing, Sydney',
    description: 'Boutique paint correction & ceramic coating with a Maximum Correction Guarantee.',
    type:        'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <body className="bg-bg text-fg antialiased">
        <LenisProvider>
          {/* Custom cursor — hidden on touch/mobile via CSS */}
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
