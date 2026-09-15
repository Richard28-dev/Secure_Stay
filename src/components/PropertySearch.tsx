import { useState } from 'react';
import { Search, MapPin, Building, Coins, BedDouble, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const locationOptions = ['All Locations', 'Bangalore', 'Hyderabad', 'Chennai', 'Mumbai', 'Pune', 'Goa'];
const propertyTypes = ['All Properties', 'Luxury Villa', 'Modern Penthouse', 'Waterfront Estate', 'Heritage Manor'];
const budgetRanges = ['Any Investment', '₹1.5 Cr – ₹3 Cr', '₹3 Cr – ₹6 Cr', '₹6 Cr – ₹12 Cr', '₹12 Cr+'];
const bedroomOptions = ['Any Bedrooms', '3 BHK Residence', '4 BHK Villa', '5+ BHK Grand Estate'];

export default function PropertySearch() {
  const [mode, setMode] = useState<'buy' | 'rent'>('buy');

  return (
    <section className="relative -mt-10 z-20 px-4 md:px-8">
      <div className="container-luxury">
        <ScrollReveal>
          <div className="bg-[#FAF9F5] border border-[#E5E1D8] shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2px] p-6 lg:p-9">
            {/* Top Bar: Mode Switch & Section Eyebrow */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#E5E1D8] gap-4">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
                <h3 className="text-[14px] font-semibold tracking-[0.15em] uppercase text-[#17181C]">
                  Curated Property Search
                </h3>
              </div>

              {/* Buy / Rent Switch */}
              <div className="inline-flex p-1 bg-[#F2EFE9] rounded-[2px] border border-[#E5E1D8]/80 self-start sm:self-auto">
                <button
                  onClick={() => setMode('buy')}
                  className={`px-5 py-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase rounded-[2px] transition-all duration-300 ${
                    mode === 'buy'
                      ? 'bg-[#0E2519] text-[#FAF9F5] shadow-sm'
                      : 'text-[#5A5D64] hover:text-[#17181C]'
                  }`}
                >
                  Acquisition
                </button>
                <button
                  onClick={() => setMode('rent')}
                  className={`px-5 py-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase rounded-[2px] transition-all duration-300 ${
                    mode === 'rent'
                      ? 'bg-[#0E2519] text-[#FAF9F5] shadow-sm'
                      : 'text-[#5A5D64] hover:text-[#17181C]'
                  }`}
                >
                  Lease / Rental
                </button>
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 items-end">
              {/* Location */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#8E9199] tracking-[0.2em] uppercase flex items-center gap-1.5">
                  <MapPin size={12} strokeWidth={1.5} className="text-[#C5A880]" />
                  Destination
                </label>
                <div className="relative">
                  <select className="w-full bg-[#FFFFFF] border border-[#E5E1D8] px-3.5 py-3 text-[13px] text-[#17181C] font-normal appearance-none cursor-pointer focus:outline-none focus:border-[#0E2519] transition-colors rounded-[2px]">
                    {locationOptions.map((loc) => (
                      <option key={loc}>{loc}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#8E9199]">
                    ▼
                  </div>
                </div>
              </div>

              {/* Property Type */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#8E9199] tracking-[0.2em] uppercase flex items-center gap-1.5">
                  <Building size={12} strokeWidth={1.5} className="text-[#C5A880]" />
                  Typology
                </label>
                <div className="relative">
                  <select className="w-full bg-[#FFFFFF] border border-[#E5E1D8] px-3.5 py-3 text-[13px] text-[#17181C] font-normal appearance-none cursor-pointer focus:outline-none focus:border-[#0E2519] transition-colors rounded-[2px]">
                    {propertyTypes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#8E9199]">
                    ▼
                  </div>
                </div>
              </div>

              {/* Price Scale */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#8E9199] tracking-[0.2em] uppercase flex items-center gap-1.5">
                  <Coins size={12} strokeWidth={1.5} className="text-[#C5A880]" />
                  Investment Scale
                </label>
                <div className="relative">
                  <select className="w-full bg-[#FFFFFF] border border-[#E5E1D8] px-3.5 py-3 text-[13px] text-[#17181C] font-normal appearance-none cursor-pointer focus:outline-none focus:border-[#0E2519] transition-colors rounded-[2px]">
                    {budgetRanges.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#8E9199]">
                    ▼
                  </div>
                </div>
              </div>

              {/* Bedrooms */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#8E9199] tracking-[0.2em] uppercase flex items-center gap-1.5">
                  <BedDouble size={12} strokeWidth={1.5} className="text-[#C5A880]" />
                  Configuration
                </label>
                <div className="relative">
                  <select className="w-full bg-[#FFFFFF] border border-[#E5E1D8] px-3.5 py-3 text-[13px] text-[#17181C] font-normal appearance-none cursor-pointer focus:outline-none focus:border-[#0E2519] transition-colors rounded-[2px]">
                    {bedroomOptions.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#8E9199]">
                    ▼
                  </div>
                </div>
              </div>

              {/* Search Action */}
              <div>
                <button
                  onClick={() => {
                    document.querySelector('#properties')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-editorial w-full py-3 h-[46px]"
                >
                  <Search size={14} strokeWidth={1.5} />
                  <span>View Portfolio</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
