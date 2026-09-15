import { useState } from 'react';
import { ShieldCheck, Filter, ArrowUpDown } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/common/PropertyCard';
import { useRouter } from '../context/RouterContext';

export default function BuyPage() {
  const { properties } = useProperties();
  const { navigate } = useRouter();

  // Filters State
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedBeds, setSelectedBeds] = useState('any');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price_asc' | 'price_desc'>('featured');

  // Filter properties strictly for 'buy'
  const forSaleProperties = properties.filter((p) => p.intent === 'buy');

  const filteredProperties = forSaleProperties.filter((p) => {
    if (selectedCity !== 'All' && !p.city.toLowerCase().includes(selectedCity.toLowerCase())) return false;
    if (selectedType !== 'All' && p.type.toLowerCase() !== selectedType.toLowerCase()) return false;
    if (selectedBeds !== 'any' && p.bedrooms < Number(selectedBeds)) return false;
    if (verifiedOnly && !p.verified) return false;
    return true;
  });

  // Sort
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === 'newest') return (b.yearBuilt || 0) - (a.yearBuilt || 0);
    if (sortBy === 'price_asc') return a.priceValue - b.priceValue;
    if (sortBy === 'price_desc') return b.priceValue - a.priceValue;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5] min-h-screen">
      <div className="container-luxury">
        {/* Page Header */}
        <div className="mb-8 border-b border-[#E5E0D8] pb-6">
          <div className="flex items-center gap-2 text-[12px] text-[#5E6961] mb-2">
            <button onClick={() => navigate('/')} className="hover:text-[#0E2A1E]">Home</button>
            <span>/</span>
            <span className="text-[#0E2A1E] font-medium">Buy Residences</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={16} className="text-[#0E2A1E]" />
                <span className="eyebrow-forest">Verified Ownership</span>
              </div>
              <h1 className="text-[32px] md:text-[40px] font-extrabold text-[#1F2421] font-heading leading-tight">
                Luxury Properties for Sale
              </h1>
              <p className="text-[14px] text-[#5E6961] mt-1">
                Showing {sortedProperties.length} verified villas, penthouses, and architectural estates.
              </p>
            </div>

            <button
              onClick={() => navigate('/list-property')}
              className="btn-forest text-[13px] py-2.5 px-5 rounded-[8px] self-start md:self-auto"
            >
              List Your Property
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-4 mb-8 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* City */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-2 bg-[#FAF8F5] border border-[#E5E0D8] rounded-[6px] text-[13px] text-[#1F2421] focus:outline-none focus:border-[#0E2A1E] cursor-pointer"
            >
              <option value="All">All Cities</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Goa">Goa</option>
              <option value="Pune">Pune</option>
              <option value="Delhi NCR">Delhi NCR</option>
            </select>

            {/* Type */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 bg-[#FAF8F5] border border-[#E5E0D8] rounded-[6px] text-[13px] text-[#1F2421] focus:outline-none focus:border-[#0E2A1E] cursor-pointer"
            >
              <option value="All">All Property Types</option>
              <option value="Villa">Villa / Estate</option>
              <option value="Apartment">Apartment</option>
              <option value="Penthouse">Penthouse</option>
            </select>

            {/* Bedrooms */}
            <select
              value={selectedBeds}
              onChange={(e) => setSelectedBeds(e.target.value)}
              className="px-3 py-2 bg-[#FAF8F5] border border-[#E5E0D8] rounded-[6px] text-[13px] text-[#1F2421] focus:outline-none focus:border-[#0E2A1E] cursor-pointer"
            >
              <option value="any">Any Bedrooms</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
              <option value="5">5+ Beds</option>
            </select>

            {/* Verified Filter Checkbox */}
            <label className="flex items-center gap-2 text-[12.5px] font-medium text-[#1F2421] cursor-pointer bg-[#FAF8F5] px-3 py-2 rounded-[6px] border border-[#E5E0D8]">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 text-[#0E2A1E] rounded focus:ring-[#0E2A1E]"
              />
              <span>Verified Only</span>
            </label>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown size={14} className="text-[#5E6961]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-[#FAF8F5] border border-[#E5E0D8] rounded-[6px] text-[13px] text-[#1F2421] focus:outline-none focus:border-[#0E2A1E] cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Listings Grid */}
        {sortedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-16 text-center max-w-md mx-auto">
            <Filter size={36} className="text-[#5E6961] mx-auto mb-3" />
            <h3 className="text-[18px] font-bold text-[#1F2421] mb-1">No properties match your criteria</h3>
            <p className="text-[13px] text-[#5E6961] mb-6">
              Try resetting your city or bedroom filters to view more available verified residences.
            </p>
            <button
              onClick={() => {
                setSelectedCity('All');
                setSelectedType('All');
                setSelectedBeds('any');
                setVerifiedOnly(false);
              }}
              className="btn-forest text-[13px] py-2 px-5 rounded-[6px]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
