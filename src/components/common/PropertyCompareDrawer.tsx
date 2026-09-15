import { useState } from 'react';
import { Scale, X, ArrowRight, CheckCircle2, ShieldCheck, Trash2, Maximize2 } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { useRouter } from '../../context/RouterContext';

export default function PropertyCompareDrawer() {
  const { compareProperties, clearCompare, toggleCompareProperty } = useProperties();
  const { navigate } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  if (compareProperties.length === 0) return null;

  return (
    <>
      {/* Floating Bottom Comparison Bar */}
      <div className="fixed bottom-6 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto bg-[#0E2A1E] text-white rounded-[8px] shadow-2xl border border-white/15 px-4 sm:px-6 py-3 flex items-center gap-4 sm:gap-6 animate-fadeIn max-w-2xl w-full justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[6px] bg-[#C5A880] text-[#0E2A1E] flex items-center justify-center font-bold text-[13px] shrink-0">
              <Scale size={17} />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {compareProperties.map((p) => (
                  <img
                    key={p.id}
                    src={p.images[0]}
                    alt={p.title}
                    className="w-8 h-8 rounded-[4px] object-cover border-2 border-[#0E2A1E]"
                  />
                ))}
              </div>
              <span className="text-[13px] font-semibold hidden sm:inline text-[#FAF8F5]">
                {compareProperties.length} {compareProperties.length === 1 ? 'Property' : 'Properties'} Selected
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsOpen(true)}
              className="px-4 py-2 rounded-[6px] bg-[#C5A880] hover:bg-[#B89758] text-[#071710] text-[12.5px] font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Compare Now</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={clearCompare}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-[6px] transition-colors cursor-pointer"
              title="Clear Comparison"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Full Comparison Matrix Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-[8px] border border-[#E5E0D8] shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-scaleUp">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#E5E0D8] flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[6px] bg-[#0E2A1E] text-[#C5A880] flex items-center justify-center">
                  <Scale size={18} />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-[#1A1C1A] font-heading">
                    Property Comparison Matrix
                  </h3>
                  <p className="text-[12px] text-[#5A605B]">
                    Side-by-side specifications, pricing, and verified title attributes.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={clearCompare}
                  className="text-[12px] font-medium text-[#5A605B] hover:text-[#0E2A1E] underline cursor-pointer"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-[6px] hover:bg-[#E5E0D8] text-[#5A605B] transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Matrix Table Scrollable Area */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {compareProperties.map((p) => (
                  <div
                    key={p.id}
                    className="border border-[#E5E0D8] rounded-[8px] p-5 flex flex-col justify-between bg-[#FAF8F5] relative group"
                  >
                    <button
                      onClick={() => toggleCompareProperty(p.id)}
                      className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/90 hover:bg-red-50 text-[#5A605B] hover:text-red-600 flex items-center justify-center shadow-xs text-[12px] transition-colors cursor-pointer"
                      title="Remove"
                    >
                      ×
                    </button>

                    <div>
                      {/* Image & Title */}
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="w-full h-44 object-cover rounded-[6px] mb-3.5"
                      />

                      <div className="flex items-center gap-1 text-[11px] font-semibold text-[#0E2A1E] mb-1">
                        <ShieldCheck size={13} />
                        <span>{p.verificationBadgeText || 'Clear Title Verified'}</span>
                      </div>

                      <h4 className="text-[16px] font-bold text-[#1A1C1A] leading-snug mb-1">
                        {p.title}
                      </h4>
                      <p className="text-[12.5px] text-[#5A605B] mb-4">{p.location}</p>

                      {/* Specs Row */}
                      <div className="space-y-2 py-3 border-y border-[#E5E0D8] text-[13px]">
                        <div className="flex justify-between">
                          <span className="text-[#5A605B]">Price</span>
                          <span className="font-bold text-[#0E2A1E]">{p.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#5A605B]">Configuration</span>
                          <span className="font-semibold text-[#1A1C1A]">{p.bedrooms} BHK · {p.bathrooms} Bath</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#5A605B]">Carpet Area</span>
                          <span className="font-semibold text-[#1A1C1A]">{p.area}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#5A605B]">Rate per sq.ft</span>
                          <span className="font-semibold text-[#1A1C1A]">{p.pricePerSqFt || 'Market Standard'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#5A605B]">Furnishing</span>
                          <span className="font-semibold text-[#1A1C1A]">{p.furnished}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#5A605B]">Parking Slots</span>
                          <span className="font-semibold text-[#1A1C1A]">{p.parking} Reserved</span>
                        </div>
                      </div>

                      {/* Key Amenities */}
                      <div className="pt-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A605B] block mb-1.5">
                          Highlights
                        </span>
                        <div className="space-y-1">
                          {p.highlights.slice(0, 3).map((h, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-[11.5px] text-[#1A1C1A]">
                              <CheckCircle2 size={12} className="text-[#0E2A1E] shrink-0" />
                              <span className="truncate">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setIsOpen(false);
                        navigate(`/property/${p.id}`);
                      }}
                      className="mt-5 w-full py-2.5 rounded-[6px] bg-[#0E2A1E] hover:bg-[#163A29] text-white text-[13px] font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>View Complete Dossier</span>
                      <Maximize2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
