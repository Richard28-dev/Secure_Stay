import { ShieldCheck, UserCheck, LockKeyhole, ArrowRight, Building2, Users2, MapPin, Award } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export default function WhySecureStay() {
  const { navigate } = useRouter();

  const trustStats = [
    { value: '500+', label: 'Verified Properties', icon: Building2 },
    { value: '1,200+', label: 'Happy Clients', icon: Users2 },
    { value: '25+', label: 'Prime Locations', icon: MapPin },
    { value: '10+', label: 'Years Experience', icon: Award },
  ];

  const trustPoints = [
    {
      icon: ShieldCheck,
      number: '01',
      title: 'Verified Properties',
      description:
        'Every listed home undergoes a rigorous 4-step audit including physical site inspection, legal title deed cross-checking, and layout verification before publication.',
    },
    {
      icon: UserCheck,
      number: '02',
      title: 'Trusted Professionals',
      description:
        'Work exclusively with vetted, licensed real estate advisors who adhere to strict fiduciary conduct. No high-pressure sales calls, no hidden broker conflicts.',
    },
    {
      icon: LockKeyhole,
      number: '03',
      title: 'Secure Enquiries',
      description:
        'Your contact details and financial preferences remain strictly confidential. Enquiries route directly to your dedicated advisor with zero data sharing.',
    },
  ];

  return (
    <section className="section-wrapper bg-white border-t border-[#E5E0D8]">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT: Human Real Estate Photography + Trust Matrix (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-[8px] overflow-hidden border border-[#E5E0D8] shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80"
                alt="SecureStay Real Estate Property Advisors"
                className="w-full h-80 sm:h-96 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-[13px] font-medium bg-black/40 backdrop-blur-xs p-3 rounded-[6px] border border-white/10">
                <span>"Transparent property guidance built on verified legal title assurance."</span>
              </div>
            </div>

            {/* Restrained 2x2 Trust Matrix */}
            <div className="grid grid-cols-2 gap-4">
              {trustStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="p-4 rounded-[6px] bg-[#FAF8F5] border border-[#E5E0D8]"
                  >
                    <div className="flex items-center gap-2 text-[#0E2A1E] mb-1">
                      <Icon size={16} />
                      <span className="text-2xl font-bold font-heading">{stat.value}</span>
                    </div>
                    <p className="text-[12px] text-[#5A605B] font-medium leading-tight">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Why SecureStay Editorial Content (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#0E2A1E] block mb-2">
                The SecureStay Difference
              </span>
              <h2 className="section-title text-[#1F2421]">
                Why SecureStay
              </h2>
              <p className="section-subtitle mt-2">
                Real estate decisions demand complete clarity. We built SecureStay to eliminate ambiguity, unverified listings, and high-pressure broker networks.
              </p>
            </div>

            {/* 3 Core Editorial Pillars */}
            <div className="space-y-6">
              {trustPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div
                    key={point.title}
                    className="flex gap-4 p-5 rounded-[8px] bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#0E2A1E]/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-[6px] bg-[#E8EFE8] text-[#0E2A1E] flex items-center justify-center shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold text-[#C5A880] font-mono">{point.number}</span>
                        <h3 className="text-[17px] font-bold text-[#1A1C1A] font-heading">
                          {point.title}
                        </h3>
                      </div>
                      <p className="text-[13.5px] text-[#5A605B] leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => navigate('/about')}
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#0E2A1E] hover:text-[#163A29] group cursor-pointer pt-2"
            >
              <span>Learn about our 24-point Verification Protocol</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
