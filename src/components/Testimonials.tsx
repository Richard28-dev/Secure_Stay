import { testimonials } from '../data/properties';
import ScrollReveal from './ScrollReveal';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="section-wrapper bg-[#FAF9F5] text-[#17181C] border-t border-[#E5E1D8]">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <ScrollReveal>
            <span className="eyebrow mb-4">Provenance & Trust</span>
            <h2 className="section-title text-[#17181C]">
              Client Perspectives
            </h2>
            <p className="text-[1rem] text-[#5A5D64] mt-3 font-light">
              Voices of discerning homeowners and institutional patrons who entrusted their acquisitions to SecureStay.
            </p>
          </ScrollReveal>
        </div>

        {/* Editorial Quote Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 130}>
              <div className="bg-[#FFFFFF] border border-[#E5E1D8] p-8 lg:p-10 rounded-[2px] h-full flex flex-col justify-between hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-400">
                <div>
                  <Quote size={24} strokeWidth={1.5} className="text-[#C5A880] mb-6 opacity-70" />
                  <p className="font-serif italic text-[1.125rem] text-[#17181C] leading-[1.7] mb-8 font-normal">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="pt-6 border-t border-[#E5E1D8]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#0E2519] flex items-center justify-center text-[#FAF9F5] text-[12px] font-semibold tracking-wider font-serif">
                      {testimonial.name.split(' ')[0][0]}
                      {testimonial.name.includes('&') ? '' : testimonial.name.split(' ').slice(-1)[0][0]}
                    </div>
                    <div>
                      <div className="text-[13.5px] font-medium text-[#17181C]">
                        {testimonial.name}
                      </div>
                      <div className="text-[11px] text-[#C5A880] tracking-wider uppercase font-semibold">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
