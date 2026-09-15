import { useState } from 'react';
import { ArrowRight, ArrowUpDown, Filter } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import PropertyCard from '../common/PropertyCard';
import { useRouter } from '../../context/RouterContext';

export default function FeaturedSection() {
  const { properties } = useProperties();
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

  // Display top 6
  const displayProperties = filtered.slice(0, 6);

  return (
    <section id="featured" className="py-16 lg:py-24 bg-[#FAF8F5]">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#0E2A1E] block mb-2">
              Curated Listings
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1C1A] font-heading tracking-tight">
              Featured Properties
            </h2>
            <p className="text-[15px] text-[#5A605B] mt-2 max-w-xl font-normal">
              Explore some of our selected properties.
            </p>
          </div>

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

        {/* Properties Grid */}
        {displayProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {displayProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
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
            <span>View All Available Properties</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
