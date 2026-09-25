import React, { useState } from 'react';
import { SilphorLogo } from './SilphorLogo';
import { MainNavId, UserRole } from '../types';
import { DYNAMIC_NAV_CONFIG } from '../data/mockDatabase';
import { 
  ChevronDown, 
  Menu as MenuIcon, 
  X, 
  ShieldCheck, 
  Code2, 
  Search, 
  Award,
  Sparkles,
  UserCheck,
  Lock,
  LogOut
} from 'lucide-react';

interface NavbarProps {
  activeTab: MainNavId | 'admin-panel' | 'admin-login' | 'registration';
  setActiveTab: (tab: any) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  adminSession?: { name: string; email: string; role: string } | null;
  onAdminLoginClick: () => void;
  onAdminLogout: () => void;
  onOpenGuide: () => void;
  onOpenCertificateModal: () => void;
  onStartRegistration: (courseId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activeRole,
  setActiveRole,
  adminSession = null,
  onAdminLoginClick,
  onAdminLogout,
  onOpenGuide,
  onOpenCertificateModal,
  onStartRegistration,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  // Dynamic menu filtering based on role
  const visibleMenuItems = DYNAMIC_NAV_CONFIG.filter((item) =>
    item.allowedRoles.includes(activeRole)
  );

  const roleLabels: Record<UserRole, { label: string; color: string }> = {
    public: { label: 'Visitor (Public)', color: 'text-slate-600 bg-slate-100' },
    student: { label: 'Student Portal', color: 'text-sky-700 bg-sky-50 border-sky-200' },
    trainer: { label: 'Trainer / Faculty', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    admin: { label: 'Admin Console', color: 'text-rose-700 bg-rose-50 border-rose-200' },
    enterprise: { label: 'Enterprise Client', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Notification / Role Switcher Strip */}
      <div className="bg-[#0B2545] text-white text-xs py-1.5 px-4 md:px-8 border-b border-[#00828A]/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Tagline & Direct Helpline */}
          <div className="flex items-center flex-wrap gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#00828A] animate-pulse" />
            <span className="font-semibold tracking-wider text-slate-200">SILPHOR GLOBAL BRIDGE:</span>
            <span className="hidden md:inline text-slate-300">
              Connecting Technology Vendors with Semiconductor & VLSI Industries
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <a
              href="tel:+919876543210"
              className="text-emerald-400 font-mono font-bold hover:underline flex items-center gap-1"
            >
              <span>Direct: +91 9876543210</span>
            </a>
          </div>

          {/* Right: Quick actions & Dynamic Integration Guide button */}
          <div className="flex items-center gap-3">
            {/* Guide Button with prominent teal styling */}
            <button
              onClick={onOpenGuide}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#00828A] hover:bg-[#009688] text-white text-[11px] font-bold tracking-wide transition-all shadow-xs cursor-pointer"
              title="Click to view how Dynamic Menu integrates with backend requirements"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Menu & Backend Guide</span>
            </button>

            {/* Quick Certificate Verification */}
            <button
              onClick={onOpenCertificateModal}
              className="hidden lg:flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Verify Credential</span>
            </button>

            {/* Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-[11px] border border-slate-700 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3 h-3 text-[#00828A]" />
                <span className="text-slate-300">Role:</span>
                <span className="font-bold text-white capitalize">{activeRole}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div
                  className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-slate-800"
                  onMouseLeave={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-3 py-1 border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Simulate User Persona
                  </div>
                  {(['public', 'student', 'trainer', 'admin', 'enterprise'] as UserRole[]).map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setActiveRole(role);
                        setRoleDropdownOpen(false);
                        if (role === 'admin') setActiveTab('admin-panel');
                        else if (role === 'student') setActiveTab('students');
                        else if (role === 'trainer') setActiveTab('training');
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                        activeRole === role ? 'font-bold text-[#00828A] bg-teal-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span className="capitalize">{role}</span>
                      {activeRole === role && <span className="w-1.5 h-1.5 rounded-full bg-[#00828A]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main 1-Row Top Bar (Matching image.png exactly) */}
      <div className="w-full max-w-[1600px] mx-auto px-2 sm:px-4 xl:px-4 2xl:px-8">
        <div className="flex items-center justify-between h-20 gap-1.5 xl:gap-2">
          {/* Zone 1: Authentic Silphor Logo */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center focus:outline-hidden text-left shrink-0 cursor-pointer pr-1"
          >
            <SilphorLogo variant="horizontal" size="sm" className="hidden sm:inline-flex 2xl:hidden" />
            <SilphorLogo variant="horizontal" size="md" className="hidden 2xl:inline-flex" />
            <SilphorLogo variant="horizontal" size="xs" className="inline-flex sm:hidden" />
          </button>

          {/* Zone 2: Navigation Links (Matching screenshot in image.png) */}
          <nav className="hidden xl:flex items-center gap-0.5 xl:gap-0.5 2xl:gap-1.5">
            {visibleMenuItems.map((item) => {
              const isActive = activeTab === item.id;
              const hasDropdown = item.subItems && item.subItems.length > 0;

              return (
                <div
                  key={item.id}
                  className="relative group shrink-0"
                  onMouseEnter={() => hasDropdown && setOpenDropdown(item.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setOpenDropdown(null);
                    }}
                    className={`relative flex items-center gap-1 px-1.5 xl:px-1.5 2xl:px-2.5 py-1.5 text-[12px] xl:text-[12.5px] 2xl:text-[13px] font-semibold tracking-tight transition-all rounded-md whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'text-[#00828A] font-bold'
                        : 'text-slate-700 hover:text-[#0B2545] hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] 2xl:text-[10px] px-1.5 py-0.5 rounded-full bg-[#E0F7F6] text-[#00828A] border border-[#76DCD8] font-bold leading-none">
                        {item.badge}
                      </span>
                    )}
                    {hasDropdown && (
                      <ChevronDown className="w-3 h-3 2xl:w-3.5 2xl:h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform group-hover:rotate-180" />
                    )}

                    {/* Exact rounded active underline matching image.png */}
                    {isActive && (
                      <span className="absolute -bottom-2 left-1.5 right-1.5 h-[2.5px] bg-[#00828A] rounded-full shadow-2xs" />
                    )}
                  </button>

                  {/* Dynamic Submenu Dropdown */}
                  {hasDropdown && openDropdown === item.id && (
                    <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="text-[10px] font-bold text-slate-400 uppercase px-3 py-1 tracking-wider border-b border-slate-100">
                        {item.label} Modules
                      </div>
                      <div className="py-1">
                        {item.subItems?.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              setActiveTab(item.id);
                              setOpenDropdown(null);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors group/sub cursor-pointer"
                          >
                            <div className="text-xs font-semibold text-slate-800 group-hover/sub:text-[#00828A]">
                              {sub.label}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1">
                              {sub.description}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (Apply & Register + Admin Login) */}
          <div className="hidden xl:flex items-center gap-1.5 2xl:gap-2.5 shrink-0 pl-1">
            {adminSession || activeRole === 'admin' ? (
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setActiveTab('admin-panel')}
                  className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                    activeTab === 'admin-panel'
                      ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-sm'
                      : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00828A]" />
                  <span>Admin Console</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </button>
                <button
                  onClick={onAdminLogout}
                  title="Sign Out of Admin Console"
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-slate-200 transition-colors cursor-pointer shrink-0"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 2xl:gap-2 shrink-0">
                <button
                  onClick={() => onStartRegistration()}
                  className="px-3 2xl:px-4 py-2 text-xs font-bold text-white bg-[#00828A] hover:bg-[#007077] rounded-xl transition-all shadow-sm shadow-teal-500/20 whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Apply & Register</span>
                </button>

                <button
                  onClick={onAdminLoginClick}
                  className={`px-3 2xl:px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 min-w-fit ${
                    activeTab === 'admin-login'
                      ? 'bg-[#0B2545] text-white border-[#0B2545]'
                      : 'text-slate-700 hover:text-[#0B2545] bg-slate-50 hover:bg-slate-100 border-slate-200 shadow-2xs'
                  }`}
                  title="Administrative Single Sign-On"
                >
                  <Lock className="w-3.5 h-3.5 text-[#00828A] shrink-0" />
                  <span className="whitespace-nowrap">Admin Login</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => onStartRegistration()}
              className="px-2.5 py-1.5 text-xs font-bold text-white bg-[#00828A] rounded-lg"
            >
              Register
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 max-h-[80vh] overflow-y-auto">
          {/* Admin Login / Console prominent in mobile */}
          {adminSession || activeRole === 'admin' ? (
            <div className="p-3 bg-slate-900 rounded-xl text-white space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" /> Admin Console Active
                </span>
                <span className="text-[10px] text-slate-400">{adminSession?.email || 'admin@silphor.com'}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setActiveTab('admin-panel');
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-1.5 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-lg text-center"
                >
                  Open Operations Room
                </button>
                <button
                  onClick={() => {
                    onAdminLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                onAdminLoginClick();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xs hover:bg-slate-800 transition-colors"
            >
              <Lock className="w-4 h-4 text-[#38BDF8]" />
              <span>Admin Panel Login (Staff / Faculty)</span>
            </button>
          )}

          {/* Guide CTA on mobile */}
          <button
            onClick={() => {
              onOpenGuide();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[#0B2545] text-white text-xs font-bold"
          >
            <Code2 className="w-4 h-4 text-[#38BDF8]" />
            Dynamic Menu & Backend Integration Guide
          </button>

          {/* Mobile Links */}
          <div className="space-y-1 pt-2">
            {visibleMenuItems.map((item) => (
              <div key={item.id} className="border-b border-slate-100 pb-1">
                <button
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm font-semibold rounded-lg flex items-center justify-between ${
                    activeTab === item.id
                      ? 'text-[#00828A] bg-teal-50 font-bold'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-[#00828A]">
                      {item.badge}
                    </span>
                  )}
                </button>
                {item.subItems && (
                  <div className="pl-6 pr-2 py-1 space-y-1">
                    {item.subItems.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left text-xs text-slate-500 hover:text-[#00828A] py-1"
                      >
                        &bull; {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Secondary Mobile Actions */}
          <div className="pt-4 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:+919876543210"
                className="py-2.5 px-3 text-xs font-bold text-white bg-[#00828A] hover:bg-[#007077] rounded-xl flex items-center justify-center gap-1.5 text-center"
              >
                <span>📞 Call Helpline</span>
              </a>
              <a
                href="https://wa.me/919876543210?text=Hello%20Silphor%20Technologies,%20I%20would%20like%20to%20enquire%20about%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center justify-center gap-1.5 text-center"
              >
                <span>💬 WhatsApp</span>
              </a>
            </div>

            <button
              onClick={() => {
                onOpenCertificateModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4 text-[#00828A]" />
              Verify Certificate
            </button>
            <button
              onClick={() => {
                setActiveTab('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-xs font-semibold text-[#0B2545] border border-slate-300 rounded-xl text-center"
            >
              #45 East Road, Malleswaram, Bangalore
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
