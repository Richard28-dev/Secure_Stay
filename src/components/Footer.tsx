import { ArrowUpRight } from 'lucide-react';

const footerLinks = {
  portfolio: [
    { label: 'Curated Residences', href: '#properties' },
    { label: 'Signature Masterplans', href: '#projects' },
    { label: '3D Architectural Views', href: '#showcase' },
    { label: 'Urban & Coastal Estates', href: '#locations' },
  ],
  services: [
    { label: 'Private Acquisitions', href: '#services' },
    { label: 'Portfolio Asset Structuring', href: '#services' },
    { label: 'Architectural Appraisal', href: '#services' },
    { label: 'Bespoke Advisory', href: '#contact' },
  ],
  locations: [
    { label: 'Bengaluru', href: '#locations' },
    { label: 'Mumbai', href: '#locations' },
    { label: 'Hyderabad', href: '#locations' },
    { label: 'Goa Coast', href: '#locations' },
  ],
  governance: [
    { label: 'Discretion & Privacy', href: '#' },
    { label: 'Terms of Representation', href: '#' },
    { label: 'Regulatory Filings', href: '#' },
  ],
};

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090D11] text-[#FAF9F5] border-t border-white/10 pt-20 pb-12">
      <div className="container-luxury">
        {/* Main Footer Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Editorial Column (4 cols) */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[14px] font-semibold tracking-[0.28em] text-[#FAF9F5]">
                SECURESTAY
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            </div>
            <span className="text-[8px] font-medium tracking-[0.42em] text-[#8E9199] block mb-6">
              REAL ESTATES · PRIVATE CLIENT GROUP
            </span>

            <p className="text-[13.5px] text-[#8E9199] leading-[1.8] font-light max-w-sm mb-8">
              Curating exceptional architectural residences, heritage estates, and landmark developments for discerning patrons across India.
            </p>

            {/* Newsletter Input */}
            <div className="max-w-sm">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#C5A880] font-semibold block mb-2">
                Private Journal Subscription
              </span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/5 border border-white/15 px-3.5 py-2.5 text-[12px] text-[#FAF9F5] placeholder:text-[#8E9199] focus:outline-none focus:border-[#C5A880] flex-1 rounded-l-[2px]"
                />
                <button className="bg-[#0E2519] border border-[#0E2519] text-[#FAF9F5] px-4 py-2.5 text-[10px] tracking-[0.15em] uppercase font-semibold hover:bg-[#C5A880] hover:text-[#090D11] transition-colors rounded-r-[2px]">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Nav Columns (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#FAF9F5] mb-5">
                Portfolio
              </h4>
              <ul className="space-y-3">
                {footerLinks.portfolio.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                      className="text-[12.5px] text-[#8E9199] hover:text-[#FAF9F5] transition-colors font-light"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#FAF9F5] mb-5">
                Services
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                      className="text-[12.5px] text-[#8E9199] hover:text-[#FAF9F5] transition-colors font-light"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#FAF9F5] mb-5">
                Destinations
              </h4>
              <ul className="space-y-3">
                {footerLinks.locations.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                      className="text-[12.5px] text-[#8E9199] hover:text-[#FAF9F5] transition-colors font-light"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#FAF9F5] mb-5">
                Governance
              </h4>
              <ul className="space-y-3">
                {footerLinks.governance.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[12.5px] text-[#8E9199] hover:text-[#FAF9F5] transition-colors font-light"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8E9199] font-light">
          <div>
            © {new Date().getFullYear()} SecureStay Real Estates Private Client Group. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Find a Place. Build a Future.</span>
            <span className="text-[#C5A880]">·</span>
            <span>RERA Registered</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
