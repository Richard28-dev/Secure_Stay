import { useState } from 'react';
import { ArrowRight, Bed, Bath, Maximize2, MapPin, ChevronLeft, ChevronRight, Car } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { useRouter } from '../../context/RouterContext';

export default function PremiumShowcase() {
  const { properties } = useProperties();
  const { navigate } = useRouter();

  const showcaseProperty = properties.find((p) => p.id === 'prop-grand-oak') || properties[0];
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  if (!showcaseProperty) return null;

  const images = (showcaseProperty.images && showcaseProperty.images.length > 0)
    ? showcaseProperty.images
    : [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
      ];

  const handleNext = () => {
    setActiveImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="py-16 lg:py-24 bg-[#0A2A1D] text-[#FAF8F5] border-t border-white/10">
      <div className="container-luxury">
        {/* Editorial Advertisement Container */}
        <div className="bg-[#0E3324] border border-white/15 rounded-[8px] p-6 sm:p-10 lg:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Large High-Resolution Photography (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-[16/11] rounded-[8px] overflow-hidden border border-white/15 bg-[#061A12] group">
                <img
                  src={images[activeImgIndex] || images[0]}
                  alt={showcaseProperty.title}
                  className="w-full h-full object-cover transition-all duration-700"
                  loading="lazy"
                />

                {/* Subtle Image Slider Controls */}
                <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous image"
                    className="pointer-events-auto w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next image"
                    className="pointer-events-auto w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-[4px] bg-black/70 text-[11px] font-mono text-[#D2DFD2]">
                  {activeImgIndex + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2.5">
                {images.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIndex(idx)}
                    className={`aspect-[16/10] rounded-[4px] overflow-hidden border transition-all cursor-pointer ${
                      activeImgIndex === idx
                        ? 'border-[#C5A880] ring-1 ring-[#C5A880]'
                        : 'border-white/15 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Property Advertisement Story & Specifications (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#164733] border border-[#C5A880]/30 text-[#C5A880] text-[11px] font-bold uppercase tracking-wider mb-3">
                  <span>Property of the Month</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight leading-tight">
                  {showcaseProperty.title}
                </h3>

                <div className="flex items-center gap-2 text-[14px] text-[#D2DFD2] mt-2">
                  <MapPin size={15} className="text-[#C5A880] shrink-0" />
                  <span>{showcaseProperty.location}</span>
                </div>
              </div>

              <div className="py-3 border-y border-white/15">
                <span className="text-[11.5px] uppercase tracking-wider text-[#A3B8A8] font-medium block">
                  Offered Price
                </span>
                <span className="text-3xl font-bold text-[#C5A880] font-heading">
                  {showcaseProperty.price}
                </span>
              </div>

              {/* Key Facts Grid */}
              <div className="grid grid-cols-2 gap-3 text-[13px] text-[#FAF8F5]">
                <div className="flex items-center gap-2.5 p-2.5 rounded-[6px] bg-white/5 border border-white/10">
                  <Bed size={16} className="text-[#C5A880]" />
                  <span>{showcaseProperty.bedrooms} Luxury Suites</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-[6px] bg-white/5 border border-white/10">
                  <Bath size={16} className="text-[#C5A880]" />
                  <span>{showcaseProperty.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-[6px] bg-white/5 border border-white/10">
                  <Maximize2 size={16} className="text-[#C5A880]" />
                  <span>{showcaseProperty.area}</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-[6px] bg-white/5 border border-white/10">
                  <Car size={16} className="text-[#C5A880]" />
                  <span>{showcaseProperty.parking || 2} Covered Parking</span>
                </div>
              </div>

              <p className="text-[13.5px] text-[#D2DFD2] leading-relaxed">
                An exceptional architectural residence featuring private landscaped lawns, floor-to-ceiling thermal glazing, and complete RERA legal title certification.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate(`/property/${showcaseProperty.id}`)}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-[6px] bg-[#C5A880] hover:bg-[#D4BC96] text-[#0A2A1D] text-[14px] font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>View Property Dossier</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
