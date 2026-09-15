import ScrollReveal from './ScrollReveal';
import { Landmark, TrendingUp, BarChart3, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import { services } from '../data/properties';

const iconMap: Record<string, typeof Landmark> = {
  Home: Landmark,
  TrendingUp,
  BarChart3,
  Settings: SlidersHorizontal,
};

export default function Services() {
  return (
    <section id="services" className="section-wrapper bg-[#F2EFE9] text-[#17181C]">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <ScrollReveal>
            <div className="max-w-xl">
              <span className="eyebrow mb-4">Advisory Capabilities</span>
              <h2 className="section-title text-[#17181C]">
                Private Client Services
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <p className="section-subtitle lg:text-right">
              Comprehensive real estate stewardship tailored for high-net-worth individuals, family offices, and discerning institutional investors.
            </p>
          </ScrollReveal>
        </div>

        {/* 4-Column Minimalist Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Landmark;
            return (
              <ScrollReveal key={service.id} delay={index * 100}>
                <div className="group bg-[#FFFFFF] border border-[#E5E1D8] p-8 lg:p-9 rounded-[2px] h-full flex flex-col justify-between hover:border-[#0E2519] hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-400">
                  <div>
                    <div className="w-12 h-12 rounded-[2px] bg-[#F2EFE9] flex items-center justify-center text-[#0E2519] group-hover:bg-[#0E2519] group-hover:text-[#FAF9F5] transition-colors duration-400 mb-6">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>

                    <h3 className="text-lg font-medium text-[#17181C] mb-3 group-hover:text-[#0E2519] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-[13.5px] text-[#5A5D64] leading-[1.75] font-light">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#E5E1D8] flex items-center justify-between text-[11px] font-semibold tracking-[0.15em] uppercase text-[#0E2519] group-hover:text-[#C5A880] transition-colors">
                    <span>Inquire Desk</span>
                    <ArrowUpRight size={13} strokeWidth={1.5} />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
