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
  UserCheck
} from 'lucide-react';

interface NavbarProps {
  activeTab: MainNavId | 'admin-panel' | 'registration';
  setActiveTab: (tab: any) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  onOpenGuide: () => void;
  onOpenCertificateModal: () => void;
  onStartRegistration: (courseId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activeRole,
  setActiveRole,
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
          {/* Left: Tagline & Bridge indicator */}
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#00828A] animate-pulse" />
            <span className="font-semibold tracking-wider text-slate-200">SILPHOR GLOBAL BRIDGE:</span>
            <span className="hidden sm:inline text-slate-300">
              Connecting Technology Vendors with Semiconductor, VLSI & Embedded Industries
            </span>
          </div>

          {/* Right: Quick actions & Dynamic Integration Guide button */}
          <div className="flex items-center gap-3">
            {/* Guide Button with prominent teal styling */}
            <button
              onClick={onOpenGuide}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#00828A] hover:bg-[#009688] text-white text-[11px] font-bold tracking-wide transition-all shadow-xs"
              title="Click to view how Dynamic Menu integrates with backend requirements"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Menu & Backend Integration Guide</span>
            </button>

            {/* Quick Certificate Verification */}
            <button
              onClick={onOpenCertificateModal}
              className="hidden lg:flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Verify Certificate</span>
            </button>

            {/* Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-[11px] border border-slate-700 transition-colors"
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
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
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

      {/* Main 1-Row Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Authentic Silphor Logo */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center focus:outline-hidden text-left"
          >
            <SilphorLogo variant="horizontal" size="md" />
          </button>

          {/* Zone 2: Navigation Links (Exact 10 items requested) */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
            {visibleMenuItems.map((item) => {
              const isActive = activeTab === item.id;
              const hasDropdown = item.subItems && item.subItems.length > 0;

              return (
                <div
                  key={item.id}
                  className="relative group"
                  onMouseEnter={() => hasDropdown && setOpenDropdown(item.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setOpenDropdown(null);
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1.5 text-[13px] font-semibold tracking-tight transition-all rounded-md whitespace-nowrap ${
                      isActive
                        ? 'text-[#00828A] font-bold border-b-2 border-[#00828A]'
                        : 'text-slate-700 hover:text-[#0B2545] hover:bg-slate-100/70'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-teal-50 text-[#00828A] border border-teal-200">
                        {item.badge}
                      </span>
                    )}
                    {hasDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform group-hover:rotate-180" />
                    )}
                  </button>

                  {/* Dynamic Submenu Dropdown */}
                  {hasDropdown && openDropdown === item.id && (
                    <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50">
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
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors group/sub"
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

          {/* Zone 3: Primary Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {activeRole === 'admin' ? (
              <button
                onClick={() => setActiveTab('admin-panel')}
                className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                  activeTab === 'admin-panel'
                    ? 'bg-[#0B2545] text-white border-[#0B2545]'
                    : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                }`}
              >
                Admin Control Room
              </button>
            ) : (
              <button
                onClick={() => onStartRegistration()}
                className="px-4 py-2.5 text-xs font-bold text-white bg-[#00828A] hover:bg-[#007077] rounded-lg transition-all shadow-xs shadow-teal-500/20 whitespace-nowrap flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Apply & Register</span>
              </button>
            )}

            {/* Quick Contact Button */}
            <button
              onClick={() => setActiveTab('contact')}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#0B2545] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
            >
              Enquire
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => onStartRegistration()}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#00828A] rounded-lg"
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
            <button
              onClick={() => {
                onOpenCertificateModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4 text-[#00828A]" />
              Verify Certificate
            </button>
            <button
              onClick={() => {
                setActiveTab('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-xs font-semibold text-[#0B2545] border border-slate-300 rounded-lg text-center"
            >
              Contact & Directions
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
