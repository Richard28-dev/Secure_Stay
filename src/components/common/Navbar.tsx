import { useState, useEffect } from 'react';
import { ShieldCheck, Heart, PlusCircle, Menu, X, ChevronDown, LogOut, LayoutDashboard, Briefcase, Search, User } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { useProperties } from '../../context/PropertyContext';

export default function Navbar() {
  const { currentPath, navigate } = useRouter();
  const { user, isAuthenticated, signOut, switchRole } = useAuth();
  const { savedPropertyIds } = useProperties();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Sanctuaries', path: '/search' },
    { label: 'Buy', path: '/buy' },
    { label: 'Lease', path: '/rent' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/#services' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNav = (path: string) => {
    if (path.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const id = path.replace('/#', '');
        const elem = document.getElementById(id);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(path);
    }
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E5DFD5] py-3'
          : 'bg-white/90 backdrop-blur-sm border-b border-[#E5DFD5]/80 py-4'
      }`}
    >
      <div className="container-luxury flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNav('/')}
          className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
        >
          <div className="w-9 h-9 rounded-[8px] bg-[#0A2A1D] flex items-center justify-center text-[#C5A880] shadow-xs group-hover:bg-[#133D2B] transition-colors">
            <ShieldCheck size={20} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <span className="text-[18px] font-bold tracking-tight text-[#0A2A1D] block font-heading leading-tight">
              SecureStay <span className="text-[#C5A880] font-normal text-[14px]">Real Estates</span>
            </span>
            <span className="text-[9.5px] uppercase tracking-[0.16em] text-[#57605B] font-medium block leading-none mt-0.5">
              Verified Residences & Land
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive =
              currentPath === link.path ||
              (link.path === '/buy' && currentPath === '/buy') ||
              (link.path === '/rent' && currentPath === '/rent');
            return (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`text-[13.5px] font-medium tracking-normal transition-colors cursor-pointer relative py-1 ${
                  isActive
                    ? 'text-[#0A2A1D] font-bold'
                    : 'text-[#57605B] hover:text-[#0A2A1D]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0A2A1D] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick Search Icon */}
          <button
            onClick={() => handleNav('/search')}
            className="p-2 text-[#57605B] hover:text-[#0A2A1D] hover:bg-[#F4EFE6] rounded-full transition-colors cursor-pointer"
            title="Search Sanctuaries"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {/* Saved Properties Heart Icon */}
          <button
            onClick={() => handleNav('/saved')}
            aria-label="Saved properties"
            title="Saved Properties"
            className="relative p-2 rounded-full hover:bg-[#F4EFE6] text-[#57605B] hover:text-[#0A2A1D] transition-colors cursor-pointer"
          >
            <Heart size={18} className={savedPropertyIds.length > 0 ? 'text-[#0A2A1D] fill-[#0A2A1D]' : ''} />
            {savedPropertyIds.length > 0 && (
              <span className="absolute 0 top-0.5 right-0.5 w-4 h-4 bg-[#0A2A1D] text-[#FDFBF7] font-bold text-[9.5px] rounded-full flex items-center justify-center shadow-xs">
                {savedPropertyIds.length}
              </span>
            )}
          </button>

          {/* List Property Subtle Button */}
          <button
            onClick={() => handleNav('/list-property')}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5DFD5] hover:border-[#0A2A1D] text-[#57605B] hover:text-[#0A2A1D] text-[12.5px] font-semibold transition-all cursor-pointer"
          >
            <PlusCircle size={14} className="text-[#0A2A1D]" />
            <span>List Property</span>
          </button>

          <div className="w-px h-5 bg-[#E5DFD5] mx-1" />

          {/* User Profile or Sign In Controls */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full hover:bg-[#F4EFE6] border border-[#E5DFD5] transition-colors cursor-pointer text-[#1A1E1C]"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#0A2A1D]"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#0A2A1D] text-[#FDFBF7] flex items-center justify-center text-[12px] font-bold">
                    <User size={14} />
                  </div>
                )}
                <span className="text-[13px] font-semibold max-w-[100px] truncate text-[#1A1E1C]">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown size={14} className="text-[#57605B]" />
              </button>

              {/* Profile Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white border border-[#E5DFD5] rounded-[10px] shadow-xl py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-2.5 border-b border-[#E5DFD5]">
                    <p className="text-[13px] font-bold text-[#1A1E1C] leading-tight">{user.name}</p>
                    <p className="text-[11px] text-[#57605B] truncate">{user.email}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => handleNav('/dashboard')}
                      className="w-full px-4 py-2 text-[13px] text-left text-[#1A1E1C] hover:bg-[#FDFBF7] flex items-center gap-2.5 cursor-pointer"
                    >
                      <LayoutDashboard size={15} className="text-[#0A2A1D]" />
                      <span>Dashboard</span>
                    </button>

                    <button
                      onClick={() => handleNav('/saved')}
                      className="w-full px-4 py-2 text-[13px] text-left text-[#1A1E1C] hover:bg-[#FDFBF7] flex items-center gap-2.5 cursor-pointer"
                    >
                      <Heart size={15} className="text-[#0A2A1D]" />
                      <span>Saved Properties ({savedPropertyIds.length})</span>
                    </button>

                    <button
                      onClick={() => handleNav('/dashboard?tab=enquiries')}
                      className="w-full px-4 py-2 text-[13px] text-left text-[#1A1E1C] hover:bg-[#FDFBF7] flex items-center gap-2.5 cursor-pointer"
                    >
                      <Briefcase size={15} className="text-[#0A2A1D]" />
                      <span>My Enquiries</span>
                    </button>

                    {/* Role Switcher */}
                    <div className="px-4 py-2 border-t border-[#E5DFD5] mt-1">
                      <span className="text-[10px] uppercase font-bold text-[#57605B] tracking-wider block mb-1">
                        Active Mode
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => switchRole('buyer')}
                          className={`flex-1 py-1 rounded-[4px] text-[11px] font-medium transition-all ${
                            user.role === 'buyer'
                              ? 'bg-[#0A2A1D] text-white font-bold'
                              : 'bg-[#F4EFE6] text-[#57605B] hover:bg-[#E4ECE7]'
                          }`}
                        >
                          Client
                        </button>
                        <button
                          onClick={() => switchRole('agent')}
                          className={`flex-1 py-1 rounded-[4px] text-[11px] font-medium transition-all ${
                            user.role === 'agent'
                              ? 'bg-[#0A2A1D] text-white font-bold'
                              : 'bg-[#F4EFE6] text-[#57605B] hover:bg-[#E4ECE7]'
                          }`}
                        >
                          Advisor
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#E5DFD5] pt-1">
                    <button
                      onClick={() => {
                        signOut();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-[13px] text-left text-[#DC2626] hover:bg-red-50 flex items-center gap-2.5 cursor-pointer font-medium"
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => handleNav('/signin')}
                className="px-3 py-1.5 text-[13px] font-medium text-[#57605B] hover:text-[#0A2A1D] transition-colors cursor-pointer"
              >
                Sign In
              </button>

              <button
                onClick={() => handleNav('/contact')}
                className="btn-forest px-4 py-2 rounded-full text-[13px] font-semibold transition-all cursor-pointer shadow-xs hover:shadow"
              >
                Private Advisory
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2.5">
          <button
            onClick={() => handleNav('/saved')}
            className="p-2 text-[#1A1E1C] relative"
            aria-label="Saved properties"
          >
            <Heart size={20} className={savedPropertyIds.length > 0 ? 'text-[#0A2A1D] fill-[#0A2A1D]' : ''} />
            {savedPropertyIds.length > 0 && (
              <span className="absolute 0 top-1 right-1 w-4 h-4 bg-[#0A2A1D] text-white font-bold text-[9px] rounded-full flex items-center justify-center">
                {savedPropertyIds.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-[#F4EFE6] text-[#1A1E1C] focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E5DFD5] px-6 py-5 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`text-left text-[15px] font-medium py-1.5 transition-colors ${
                  currentPath === link.path ? 'text-[#0A2A1D] font-bold' : 'text-[#57605B]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E5DFD5] flex flex-col gap-2.5">
            <button
              onClick={() => handleNav('/list-property')}
              className="w-full py-2.5 rounded-full border border-[#0A2A1D] text-[#0A2A1D] text-[13.5px] font-semibold flex items-center justify-center gap-2"
            >
              <PlusCircle size={16} />
              <span>List Your Property</span>
            </button>

            <button
              onClick={() => handleNav('/contact')}
              className="w-full py-2.5 rounded-full bg-[#0A2A1D] text-[#FDFBF7] text-[13.5px] font-semibold shadow-xs"
            >
              Private Advisory Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
