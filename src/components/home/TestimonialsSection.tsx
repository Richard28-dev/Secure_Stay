import { Star, MessageSquare } from 'lucide-react';

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  transaction: string;
}

export default function TestimonialsSection() {
  const testimonials: TestimonialItem[] = [
    {
      id: 't1',
      quote:
        'SecureStay gave us confidence through what is usually an opaque process. The independent legal title check and physical inspection report prevented us from making an expensive mistake on an encumbered property in Whitefield.',
      author: 'Vikram & Priya Sundaram',
      role: 'Founders & Villa Buyers',
      location: 'Bengaluru',
      transaction: 'Acquired 4-BHK Villa',
    },
    {
      id: 't2',
      quote:
        'As an NRI relocating from Singapore, the ability to view certified floor plans, verify municipal clearances remotely, and work with a dedicated fiduciary advisor made our purchase seamless.',
      author: 'Rajiv Nambiar',
      role: 'Investment Director',
      location: 'Hyderabad',
      transaction: 'Purchased Penthouse Residence',
    },
    {
      id: 't3',
      quote:
        'No relentless cold calls or fake price quotes. Our advisor coordinated three private viewings within 48 hours, providing exact room dimensions and neighborhood zoning records before we arrived.',
      author: 'Dr. Ananya Roy',
      role: 'Chief Medical Specialist',
      location: 'Mumbai',
      transaction: 'Secured Bandra Seafront Home',
    },
  ];

  return (
    <section className="section-wrapper bg-[#F3EFEA] border-t border-[#E5E0D8]">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <MessageSquare size={16} className="text-[#0E2A1E]" />
            <span className="eyebrow-forest">Client Experiences</span>
          </div>
          <h2 className="section-title text-[#1F2421]">
            Trusted by Discerning Clients
          </h2>
          <p className="section-subtitle mt-2 mx-auto">
            Read verified feedback from property buyers, long-term tenants, and estate owners across India.
          </p>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-8 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-[#C5A880] mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#C5A880" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[14px] text-[#1F2421] leading-relaxed mb-6 font-light italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & Verification Meta */}
              <div className="pt-4 border-t border-[#E5E0D8]">
                <h4 className="text-[15px] font-bold text-[#1F2421] font-heading">
                  {item.author}
                </h4>
                <p className="text-[12px] text-[#5E6961]">
                  {item.role} · {item.location}
                </p>
                <span className="inline-block mt-1.5 px-2 py-0.5 rounded-[4px] bg-[#E8EFE8] text-[#0E2A1E] text-[10.5px] font-medium">
                  ✓ {item.transaction}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
