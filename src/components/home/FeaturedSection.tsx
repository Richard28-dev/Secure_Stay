import { useState } from 'react';
import { ArrowRight, ArrowUpDown, Filter, Heart, Bed, Bath, Maximize2, MapPin } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import PropertyCard from '../common/PropertyCard';
import { useRouter } from '../../context/RouterContext';

export default function FeaturedSection() {
  const { properties, isSaved, toggleSaveProperty } = useProperties();
  const { navigate } = useRouter();

  const [activeTab, setActiveTab] = useState<'all' | 'Apartment' | 'Villa' | 'Penthouse'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc'>('featured');

  // Filter properties
  let filtered = properties.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'Apartment') return p.type === 'Apartment';
    if (activeTab === 'Villa') return p.type === 'Villa' || p.type === 'Estate';
    if (activeTab === 'Penthouse') return p.type === 'Penthouse';
    return true;
  });

  // Sort properties
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'price_asc') return a.priceValue - b.priceValue;
    if (sortBy === 'price_desc') return b.priceValue - a.priceValue;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const heroProperty = filtered[0];
  const companionProperties = filtered.slice(1, 3);
  const remainingProperties = filtered.slice(3, 6);

  return (
    <section id="featured" className="py-16 lg:py-24 bg-white border-t border-[#E5E0D8]">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E4ECE7] text-[#0A2A1D] text-[12px] font-bold tracking-wider mb-2.5 border border-[#0A2A1D]/15">
              <span>Verified Portfolio · Exceptional Homes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1E1C] font-heading tracking-tight">
              Properties of Distinction
            </h2>
            <p className="text-[15px] text-[#57605B] mt-2 max-w-xl font-normal leading-relaxed">
              Hand-selected villas, private retreats, and architectural residences chosen for their spatial privacy, light, and natural setting.
            </p>

          {/* Filter Tabs & Sorting */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Tabs */}
            <div className="bg-[#E8EFE8] p-1 rounded-[6px] flex items-center gap-1 border border-[#0E2A1E]/10">
              {[
                { id: 'all', label: 'All' },
                { id: 'Apartment', label: 'Apartments' },
                { id: 'Villa', label: 'Villas' },
                { id: 'Penthouse', label: 'Penthouses' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-[4px] text-[13px] font-medium transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#0E2A1E] text-[#FAF8F5] font-semibold shadow-xs'
                      : 'text-[#1A1C1A] hover:text-[#0E2A1E]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sort Select */}
            <div className="relative flex items-center">
              <ArrowUpDown size={14} className="absolute left-3 text-[#5A605B] pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort properties"
                className="pl-8 pr-7 py-2 bg-white border border-[#E5E0D8] rounded-[6px] text-[13px] text-[#1A1C1A] focus:outline-none focus:border-[#0E2A1E] appearance-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="space-y-8">
            {/* Top Editorial Asymmetry: 1 Prominent Hero Listing (6 cols) + 2 Companion Cards (6 cols) */}
            {heroProperty && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
                {/* Large Featured Property (6 cols) */}
                <div
                  onClick={() => navigate(`/property/${heroProperty.id}`)}
                  className="lg:col-span-6 bg-white border border-[#E5E0D8] hover:border-[#0E2A1E]/40 rounded-[8px] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                >
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#E8EFE8]">
                    <img
                      src={heroProperty.images[0]}
                      alt={heroProperty.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
                      <span className="px-2.5 py-1 rounded-[4px] bg-[#0E2A1E] text-[#FAF8F5] text-[11px] font-bold uppercase tracking-wider">
                        ★ Signature Residence
                      </span>
                      <span className="px-2.5 py-1 rounded-[4px] bg-white/95 text-[#0E2A1E] text-[11px] font-semibold">
                        {heroProperty.type}
                      </span>
                    </div>

                    <button
                      type="button"
                      aria-label="Save property"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveProperty(heroProperty.id);
                      }}
                      className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#1A1C1A] hover:text-rose-600 transition-colors z-10 shadow-xs cursor-pointer"
                    >
                      <Heart
                        size={16}
                        className={isSaved(heroProperty.id) ? 'fill-rose-600 text-rose-600' : 'text-[#1A1C1A]'}
                      />
                    </button>
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-[12.5px] text-[#5A605B] mb-1.5">
                        <MapPin size={14} className="text-[#0E2A1E] shrink-0" />
                        <span>{heroProperty.location}</span>
                      </div>

                      <h3 className="text-[22px] font-bold text-[#1A1C1A] group-hover:text-[#0E2A1E] transition-colors leading-snug font-heading mb-3">
                        {heroProperty.title}
                      </h3>

                      <div className="flex items-center gap-4 text-[13px] text-[#5A605B] pb-4 border-b border-[#E5E0D8]">
                        <span className="flex items-center gap-1.5">
                          <Bed size={15} className="text-[#0E2A1E]" />
                          {heroProperty.bedrooms} BHK
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1.5">
                          <Bath size={15} className="text-[#0E2A1E]" />
                          {heroProperty.bathrooms} Baths
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1.5">
                          <Maximize2 size={15} className="text-[#0E2A1E]" />
                          {heroProperty.area}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-[#5A605B] font-bold block">
                          Guide Price
                        </span>
                        <span className="text-[20px] font-bold text-[#0E2A1E] font-heading">
                          {heroProperty.price}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0E2A1E] group-hover:translate-x-0.5 transition-transform">
                        <span>View Residence</span>
                        <ArrowRight size={15} />
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2 Companion Horizontal Cards (6 cols) */}
                <div className="lg:col-span-6 flex flex-col gap-6">
                  {companionProperties.map((prop) => (
                    <div
                      key={prop.id}
                      onClick={() => navigate(`/property/${prop.id}`)}
                      className="bg-white border border-[#E5E0D8] hover:border-[#0E2A1E]/40 rounded-[8px] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col sm:flex-row flex-1 group"
                    >
                      <div className="relative sm:w-[42%] aspect-[16/10] sm:aspect-auto overflow-hidden bg-[#E8EFE8] shrink-0">
                        <img
                          src={prop.images[0]}
                          alt={prop.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-[4px] bg-[#0E2A1E] text-[#FAF8F5] text-[10.5px] font-semibold uppercase tracking-wider">
                          {prop.type}
                        </span>
                      </div>

                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 text-[12px] text-[#5A605B] mb-1">
                            <MapPin size={13} className="text-[#0E2A1E] shrink-0" />
                            <span>{prop.location}</span>
                          </div>
                          <h4 className="text-[17px] font-bold text-[#1A1C1A] group-hover:text-[#0E2A1E] transition-colors leading-snug font-heading mb-2">
                            {prop.title}
                          </h4>
                          <p className="text-[12.5px] text-[#5A605B]">
                            {prop.bedrooms} BHK · {prop.area}
                          </p>
                        </div>

                        <div className="pt-3 mt-3 border-t border-[#E5E0D8] flex items-center justify-between">
                          <span className="text-[17px] font-bold text-[#0E2A1E] font-heading">
                            {prop.price}
                          </span>
                          <span className="text-[12.5px] font-semibold text-[#0E2A1E] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            <span>Details</span>
                            <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Remaining Grid Row */}
            {remainingProperties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pt-4">
                {remainingProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white border border-[#E5E0D8] rounded-[8px] p-12 text-center max-w-lg mx-auto">
            <Filter size={32} className="text-[#5A605B] mx-auto mb-3" />
            <h3 className="text-[17px] font-bold text-[#1A1C1A] mb-1">No properties in this category</h3>
            <p className="text-[13px] text-[#5A605B] mb-4">
              Try selecting All to explore our complete portfolio.
            </p>
            <button
              onClick={() => setActiveTab('all')}
              className="px-4 py-2 bg-[#0E2A1E] text-white text-[13px] rounded-[6px] font-medium cursor-pointer"
            >
              Show All Properties
            </button>
          </div>
        )}

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/buy')}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[8px] bg-[#0E2A1E] hover:bg-[#163A29] text-[#FAF8F5] text-[14px] font-semibold transition-all cursor-pointer shadow-sm"
          >
            <span>Explore Complete Sanctuary Portfolio</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
