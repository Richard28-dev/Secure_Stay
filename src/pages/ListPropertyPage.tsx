import React, { useState } from 'react';
import { ShieldCheck, Upload, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import { useRouter } from '../context/RouterContext';
import type { PropertyType, PropertyIntent, FurnishedStatus } from '../types';

export default function ListPropertyPage() {
  const { addProperty, showToast } = useProperties();
  const { navigate } = useRouter();

  const [currentStep, setCurrentStep] = useState(1);

  // Form Fields
  const [title, setTitle] = useState('');
  const [intent, setIntent] = useState<PropertyIntent>('buy');
  const [type, setType] = useState<PropertyType>('Villa');
  const [city, setCity] = useState('Bengaluru');
  const [neighbourhood, setNeighbourhood] = useState('');
  const [location, setLocation] = useState('');
  const [yearBuilt, setYearBuilt] = useState(2024);

  const [price, setPrice] = useState('₹4.50 Cr');
  const [priceValue, setPriceValue] = useState(45000000);
  const [bedrooms, setBedrooms] = useState(4);
  const [bathrooms, setBathrooms] = useState(4);
  const [area, setArea] = useState('3,600 sq.ft');
  const [areaValue, setAreaValue] = useState(3600);
  const [parking, setParking] = useState(2);
  const [furnished, setFurnished] = useState<FurnishedStatus>('Furnished');
  const [description, setDescription] = useState('');

  // Amenities selection
  const defaultAmenities = [
    '24/7 Security',
    'Private Swimming Pool',
    'Clubhouse',
    'Gym',
    'Landscaped Gardens',
    'Power Backup',
    'Solar Panels',
    'Covered Parking',
    'Smart Home Automation',
    'CCTV Surveillance',
  ];
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    '24/7 Security',
    'Private Swimming Pool',
    'Power Backup',
  ]);

  // Images
  const presetPhotos = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  ];
  const [selectedImages, setSelectedImages] = useState<string[]>([presetPhotos[0], presetPhotos[1]]);
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Agent / Owner details
  const [agentName, setAgentName] = useState('Vikram Patel');
  const [agentPhone, setAgentPhone] = useState('+91 98450 18234');
  const [agentEmail, setAgentEmail] = useState('vikram.patel@securestay.com');

  const toggleAmenity = (item: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleAddImageUrl = () => {
    if (customImageUrl && customImageUrl.startsWith('http')) {
      setSelectedImages((prev) => [...prev, customImageUrl]);
      setCustomImageUrl('');
      showToast('Image URL added', 'success');
    } else {
      showToast('Please enter a valid HTTP/HTTPS image URL', 'error');
    }
  };

  const handleSubmitListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim() || !description.trim()) {
      showToast('Please complete all required listing fields', 'error');
      return;
    }

    const newProp = addProperty({
      title: title.trim(),
      location: location.trim(),
      city: city.trim(),
      neighbourhood: neighbourhood.trim() || city.trim(),
      intent,
      price,
      priceValue,
      pricePerSqFt: `₹${Math.round(priceValue / (areaValue || 1000)).toLocaleString('en-IN')} / sq.ft`,
      bedrooms,
      bathrooms,
      area,
      areaValue,
      type,
      parking,
      furnished,
      verified: true,
      verificationBadgeText: 'Verified Owner Title & Document Audit Passed',
      status: 'available',
      description,
      overview: 'Curated architectural residence recently submitted and approved on SecureStay.',
      highlights: [
        `${bedrooms} Luxury Ensuite Bedrooms`,
        `${area} Meticulously Planned Living Area`,
        `${parking} Reserved Covered Parking Stalls`,
        `${furnished} with Premium Fixtures`,
      ],
      features: selectedAmenities,
      amenities: selectedAmenities,
      floorPlans: [
        {
          level: 'Main Level',
          title: 'Architectural Ground Floor Plan',
          area,
          rooms: [
            { name: 'Formal Living Room', size: '22 x 16 ft', description: 'Double height living room' },
            { name: 'Chef Kitchen', size: '15 x 12 ft', description: 'Custom cabinetry and storage' },
          ],
        },
      ],
      nearby: [
        { category: 'transit', name: 'Metro / Arterial Express Highway', distance: '1.5 km', travelTime: '4 mins' },
        { category: 'health', name: 'Multi-Speciality Hospital', distance: '3.0 km', travelTime: '8 mins' },
      ],
      agent: {
        id: 'agent-custom',
        name: agentName,
        role: 'Verified Property Advisor',
        phone: agentPhone,
        email: agentEmail,
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
        rating: 4.95,
        reviewsCount: 15,
        experienceYears: 8,
        activeListingsCount: 4,
        verified: true,
      },
      images: selectedImages.length > 0 ? selectedImages : [presetPhotos[0]],
      featured: false,
      recent: true,
      yearBuilt,
      coordinates: { lat: 12.9716, lng: 77.5946 },
    });

    navigate(`/property/${newProp.id}`);
  };

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5] min-h-screen">
      <div className="container-luxury max-w-4xl">
        {/* Header */}
        <div className="mb-8 border-b border-[#E5E0D8] pb-6">
          <div className="flex items-center gap-2 text-[12px] text-[#5E6961] mb-2">
            <button onClick={() => navigate('/')} className="hover:text-[#0E2A1E]">Home</button>
            <span>/</span>
            <span className="text-[#0E2A1E] font-medium">List a Property</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={18} className="text-[#0E2A1E]" />
            <span className="eyebrow-forest">Owner & Agent Registry</span>
          </div>
          <h1 className="text-[32px] md:text-[38px] font-extrabold text-[#1F2421] font-heading leading-tight">
            Publish a Verified Residence
          </h1>
          <p className="text-[14px] text-[#5E6961] mt-1">
            Submit your property for title audit and instant inclusion in SecureStay's verified marketplace.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-4 gap-2 mb-8">
          {[
            { num: 1, title: 'Basics' },
            { num: 2, title: 'Specs & Features' },
            { num: 3, title: 'Photography' },
            { num: 4, title: 'Pricing & Audit' },
          ].map((step) => (
            <div
              key={step.num}
              onClick={() => setCurrentStep(step.num)}
              className={`p-3 rounded-[8px] border text-center transition-all cursor-pointer ${
                currentStep === step.num
                  ? 'bg-[#0E2A1E] text-[#FAF8F5] border-[#0E2A1E]'
                  : currentStep > step.num
                  ? 'bg-[#E8EFE8] text-[#0E2A1E] border-[#D2DFD2]'
                  : 'bg-[#FFFFFF] text-[#5E6961] border-[#E5E0D8]'
              }`}
            >
              <span className="text-[11px] uppercase font-bold block">Step 0{step.num}</span>
              <span className="text-[12.5px] font-semibold truncate block">{step.title}</span>
            </div>
          ))}
        </div>

        {/* Multi-Step Wizard Container */}
        <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-6 md:p-8 shadow-sm">
          {/* STEP 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <h3 className="text-[18px] font-bold text-[#1F2421] font-heading border-b border-[#E5E0D8] pb-3">
                Step 1: Property Identity & Location
              </h3>

              <div>
                <label className="block text-[12.5px] font-semibold text-[#1F2421] mb-1">
                  Property Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. The Glass Pavilion Estate"
                  className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12.5px] font-semibold text-[#1F2421] mb-1">
                    Listing Intent *
                  </label>
                  <select
                    value={intent}
                    onChange={(e) => setIntent(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                  >
                    <option value="buy">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12.5px] font-semibold text-[#1F2421] mb-1">
                    Property Type *
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                  >
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Estate">Estate</option>
                    <option value="Townhouse">Townhouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12.5px] font-semibold text-[#1F2421] mb-1">
                    Year Built
                  </label>
                  <input
                    type="number"
                    value={yearBuilt}
                    onChange={(e) => setYearBuilt(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12.5px] font-semibold text-[#1F2421] mb-1">
                    Primary City *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                  >
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Goa">Goa</option>
                    <option value="Pune">Pune</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12.5px] font-semibold text-[#1F2421] mb-1">
                    Neighbourhood / Locality *
                  </label>
                  <input
                    type="text"
                    required
                    value={neighbourhood}
                    onChange={(e) => setNeighbourhood(e.target.value)}
                    placeholder="e.g. Indiranagar, Jubilee Hills, Assagao"
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12.5px] font-semibold text-[#1F2421] mb-1">
                  Full Display Location Address *
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. 100ft Road, Indiranagar, Bengaluru"
                  className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="btn-forest px-6 py-2.5 rounded-[8px] flex items-center gap-2"
                >
                  <span>Continue to Specs</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Specs & Amenities */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <h3 className="text-[18px] font-bold text-[#1F2421] font-heading border-b border-[#E5E0D8] pb-3">
                Step 2: Specifications & Amenities
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[12.5px] font-semibold text-[#1F2421] mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={15}
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                  />
                </div>

                <div>
                  <label className="block text-[12.5px] font-semibold text-[#1F2421] mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={15}
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                  />
                </div>

                <div>
                  <label className="block text-[12.5px] font-semibold text-[#1F2421] mb-1">
                    Area (sq.ft)
                  </label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => {
                      setArea(e.target.value);
                      const num = parseInt(e.target.value.replace(/[^0-9]/g, '')) || 3000;
                      setAreaValue(num);
                    }}
                    placeholder="3,600 sq.ft"
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                  />
                </div>

                <div>
                  <label className="block text-[12.5px] font-semibold text-[#1F2421] mb-1">
                    Parking Stalls
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={parking}
                    onChange={(e) => setParking(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12.5px] font-semibold text-[#1F2421] mb-1">
                  Furnished Status
                </label>
                <select
                  value={furnished}
                  onChange={(e) => setFurnished(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                >
                  <option value="Furnished">Fully Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>

              <div>
                <label className="block text-[12.5px] font-semibold text-[#1F2421] mb-1">
                  Property Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the architectural highlights, finishings, compound layout, and distinctive qualities..."
                  className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                />
              </div>

              <div>
                <label className="block text-[12.5px] font-semibold text-[#1F2421] mb-2">
                  Select Compound Amenities
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {defaultAmenities.map((amenity) => {
                    const isChecked = selectedAmenities.includes(amenity);
                    return (
                      <button
                        type="button"
                        key={amenity}
                        onClick={() => toggleAmenity(amenity)}
                        className={`p-2.5 rounded-[6px] text-[12px] font-medium border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-[#E8EFE8] text-[#0E2A1E] border-[#0E2A1E]'
                            : 'bg-[#FAF8F5] text-[#5E6961] border-[#E5E0D8]'
                        }`}
                      >
                        <span>{amenity}</span>
                        {isChecked && <CheckCircle2 size={14} className="text-[#0E2A1E]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="btn-outline-forest px-5 py-2.5 rounded-[8px] flex items-center gap-2"
                >
                  <ArrowLeft size={15} />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="btn-forest px-6 py-2.5 rounded-[8px] flex items-center gap-2"
                >
                  <span>Continue to Photos</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Photography */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <h3 className="text-[18px] font-bold text-[#1F2421] font-heading border-b border-[#E5E0D8] pb-3">
                Step 3: High-Resolution Architectural Photography
              </h3>

              <div className="bg-[#FAF8F5] border-2 border-dashed border-[#E5E0D8] rounded-[8px] p-6 text-center">
                <Upload size={32} className="text-[#0E2A1E] mx-auto mb-2" />
                <h4 className="text-[14px] font-bold text-[#1F2421]">
                  Upload Property Photos or Add Verified URLs
                </h4>
                <p className="text-[12px] text-[#5E6961] max-w-sm mx-auto mt-1 mb-4">
                  Select from preset high-res architectural photos below or enter an external image link.
                </p>

                <div className="flex gap-2 max-w-md mx-auto">
                  <input
                    type="url"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-2 text-[12.5px] rounded-[6px] border border-[#E5E0D8] bg-[#FFFFFF]"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="btn-forest text-[12.5px] py-2 px-4 rounded-[6px]"
                  >
                    Add Image
                  </button>
                </div>
              </div>

              {/* Selected Images Grid */}
              <div>
                <label className="block text-[12.5px] font-semibold text-[#1F2421] mb-2">
                  Active Gallery Photos ({selectedImages.length})
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {presetPhotos.map((photo, idx) => {
                    const isSelected = selectedImages.includes(photo);
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedImages((prev) => prev.filter((p) => p !== photo));
                          } else {
                            setSelectedImages((prev) => [...prev, photo]);
                          }
                        }}
                        className={`relative aspect-[16/10] rounded-[6px] overflow-hidden border cursor-pointer ${
                          isSelected ? 'ring-2 ring-[#0E2A1E] border-[#0E2A1E]' : 'opacity-60'
                        }`}
                      >
                        <img src={photo} alt="" className="w-full h-full object-cover" />
                        <div className="absolute top-1 right-1">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                              isSelected ? 'bg-[#0E2A1E] text-white' : 'bg-white/80'
                            }`}
                          >
                            {isSelected ? '✓' : '+'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="btn-outline-forest px-5 py-2.5 rounded-[8px] flex items-center gap-2"
                >
                  <ArrowLeft size={15} />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="btn-forest px-6 py-2.5 rounded-[8px] flex items-center gap-2"
                >
                  <span>Continue to Pricing</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Pricing & Advisor Contact */}
          {currentStep === 4 && (
            <form onSubmit={handleSubmitListing} className="space-y-5 animate-fadeIn">
              <h3 className="text-[18px] font-bold text-[#1F2421] font-heading border-b border-[#E5E0D8] pb-3">
                Step 4: Valuation & Contact Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12.5px] font-semibold text-[#1F2421] mb-1">
                    Display Price String *
                  </label>
                  <input
                    type="text"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. ₹4.85 Cr or ₹1.85 Lakh / mo"
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                  />
                </div>

                <div>
                  <label className="block text-[12.5px] font-semibold text-[#1F2421] mb-1">
                    Numeric Valuation (INR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={priceValue}
                    onChange={(e) => setPriceValue(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12.5px] font-semibold text-[#1F2421] mb-1">
                    Contact / Agent Name
                  </label>
                  <input
                    type="text"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-[#1F2421] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={agentPhone}
                    onChange={(e) => setAgentPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-[#1F2421] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={agentEmail}
                    onChange={(e) => setAgentEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                  />
                </div>
              </div>

              {/* Verification Disclosure */}
              <div className="p-4 rounded-[8px] bg-[#E8EFE8] border border-[#0E2A1E]/30 text-[12.5px] text-[#0E2A1E]">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <ShieldCheck size={16} />
                  <span>SecureStay Verification Protocol</span>
                </div>
                <p>
                  By publishing, you confirm that you hold clear title or exclusive seller advisory rights. SecureStay conducts independent land registry and encumbrance checks prior to featured marketplace placement.
                </p>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="btn-outline-forest px-5 py-2.5 rounded-[8px] flex items-center gap-2"
                >
                  <ArrowLeft size={15} />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="btn-gold px-8 py-3 rounded-[8px] flex items-center gap-2 font-bold shadow-md cursor-pointer"
                >
                  <span>Publish Property to Registry</span>
                  <CheckCircle2 size={16} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
