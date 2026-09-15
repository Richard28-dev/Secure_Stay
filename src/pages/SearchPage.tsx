import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Map, Grid, X, ArrowUpDown, MapPin } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import { useRouter } from '../context/RouterContext';
import PropertyCard from '../components/common/PropertyCard';

export default function SearchPage() {
  const { filterProperties } = useProperties();
  const { queryParams, setQueryParam, navigate } = useRouter();

  // Search and Filter State derived from / synced to URL query params
  const [intent, setIntent] = useState<'all' | 'buy' | 'rent'>(
    (queryParams.intent as any) || 'all'
  );
  const [city, setCity] = useState(queryParams.city || 'All');
  const [type, setType] = useState(queryParams.type || 'All');
  const [bedrooms, setBedrooms] = useState(queryParams.bedrooms || 'any');
  const [minPrice] = useState(queryParams.minPrice ? Number(queryParams.minPrice) : 0);
  const [maxPrice] = useState(queryParams.maxPrice ? Number(queryParams.maxPrice) : 200000000);
  const [verifiedOnly, setVerifiedOnly] = useState(queryParams.verifiedOnly === 'true');
  const [searchQuery, setSearchQuery] = useState(queryParams.query || '');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price_asc' | 'price_desc'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedMapProperty, setSelectedMapProperty] = useState<string | null>(null);

  useEffect(() => {
    if (queryParams.intent) setIntent(queryParams.intent as any);
    if (queryParams.city) setCity(queryParams.city);
    if (queryParams.type) setType(queryParams.type);
    if (queryParams.bedrooms) setBedrooms(queryParams.bedrooms);
    if (queryParams.query) setSearchQuery(queryParams.query);
  }, [queryParams]);

  const handleApplyFilter = (key: string, val: string | null) => {
    setQueryParam(key, val);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQueryParam('query', searchQuery.trim() || null);
    setQueryParam('city', city !== 'All' ? city : null);
    setQueryParam('intent', intent !== 'all' ? intent : null);
    setQueryParam('type', type !== 'All' ? type : null);
    setQueryParam('bedrooms', bedrooms !== 'any' ? bedrooms : null);
  };

  const resetAllFilters = () => {
    setIntent('all');
    setCity('All');
    setType('All');
    setBedrooms('any');
    setVerifiedOnly(false);
    setSearchQuery('');
    navigate('/search');
  };

  // Run filtering against central store
  const results = filterProperties({
    intent,
    city: city !== 'All' ? city : '',
    type: type !== 'All' ? type : '',
    bedrooms: bedrooms !== 'any' ? Number(bedrooms) : 'any',
    minPrice: minPrice > 0 ? minPrice : undefined,
    maxPrice: maxPrice < 200000000 ? maxPrice : undefined,
    verifiedOnly,
    query: searchQuery,
  });

  // Sort
  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === 'newest') return (b.yearBuilt || 0) - (a.yearBuilt || 0);
    if (sortBy === 'price_asc') return a.priceValue - b.priceValue;
    if (sortBy === 'price_desc') return b.priceValue - a.priceValue;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5] min-h-screen">
      <div className="container-luxury">
        {/* Top Search Toolbar */}
        <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-5 shadow-sm mb-8">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-4 relative flex items-center">
              <Search size={16} className="absolute left-3.5 text-[#5E6961]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by neighborhood, feature, title..."
                className="w-full pl-10 pr-3 py-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-[6px] text-[13px] text-[#1F2421] focus:outline-none focus:border-[#0E2A1E]"
              />
            </div>

            {/* Intent Switch */}
            <div className="md:col-span-2">
              <select
                value={intent}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setIntent(val);
                  handleApplyFilter('intent', val !== 'all' ? val : null);
                }}
                className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-[6px] text-[13px] text-[#1F2421] focus:outline-none focus:border-[#0E2A1E] cursor-pointer"
              >
                <option value="all">Buy & Rent</option>
                <option value="buy">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>

            {/* City */}
            <div className="md:col-span-2">
              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  handleApplyFilter('city', e.target.value !== 'All' ? e.target.value : null);
                }}
                className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-[6px] text-[13px] text-[#1F2421] focus:outline-none focus:border-[#0E2A1E] cursor-pointer"
              >
                <option value="All">All Cities</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Goa">Goa</option>
                <option value="Pune">Pune</option>
                <option value="Delhi NCR">Delhi NCR</option>
              </select>
            </div>

            {/* Type */}
            <div className="md:col-span-2">
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  handleApplyFilter('type', e.target.value !== 'All' ? e.target.value : null);
                }}
                className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-[6px] text-[13px] text-[#1F2421] focus:outline-none focus:border-[#0E2A1E] cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Estate">Estate</option>
              </select>
            </div>

            {/* Search CTA */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="btn-forest w-full py-2.5 text-[13px] rounded-[6px] flex items-center justify-center gap-2"
              >
                <Search size={14} />
                <span>Filter</span>
              </button>
            </div>
          </form>

          {/* Active Filter Chips & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-4 border-t border-[#E5E0D8] text-[12px]">
            <div className="flex flex-wrap items-center gap-2 text-[#5E6961]">
              <span className="font-semibold text-[#1F2421]">Active Filters:</span>
              {intent !== 'all' && (
                <span className="px-2 py-0.5 rounded-[4px] bg-[#E8EFE8] text-[#0E2A1E] font-medium flex items-center gap-1">
                  Intent: {intent.toUpperCase()}
                  <button onClick={() => setIntent('all')} className="hover:text-black">×</button>
                </span>
              )}
              {city !== 'All' && (
                <span className="px-2 py-0.5 rounded-[4px] bg-[#E8EFE8] text-[#0E2A1E] font-medium flex items-center gap-1">
                  City: {city}
                  <button onClick={() => setCity('All')} className="hover:text-black">×</button>
                </span>
              )}
              {type !== 'All' && (
                <span className="px-2 py-0.5 rounded-[4px] bg-[#E8EFE8] text-[#0E2A1E] font-medium flex items-center gap-1">
                  Type: {type}
                  <button onClick={() => setType('All')} className="hover:text-black">×</button>
                </span>
              )}
              {verifiedOnly && (
                <span className="px-2 py-0.5 rounded-[4px] bg-[#E8EFE8] text-[#0E2A1E] font-medium flex items-center gap-1">
                  Verified Only
                  <button onClick={() => setVerifiedOnly(false)} className="hover:text-black">×</button>
                </span>
              )}
            </div>

            <button
              onClick={resetAllFilters}
              className="text-[#5E6961] hover:text-[#0E2A1E] font-medium flex items-center gap-1 cursor-pointer"
            >
              <X size={13} />
              <span>Clear all filters</span>
            </button>
          </div>
        </div>

        {/* Results Count & View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[14px] text-[#1F2421] font-semibold">
            Showing {sortedResults.length} Verified Properties
          </p>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <div className="flex items-center gap-2">
              <ArrowUpDown size={14} className="text-[#5E6961]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 bg-[#FFFFFF] border border-[#E5E0D8] rounded-[6px] text-[12.5px] text-[#1F2421] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

            {/* View Mode Toggle (Grid vs Map) */}
            <div className="flex items-center bg-[#FFFFFF] border border-[#E5E0D8] rounded-[6px] p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-[4px] cursor-pointer ${
                  viewMode === 'grid' ? 'bg-[#0E2A1E] text-[#FAF8F5]' : 'text-[#5E6961] hover:text-[#1F2421]'
                }`}
                aria-label="Grid View"
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded-[4px] cursor-pointer ${
                  viewMode === 'map' ? 'bg-[#0E2A1E] text-[#FAF8F5]' : 'text-[#5E6961] hover:text-[#1F2421]'
                }`}
                aria-label="Map View"
              >
                <Map size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Content View: Grid or Split Map View */}
        {viewMode === 'grid' ? (
          sortedResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedResults.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-16 text-center max-w-md mx-auto">
              <SlidersHorizontal size={36} className="text-[#5E6961] mx-auto mb-3" />
              <h3 className="text-[18px] font-bold text-[#1F2421] mb-1">No matching properties found</h3>
              <p className="text-[13px] text-[#5E6961] mb-6">
                Try loosening your search keywords or price restrictions.
              </p>
              <button
                onClick={resetAllFilters}
                className="btn-forest text-[13px] py-2 px-5 rounded-[6px]"
              >
                Reset Search
              </button>
            </div>
          )
        ) : (
          /* Interactive Map Split View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[650px]">
            {/* Properties List Scrollable Column */}
            <div className="lg:col-span-5 overflow-y-auto pr-2 space-y-4 max-h-full">
              {sortedResults.map((property) => (
                <div
                  key={property.id}
                  onClick={() => setSelectedMapProperty(property.id)}
                  className={`p-4 rounded-[8px] border transition-all cursor-pointer bg-[#FFFFFF] ${
                    selectedMapProperty === property.id
                      ? 'border-[#0E2A1E] ring-2 ring-[#0E2A1E]/20 shadow-md'
                      : 'border-[#E5E0D8] hover:border-[#C5A880]'
                  }`}
                >
                  <div className="flex gap-4">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-24 h-20 rounded-[6px] object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-[#0E2A1E] tracking-wider">
                          {property.type} · {property.intent.toUpperCase()}
                        </span>
                        <span className="text-[14px] font-extrabold text-[#0E2A1E] font-heading">
                          {property.price}
                        </span>
                      </div>
                      <h4 className="text-[14px] font-bold text-[#1F2421] truncate mt-0.5">
                        {property.title}
                      </h4>
                      <p className="text-[11px] text-[#5E6961] truncate mt-0.5">
                        {property.location}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-[#1F2421] mt-2">
                        <span>{property.bedrooms} Beds</span>
                        <span>·</span>
                        <span>{property.bathrooms} Baths</span>
                        <span>·</span>
                        <span>{property.area}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Vector / Schematic Map */}
            <div className="lg:col-span-7 bg-[#0E2A1E] rounded-[8px] p-6 text-[#FAF8F5] relative overflow-hidden flex flex-col justify-between border border-[#163A29]">
              {/* Map UI Overlay */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2 bg-[#071710]/80 backdrop-blur-md px-3 py-1.5 rounded-[6px] border border-white/10 text-[12px]">
                  <MapPin size={14} className="text-[#C5A880]" />
                  <span>SecureStay National Property Registry Map</span>
                </div>
                <span className="text-[11px] text-[#D2DFD2] bg-white/10 px-2.5 py-1 rounded-[4px]">
                  GPS Coordinates Verified
                </span>
              </div>

              {/* Schematic Map Grid Nodes */}
              <div className="relative w-full h-full my-4 flex items-center justify-center">
                <div className="w-full h-full border border-dashed border-white/15 rounded-[6px] relative flex items-center justify-center bg-[#071710]/50">
                  <div className="text-center">
                    <p className="text-[13px] font-bold text-[#C5A880] mb-1">
                      Regional GPS Property Map
                    </p>
                    <p className="text-[11px] text-[#D2DFD2]">
                      Click property nodes to preview listings
                    </p>
                  </div>

                  {/* Property Location Pin Coordinates */}
                  {sortedResults.map((property, idx) => {
                    const topPos = 20 + ((idx * 27) % 65);
                    const leftPos = 15 + ((idx * 31) % 70);
                    const isSelected = selectedMapProperty === property.id;
                    return (
                      <div
                        key={property.id}
                        onClick={() => setSelectedMapProperty(property.id)}
                        style={{ top: `${topPos}%`, left: `${leftPos}%` }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-[6px] text-[11px] font-bold cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#C5A880] text-[#071710] shadow-2xl scale-110 z-20'
                            : 'bg-[#163A29] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#071710]'
                        } border border-white/20`}
                      >
                        {property.price}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected Property Quick Bar */}
              {selectedMapProperty && (
                <div className="z-10 bg-[#071710]/90 backdrop-blur-md p-3 rounded-[6px] border border-[#C5A880]/30 flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-bold text-[#FAF8F5]">
                      {results.find((p) => p.id === selectedMapProperty)?.title}
                    </p>
                    <p className="text-[11px] text-[#C5A880]">
                      {results.find((p) => p.id === selectedMapProperty)?.price} · {results.find((p) => p.id === selectedMapProperty)?.location}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/property/${selectedMapProperty}`)}
                    className="btn-gold py-1.5 px-3 text-[11.5px] rounded-[4px]"
                  >
                    View Dossier
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
