import { ShieldCheck, UserCheck, LockKeyhole, FileCheck, CheckCircle2 } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export default function WhySecureStay() {
  const { navigate } = useRouter();

  const trustPoints = [
    {
      icon: ShieldCheck,
      number: '01',
      title: 'Verified Listings',
      subtitle: 'Rigorous 4-Step Audit Before Publication',
      description:
        'Every listed property undergoes comprehensive physical inspection, government registry cross-checks, and ownership title verification. We reject listings with unclear encumbrances or false specifications.',
      checks: [
        'Physical site & architectural inspection',
        'Title deed & encumbrance certification',
        'Accurate floor area & layout confirmation',
      ],
    },
    {
      icon: UserCheck,
      number: '02',
      title: 'Trusted Professionals',
      subtitle: 'Licensed RERA Advisors & Fiduciary Conduct',
      description:
        'Work exclusively with vetted, licensed real estate advisors who adhere to strict codes of conduct. No pushy sales tactics, no undisclosed conflicts of interest—just disciplined, expert guidance.',
      checks: [
        'Verified RERA & professional licensing',
        'Transparent historical transaction records',
        'Dedicated advisory throughout closing',
      ],
    },
    {
      icon: LockKeyhole,
      number: '03',
      title: 'Secure Enquiries',
      subtitle: 'Private Direct Communication & Data Security',
      description:
        'Your contact details and financial intentions remain strictly confidential. Enquiries route directly to assigned property advisors without third-party brokers or relentless telemarketing spam.',
      checks: [
        'End-to-end encrypted lead routing',
        'Zero data resale or broker cold-calling',
        'Auditable viewing appointment records',
      ],
    },
  ];

  return (
    <section className="section-wrapper bg-[#FAF8F5] border-t border-[#E5E0D8]">
      <div className="container-luxury">
        {/* Editorial Heading */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 mb-2.5">
            <FileCheck size={16} className="text-[#0E2A1E]" />
            <span className="eyebrow-forest">The Trust Standard</span>
          </div>
          <h2 className="section-title text-[#1F2421]">
            Why SecureStay
          </h2>
          <p className="section-subtitle mt-3">
            Real estate decisions demand complete clarity. We built SecureStay to eliminate ambiguity, fake listings, and high-pressure broker networks.
          </p>
        </div>

        {/* 3 Concise Trust Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-8 shadow-sm flex flex-col justify-between hover:border-[#0E2A1E]/40 transition-colors"
              >
                <div>
                  {/* Top Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-[8px] bg-[#E8EFE8] text-[#0E2A1E] flex items-center justify-center">
                      <Icon size={24} strokeWidth={1.8} />
                    </div>
                    <span className="text-[15px] font-extrabold text-[#C5A880] font-heading tracking-wider">
                      {point.number}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-[20px] font-extrabold text-[#1F2421] font-heading mb-1.5">
                    {point.title}
                  </h3>
                  <p className="text-[12px] font-semibold text-[#C5A880] uppercase tracking-wider mb-4">
                    {point.subtitle}
                  </p>

                  {/* Body Copy */}
                  <p className="text-[13.5px] text-[#5E6961] leading-relaxed mb-6">
                    {point.description}
                  </p>
                </div>

                {/* Verification Checklist */}
                <div className="pt-4 border-t border-[#E5E0D8] space-y-2">
                  {point.checks.map((check) => (
                    <div key={check} className="flex items-center gap-2 text-[12.5px] text-[#1F2421] font-medium">
                      <CheckCircle2 size={14} className="text-[#0E2A1E] shrink-0" />
                      <span>{check}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Link */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/about')}
            className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#0E2A1E] hover:text-[#163A29] underline underline-offset-4 cursor-pointer"
          >
            Read our complete 24-point Verification Protocol →
          </button>
        </div>
      </div>
    </section>
  );
}
