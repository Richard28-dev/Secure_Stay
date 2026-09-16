import React, { useState } from 'react';
import { Send, ShieldCheck, CheckCircle2, PhoneCall, Mail, ArrowRight } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';
import { useRouter } from '../../context/RouterContext';

export default function FinalEnquirySection() {
  const { addEnquiry, showToast } = useProperties();
  const { navigate } = useRouter();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredLocation, setPreferredLocation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      showToast('Please provide your name, email, and phone number', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await addEnquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        enquiryType: 'buy',
        preferredLocation: preferredLocation.trim() || 'Unspecified',
        budget: 'Flexible',
        message: message.trim() || 'General property enquiry from homepage',
      });

      setIsSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setPreferredLocation('');
      setMessage('');
      showToast('Enquiry received. An advisor will contact you within 24 business hours.', 'success');
    } catch {
      showToast('Failed to submit enquiry. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enquiry" className="py-16 lg:py-24 bg-[#0A2A1D] text-[#FAF8F5] border-t border-white/10">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left CTA Callout (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#164733] text-[#C5A880] text-[11px] font-bold uppercase tracking-wider border border-[#C5A880]/30">
              <ShieldCheck size={14} />
              <span>Direct Property Advisory</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white tracking-tight leading-tight">
              Looking for the right property?
            </h2>

            <p className="text-[16px] text-[#D2DFD2] leading-relaxed max-w-lg font-normal">
              Talk to a SecureStay property expert. We provide verified property options, clear title due diligence, and zero high-pressure sales calls.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => navigate('/buy')}
                className="px-6 py-3.5 rounded-[6px] bg-[#C5A880] hover:bg-[#D4BC96] text-[#0A2A1D] text-[14px] font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Explore Properties</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="px-6 py-3.5 rounded-[6px] border border-white/30 hover:border-white text-white text-[14px] font-semibold transition-colors cursor-pointer"
              >
                <span>Contact Us</span>
              </button>
            </div>

            {/* Direct Contacts */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px] text-[#D2DFD2]">
              <div className="flex items-center gap-2.5">
                <PhoneCall size={15} className="text-[#C5A880]" />
                <span>+91 80 4920 8800</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#C5A880]" />
                <span>advisory@securestay.com</span>
              </div>
            </div>
          </div>

          {/* Right Consultation Form Card (6 cols) */}
          <div className="lg:col-span-6 bg-[#0E3324] border border-white/15 rounded-[8px] p-6 sm:p-8 shadow-xl">
            <h3 className="text-[20px] font-bold text-white font-heading mb-1">
              Request a Private Callback
            </h3>
            <p className="text-[13px] text-[#D2DFD2] mb-5">
              Leave your details below and a licensed property consultant will assist you.
            </p>

            {isSuccess ? (
              <div className="bg-[#164733] border border-white/20 rounded-[6px] p-6 text-center">
                <CheckCircle2 size={36} className="text-[#C5A880] mx-auto mb-2" />
                <h4 className="text-[16px] font-bold text-white">Callback Request Confirmed</h4>
                <p className="text-[13px] text-[#D2DFD2] mt-1">
                  Our Senior Advisory Desk will contact you within 24 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 px-4 py-1.5 rounded-[4px] bg-[#C5A880] text-[#0A2A1D] text-[12px] font-bold cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D2DFD2] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#061A12] border border-white/15 rounded-[6px] text-[13.5px] text-white placeholder-[#6E8274] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D2DFD2] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-[#061A12] border border-white/15 rounded-[6px] text-[13.5px] text-white placeholder-[#6E8274] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D2DFD2] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-[#061A12] border border-white/15 rounded-[6px] text-[13.5px] text-white placeholder-[#6E8274] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D2DFD2] mb-1">
                      Preferred Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Whitefield, Bandra..."
                      value={preferredLocation}
                      onChange={(e) => setPreferredLocation(e.target.value)}
                      className="w-full px-3 py-2 bg-[#061A12] border border-white/15 rounded-[6px] text-[13.5px] text-white placeholder-[#6E8274] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D2DFD2] mb-1">
                    Requirements / Message
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us what type of property, BHK, or budget you are considering..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 bg-[#061A12] border border-white/15 rounded-[6px] text-[13.5px] text-white placeholder-[#6E8274] focus:outline-none focus:border-[#C5A880] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-[6px] bg-[#C5A880] hover:bg-[#D4BC96] text-[#0A2A1D] text-[13.5px] font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Request Advisory Callback'}</span>
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
