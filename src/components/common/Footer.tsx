import React, { useState } from 'react';
import { ShieldCheck, Mail, ArrowRight, Phone, MapPin, CheckCircle } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { useProperties } from '../../context/PropertyContext';

export default function Footer() {
  const { navigate } = useRouter();
  const { showToast } = useProperties();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to SecureStay market briefings', 'success');
    setEmailInput('');
  };

  return (
    <footer className="bg-[#08100C] text-[#FAF8F5] border-t border-white/10 pt-16 pb-12">
      <div className="container-luxury">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Mission */}
          <div className="lg:col-span-4">
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 cursor-pointer mb-5"
            >
              <div className="w-8 h-8 rounded-[8px] bg-[#0E2A1E] border border-white/15 flex items-center justify-center text-[#C5A880] shadow-xs">
                <ShieldCheck size={18} strokeWidth={2.2} />
              </div>
              <span className="text-[20px] font-bold tracking-tight text-[#FAF8F5] font-heading">
                SecureStay <span className="text-[#C5A880] font-normal text-[16px]">Real Estates</span>
              </span>
            </div>

            <p className="text-[13.5px] text-[#A3B8A8] leading-relaxed mb-6 max-w-sm">
              The verified property platform for discerning buyers, renters, and owners. Engineered with rigorous title audits, physical inspections, and dedicated advisory.
            </p>

            <div className="flex flex-col gap-2.5 text-[13px] text-[#A3B8A8]">
              <div className="flex items-center gap-2.5">
                <MapPin size={15} className="text-[#C5A880] shrink-0" />
                <span>Level 7, Prestige Falcon Towers, Bengaluru</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#C5A880] shrink-0" />
                <span>+91 80 4910 8800 (Advisory Desk)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#C5A880] shrink-0" />
                <span>concierge@securestay.com</span>
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-[12px] uppercase font-bold tracking-wider text-[#C5A880] mb-4">
              Properties
            </h4>
            <ul className="space-y-2.5 text-[13.5px] text-[#A3B8A8]">
              <li>
                <button onClick={() => navigate('/buy')} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Buy Residences
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/rent')} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Luxury Rentals
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/search')} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Search Registry
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/list-property')} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  List Your Property
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/saved')} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Saved Properties
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[12px] uppercase font-bold tracking-wider text-[#C5A880] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-[13.5px] text-[#A3B8A8]">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  About SecureStay
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Verification Standards
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Contact Advisory
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/agent-dashboard')} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Agent Portal
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/dashboard')} className="hover:text-[#FAF8F5] transition-colors cursor-pointer">
                  Client Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Briefings */}
          <div className="lg:col-span-4">
            <h4 className="text-[12px] uppercase font-bold tracking-wider text-[#C5A880] mb-4">
              Curated Market Briefings
            </h4>
            <p className="text-[13px] text-[#A3B8A8] leading-relaxed mb-4">
              Receive verified market intelligence, off-market architectural listings, and regulatory insights monthly.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-[8px] bg-[#0E2A1E] border border-white/15 text-[13px] text-[#C5A880]">
                <CheckCircle size={16} className="text-[#C5A880]" />
                <span className="font-medium">You're subscribed to private market briefings.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-3.5 py-2.5 bg-[#0E2A1E] border border-white/15 rounded-[8px] text-[13.5px] text-[#FAF8F5] placeholder-[#6E8274] focus:outline-none focus:border-[#C5A880]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#C5A880] hover:bg-[#D4BC96] text-[#0E2A1E] font-bold text-[13px] rounded-[8px] transition-all flex items-center justify-center cursor-pointer shadow-xs"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[12.5px] text-[#6E8274]">
          <p>© {new Date().getFullYear()} SecureStay Real Estate Advisory. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/privacy')}
              className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate('/terms')}
              className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => navigate('/about')}
              className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
            >
              Verification Protocol
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
