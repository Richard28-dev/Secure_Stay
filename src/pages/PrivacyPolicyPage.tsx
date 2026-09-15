import { ShieldCheck } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export default function PrivacyPolicyPage() {
  const { navigate } = useRouter();

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5] min-h-screen">
      <div className="container-luxury max-w-3xl">
        <div className="mb-8 border-b border-[#E5E0D8] pb-6">
          <div className="flex items-center gap-2 text-[12px] text-[#5E6961] mb-2">
            <button onClick={() => navigate('/')} className="hover:text-[#0E2A1E]">Home</button>
            <span>/</span>
            <span className="text-[#0E2A1E] font-medium">Privacy Policy</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={18} className="text-[#0E2A1E]" />
            <span className="eyebrow-forest">Legal Disclosures</span>
          </div>
          <h1 className="text-[32px] md:text-[38px] font-extrabold text-[#1F2421] font-heading leading-tight">
            Privacy Policy & Data Security
          </h1>
          <p className="text-[13px] text-[#5E6961] mt-1">
            Last updated: January 2026 · Adherence to Digital Personal Data Protection Act (DPDP) & RERA Standards
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-8 shadow-sm space-y-8 text-[14px] text-[#1F2421] leading-relaxed">
          <section>
            <h2 className="text-[18px] font-bold font-heading text-[#0E2A1E] mb-2">
              1. Our Data Commitment
            </h2>
            <p>
              SecureStay Real Estate Advisory ("SecureStay", "we", "our") operates a verified property network where user privacy, transaction confidentiality, and title integrity are paramount. We do not sell, rent, or lease your personal information, phone numbers, or investment budgets to external lead generation syndicates.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold font-heading text-[#0E2A1E] mb-2">
              2. Information Collected
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-[#5E6961]">
              <li><strong>Contact Identification:</strong> Full name, verified email address, phone number, and account credentials.</li>
              <li><strong>Advisory Preferences:</strong> Search filters, property watchlist items, preferred city enclaves, and budget ranges.</li>
              <li><strong>Listing Documentation (Owners & Agents):</strong> Property deeds, title chain records, municipal sanction plans, and occupancy certificates provided for verification audits.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-bold font-heading text-[#0E2A1E] mb-2">
              3. Purpose of Processing
            </h2>
            <p>
              Your information is utilized solely to facilitate scheduled property viewings, coordinate verified title inspections, maintain your saved watchlist, and deliver advisory communications.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold font-heading text-[#0E2A1E] mb-2">
              4. Data Retention & Deletion
            </h2>
            <p>
              You retain the right to request deletion of your account and associated enquiry logs at any time by contacting <span className="text-[#0E2A1E] font-semibold">privacy@securestay.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
