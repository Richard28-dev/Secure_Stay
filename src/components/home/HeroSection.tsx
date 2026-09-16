import React, { useState } from 'react';
import { Search, MapPin, Home, IndianRupee, ArrowRight, ShieldCheck, PhoneCall, Sparkles, Bed } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import heroBgImage from '../../assets/images/luxury-terrace-hero-bg.jpg';

export default function HeroSection() {
  const { navigate } = useRouter();

  const [intent, setIntent] = useState<'buy' | 'rent'>('buy');
  const [locationInput, setLocationInput] = useState('');
  const [propertyType, setPropertyType] = useState('All Types');
  const [budget, setBudget] = useState('Any Budget');
  const [bedrooms, setBedrooms] = useState('any');
  const [isLocationFocused, setIsLocationFocused] = useState(false);

  const locationSuggestions = [
    { name: 'Whitefield', city: 'Bengaluru', count: '48 verified homes' },
    { name: 'Sarjapur Road', city: 'Bengaluru', count: '34 villas' },
    { name: 'Electronic City', city: 'Bengaluru', count: '52 apartments' },
    { name: 'Jubilee Hills', city: 'Hyderabad', count: '29 penthouses' },
    { name: 'Assagao', city: 'Goa', count: '18 heritage estates' },
    { name: 'Bandra West', city: 'Mumbai', count: '22 prime residences' },
    { name: 'Koregaon Park', city: 'Pune', count: '19 luxury apartments' },
    { name: 'Golf Course Road', city: 'Delhi NCR', count: '31 high-rise residences' },
  ];

  const filteredLocations = locationSuggestions.filter(
    (loc) =>
      loc.name.toLowerCase().includes(locationInput.toLowerCase()) ||
      loc.city.toLowerCase().includes(locationInput.toLowerCase())
  );

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params: Record<string, string> = { intent };
    if (locationInput.trim()) params.city = locationInput.trim();
    if (propertyType !== 'All Types') params.type = propertyType;
    if (bedrooms !== 'any') params.bedrooms = bedrooms;
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
      {/* Photorealistic Luxury Residence Terrace & Cityscape Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 pointer-events-none"
        style={{
          backgroundImage: `url('${heroBgImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
        }}
      >
        {/* Soft daylight readability overlay: brighter and cleaner on the left for text contrast, transparent on the right to show terrace & greenery */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/90 via-[#FAF8F5]/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-[#FAF8F5]/30" />
      </div>

      <div className="container-luxury relative z-10">
        {/* Main Grid: Left Content & Right High-End Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-12 lg:mb-16">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[6px] bg-[#E4ECE7] border border-[#0A2A1D]/15 text-[#0A2A1D] text-[12px] font-bold uppercase tracking-wider">
              <ShieldCheck size={15} className="text-[#0A2A1D]" />
              <span>Verified Real Estate</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#1A1E1C] tracking-tight leading-[1.1] font-heading">
              Find a place <br className="hidden sm:inline" />that <span className="text-[#0A2A1D]">feels like home.</span>
            </h1>

            <p className="text-[17px] text-[#57605B] leading-relaxed max-w-xl font-normal">
              Verified properties, trusted professionals and a simpler way to find your next home or investment.
            </p>

            {/* Direct CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => navigate('/buy')}
                className="btn-forest text-[15px] px-6 py-3.5 rounded-[8px] flex items-center gap-2 shadow-sm group"
              >
                <span>Explore Properties</span>
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => navigate('/contact')}
                className="btn-outline-forest text-[15px] px-6 py-3.5 rounded-[8px] bg-white flex items-center gap-2"
              >
                <PhoneCall size={16} className="text-[#0A2A1D]" />
                <span>Talk to an Expert</span>
              </button>
            </div>

            {/* Trust Badges Minimal Row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E5DFD5]">
              <div>
                <p className="text-xl font-bold text-[#0A2A1D] font-heading">500+</p>
                <p className="text-[12px] text-[#57605B] leading-tight mt-0.5">Verified Listings</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#0A2A1D] font-heading">100%</p>
                <p className="text-[12px] text-[#57605B] leading-tight mt-0.5">Legal Title Verified</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#0A2A1D] font-heading">10+ Yrs</p>
                <p className="text-[12px] text-[#57605B] leading-tight mt-0.5">Trusted Experience</p>
              </div>
            </div>
          </div>

          {/* Right Realistic High-Quality Real Estate Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[8px] overflow-hidden shadow-xl border border-[#E5DFD5] bg-white group">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                alt="Verified SecureStay Luxury Residence"
                className="w-full h-[380px] sm:h-[440px] lg:h-[460px] object-cover group-hover:scale-102 transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-[6px] bg-[#0A2A1D]/90 backdrop-blur-md text-[#FDFBF7] text-[11px] font-semibold border border-[#C5A880]/30 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#C5A880]" />
                <span>Verified Residency · Bengaluru</span>
              </div>
            </div>
          </div>
        </div>

        {/* Practical Real Estate Property Search Panel */}
        <div className="bg-white rounded-[8px] shadow-lg border border-[#E5DFD5] p-5 sm:p-6 transition-shadow hover:shadow-xl">
          {/* Intent Tabs */}
          <div className="flex items-center justify-between mb-4 border-b border-[#E5DFD5] pb-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIntent('buy')}
                className={`px-4 py-1.5 rounded-[6px] text-[13px] font-semibold transition-all cursor-pointer ${
                  intent === 'buy'
                    ? 'bg-[#0A2A1D] text-[#FDFBF7]'
                    : 'text-[#57605B] hover:text-[#1A1E1C] hover:bg-[#F4EFE6]'
                }`}
              >
                Buy a Home
              </button>
              <button
                type="button"
                onClick={() => setIntent('rent')}
                className={`px-4 py-1.5 rounded-[6px] text-[13px] font-semibold transition-all cursor-pointer ${
                  intent === 'rent'
                    ? 'bg-[#0A2A1D] text-[#FDFBF7]'
                    : 'text-[#57605B] hover:text-[#1A1E1C] hover:bg-[#F4EFE6]'
                }`}
              >
                Rent a Home
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-[12px] text-[#0A2A1D] font-semibold bg-[#E4ECE7] px-2.5 py-1 rounded-[4px]">
              <Sparkles size={13} />
              <span>Direct Database Search</span>
            </div>
          </div>

          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-end">
            {/* Field 1: Location with Autocomplete */}
            <div className="lg:col-span-3 relative">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#57605B] mb-1.5">
                Location
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#57605B]" />
                <input
                  type="text"
                  placeholder="e.g. Whitefield, Sarjapur..."
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  onFocus={() => setIsLocationFocused(true)}
                  onBlur={() => setTimeout(() => setIsLocationFocused(false), 200)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#FDFBF7] border border-[#E5DFD5] rounded-[6px] text-[13.5px] text-[#1A1E1C] placeholder-[#8C938E] focus:outline-none focus:border-[#0A2A1D] transition-colors"
                />
              </div>

              {/* Autocomplete Dropdown */}
              {isLocationFocused && filteredLocations.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#E5DFD5] rounded-[8px] shadow-xl z-50 max-h-56 overflow-y-auto py-1">
                  {filteredLocations.map((loc) => (
                    <button
                      key={loc.name}
                      type="button"
                      onMouseDown={() => {
                        setLocationInput(loc.name);
                        setIsLocationFocused(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-[#FDFBF7] flex items-center justify-between text-[13px] text-[#1A1E1C] cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-[#0A2A1D]" />
                        <span className="font-semibold">{loc.name}</span>
                        <span className="text-[#8C938E] text-[12px]">({loc.city})</span>
                      </div>
                      <span className="text-[11px] text-[#0A2A1D] font-medium bg-[#E4ECE7] px-2 py-0.5 rounded">
                        {loc.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Field 2: Property Type */}
            <div className="lg:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#57605B] mb-1.5">
                Property Type
              </label>
              <div className="relative">
                <Home size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#57605B]" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full pl-9 pr-7 py-2.5 bg-[#FDFBF7] border border-[#E5DFD5] rounded-[6px] text-[13.5px] text-[#1A1E1C] focus:outline-none focus:border-[#0A2A1D] transition-colors cursor-pointer appearance-none"
                >
                  <option value="All Types">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Estate">Estate</option>
                </select>
              </div>
            </div>

            {/* Field 3: Price Range */}
            <div className="lg:col-span-3">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#57605B] mb-1.5">
                Price Range
              </label>
              <div className="relative">
                <IndianRupee size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#57605B]" />
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full pl-9 pr-7 py-2.5 bg-[#FDFBF7] border border-[#E5DFD5] rounded-[6px] text-[13.5px] text-[#1A1E1C] focus:outline-none focus:border-[#0A2A1D] transition-colors cursor-pointer appearance-none"
                >
                  <option value="Any Budget">Any Budget</option>
                  <option value="Under ₹1 Cr">Under ₹1.0 Cr</option>
                  <option value="₹1 Cr - ₹2.5 Cr">₹1.0 Cr – ₹2.5 Cr</option>
                  <option value="₹2.5 Cr - ₹5 Cr">₹2.5 Cr – ₹5.0 Cr</option>
                  <option value="₹5 Cr+">₹5.0 Cr & Above</option>
                </select>
              </div>
            </div>

            {/* Field 4: Bedrooms */}
            <div className="lg:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#57605B] mb-1.5">
                Bedrooms
              </label>
              <div className="relative">
                <Bed size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#57605B]" />
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full pl-9 pr-7 py-2.5 bg-[#FDFBF7] border border-[#E5DFD5] rounded-[6px] text-[13.5px] text-[#1A1E1C] focus:outline-none focus:border-[#0A2A1D] transition-colors cursor-pointer appearance-none"
                >
                  <option value="any">Any BHK</option>
                  <option value="2">2+ BHK</option>
                  <option value="3">3+ BHK</option>
                  <option value="4">4+ BHK</option>
                  <option value="5">5+ BHK</option>
                </select>
              </div>
            </div>

            {/* Field 5: Search Action */}
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#0A2A1D] hover:bg-[#133D2B] text-[#FDFBF7] font-semibold text-[13.5px] rounded-[6px] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <Search size={16} />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Quick Popular Locations */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-[#E5DFD5]/60 text-[12px] text-[#57605B]">
            <span className="font-semibold text-[#1A1E1C]">Popular searches:</span>
            {locationSuggestions.slice(0, 5).map((loc) => (
              <button
                key={loc.name}
                type="button"
                onClick={() => {
                  setLocationInput(loc.name);
                  navigate('/search', { city: loc.name, intent });
                }}
                className="px-2.5 py-1 rounded-[4px] bg-[#F4EFE6] hover:bg-[#E5DFD5] text-[#1A1E1C] transition-colors cursor-pointer"
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
