import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { useProperties } from '../context/PropertyContext';

export default function ContactPage() {
  const { navigate } = useRouter();
  const { addEnquiry, showToast } = useProperties();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('general');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      showToast('Please fill all required contact fields', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await addEnquiry({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        enquiryType: department as any,
        preferredLocation: 'National Advisory Desk',
        message: message.trim(),
      });
      setIsSent(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch {
      showToast('Failed to deliver message', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const offices = [
    {
      city: 'Bengaluru (Headquarters)',
      address: 'Level 7, Prestige Falcon Towers, Brunton Road, Ashok Nagar',
      phone: '+91 80 4910 8800',
      email: 'blr.advisory@securestay.com',
    },
    {
      city: 'Mumbai',
      address: 'Level 14, Platina Tower, Bandra Kurla Complex (BKC)',
      phone: '+91 22 6120 7400',
      email: 'mumbai.advisory@securestay.com',
    },
    {
      city: 'Hyderabad',
      address: 'Level 5, Skyview Towers, HITEC City, Madhapur',
      phone: '+91 40 4890 3200',
      email: 'hyd.advisory@securestay.com',
    },
    {
      city: 'New Delhi NCR',
      address: 'Level 8, Horizon Centre, Golf Course Road, Gurugram',
      phone: '+91 124 456 9900',
      email: 'delhi.advisory@securestay.com',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5] min-h-screen">
      <div className="container-luxury">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-[12px] text-[#5E6961] mb-2">
            <button onClick={() => navigate('/')} className="hover:text-[#0E2A1E]">Home</button>
            <span>/</span>
            <span className="text-[#0E2A1E] font-medium">Contact Advisory</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Phone size={18} className="text-[#0E2A1E]" />
            <span className="eyebrow-forest">Direct Advisory Channels</span>
          </div>
          <h1 className="text-[36px] md:text-[44px] font-extrabold text-[#1F2421] font-heading leading-tight mb-3">
            Contact SecureStay Advisory
          </h1>
          <p className="text-[15px] text-[#5E6961] leading-relaxed">
            Whether inquiring about a specific estate, requesting a confidential portfolio valuation, or discussing bespoke acquisitions—our senior team is at your disposal.
          </p>
        </div>

        {/* Form and Quick Contacts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Contact Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-8 shadow-sm">
            <h3 className="text-[20px] font-bold text-[#1F2421] font-heading mb-6">
              Send a Confidential Message
            </h3>

            {isSent ? (
              <div className="bg-[#E8EFE8] border border-[#0E2A1E]/30 rounded-[8px] p-8 text-center animate-fadeIn">
                <CheckCircle2 size={40} className="text-[#0E2A1E] mx-auto mb-3" />
                <h4 className="text-[18px] font-bold text-[#1F2421] font-heading mb-1">
                  Message Dispatched
                </h4>
                <p className="text-[13.5px] text-[#5E6961] mb-5">
                  Your communication has been routed to our Senior Advisory Desk. A managing consultant will respond within 24 hours.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="btn-forest text-[13px] py-2 px-5 rounded-[6px]"
                >
                  Send Another Communication
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#1F2421] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anand Mahindra"
                      className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#1F2421] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="anand@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#1F2421] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98450 12345"
                      className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#1F2421] mb-1">
                      Department / Query Type
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                    >
                      <option value="buy">Property Acquisition</option>
                      <option value="rent">Luxury Rental Lease</option>
                      <option value="valuation">Owner Listing & Valuation</option>
                      <option value="legal">Legal Title Audit Inquiry</option>
                      <option value="general">General Concierge</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#1F2421] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details regarding your timeline, specific property ID, or preferred meeting schedule..."
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13.5px] focus:outline-none focus:border-[#0E2A1E]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-forest w-full sm:w-auto px-7 py-3 text-[13.5px] rounded-[8px] flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Direct Channels & Hours (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0E2A1E] text-[#FAF8F5] rounded-[8px] p-8 border border-[#163A29]">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={18} className="text-[#C5A880]" />
                <span className="eyebrow text-[#C5A880]">Senior Advisory Hotline</span>
              </div>
              <h3 className="text-[22px] font-bold font-heading mb-3">
                Immediate Assistance
              </h3>
              <p className="text-[13.5px] text-[#D2DFD2] leading-relaxed mb-6">
                Direct phone lines connecting to managing property partners during standard business and market hours.
              </p>

              <div className="space-y-3 text-[13.5px]">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#C5A880]" />
                  <span className="font-semibold">+91 80 4910 8800</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#C5A880]" />
                  <span>advisory@securestay.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-[#C5A880]" />
                  <span>Monday – Saturday: 9:00 AM – 7:30 PM IST</span>
                </div>
              </div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-6 shadow-sm">
              <h4 className="text-[14px] font-bold text-[#1F2421] mb-2 font-heading">
                Client Privacy Guarantee
              </h4>
              <p className="text-[12.5px] text-[#5E6961] leading-relaxed">
                All communications remain under strict Non-Disclosure Protocol. We never share phone numbers or investment interests with external brokers or third-party lead generation engines.
              </p>
            </div>
          </div>
        </div>

        {/* Regional Offices Grid */}
        <div>
          <h2 className="section-title text-[#1F2421] mb-8 text-center">
            Regional Advisory Offices
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office) => (
              <div key={office.city} className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={16} className="text-[#0E2A1E]" />
                  <h3 className="text-[15px] font-bold text-[#1F2421] font-heading">{office.city}</h3>
                </div>
                <p className="text-[12.5px] text-[#5E6961] leading-relaxed mb-4">{office.address}</p>
                <div className="text-[12px] text-[#0E2A1E] font-medium space-y-1">
                  <div>{office.phone}</div>
                  <div className="text-[#5E6961]">{office.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
