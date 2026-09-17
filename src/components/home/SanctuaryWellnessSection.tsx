import { useState } from 'react';
import { Wind, Waves, Sun, Sparkles, Shield, ArrowRight, CheckCircle2, Droplets } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export default function SanctuaryWellnessSection() {
  const { navigate } = useRouter();

  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      id: 'air',
      title: 'Natural Cross-Breeze & Pure Airflow',
      tagline: 'Continuous fresh air exchange through dual-aspect ventilation',
      icon: Wind,
      description:
        'Engineered with dual-aspect louvers and open-air courtyards, our residences draw in mountain breezes and ocean thermals, maintaining 30% higher natural oxygen circulation without constant artificial HVAC.',
      metric: '+30% Natural Airflow',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      highlights: ['Dual-aspect ventilation', 'Open-to-sky living courts', 'Passive cooling chimneys'],
    },
    {
      id: 'water',
      title: 'Water Elements & Thermal Calm',
      tagline: 'Natural evaporative cooling through basalt reflection pools',
      icon: Waves,
      description:
        'Basalt lap pools, koi ponds, and cascading water features naturally lower ambient temperatures by up to 3°C, forming a refreshing private microclimate and soothing acoustic backdrop.',
      metric: '-3°C Natural Cooling',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80',
      highlights: ['Natural basalt lap pools', 'Rainwater collection basins', 'Evaporative cooling courts'],
    },
    {
      id: 'light',
      title: 'Circadian Daylight Architecture',
      tagline: 'Morning-oriented rooms aligned with biological sleep cycles',
      icon: Sun,
      description:
        'Deep cantilevered timber eaves and high clerestory windows capture soft dawn light while shading living areas from harsh afternoon glare, promoting deep restorative sleep rhythms.',
      metric: '100% Glare-Free Natural Light',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
      highlights: ['Deep timber eaves', 'Morning light bedrooms', 'Filtered skylight shafts'],
    },
    {
      id: 'wellness',
      title: 'Restorative Living Pavilions',
      tagline: 'Private yoga decks, stone rain baths & organic gardens',
      icon: Sparkles,
      description:
        'Thoughtfully integrated outdoor spaces featuring shaded teak yoga pavilions, outdoor rain showers sculpted from black river stone, and fragrant medicinal herb borders.',
      metric: 'Private Wellness Enclaves',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      highlights: ['Shaded yoga decks', 'Basalt outdoor rain showers', 'Organic edible gardens'],
    },
    {
      id: 'privacy',
      title: 'Acoustic Stillness & Seclusion',
      tagline: 'Protected tree perimeters guaranteeing deep acoustic quiet',
      icon: Shield,
      description:
        'Each estate sits within protected green boundaries, utilizing native bamboo groves, earthen stone walls, and natural elevation drops to maintain sub-35dB peaceful interior stillness.',
      metric: '<35 dB Ambient Sound',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80',
      highlights: ['Sub-35dB acoustic stillness', 'Protected tree perimeter', 'Discreet private gated entry'],
    },
  ];

  const current = pillars[activePillar];
  const CurrentIcon = current.icon;

  return (
    <section className="w-full py-20 lg:py-28 bg-[#F8F5EE] border-t border-b border-[#E5DFD5] relative overflow-hidden">
      {/* Decorative subtle botanical background pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E4ECE7]/40 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4B995]/20 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32" />

      <div className="container-luxury relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E4ECE7] border border-[#0A2A1D]/15 text-[#0A2A1D] text-[12px] font-bold tracking-wider mb-4">
            <Droplets size={14} className="text-[#0A2A1D]" />
            <span>Biophilic Architecture & Spatial Wellness</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1A1E1C] tracking-tight leading-[1.15] font-heading">
            Architecture Designed to Restore, <br className="hidden sm:inline" />
            <span className="text-[#0A2A1D] italic font-serif">Rebalance, and Reconnect.</span>
          </h2>

          <p className="text-[16.5px] text-[#57605B] mt-4 leading-relaxed font-normal">
            True luxury is the quiet restoration of mind and body. Every SecureStay sanctuary is designed with natural cross-ventilation, soft morning daylight, native living flora, and certified acoustic seclusion.
          </p>
        </div>

        {/* Interactive Feature Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Pillar Selectors */}
          <div className="lg:col-span-5 space-y-3">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              const isActive = activePillar === idx;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePillar(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-[10px] transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? 'bg-white border-[#0A2A1D] shadow-md -translate-y-0.5'
                      : 'bg-white/60 hover:bg-white border-[#E5DFD5] hover:border-[#8FA89B]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2.5 rounded-[8px] transition-colors shrink-0 ${
                        isActive ? 'bg-[#0A2A1D] text-[#FDFBF7]' : 'bg-[#E4ECE7] text-[#0A2A1D]'
                      }`}
                    >
                      <Icon size={20} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={`text-[15px] font-bold font-heading ${isActive ? 'text-[#0A2A1D]' : 'text-[#1A1E1C]'}`}>
                          {p.title}
                        </h4>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${isActive ? 'bg-[#E4ECE7] text-[#0A2A1D]' : 'bg-[#F4EFE6] text-[#57605B]'}`}>
                          {p.metric}
                        </span>
                      </div>
                      <p className="text-[13px] text-[#57605B] mt-1 leading-snug">
                        {p.tagline}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Immersive Interactive Showcase */}
          <div className="lg:col-span-7 bg-white rounded-[12px] border border-[#E5DFD5] shadow-lg p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Image Preview */}
              <div className="relative rounded-[10px] overflow-hidden aspect-[16/10] border border-[#E5DFD5]">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0A2A1D]/90 backdrop-blur-md text-[#FDFBF7] text-[11px] font-semibold border border-[#C5A880]/30 flex items-center gap-1.5">
                  <CurrentIcon size={13} className="text-[#C5A880]" />
                  <span>{current.metric}</span>
                </div>
              </div>

              {/* Detail Content */}
              <div>
                <h3 className="text-2xl font-bold text-[#1A1E1C] font-heading">
                  {current.title}
                </h3>
                <p className="text-[15px] text-[#57605B] mt-2 leading-relaxed">
                  {current.description}
                </p>

                {/* Highlight Checkmarks */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#E5DFD5]">
                  {current.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-[12.5px] text-[#1A1E1C] font-medium">
                      <CheckCircle2 size={15} className="text-[#0A2A1D] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-6 mt-6 border-t border-[#E5DFD5] flex flex-wrap items-center justify-between gap-4">
              <div className="text-[13px] text-[#57605B]">
                Looking for a private sanctuary estate?
              </div>
              <button
                type="button"
                onClick={() => navigate('/buy')}
                className="btn-forest text-[13.5px] px-5 py-2.5 rounded-[6px] flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Explore Villas & Estates</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
