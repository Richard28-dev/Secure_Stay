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
    <section className="bg-white border-y border-[#E5DFD5] py-12 lg:py-16">
      <div className="container-luxury">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 divide-y sm:divide-y-0 lg:divide-x divide-[#E5DFD5]">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`flex flex-col justify-center ${
                  idx > 0 ? 'pt-6 sm:pt-0 lg:pl-10' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-[8px] bg-[#E4ECE7] text-[#0A2A1D] flex items-center justify-center">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <span className="text-3xl sm:text-4xl font-bold text-[#0A2A1D] font-heading tracking-tight">
                    {stat.value}
                  </span>
                </div>
                <h3 className="text-[16px] font-bold text-[#1A1E1C] leading-snug font-heading">
                  {stat.label}
                </h3>
                <p className="text-[13px] text-[#57605B] mt-1 leading-relaxed">
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
