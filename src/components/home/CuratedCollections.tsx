import { ArrowRight, Sparkles, Building2, Trees, Waves, Mountain, ShieldCheck } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export default function CuratedCollections() {
  const { navigate } = useRouter();

  const collections = [
    {
      id: 'coastal-villas',
      category: 'Coastal Living',
      title: 'Goa & Coastal Sanctuaries',
      subtitle: 'Portuguese-inspired villas with private stone lap pools, lush gardens & open verandas.',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=85',
      count: '24 Verified Villas',
      priceFrom: 'From ₹2.85 Cr',
      filterType: 'Villa',
      icon: Waves,
      highlights: ['Private Basalt Lap Pool', 'Verdant Coconut Canopy', 'Discreet Gated Enclave'],
    },
    {
      id: 'hillside-retreats',
      category: 'Mountain & Forest',
      title: 'Misty Hillside Retreats',
      subtitle: 'Cloud-kissed private bungalows nestled within coffee plantations and misty pine forests.',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=85',
      count: '16 Private Estates',
      priceFrom: 'From ₹2.20 Cr',
      filterType: 'Estate',
      icon: Mountain,
      highlights: ['Acreage Forest Boundaries', 'Year-Round Cool Microclimate', 'Pure Natural Spring Water'],
    },
    {
      id: 'courtyard-havens',
      category: 'Biophilic Architecture',
      title: 'Heritage Courtyard Havens',
      subtitle: 'Modern residences centered around open-to-sky living courtyards with native flora.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
      count: '32 Courtyard Homes',
      priceFrom: 'From ₹1.95 Cr',
      filterType: 'Villa',
      icon: Trees,
      highlights: ['Open-to-Sky Courtyards', 'Natural Cross-Ventilation', 'Handcrafted Teak & Stone'],
    },
    {
      id: 'biophilic-penthouses',
      category: 'Urban Sanctuary',
      title: 'Biophilic Sky Penthouses',
      subtitle: 'High-rise sky sanctuaries featuring wrap-around terrace gardens and private plunge pools.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=85',
      count: '19 Exclusive Residences',
      priceFrom: 'From ₹4.50 Cr',
      filterType: 'Penthouse',
      icon: Building2,
      highlights: ['Private Sky Pool & Deck', 'Circadian Floor-to-Ceiling Glass', 'Panoramic Sunset Horizons'],
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#FAF8F5] border-t border-[#E5DFD5]">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#0A2A1D] text-[12px] font-bold tracking-wider mb-2.5 border border-[#0A2A1D]/15 shadow-xs">
              <Sparkles size={14} className="text-[#C5A880]" />
              <span>Curated Portfolios · Serene Sanctuaries</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1E1C] font-heading tracking-tight">
              Choose Your Living Environment
            </h2>
            <p className="text-[15px] text-[#57605B] mt-2 max-w-xl font-normal leading-relaxed">
              From ocean breezes in North Goa to coffee-forested slopes in Coorg—explore private estates shaped by natural topography.
            </p>
          </div>

          <button
            onClick={() => navigate('/buy')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] border border-[#0A2A1D]/30 hover:border-[#0A2A1D] bg-white hover:bg-[#FDFBF7] text-[#1A1E1C] text-[13px] font-semibold transition-colors cursor-pointer w-fit shadow-xs"
          >
            <span>View All Sanctuaries</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* 4-Column Magazine Style Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => navigate('/search', { type: item.filterType })}
                className="group bg-white border border-[#E5DFD5] hover:border-[#0A2A1D] rounded-[10px] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Image Aspect */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#E4ECE7]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-[#0A2A1D]/90 text-[#FDFBF7] text-[10.5px] font-bold tracking-wider backdrop-blur-xs flex items-center gap-1.5 border border-white/10">
                      <Icon size={12} className="text-[#C5A880]" />
                      <span>{item.category}</span>
                    </span>
                  </div>

                  {/* Bottom Image Stats */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-[#FDFBF7] text-[12px] font-medium z-10">
                    <span>{item.count}</span>
                    <span className="font-bold text-[#C5A880] text-[12.5px]">{item.priceFrom}</span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[17px] font-bold text-[#1A1E1C] group-hover:text-[#0A2A1D] transition-colors leading-snug font-heading mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-[#57605B] leading-relaxed mb-4">
                      {item.subtitle}
                    </p>

                    {/* Quick Highlights */}
                    <div className="space-y-1.5 mb-5">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11.5px] text-[#1A1E1C] font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0A2A1D]" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3.5 border-t border-[#E5DFD5] flex items-center justify-between">
                    <span className="text-[12.5px] font-semibold text-[#0A2A1D] group-hover:underline">
                      Explore Collection
                    </span>
                    <div className="w-7 h-7 rounded-[6px] bg-[#E4ECE7] group-hover:bg-[#0A2A1D] group-hover:text-[#FDFBF7] text-[#0A2A1D] flex items-center justify-center transition-colors">
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-12 p-6 rounded-[10px] bg-white border border-[#E5DFD5] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-[8px] bg-[#0A2A1D] text-[#FDFBF7] flex items-center justify-center shrink-0">
              <ShieldCheck size={20} className="text-[#C5A880]" />
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-[#0A2A1D]">Every Sanctuary Estate is 100% Title Verified</h4>
              <p className="text-[13px] text-[#57605B] mt-0.5">
                Zero disputed land parcels, verified RERA certificates, clear environmental clearances, and direct owner representation.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/about')}
            className="px-4 py-2 rounded-[6px] bg-[#0A2A1D] text-[#FDFBF7] text-[13px] font-semibold hover:bg-[#133D2B] transition-colors whitespace-nowrap cursor-pointer shadow-xs"
          >
            Our Verification Standard
          </button>
        </div>
      </div>
    </section>
  );
}
