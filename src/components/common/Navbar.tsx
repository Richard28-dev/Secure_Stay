import { useState, useEffect } from 'react';
import { ShieldCheck, Heart, PlusCircle, Menu, X, ChevronDown, LogOut, LayoutDashboard, Briefcase, Search } from 'lucide-react';
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
    { label: 'Properties', path: '/buy' },
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
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/98 shadow-sm border-b border-[#E5E0D8] py-3.5'
          : 'bg-white/95 backdrop-blur-md border-b border-[#E5E0D8]/80 py-4'
      }`}
    >
      <div className="container-luxury flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNav('/')}
          className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
        >
          <div className="w-9 h-9 rounded-[8px] bg-[#0E2A1E] flex items-center justify-center text-[#C5A880] shadow-xs group-hover:bg-[#163A29] transition-colors">
            <ShieldCheck size={20} strokeWidth={2.2} />
          </div>
          <div className="text-left">
            <span className="text-[19px] font-bold tracking-tight text-[#0E2A1E] block font-heading leading-tight">
              SecureStay <span className="text-[#C5A880] font-normal text-[15px]">Real Estates</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.16em] text-[#5A605B] font-medium block leading-none mt-0.5">
              Verified Residences & Land
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path === '/buy' && (currentPath === '/buy' || currentPath === '/rent'));
            return (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`text-[14px] font-medium tracking-normal transition-colors cursor-pointer relative py-1 ${
                  isActive
                    ? 'text-[#0E2A1E] font-bold'
                    : 'text-[#5A605B] hover:text-[#0E2A1E]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0E2A1E] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & User Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick Search */}
          <button
            onClick={() => handleNav('/search')}
            className="p-2 text-[#5A605B] hover:text-[#0E2A1E] hover:bg-[#F3EFEA] rounded-[6px] transition-colors cursor-pointer"
            title="Search Properties"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {/* List a Property Button */}
          <button
            onClick={() => handleNav('/list-property')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] border border-[#0E2A1E]/30 text-[#0E2A1E] hover:bg-[#E8EFE8] text-[13px] font-semibold transition-all cursor-pointer"
          >
            <PlusCircle size={15} className="text-[#0E2A1E]" />
            <span>List Your Property</span>
          </button>

          {/* Saved Properties Icon */}
          <button
            onClick={() => handleNav('/saved')}
            aria-label="Saved properties"
            className="relative p-2 rounded-[8px] hover:bg-[#F3EFEA] text-[#5A605B] hover:text-[#0E2A1E] transition-colors cursor-pointer"
          >
            <Heart size={19} className={savedPropertyIds.length > 0 ? 'text-[#0E2A1E] fill-[#0E2A1E]' : ''} />
            {savedPropertyIds.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#0E2A1E] text-[#FAF8F5] font-bold text-[10px] rounded-full flex items-center justify-center shadow-xs">
                {savedPropertyIds.length}
              </span>
            )}
          </button>

          {/* User Profile / Auth Button */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-[8px] bg-[#F3EFEA] hover:bg-[#E8EFE8] border border-[#E5E0D8] transition-colors cursor-pointer text-[#1A1C1A]"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-[6px] object-cover border border-[#0E2A1E]"
                />
                <span className="text-[13px] font-semibold max-w-[100px] truncate text-[#1A1C1A]">{user.name}</span>
                <span className="px-1.5 py-0.5 rounded-[4px] bg-[#0E2A1E] text-white text-[9px] font-bold uppercase tracking-wider">
                  {user.role}
                </span>
                <ChevronDown size={14} className="text-[#5A605B]" />
              </button>

              {/* Profile Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white border border-[#E5DFD5] rounded-[8px] shadow-xl py-2 z-50 animate-fadeIn">
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
                      onClick={() => handleNav('/dashboard?tab=profile')}
                      className="w-full px-4 py-2 text-[13px] text-left text-[#1A1E1C] hover:bg-[#FDFBF7] flex items-center gap-2.5 cursor-pointer"
                    >
                      <ShieldCheck size={15} className="text-[#0A2A1D]" />
                      <span>My Profile</span>
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

                    <button
                      onClick={() => handleNav('/dashboard?tab=viewings')}
                      className="w-full px-4 py-2 text-[13px] text-left text-[#1A1E1C] hover:bg-[#FDFBF7] flex items-center gap-2.5 cursor-pointer"
                    >
                      <PlusCircle size={15} className="text-[#0A2A1D]" />
                      <span>My Appointments</span>
                    </button>

                    {/* Role Switcher */}
                    <div className="px-4 py-2 border-t border-[#E5DFD5] mt-1">
                      <span className="text-[10px] uppercase font-bold text-[#57605B] tracking-wider block mb-1">
                        Active Role
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
                          Buyer
                        </button>
                        <button
                          onClick={() => switchRole('agent')}
                          className={`flex-1 py-1 rounded-[4px] text-[11px] font-medium transition-all ${
                            user.role === 'agent'
                              ? 'bg-[#0A2A1D] text-white font-bold'
                              : 'bg-[#F4EFE6] text-[#57605B] hover:bg-[#E4ECE7]'
                          }`}
                        >
                          Agent
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
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav('/signin')}
                className="px-3.5 py-2 text-[13.5px] font-semibold text-[#1A1C1A] hover:text-[#0E2A1E] transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNav('/contact')}
                className="px-4 py-2 rounded-[8px] bg-[#0E2A1E] hover:bg-[#163A29] text-[#FAF8F5] text-[13px] font-semibold transition-all cursor-pointer shadow-xs"
              >
                Talk to an Expert
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => handleNav('/saved')}
            className="p-1.5 text-[#1A1C1A] relative"
            aria-label="Saved properties"
          >
            <Heart size={20} className={savedPropertyIds.length > 0 ? 'text-[#0E2A1E] fill-[#0E2A1E]' : ''} />
            {savedPropertyIds.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#0E2A1E] text-white font-bold text-[10px] rounded-full flex items-center justify-center">
                {savedPropertyIds.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-[6px] bg-[#F3EFEA] text-[#1A1C1A] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E5E0D8] px-6 py-5 space-y-4 shadow-lg">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`text-left text-[15px] font-medium py-1 ${
                  currentPath === link.path ? 'text-[#0E2A1E] font-bold' : 'text-[#5A605B]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E5E0D8] flex flex-col gap-2.5">
            <button
              onClick={() => handleNav('/list-property')}
              className="w-full py-2.5 rounded-[6px] border border-[#0E2A1E] text-[#0E2A1E] text-[13.5px] font-semibold flex items-center justify-center gap-2"
            >
              <PlusCircle size={16} />
              <span>List Your Property</span>
            </button>

            {isAuthenticated ? (
              <button
                onClick={() => handleNav('/dashboard')}
                className="w-full py-2.5 rounded-[6px] bg-[#0E2A1E] text-white text-[13.5px] font-semibold"
              >
                Go to Dashboard
              </button>
            ) : (
              <button
                onClick={() => handleNav('/contact')}
                className="w-full py-2.5 rounded-[6px] bg-[#0E2A1E] text-white text-[13.5px] font-semibold"
              >
                Talk to an Expert
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
