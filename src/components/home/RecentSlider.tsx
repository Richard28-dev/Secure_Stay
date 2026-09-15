import { useRef, useState, useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import PropertyCard from '../common/PropertyCard';
import { useRouter } from '../../context/RouterContext';

export default function RecentSlider() {
  const { properties } = useProperties();
  const { navigate } = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filter or take recent properties
  const recentProperties = properties.filter((p) => p.recent || p.yearBuilt >= 2023);

  const checkScrollLimits = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollLimits);
      checkScrollLimits();
      return () => el.removeEventListener('scroll', checkScrollLimits);
    }
  }, [recentProperties]);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const offset = sliderRef.current.clientWidth * 0.75;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -offset : offset,
        behavior: 'smooth',
      });
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scroll('left');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scroll('right');
    }
  };

  return (
    <section className="section-wrapper bg-[#FAF8F5] border-t border-[#E5E0D8]">
      <div className="container-luxury">
        {/* Header with Slider Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-[#0E2A1E]" />
              <span className="eyebrow-forest">Latest Market Additions</span>
            </div>
            <h2 className="section-title text-[#1F2421]">
              Recently Added Properties
            </h2>
            <p className="section-subtitle mt-2">
              Freshly verified listings published to the SecureStay network within the past 14 days.
            </p>
          </div>

          {/* Slider Control Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`w-10 h-10 rounded-[8px] border flex items-center justify-center transition-all cursor-pointer ${
                canScrollLeft
                  ? 'bg-[#FFFFFF] border-[#E5E0D8] text-[#1F2421] hover:bg-[#E8EFE8]'
                  : 'bg-[#FAF8F5] border-[#E5E0D8]/40 text-[#5E6961]/40 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`w-10 h-10 rounded-[8px] border flex items-center justify-center transition-all cursor-pointer ${
                canScrollRight
                  ? 'bg-[#FFFFFF] border-[#E5E0D8] text-[#1F2421] hover:bg-[#E8EFE8]'
                  : 'bg-[#FAF8F5] border-[#E5E0D8]/40 text-[#5E6961]/40 cursor-not-allowed'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Practical Horizontal Slider with Scroll-Snap & Touch/Key Support */}
        <div
          ref={sliderRef}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          aria-label="Recently added property slider"
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory focus:outline-none focus:ring-1 focus:ring-[#0E2A1E]/30 rounded-[8px]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {recentProperties.map((property) => (
            <div
              key={property.id}
              className="w-[300px] sm:w-[350px] lg:w-[380px] shrink-0 snap-start"
            >
              <PropertyCard property={property} showRecentBadge={true} />
            </div>
          ))}
        </div>

        {/* Bottom Helper Note */}
        <div className="flex items-center justify-between mt-6 text-[12px] text-[#5E6961]">
          <span>Use horizontal arrows or drag to view more recent listings</span>
          <button
            onClick={() => navigate('/search')}
            className="font-semibold text-[#0E2A1E] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Recent Listings</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}
