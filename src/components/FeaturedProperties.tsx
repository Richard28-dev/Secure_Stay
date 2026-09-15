import { useState } from 'react';
import { properties } from '../data/properties';
import PropertyCard from './PropertyCard';
import PropertyModal from './PropertyModal';
import ScrollReveal from './ScrollReveal';
import type { Property } from '../data/properties';
import { ArrowRight, BedDouble, Maximize2, MapPin, Sparkles } from 'lucide-react';

const propertyImages: Record<string, string> = {
  'grand-oak-residence': '/images/grand-oak-residence.jpg',
  'skyline-crest': '/images/skyline-crest.jpg',
  'palm-grove-villa': '/images/palm-grove-villa.jpg',
  'urban-heights': '/images/urban-heights.jpg',
  'green-valley-estate': '/images/green-valley-estate.jpg',
  'lakeview-residence': '/images/lakeview-residence.jpg',
};

const filterLocations = ['All Estates', 'Bangalore', 'Mumbai', 'Goa', 'Hyderabad', 'Pune'];

export default function FeaturedProperties() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeFilter, setActiveFilter] = useState('All Estates');

  const leadProperty = properties.find((p) => p.id === 'grand-oak-residence') || properties[0];
  const gridProperties = properties.filter((p) => {
    if (activeFilter === 'All Estates') return p.id !== leadProperty.id;
    return p.location === activeFilter && p.id !== leadProperty.id;
  });

  return (
    <>
      <section id="properties" className="section-wrapper bg-[#FAF9F5]">
        <div className="container-luxury">
          {/* Section Header with Editorial Split */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
            <ScrollReveal>
              <div className="max-w-xl">
                <span className="eyebrow mb-4">The Portfolio</span>
                <h2 className="section-title text-[#17181C]">
                  Curated Private Residences
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="flex flex-col items-start lg:items-end gap-4">
                <p className="text-[0.95rem] text-[#5A5D64] max-w-md font-light leading-relaxed lg:text-right">
                  Selected for their architectural distinction, prime geographic provenance, and enduring capital value.
                </p>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {filterLocations.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-3.5 py-1.5 text-[11px] font-medium tracking-[0.1em] uppercase rounded-[2px] border transition-all duration-300 ${
                        activeFilter === filter
                          ? 'border-[#0E2519] bg-[#0E2519] text-[#FAF9F5]'
                          : 'border-[#E5E1D8] bg-[#FFFFFF] text-[#5A5D64] hover:border-[#0E2519]'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* 1. ASYMMETRIC LEAD FEATURE PROPERTY (60/40 Split) */}
          <ScrollReveal delay={200}>
            <div
              onClick={() => setSelectedProperty(leadProperty)}
              className="group mb-16 bg-[#FFFFFF] border border-[#E5E1D8] rounded-[2px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 cursor-pointer hover:border-[#0E2519]/40 hover:shadow-[0_25px_50px_rgba(0,0,0,0.05)] transition-all duration-500"
            >
              {/* Lead Image (7 cols) */}
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[460px] overflow-hidden bg-[#17181C]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  style={{ backgroundImage: `url(${propertyImages[leadProperty.id]})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <span className="px-3.5 py-1.5 bg-[#0E2519] text-[#FAF9F5] text-[10px] font-bold tracking-[0.2em] uppercase rounded-[2px] flex items-center gap-1.5">
                    <Sparkles size={11} className="text-[#C5A880]" />
                    Featured Estate of the Month
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 lg:hidden">
                  <span className="text-white text-3xl font-serif-editorial">
                    {leadProperty.price}
                  </span>
                </div>
              </div>

              {/* Lead Editorial Overview (5 cols) */}
              <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between bg-[#FFFFFF]">
                <div>
                  <div className="flex items-center gap-2 text-[#C5A880] text-[11px] font-semibold tracking-[0.2em] uppercase mb-3">
                    <MapPin size={13} strokeWidth={1.5} />
                    <span>{leadProperty.location}</span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-medium text-[#17181C] mb-4 group-hover:text-[#0E2519] transition-colors">
                    {leadProperty.name}
                  </h3>

                  <p className="text-[14px] text-[#5A5D64] leading-[1.8] font-light mb-8">
                    {leadProperty.description}
                  </p>

                  <div className="grid grid-cols-2 gap-6 py-6 border-y border-[#E5E1D8] mb-8">
                    <div>
                      <span className="block text-[10px] tracking-[0.2em] uppercase text-[#8E9199] mb-1">
                        Accommodations
                      </span>
                      <div className="flex items-center gap-1.5 text-[#17181C] text-[15px] font-medium">
                        <BedDouble size={16} className="text-[#0E2519]" />
                        <span>{leadProperty.bedrooms} En-suite Bedrooms</span>
                      </div>
                    </div>
                    <div>
                      <span className="block text-[10px] tracking-[0.2em] uppercase text-[#8E9199] mb-1">
                        Total Built Area
                      </span>
                      <div className="flex items-center gap-1.5 text-[#17181C] text-[15px] font-medium">
                        <Maximize2 size={15} className="text-[#0E2519]" />
                        <span>{leadProperty.area}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="hidden lg:block">
                    <span className="block text-[10px] tracking-[0.2em] uppercase text-[#8E9199]">
                      Acquisition Price
                    </span>
                    <span className="text-3xl font-serif-editorial text-[#17181C]">
                      {leadProperty.price}
                    </span>
                  </div>

                  <button className="btn-editorial">
                    <span>View Property Dossier</span>
                    <ArrowRight size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* 2. OFFSET MASONRY / GRID OF CURATED ESTATES */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridProperties.map((property, index) => (
              <ScrollReveal key={property.id} delay={index * 120}>
                <PropertyCard
                  property={property}
                  onViewDetails={setSelectedProperty}
                  imageUrl={propertyImages[property.id]}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          imageUrl={propertyImages[selectedProperty.id]}
        />
      )}
    </>
  );
}
