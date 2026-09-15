import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'Portfolio', href: '#properties' },
  { label: '3D Showcase', href: '#showcase' },
  { label: 'Developments', href: '#projects' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Services', href: '#services' },
  { label: 'Locations', href: '#locations' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E5E1D8]/80 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.03)]'
            : 'bg-transparent border-b border-white/[0.08] py-6'
        }`}
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between">
            {/* Brand Logotype */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
              className="group flex flex-col items-start leading-none"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`text-[13px] font-semibold tracking-[0.28em] transition-colors duration-400 ${
                    scrolled ? 'text-[#17181C]' : 'text-white'
                  }`}
                >
                  SECURESTAY
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] inline-block opacity-80" />
              </div>
              <span
                className={`text-[8px] font-medium tracking-[0.42em] mt-1 transition-colors duration-400 ${
                  scrolled ? 'text-[#8E9199]' : 'text-white/60'
                }`}
              >
                REAL ESTATES
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-9">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`text-[12px] font-medium tracking-[0.08em] uppercase transition-colors duration-300 relative py-1 ${
                    scrolled
                      ? 'text-[#5A5D64] hover:text-[#0E2519]'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Private Advisory CTA & Mobile Hamburger */}
            <div className="flex items-center gap-4">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-[11px] font-medium tracking-[0.15em] uppercase rounded-[2px] transition-all duration-400 border ${
                  scrolled
                    ? 'border-[#0E2519] bg-[#0E2519] text-[#FAF9F5] hover:bg-transparent hover:text-[#0E2519]'
                    : 'border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-[#17181C] hover:border-white'
                }`}
              >
                <span>Private Consultation</span>
                <ArrowUpRight size={13} strokeWidth={1.5} />
              </a>

              <button
                onClick={() => setMobileOpen(true)}
                className={`lg:hidden p-2 transition-colors ${
                  scrolled ? 'text-[#17181C]' : 'text-white'
                }`}
                aria-label="Open menu"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      <div
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-400 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[320px] bg-[#FAF9F5] z-[101] shadow-2xl transition-transform duration-500 ease-out lg:hidden flex flex-col justify-between ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between px-7 py-6 border-b border-[#E5E1D8]">
            <div className="flex flex-col leading-none">
              <span className="text-[13px] font-semibold tracking-[0.25em] text-[#17181C]">
                SECURESTAY
              </span>
              <span className="text-[7.5px] font-medium tracking-[0.4em] text-[#8E9199] mt-1">
                REAL ESTATES
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 text-[#17181C] hover:text-[#0E2519]"
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex flex-col px-7 py-8 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="text-[13px] font-medium tracking-[0.1em] uppercase text-[#17181C] hover:text-[#C5A880] transition-colors py-2 border-b border-[#E5E1D8]/50"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="p-7 border-t border-[#E5E1D8]">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            className="btn-editorial w-full text-center"
          >
            Private Consultation
          </a>
        </div>
      </div>
    </>
  );
}
