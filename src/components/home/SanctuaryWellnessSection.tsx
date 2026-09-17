import { useState } from 'react';
import { Wind, Waves, Sun, Sparkles, Shield, ArrowRight, CheckCircle2, Droplets, Volume2 } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export default function SanctuaryWellnessSection() {
  const { navigate } = useRouter();

  const [activePillar, setActivePillar] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

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
      hotspots: [
        { label: 'Dual-Aspect Louvers', x: '25%', y: '35%', info: 'Draws continuous thermal breeze' },
        { label: 'Living Garden Court', x: '55%', y: '65%', info: 'Oxygen-producing native plants' },
      ],
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
      hotspots: [
        { label: 'Natural Basalt Pool', x: '35%', y: '70%', info: 'Cools ambient air naturally' },
        { label: 'Reflection Cascade', x: '70%', y: '45%', info: 'Acoustic trickling water' },
      ],
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
      hotspots: [
        { label: 'Cantilever Shading', x: '30%', y: '25%', info: 'Blocks harsh afternoon sun' },
        { label: 'Sunrise Clerestory', x: '65%', y: '40%', info: 'Captures golden morning rays' },
      ],
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
      hotspots: [
        { label: 'Teak Yoga Deck', x: '45%', y: '75%', info: 'Dedicated sunrise meditation' },
        { label: 'Open-Air Stone Bath', x: '80%', y: '50%', info: 'Black river-stone shower' },
      ],
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
      hotspots: [
        { label: 'Bamboo Green Buffer', x: '20%', y: '55%', info: 'Absorbs ambient external noise' },
        { label: 'Earthen Stone Perimeter', x: '75%', y: '65%', info: 'Guarantees complete privacy' },
      ],
    },
  ];

  const current = pillars[activePillar];
  const CurrentIcon = current.icon;

  return (
    <section className="w-full py-20 lg:py-28 bg-[#F8F5EE] border-t border-b border-[#E5DFD5] relative overflow-hidden">
      {/* Subtle organic light reflections */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E4ECE7]/50 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C5A880]/15 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32" />

      <div className="container-luxury relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E4ECE7] border border-[#0A2A1D]/15 text-[#0A2A1D] text-[12px] font-bold tracking-wider mb-4">
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
                  onClick={() => {
                    setActivePillar(idx);
                    setActiveHotspot(null);
                  }}
                  className={`w-full text-left p-4 sm:p-5 rounded-[12px] transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? 'bg-white border-[#0A2A1D] shadow-md -translate-y-0.5'
                      : 'bg-white/60 hover:bg-white border-[#E5DFD5] hover:border-[#8FA89B]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2.5 rounded-[10px] transition-colors shrink-0 ${
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
                        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${isActive ? 'bg-[#E4ECE7] text-[#0A2A1D]' : 'bg-[#F4EFE6] text-[#57605B]'}`}>
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

          {/* Right: Immersive Interactive Showcase with Hotspots */}
          <div className="lg:col-span-7 bg-white rounded-[16px] border border-[#E5DFD5] shadow-xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Image Preview with Interactive Hotspots */}
              <div className="relative rounded-[12px] overflow-hidden aspect-[16/10] border border-[#E5DFD5] group">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />

                {/* Top Floating Metric Badge */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-full bg-[#0A2A1D]/90 backdrop-blur-md text-[#FDFBF7] text-[11.5px] font-semibold border border-[#C5A880]/30 flex items-center gap-1.5 shadow-md">
                  <CurrentIcon size={13} className="text-[#C5A880]" />
                  <span>{current.metric}</span>
                </div>

                {/* Top Right Subtle Soundscape Badge */}
                <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[#FAF8F5] text-[10.5px] font-medium flex items-center gap-1.5 border border-white/10 hidden sm:flex">
                  <Volume2 size={12} className="text-[#C5A880]" />
                  <span>Nature Soundscape · 432Hz</span>
                </div>

                {/* Interactive Hotspot Pins on Photo */}
                {current.hotspots.map((hs, i) => (
                  <div
                    key={i}
                    style={{ left: hs.x, top: hs.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(activeHotspot === i ? null : i)}
                      className="relative w-7 h-7 rounded-full bg-[#0A2A1D] text-[#C5A880] border-2 border-white shadow-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-115 group/pin"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-ping absolute inset-0 m-auto opacity-75" />
                      <span className="text-[10px] font-bold font-mono">0{i + 1}</span>
                    </button>

                    {/* Hotspot Popover Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white/95 backdrop-blur-md text-[#1A1E1C] p-2.5 rounded-[8px] border border-[#E5DFD5] shadow-xl text-left pointer-events-none opacity-0 group-hover/pin:opacity-100 transition-opacity z-30">
                      <p className="text-[11.5px] font-bold text-[#0A2A1D]">{hs.label}</p>
                      <p className="text-[10.5px] text-[#57605B] mt-0.5">{hs.info}</p>
                    </div>
                  </div>
                ))}
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
                Discover verified residences embodying these biophilic standards
              </div>
              <button
                type="button"
                onClick={() => navigate('/buy')}
                className="btn-forest text-[13.5px] px-5 py-2.5 rounded-[8px] flex items-center gap-2 cursor-pointer shadow-xs hover:shadow transition-all"
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
