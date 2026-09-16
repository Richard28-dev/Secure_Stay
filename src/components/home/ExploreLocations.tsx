import { MapPin, ArrowRight } from 'lucide-react';
import { initialLocations } from '../../data/locations';
import { useRouter } from '../../context/RouterContext';

export default function ExploreLocations() {
  const { navigate } = useRouter();

  const handleLocationClick = (cityName: string) => {
    navigate('/search', { city: cityName });
  };

  return (
    <section className="section-wrapper bg-[#EBF3EB] border-t border-[#E5E0D8]">
      <div className="container-luxury">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <MapPin size={16} className="text-[#0E2A1E]" />
              <span className="eyebrow-forest">Regional Coverage</span>
            </div>
            <h2 className="section-title text-[#1F2421]">
              Explore by Location
            </h2>
            <p className="section-subtitle mt-2">
              Discover verified architectural estates, penthouses, and gated enclaves across India’s most sought-after cities.
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

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialLocations.map((loc) => (
            <div
              key={loc.id}
              onClick={() => handleLocationClick(loc.name)}
              className="group relative h-80 rounded-[8px] overflow-hidden border border-[#E5E0D8] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between p-6"
            >
              {/* Background Photo */}
              <img
                src={loc.image}
                alt={`${loc.name} Real Estate`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Overlay for Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071710] via-[#071710]/45 to-black/20 pointer-events-none" />

              {/* Top Meta Pill */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-[4px] bg-[#0E2A1E]/80 backdrop-blur-md text-[#FAF8F5] text-[11px] font-semibold tracking-wider">
                  {loc.listingCount} Verified Listings
                </span>
                <span className="w-8 h-8 rounded-full bg-[#FFFFFF]/20 group-hover:bg-[#C5A880] group-hover:text-[#071710] text-[#FAF8F5] backdrop-blur-sm flex items-center justify-center transition-colors">
                  <ArrowRight size={15} />
                </span>
              </div>

              {/* Bottom Information */}
              <div className="relative z-10">
                <span className="text-[11px] font-semibold text-[#C5A880] uppercase tracking-wider block mb-1">
                  {loc.category}
                </span>
                <h3 className="text-[24px] font-extrabold text-[#FAF8F5] font-heading leading-tight mb-2">
                  {loc.name}
                </h3>
                <div className="flex items-center justify-between pt-2 border-t border-white/20 text-[12.5px] text-[#D2DFD2]">
                  <span>Typical Price Range</span>
                  <span className="font-bold text-[#FAF8F5]">{loc.typicalPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
