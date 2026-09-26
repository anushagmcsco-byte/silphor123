import React, { useState, useEffect, useRef } from 'react';
import { SilphorLogo } from './SilphorLogo';
import { MainNavId, UserRole } from '../types';
import { DYNAMIC_NAV_CONFIG } from '../data/mockDatabase';
import { getTabPath, AppNavTarget } from '../utils/navigation';
import { 
  ChevronDown, 
  Menu as MenuIcon, 
  X, 
  ShieldCheck, 
  Code2, 
  Award,
  Sparkles,
  Lock,
  LogOut,
  Phone,
  MessageSquare,
  ChevronRight
} from 'lucide-react';

interface NavbarProps {
  activeTab: AppNavTarget;
  setActiveTab: (tab: AppNavTarget) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  adminSession?: { name: string; email: string; role: string } | null;
  onAdminLoginClick: () => void;
  onRoleLogin: (role: Exclude<UserRole, 'public'>) => void;
  onLogout: () => void;
  onOpenGuide: () => void;
  onOpenCertificateModal: () => void;
  onStartRegistration: (courseId?: string) => void;
  canOpenGuide?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activeRole,
  setActiveRole,
  adminSession = null,
  onAdminLoginClick,
  onRoleLogin,
  onLogout,
  onOpenGuide,
  onOpenCertificateModal,
  onStartRegistration,
  canOpenGuide = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);

  // Close menus when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setRoleDropdownOpen(false);
        setMoreDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setRoleDropdownOpen(false);
        setMoreDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Dynamic menu filtering based on role
  const visibleMenuItems = DYNAMIC_NAV_CONFIG.filter((item) =>
    item.allowedRoles.includes(activeRole)
  );

  // For medium screens (lg: 1024px - 1279px), show first 5 items + "More" dropdown
  const lgPrimaryItems = visibleMenuItems.slice(0, 5);
  const lgOverflowItems = visibleMenuItems.slice(5);

  const isOverflowActive = lgOverflowItems.some((item) => item.id === activeTab);
  const isAuthenticated = Boolean(adminSession) || activeRole !== 'public';

  return (
    <header ref={headerRef} className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Notification / Role Switcher Strip */}
      <div className="bg-[#0B2545] text-white text-xs py-1.5 px-3 sm:px-4 md:px-8 border-b border-[#00828A]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Tagline & Direct Helpline */}
          <div className="flex items-center gap-2 text-slate-300 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#00828A] animate-pulse shrink-0" />
            <span className="font-semibold tracking-wider text-slate-200 hidden sm:inline whitespace-nowrap">
              SILPHOR GLOBAL BRIDGE:
            </span>
            <span className="hidden xl:inline text-slate-300 truncate">
              Connecting Technology Vendors with Semiconductor & VLSI Industries
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <a
              href="tel:+919876543210"
              className="text-emerald-400 font-mono font-bold hover:underline flex items-center gap-1 shrink-0 text-[11px] sm:text-xs"
            >
              <Phone className="w-3 h-3 hidden xs:inline" />
              <span>+91 9876543210</span>
            </a>
          </div>

          {/* Right: Quick actions & Dynamic Integration Guide button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Guide Button */}
            {canOpenGuide && <button
              onClick={onOpenGuide}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded bg-[#00828A] hover:bg-[#009688] text-white text-[10px] sm:text-[11px] font-bold tracking-wide transition-all shadow-xs cursor-pointer whitespace-nowrap"
              title="Click to view how Dynamic Menu integrates with backend requirements"
            >
              <Code2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Menu & Backend Guide</span>
              <span className="sm:hidden">Guide</span>
            </button>}

            {/* Quick Certificate Verification */}
            <button
              onClick={onOpenCertificateModal}
              className="hidden lg:flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              <Award className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Verify Credential</span>
            </button>

            {/* Role Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  setRoleDropdownOpen(!roleDropdownOpen);
                  setOpenDropdown(null);
                  setMoreDropdownOpen(false);
                }}
                className="flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-[10px] sm:text-[11px] border border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <ShieldCheck className="w-3 h-3 text-[#00828A]" />
                <span className="text-slate-300 hidden sm:inline">Role:</span>
                <span className="font-bold text-white capitalize">{activeRole}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div
                  className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-slate-800 animate-in fade-in zoom-in-95 duration-100"
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
                        else if (role !== 'public') onRoleLogin(role);
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

      {/* Main 1-Row Top Bar */}
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6 2xl:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20 gap-2">
          {/* Zone 1: Authentic Silphor Logo (Single, Crisp, Fully Responsive, Linking to /) */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center focus:outline-hidden text-left shrink-0 cursor-pointer pr-1 py-1"
            title="Silphor Technologies - Home"
          >
            <SilphorLogo variant="horizontal" size="md" />
          </a>

          {/* Zone 2: Desktop Navigation Links (For screens >= 1024px: lg, xl, 2xl) */}
          {/* 2A: Full Navigation for XL+ (>= 1280px) */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1.5">
            {visibleMenuItems.map((item) => {
              const isActive = activeTab === item.id;
              const hasDropdown = item.subItems && item.subItems.length > 0;
              const itemPath = getTabPath(item.id);

              return (
                <div
                  key={item.id}
                  className="relative group shrink-0"
                  onMouseEnter={() => hasDropdown && setOpenDropdown(item.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <a
                    href={itemPath}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(item.id);
                      setOpenDropdown(null);
                    }}
                    className={`relative flex items-center gap-1 px-1.5 2xl:px-2.5 py-1.5 text-[12px] 2xl:text-[13px] font-semibold tracking-tight transition-all rounded-md whitespace-nowrap cursor-pointer ${
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

                    {/* Exact rounded active underline */}
                    {isActive && (
                      <span className="absolute -bottom-2 left-1.5 right-1.5 h-[2.5px] bg-[#00828A] rounded-full shadow-2xs" />
                    )}
                  </a>

                  {/* Submenu Dropdown */}
                  {hasDropdown && openDropdown === item.id && (
                    <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="text-[10px] font-bold text-slate-400 uppercase px-3 py-1 tracking-wider border-b border-slate-100">
                        {item.label} Modules
                      </div>
                      <div className="py-1">
                        {item.subItems?.map((sub) => (
                          <a
                            key={sub.id}
                            href={itemPath}
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveTab(item.id);
                              setOpenDropdown(null);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors group/sub cursor-pointer block"
                          >
                            <div className="text-xs font-semibold text-slate-800 group-hover/sub:text-[#00828A]">
                              {sub.label}
                            </div>
                            {sub.description && (
                              <div className="text-[11px] text-slate-500 line-clamp-1 opacity-0 max-h-0 transition-all duration-200 group-hover/sub:opacity-100 group-hover/sub:max-h-6">
                                {sub.description}
                              </div>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* 2B: Adaptive Navigation for LG screens (1024px - 1279px, fitting cleanly in current laptop/preview window) */}
          <nav className="hidden lg:flex xl:hidden items-center gap-0.5">
            {lgPrimaryItems.map((item) => {
              const isActive = activeTab === item.id;
              const hasDropdown = item.subItems && item.subItems.length > 0;
              const itemPath = getTabPath(item.id);

              return (
                <div
                  key={item.id}
                  className="relative group shrink-0"
                  onMouseEnter={() => hasDropdown && setOpenDropdown(item.id)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <a
                    href={itemPath}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(item.id);
                      setOpenDropdown(null);
                    }}
                    className={`relative flex items-center gap-1 px-1.5 py-1.5 text-[12px] font-semibold tracking-tight transition-all rounded-md whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'text-[#00828A] font-bold'
                        : 'text-slate-700 hover:text-[#0B2545] hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasDropdown && (
                      <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600 transition-transform group-hover:rotate-180" />
                    )}
                    {isActive && (
                      <span className="absolute -bottom-2 left-1.5 right-1.5 h-[2.5px] bg-[#00828A] rounded-full shadow-2xs" />
                    )}
                  </a>

                  {hasDropdown && openDropdown === item.id && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="text-[10px] font-bold text-slate-400 uppercase px-3 py-1 tracking-wider border-b border-slate-100">
                        {item.label} Modules
                      </div>
                      <div className="py-1">
                        {item.subItems?.map((sub) => (
                          <a
                            key={sub.id}
                            href={itemPath}
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveTab(item.id);
                              setOpenDropdown(null);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer block"
                          >
                            <div className="text-xs font-semibold text-slate-800 hover:text-[#00828A]">
                              {sub.label}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* "More" dropdown for remaining items on LG screens */}
            {lgOverflowItems.length > 0 && (
              <div
                className="relative group shrink-0"
                onMouseEnter={() => setMoreDropdownOpen(true)}
                onMouseLeave={() => setMoreDropdownOpen(false)}
              >
                <button
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  className={`relative flex items-center gap-1 px-2 py-1.5 text-[12px] font-semibold tracking-tight transition-all rounded-md whitespace-nowrap cursor-pointer ${
                    isOverflowActive
                      ? 'text-[#00828A] font-bold bg-teal-50'
                      : 'text-slate-700 hover:text-[#0B2545] hover:bg-slate-50'
                  }`}
                >
                  <span>More</span>
                  <ChevronDown className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform" />
                  {isOverflowActive && (
                    <span className="absolute -bottom-2 left-1.5 right-1.5 h-[2.5px] bg-[#00828A] rounded-full shadow-2xs" />
                  )}
                </button>

                {moreDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="text-[10px] font-bold text-slate-400 uppercase px-3 py-1 tracking-wider border-b border-slate-100">
                      Additional Sections
                    </div>
                    <div className="py-1">
                      {lgOverflowItems.map((item) => (
                        <a
                          key={item.id}
                          href={getTabPath(item.id)}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab(item.id);
                            setMoreDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer block ${
                            activeTab === item.id
                              ? 'text-[#00828A] bg-teal-50 font-bold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-teal-100 text-[#00828A]">
                              {item.badge}
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Zone 3: Primary Actions for Desktop (LG and XL) */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 shrink-0 pl-1">
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5 shrink-0">
                {activeRole === 'admin' ? (
                  <a
                    href="/admin-panel"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('admin-panel');
                    }}
                    className={`px-2.5 xl:px-3 py-1.5 xl:py-2 text-xs font-bold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                      activeTab === 'admin-panel'
                        ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-xs'
                        : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00828A]" />
                    <span>Admin Console</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </a>
                ) : (
                  <span className="px-2.5 py-1.5 text-xs font-bold text-slate-700 capitalize">
                    {activeRole} Portal
                  </span>
                )}
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-1.5 xl:p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-slate-200 transition-colors cursor-pointer shrink-0"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 xl:gap-2 shrink-0">
                <a
                  href="/registration"
                  onClick={(e) => {
                    e.preventDefault();
                    onStartRegistration();
                  }}
                  className="px-2.5 xl:px-3.5 2xl:px-4 py-1.5 xl:py-2 text-xs font-bold text-white bg-[#00828A] hover:bg-[#007077] rounded-xl transition-all shadow-xs shadow-teal-500/20 whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Apply & Register</span>
                </a>

                <a
                  href="/admin-login"
                  onClick={(e) => {
                    e.preventDefault();
                    onAdminLoginClick();
                  }}
                  className={`px-2.5 xl:px-3 py-1.5 xl:py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                    activeTab === 'admin-login'
                      ? 'bg-[#0B2545] text-white border-[#0B2545]'
                      : 'text-slate-700 hover:text-[#0B2545] bg-slate-50 hover:bg-slate-100 border-slate-200 shadow-2xs'
                  }`}
                  title="Administrative Login"
                >
                  <Lock className="w-3.5 h-3.5 text-[#00828A] shrink-0" />
                  <span className="whitespace-nowrap">Admin Login</span>
                </a>
              </div>
            )}
          </div>

          {/* Zone 4: Mobile & Tablet Actions (< 1024px) */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            <a
              href="/registration"
              onClick={(e) => {
                e.preventDefault();
                onStartRegistration();
              }}
              className="px-2.5 sm:px-3 py-1.5 text-xs font-bold text-white bg-[#00828A] hover:bg-[#007077] rounded-lg shadow-xs transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3 h-3" />
              <span>Apply</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 text-slate-700 hover:text-[#00828A] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 top-[96px] sm:top-[104px] bg-slate-900/40 backdrop-blur-xs z-30 lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden relative z-40 bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 max-h-[calc(100vh-100px)] overflow-y-auto shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {/* Admin Login / Console state */}
          {isAuthenticated ? (
            <div className="p-3 bg-[#0B2545] rounded-xl text-white space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="capitalize">{activeRole} Portal Active</span>
                </span>
                <span className="text-[10px] text-slate-300 truncate max-w-[140px]">{adminSession?.email || 'admin@silphor.com'}</span>
              </div>
              <div className="flex gap-2 pt-1">
                {activeRole === 'admin' && (
                  <a
                    href="/admin-panel"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('admin-panel');
                      setMobileMenuOpen(false);
                    }}
                    className="flex-1 py-1.5 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-lg text-center cursor-pointer block"
                  >
                    Open Operations Room
                  </a>
                )}
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <a
              href="/admin-login"
              onClick={(e) => {
                e.preventDefault();
                onAdminLoginClick();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xs hover:bg-slate-800 transition-colors cursor-pointer block text-center"
            >
              <div className="flex items-center justify-center gap-2">
                <Lock className="w-4 h-4 text-[#38BDF8]" />
                <span>Admin Panel Login (Staff / Faculty)</span>
              </div>
            </a>
          )}

          {/* Guide CTA on mobile */}
          {canOpenGuide && (
            <button
              onClick={() => {
                onOpenGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#00828A]/10 text-[#00828A] border border-[#00828A]/30 text-xs font-bold hover:bg-[#00828A]/20 transition-colors cursor-pointer"
            >
              <Code2 className="w-4 h-4 text-[#00828A]" />
              <span>Dynamic Menu & Backend Integration Guide</span>
            </button>
          )}

          {/* Mobile Links */}
          <div className="divide-y divide-slate-100 pt-1">
            {visibleMenuItems.map((item) => {
              const isActive = activeTab === item.id;
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isExpanded = expandedMobileItem === item.id;
              const itemPath = getTabPath(item.id);

              return (
                <div key={item.id} className="py-1">
                  <div className="flex items-center justify-between">
                    <a
                      href={itemPath}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab(item.id);
                        if (!hasSubItems) {
                          setMobileMenuOpen(false);
                        }
                      }}
                      className={`flex-1 text-left px-3 py-2 text-sm font-semibold rounded-lg flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'text-[#00828A] bg-teal-50 font-bold'
                          : 'text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#00828A]" />}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E0F7F6] text-[#00828A] font-bold border border-[#76DCD8]">
                          {item.badge}
                        </span>
                      )}
                    </a>

                    {hasSubItems && (
                      <button
                        onClick={() => setExpandedMobileItem(isExpanded ? null : item.id)}
                        className="p-2 text-slate-400 hover:text-slate-700 cursor-pointer"
                        aria-label={`Toggle ${item.label} sub-items`}
                      >
                        <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90 text-[#00828A]' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Accordion Sub-Items */}
                  {hasSubItems && isExpanded && (
                    <div className="pl-5 pr-2 py-1 space-y-1 bg-slate-50/60 rounded-lg mt-1 border-l-2 border-[#00828A]/40">
                      {item.subItems?.map((sub) => (
                        <a
                          key={sub.id}
                          href={itemPath}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab(item.id);
                            setMobileMenuOpen(false);
                          }}
                          className="w-full text-left text-xs text-slate-600 hover:text-[#00828A] py-1.5 px-2 rounded-md hover:bg-white transition-colors cursor-pointer flex items-center gap-2 block"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                          <span className="font-medium">{sub.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Secondary Mobile Actions */}
          <div className="pt-3 space-y-2 border-t border-slate-200">
            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:+919876543210"
                className="py-2 px-3 text-xs font-bold text-white bg-[#00828A] hover:bg-[#007077] rounded-xl flex items-center justify-center gap-1.5 text-center shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Us</span>
              </a>
              <a
                href="https://wa.me/919876543210?text=Hello%20Silphor%20Technologies,%20I%20would%20like%20to%20enquire%20about%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center justify-center gap-1.5 text-center shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            <button
              onClick={() => {
                onOpenCertificateModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Award className="w-4 h-4 text-[#00828A]" />
              <span>Verify Certificate Credential</span>
            </button>

            <a
              href="/contact-us"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-xl text-center cursor-pointer block"
            >
              📍 #45 East Road, Malleswaram, Bangalore
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
