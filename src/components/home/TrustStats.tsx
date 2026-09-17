import { ShieldCheck, TrendingUp, Trees, Award } from 'lucide-react';

export default function TrustStats() {
  const stats = [
    {
      value: '100%',
      label: 'Title & Legal Guarantee',
      sublabel: '30-year deed provenance, RERA compliance & clear ownership',
      icon: ShieldCheck,
    },
    {
      value: '₹1,800 Cr+',
      label: 'Curated Asset Value',
      sublabel: 'Hand-vetted residential estates, villas, and retreat sanctuaries',
      icon: TrendingUp,
    },
    {
      value: '35+',
      label: 'Sanctuary Enclaves',
      sublabel: 'Spanning Goa, Coorg, Alibaug, Bengaluru & Mumbai green belts',
      icon: Trees,
    },
    {
      value: '0%',
      label: 'Broker Conflicts',
      sublabel: 'Dedicated fiduciary advisory with complete client discretion',
      icon: Award,
    },
  ];

  return (
    <section className="bg-[#0A2A1D] text-[#FAF8F5] border-y border-[#C5A880]/20 py-14 lg:py-18 relative overflow-hidden">
      {/* Ambient background glow elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#133D2B]/50 rounded-full blur-3xl pointer-events-none -mt-48" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none -mb-48" />

      <div className="container-luxury relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 divide-y sm:divide-y-0 lg:divide-x divide-white/10">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`flex flex-col justify-center group ${
                  idx > 0 ? 'pt-6 sm:pt-0 lg:pl-10' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-11 h-11 rounded-[10px] bg-white/10 border border-white/15 text-[#C5A880] flex items-center justify-center group-hover:bg-[#C5A880] group-hover:text-[#0A2A1D] transition-all duration-300">
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <span className="text-3xl sm:text-4xl font-bold text-[#C5A880] font-heading tracking-tight">
                    {stat.value}
                  </span>
                </div>
                <h3 className="text-[16px] font-bold text-[#FAF8F5] leading-snug font-heading group-hover:text-[#C5A880] transition-colors">
                  {stat.label}
                </h3>
                <p className="text-[13px] text-[#A3B8A8] mt-1 leading-relaxed">
                  {stat.sublabel}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
