import React, { useState } from 'react';
import { Send, ShieldCheck, CheckCircle2, Lock, Loader2, PhoneCall, Mail, MapPin } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { useRouter } from '../../context/RouterContext';

export default function FinalEnquirySection() {
  const { addEnquiry, showToast } = useProperties();
  const { navigate } = useRouter();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [enquiryType, setEnquiryType] = useState<'buy' | 'rent' | 'valuation' | 'general'>('buy');
  const [preferredLocation, setPreferredLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid email is required';
    if (!phone.trim() || phone.length < 8) newErrors.phone = 'Valid phone number is required';
    if (!message.trim()) newErrors.message = 'Please provide details on your requirements';
    if (!consent) newErrors.consent = 'You must agree to the privacy policy to submit';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please correct the highlighted form errors', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await addEnquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        enquiryType,
        preferredLocation: preferredLocation.trim() || 'Unspecified',
        budget: budget.trim() || 'Flexible',
        message: message.trim(),
      });

      setIsSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setPreferredLocation('');
      setBudget('');
      setMessage('');
      setConsent(false);
      setErrors({});
    } catch {
      showToast('Failed to submit enquiry. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enquiry" className="py-16 lg:py-24 bg-[#FAF8F5] border-t border-[#E5E0D8]">
      <div className="container-luxury">
        {/* Split Layout Container */}
        <div className="bg-white border border-[#E5E0D8] rounded-[8px] overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* LEFT: Property Consultation Message & Professional Image (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0E2A1E] text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Background Subtle Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0E2A1E] via-[#0E2A1E]/95 to-[#071710] z-0" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#E8EFE8]/15 border border-white/20 text-[#FAF8F5] text-[11px] font-bold uppercase tracking-wider">
                <ShieldCheck size={14} className="text-[#C5A880]" />
                <span>Private Consultation</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold font-heading leading-tight text-[#FAF8F5]">
                Begin Your Property Search
              </h2>

              <p className="text-[14.5px] text-[#D2DFD2] leading-relaxed font-normal">
                Connect directly with a licensed SecureStay Property Advisor. We provide transparent guidance, certified title checks, and zero high-pressure sales calls.
              </p>

              {/* Consultation Image Card */}
              <div className="rounded-[8px] overflow-hidden border border-white/20 shadow-md my-4">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
                  alt="Professional Real Estate Advisory Consultation"
                  className="w-full h-44 object-cover"
                />
              </div>

              {/* Direct Advisor Contacts */}
              <div className="space-y-3 pt-4 border-t border-white/15 text-[13px] text-[#FAF8F5]/90">
                <div className="flex items-center gap-3">
                  <PhoneCall size={16} className="text-[#C5A880] shrink-0" />
                  <span>Advisory Desk: +91 80 4920 8800</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#C5A880] shrink-0" />
                  <span>advisory@securestayrealestate.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#C5A880] shrink-0" />
                  <span>Bengaluru · Hyderabad · Goa · Mumbai</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-6 border-t border-white/15 text-[11.5px] text-[#D2DFD2]/80">
              <span>🔒 100% Confidential · Zero Data Sharing Guarantee</span>
            </div>
          </div>

          {/* RIGHT: Enquiry Form (7 Cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">
            {isSuccess ? (
              <div className="bg-[#E8EFE8] border border-[#0E2A1E]/30 rounded-[8px] p-8 text-center animate-fadeIn my-auto">
                <CheckCircle2 size={44} className="text-[#0E2A1E] mx-auto mb-3" />
                <h3 className="text-[20px] font-bold text-[#1A1C1A] font-heading mb-2">
                  Enquiry Successfully Logged
                </h3>
                <p className="text-[14px] text-[#5A605B] max-w-md mx-auto mb-6">
                  Your enquiry dossier has been assigned to our Senior Advisory Desk. A verified advisor will contact you within 24 business hours.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="btn-forest text-[13px] py-2.5 px-6 rounded-[8px]"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-[#E5E0D8] pb-4 mb-2">
                  <h3 className="text-[18px] font-bold text-[#1A1C1A] font-heading">
                    Tell Us What You're Looking For
                  </h3>
                  <p className="text-[13px] text-[#5A605B] mt-0.5">
                    Fill in your details and an advisor will tailor options matching your criteria.
                  </p>
                </div>

                {/* Row 1: Name, Email, Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider text-[#5A605B] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikram Sharma"
                      className={`w-full px-3.5 py-2.5 rounded-[6px] border bg-[#FAF8F5] text-[13.5px] text-[#1A1C1A] focus:outline-none ${
                        errors.name ? 'border-[#842029] bg-[#FFF8F8]' : 'border-[#E5E0D8] focus:border-[#0E2A1E]'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-[#842029] mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider text-[#5A605B] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. vikram@domain.com"
                      className={`w-full px-3.5 py-2.5 rounded-[6px] border bg-[#FAF8F5] text-[13.5px] text-[#1A1C1A] focus:outline-none ${
                        errors.email ? 'border-[#842029] bg-[#FFF8F8]' : 'border-[#E5E0D8] focus:border-[#0E2A1E]'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-[#842029] mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider text-[#5A605B] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98450 12345"
                      className={`w-full px-3.5 py-2.5 rounded-[6px] border bg-[#FAF8F5] text-[13.5px] text-[#1A1C1A] focus:outline-none ${
                        errors.phone ? 'border-[#842029] bg-[#FFF8F8]' : 'border-[#E5E0D8] focus:border-[#0E2A1E]'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-[#842029] mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Row 2: Enquiry Type, Preferred Location, Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider text-[#5A605B] mb-1.5">
                      Enquiry Intent
                    </label>
                    <select
                      value={enquiryType}
                      onChange={(e) => setEnquiryType(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] text-[#1A1C1A] focus:outline-none focus:border-[#0E2A1E]"
                    >
                      <option value="buy">Purchase a Home</option>
                      <option value="rent">Luxury Rental</option>
                      <option value="valuation">Listing / Valuation</option>
                      <option value="general">General Advisory</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider text-[#5A605B] mb-1.5">
                      Preferred City / Area
                    </label>
                    <input
                      type="text"
                      value={preferredLocation}
                      onChange={(e) => setPreferredLocation(e.target.value)}
                      placeholder="e.g. Whitefield, Bengaluru"
                      className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] text-[#1A1C1A] focus:outline-none focus:border-[#0E2A1E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider text-[#5A605B] mb-1.5">
                      Budget Bracket
                    </label>
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="e.g. ₹2 Cr – ₹5 Cr"
                      className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] text-[#1A1C1A] focus:outline-none focus:border-[#0E2A1E]"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-[#5A605B] mb-1.5">
                    Specific Requirements or Notes *
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your preferred property characteristics (bedrooms, timeline, amenities)..."
                    className={`w-full px-3.5 py-2.5 rounded-[6px] border bg-[#FAF8F5] text-[13.5px] text-[#1A1C1A] focus:outline-none resize-none ${
                      errors.message ? 'border-[#842029] bg-[#FFF8F8]' : 'border-[#E5E0D8] focus:border-[#0E2A1E]'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] text-[#842029] mt-1">{errors.message}</p>}
                </div>

                {/* Consent */}
                <div>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-[#0E2A1E] rounded border-[#E5E0D8] focus:ring-[#0E2A1E]"
                    />
                    <span className="text-[12px] text-[#5A605B] leading-snug">
                      I consent to SecureStay contacting me regarding verified real estate advisory in accordance with the{' '}
                      <button
                        type="button"
                        onClick={() => navigate('/privacy')}
                        className="text-[#0E2A1E] font-semibold underline hover:text-[#163A29]"
                      >
                        Privacy Policy
                      </button>
                      . Zero cold calling or third-party spam.
                    </span>
                  </label>
                  {errors.consent && <p className="text-[11px] text-[#842029] mt-1">{errors.consent}</p>}
                </div>

                {/* Submit Action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2 text-[12px] text-[#5A605B]">
                    <Lock size={14} className="text-[#0E2A1E]" />
                    <span>256-bit encrypted submission</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-forest w-full sm:w-auto px-8 py-3.5 text-[14px] rounded-[8px] flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Submitting Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Secure Enquiry</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
