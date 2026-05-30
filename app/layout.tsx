import type { Metadata } from 'next';
import { Cormorant_Garamond, Archivo, Archivo_Narrow } from 'next/font/google';
import './globals.css';

import { LenisProvider } from '@/components/providers/LenisProvider';
import { CustomCursor }  from '@/components/cursor/CustomCursor';
import Navbar            from '@/components/layout/Navbar';
import Footer            from '@/components/layout/Footer';

// ── Fonts — Brand DNA ────────────────────────────────────────────────────────
// Cormorant Garamond: display headlines — hair-thin strokes, editorial luxury
const cormorantGaramond = Cormorant_Garamond({
  subsets:  ['latin'],
  weight:   ['300', '400', '600'],
  style:    ['normal', 'italic'],
  variable: '--font-cormorant',
  display:  'swap',
});

// Archivo Narrow: labels, eyebrows, nav — industrial, wide-tracked
const archivNarrow = Archivo_Narrow({
  subsets:  ['latin'],
  weight:   ['400', '500', '600'],
  variable: '--font-archivo-narrow',
  display:  'swap',
});

// Archivo: body copy — light, generous line-height
const archivo = Archivo({
  subsets:  ['latin'],
  weight:   ['300', '400', '500'],
  variable: '--font-archivo',
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
    <html lang="en" className={`${cormorantGaramond.variable} ${archivNarrow.variable} ${archivo.variable}`}>
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
