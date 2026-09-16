import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, UserCheck, Briefcase, KeyRound, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../context/RouterContext';
import { useProperties } from '../context/PropertyContext';

export default function SignInPage() {
  const { signIn, socialSignIn, demoLogin } = useAuth();
  const { navigate } = useRouter();
  const { showToast } = useProperties();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'buyer' | 'agent'>('buyer');
  const [isLoading, setIsLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    if (!password || password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password, role);
      showToast(`Welcome back, signed in as ${role === 'buyer' ? 'Client' : 'Agent Advisor'}`, 'success');
      navigate(role === 'agent' ? '/agent-dashboard' : '/dashboard');
    } catch (err: any) {
      showToast(err.message || 'Authentication failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    try {
      const demoEmail = provider === 'google' ? 'google.user@securestay.com' : 'facebook.user@securestay.com';
      const demoName = provider === 'google' ? 'Google Client' : 'Facebook Client';
      await socialSignIn(provider, demoEmail, demoName);
      showToast(`Signed in via ${provider === 'google' ? 'Google' : 'Facebook'} authentication`, 'success');
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = (selectedRole: 'buyer' | 'agent') => {
    demoLogin(selectedRole);
    showToast(`Signed in with Demo ${selectedRole === 'buyer' ? 'Client' : 'Agent'} Account`, 'success');
    navigate(selectedRole === 'agent' ? '/agent-dashboard' : '/dashboard');
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail || !resetEmail.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setResetSent(true);
    showToast('Password reset link sent to your email address', 'success');
  };

  return (
    <div className="pt-28 pb-20 bg-[#FDFBF7] min-h-screen flex items-center justify-center">
      <div className="container-luxury max-w-md w-full">
        {/* Sign In Card */}
        <div className="bg-white border border-[#E5DFD5] rounded-[8px] p-8 shadow-md">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <div
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 cursor-pointer mb-3"
            >
              <div className="w-8 h-8 rounded-[8px] bg-[#0A2A1D] flex items-center justify-center text-[#C5A880]">
                <ShieldCheck size={18} strokeWidth={2.2} />
              </div>
              <span className="text-[20px] font-bold tracking-tight text-[#0A2A1D] font-heading">
                SecureStay <span className="text-[#C5A880] font-normal text-[16px]">Real Estates</span>
              </span>
            </div>
            <h1 className="text-[22px] font-bold text-[#1A1E1C] font-heading">
              Sign In to Your Account
            </h1>
            <p className="text-[13px] text-[#57605B] mt-1">
              Access your verified residences, enquiries, and viewing appointments.
            </p>
          </div>

          {/* Social Logins */}
          <div className="space-y-2.5 mb-6">
            <button
              type="button"
              onClick={() => handleSocialAuth('google')}
              className="w-full py-2.5 px-4 rounded-[6px] border border-[#E5DFD5] hover:border-[#0A2A1D] bg-[#FDFBF7] hover:bg-white text-[13px] font-semibold text-[#1A1E1C] flex items-center justify-center gap-3 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialAuth('facebook')}
              className="w-full py-2.5 px-4 rounded-[6px] border border-[#E5DFD5] hover:border-[#0A2A1D] bg-[#FDFBF7] hover:bg-white text-[13px] font-semibold text-[#1A1E1C] flex items-center justify-center gap-3 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Continue with Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-[#E5DFD5] w-full" />
            <span className="bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-[#57605B] absolute">
              or email sign in
            </span>
          </div>

          {/* Standard Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#1A1E1C] mb-1">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('buyer')}
                  className={`py-2 rounded-[6px] text-[12.5px] font-medium border text-center transition-all cursor-pointer ${
                    role === 'buyer'
                      ? 'bg-[#0A2A1D] text-[#FDFBF7] border-[#0A2A1D]'
                      : 'bg-[#FDFBF7] text-[#57605B] border-[#E5DFD5]'
                  }`}
                >
                  Buyer / Client
                </button>
                <button
                  type="button"
                  onClick={() => setRole('agent')}
                  className={`py-2 rounded-[6px] text-[12.5px] font-medium border text-center transition-all cursor-pointer ${
                    role === 'agent'
                      ? 'bg-[#0A2A1D] text-[#FDFBF7] border-[#0A2A1D]'
                      : 'bg-[#FDFBF7] text-[#57605B] border-[#E5DFD5]'
                  }`}
                >
                  Agent / Advisor
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#1A1E1C] mb-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail size={15} className="absolute left-3 text-[#57605B]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-[6px] border border-[#E5DFD5] bg-[#FDFBF7] text-[13px] text-[#1A1E1C] focus:outline-none focus:border-[#0A2A1D]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[12px] font-semibold text-[#1A1E1C]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setResetSent(false);
                    setForgotModalOpen(true);
                  }}
                  className="text-[11.5px] font-medium text-[#0A2A1D] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative flex items-center">
                <Lock size={15} className="absolute left-3 text-[#57605B]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-[6px] border border-[#E5DFD5] bg-[#FDFBF7] text-[13px] text-[#1A1E1C] focus:outline-none focus:border-[#0A2A1D]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-forest w-full py-3 text-[13.5px] rounded-[8px] flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-2"
            >
              <span>Sign In</span>
              <ArrowRight size={15} />
            </button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="mt-6 pt-4 border-t border-[#E5DFD5]">
            <span className="text-[11px] font-bold text-[#57605B] uppercase tracking-wider block mb-2 text-center">
              Quick Test Credentials
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoSignIn('buyer')}
                className="px-2.5 py-1.5 rounded-[6px] bg-[#E4ECE7] hover:bg-[#d6e4db] text-[11.5px] font-semibold text-[#0A2A1D] flex items-center justify-center gap-1 cursor-pointer"
              >
                <UserCheck size={12} />
                <span>Buyer Demo</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoSignIn('agent')}
                className="px-2.5 py-1.5 rounded-[6px] bg-[#0A2A1D] hover:bg-[#133D2B] text-[11.5px] font-semibold text-[#FDFBF7] flex items-center justify-center gap-1 cursor-pointer"
              >
                <Briefcase size={12} className="text-[#C5A880]" />
                <span>Agent Demo</span>
              </button>
            </div>
          </div>

          {/* Bottom Link */}
          <div className="text-center pt-4 text-[12.5px] text-[#57605B]">
            <span>Don't have an account? </span>
            <button
              onClick={() => navigate('/signup')}
              className="text-[#0A2A1D] font-bold hover:underline cursor-pointer"
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Forgot Password Modal */}
        {forgotModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-[#E5DFD5] rounded-[8px] max-w-md w-full p-6 shadow-2xl animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5] mb-4">
                <div className="flex items-center gap-2">
                  <KeyRound size={18} className="text-[#0A2A1D]" />
                  <h3 className="text-[17px] font-bold text-[#1A1E1C] font-heading">Reset Password</h3>
                </div>
                <button
                  onClick={() => setForgotModalOpen(false)}
                  className="text-[#57605B] hover:text-[#1A1E1C] text-lg font-bold cursor-pointer"
                >
                  ×
                </button>
              </div>

              {resetSent ? (
                <div className="py-4 text-center space-y-3">
                  <CheckCircle size={36} className="text-[#0A2A1D] mx-auto" />
                  <p className="text-[14px] font-semibold text-[#1A1E1C]">Recovery Instructions Dispatched</p>
                  <p className="text-[12.5px] text-[#57605B]">
                    We've sent a verified password reset link to <span className="font-bold">{resetEmail}</span>.
                  </p>
                  <button
                    onClick={() => setForgotModalOpen(false)}
                    className="btn-forest text-[13px] py-2 px-6 rounded-[6px] mt-2"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <p className="text-[13px] text-[#57605B]">
                    Enter your registered account email and we'll send you a secure verification link to reset your credentials.
                  </p>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#1A1E1C] mb-1">
                      Registered Email
                    </label>
                    <input
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="e.g. name@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#E5DFD5] bg-[#FDFBF7] text-[13px] text-[#1A1E1C] focus:outline-none focus:border-[#0A2A1D]"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setForgotModalOpen(false)}
                      className="px-4 py-2 rounded-[6px] border border-[#E5DFD5] text-[13px] text-[#57605B] hover:bg-[#FDFBF7] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-forest text-[13px] py-2 px-5 rounded-[6px]"
                    >
                      Send Reset Link
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
