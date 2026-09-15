import { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const locationOptions = ['Bengaluru', 'Hyderabad', 'Mumbai', 'Goa', 'Chennai', 'Pune'];
const propertyTypes = ['Luxury Villa', 'Modern Penthouse', 'Waterfront Estate', 'Heritage Manor', 'Development Masterplan'];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    type: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="section-wrapper bg-[#FAF9F5] text-[#17181C] border-t border-[#E5E1D8]">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <ScrollReveal>
            <div className="max-w-xl">
              <span className="eyebrow mb-4">Direct Communication</span>
              <h2 className="section-title text-[#17181C]">
                Private Client Advisory
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <p className="section-subtitle lg:text-right">
              Submit your acquisition criteria. A dedicated partner will respond discreetly within 24 business hours.
            </p>
          </ScrollReveal>
        </div>

        {/* 2-Column Contact Form & Institutional Directory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form (7 cols) */}
          <ScrollReveal delay={150} className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-[#FFFFFF] border border-[#E5E1D8] p-8 lg:p-12 rounded-[2px] shadow-[0_20px_40px_rgba(0,0,0,0.02)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-[#8E9199] tracking-[0.2em] uppercase">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-[#FAF9F5] border border-[#E5E1D8] px-4 py-3.5 text-[13px] text-[#17181C] focus:outline-none focus:border-[#0E2519] transition-colors rounded-[2px]"
                    placeholder="Lord / Lady / Mr. / Ms. Full Name"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-[#8E9199] tracking-[0.2em] uppercase">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-[#FAF9F5] border border-[#E5E1D8] px-4 py-3.5 text-[13px] text-[#17181C] focus:outline-none focus:border-[#0E2519] transition-colors rounded-[2px]"
                    placeholder="advisory@domain.com"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-[#8E9199] tracking-[0.2em] uppercase">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-[#FAF9F5] border border-[#E5E1D8] px-4 py-3.5 text-[13px] text-[#17181C] focus:outline-none focus:border-[#0E2519] transition-colors rounded-[2px]"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-[#8E9199] tracking-[0.2em] uppercase">
                    Preferred Destination
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="bg-[#FAF9F5] border border-[#E5E1D8] px-4 py-3.5 text-[13px] text-[#17181C] focus:outline-none focus:border-[#0E2519] transition-colors rounded-[2px]"
                  >
                    <option value="">Select Destination</option>
                    {locationOptions.map((loc) => (
                      <option key={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-6">
                <label className="text-[10px] font-bold text-[#8E9199] tracking-[0.2em] uppercase">
                  Property Typology
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="bg-[#FAF9F5] border border-[#E5E1D8] px-4 py-3.5 text-[13px] text-[#17181C] focus:outline-none focus:border-[#0E2519] transition-colors rounded-[2px]"
                >
                  <option value="">Select Interest</option>
                  {propertyTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2 mb-8">
                <label className="text-[10px] font-bold text-[#8E9199] tracking-[0.2em] uppercase">
                  Acquisition Scope & Notes
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="bg-[#FAF9F5] border border-[#E5E1D8] px-4 py-3.5 text-[13px] text-[#17181C] focus:outline-none focus:border-[#0E2519] transition-colors rounded-[2px] resize-none"
                  placeholder="Share any specific requirements (approximate budget, square footage, architectural style)..."
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="btn-editorial w-full py-4 text-[12px] font-semibold tracking-[0.2em]"
              >
                {submitted ? (
                  <span className="flex items-center gap-2 text-[#C5A880]">
                    <CheckCircle2 size={16} />
                    Consultation Requested Successfully
                  </span>
                ) : (
                  <>
                    <span>Submit Private Dossier Request</span>
                    <ArrowUpRight size={14} strokeWidth={1.5} />
                  </>
                )}
              </button>
            </form>
          </ScrollReveal>

          {/* Institutional Advisory Headquarters (5 cols) */}
          <ScrollReveal delay={250} className="lg:col-span-5">
            <div className="bg-[#0C1015] text-[#FAF9F5] p-8 lg:p-12 rounded-[2px] h-full flex flex-col justify-between border border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[13px] font-semibold tracking-[0.25em] text-[#FAF9F5]">
                    SECURESTAY
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                </div>
                <span className="text-[8px] font-medium tracking-[0.4em] text-[#8E9199] block mb-8">
                  PRIVATE CLIENT ADVISORY
                </span>

                <div className="space-y-8">
                  <div className="flex gap-4">
                    <MapPin size={18} strokeWidth={1.5} className="text-[#C5A880] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-[10px] tracking-[0.2em] uppercase text-[#8E9199] font-bold mb-1">
                        Principal Bureau
                      </div>
                      <div className="text-[14px] text-[#FAF9F5] font-light leading-relaxed">
                        SecureStay Pavilions, Lavelle Road<br />
                        Bengaluru, Karnataka 560001, India
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone size={18} strokeWidth={1.5} className="text-[#C5A880] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-[10px] tracking-[0.2em] uppercase text-[#8E9199] font-bold mb-1">
                        Private Client Line
                      </div>
                      <div className="text-[14px] text-[#FAF9F5] font-light">
                        +91 80 4920 8800
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Mail size={18} strokeWidth={1.5} className="text-[#C5A880] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-[10px] tracking-[0.2em] uppercase text-[#8E9199] font-bold mb-1">
                        Confidential Correspondence
                      </div>
                      <div className="text-[14px] text-[#FAF9F5] font-light">
                        privateadvisory@securestayrealestate.com
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Clock size={18} strokeWidth={1.5} className="text-[#C5A880] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-[10px] tracking-[0.2em] uppercase text-[#8E9199] font-bold mb-1">
                        Bureau Hours
                      </div>
                      <div className="text-[14px] text-[#FAF9F5] font-light leading-relaxed">
                        Monday – Saturday: 09:30 – 19:00 IST<br />
                        Private showings by appointment 7 days a week
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10">
                <p className="text-[11px] text-[#8E9199] font-light italic">
                  Member of Global Luxury Real Estate Guilds. Confidentiality strictly protected.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
