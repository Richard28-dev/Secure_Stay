import ScrollReveal from './ScrollReveal';
import { ShieldCheck, Compass, Award, Gem, ArrowRight } from 'lucide-react';

const pillars = [
  {
    num: '01',
    icon: Gem,
    title: 'Architectural Curation',
    description: 'Every estate in our private portfolio undergoes rigorous structural, aesthetic, and spatial evaluation before representation.',
  },
  {
    num: '02',
    icon: ShieldCheck,
    title: 'Uncompromised Title Diligence',
    description: 'Full legal certification, municipal approvals verification, and title transparency handled by top-tier property legal counsels.',
  },
  {
    num: '03',
    icon: Compass,
    title: 'Geographic Provenance',
    description: 'Exclusive positioning in micro-markets marked by robust infrastructure development, privacy, and long-term capital preservation.',
  },
  {
    num: '04',
    icon: Award,
    title: 'Private Client Advisory',
    description: 'Discreet, bespoke end-to-end stewardship from confidential viewing arrangements to international asset structuring.',
  },
];

export default function WhySecureStay() {
  return (
    <section id="why-securestay" className="section-wrapper bg-[#FAF9F5] text-[#17181C]">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <ScrollReveal>
            <div className="max-w-xl">
              <span className="eyebrow mb-4">The Standard</span>
              <h2 className="section-title text-[#17181C]">
                The SecureStay Distinction
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <p className="section-subtitle lg:text-right">
              We operate not merely as real estate brokers, but as custodians of refined living and architectural heritage.
            </p>
          </ScrollReveal>
        </div>

        {/* 4 Pillars Editorial Grid with Numbered Bronze Identifiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.num} delay={index * 120}>
                <div className="group bg-[#FFFFFF] border border-[#E5E1D8] p-8 lg:p-10 rounded-[2px] h-full flex flex-col justify-between hover:border-[#0E2519] hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-400">
                  <div>
                    {/* Top Row: Large Editorial Numeral + Line Icon */}
                    <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#E5E1D8]">
                      <span className="text-3xl font-serif-editorial text-[#C5A880] font-normal group-hover:text-[#0E2519] transition-colors">
                        {pillar.num}
                      </span>
                      <div className="w-10 h-10 rounded-[2px] bg-[#F2EFE9] flex items-center justify-center text-[#0E2519] group-hover:bg-[#0E2519] group-hover:text-[#FAF9F5] transition-colors duration-400">
                        <Icon size={18} strokeWidth={1.5} />
                      </div>
                    </div>

                    <h3 className="text-lg font-medium text-[#17181C] mb-3 group-hover:text-[#0E2519] transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-[13.5px] text-[#5A5D64] leading-[1.75] font-light">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#E5E1D8]/60 flex items-center text-[10px] tracking-[0.2em] uppercase font-semibold text-[#8E9199] group-hover:text-[#0E2519] transition-colors">
                    <span>Guaranteed Metric</span>
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
