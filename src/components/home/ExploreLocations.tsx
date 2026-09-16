import { MapPin, ArrowRight } from 'lucide-react';
import { initialLocations } from '../../data/locations';
import { useRouter } from '../../context/RouterContext';

export default function ExploreLocations() {
  const { navigate } = useRouter();

  const handleLocationClick = (cityName: string) => {
    navigate('/search', { city: cityName });
  };

  const primaryMarkets = initialLocations.slice(0, 2); // Bengaluru, Hyderabad (or Mumbai)
  const secondaryMarkets = initialLocations.slice(2, 6); // Mumbai, Goa, Pune, Delhi NCR

  return (
    <section className="section-wrapper bg-[#EBF3EB] border-t border-[#E5E0D8]">
      <div className="container-luxury">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={16} className="text-[#0E2A1E]" />
              <span className="eyebrow-forest">Regional Coverage</span>
            </div>
            <h2 className="section-title text-[#1F2421]">
              Explore Locations
            </h2>
            <p className="section-subtitle mt-2">
              Discover verified residential communities and prime developments across India's premier metropolitan regions.
            </p>
          </div>

          <button
            onClick={() => navigate('/search')}
            className="btn-outline-forest text-[13px] py-2.5 px-5 rounded-[8px] self-start md:self-auto flex items-center gap-2"
          >
            <span>View All Markets</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Editorial Layout: 2 Large Prominent Markets Top + 4 Grid Markets Below */}
        <div className="space-y-6">
          {/* Top Row: 2 Wide Feature Markets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {primaryMarkets.map((loc) => (
              <div
                key={loc.id}
                onClick={() => handleLocationClick(loc.name)}
                className="group relative h-72 sm:h-80 rounded-[8px] overflow-hidden border border-[#E5E0D8] shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between p-6 sm:p-7"
              >
                <img
                  src={loc.image}
                  alt={`${loc.name} Real Estate`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-[4px] bg-[#0E2A1E]/90 text-[#FAF8F5] text-[11px] font-bold uppercase tracking-wider">
                    {loc.listingCount} Verified Listings
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-[#0E2A1E] group-hover:text-white text-white flex items-center justify-center transition-colors">
                    <ArrowRight size={14} />
                  </span>
                </div>

                <div className="relative z-10">
                  <span className="text-[11.5px] font-semibold text-[#C5A880] uppercase tracking-wider block mb-1">
                    {loc.category}
                  </span>
                  <h3 className="text-[26px] font-bold text-white font-heading leading-tight mb-2">
                    {loc.name}
                  </h3>
                  <div className="flex items-center justify-between pt-2.5 border-t border-white/20 text-[12.5px] text-[#D2DFD2]">
                    <span>Typical Price Range</span>
                    <span className="font-bold text-white">{loc.typicalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lower Row: 4 Clean Compact Regional Markets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondaryMarkets.map((loc) => (
              <div
                key={loc.id}
                onClick={() => handleLocationClick(loc.name)}
                className="group relative h-64 rounded-[8px] overflow-hidden border border-[#E5E0D8] shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between p-5"
              >
                <img
                  src={loc.image}
                  alt={`${loc.name} Real Estate`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-[4px] bg-[#0E2A1E]/90 text-[#FAF8F5] text-[10.5px] font-semibold">
                    {loc.listingCount} Homes
                  </span>
                  <span className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-[#0E2A1E] group-hover:text-white text-white flex items-center justify-center transition-colors">
                    <ArrowRight size={13} />
                  </span>
                </div>

                <div className="relative z-10">
                  <span className="text-[10.5px] font-medium text-[#C5A880] uppercase tracking-wider block mb-0.5">
                    {loc.state}
                  </span>
                  <h4 className="text-[20px] font-bold text-white font-heading leading-tight mb-1.5">
                    {loc.name}
                  </h4>
                  <p className="text-[12px] text-[#D2DFD2] font-medium">
                    {loc.typicalPrice}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
