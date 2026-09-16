import { Home, KeyRound, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export default function ServicesSection() {
  const { navigate } = useRouter();

  const services = [
    {
      icon: Home,
      title: 'Buying Assistance',
      desc: 'Discover verified residential properties with comprehensive title due diligence, RERA certification reviews, and structured negotiation assistance.',
      action: 'Explore Buying',
      link: '/buy',
    },
    {
      icon: KeyRound,
      title: 'Property Selling',
      desc: 'Showcase your property to qualified high-intent buyers and HNIs with professional architectural photography, pricing guidance, and closing support.',
      action: 'List Your Property',
      link: '/list-property',
    },
    {
      icon: TrendingUp,
      title: 'Investment Advisory',
      desc: 'Data-driven capital growth forecasts, gross rental yield calculations, commercial real estate assessments, and NRI property management.',
      action: 'Schedule Advisory',
      link: '/contact',
    },
    {
      icon: ShieldCheck,
      title: 'Legal Due Diligence',
      desc: 'Independent 24-point legal title deed audits, encumbrance verification, municipal approval cross-checking, and escrow milestone security.',
      action: 'Learn Our Protocol',
      link: '/about',
    },
  ];

  return (
    <section id="services" className="py-16 lg:py-24 bg-white border-t border-[#E5E0D8]">
      <div className="container-luxury">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#0E2A1E] block mb-2">
              Our Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1C1A] font-heading tracking-tight">
              Real Estate Services
            </h2>
            <p className="text-[15px] text-[#5A605B] mt-2 max-w-xl font-normal">
              Structured fiduciary services for home buyers, property owners, developers, and institutional investors.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[6px] bg-[#0E2A1E] text-[#FAF8F5] hover:bg-[#163A29] text-[13px] font-semibold transition-colors cursor-pointer w-fit shadow-xs"
          >
            <span>Speak with an Advisor</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 4-Column Clean Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.title}
                className="bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#0E2A1E]/40 rounded-[8px] p-6 sm:p-7 flex flex-col justify-between transition-colors group"
              >
                <div>
                  <div className="w-11 h-11 rounded-[6px] bg-[#E8EFE8] text-[#0E2A1E] flex items-center justify-center mb-5">
                    <Icon size={20} />
                  </div>

                  <h3 className="text-[18px] font-bold text-[#1A1C1A] mb-2.5 font-heading leading-snug">
                    {svc.title}
                  </h3>

                  <p className="text-[13px] text-[#5A605B] leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(svc.link)}
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#0E2A1E] hover:text-[#163A29] group-hover:translate-x-0.5 transition-transform cursor-pointer pt-3 border-t border-[#E5E0D8]"
                >
                  <span>{svc.action}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
