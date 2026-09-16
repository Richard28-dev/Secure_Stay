import { ArrowRight, Home, KeyRound, Sparkles, TrendingUp } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export default function PropertyDiscoverySection() {
  const { navigate } = useRouter();

  const categories = [
    {
      id: 'buy',
      title: 'Buy a Home',
      tagline: 'Verified independent villas, apartments & family residences',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      action: () => navigate('/buy'),
      icon: Home,
      badge: 'Ownership',
    },
    {
      id: 'rent',
      title: 'Rent a Home',
      tagline: 'Curated luxury apartments & penthouses ready for immediate move-in',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      action: () => navigate('/rent'),
      icon: KeyRound,
      badge: 'Leasing',
    },
    {
      id: 'luxury',
      title: 'Luxury Living',
      tagline: 'Ultra-prime standalone estates, sky duplexes & private retreats',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      action: () => navigate('/search', { type: 'Villa' }),
      icon: Sparkles,
      badge: 'Signature',
    },
    {
      id: 'invest',
      title: 'Investment Property',
      tagline: 'High-rental yield assets & high capital appreciation corridors',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      action: () => navigate('/search', { type: 'Apartment' }),
      icon: TrendingUp,
      badge: 'Growth Yield',
    },
  ];

  return (
    <section className="py-14 lg:py-20 bg-white border-b border-[#E5E0D8]">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#E8EFE8] text-[#0E2A1E] text-[11px] font-bold uppercase tracking-wider mb-2.5">
            <Sparkles size={13} className="text-[#0E2A1E]" />
            <span>Tailored Property Pathways</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1C1A] font-heading tracking-tight">
            Find a Property That Fits Your Life
          </h2>
          <p className="text-[14.5px] text-[#5A605B] mt-2 font-normal">
            Whether purchasing a permanent sanctuary, leasing a city home, or growing an investment portfolio.
          </p>
        </div>

        {/* 4 Category Visual Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={cat.action}
                className="group relative h-80 rounded-[8px] overflow-hidden border border-[#E5E0D8] shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between p-6 bg-[#FAF8F5]"
              >
                {/* Background Photography with Gentle Hover Zoom */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Natural Gradient Overlay for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071710]/90 via-[#071710]/40 to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-[4px] bg-[#0E2A1E]/85 backdrop-blur-xs text-[#FAF8F5] text-[10.5px] font-bold uppercase tracking-wider border border-white/10">
                    {cat.badge}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs text-white group-hover:bg-[#C5A880] group-hover:text-[#071710] flex items-center justify-center transition-colors">
                    <Icon size={15} />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 transform group-hover:-translate-y-0.5 transition-transform duration-300">
                  <h3 className="text-[20px] font-bold text-[#FAF8F5] font-heading leading-tight mb-1">
                    {cat.title}
                  </h3>
                  <p className="text-[12.5px] text-[#D2DFD2] leading-snug line-clamp-2 mb-3 font-normal">
                    {cat.tagline}
                  </p>
                  <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#C5A880] group-hover:text-white transition-colors">
                    <span>Explore Options</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
