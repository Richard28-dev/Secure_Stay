import { MapPin, BedDouble, Maximize2, ArrowUpRight } from 'lucide-react';
import type { Property } from '../data/properties';

interface Props {
  property: Property;
  onViewDetails: (property: Property) => void;
  imageUrl?: string;
}

export default function PropertyCard({ property, onViewDetails, imageUrl }: Props) {
  return (
    <div
      onClick={() => onViewDetails(property)}
      className="group bg-[#FFFFFF] border border-[#E5E1D8] rounded-[2px] overflow-hidden transition-all duration-500 hover:border-[#0E2519]/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] cursor-pointer flex flex-col h-full"
    >
      {/* Editorial Image Container with 16:10 Architectural Aspect Ratio */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#17181C]">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{
            backgroundImage: imageUrl
              ? `url(${imageUrl})`
              : `linear-gradient(135deg, #0E2519 0%, #17181C 100%)`,
          }}
        />
        {/* Subtle duotone gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Top Tag Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1 bg-[#FAF9F5]/90 backdrop-blur-sm text-[10px] font-semibold tracking-[0.15em] uppercase text-[#17181C] rounded-[2px]">
            {property.type}
          </span>
          {property.featured && (
            <span className="px-3 py-1 bg-[#0E2519] text-[10px] font-semibold tracking-[0.15em] uppercase text-[#FAF9F5] rounded-[2px]">
              Signature
            </span>
          )}
        </div>

        {/* Price on Image Bottom Left */}
        <div className="absolute bottom-4 left-4">
          <span className="text-white text-2xl font-normal font-serif-editorial tracking-wide">
            {property.price}
          </span>
        </div>
      </div>

      {/* Property Details Pass */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[#C5A880] text-[11px] font-semibold tracking-[0.15em] uppercase mb-2">
            <MapPin size={12} strokeWidth={1.5} />
            <span>{property.location}</span>
          </div>

          <h3 className="text-xl font-medium text-[#17181C] mb-3 group-hover:text-[#0E2519] transition-colors duration-300">
            {property.name}
          </h3>

          <p className="text-[13px] text-[#5A5D64] line-clamp-2 leading-relaxed mb-6 font-light">
            {property.description}
          </p>
        </div>

        <div>
          {/* Spec Row with Hairline Top Border */}
          <div className="flex items-center justify-between py-3.5 border-t border-[#E5E1D8] text-[12px] text-[#5A5D64]">
            <div className="flex items-center gap-1.5">
              <BedDouble size={14} strokeWidth={1.5} className="text-[#0E2519]" />
              <span className="font-medium text-[#17181C]">{property.bedrooms}</span> BHK
            </div>
            <div className="w-[1px] h-3.5 bg-[#E5E1D8]" />
            <div className="flex items-center gap-1.5">
              <Maximize2 size={13} strokeWidth={1.5} className="text-[#0E2519]" />
              <span className="font-medium text-[#17181C]">{property.area}</span>
            </div>
            <div className="w-[1px] h-3.5 bg-[#E5E1D8]" />
            <div className="text-[11px] uppercase tracking-wider text-[#8E9199]">
              Ready to Occupy
            </div>
          </div>

          {/* Action trigger */}
          <div className="mt-4 pt-3 flex items-center justify-between text-[11px] font-semibold tracking-[0.15em] uppercase text-[#0E2519] group-hover:text-[#C5A880] transition-colors">
            <span>Explore Dossier</span>
            <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
