import React, { useState } from 'react';
import { ShieldCheck, Heart, Bed, Bath, Maximize2, MapPin, ArrowRight, Scale } from 'lucide-react';
import type { Property } from '../../types';
import { useRouter } from '../../context/RouterContext';
import { useProperties } from '../../context/PropertyContext';

interface PropertyCardProps {
  property: Property;
  showRecentBadge?: boolean;
}

export default function PropertyCard({ property, showRecentBadge = false }: PropertyCardProps) {
  const { navigate } = useRouter();
  const { toggleSaveProperty, isSaved, toggleCompareProperty, isCompared } = useProperties();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const saved = isSaved(property.id);
  const compared = isCompared(property.id);

  // Quick EMI Estimation (80% loan, 8.5% p.a., 20 years tenure = ₹868 per lakh)
  const estimatedEMI = React.useMemo(() => {
    if (property.intent === 'rent') return null;
    const loanAmount = property.priceValue * 0.8;
    const monthlyRate = 0.085 / 12;
    const months = 240;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    if (isNaN(emi)) return null;
    if (emi >= 100000) {
      return `₹${(emi / 100000).toFixed(2)}L/mo`;
    }
    return `₹${Math.round(emi).toLocaleString('en-IN')}/mo`;
  }, [property.priceValue, property.intent]);

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveProperty(property.id);
  };

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCompareProperty(property.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white border border-[#E5E0D8] hover:border-[#0E2A1E]/40 rounded-[8px] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {/* Property Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E8EFE8]">
        <img
          src={property.images[activeImageIndex] || property.images[0]}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-[4px] bg-[#0E2A1E]/95 text-[#FAF8F5] text-[11px] font-semibold uppercase tracking-wider backdrop-blur-xs">
            {property.type}
          </span>
          {showRecentBadge && property.recent && (
            <span className="px-2 py-1 rounded-[4px] bg-[#C5A880] text-[#071710] text-[10px] font-bold uppercase tracking-wider">
              Verified
            </span>
          )}
        </div>

        {/* Action Controls: Compare & Save */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {/* Compare Toggle */}
          <button
            onClick={handleCompareToggle}
            aria-label="Compare property"
            title={compared ? 'Remove from compare' : 'Add to compare'}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-xs cursor-pointer ${
              compared
                ? 'bg-[#0E2A1E] text-[#C5A880] scale-105'
                : 'bg-white/95 hover:bg-white text-[#5A605B] hover:text-[#0E2A1E]'
            }`}
          >
            <Scale size={15} />
          </button>

          {/* Save Toggle */}
          <button
            onClick={handleSaveToggle}
            aria-label="Save property"
            title={saved ? 'Remove from saved' : 'Save property'}
            className="w-8 h-8 rounded-full bg-white/95 hover:bg-white flex items-center justify-center text-[#1A1C1A] shadow-xs transition-transform active:scale-90 cursor-pointer"
          >
            <Heart
              size={15}
              className={saved ? 'text-[#0E2A1E] fill-[#0E2A1E]' : 'text-[#5A605B]'}
            />
          </button>
        </div>

        {/* Image dots if multiple images */}
        {property.images.length > 1 && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 px-2 py-1 rounded-full backdrop-blur-xs"
          >
            {property.images.slice(0, 4).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                  activeImageIndex === idx ? 'bg-white w-3' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Property Information */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Verification Badge */}
          {property.verified && (
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0E2A1E] mb-2">
              <ShieldCheck size={14} className="text-[#0E2A1E]" />
              <span className="truncate">{property.verificationBadgeText || 'Clear Title & Verified'}</span>
            </div>
          )}

          {/* Property Name */}
          <h3 className="text-[17px] font-bold text-[#1A1C1A] group-hover:text-[#0E2A1E] transition-colors leading-snug line-clamp-1 mb-1 font-heading">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-[13px] text-[#5A605B] mb-3">
            <MapPin size={13} className="text-[#0E2A1E] shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* BHK & Area Highlight Tag & EMI Pill */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#FAF8F5] border border-[#E5E0D8] text-[12px] font-semibold text-[#1A1C1A]">
              <span>{property.bedrooms} BHK</span>
              <span className="text-[#8C938E]">·</span>
              <span>{property.area}</span>
            </div>

            {estimatedEMI && (
              <div className="inline-flex items-center px-2 py-1 rounded-[4px] bg-[#E8EFE8] text-[#0E2A1E] text-[11px] font-bold">
                <span>EMI ~ {estimatedEMI}</span>
              </div>
            )}
          </div>

          {/* Key Specs Row */}
          <div className="grid grid-cols-3 gap-2 py-2.5 border-t border-[#E5E0D8] text-[12px] text-[#5A605B]">
            <div className="flex items-center gap-1.5">
              <Bed size={14} className="text-[#8C938E]" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath size={14} className="text-[#8C938E]" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 size={13} className="text-[#8C938E]" />
              <span className="truncate">{property.area}</span>
            </div>
          </div>
        </div>

        {/* Price and View Property CTA */}
        <div className="pt-3.5 mt-2 border-t border-[#E5E0D8] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#5A605B] block uppercase tracking-wider font-medium">
              {property.intent === 'buy' ? 'Price' : 'Monthly Rent'}
            </span>
            <span className="text-[18px] font-bold text-[#0E2A1E] font-heading leading-tight">
              {property.price}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#0E2A1E] group-hover:text-[#163A29] group-hover:underline">
            <span>View Property</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
