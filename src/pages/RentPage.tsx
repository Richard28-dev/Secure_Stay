import { useState } from 'react';
import { ShieldCheck, Filter, ArrowUpDown } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/common/PropertyCard';
import { useRouter } from '../context/RouterContext';

export default function RentPage() {
  const { properties } = useProperties();
  const { navigate } = useRouter();

  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedFurnished, setSelectedFurnished] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc'>('featured');

  const forRentProperties = properties.filter((p) => p.intent === 'rent');

  const filteredProperties = forRentProperties.filter((p) => {
    if (selectedCity !== 'All' && !p.city.toLowerCase().includes(selectedCity.toLowerCase())) return false;
    if (selectedFurnished !== 'All' && p.furnished !== selectedFurnished) return false;
    return true;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
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
            <span className="text-[#0E2A1E] font-medium">Rent Residences</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={16} className="text-[#0E2A1E]" />
                <span className="eyebrow-forest">Verified Leases</span>
              </div>
              <h1 className="text-[32px] md:text-[40px] font-extrabold text-[#1F2421] font-heading leading-tight">
                Luxury Rental Residences
              </h1>
              <p className="text-[14px] text-[#5E6961] mt-1">
                Curated turnkey villas, lofts, and serviced penthouses on verified long-term corporate and private leases.
              </p>
            </div>

            <button
              onClick={() => navigate('/list-property')}
              className="btn-forest text-[13px] py-2.5 px-5 rounded-[8px] self-start md:self-auto"
            >
              List a Rental
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-4 mb-8 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-2 bg-[#FAF8F5] border border-[#E5E0D8] rounded-[6px] text-[13px] text-[#1F2421] focus:outline-none focus:border-[#0E2A1E] cursor-pointer"
            >
              <option value="All">All Cities</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Goa">Goa</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>

            <select
              value={selectedFurnished}
              onChange={(e) => setSelectedFurnished(e.target.value)}
              className="px-3 py-2 bg-[#FAF8F5] border border-[#E5E0D8] rounded-[6px] text-[13px] text-[#1F2421] focus:outline-none focus:border-[#0E2A1E] cursor-pointer"
            >
              <option value="All">Furnishing Status: All</option>
              <option value="Furnished">Fully Furnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown size={14} className="text-[#5E6961]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-[#FAF8F5] border border-[#E5E0D8] rounded-[6px] text-[13px] text-[#1F2421] focus:outline-none focus:border-[#0E2A1E] cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price_asc">Rent: Low to High</option>
              <option value="price_desc">Rent: High to Low</option>
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
            <h3 className="text-[18px] font-bold text-[#1F2421] mb-1">No rental listings match</h3>
            <p className="text-[13px] text-[#5E6961] mb-6">
              Try resetting your city or furnishing filters.
            </p>
            <button
              onClick={() => {
                setSelectedCity('All');
                setSelectedFurnished('All');
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
