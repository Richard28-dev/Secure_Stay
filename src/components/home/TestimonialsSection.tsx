import { Star, MessageSquare } from 'lucide-react';

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  transaction: string;
  photo: string;
}

export default function TestimonialsSection() {
  const testimonials: TestimonialItem[] = [
    {
      id: 't1',
      quote:
        'SecureStay gave our family complete peace of mind. Their independent 24-point legal verification and on-site architectural inspection saved us from making an expensive mistake on an encumbered villa in Whitefield.',
      author: 'Vikram & Priya Sundaram',
      role: 'Founders & Villa Buyers',
      location: 'Bengaluru',
      transaction: 'Acquired 4-BHK Gated Villa',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 't2',
      quote:
        'Relocating from Singapore, we needed an advisory firm that works with transparent fiduciary standards. Verified floor plans and direct developer deed reviews made our sky penthouse acquisition seamless.',
      author: 'Rajiv Nambiar',
      role: 'Managing Director & Investor',
      location: 'Hyderabad',
      transaction: 'Purchased Sky Duplex Penthouse',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 't3',
      quote:
        'No relentless cold calls or fake price quotes. Our assigned advisor coordinated three private viewings within 48 hours, providing exact room dimensions and neighborhood zoning records beforehand.',
      author: 'Dr. Ananya Roy',
      role: 'Chief Medical Specialist',
      location: 'Mumbai',
      transaction: 'Secured Seafront Apartment',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#FAF8F5] border-t border-[#E5E0D8]">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-2">
            <MessageSquare size={15} className="text-[#0E2A1E]" />
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#0E2A1E]">
              Client Experiences
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1C1A] font-heading tracking-tight">
            Trusted by Discerning Clients
          </h2>
          <p className="text-[15px] text-[#5A605B] mt-2 font-normal">
            Verified feedback from homeowners, long-term tenants, and property investors across India.
          </p>
        </div>

        {/* Testimonials 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E5E0D8] rounded-[8px] p-7 sm:p-8 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-[#C5A880] mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#C5A880" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[14px] text-[#1A1C1A] leading-relaxed mb-6 font-normal">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & Verification Meta */}
              <div className="pt-5 border-t border-[#E5E0D8] flex items-center gap-3.5">
                <img
                  src={item.photo}
                  alt={item.author}
                  className="w-11 h-11 rounded-[6px] object-cover border border-[#E5E0D8]"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-[15px] font-bold text-[#1A1C1A] font-heading leading-tight">
                    {item.author}
                  </h4>
                  <p className="text-[12px] text-[#5A605B] mt-0.5">
                    {item.role} · {item.location}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-[4px] bg-[#E8EFE8] text-[#0E2A1E] text-[10.5px] font-semibold">
                    ✓ {item.transaction}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
