import { useState } from 'react';
import { ArrowRight, Bed, Maximize2, MapPin, ChevronLeft, ChevronRight, Trees, Waves, Sun, Sparkles, PhoneCall } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export default function PremiumShowcase() {
  const { navigate } = useRouter();

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const images = [
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85',
  ];

  const hotspots = [
    { title: 'Living Water Pavilion', desc: 'Frameless glass pavilion over basalt reflection pool' },
    { title: 'Open-Air Stone Bath', desc: 'Handcrafted black river-stone rain shower' },
    { title: 'Banyan Tree Courtyard', desc: 'Centenary banyan canopy providing natural shading' },
  ];

  const handleNext = () => {
    setActiveImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="py-16 lg:py-24 bg-[#0A2A1D] text-[#FAF8F5] border-t border-white/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#164733]/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="container-luxury relative z-10">
        {/* Editorial Advertisement Container */}
        <div className="bg-[#0E3324] border border-white/15 rounded-[12px] p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Large High-Resolution Photography (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-[16/11] rounded-[10px] overflow-hidden border border-white/15 bg-[#061A12] group shadow-lg">
                <img
                  src={images[activeImgIndex]}
                  alt="The Banyan Villa & Water Pavilion"
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

                {/* Top Badge */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-full bg-[#0A2A1D]/90 backdrop-blur-md text-[#FDFBF7] text-[11px] font-semibold border border-[#C5A880]/40 flex items-center gap-1.5">
                  <Trees size={13} className="text-[#C5A880]" />
                  <span>Assagao Forest Sanctuary · North Goa</span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2.5">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIndex(idx)}
                    className={`aspect-[16/10] rounded-[6px] overflow-hidden border transition-all cursor-pointer ${
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
            <div className="lg:col-span-5 space-y-5">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#164733] border border-[#C5A880]/30 text-[#C5A880] text-[11px] font-bold tracking-wider mb-2.5">
                  <Sparkles size={12} />
                  <span>Sanctuary of the Season</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-tight leading-tight">
                  The Banyan Villa & Water Pavilion
                </h3>

                <div className="flex items-center gap-2 text-[14px] text-[#D2DFD2] mt-2">
                  <MapPin size={15} className="text-[#C5A880] shrink-0" />
                  <span>Assagao, North Goa · 1.2 Acres Protected Forest Edge</span>
                </div>
              </div>

              <div className="py-3 border-y border-white/15 flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#A3B8A8] font-medium block">
                    Acquisition Value
                  </span>
                  <span className="text-3xl font-bold text-[#C5A880] font-heading">
                    ₹4.85 Cr
                  </span>
                </div>
                <span className="text-[12px] text-[#A3B8A8] bg-white/10 px-2.5 py-1 rounded">
                  Freehold Title · Ready
                </span>
              </div>

              {/* Key Facts Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-[12.5px] text-[#FAF8F5]">
                <div className="flex items-center gap-2 p-2.5 rounded-[6px] bg-white/5 border border-white/10">
                  <Bed size={15} className="text-[#C5A880]" />
                  <span>4 En-suite Suites</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-[6px] bg-white/5 border border-white/10">
                  <Waves size={15} className="text-[#C5A880]" />
                  <span>20m Basalt Pool</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-[6px] bg-white/5 border border-white/10">
                  <Maximize2 size={15} className="text-[#C5A880]" />
                  <span>6,800 sq.ft Built</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-[6px] bg-white/5 border border-white/10">
                  <Sun size={15} className="text-[#C5A880]" />
                  <span>100% Solar Powered</span>
                </div>
              </div>

              <p className="text-[13.5px] text-[#D2DFD2] leading-relaxed">
                An exceptional biophilic masterwork surrounded by native banyan groves and cashew orchards. Designed with open-to-sky living courtyards, natural cross-ventilation, and strict sub-35dB acoustic tranquility.
              </p>

              {/* Architectural Hotspots */}
              <div className="space-y-1.5 pt-1">
                {hotspots.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-[12px] text-[#D2DFD2]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                    <span className="font-semibold text-white">{h.title}:</span>
                    <span>{h.desc}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="px-6 py-3 rounded-[6px] bg-[#C5A880] hover:bg-[#D4BC96] text-[#0A2A1D] text-[13.5px] font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <PhoneCall size={15} />
                  <span>Book Private Walkthrough</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/search', { city: 'Goa', type: 'Villa' })}
                  className="px-5 py-3 rounded-[6px] bg-transparent hover:bg-white/10 text-white border border-white/25 text-[13.5px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Goa Villas</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
