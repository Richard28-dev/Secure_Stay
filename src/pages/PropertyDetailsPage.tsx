import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Heart,
  Share2,
  Bed,
  Bath,
  Maximize2,
  Car,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Calculator,
  Compass,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Award,
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/common/PropertyCard';
import type { Property } from '../types';

export default function PropertyDetailsPage() {
  const { propertyIdParam, navigate } = useRouter();
  const { properties, getPropertyById, toggleSaveProperty, isSaved, addViewing, addEnquiry, showToast } =
    useProperties();

  // Load property or fallback
  const property: Property | undefined = getPropertyById(propertyIdParam || '') || properties[0];

  const saved = property ? isSaved(property.id) : false;

  // Image Gallery State
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Floor Plan Tab
  const [activeFloorIndex, setActiveFloorIndex] = useState(0);

  // Mortgage Calculator State
  const defaultPrice = property ? property.priceValue : 48500000;
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState(20);

  // Schedule Viewing Form State
  const [viewingModalOpen, setViewingModalOpen] = useState(false);
  const [viewingDate, setViewingDate] = useState('');
  const [viewingTime, setViewingTime] = useState('11:00 AM');
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [viewingNotes, setViewingNotes] = useState('');
  const [isSubmittingViewing, setIsSubmittingViewing] = useState(false);

  // Direct Enquiry Form on page
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [enquirerName, setEnquirerName] = useState('');
  const [enquirerEmail, setEnquirerEmail] = useState('');
  const [enquirerPhone, setEnquirerPhone] = useState('');
  const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState(false);

  // Mortgage Calculation
  const monthlyMortgage = useMemo(() => {
    const principal = defaultPrice * (1 - downPaymentPercent / 100);
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTenureYears * 12;
    if (monthlyRate === 0) return principal / numberOfPayments;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return Math.round(emi);
  }, [defaultPrice, downPaymentPercent, interestRate, loanTenureYears]);

  if (!property) {
    return (
      <div className="pt-32 pb-20 text-center container-luxury">
        <h1 className="text-2xl font-bold">Property not found</h1>
        <button onClick={() => navigate('/search')} className="btn-forest mt-4">
          Return to Search
        </button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out ${property.title} on SecureStay: Verified Real Estate`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Property link copied to clipboard', 'info');
    }
  };

  const handleScheduleViewingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewingDate || !visitorName || !visitorEmail || !visitorPhone) {
      showToast('Please fill all required appointment fields', 'error');
      return;
    }
    setIsSubmittingViewing(true);
    try {
      await addViewing({
        propertyId: property.id,
        propertyTitle: property.title,
        propertyLocation: property.location,
        propertyPrice: property.price,
        propertyImage: property.images[0] || '',
        date: viewingDate,
        time: viewingTime,
        visitorName,
        visitorEmail,
        visitorPhone,
        notes: viewingNotes,
      });
      setViewingModalOpen(false);
      setViewingNotes('');
    } catch {
      showToast('Error booking viewing. Please try again.', 'error');
    } finally {
      setIsSubmittingViewing(false);
    }
  };

  const handleQuickEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquirerName || !enquirerEmail || !enquirerPhone || !enquiryMessage) {
      showToast('Please fill all enquiry fields', 'error');
      return;
    }
    setIsSubmittingEnquiry(true);
    try {
      await addEnquiry({
        propertyId: property.id,
        propertyTitle: property.title,
        name: enquirerName,
        email: enquirerEmail,
        phone: enquirerPhone,
        enquiryType: property.intent === 'buy' ? 'buy' : 'rent',
        preferredLocation: property.location,
        budget: property.price,
        message: enquiryMessage,
      });
      setEnquiryMessage('');
      setEnquirerName('');
      setEnquirerEmail('');
      setEnquirerPhone('');
    } finally {
      setIsSubmittingEnquiry(false);
    }
  };

  // Similar properties
  const similarProperties = properties
    .filter((p: Property) => p.id !== property.id && (p.city === property.city || p.type === property.type))
    .slice(0, 3);

  return (
    <div className="pt-24 pb-28 bg-[#FAF8F5] min-h-screen">
      <div className="container-luxury">
        {/* Breadcrumb & Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-[13px] text-[#5E6961]">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/')} className="hover:text-[#0E2A1E]">Home</button>
            <span>/</span>
            <button
              onClick={() => navigate(property.intent === 'buy' ? '/buy' : '/rent')}
              className="hover:text-[#0E2A1E]"
            >
              {property.intent === 'buy' ? 'Buy' : 'Rent'}
            </button>
            <span>/</span>
            <span className="text-[#0E2A1E] font-medium truncate max-w-xs">{property.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#FFFFFF] border border-[#E5E0D8] hover:border-[#0E2A1E] text-[#1F2421] text-[12.5px] font-medium transition-colors cursor-pointer"
            >
              <Share2 size={14} />
              <span>Share</span>
            </button>
            <button
              onClick={() => toggleSaveProperty(property.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#FFFFFF] border border-[#E5E0D8] hover:border-[#C5A880] text-[#1F2421] text-[12.5px] font-medium transition-colors cursor-pointer"
            >
              <Heart size={14} className={saved ? 'text-[#C5A880] fill-[#C5A880]' : ''} />
              <span>{saved ? 'Saved' : 'Save Property'}</span>
            </button>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-10">
          {/* Main Large Hero Image */}
          <div
            onClick={() => setLightboxOpen(true)}
            className="lg:col-span-8 relative aspect-[16/10] rounded-[8px] overflow-hidden bg-[#0E2A1E] border border-[#E5E0D8] shadow-md cursor-pointer group"
          >
            <img
              src={property.images[activeImageIdx] || property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />

            {/* Verified Badge Header */}
            {property.verified && (
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-[6px] bg-[#0E2A1E]/95 border border-[#C5A880]/50 backdrop-blur-md text-[#FAF8F5] text-[11px] font-semibold">
                <ShieldCheck size={15} className="text-[#C5A880]" />
                <span>{property.verificationBadgeText || 'Verified Ownership & Clear Title'}</span>
              </div>
            )}

            {/* Click to expand hint */}
            <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-[6px] bg-[#071710]/80 backdrop-blur-md border border-white/20 text-[11.5px] text-[#FAF8F5] flex items-center gap-2">
              <Sparkles size={13} className="text-[#C5A880]" />
              <span>Click to view {property.images.length} high-res photos</span>
            </div>
          </div>

          {/* Thumbnails Sidebar */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
            {property.images.slice(0, 3).map((img: string, idx: number) => (
              <div
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`relative aspect-[16/10] rounded-[8px] overflow-hidden border cursor-pointer transition-all ${
                  activeImageIdx === idx
                    ? 'border-[#0E2A1E] ring-2 ring-[#0E2A1E]/30'
                    : 'border-[#E5E0D8] hover:border-[#C5A880]'
                }`}
              >
                <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Layout (Left 8 Cols, Right 4 Cols Sticky) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column — Detailed Information */}
          <div className="lg:col-span-8 space-y-12">
            {/* Header Block */}
            <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-6 md:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-[4px] bg-[#0E2A1E] text-[#FAF8F5] text-[11px] font-bold uppercase tracking-wider">
                    {property.intent === 'buy' ? 'For Sale' : 'For Rent'}
                  </span>
                  <span className="px-3 py-1 rounded-[4px] bg-[#E8EFE8] text-[#0E2A1E] text-[11px] font-semibold uppercase tracking-wider">
                    {property.type}
                  </span>
                  <span className="px-3 py-1 rounded-[4px] bg-[#FAF8F5] border border-[#E5E0D8] text-[#5E6961] text-[11px]">
                    Built {property.yearBuilt}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-[#5E6961] uppercase tracking-wider block">
                    {property.intent === 'buy' ? 'Listing Price' : 'Monthly Rent'}
                  </span>
                  <span className="text-[28px] md:text-[34px] font-extrabold text-[#0E2A1E] font-heading leading-tight">
                    {property.price}
                  </span>
                  {property.pricePerSqFt && (
                    <span className="text-[12px] text-[#5E6961] block">
                      {property.pricePerSqFt}
                    </span>
                  )}
                </div>
              </div>

              <h1 className="text-[26px] md:text-[32px] font-extrabold text-[#1F2421] font-heading leading-tight mb-2">
                {property.title}
              </h1>

              <div className="flex items-center gap-1.5 text-[14px] text-[#5E6961] mb-6">
                <MapPin size={16} className="text-[#C5A880] shrink-0" />
                <span>{property.location}</span>
              </div>

              {/* Key Facts Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-t border-[#E5E0D8]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[8px] bg-[#E8EFE8] text-[#0E2A1E] flex items-center justify-center">
                    <Bed size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#5E6961] block">Bedrooms</span>
                    <span className="text-[14px] font-bold text-[#1F2421]">{property.bedrooms} Suites</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[8px] bg-[#E8EFE8] text-[#0E2A1E] flex items-center justify-center">
                    <Bath size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#5E6961] block">Bathrooms</span>
                    <span className="text-[14px] font-bold text-[#1F2421]">{property.bathrooms} Baths</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[8px] bg-[#E8EFE8] text-[#0E2A1E] flex items-center justify-center">
                    <Maximize2 size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#5E6961] block">Living Area</span>
                    <span className="text-[14px] font-bold text-[#1F2421]">{property.area}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[8px] bg-[#E8EFE8] text-[#0E2A1E] flex items-center justify-center">
                    <Car size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#5E6961] block">Parking</span>
                    <span className="text-[14px] font-bold text-[#1F2421]">{property.parking} Stalls</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description & Overview */}
            <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-6 md:p-8 shadow-sm">
              <h2 className="text-[20px] font-bold text-[#1F2421] font-heading mb-4">
                Architectural Narrative
              </h2>
              <p className="text-[14.5px] text-[#1F2421] leading-relaxed mb-4">
                {property.description}
              </p>
              <p className="text-[14px] text-[#5E6961] leading-relaxed">
                {property.overview}
              </p>

              {/* Highlights */}
              <div className="mt-8 pt-6 border-t border-[#E5E0D8]">
                <h3 className="text-[14px] font-bold uppercase tracking-wider text-[#0E2A1E] mb-4">
                  Signature Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.highlights.map((highlight: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5 text-[13.5px] text-[#1F2421]">
                      <CheckCircle2 size={16} className="text-[#0E2A1E] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities & Features */}
            <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-6 md:p-8 shadow-sm">
              <h2 className="text-[20px] font-bold text-[#1F2421] font-heading mb-6">
                Amenities & Compound Infrastructure
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {property.amenities.map((amenity: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-[6px] bg-[#FAF8F5] border border-[#E5E0D8] text-[12.5px] font-medium text-[#1F2421] flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E2A1E]" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Floor Plan Viewer */}
            <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-6 md:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-[20px] font-bold text-[#1F2421] font-heading">
                    Interactive Floor Plans
                  </h2>
                  <p className="text-[13px] text-[#5E6961]">
                    Architecturally measured and verified room proportions.
                  </p>
                </div>

                {/* Level Tabs */}
                <div className="flex gap-2">
                  {property.floorPlans.map((plan, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveFloorIndex(idx)}
                      className={`px-3.5 py-1.5 rounded-[6px] text-[12.5px] font-semibold transition-all cursor-pointer ${
                        activeFloorIndex === idx
                          ? 'bg-[#0E2A1E] text-[#FAF8F5]'
                          : 'bg-[#E8EFE8] text-[#0E2A1E] hover:bg-[#D2DFD2]'
                      }`}
                    >
                      {plan.level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Plan Details */}
              {property.floorPlans[activeFloorIndex] && (
                <div className="bg-[#FAF8F5] border border-[#E5E0D8] rounded-[8px] p-6">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5E0D8]">
                    <span className="text-[15px] font-bold text-[#1F2421]">
                      {property.floorPlans[activeFloorIndex].title}
                    </span>
                    <span className="text-[12px] font-mono text-[#0E2A1E] bg-[#E8EFE8] px-2.5 py-1 rounded-[4px]">
                      {property.floorPlans[activeFloorIndex].area}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {property.floorPlans[activeFloorIndex].rooms.map((room, rIdx) => (
                      <div key={rIdx} className="bg-[#FFFFFF] p-3.5 rounded-[6px] border border-[#E5E0D8]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[13px] font-bold text-[#1F2421]">{room.name}</span>
                          <span className="text-[11.5px] font-mono text-[#C5A880] font-semibold">{room.size}</span>
                        </div>
                        <p className="text-[12px] text-[#5E6961] leading-normal">{room.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Neighborhood Facilities & Map */}
            <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Compass size={16} className="text-[#0E2A1E]" />
                <span className="eyebrow-forest">Location Context</span>
              </div>
              <h2 className="text-[20px] font-bold text-[#1F2421] font-heading mb-6">
                Nearby Facilities & Transit Access
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {property.nearby.map((place, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-[6px] bg-[#FAF8F5] border border-[#E5E0D8] flex items-start justify-between gap-3"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#C5A880] tracking-wider block mb-0.5">
                        {place.category}
                      </span>
                      <h4 className="text-[13.5px] font-bold text-[#1F2421]">{place.name}</h4>
                      <span className="text-[12px] text-[#5E6961] mt-1 block">
                        {place.distance} away
                      </span>
                    </div>
                    <span className="text-[11.5px] font-mono font-semibold text-[#0E2A1E] bg-[#E8EFE8] px-2 py-1 rounded-[4px] shrink-0">
                      {place.travelTime}
                    </span>
                  </div>
                ))}
              </div>

              {/* Schematic Map Representation */}
              <div className="p-6 rounded-[8px] bg-[#0E2A1E] text-[#FAF8F5] flex flex-col items-center justify-center text-center">
                <MapPin size={28} className="text-[#C5A880] mb-2" />
                <h4 className="text-[15px] font-bold mb-1">{property.location}</h4>
                <p className="text-[12px] text-[#D2DFD2] max-w-sm mb-4">
                  GPS Coordinates: {property.coordinates.lat}, {property.coordinates.lng} (Verified Landmark Surveyed)
                </p>
                <button
                  onClick={() => window.open(`https://maps.google.com/?q=${property.coordinates.lat},${property.coordinates.lng}`, '_blank')}
                  className="btn-gold text-[12px] py-2 px-4 rounded-[6px] cursor-pointer"
                >
                  Open in Google Maps
                </button>
              </div>
            </div>

            {/* Mortgage / Rent Affordability Estimator */}
            <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Calculator size={16} className="text-[#0E2A1E]" />
                <span className="eyebrow-forest">Financial Tool</span>
              </div>
              <h2 className="text-[20px] font-bold text-[#1F2421] font-heading mb-6">
                Mortgage Affordability Estimator
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#1F2421] mb-1">
                      Down Payment ({downPaymentPercent}%)
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={50}
                      step={5}
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-[#0E2A1E] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-[#5E6961] mt-1">
                      <span>10% (₹{(defaultPrice * 0.1 / 100000).toFixed(1)}L)</span>
                      <span>50% (₹{(defaultPrice * 0.5 / 100000).toFixed(1)}L)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#1F2421] mb-1">
                      Interest Rate: {interestRate}% p.a.
                    </label>
                    <input
                      type="range"
                      min={6.5}
                      max={12}
                      step={0.25}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full accent-[#0E2A1E] cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#1F2421] mb-1">
                      Tenure: {loanTenureYears} Years
                    </label>
                    <input
                      type="range"
                      min={5}
                      max={30}
                      step={5}
                      value={loanTenureYears}
                      onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                      className="w-full accent-[#0E2A1E] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Calculated Output Box */}
                <div className="bg-[#FAF8F5] border border-[#E5E0D8] rounded-[8px] p-6 text-center">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5E6961] block mb-1">
                    Estimated Monthly Repayment
                  </span>
                  <span className="text-[32px] font-extrabold text-[#0E2A1E] font-heading block">
                    ₹{monthlyMortgage.toLocaleString('en-IN')}
                    <span className="text-[14px] font-normal text-[#5E6961]"> / month</span>
                  </span>
                  <p className="text-[11.5px] text-[#5E6961] mt-3">
                    Based on loan principal of ₹{((defaultPrice * (100 - downPaymentPercent)) / 10000000).toFixed(2)} Cr over {loanTenureYears} years.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Sticky Agent Card & Enquiry Action Form (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Agent Profile Card */}
            <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-6 shadow-sm sticky top-24">
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-[#E5E0D8]">
                <img
                  src={property.agent.avatar}
                  alt={property.agent.name}
                  className="w-16 h-16 rounded-[8px] object-cover border-2 border-[#C5A880]"
                />
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0E2A1E] mb-0.5">
                    <Award size={13} />
                    <span>Verified Advisor</span>
                  </div>
                  <h3 className="text-[17px] font-bold text-[#1F2421] font-heading">
                    {property.agent.name}
                  </h3>
                  <p className="text-[12px] text-[#5E6961]">{property.agent.role}</p>
                </div>
              </div>

              {/* Direct Schedule Button */}
              <button
                onClick={() => setViewingModalOpen(true)}
                className="btn-gold w-full py-3 text-[13.5px] rounded-[8px] flex items-center justify-center gap-2 mb-3 cursor-pointer shadow-md"
              >
                <Calendar size={16} />
                <span>Schedule Private Viewing</span>
              </button>

              {/* Quick Contact Info */}
              <div className="space-y-2 mb-6 text-[12.5px]">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="flex items-center gap-2.5 p-2.5 rounded-[6px] bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#0E2A1E] text-[#1F2421] font-medium transition-colors"
                >
                  <Phone size={14} className="text-[#0E2A1E]" />
                  <span>{property.agent.phone}</span>
                </a>
                <a
                  href={`mailto:${property.agent.email}`}
                  className="flex items-center gap-2.5 p-2.5 rounded-[6px] bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#0E2A1E] text-[#1F2421] font-medium transition-colors"
                >
                  <Mail size={14} className="text-[#0E2A1E]" />
                  <span className="truncate">{property.agent.email}</span>
                </a>
              </div>

              {/* Direct Inquire Form */}
              <form onSubmit={handleQuickEnquirySubmit} className="space-y-3 pt-4 border-t border-[#E5E0D8]">
                <h4 className="text-[13px] font-bold text-[#1F2421]">
                  Direct Property Dossier Request
                </h4>
                <input
                  type="text"
                  value={enquirerName}
                  onChange={(e) => setEnquirerName(e.target.value)}
                  placeholder="Your Name *"
                  className="w-full px-3 py-2 text-[12.5px] rounded-[6px] bg-[#FAF8F5] border border-[#E5E0D8] focus:outline-none focus:border-[#0E2A1E]"
                />
                <input
                  type="email"
                  value={enquirerEmail}
                  onChange={(e) => setEnquirerEmail(e.target.value)}
                  placeholder="Your Email *"
                  className="w-full px-3 py-2 text-[12.5px] rounded-[6px] bg-[#FAF8F5] border border-[#E5E0D8] focus:outline-none focus:border-[#0E2A1E]"
                />
                <input
                  type="tel"
                  value={enquirerPhone}
                  onChange={(e) => setEnquirerPhone(e.target.value)}
                  placeholder="Phone Number *"
                  className="w-full px-3 py-2 text-[12.5px] rounded-[6px] bg-[#FAF8F5] border border-[#E5E0D8] focus:outline-none focus:border-[#0E2A1E]"
                />
                <textarea
                  rows={3}
                  value={enquiryMessage}
                  onChange={(e) => setEnquiryMessage(e.target.value)}
                  placeholder="I am interested in this property and would like to review the complete verification audit and title dossier."
                  className="w-full px-3 py-2 text-[12.5px] rounded-[6px] bg-[#FAF8F5] border border-[#E5E0D8] focus:outline-none focus:border-[#0E2A1E]"
                />
                <button
                  type="submit"
                  disabled={isSubmittingEnquiry}
                  className="btn-forest w-full py-2.5 text-[13px] rounded-[6px] flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Send Enquiry to Advisor</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#E5E0D8]">
            <h2 className="section-title text-[#1F2421] mb-8">
              Similar Verified Residences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProperties.map((simProp: Property) => (
                <PropertyCard key={simProp.id} property={simProp} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#FFFFFF] border-t border-[#E5E0D8] px-4 py-3 shadow-2xl z-40 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-[#5E6961] uppercase tracking-wider block">Price</span>
          <span className="text-[17px] font-extrabold text-[#0E2A1E] font-heading">{property.price}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => toggleSaveProperty(property.id)}
            className="p-2.5 rounded-[8px] bg-[#FAF8F5] border border-[#E5E0D8]"
          >
            <Heart size={18} className={saved ? 'text-[#C5A880] fill-[#C5A880]' : ''} />
          </button>
          <button
            onClick={() => setViewingModalOpen(true)}
            className="btn-forest py-2.5 px-4 text-[13px] rounded-[8px]"
          >
            Schedule Viewing
          </button>
        </div>
      </div>

      {/* Schedule Viewing Modal */}
      {viewingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] max-w-lg w-full p-6 md:p-8 shadow-2xl animate-fadeIn relative">
            <button
              onClick={() => setViewingModalOpen(false)}
              className="absolute top-4 right-4 text-[#5E6961] hover:text-[#1F2421] text-xl font-bold p-1 cursor-pointer"
            >
              ×
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Calendar size={18} className="text-[#0E2A1E]" />
              <span className="eyebrow-forest">Private Appointment</span>
            </div>

            <h3 className="text-[20px] font-bold text-[#1F2421] font-heading mb-1">
              Schedule Private Viewing
            </h3>
            <p className="text-[13px] text-[#5E6961] mb-6">
              {property.title} · {property.location}
            </p>

            <form onSubmit={handleScheduleViewingSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11.5px] font-semibold text-[#1F2421] mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={viewingDate}
                    onChange={(e) => setViewingDate(e.target.value)}
                    className="w-full px-3 py-2 text-[13px] rounded-[6px] border border-[#E5E0D8] bg-[#FAF8F5] focus:outline-none focus:border-[#0E2A1E]"
                  />
                </div>

                <div>
                  <label className="block text-[11.5px] font-semibold text-[#1F2421] mb-1">
                    Preferred Time Slot *
                  </label>
                  <select
                    value={viewingTime}
                    onChange={(e) => setViewingTime(e.target.value)}
                    className="w-full px-3 py-2 text-[13px] rounded-[6px] border border-[#E5E0D8] bg-[#FAF8F5] focus:outline-none focus:border-[#0E2A1E]"
                  >
                    <option value="10:00 AM">10:00 AM (Morning)</option>
                    <option value="11:30 AM">11:30 AM (Morning)</option>
                    <option value="02:30 PM">02:30 PM (Afternoon)</option>
                    <option value="04:00 PM">04:00 PM (Sunset / Evening)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11.5px] font-semibold text-[#1F2421] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  placeholder="e.g. Rahul Kapoor"
                  className="w-full px-3 py-2 text-[13px] rounded-[6px] border border-[#E5E0D8] bg-[#FAF8F5] focus:outline-none focus:border-[#0E2A1E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11.5px] font-semibold text-[#1F2421] mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={visitorEmail}
                    onChange={(e) => setVisitorEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-3 py-2 text-[13px] rounded-[6px] border border-[#E5E0D8] bg-[#FAF8F5] focus:outline-none focus:border-[#0E2A1E]"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-[#1F2421] mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={visitorPhone}
                    onChange={(e) => setVisitorPhone(e.target.value)}
                    placeholder="+91 98450 12345"
                    className="w-full px-3 py-2 text-[13px] rounded-[6px] border border-[#E5E0D8] bg-[#FAF8F5] focus:outline-none focus:border-[#0E2A1E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11.5px] font-semibold text-[#1F2421] mb-1">
                  Special Viewing Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={viewingNotes}
                  onChange={(e) => setViewingNotes(e.target.value)}
                  placeholder="Need wheelchair access, bringing family, specific security gate clearance..."
                  className="w-full px-3 py-2 text-[13px] rounded-[6px] border border-[#E5E0D8] bg-[#FAF8F5] focus:outline-none focus:border-[#0E2A1E]"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmittingViewing}
                  className="btn-forest w-full py-3 text-[13.5px] rounded-[8px] flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Confirm Appointment Booking</span>
                  <CheckCircle2 size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-[#071710]/95 backdrop-blur-md flex flex-col justify-between p-6">
          <div className="flex items-center justify-between text-[#FAF8F5]">
            <span className="text-[14px] font-mono">
              Photo {activeImageIdx + 1} of {property.images.length}
            </span>
            <button
              onClick={() => setLightboxOpen(false)}
              className="text-white hover:text-[#C5A880] text-2xl font-bold p-2 cursor-pointer"
            >
              ×
            </button>
          </div>

          <div className="relative max-h-[80vh] flex items-center justify-center">
            <img
              src={property.images[activeImageIdx]}
              alt={property.title}
              className="max-h-[75vh] max-w-[90vw] object-contain rounded-[6px]"
            />
            <button
              onClick={() => setActiveImageIdx((prev) => (prev - 1 + property.images.length) % property.images.length)}
              className="absolute left-4 p-3 rounded-full bg-[#0E2A1E]/80 text-white cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => setActiveImageIdx((prev) => (prev + 1) % property.images.length)}
              className="absolute right-4 p-3 rounded-full bg-[#0E2A1E]/80 text-white cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex justify-center gap-3 overflow-x-auto py-2">
            {property.images.map((img: string, idx: number) => (
              <img
                key={idx}
                src={img}
                alt=""
                onClick={() => setActiveImageIdx(idx)}
                className={`w-16 h-12 object-cover rounded-[4px] cursor-pointer ${
                  activeImageIdx === idx ? 'ring-2 ring-[#C5A880]' : 'opacity-50'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
