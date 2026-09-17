import { useState } from 'react';
import { Search, MapPin, Home, IndianRupee, ArrowRight, PhoneCall, Trees, Sparkles, ShieldCheck, Waves, Mountain, Sun, Flower2 } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import heroBgImage from '../../assets/images/luxury-terrace-hero-bg.jpg';

export default function HeroSection() {
  const { navigate } = useRouter();

  const [intent, setIntent] = useState<'buy' | 'rent'>('buy');
  const [locationInput, setLocationInput] = useState('');
  const [propertyType, setPropertyType] = useState('All Types');
  const [budget, setBudget] = useState('Any Budget');
  const [isLocationFocused, setIsLocationFocused] = useState(false);

  const locationSuggestions = [
    { name: 'Assagao', city: 'North Goa', count: '18 heritage villas' },
    { name: 'Coorg', city: 'Karnataka', count: '12 forest estates' },
    { name: 'Alibaug', city: 'Maharashtra', count: '15 waterfront retreats' },
    { name: 'Sarjapur & Whitefield', city: 'Bengaluru', count: '34 green enclaves' },
    { name: 'Jubilee Hills', city: 'Hyderabad', count: '24 private sanctuaries' },
    { name: 'Kodaikanal', city: 'Tamil Nadu', count: '9 hillside estates' },
    { name: 'Bandra West', city: 'Mumbai', count: '19 coastal residences' },
  ];

  const atmosphereFilters = [
    { label: 'Assagao Villas', icon: Waves, city: 'Goa', type: 'Villa' },
    { label: 'Coorg Forest Estates', icon: Mountain, city: 'Coorg', type: 'Estate' },
    { label: 'Courtyard Homes', icon: Flower2, type: 'Villa' },
    { label: 'Sky Penthouses', icon: Sun, type: 'Penthouse' },
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
    <section className="relative w-full pt-36 pb-24 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-36 overflow-hidden bg-[#FAF8F5]">
      {/* High-Resolution Architectural Background with Balanced Daylight Vignette */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 pointer-events-none"
        style={{
          backgroundImage: `url('${heroBgImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Crisp, layered gradient: gives readable text contrast while letting the high-res terrace view shine */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/92 via-[#FAF8F5]/60 to-[#FAF8F5]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(250,248,245,0.4)_0%,rgba(250,248,245,0.85)_80%)]" />
      </div>

      <div className="container-luxury relative z-10">
        {/* Editorial Centered Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6 mb-12 sm:mb-14">
          {/* Top Subtle Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#0A2A1D]/15 text-[#0A2A1D] text-[12px] font-bold tracking-wider shadow-xs backdrop-blur-md">
            <Sparkles size={14} className="text-[#C5A880]" />
            <span>Curated Sanctuary Estates & Private Villas</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[4.35rem] font-bold text-[#1A1E1C] tracking-tight leading-[1.08] font-heading">
            Sanctuaries crafted for <br className="hidden sm:inline" />
            <span className="text-[#0A2A1D] italic font-serif">calm, light, and living well.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-[19px] text-[#4A544F] leading-relaxed max-w-2xl mx-auto font-normal">
            Private pool villas, serene forest retreats, and light-filled courtyard residences curated across India’s most tranquil landscapes.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => navigate('/buy')}
              className="btn-forest text-[15px] px-7 py-3.5 rounded-[8px] flex items-center gap-2 shadow-sm group cursor-pointer hover:shadow-md transition-all"
            >
              <span>Explore Sanctuaries</span>
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="btn-outline-forest text-[15px] px-7 py-3.5 rounded-[8px] bg-white/95 flex items-center gap-2 cursor-pointer shadow-xs hover:shadow transition-all"
            >
              <PhoneCall size={16} className="text-[#0A2A1D]" />
              <span>Book Private Advisory</span>
            </button>
          </div>

          {/* Trust Highlights Strip */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 pt-2 text-[12.5px] sm:text-[13px] text-[#4A544F] font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-[#0A2A1D]" />
              <span>100% Freehold & Title Verified</span>
            </span>
            <span className="hidden sm:inline text-[#C5A880]">•</span>
            <span className="flex items-center gap-1.5">
              <Trees size={16} className="text-[#0A2A1D]" />
              <span>Sub-35dB Acoustic Stillness</span>
            </span>
            <span className="hidden sm:inline text-[#C5A880]">•</span>
            <span className="flex items-center gap-1.5">
              <Sparkles size={16} className="text-[#0A2A1D]" />
              <span>Fiduciary Client Advisory</span>
            </span>
          </div>
        </div>

        {/* Ultra-Sleek Floating Search Capsule */}
        <div className="max-w-4xl mx-auto">
          {/* Understated Purchase / Lease Tabs */}
          <div className="flex items-center justify-center gap-8 mb-4">
            <button
              type="button"
              onClick={() => setIntent('buy')}
              className={`text-[14px] font-semibold tracking-wide transition-all pb-1 cursor-pointer border-b-2 ${
                intent === 'buy'
                  ? 'border-[#0A2A1D] text-[#0A2A1D]'
                  : 'border-transparent text-[#6B7570] hover:text-[#1A1E1C]'
              }`}
            >
              Purchase
            </button>
            <button
              type="button"
              onClick={() => setIntent('rent')}
              className={`text-[14px] font-semibold tracking-wide transition-all pb-1 cursor-pointer border-b-2 ${
                intent === 'rent'
                  ? 'border-[#0A2A1D] text-[#0A2A1D]'
                  : 'border-transparent text-[#6B7570] hover:text-[#1A1E1C]'
              }`}
            >
              Lease
            </button>
          </div>

          {/* Unified Floating Search Bar with Soft Glassmorphic Backdrop */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full border border-[#E5DFD5] shadow-xl hover:shadow-2xl transition-all duration-300 p-2 sm:p-2.5">
            <form
              onSubmit={handleSearchSubmit}
              className="flex flex-col sm:flex-row items-stretch sm:items-center divide-y sm:divide-y-0 sm:divide-x divide-[#E5DFD5]"
            >
              {/* Segment 1: Destination */}
              <div className="flex-1 min-w-[210px] px-4 py-2.5 sm:py-1 relative">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#7D8882] mb-0.5">
                  Destination
                </label>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A2A1D] shrink-0" />
                  <input
                    type="text"
                    placeholder="Where in India? (e.g. Assagao, Coorg...)"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    onFocus={() => setIsLocationFocused(true)}
                    onBlur={() => setTimeout(() => setIsLocationFocused(false), 200)}
                    className="w-full bg-transparent text-[14px] text-[#1A1E1C] placeholder-[#9AA5A0] focus:outline-none font-medium"
                  />
                </div>

                {/* Autocomplete Dropdown */}
                {isLocationFocused && filteredLocations.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-3 bg-white border border-[#E5DFD5] rounded-xl shadow-2xl z-50 max-h-56 overflow-y-auto py-1 animate-fadeIn">
                    {filteredLocations.map((loc) => (
                      <button
                        key={loc.name}
                        type="button"
                        onMouseDown={() => {
                          setLocationInput(loc.name);
                          setIsLocationFocused(false);
                        }}
                        className="w-full px-4 py-2.5 text-left hover:bg-[#FDFBF7] flex items-center justify-between text-[13px] text-[#1A1E1C] cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-[#0A2A1D]" />
                          <span className="font-semibold">{loc.name}</span>
                          <span className="text-[#8C938E] text-[12px]">({loc.city})</span>
                        </div>
                        <span className="text-[11px] text-[#0A2A1D] font-medium bg-[#E4ECE7] px-2 py-0.5 rounded-full">
                          {loc.count}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Segment 2: Estate Type */}
              <div className="px-4 py-2.5 sm:py-1 min-w-[170px]">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#7D8882] mb-0.5">
                  Estate Type
                </label>
                <div className="flex items-center gap-2">
                  <Home size={16} className="text-[#0A2A1D] shrink-0" />
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-transparent text-[14px] text-[#1A1E1C] focus:outline-none font-medium appearance-none cursor-pointer pr-4"
                  >
                    <option value="All Types">All Residences</option>
                    <option value="Villa">Private Villa</option>
                    <option value="Estate">Plantation Retreat</option>
                    <option value="Penthouse">Sky Penthouse</option>
                    <option value="Apartment">Courtyard Home</option>
                  </select>
                </div>
              </div>

              {/* Segment 3: Budget Range */}
              <div className="px-4 py-2.5 sm:py-1 min-w-[160px]">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#7D8882] mb-0.5">
                  Investment
                </label>
                <div className="flex items-center gap-2">
                  <IndianRupee size={15} className="text-[#0A2A1D] shrink-0" />
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-transparent text-[14px] text-[#1A1E1C] focus:outline-none font-medium appearance-none cursor-pointer pr-4"
                  >
                    <option value="Any Budget">Any Budget</option>
                    <option value="Under ₹1 Cr">Under ₹1.0 Cr</option>
                    <option value="₹1 Cr - ₹2.5 Cr">₹1.0 Cr – ₹2.5 Cr</option>
                    <option value="₹2.5 Cr - ₹5 Cr">₹2.5 Cr – ₹5.0 Cr</option>
                    <option value="₹5 Cr+">₹5.0 Cr & Above</option>
                  </select>
                </div>
              </div>

              {/* Segment 4: Search Button */}
              <div className="p-1 sm:p-1.5 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl sm:rounded-full bg-[#0A2A1D] hover:bg-[#133D2B] text-[#FDFBF7] font-semibold text-[14px] flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition-all cursor-pointer hover:scale-[1.02]"
                >
                  <Search size={16} />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick Atmosphere Filter Chips Below Search */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5">
            <span className="text-[12px] font-semibold text-[#6B7570] mr-1">Explore Atmospheres:</span>
            {atmosphereFilters.map((atm) => {
              const Icon = atm.icon;
              return (
                <button
                  key={atm.label}
                  type="button"
                  onClick={() => {
                    if (atm.city) setLocationInput(atm.city);
                    if (atm.type) setPropertyType(atm.type);
                    const params: Record<string, string | number | boolean> = { intent };
                    if (atm.city) params.city = atm.city;
                    if (atm.type) params.type = atm.type;
                    navigate('/search', params);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 hover:bg-white border border-[#E5DFD5] hover:border-[#0A2A1D]/40 text-[#1A1E1C] text-[12px] font-medium transition-all shadow-xs hover:shadow cursor-pointer"
                >
                  <Icon size={13} className="text-[#0A2A1D]" />
                  <span>{atm.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
