import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import { useRouter } from '../context/RouterContext';
import PropertyCard from '../components/common/PropertyCard';

export default function SavedPropertiesPage() {
  const { savedProperties, toggleSaveProperty } = useProperties();
  const { navigate } = useRouter();

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5] min-h-screen">
      <div className="container-luxury">
        {/* Header */}
        <div className="mb-8 border-b border-[#E5E0D8] pb-6">
          <div className="flex items-center gap-2 text-[12px] text-[#5E6961] mb-2">
            <button onClick={() => navigate('/')} className="hover:text-[#0E2A1E]">Home</button>
            <span>/</span>
            <span className="text-[#0E2A1E] font-medium">Saved Collection</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Heart size={16} className="text-[#C5A880] fill-[#C5A880]" />
                <span className="eyebrow">Client Watchlist</span>
              </div>
              <h1 className="text-[32px] md:text-[40px] font-extrabold text-[#1F2421] font-heading leading-tight">
                Saved Residences & Estates
              </h1>
              <p className="text-[14px] text-[#5E6961] mt-1">
                You have saved {savedProperties.length} verified listings to your private watchlist.
              </p>
            </div>

            <button
              onClick={() => navigate('/search')}
              className="btn-outline-forest text-[13px] py-2.5 px-5 rounded-[8px] self-start md:self-auto flex items-center gap-2"
            >
              <span>Explore More Properties</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Saved List */}
        {savedProperties.length > 0 ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {savedProperties.map((property) => (
                <div key={property.id} className="relative group">
                  <PropertyCard property={property} />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveProperty(property.id);
                    }}
                    title="Remove from saved"
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/95 text-[#842029] hover:bg-[#842029] hover:text-white flex items-center justify-center shadow-md z-20 transition-all cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-16 text-center max-w-md mx-auto">
            <Heart size={40} className="text-[#C5A880] mx-auto mb-3" />
            <h3 className="text-[20px] font-bold text-[#1F2421] font-heading mb-1">
              Your watchlist is empty
            </h3>
            <p className="text-[13.5px] text-[#5E6961] mb-6">
              Browse our verified luxury residences and click the heart icon on any listing to save it here for comparison.
            </p>
            <button
              onClick={() => navigate('/search')}
              className="btn-forest text-[13.5px] py-3 px-6 rounded-[8px]"
            >
              Start Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
