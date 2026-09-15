import { projects } from '../data/properties';
import ScrollReveal from './ScrollReveal';
import { ArrowUpRight } from 'lucide-react';

const projectBackdrops = [
  'url(/images/skyline-crest.jpg)',
  'url(/images/palm-grove-villa.jpg)',
  'url(/images/urban-heights.jpg)',
];

export default function SignatureProjects() {

  return (
    <section id="projects" className="section-wrapper bg-[#F2EFE9] text-[#17181C]">
      <div className="container-luxury">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <ScrollReveal>
            <div className="max-w-xl">
              <span className="eyebrow mb-4">Flagship Masterplans</span>
              <h2 className="section-title text-[#17181C]">
                Signature Developments
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <p className="section-subtitle lg:text-right">
              Landmark residential masterplans engineered in collaboration with world-renowned architects and environmental landscape studios.
            </p>
          </ScrollReveal>
        </div>

        {/* Alternate Story Deck: 3 Editorial Development Cards with Layered Information */}
        <div className="space-y-12">
          {projects.map((project, index) => {
            const isEven = index % 2 === 1;
            return (
              <ScrollReveal key={project.id} delay={index * 150}>
                <div className="bg-[#FFFFFF] border border-[#E5E1D8] rounded-[2px] overflow-hidden hover:shadow-[0_25px_50px_rgba(0,0,0,0.04)] transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 group">
                  {/* Visual Frame (7 cols) */}
                  <div
                    className={`lg:col-span-7 relative min-h-[340px] lg:min-h-[440px] overflow-hidden bg-[#17181C] ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      style={{ backgroundImage: projectBackdrops[index] || 'linear-gradient(135deg, #0E2519, #17181C)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Development Number & Status */}
                    <div className="absolute top-6 left-6 flex items-center gap-3">
                      <span className="px-3.5 py-1.5 bg-[#0C1015]/85 backdrop-blur-md text-[#C5A880] text-[10px] font-bold tracking-[0.2em] uppercase rounded-[2px] border border-white/10">
                        Phase 0{index + 1} Development
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                      <div className="text-white">
                        <span className="text-[11px] font-medium tracking-[0.2em] text-[#C5A880] uppercase block mb-1">
                          {project.location}
                        </span>
                        <h4 className="text-2xl font-serif-editorial text-white">
                          {project.name}
                        </h4>
                      </div>
                      <span className="text-white text-lg font-serif-editorial bg-[#0E2519]/90 px-4 py-1.5 rounded-[2px] hidden sm:inline-block">
                        From {project.startingPrice}
                      </span>
                    </div>
                  </div>

                  {/* Narrative Frame (5 cols) */}
                  <div
                    className={`lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between bg-[#FFFFFF] ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8E9199]">
                          Masterplan Index
                        </span>
                        <span className="w-6 h-[1px] bg-[#C5A880]" />
                      </div>

                      <h3 className="text-2xl font-medium text-[#17181C] mb-4 group-hover:text-[#0E2519] transition-colors">
                        {project.name}
                      </h3>

                      <p className="text-[13.5px] text-[#5A5D64] leading-[1.8] font-light mb-8">
                        An iconic address offering bespoke residences with uninterrupted views, private wellness clubs, concierge hospitality, and sustainable biophilic architecture.
                      </p>

                      <div className="grid grid-cols-3 gap-4 py-5 border-y border-[#E5E1D8] mb-8 text-[12px]">
                        <div>
                          <span className="block text-[9px] uppercase tracking-[0.18em] text-[#8E9199] mb-1">
                            Typology
                          </span>
                          <span className="font-semibold text-[#17181C]">{project.type}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] uppercase tracking-[0.18em] text-[#8E9199] mb-1">
                            Residences
                          </span>
                          <span className="font-semibold text-[#17181C]">{project.residences} Units</span>
                        </div>
                        <div>
                          <span className="block text-[9px] uppercase tracking-[0.18em] text-[#8E9199] mb-1">
                            Delivery
                          </span>
                          <span className="font-semibold text-[#17181C]">{project.completion}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <a
                        href="#contact"
                        className="btn-editorial text-[11px] py-3 px-6"
                      >
                        <span>Request Masterplan Brochure</span>
                        <ArrowUpRight size={13} strokeWidth={1.5} />
                      </a>
                    </div>
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
