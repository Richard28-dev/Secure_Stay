import { MapPin, ArrowRight, Waves, Mountain, Trees, Sun, Sparkles } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export default function ExploreLocations() {
  const { navigate } = useRouter();

  const handleLocationClick = (cityName: string) => {
    navigate('/search', { city: cityName });
  };

  const sanctuaryDestinations = [
    {
      id: 'goa',
      name: 'North Goa & Assagao',
      state: 'Goa Coast',
      tagline: 'Portuguese Heritage Villas & Private Stone Lap Pools',
      listingCount: 28,
      typicalPrice: '₹3.9 Cr – ₹16.0 Cr',
      microclimate: '26°C · Ocean Breeze',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=85',
      icon: Waves,
    },
    {
      id: 'coorg',
      name: 'Coorg & Western Ghats',
      state: 'Karnataka Highlands',
      tagline: 'Misty Coffee Plantations & Cloud-Kissed Hillside Retreats',
      listingCount: 18,
      typicalPrice: '₹2.2 Cr – ₹9.5 Cr',
      microclimate: '19°C · Mountain Mist',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=85',
      icon: Mountain,
    },
    {
      id: 'bengaluru',
      name: 'Bengaluru Green Belt',
      state: 'Sarjapur & Whitefield',
      tagline: 'Modern Biophilic Courtyard Residences & Shaded Enclaves',
      listingCount: 42,
      typicalPrice: '₹3.5 Cr – ₹14.0 Cr',
      microclimate: '23°C · Lush Canopies',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      icon: Trees,
    },
    {
      id: 'alibaug',
      name: 'Alibaug Waterfront',
      state: 'Maharashtra Coast',
      tagline: 'Private Seafront Sanctuaries & Speedboat-Accessible Acreage',
      listingCount: 16,
      typicalPrice: '₹4.5 Cr – ₹22.0 Cr',
      microclimate: '27°C · Salty Thermals',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      icon: Waves,
    },
    {
      id: 'hyderabad',
      name: 'Jubilee Hills & Gandipet',
      state: 'Telangana',
      tagline: 'Granite Rock Pavilions & Expansive Private Lakefronts',
      listingCount: 26,
      typicalPrice: '₹4.2 Cr – ₹18.5 Cr',
      microclimate: '25°C · Water Promenades',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      icon: Sun,
    },
    {
      id: 'mumbai',
      name: 'Mumbai Coastal',
      state: 'Bandra & Juhu',
      tagline: 'Sea-Facing Sky Penthouses & Private Terraces',
      listingCount: 34,
      typicalPrice: '₹6.5 Cr – ₹38.0 Cr',
      microclimate: '28°C · Horizon Vistas',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      icon: Sparkles,
    },
  ];

  const primaryMarkets = sanctuaryDestinations.slice(0, 2);
  const secondaryMarkets = sanctuaryDestinations.slice(2, 6);

  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-[#E5DFD5]">
      <div className="container-luxury">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E4ECE7] text-[#0A2A1D] text-[12px] font-bold tracking-wider mb-3 border border-[#0A2A1D]/15">
              <MapPin size={14} className="text-[#0A2A1D]" />
              <span>Sanctuary Destinations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1E1C] font-heading tracking-tight">
              Explore Sanctuaries by Landscape
            </h2>
            <p className="text-[15.5px] text-[#57605B] mt-2 max-w-xl font-normal leading-relaxed">
              Curated enclaves selected for their unpolluted air quality, architectural stillness, and serene natural microclimates.
            </p>
          </div>

          <button
            onClick={() => navigate('/search')}
            className="btn-outline-forest text-[13.5px] py-2.5 px-6 rounded-[8px] bg-white self-start md:self-auto flex items-center gap-2 cursor-pointer shadow-xs hover:shadow transition-all"
          >
            <span>View All Destinations</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Editorial Layout: 2 Wide Feature Sanctuaries Top + 4 Grid Sanctuaries Below */}
        <div className="space-y-6">
          {/* Top Row: 2 Wide Feature Sanctuaries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {primaryMarkets.map((loc) => {
              const Icon = loc.icon;
              return (
                <div
                  key={loc.id}
                  onClick={() => handleLocationClick(loc.name)}
                  className="group relative h-80 sm:h-96 rounded-[14px] overflow-hidden border border-[#E5DFD5] shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col justify-between p-6 sm:p-8"
                >
                  <img
                    src={loc.image}
                    alt={loc.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#0A2A1D]/90 backdrop-blur-md text-[#FDFBF7] text-[11.5px] font-bold tracking-wider flex items-center gap-1.5 border border-white/15">
                      <Icon size={13} className="text-[#C5A880]" />
                      <span>{loc.microclimate}</span>
                    </span>
                    <span className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-[#C5A880] group-hover:text-[#0A2A1D] text-white flex items-center justify-center transition-all duration-300">
                      <ArrowRight size={15} />
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-10">
                    <span className="text-[12px] font-bold text-[#C5A880] uppercase tracking-wider block mb-1">
                      {loc.state} · {loc.listingCount} Verified Estates
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading leading-tight mb-2">
                      {loc.name}
                    </h3>
                    <p className="text-[13px] text-[#D2DFD2] line-clamp-1 mb-3">
                      {loc.tagline}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-white/20 text-[12.5px] text-[#D2DFD2]">
                      <span>Acquisition Range</span>
                      <span className="font-bold text-[#C5A880] text-[14px]">{loc.typicalPrice}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lower Row: 4 Regional Sanctuaries */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondaryMarkets.map((loc) => {
              const Icon = loc.icon;
              return (
                <div
                  key={loc.id}
                  onClick={() => handleLocationClick(loc.name)}
                  className="group relative h-72 rounded-[12px] overflow-hidden border border-[#E5DFD5] shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer flex flex-col justify-between p-5"
                >
                  <img
                    src={loc.image}
                    alt={loc.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-[#0A2A1D]/90 backdrop-blur-md text-[#FDFBF7] text-[10.5px] font-semibold flex items-center gap-1 border border-white/10">
                      <Icon size={12} className="text-[#C5A880]" />
                      <span>{loc.microclimate}</span>
                    </span>
                    <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-[#C5A880] group-hover:text-[#0A2A1D] text-white flex items-center justify-center transition-all duration-300">
                      <ArrowRight size={13} />
                    </span>
                  </div>

                  {/* Bottom Info */}
                  <div className="relative z-10">
                    <span className="text-[11px] font-medium text-[#C5A880] uppercase tracking-wider block mb-0.5">
                      {loc.state}
                    </span>
                    <h4 className="text-[20px] font-bold text-white font-heading leading-tight mb-1">
                      {loc.name}
                    </h4>
                    <p className="text-[12.5px] text-[#D2DFD2] font-semibold">
                      {loc.typicalPrice}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
