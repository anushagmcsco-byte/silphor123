import React, { useState } from 'react';
import { SilphorLogo } from '../components/SilphorLogo';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  KeyRound, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ArrowLeft,
  Server,
  Fingerprint,
  Sparkles,
  Smartphone,
  RefreshCw
} from 'lucide-react';

interface AdminLoginViewProps {
  onLoginSuccess: (adminData: { name: string; email: string; role: string }) => void;
  onBackToHome: () => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({
  onLoginSuccess,
  onBackToHome,
}) => {
  const [email, setEmail] = useState('admin@silphor.com');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('849201');
  const [useOtp, setUseOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authStage, setAuthStage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Quick preset accounts
  const presetAccounts = [
    {
      role: 'Super Administrator',
      name: 'Dr. R. K. Nambiar',
      email: 'admin@silphor.com',
      password: 'silphor#2026',
      badge: 'Full Governance',
      color: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
      role: 'Academic Registrar',
      name: 'Sunil Rao',
      email: 'registrar@silphor.com',
      password: 'vlsi#admin',
      badge: 'Courses & Batches',
      color: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      role: 'Finance Controller',
      name: 'Pooja Sundaram',
      email: 'finance@silphor.com',
      password: 'finance#gateway',
      badge: 'Payments & Invoices',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ];

  const handleSelectPreset = (account: typeof presetAccounts[0]) => {
    setEmail(account.email);
    setPassword('');
    setErrorMessage('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both your administrative email and password.');
      return;
    }

    if (useOtp && (!otpCode || otpCode.length < 6)) {
      setErrorMessage('Please enter the 6-digit security token / OTP.');
      return;
    }

    const matched = presetAccounts.find((account) =>
      account.email.toLowerCase() === email.toLowerCase() && account.password === password
    );
    if (!matched) {
      setErrorMessage('Invalid administrative email or password.');
      return;
    }

    setIsLoading(true);
    setAuthStage('Verifying administrative credentials against directory...');

    setTimeout(() => {
      setAuthStage('Verifying cryptographic token & role permissions...');
      setTimeout(() => {
        setAuthStage('Establishing encrypted administrator session...');
        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess({
            name: matched.name,
            email: email,
            role: matched.role,
          });
        }, 500);
      }, 500);
    }, 600);
  };

  const handleGenerateNewOtp = () => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpCode(randomOtp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B2545] via-[#081B33] to-[#040e1b] flex flex-col justify-between relative overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
      {/* Background Circuit Grid Texture */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#00828A 1.5px, transparent 1.5px), radial-gradient(#38BDF8 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
          backgroundPosition: '0 0, 18px 18px',
        }}
      />

      {/* Decorative Glow Circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#00828A]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#38BDF8]/15 blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between z-10 mb-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/10 transition-all shadow-sm group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Main Website</span>
        </button>

        <div className="flex items-center gap-2 text-[11px] text-slate-300 font-mono">
          <Server className="w-3.5 h-3.5 text-[#00828A]" />
          <span className="hidden sm:inline">AUTH SERVER:</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
            ONLINE (256-BIT TLS)
          </span>
        </div>
      </div>

      {/* Center Authentication Card */}
      <div className="max-w-lg w-full mx-auto z-10">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100/90 overflow-hidden">
          {/* Card Header with Silphor Brand Identity */}
          <div className="bg-[#0B2545] p-6 sm:p-8 text-center text-white relative border-b border-[#00828A]/30">
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00828A]/30 text-[#38BDF8] border border-[#00828A]/50">
                <ShieldCheck className="w-3 h-3 text-[#38BDF8]" />
                ADMIN CONSOLE
              </span>
            </div>

            {/* Official Silphor Logo In Header */}
            <div className="flex justify-center mb-4">
              <SilphorLogo variant="full" size="md" className="filter contrast-105" />
            </div>

            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-3 font-display">
              Administrative Login Portal
            </h1>
            <p className="text-xs text-slate-300 max-w-sm mx-auto mt-1 leading-relaxed">
              Secure single sign-on access to course management, student registrations, payment audit, and certificate governance.
            </p>
          </div>

          {/* Card Body & Form */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Quick Demo Persona Shortcuts */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00828A]" />
                  <span>Admin Account Shortcuts:</span>
                </span>
                <span className="text-[10px] text-slate-400">Select email; enter password</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {presetAccounts.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => handleSelectPreset(acc)}
                    className={`text-left p-2 rounded-xl border text-xs transition-all hover:shadow-xs ${
                      email === acc.email
                        ? 'border-[#00828A] bg-teal-50/60 ring-2 ring-[#00828A]/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-slate-800 text-[11px] truncate">{acc.role}</div>
                    <div className="text-[10px] text-slate-500 truncate">{acc.email}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <div className="flex-1 font-medium">{errorMessage}</div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Email / Admin ID */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Administrative Email or User ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@silphor.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#00828A] focus:border-transparent transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(true)}
                    className="text-[11px] font-semibold text-[#00828A] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter administrative password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#00828A] focus:border-transparent transition-all placeholder:text-slate-400 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 2FA Option Toggle */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setUseOtp(!useOtp)}
                  className="flex items-center gap-2 text-xs text-slate-600 hover:text-[#00828A] transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#00828A]" />
                  <span>{useOtp ? '✓ Two-Factor Authentication (Active)' : '+ Enable 2FA Security Token (Optional)'}</span>
                </button>

                {useOtp && (
                  <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700">6-Digit Security Token / OTP</span>
                      <button
                        type="button"
                        onClick={handleGenerateNewOtp}
                        className="text-[11px] text-[#00828A] font-medium flex items-center gap-1 hover:underline"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Generate OTP</span>
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="849201"
                        className="w-full tracking-widest font-mono text-center py-2 rounded-lg border border-slate-300 text-sm font-bold text-slate-900 bg-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Remember me and Security Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#00828A] rounded border-slate-300 focus:ring-[#00828A]"
                  />
                  <span>Keep session active (30 Days)</span>
                </label>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <Fingerprint className="w-3.5 h-3.5 text-slate-400" />
                  <span>Biometric / SSO Ready</span>
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-[#00828A] hover:bg-[#007077] active:bg-[#005f65] text-white font-bold text-sm tracking-wide shadow-md shadow-teal-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{authStage || 'Authenticating...'}</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Admin Console</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Security Compliance Guarantee */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>ISO 27001 Certified System</span>
              </span>
              <span>Audit Logging Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-100 relative">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-[#00828A]" />
              <span>Administrative Credential Recovery</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enter your corporate email address associated with your Silphor administrative or faculty privileges. A secure one-time cryptographic reset token will be dispatched to your registered address.
            </p>

            {resetSent ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-2">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Reset instructions dispatched!</span>
                </div>
                <p>
                  Check your inbox at <strong>{resetEmail || email}</strong>. For urgent recovery, contact IT Security at <code>security@silphor.com</code>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForgotModalOpen(false);
                    setResetSent(false);
                  }}
                  className="mt-2 w-full py-2 bg-emerald-600 text-white font-bold rounded-lg text-xs"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Corporate Email Address
                  </label>
                  <input
                    type="email"
                    value={resetEmail || email}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="admin@silphor.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#00828A]"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setResetSent(true)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#00828A] hover:bg-[#007077]"
                  >
                    Dispatch Reset Token
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="max-w-7xl w-full mx-auto text-center text-xs text-slate-400 z-10 mt-6 space-y-1">
        <p>
          &copy; {new Date().getFullYear()} Silphor Technologies Private Limited. All rights reserved.
        </p>
        <p className="text-[11px] text-slate-500">
          Industrial Technology Solutions &bull; VLSI & Semiconductor Engineering Services &bull; Corporate Academic Governance
        </p>
      </div>
    </div>
  );
};
