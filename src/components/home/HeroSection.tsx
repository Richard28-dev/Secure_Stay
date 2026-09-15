import React, { useState } from 'react';
import { Search, MapPin, Home, IndianRupee, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export default function HeroSection() {
  const { navigate } = useRouter();

  const [intent, setIntent] = useState<'buy' | 'rent'>('buy');
  const [locationInput, setLocationInput] = useState('');
  const [propertyType, setPropertyType] = useState('All Types');
  const [budget, setBudget] = useState('Any Budget');

  const locationSuggestions = ['Bangalore', 'Whitefield', 'Sarjapur', 'Electronic City', 'Hyderabad', 'Goa', 'Mumbai'];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params: Record<string, string> = { intent };
    if (locationInput.trim()) params.city = locationInput.trim();
    if (propertyType !== 'All Types') params.type = propertyType;
    if (budget !== 'Any Budget') {
      if (budget === 'Under ₹1 Cr') params.maxPrice = '10000000';
      if (budget === '₹1 Cr - ₹2.5 Cr') {
        params.minPrice = '10000000';
        params.maxPrice = '25000000';
      }
      if (budget === '₹2.5 Cr - ₹5 Cr') {
        params.minPrice = '25000000';
        params.maxPrice = '50000000';
      }
      if (budget === '₹5 Cr+') params.minPrice = '50000000';
    }
    navigate('/search', params);
  };

  return (
    <section className="relative w-full pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#FAF8F5]">
      {/* Background Subtle Gradient & Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#0E2A1E_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="container-luxury relative z-10">
        {/* Main Grid: Left Content & Right High-End Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-12 lg:mb-16">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[6px] bg-[#E8EFE8] border border-[#0E2A1E]/15 text-[#0E2A1E] text-[12px] font-semibold tracking-wide">
              <ShieldCheck size={16} className="text-[#0E2A1E]" />
              <span>100% Verified Real Estate & Clear Title Assurance</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-[#1A1C1A] tracking-tight leading-[1.12] font-heading">
              Find a Place You'll Be <span className="text-[#0E2A1E]">Proud to Call Home.</span>
            </h1>

            <p className="text-[17px] text-[#5A605B] leading-relaxed max-w-xl font-normal">
              Explore carefully selected homes and properties with a team that makes your property journey simple and secure.
            </p>

            {/* Direct CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => navigate('/buy')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[8px] bg-[#0E2A1E] hover:bg-[#163A29] text-[#FAF8F5] text-[15px] font-semibold tracking-normal transition-all shadow-sm cursor-pointer group"
              >
                <span>Explore Properties</span>
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[8px] border border-[#0E2A1E]/30 hover:border-[#0E2A1E] bg-white hover:bg-[#F3EFEA] text-[#1A1C1A] text-[15px] font-semibold transition-all cursor-pointer"
              >
                <PhoneCall size={16} className="text-[#0E2A1E]" />
                <span>Talk to an Expert</span>
              </button>
            </div>

            {/* Trust Badges Minimal Row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E5E0D8]">
              <div>
                <p className="text-xl font-bold text-[#0E2A1E] font-heading">500+</p>
                <p className="text-[12px] text-[#5A605B] leading-tight mt-0.5">Verified Listings</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#0E2A1E] font-heading">0%</p>
                <p className="text-[12px] text-[#5A605B] leading-tight mt-0.5">Legal Risk Guarantee</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#0E2A1E] font-heading">10+ Yrs</p>
                <p className="text-[12px] text-[#5A605B] leading-tight mt-0.5">Market Advisory</p>
              </div>
            </div>
          </div>

          {/* Right Realistic High-Quality Real Estate Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[8px] overflow-hidden shadow-2xl border border-[#E5E0D8] bg-white">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                alt="Architectural Modern Luxury Residence"
                className="w-full h-[400px] sm:h-[460px] lg:h-[480px] object-cover"
                loading="eager"
              />
              
              {/* Subtle Natural Gradient Overlay at Bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A1E]/80 via-transparent to-transparent opacity-90" />

              {/* Verified Property Callout Card */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-[8px] bg-white/95 backdrop-blur-sm border border-white/40 shadow-lg flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0E2A1E]">Featured Residence</span>
                  </div>
                  <h3 className="text-[16px] font-bold text-[#1A1C1A] leading-tight">The Grand Oak Sanctuary Villa</h3>
                  <p className="text-[13px] text-[#5A605B]">Whitefield, Bangalore · 4 BHK · ₹4.85 Cr</p>
                </div>
                <button
                  onClick={() => navigate('/property/the-grand-oak-sanctuary-villa')}
                  className="px-3.5 py-2 rounded-[6px] bg-[#0E2A1E] text-white text-[13px] font-medium hover:bg-[#163A29] transition-colors whitespace-nowrap cursor-pointer"
                >
                  View Home
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Practical Real Estate Property Search Bar */}
        <div className="bg-white rounded-[8px] shadow-lg border border-[#E5E0D8] p-4 sm:p-6 transition-shadow hover:shadow-xl">
          {/* Intent Tabs */}
          <div className="flex items-center gap-2 mb-4 border-b border-[#E5E0D8] pb-3">
            <button
              onClick={() => setIntent('buy')}
              className={`px-4 py-1.5 rounded-[6px] text-[13px] font-semibold transition-all cursor-pointer ${
                intent === 'buy'
                  ? 'bg-[#0E2A1E] text-[#FAF8F5]'
                  : 'text-[#5A605B] hover:text-[#1A1C1A] hover:bg-[#F3EFEA]'
              }`}
            >
              Buy a Home
            </button>
            <button
              onClick={() => setIntent('rent')}
              className={`px-4 py-1.5 rounded-[6px] text-[13px] font-semibold transition-all cursor-pointer ${
                intent === 'rent'
                  ? 'bg-[#0E2A1E] text-[#FAF8F5]'
                  : 'text-[#5A605B] hover:text-[#1A1C1A] hover:bg-[#F3EFEA]'
              }`}
            >
              Rent a Home
            </button>
          </div>

          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-end">
            {/* Field 1: Location */}
            <div className="lg:col-span-4">
              <label className="block text-[12px] font-bold uppercase tracking-wider text-[#5A605B] mb-1.5">
                Location
              </label>
              <div className="relative">
                <MapPin size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A605B]" />
                <input
                  type="text"
                  placeholder="e.g. Whitefield, Bangalore, Goa..."
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-[6px] text-[14px] text-[#1A1C1A] placeholder-[#8C938E] focus:outline-none focus:border-[#0E2A1E] transition-colors"
                />
              </div>
            </div>

            {/* Field 2: Property Type */}
            <div className="lg:col-span-3">
              <label className="block text-[12px] font-bold uppercase tracking-wider text-[#5A605B] mb-1.5">
                Property Type
              </label>
              <div className="relative">
                <Home size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A605B]" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-[6px] text-[14px] text-[#1A1C1A] focus:outline-none focus:border-[#0E2A1E] transition-colors cursor-pointer appearance-none"
                >
                  <option value="All Types">All Property Types</option>
                  <option value="Apartment">Apartment / Flat</option>
                  <option value="Villa">Independent Villa</option>
                  <option value="Penthouse">Sky Penthouse</option>
                  <option value="Estate">Gated Estate</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#5A605B]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Field 3: Budget Range */}
            <div className="lg:col-span-3">
              <label className="block text-[12px] font-bold uppercase tracking-wider text-[#5A605B] mb-1.5">
                Budget
              </label>
              <div className="relative">
                <IndianRupee size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A605B]" />
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-[6px] text-[14px] text-[#1A1C1A] focus:outline-none focus:border-[#0E2A1E] transition-colors cursor-pointer appearance-none"
                >
                  <option value="Any Budget">Any Budget</option>
                  <option value="Under ₹1 Cr">Under ₹1.0 Crore</option>
                  <option value="₹1 Cr - ₹2.5 Cr">₹1.0 Cr – ₹2.5 Crore</option>
                  <option value="₹2.5 Cr - ₹5 Cr">₹2.5 Cr – ₹5.0 Crore</option>
                  <option value="₹5 Cr+">₹5.0 Crore & Above</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#5A605B]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Field 4: Search Action */}
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#0E2A1E] hover:bg-[#163A29] text-[#FAF8F5] font-semibold text-[14px] rounded-[6px] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <Search size={16} />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Quick Popular Locations */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-[#E5E0D8]/60 text-[12px] text-[#5A605B]">
            <span className="font-semibold text-[#1A1C1A]">Popular searches:</span>
            {locationSuggestions.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  setLocationInput(loc);
                  navigate('/search', { city: loc, intent });
                }}
                className="px-2.5 py-1 rounded-[4px] bg-[#F3EFEA] hover:bg-[#E5E0D8] text-[#1A1C1A] transition-colors cursor-pointer"
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
