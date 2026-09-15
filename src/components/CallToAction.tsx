import ScrollReveal from './ScrollReveal';
import { ArrowUpRight } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="section-wrapper bg-[#0A1C13] text-[#FAF9F5] relative overflow-hidden">
      {/* Background Architectural Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#143C28]/30 rounded-full blur-[160px] pointer-events-none" />

      <div className="container-luxury relative z-10 text-center max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-6 h-[1px] bg-[#C5A880]" />
            <span className="eyebrow text-[#C5A880]">
              Private Representation
            </span>
            <span className="w-6 h-[1px] bg-[#C5A880]" />
          </div>

          <h2 className="section-title text-[#FAF9F5] mb-6">
            Begin Your Private Acquisition Journey
          </h2>

          <p className="text-[1.05rem] text-[#8E9199] leading-[1.8] font-light mb-10 max-w-xl mx-auto">
            Connect directly with our senior managing directors for confidential consultations, off-market estates, and personalized architectural previews.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-5">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-editorial-gold"
            >
              <span>Schedule Private Advisory</span>
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>

            <a
              href="#properties"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#properties')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-editorial-light"
            >
              <span>Explore Portfolio</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
