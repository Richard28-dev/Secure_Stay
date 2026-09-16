import { Home, KeyRound, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export default function ServicesSection() {
  const { navigate } = useRouter();

  const services = [
    {
      icon: Home,
      title: 'Property Acquisition & Buying',
      desc: 'Discover verified homes with complete legal title due diligence, RERA compliance certification, and structured negotiation.',
      action: 'Explore Buying',
      link: '/buy',
    },
    {
      icon: KeyRound,
      title: 'Property Listing & Selling',
      desc: 'Showcase your property with professional photography, targeted HNIs and qualified buyers, with transparent transaction support.',
      action: 'List Your Property',
      link: '/list-property',
    },
    {
      icon: TrendingUp,
      title: 'Real Estate Investment Advisory',
      desc: 'Data-backed market intelligence, rental yield calculations, capital appreciation forecasts, and bespoke NRI property management.',
      action: 'Schedule Advisory',
      link: '/contact',
    },
    {
      icon: ShieldCheck,
      title: 'Legal Due Diligence & Escrow',
      desc: 'Independent title deed verification, encumbrance certificate reviews, structural inspections, and secure payment pathways.',
      action: 'Learn More',
      link: '/about',
    },
  ];

  return (
    <section id="services" className="py-16 lg:py-24 bg-[#EBF3EB] border-t border-[#E5E0D8]">
      <div className="container-luxury">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#0E2A1E] block mb-2">
              Our Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1C1A] font-heading tracking-tight">
              Comprehensive Real Estate Services
            </h2>
            <p className="text-[15px] text-[#5A605B] mt-2 max-w-xl font-normal">
              Tailored services for home buyers, sellers, property developers, and institutional investors.
            </p>
          </div>

          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] bg-[#0E2A1E] text-[#FAF8F5] hover:bg-[#163A29] text-[13px] font-semibold transition-colors cursor-pointer w-fit shadow-xs"
          >
            <span>Talk with Our Team</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.title}
                className="bg-white border border-[#D6E2D6] hover:border-[#0E2A1E]/40 rounded-[8px] p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-md group"
              >
                <div>
                  <div className="w-12 h-12 rounded-[6px] bg-[#E8EFE8] text-[#0E2A1E] flex items-center justify-center mb-5 group-hover:bg-[#0E2A1E] group-hover:text-white transition-colors">
                    <Icon size={22} strokeWidth={2} />
                  </div>

                  <h3 className="text-[17px] font-bold text-[#1A1C1A] mb-2 font-heading leading-snug">
                    {svc.title}
                  </h3>

                  <p className="text-[13px] text-[#5A605B] leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                </div>

                <button
                  onClick={() => navigate(svc.link)}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0E2A1E] hover:text-[#163A29] group-hover:translate-x-0.5 transition-transform cursor-pointer pt-3 border-t border-[#E5E0D8]"
                >
                  <span>{svc.action}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
