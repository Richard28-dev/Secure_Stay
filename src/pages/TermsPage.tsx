import { ShieldCheck } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export default function TermsPage() {
  const { navigate } = useRouter();

  return (
    <div className="pt-24 pb-20 bg-[#FAF8F5] min-h-screen">
      <div className="container-luxury max-w-3xl">
        <div className="mb-8 border-b border-[#E5E0D8] pb-6">
          <div className="flex items-center gap-2 text-[12px] text-[#5E6961] mb-2">
            <button onClick={() => navigate('/')} className="hover:text-[#0E2A1E]">Home</button>
            <span>/</span>
            <span className="text-[#0E2A1E] font-medium">Terms of Service</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={18} className="text-[#0E2A1E]" />
            <span className="eyebrow-forest">Platform Agreement</span>
          </div>
          <h1 className="text-[32px] md:text-[38px] font-extrabold text-[#1F2421] font-heading leading-tight">
            Terms & Conditions
          </h1>
          <p className="text-[13px] text-[#5E6961] mt-1">
            Last modified: January 2026
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-8 shadow-sm space-y-8 text-[14px] text-[#1F2421] leading-relaxed">
          <section>
            <h2 className="text-[18px] font-bold font-heading text-[#0E2A1E] mb-2">
              1. Platform Purpose & Verification Protocol
            </h2>
            <p>
              SecureStay provides a curated real estate information network. While SecureStay executes rigorous legal and structural checks prior to assigning "Verified" status, buyers and tenants are advised to review final closing contracts with independent legal counsel.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold font-heading text-[#0E2A1E] mb-2">
              2. Listing Obligations for Owners and Advisors
            </h2>
            <p>
              All property submitters warrant that they possess legal ownership or an authorized brokerage mandate. Submitting misleading specifications, unpermitted structures, or inaccurate carpet area measurements will result in immediate delisting and account termination.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-bold font-heading text-[#0E2A1E] mb-2">
              3. Intellectual Property
            </h2>
            <p>
              All architectural photography, curated layouts, and editorial copy are the intellectual property of SecureStay Real Estate Advisory.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
