import { useEffect } from 'react';
import {
  X, MapPin, BedDouble, Bath, Maximize2, Car, Phone, Mail,
  Calendar, Box, Shield, Wifi, Dumbbell, TreePine, Waves, CheckCircle2, ArrowUpRight
} from 'lucide-react';
import type { Property } from '../data/properties';

interface Props {
  property: Property;
  onClose: () => void;
  imageUrl?: string;
}

const amenityIcons: Record<string, typeof Shield> = {
  'Security': Shield, '24/7 Security': Shield, 'CCTV Security': Shield,
  'Gym': Dumbbell, 'Fitness Studio': Dumbbell,
  'Swimming Pool': Waves, 'Infinity Pool': Waves, 'Community Pool': Waves, 'Rooftop Pool': Waves,
  'Landscaped Gardens': TreePine, 'Private Garden': TreePine, 'Organic Garden': TreePine,
  'Clubhouse': Box, 'Smart Home System': Wifi,
};

export default function PropertyModal({ property, onClose, imageUrl }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Container */}
      <div
        className="relative z-10 w-full max-w-4xl bg-[#FAF9F5] border border-[#E5E1D8] shadow-[0_30px_70px_rgba(0,0,0,0.4)] rounded-[2px] overflow-y-auto mt-12 mb-8"
        style={{ maxHeight: 'calc(100vh - 6rem)' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center bg-[#FAF9F5]/90 hover:bg-[#FAF9F5] border border-[#E5E1D8] text-[#17181C] transition-colors rounded-[2px] cursor-pointer"
          aria-label="Close"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        {/* Gallery Hero Frame */}
        <div className="relative aspect-[16/9] md:h-[400px] overflow-hidden bg-[#17181C]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: imageUrl
                ? `url(${imageUrl})`
                : `linear-gradient(135deg, #0E2519 0%, #17181C 100%)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          <div className="absolute bottom-6 left-6 md:left-10">
            <span className="px-3.5 py-1.5 bg-[#0E2519] text-[#FAF9F5] text-[10px] font-bold tracking-[0.2em] uppercase rounded-[2px] mb-3 inline-block">
              {property.type}
            </span>
            <h2 className="text-white text-3xl md:text-4xl font-serif">
              {property.name}
            </h2>
            <div className="flex items-center gap-1.5 text-[#C5A880] text-[12px] font-semibold tracking-wider uppercase mt-2">
              <MapPin size={14} strokeWidth={1.5} />
              {property.location}
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10 bg-[#FAF9F5]">
          {/* Price + Stats Strip */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-[#E5E1D8] gap-6">
            <div>
              <span className="block text-[10px] tracking-[0.2em] uppercase text-[#8E9199]">
                Acquisition Price
              </span>
              <div className="text-3xl md:text-4xl text-[#0E2519] font-serif">
                {property.price}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-[#FFFFFF] border border-[#E5E1D8] p-4 rounded-[2px]">
              <div className="flex items-center gap-2.5">
                <BedDouble size={18} strokeWidth={1.5} className="text-[#0E2519]" />
                <div>
                  <div className="text-[12px] text-[#8E9199] uppercase tracking-wider">Bedrooms</div>
                  <div className="text-[14px] font-semibold text-[#17181C]">{property.bedrooms} BHK</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Bath size={18} strokeWidth={1.5} className="text-[#0E2519]" />
                <div>
                  <div className="text-[12px] text-[#8E9199] uppercase tracking-wider">Baths</div>
                  <div className="text-[14px] font-semibold text-[#17181C]">{property.bathrooms} Luxury</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Maximize2 size={18} strokeWidth={1.5} className="text-[#0E2519]" />
                <div>
                  <div className="text-[12px] text-[#8E9199] uppercase tracking-wider">Area</div>
                  <div className="text-[14px] font-semibold text-[#17181C]">{property.area}</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Car size={18} strokeWidth={1.5} className="text-[#0E2519]" />
                <div>
                  <div className="text-[12px] text-[#8E9199] uppercase tracking-wider">Parking</div>
                  <div className="text-[14px] font-semibold text-[#17181C]">{property.parking} Bays</div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-10">
            <h3 className="text-xl font-medium text-[#17181C] mb-3 font-serif">
              Architectural Overview
            </h3>
            <p className="text-[#5A5D64] leading-[1.8] font-light text-[14.5px]">
              {property.description}
            </p>
          </div>

          {/* Key Features */}
          <div className="mb-10">
            <h3 className="text-xl font-medium text-[#17181C] mb-4 font-serif">
              Estate Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {property.features.map((feat) => (
                <div key={feat} className="flex items-center gap-2.5 p-3 bg-[#FFFFFF] border border-[#E5E1D8] rounded-[2px]">
                  <CheckCircle2 size={16} strokeWidth={1.5} className="text-[#0E2519] flex-shrink-0" />
                  <span className="text-[13.5px] text-[#17181C] font-light">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities Grid */}
          <div className="mb-10">
            <h3 className="text-xl font-medium text-[#17181C] mb-4 font-serif">
              Amenities & Lifestyle
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              {property.amenities.map((amenity) => {
                const Icon = amenityIcons[amenity] || CheckCircle2;
                return (
                  <div key={amenity} className="flex items-center gap-2.5 px-3.5 py-3 bg-[#FFFFFF] border border-[#E5E1D8] rounded-[2px]">
                    <Icon size={16} strokeWidth={1.5} className="text-[#0E2519] flex-shrink-0" />
                    <span className="text-[12.5px] text-[#5A5D64] font-medium">{amenity}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dedicated Advisor Card */}
          <div className="bg-[#FFFFFF] border border-[#E5E1D8] p-6 mb-10 rounded-[2px]">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8E9199] font-bold block mb-4">
              Assigned Managing Director
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0E2519] flex items-center justify-center text-[#FAF9F5] text-[14px] font-serif">
                  {property.agent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-[15px] font-medium text-[#17181C]">{property.agent.name}</div>
                  <div className="text-[12px] text-[#C5A880] tracking-wider uppercase font-medium">{property.agent.title}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="px-4 py-2 bg-[#FAF9F5] border border-[#E5E1D8] text-[12px] text-[#17181C] font-medium rounded-[2px] flex items-center gap-2 hover:border-[#0E2519]"
                >
                  <Phone size={13} strokeWidth={1.5} />
                  {property.agent.phone}
                </a>
                <a
                  href={`mailto:${property.agent.email}`}
                  className="px-4 py-2 bg-[#FAF9F5] border border-[#E5E1D8] text-[12px] text-[#17181C] font-medium rounded-[2px] flex items-center gap-2 hover:border-[#0E2519]"
                >
                  <Mail size={13} strokeWidth={1.5} />
                  Email
                </a>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => {
                onClose();
                setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 300);
              }}
              className="btn-editorial"
            >
              <span>Schedule Private Viewing</span>
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => {
                onClose();
                setTimeout(() => document.querySelector('#showcase')?.scrollIntoView({ behavior: 'smooth' }), 300);
              }}
              className="btn-editorial bg-transparent text-[#17181C] border-[#17181C] hover:bg-[#17181C] hover:text-[#FAF9F5]"
            >
              <Box size={15} strokeWidth={1.5} />
              <span>Launch 3D Model</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
