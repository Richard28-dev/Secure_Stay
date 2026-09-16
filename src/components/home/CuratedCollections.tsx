import { ArrowRight, Sparkles, Building2, Trees, Compass, ShieldCheck } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export default function CuratedCollections() {
  const { navigate } = useRouter();

  const collections = [
    {
      id: 'luxury-villas',
      category: 'Signature Estates',
      title: 'Gated Private Villas',
      subtitle: 'Standalone residences with private landscaped gardens, swimming pools & 24/7 security in serene suburbs.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
      count: '42 Verified Villas',
      priceFrom: 'From ₹2.10 Cr',
      filterType: 'Villa',
      icon: Trees,
      highlights: ['Private Garden & Pool', 'Zero Common Walls', 'Dedicated Parking'],
    },
    {
      id: 'sky-penthouses',
      category: 'High-Rise Living',
      title: 'Sky Penthouses & Duplexes',
      subtitle: 'Panoramic skyline views, double-height ceilings, private elevator foyers & wraparound terraces.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
      count: '28 Prime Residences',
      priceFrom: 'From ₹3.85 Cr',
      filterType: 'Penthouse',
      icon: Building2,
      highlights: ['270° City Panorama', 'Private Sky Deck', 'Concierge Access'],
    },
    {
      id: 'modern-apartments',
      category: 'Urban Living',
      title: 'Premium City Apartments',
      subtitle: 'Thoughtfully designed 2 & 3 BHK residences located in major tech corridors with full clubhouse amenities.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
      count: '115 Available Homes',
      priceFrom: 'From ₹78 Lakhs',
      filterType: 'Apartment',
      icon: Compass,
      highlights: ['Clubhouse & Gym', 'Near Metro Corridors', 'High Rental Yield'],
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#EBF3EB] border-t border-[#E5E0D8]">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-white text-[#0E2A1E] text-[12px] font-bold uppercase tracking-wider mb-2.5 border border-[#0E2A1E]/10">
              <Sparkles size={14} className="text-[#0E2A1E]" />
              <span>Editorial Portfolios</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1C1A] font-heading tracking-tight">
              Curated Property Collections
            </h2>
            <p className="text-[15px] text-[#5A605B] mt-2 max-w-xl font-normal">
              Handpicked portfolios organized by lifestyle, architectural character, and prime residential zones.
            </p>
          </div>

          <button
            onClick={() => navigate('/buy')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] border border-[#0E2A1E]/30 hover:border-[#0E2A1E] bg-white hover:bg-[#FAF8F5] text-[#1A1C1A] text-[13px] font-semibold transition-colors cursor-pointer w-fit shadow-xs"
          >
            <span>View All Collections</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* 3-Column Magazine Style Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => navigate('/search', { type: item.filterType })}
                className="group bg-white border border-[#E5E0D8] hover:border-[#0E2A1E]/40 rounded-[8px] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Image Aspect */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#E8EFE8]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-10">
                    <span className="px-2.5 py-1 rounded-[4px] bg-[#0E2A1E]/90 text-[#FAF8F5] text-[10.5px] font-bold uppercase tracking-wider backdrop-blur-xs flex items-center gap-1.5 border border-white/10">
                      <Icon size={12} className="text-[#C5A880]" />
                      <span>{item.category}</span>
                    </span>
                  </div>

                  {/* Bottom Image Stats */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-[#FAF8F5] text-[12.5px] font-medium z-10">
                    <span>{item.count}</span>
                    <span className="font-bold text-[#C5A880] text-[13px]">{item.priceFrom}</span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[20px] font-bold text-[#1A1C1A] group-hover:text-[#0E2A1E] transition-colors leading-snug font-heading mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[13.5px] text-[#5A605B] leading-relaxed mb-5">
                      {item.subtitle}
                    </p>

                    {/* Quick Highlights */}
                    <div className="space-y-1.5 mb-6">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-[12px] text-[#1A1C1A] font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0E2A1E]" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5E0D8] flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-[#0E2A1E] group-hover:underline">
                      Explore {item.title}
                    </span>
                    <div className="w-8 h-8 rounded-[6px] bg-[#E8EFE8] group-hover:bg-[#0E2A1E] group-hover:text-white text-[#0E2A1E] flex items-center justify-center transition-colors">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-12 p-6 rounded-[8px] bg-white border border-[#E5E0D8] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-[6px] bg-[#0E2A1E] text-white flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-[#0E2A1E]">Every Collection is 100% Title Verified</h4>
              <p className="text-[13px] text-[#5A605B] mt-0.5">
                Zero disputed land parcels, verified RERA certificates, and direct property owner representation.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/about')}
            className="px-4 py-2 rounded-[6px] bg-[#0E2A1E] text-white text-[13px] font-semibold hover:bg-[#163A29] transition-colors whitespace-nowrap cursor-pointer shadow-xs"
          >
            Learn Our Protocol
          </button>
        </div>
      </div>
    </section>
  );
}
