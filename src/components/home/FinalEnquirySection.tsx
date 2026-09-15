import React, { useState } from 'react';
import { Send, ShieldCheck, CheckCircle2, Lock, Loader2 } from 'lucide-react';
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
    <section id="enquiry" className="section-wrapper bg-[#FAF8F5] border-t border-[#E5E0D8]">
      <div className="container-luxury">
        <div className="max-w-4xl mx-auto bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-8 md:p-12 shadow-md">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 mb-2.5">
              <ShieldCheck size={16} className="text-[#0E2A1E]" />
              <span className="eyebrow-forest">Private Consultation</span>
            </div>
            <h2 className="section-title text-[#1F2421]">
              Begin Your Property Search
            </h2>
            <p className="section-subtitle mt-2 mx-auto">
              Connect with a dedicated SecureStay Senior Advisor. We respect your confidentiality and never share your data.
            </p>
          </div>

          {/* Success Notification Box */}
          {isSuccess ? (
            <div className="bg-[#E8EFE8] border border-[#0E2A1E]/30 rounded-[8px] p-8 text-center animate-fadeIn">
              <CheckCircle2 size={44} className="text-[#0E2A1E] mx-auto mb-3" />
              <h3 className="text-[20px] font-bold text-[#1F2421] font-heading mb-2">
                Enquiry Successfully Logged
              </h3>
              <p className="text-[14px] text-[#5E6961] max-w-md mx-auto mb-6">
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name, Email, Phone */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-[12px] font-semibold text-[#1F2421] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikram Sharma"
                    className={`w-full px-3.5 py-2.5 rounded-[8px] border bg-[#FAF8F5] text-[13.5px] text-[#1F2421] focus:outline-none ${
                      errors.name ? 'border-[#842029] bg-[#FFF8F8]' : 'border-[#E5E0D8] focus:border-[#0E2A1E]'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-[#842029] mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#1F2421] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. vikram@domain.com"
                    className={`w-full px-3.5 py-2.5 rounded-[8px] border bg-[#FAF8F5] text-[13.5px] text-[#1F2421] focus:outline-none ${
                      errors.email ? 'border-[#842029] bg-[#FFF8F8]' : 'border-[#E5E0D8] focus:border-[#0E2A1E]'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-[#842029] mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#1F2421] mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98450 12345"
                    className={`w-full px-3.5 py-2.5 rounded-[8px] border bg-[#FAF8F5] text-[13.5px] text-[#1F2421] focus:outline-none ${
                      errors.phone ? 'border-[#842029] bg-[#FFF8F8]' : 'border-[#E5E0D8] focus:border-[#0E2A1E]'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-[#842029] mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Row 2: Enquiry Type, Preferred Location, Budget */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-[12px] font-semibold text-[#1F2421] mb-1.5">
                    Enquiry Intent
                  </label>
                  <select
                    value={enquiryType}
                    onChange={(e) => setEnquiryType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] text-[#1F2421] focus:outline-none focus:border-[#0E2A1E]"
                  >
                    <option value="buy">Purchase Property</option>
                    <option value="rent">Luxury Rental</option>
                    <option value="valuation">Listing / Valuation</option>
                    <option value="general">General Advisory</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#1F2421] mb-1.5">
                    Preferred City / Area
                  </label>
                  <input
                    type="text"
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value)}
                    placeholder="e.g. Whitefield, Bengaluru"
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] text-[#1F2421] focus:outline-none focus:border-[#0E2A1E]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#1F2421] mb-1.5">
                    Budget Bracket
                  </label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. ₹4 Cr – ₹6 Cr"
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] text-[#1F2421] focus:outline-none focus:border-[#0E2A1E]"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[12px] font-semibold text-[#1F2421] mb-1.5">
                  Specific Requirements or Property Notes *
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your ideal property characteristics, timeline, specific architectural preferences, or viewing availability..."
                  className={`w-full px-3.5 py-2.5 rounded-[8px] border bg-[#FAF8F5] text-[13.5px] text-[#1F2421] focus:outline-none ${
                    errors.message ? 'border-[#842029] bg-[#FFF8F8]' : 'border-[#E5E0D8] focus:border-[#0E2A1E]'
                  }`}
                />
                {errors.message && <p className="text-[11px] text-[#842029] mt-1">{errors.message}</p>}
              </div>

              {/* Consent & Privacy Policy Link */}
              <div>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 text-[#0E2A1E] rounded-[4px] border-[#E5E0D8] focus:ring-[#0E2A1E]"
                  />
                  <span className="text-[12px] text-[#5E6961] leading-snug">
                    I consent to SecureStay contacting me regarding verified real estate advisory services in accordance with the{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/privacy')}
                      className="text-[#0E2A1E] font-semibold underline hover:text-[#163A29]"
                    >
                      Privacy Policy
                    </button>
                    . Your data is never shared with third-party marketing networks.
                  </span>
                </label>
                {errors.consent && <p className="text-[11px] text-[#842029] mt-1">{errors.consent}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-[12px] text-[#5E6961]">
                  <Lock size={14} className="text-[#0E2A1E]" />
                  <span>256-bit encrypted submission to SecureStay Advisory</span>
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
    </section>
  );
}
