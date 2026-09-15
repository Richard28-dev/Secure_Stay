import { useState } from 'react';
import { locations } from '../data/properties';
import ScrollReveal from './ScrollReveal';
import { MapPin, ArrowUpRight, Building } from 'lucide-react';

const cityVignettes: Record<string, { image: string; tag: string; description: string }> = {
  Bangalore: {
    image: '/images/grand-oak-residence.jpg',
    tag: 'Garden City Luxury Corridor',
    description: 'Ultra-luxury villas in Whitefield, North Bangalore, and Koramangala enclaves.',
  },
  Hyderabad: {
    image: '/images/skyline-crest.jpg',
    tag: 'Financial District & Jubilee Hills',
    description: 'High-rise glass penthouses with panoramic lake and golf course views.',
  },
  Chennai: {
    image: '/images/lakeview-residence.jpg',
    tag: 'East Coast Road Ocean Estates',
    description: 'Coastal residences and private seafront sanctuaries on the Bay of Bengal.',
  },
  Mumbai: {
    image: '/images/urban-heights.jpg',
    tag: 'Bandra West & South Mumbai',
    description: 'Bespoke sea-facing architectural duplexes and iconic skyline towers.',
  },
  Pune: {
    image: '/images/green-valley-estate.jpg',
    tag: 'Koregaon Park & Baner Hills',
    description: 'Secluded green valley villas designed around tranquil hillside microclimates.',
  },
  Goa: {
    image: '/images/palm-grove-villa.jpg',
    tag: 'North & South Coastal Sanctuaries',
    description: 'Portuguese-modern fusion architectural villas nestled in tropical coconut groves.',
  },
};

export default function Locations() {
  const [activeCity, setActiveCity] = useState('Bangalore');
  const currentCityData = cityVignettes[activeCity] || cityVignettes['Bangalore'];
  const currentLoc = locations.find((l) => l.name === activeCity) || locations[0];

  return (
    <section id="locations" className="section-wrapper bg-[#FAF9F5] text-[#17181C]">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <ScrollReveal>
            <div className="max-w-xl">
              <span className="eyebrow mb-4">Prime Destinations</span>
              <h2 className="section-title text-[#17181C]">
                Strategic Urban Corridors
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <p className="section-subtitle lg:text-right">
              Explore our footprint across India’s most dynamic economic hubs and picturesque leisure enclaves.
            </p>
          </ScrollReveal>
        </div>

        {/* 2-Column City Selector + Active Vignette Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* City Selection Grid (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {locations.map((loc, index) => {
              const isActive = activeCity === loc.name;
              return (
                <ScrollReveal key={loc.name} delay={index * 60}>
                  <button
                    onClick={() => setActiveCity(loc.name)}
                    className={`w-full text-left p-6 rounded-[2px] border transition-all duration-400 flex flex-col justify-between h-[150px] ${
                      isActive
                        ? 'bg-[#0E2519] border-[#0E2519] text-[#FAF9F5] shadow-lg'
                        : 'bg-[#FFFFFF] border-[#E5E1D8] text-[#17181C] hover:border-[#0E2519]/40 hover:shadow-[0_10px_25px_rgba(0,0,0,0.03)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <MapPin size={16} strokeWidth={1.5} className={isActive ? 'text-[#C5A880]' : 'text-[#0E2519]'} />
                      <span className={`text-[10px] tracking-[0.2em] uppercase font-semibold ${isActive ? 'text-[#C5A880]' : 'text-[#8E9199]'}`}>
                        0{index + 1}
                      </span>
                    </div>

                    <div>
                      <h3 className={`text-lg font-medium mb-1 font-serif ${isActive ? 'text-[#FAF9F5]' : 'text-[#17181C]'}`}>
                        {loc.name}
                      </h3>
                      <div className={`text-[11.5px] ${isActive ? 'text-[#FAF9F5]/70' : 'text-[#5A5D64]'}`}>
                        {loc.properties} Available Estates
                      </div>
                    </div>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Active City Editorial Preview (7 cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={200}>
              <div className="bg-[#FFFFFF] border border-[#E5E1D8] rounded-[2px] overflow-hidden h-full flex flex-col justify-between group">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#17181C]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    style={{ backgroundImage: `url(${currentCityData.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute top-6 left-6">
                    <span className="px-3.5 py-1.5 bg-[#0C1015]/85 backdrop-blur-md text-[#C5A880] text-[10px] font-bold tracking-[0.2em] uppercase rounded-[2px] border border-white/10">
                      {currentCityData.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                    <div>
                      <span className="text-[11px] font-medium tracking-[0.2em] text-[#C5A880] uppercase block mb-1">
                        Active Destination
                      </span>
                      <h3 className="text-3xl font-serif-editorial">
                        {currentLoc.name} Real Estate
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-[#FFFFFF]">
                  <p className="text-[14px] text-[#5A5D64] font-light leading-relaxed max-w-md">
                    {currentCityData.description}
                  </p>

                  <a
                    href="#properties"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#properties')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-editorial flex-shrink-0 text-[11px] py-3 px-6"
                  >
                    <span>Explore {currentLoc.name}</span>
                    <ArrowUpRight size={13} strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
