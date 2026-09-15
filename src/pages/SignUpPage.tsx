import React, { useState } from 'react';
import { ShieldCheck, User, ArrowRight, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../context/RouterContext';
import { useProperties } from '../context/PropertyContext';
import type { UserRole } from '../types';

export default function SignUpPage() {
  const { signUp } = useAuth();
  const { navigate } = useRouter();
  const { showToast } = useProperties();

  const [role, setRole] = useState<UserRole>('buyer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !password) {
      showToast('Please fill all required account fields', 'error');
      return;
    }
    if (!agreeTerms) {
      showToast('Please agree to terms & conditions', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await signUp({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        role,
        agencyName: role === 'agent' ? agencyName.trim() : undefined,
      });
      showToast('Account created successfully. Email verification link generated.', 'success');
      navigate(role === 'agent' ? '/agent-dashboard' : '/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-[#FAF8F5] min-h-screen flex items-center justify-center">
      <div className="container-luxury max-w-md w-full">
        <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-8 shadow-md">
          {/* Header */}
          <div className="text-center mb-6">
            <div
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 cursor-pointer mb-3"
            >
              <div className="w-8 h-8 rounded-[8px] bg-[#C5A880] flex items-center justify-center text-[#071710]">
                <ShieldCheck size={18} strokeWidth={2.2} />
              </div>
              <span className="text-[20px] font-extrabold tracking-tight text-[#1F2421] font-heading">
                Secure<span className="text-[#0E2A1E]">Stay</span>
              </span>
            </div>
            <h1 className="text-[22px] font-bold text-[#1F2421] font-heading">
              Create Your Account
            </h1>
            <p className="text-[13px] text-[#5E6961] mt-1">
              Join India's most trustworthy verified property registry.
            </p>
          </div>

          {/* Role Choice */}
          <div className="mb-6">
            <label className="block text-[12px] font-semibold text-[#1F2421] mb-1.5">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('buyer')}
                className={`py-2.5 rounded-[6px] text-[12.5px] font-medium border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  role === 'buyer'
                    ? 'bg-[#0E2A1E] text-[#FAF8F5] border-[#0E2A1E] font-bold'
                    : 'bg-[#FAF8F5] text-[#5E6961] border-[#E5E0D8]'
                }`}
              >
                <User size={14} />
                <span>Buyer / Renter</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('agent')}
                className={`py-2.5 rounded-[6px] text-[12.5px] font-medium border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  role === 'agent'
                    ? 'bg-[#0E2A1E] text-[#FAF8F5] border-[#0E2A1E] font-bold'
                    : 'bg-[#FAF8F5] text-[#5E6961] border-[#E5E0D8]'
                }`}
              >
                <Briefcase size={14} />
                <span>Agent / Owner</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#1F2421] mb-1">
                Full Legal Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Siddharth Verma"
                className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13px] text-[#1F2421] focus:outline-none focus:border-[#0E2A1E]"
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
                placeholder="siddharth@domain.com"
                className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13px] text-[#1F2421] focus:outline-none focus:border-[#0E2A1E]"
              />
            </div>

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
                className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13px] text-[#1F2421] focus:outline-none focus:border-[#0E2A1E]"
              />
            </div>

            {role === 'agent' && (
              <div>
                <label className="block text-[12px] font-semibold text-[#1F2421] mb-1">
                  Advisory Agency or Host Firm
                </label>
                <input
                  type="text"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  placeholder="e.g. Prime Realty Advisory"
                  className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13px] text-[#1F2421] focus:outline-none focus:border-[#0E2A1E]"
                />
              </div>
            )}

            <div>
              <label className="block text-[12px] font-semibold text-[#1F2421] mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13px] text-[#1F2421] focus:outline-none focus:border-[#0E2A1E]"
              />
            </div>

            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#0E2A1E] rounded focus:ring-[#0E2A1E]"
                />
                <span className="text-[11.5px] text-[#5E6961]">
                  I agree to the SecureStay{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/terms')}
                    className="text-[#0E2A1E] font-semibold underline"
                  >
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/privacy')}
                    className="text-[#0E2A1E] font-semibold underline"
                  >
                    Privacy Policy
                  </button>
                  .
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-forest w-full py-3 text-[13.5px] rounded-[8px] flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
            >
              <span>Create Verified Account</span>
              <ArrowRight size={15} />
            </button>
          </form>

          <div className="text-center pt-6 mt-6 border-t border-[#E5E0D8] text-[12.5px] text-[#5E6961]">
            <span>Already registered? </span>
            <button
              onClick={() => navigate('/signin')}
              className="text-[#0E2A1E] font-bold hover:underline cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
