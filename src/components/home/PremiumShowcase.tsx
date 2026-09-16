import { useState } from 'react';
import { ShieldCheck, ArrowRight, Bed, Bath, Maximize2, MapPin, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { useRouter } from '../../context/RouterContext';

export default function PremiumShowcase() {
  const { properties } = useProperties();
  const { navigate } = useRouter();

  // Select top luxury estate
  const showcaseProperty = properties.find((p) => p.id === 'prop-grand-oak') || properties[0];
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  if (!showcaseProperty) return null;

  const images = (showcaseProperty.images && showcaseProperty.images.length > 0) ? showcaseProperty.images : [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
  ];

  const handleNext = () => {
    setActiveImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const propertyId = showcaseProperty.id || (showcaseProperty as any)._id || 'ESTATE-01';

  return (
    <section className="section-wrapper bg-[#071710] text-[#FAF8F5] relative overflow-hidden">
      <div className="container-luxury">
        {/* Eyebrow Label */}
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-[#C5A880]" />
          <span className="eyebrow text-[#C5A880]">Architectural Spotlight</span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <h2 className="section-title text-[#FAF8F5]">
            Premium Property Showcase
          </h2>
          <span className="text-[13px] text-[#D2DFD2] font-mono">
            ESTATE ID: {String(propertyId).toUpperCase()}
          </span>
        </div>

        {/* Wide Editorial Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Large Imagery with Subtle Gallery Controls (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/11] rounded-[8px] overflow-hidden border border-white/15 shadow-2xl group bg-[#0E2A1E]">
              <img
                src={images[activeImgIndex] || images[0]}
                alt={showcaseProperty.title || 'Featured Property'}
                className="w-full h-full object-cover transition-all duration-700"
              />

              {/* Verified Ribbon */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-[6px] bg-[#0E2A1E]/90 border border-[#C5A880]/40 backdrop-blur-md text-[#FAF8F5] text-[11px] font-semibold">
                <ShieldCheck size={14} className="text-[#C5A880]" />
                <span>Verified Private Compound</span>
              </div>

              {/* Gallery Arrow Controls */}
              <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={handlePrev}
                  aria-label="Previous image"
                  className="pointer-events-auto w-10 h-10 rounded-full bg-[#071710]/80 hover:bg-[#071710] text-[#FAF8F5] flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next image"
                  className="pointer-events-auto w-10 h-10 rounded-full bg-[#071710]/80 hover:bg-[#071710] text-[#FAF8F5] flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Image Counter Indicator */}
              <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-[4px] bg-[#071710]/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-[#D2DFD2]">
                {activeImgIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-3 mt-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`relative aspect-[16/10] rounded-[6px] overflow-hidden border transition-all cursor-pointer ${
                    activeImgIndex === idx
                      ? 'border-[#C5A880] ring-2 ring-[#C5A880]/30'
                      : 'border-white/15 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Location */}
              <div className="flex items-center gap-1.5 text-[13px] text-[#C5A880] mb-2 font-medium">
                <MapPin size={15} />
                <span>{showcaseProperty.location}</span>
              </div>

              {/* Title */}
              <h3 className="text-[28px] md:text-[32px] font-extrabold text-[#FAF8F5] font-heading leading-tight mb-4">
                {showcaseProperty.title}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <span className="text-[11px] text-[#D2DFD2] uppercase tracking-wider block">
                  Listing Valuation
                </span>
                <span className="text-[32px] font-extrabold text-[#C5A880] font-heading">
                  {showcaseProperty.price}
                </span>
                {showcaseProperty.pricePerSqFt && (
                  <span className="text-[12px] text-[#D2DFD2]/70 ml-2">
                    ({showcaseProperty.pricePerSqFt})
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-[14px] text-[#D2DFD2] leading-relaxed mb-6 font-light">
                {showcaseProperty.description}
              </p>

              {/* Highlights List */}
              {showcaseProperty.highlights && showcaseProperty.highlights.length > 0 && (
                <div className="space-y-2.5 mb-8">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-[#FAF8F5] block">
                    Key Architectural Highlights:
                  </span>
                  {showcaseProperty.highlights.slice(0, 3).map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-[13px] text-[#FAF8F5]/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] mt-2 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Key Specs */}
              <div className="grid grid-cols-3 gap-3 py-4 border-y border-white/15 text-[13px] mb-8">
                <div>
                  <span className="text-[11px] text-[#D2DFD2] block">Bedrooms</span>
                  <span className="font-bold text-[#FAF8F5] flex items-center gap-1.5 mt-0.5">
                    <Bed size={15} className="text-[#C5A880]" />
                    {showcaseProperty.bedrooms} Suites
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[#D2DFD2] block">Bathrooms</span>
                  <span className="font-bold text-[#FAF8F5] flex items-center gap-1.5 mt-0.5">
                    <Bath size={15} className="text-[#C5A880]" />
                    {showcaseProperty.bathrooms} Baths
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[#D2DFD2] block">Total Living Area</span>
                  <span className="font-bold text-[#FAF8F5] flex items-center gap-1.5 mt-0.5">
                    <Maximize2 size={15} className="text-[#C5A880]" />
                    {showcaseProperty.area}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate(`/property/${showcaseProperty.id}`)}
                className="btn-gold flex items-center gap-2 px-7 py-3.5 text-[14px] rounded-[8px] cursor-pointer"
              >
                <span>View Property Dossier</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => navigate('/contact')}
                className="btn-outline-light px-6 py-3.5 text-[14px] rounded-[8px] cursor-pointer"
              >
                Request Private Viewing
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
