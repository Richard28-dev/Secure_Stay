import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, UserCheck, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../context/RouterContext';
import { useProperties } from '../context/PropertyContext';

export default function SignInPage() {
  const { signIn, demoLogin } = useAuth();
  const { navigate } = useRouter();
  const { showToast } = useProperties();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'buyer' | 'agent'>('buyer');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setIsLoading(true);
    try {
      await signIn(email, password, role);
      showToast(`Welcome back, signed in as ${role === 'buyer' ? 'Client' : 'Agent Advisor'}`, 'success');
      navigate(role === 'agent' ? '/agent-dashboard' : '/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = (selectedRole: 'buyer' | 'agent') => {
    demoLogin(selectedRole);
    showToast(`Signed in with Demo ${selectedRole === 'buyer' ? 'Client' : 'Agent'} Account`, 'success');
    navigate(selectedRole === 'agent' ? '/agent-dashboard' : '/dashboard');
  };

  return (
    <div className="pt-28 pb-20 bg-[#FAF8F5] min-h-screen flex items-center justify-center">
      <div className="container-luxury max-w-md w-full">
        {/* Sign In Box */}
        <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[8px] p-8 shadow-md">
          {/* Brand Header */}
          <div className="text-center mb-8">
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
              Sign In to Your Account
            </h1>
            <p className="text-[13px] text-[#5E6961] mt-1">
              Access your saved residences, viewings, and property portfolios.
            </p>
          </div>

          {/* Quick Demo Login Switcher */}
          <div className="mb-6 p-3 rounded-[8px] bg-[#E8EFE8] border border-[#0E2A1E]/20">
            <span className="text-[11px] font-bold text-[#0E2A1E] uppercase tracking-wider block mb-2">
              One-Click Demo Access
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoSignIn('buyer')}
                className="px-3 py-1.5 rounded-[6px] bg-[#FFFFFF] hover:bg-[#FAF8F5] border border-[#E5E0D8] text-[12px] font-semibold text-[#1F2421] flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <UserCheck size={13} className="text-[#0E2A1E]" />
                <span>Demo Buyer</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoSignIn('agent')}
                className="px-3 py-1.5 rounded-[6px] bg-[#0E2A1E] hover:bg-[#163A29] text-[#FAF8F5] text-[12px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Briefcase size={13} className="text-[#C5A880]" />
                <span>Demo Agent</span>
              </button>
            </div>
          </div>

          {/* Standard Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#1F2421] mb-1">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('buyer')}
                  className={`py-2 rounded-[6px] text-[12.5px] font-medium border text-center transition-all cursor-pointer ${
                    role === 'buyer'
                      ? 'bg-[#0E2A1E] text-[#FAF8F5] border-[#0E2A1E]'
                      : 'bg-[#FAF8F5] text-[#5E6961] border-[#E5E0D8]'
                  }`}
                >
                  Buyer / Renter
                </button>
                <button
                  type="button"
                  onClick={() => setRole('agent')}
                  className={`py-2 rounded-[6px] text-[12.5px] font-medium border text-center transition-all cursor-pointer ${
                    role === 'agent'
                      ? 'bg-[#0E2A1E] text-[#FAF8F5] border-[#0E2A1E]'
                      : 'bg-[#FAF8F5] text-[#5E6961] border-[#E5E0D8]'
                  }`}
                >
                  Agent / Host
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#1F2421] mb-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail size={15} className="absolute left-3 text-[#5E6961]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13px] text-[#1F2421] focus:outline-none focus:border-[#0E2A1E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#1F2421] mb-1">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock size={15} className="absolute left-3 text-[#5E6961]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-[8px] border border-[#E5E0D8] bg-[#FAF8F5] text-[13px] text-[#1F2421] focus:outline-none focus:border-[#0E2A1E]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-forest w-full py-3 text-[13.5px] rounded-[8px] flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
            >
              <span>Sign In</span>
              <ArrowRight size={15} />
            </button>
          </form>

          {/* Bottom link to sign up */}
          <div className="text-center pt-6 mt-6 border-t border-[#E5E0D8] text-[12.5px] text-[#5E6961]">
            <span>Don't have an account? </span>
            <button
              onClick={() => navigate('/signup')}
              className="text-[#0E2A1E] font-bold hover:underline cursor-pointer"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
