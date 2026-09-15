import { ShieldCheck, Award, FileCheck2, Scale, Users } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export default function AboutPage() {
  const { navigate } = useRouter();

  const auditSteps = [
    {
      title: 'Title & Ownership Chain Audit',
      description: 'Independent verification of 30-year historical title deeds, municipal sanctions, revenue records, and encumbrance certificates.',
    },
    {
      title: 'Physical Survey & Architectural Verification',
      description: 'On-site technical evaluation of carpet area, ceiling height, structural integrity, and verified floor plan accuracy.',
    },
    {
      title: 'Zoning & Master Plan Clearance',
      description: 'Confirmation that the parcel adheres strictly to local urban planning guidelines, environmental buffers, and permissible land use.',
    },
    {
      title: 'Fiduciary Advisor Assignment',
      description: 'Exclusive pairing with vetted, RERA-licensed property advisors bound by strict non-conflict confidentiality agreements.',
    },
  ];

  const leaders = [
    {
      name: 'Aditya Vardhan',
      role: 'Founder & Managing Director',
      bio: 'Former Senior Partner in infrastructure and real estate private equity with 22 years of market leadership across South Asia.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Nandita Krishnamurthy',
      role: 'Head of Legal & Title Audits',
      bio: 'Advocate with 18+ years specializing in complex land acquisitions, RERA compliance, and multi-state property jurisprudence.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Farhan Contractor',
      role: 'Chief of Architectural Curation',
      bio: 'Award-winning architect and sustainable building consultant advising on landmark residential developments.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5] min-h-screen">
      <div className="container-luxury">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-[12px] text-[#5E6961] mb-2">
            <button onClick={() => navigate('/')} className="hover:text-[#0E2A1E]">Home</button>
            <span>/</span>
            <span className="text-[#0E2A1E] font-medium">About SecureStay</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={18} className="text-[#0E2A1E]" />
            <span className="eyebrow-forest">Integrity First</span>
          </div>
          <h1 className="text-[36px] md:text-[46px] font-extrabold text-[#1F2421] font-heading leading-tight mb-4">
            A Better Standard for Real Estate Decisions
          </h1>
          <p className="text-[16px] text-[#5E6961] leading-relaxed">
            SecureStay was founded on a simple principle: high-value property decisions should be anchored in verified truth, independent legal scrutiny, and disciplined advisory—free from hyperbole and undisclosed broker conflicts.
          </p>
        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-8 shadow-sm">
            <div className="w-12 h-12 rounded-[8px] bg-[#E8EFE8] text-[#0E2A1E] flex items-center justify-center mb-6">
              <FileCheck2 size={24} />
            </div>
            <h3 className="text-[19px] font-bold text-[#1F2421] font-heading mb-2">
              Zero Unverified Listings
            </h3>
            <p className="text-[13.5px] text-[#5E6961] leading-relaxed">
              We reject over 40% of submitted properties during legal due diligence. Only assets with unblemished titles and verifiable specifications appear on SecureStay.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-8 shadow-sm">
            <div className="w-12 h-12 rounded-[8px] bg-[#E8EFE8] text-[#0E2A1E] flex items-center justify-center mb-6">
              <Scale size={24} />
            </div>
            <h3 className="text-[19px] font-bold text-[#1F2421] font-heading mb-2">
              Fiduciary Responsibility
            </h3>
            <p className="text-[13.5px] text-[#5E6961] leading-relaxed">
              Our property advisors are bound by fiduciary codes of conduct. We provide comprehensive disclosures regarding neighborhood zoning and resale history.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-8 shadow-sm">
            <div className="w-12 h-12 rounded-[8px] bg-[#E8EFE8] text-[#0E2A1E] flex items-center justify-center mb-6">
              <Award size={24} />
            </div>
            <h3 className="text-[19px] font-bold text-[#1F2421] font-heading mb-2">
              Architectural Merit
            </h3>
            <p className="text-[13.5px] text-[#5E6961] leading-relaxed">
              Beyond legal clarity, we curate residences that exemplify timeless architectural proportions, enduring materials, and environmental consciousness.
            </p>
          </div>
        </div>

        {/* Verification Protocol Breakdown */}
        <div className="bg-[#0E2A1E] text-[#FAF8F5] rounded-[8px] p-8 md:p-14 mb-20 border border-[#163A29]">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow text-[#C5A880] mb-2">Auditing Methodology</span>
            <h2 className="text-[28px] md:text-[36px] font-extrabold font-heading text-[#FAF8F5]">
              The 24-Point SecureStay Verification Protocol
            </h2>
            <p className="text-[14px] text-[#D2DFD2] mt-2">
              Before any property is marked "Verified", our internal legal team and chartered surveyors execute four mandatory audit stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {auditSteps.map((step, idx) => (
              <div key={idx} className="bg-[#071710]/70 border border-white/10 p-6 rounded-[8px]">
                <span className="text-[12px] font-bold text-[#C5A880] tracking-wider uppercase mb-1 block">
                  Stage 0{idx + 1}
                </span>
                <h3 className="text-[17px] font-bold text-[#FAF8F5] mb-2 font-heading">
                  {step.title}
                </h3>
                <p className="text-[13px] text-[#D2DFD2] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Leadership */}
        <div className="mb-20">
          <div className="mb-10 text-center max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users size={16} className="text-[#0E2A1E]" />
              <span className="eyebrow-forest">Leadership</span>
            </div>
            <h2 className="section-title text-[#1F2421]">
              Governed by Experience
            </h2>
            <p className="section-subtitle mx-auto mt-2">
              Guided by senior practitioners from real estate law, urban architecture, and institutional finance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaders.map((leader) => (
              <div key={leader.name} className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] overflow-hidden shadow-sm">
                <img src={leader.image} alt={leader.name} className="w-full aspect-[4/3] object-cover" />
                <div className="p-6">
                  <h3 className="text-[18px] font-bold text-[#1F2421] font-heading">{leader.name}</h3>
                  <p className="text-[12px] font-semibold text-[#0E2A1E] uppercase tracking-wider mb-3">
                    {leader.role}
                  </p>
                  <p className="text-[13px] text-[#5E6961] leading-relaxed">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#F3EFEA] border border-[#E5E0D8] rounded-[8px] p-10 text-center">
          <h3 className="text-[22px] font-bold text-[#1F2421] font-heading mb-2">
            Experience the SecureStay Advantage
          </h3>
          <p className="text-[14px] text-[#5E6961] max-w-md mx-auto mb-6">
            Explore verified residences or schedule a private consultation with our Senior Advisory Desk.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => navigate('/search')} className="btn-forest text-[13.5px] py-3 px-6 rounded-[8px]">
              Explore Properties
            </button>
            <button onClick={() => navigate('/contact')} className="btn-outline-forest text-[13.5px] py-3 px-6 rounded-[8px]">
              Contact Advisory Desk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
