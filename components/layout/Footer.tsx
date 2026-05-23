const YEAR = new Date().getFullYear();

const LINKS = [
  { label: 'Promise',   href: '#promise'   },
  { label: 'Services',  href: '#services'  },
  { label: 'Results',   href: '#results'   },
  { label: 'Guarantee', href: '#guarantee' },
  { label: 'Booking',   href: '#booking'   },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16 py-14 md:py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">

          {/* Brand block */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-5 h-5 border border-accent/50 rotate-45" aria-hidden />
              <span className="font-sans font-medium text-label tracking-[0.25em] uppercase text-fg/75">
                Diamond Lux
              </span>
            </div>
            <p className="text-fg-muted text-sm leading-relaxed max-w-[22rem]">
              Sydney's premium paint correction & ceramic coating studio.
              Precision over volume. Eight clients per month. Full stop.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer navigation">
            {LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="font-sans text-fg-muted hover:text-fg text-sm tracking-wide transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-fg-muted text-xs tracking-wide">
            &copy; {YEAR} Diamond Lux. All rights reserved. Sydney, NSW, Australia.
          </p>
          <span className="flex items-center gap-2 text-fg-muted text-xs tracking-wide" aria-label="By appointment only">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" aria-hidden />
            By appointment only
          </span>
        </div>
      </div>
    </footer>
  );
}
