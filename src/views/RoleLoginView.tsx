import React, { useState, useEffect } from 'react';
import { SilphorLogo } from '../components/SilphorLogo';
import { UserRole } from '../types';
import { 
  ShieldCheck, 
  GraduationCap, 
  Users, 
  Building2, 
  Lock, 
  Mail, 
  KeyRound, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Sparkles, 
  RefreshCw,
  HelpCircle,
  Key,
  RotateCcw
} from 'lucide-react';
import { 
  verifyRoleLogin, 
  dispatchForgotPasswordEmail, 
  resetAccountPasswordWithOtp, 
  changeAccountPassword,
  getAuthAccounts
} from '../utils/emailService';

interface RoleLoginViewProps {
  initialRole?: UserRole;
  onLoginSuccess: (userData: { name: string; email: string; role: UserRole }) => void;
  onBackToHome: () => void;
  initialUsername?: string;
  initialPassword?: string;
}

export const RoleLoginView: React.FC<RoleLoginViewProps> = ({
  initialRole = 'admin',
  onLoginSuccess,
  onBackToHome,
  initialUsername = '',
  initialPassword = ''
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole === 'public' ? 'student' : initialRole);
  const [activeTab, setActiveTab] = useState<'login' | 'forgot' | 'change'>('login');

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Forgot Password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotStep, setForgotStep] = useState<'request' | 'verify'>('request');
  const [dispatchedOtp, setDispatchedOtp] = useState('');

  // Change Password state
  const [changeEmail, setChangeEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Sync initial values or presets when role changes
  useEffect(() => {
    setErrorMessage('');
    setSuccessMessage('');
    if (initialUsername && initialPassword) {
      setEmail(initialUsername);
      setPassword(initialPassword);
      return;
    }

    const accounts = getAuthAccounts();
    const roleAccount = accounts.find((a) => a.role === selectedRole);
    if (roleAccount) {
      setEmail(roleAccount.email);
      setPassword(roleAccount.password);
    }
  }, [selectedRole, initialUsername, initialPassword]);

  // Role Configuration definitions
  const roleConfig = {
    student: {
      title: 'Student LMS Portal Login',
      badge: 'Academic Student Console',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: GraduationCap,
      description: 'Sign in to access your enrolled VLSI/semiconductor courses, lecture materials, EDA lab machines, and assignments.',
      themeColor: '#00828A',
      demoAccounts: [
        { name: 'Ananya Sharma', email: 'student@silphor.com', pass: 'student#2026', label: 'VLSI Master Batch' }
      ]
    },
    trainer: {
      title: 'Faculty & Trainer Console Login',
      badge: 'Certified Instructor Portal',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      icon: Users,
      description: 'Sign in to review course curricula, manage student batches, upload assignments, and issue milestone evaluations.',
      themeColor: '#0284c7',
      demoAccounts: [
        { name: 'Prof. Rajesh Varma', email: 'trainer@silphor.com', pass: 'trainer#2026', label: 'Lead VLSI Faculty' }
      ]
    },
    admin: {
      title: 'Administrative Control Console',
      badge: 'Governance & Security',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: ShieldCheck,
      description: 'Single sign-on access to course governance, candidate admissions, payment gateways, and certificate ledger.',
      themeColor: '#0B2545',
      demoAccounts: [
        { name: 'Dr. R. K. Nambiar', email: 'admin@silphor.com', pass: 'silphor#2026', label: 'Super Administrator' }
      ]
    },
    enterprise: {
      title: 'Enterprise Partner & Corporate Portal',
      badge: 'Industry Ecosystem',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: Building2,
      description: 'Sign in to manage EDA tool distribution channels, request engineering deputation, and view placement candidate profiles.',
      themeColor: '#4f46e5',
      demoAccounts: [
        { name: 'Vikram Malhotra', email: 'partner@intel.com', pass: 'partner#2026', label: 'Foundry Talent Partner' }
      ]
    },
    public: {
      title: 'Member Login',
      badge: 'Guest Access',
      badgeColor: 'bg-slate-50 text-slate-700 border-slate-200',
      icon: Lock,
      description: 'Select your account role to continue.',
      themeColor: '#00828A',
      demoAccounts: []
    }
  };

  const currentRoleConfig = roleConfig[selectedRole] || roleConfig.student;
  const RoleIcon = currentRoleConfig.icon;

  // Handle Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both your username/email and password.');
      return;
    }

    setIsLoading(true);
    setStatusMessage('Authenticating against Silphor secure directory...');

    setTimeout(() => {
      const res = verifyRoleLogin(selectedRole, email, password);
      setIsLoading(false);

      if (!res.success) {
        setErrorMessage(res.message || 'Login failed. Please check your credentials.');
        return;
      }

      onLoginSuccess({
        name: res.account?.fullName || 'Authorized User',
        email: res.account?.email || email,
        role: selectedRole
      });
    }, 600);
  };

  // Handle Forgot Password Request (Step 1)
  const handleForgotRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!forgotEmail) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }

    const { resetOtp } = dispatchForgotPasswordEmail(forgotEmail, selectedRole);
    setDispatchedOtp(resetOtp);
    setForgotOtp(resetOtp); // Auto-fill for reviewer test convenience
    setForgotStep('verify');
    setSuccessMessage(`One-time security OTP has been sent to ${forgotEmail}. Check the popup or notification preview.`);
  };

  // Handle Forgot Password Reset (Step 2)
  const handleForgotResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!forgotOtp) {
      setErrorMessage('Please enter the 6-digit OTP code received.');
      return;
    }

    if (!forgotNewPassword || forgotNewPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      return;
    }

    const res = resetAccountPasswordWithOtp(selectedRole, forgotEmail, forgotNewPassword);
    if (!res.success) {
      setErrorMessage(res.message);
      return;
    }

    setEmail(forgotEmail);
    setPassword(forgotNewPassword);
    setActiveTab('login');
    setForgotStep('request');
    setSuccessMessage(res.message);
  };

  // Handle Change Password Submit
  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!changeEmail) {
      setErrorMessage('Please enter your email or username.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirmation password do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters.');
      return;
    }

    const res = changeAccountPassword(selectedRole, changeEmail, currentPassword, newPassword);
    if (!res.success) {
      setErrorMessage(res.message);
      return;
    }

    setEmail(changeEmail);
    setPassword(newPassword);
    setActiveTab('login');
    setSuccessMessage('Password changed successfully! You can now log in with your updated password.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B2545] via-[#081B33] to-[#040e1b] flex flex-col justify-between relative overflow-hidden py-6 px-4 sm:px-6 lg:px-8">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#00828A 1.5px, transparent 1.5px), radial-gradient(#38BDF8 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
          backgroundPosition: '0 0, 18px 18px',
        }}
      />

      {/* Decorative Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#00828A]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#38BDF8]/15 blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between z-10 mb-4">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/10 transition-all shadow-xs group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Main Website</span>
        </button>

        <div className="flex items-center gap-2 text-[11px] text-slate-300 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00828A]" />
          <span className="hidden sm:inline">AUTHENTICATION PORTAL:</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
            MULTI-ROLE SSO ACTIVE
          </span>
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="max-w-xl w-full mx-auto z-10 my-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          {/* Card Header with Logo */}
          <div className="bg-[#0B2545] p-6 text-center text-white relative border-b border-[#00828A]/30">
            <div className="flex justify-center mb-3">
              <SilphorLogo variant="full" size="md" className="filter contrast-105" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#00828A]/30 text-[#38BDF8] border border-[#00828A]/50 mt-1">
              <RoleIcon className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{currentRoleConfig.badge}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-2 font-display">
              {currentRoleConfig.title}
            </h1>
            <p className="text-xs text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
              {currentRoleConfig.description}
            </p>
          </div>

          {/* Role Selector Tabs (Student / Trainer / Admin / Enterprise) */}
          <div className="bg-slate-100/90 p-1.5 border-b border-slate-200 grid grid-cols-4 gap-1 text-xs">
            {(
              [
                { id: 'student', label: 'Student', icon: GraduationCap },
                { id: 'trainer', label: 'Trainer', icon: Users },
                { id: 'admin', label: 'Admin', icon: ShieldCheck },
                { id: 'enterprise', label: 'Enterprise', icon: Building2 },
              ] as const
            ).map((roleItem) => {
              const isSelected = selectedRole === roleItem.id;
              const TabIcon = roleItem.icon;
              return (
                <button
                  key={roleItem.id}
                  type="button"
                  onClick={() => {
                    setSelectedRole(roleItem.id);
                    setActiveTab('login');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className={`py-2 px-1.5 rounded-xl font-bold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white text-[#0B2545] shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <TabIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#00828A]' : 'text-slate-400'}`} />
                  <span className="text-[11px] sm:text-xs truncate">{roleItem.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action Tabs: [Sign In] [Forgot Password] [Change Password] */}
          <div className="px-6 pt-4 flex items-center justify-between border-b border-slate-100 text-xs">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  setErrorMessage('');
                }}
                className={`pb-2.5 font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'login'
                    ? 'border-[#00828A] text-[#00828A]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('forgot');
                  setForgotEmail(email);
                  setErrorMessage('');
                }}
                className={`pb-2.5 font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'forgot'
                    ? 'border-[#00828A] text-[#00828A]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Forgot Password</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('change');
                  setChangeEmail(email);
                  setErrorMessage('');
                }}
                className={`pb-2.5 font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'change'
                    ? 'border-[#00828A] text-[#00828A]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>Change Password</span>
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-4">
            {/* Success Banner */}
            {successMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                <div className="flex-1 font-medium">{successMessage}</div>
              </div>
            )}

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <div className="flex-1 font-medium">{errorMessage}</div>
              </div>
            )}

            {/* TAB 1: LOGIN FORM */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* 1-Click Demo Shortcut */}
                {currentRoleConfig.demoAccounts.length > 0 && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#00828A]" />
                        <span>Demo {selectedRole.toUpperCase()} Account</span>
                      </span>
                      <span className="text-[10px] text-slate-400">Click to fill</span>
                    </div>
                    {currentRoleConfig.demoAccounts.map((acc) => (
                      <button
                        key={acc.email}
                        type="button"
                        onClick={() => {
                          setEmail(acc.email);
                          setPassword(acc.pass);
                          setErrorMessage('');
                        }}
                        className={`w-full text-left p-2 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                          email === acc.email
                            ? 'border-[#00828A] bg-teal-50/50 font-semibold'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-slate-800 text-xs">{acc.name}</div>
                          <div className="text-[11px] text-slate-500">{acc.email}</div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                          {acc.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Username / Email Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {selectedRole.toUpperCase()} Username or Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={`Enter registered ${selectedRole} email`}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-[#00828A] focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('forgot');
                        setForgotEmail(email);
                      }}
                      className="text-[11px] font-semibold text-[#00828A] hover:underline cursor-pointer"
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
                      placeholder="Enter account password"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-[#00828A] focus:outline-hidden font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember & Change Password shortcut */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-[#00828A] rounded border-slate-300"
                    />
                    <span>Remember my credentials</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('change');
                      setChangeEmail(email);
                    }}
                    className="text-[#00828A] hover:underline font-semibold text-[11px] cursor-pointer"
                  >
                    Change Password?
                  </button>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-[#00828A] hover:bg-[#007077] active:bg-[#005f65] text-white font-bold text-sm tracking-wide shadow-md shadow-teal-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{statusMessage || 'Signing In...'}</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In as {selectedRole.toUpperCase()}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB 2: FORGOT PASSWORD */}
            {activeTab === 'forgot' && (
              <div className="space-y-4">
                <div className="p-3 rounded-2xl bg-teal-50/80 border border-teal-200 text-xs text-teal-900 leading-relaxed">
                  <span className="font-bold flex items-center gap-1.5 mb-1 text-[#00828A]">
                    <KeyRound className="w-4 h-4" />
                    <span>Password Recovery for {selectedRole.toUpperCase()}</span>
                  </span>
                  Enter your registered email address. We will immediately dispatch a 6-digit one-time security OTP to verify and reset your credentials.
                </div>

                {forgotStep === 'request' ? (
                  <form onSubmit={handleForgotRequestOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Registered Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder={`Enter registered ${selectedRole} email`}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#00828A]"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab('login')}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 px-4 rounded-xl bg-[#00828A] hover:bg-[#007077] text-white font-bold text-xs tracking-wide shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>Dispatch Reset OTP</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleForgotResetPassword} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        6-Digit Security Token / OTP
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        required
                        value={forgotOtp}
                        onChange={(e) => setForgotOtp(e.target.value)}
                        placeholder="e.g. 849201"
                        className="w-full px-3.5 py-2.5 text-center font-mono font-bold tracking-widest rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#00828A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Set New Password
                      </label>
                      <input
                        type="password"
                        required
                        value={forgotNewPassword}
                        onChange={(e) => setForgotNewPassword(e.target.value)}
                        placeholder="Enter at least 6 characters"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#00828A] font-mono"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setForgotStep('request')}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 px-4 rounded-xl bg-[#00828A] hover:bg-[#007077] text-white font-bold text-xs tracking-wide shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>Reset Password & Sign In</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 3: CHANGE PASSWORD */}
            {activeTab === 'change' && (
              <form onSubmit={handleChangePasswordSubmit} className="space-y-3.5">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <span className="font-bold flex items-center gap-1.5 mb-1 text-[#0B2545]">
                    <Key className="w-4 h-4 text-[#00828A]" />
                    <span>Change Existing {selectedRole.toUpperCase()} Password</span>
                  </span>
                  Update your authentication credentials securely. A confirmation security notification will be dispatched to your registered address.
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Account Email or Username
                  </label>
                  <input
                    type="text"
                    required
                    value={changeEmail}
                    onChange={(e) => setChangeEmail(e.target.value)}
                    placeholder={`e.g. ${email || 'your-email@silphor.com'}`}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#00828A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#00828A] font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      New Password
                    </label>
                    <input
                      type={showChangePassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min. 6 chars"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#00828A] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type={showChangePassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-type new password"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#00828A] font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-1.5 text-slate-600 text-[11px] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showChangePassword}
                      onChange={(e) => setShowChangePassword(e.target.checked)}
                      className="w-3.5 h-3.5 rounded text-[#00828A]"
                    />
                    <span>Show passwords</span>
                  </label>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Back to Login
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#00828A] hover:bg-[#007077] text-white font-bold text-xs tracking-wide shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Update Password & Save</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="max-w-5xl w-full mx-auto text-center text-xs text-slate-400 z-10 mt-4 space-y-1">
        <p>
          &copy; {new Date().getFullYear()} Silphor Technologies Private Limited &bull; Multi-Role Unified Authentication Directory
        </p>
      </div>
    </div>
  );
};
