import { Award, Building2, Users2, MapPin } from 'lucide-react';

export default function TrustStats() {
  const stats = [
    {
      value: '10+',
      label: 'Years of Experience',
      sublabel: 'Established real estate advisory & property management',
      icon: Award,
    },
    {
      value: '500+',
      label: 'Properties',
      sublabel: '100% physically inspected & title verified',
      icon: Building2,
    },
    {
      value: '1,200+',
      label: 'Happy Clients',
      sublabel: 'Families and investors settled securely',
      icon: Users2,
    },
    {
      value: '25+',
      label: 'Locations',
      sublabel: 'Across Bangalore, Hyderabad, Goa & Mumbai',
      icon: MapPin,
    },
  ];

  return (
    <section className="bg-white border-y border-[#E5E0D8] py-12 lg:py-16">
      <div className="container-luxury">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 divide-y sm:divide-y-0 lg:divide-x divide-[#E5E0D8]">
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
                  <div className="w-10 h-10 rounded-[6px] bg-[#E8EFE8] text-[#0E2A1E] flex items-center justify-center">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <span className="text-3xl sm:text-4xl font-bold text-[#0E2A1E] font-heading tracking-tight">
                    {stat.value}
                  </span>
                </div>
                <h3 className="text-[16px] font-semibold text-[#1A1C1A] leading-snug">
                  {stat.label}
                </h3>
                <p className="text-[13px] text-[#5A605B] mt-1 leading-relaxed">
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
