import React from 'react';
import { SilphorLogo } from './SilphorLogo';
import { MainNavId } from '../types';
import { 
  Award, 
  Code2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck,
  ChevronRight,
  Scale
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: any) => void;
  onOpenGuide: () => void;
  onVerifyCert: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenGuide, onVerifyCert }) => {
  return (
    <footer className="bg-[#07172B] text-slate-300 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center text-left bg-transparent p-0 border-0 cursor-pointer hover:opacity-90 transition-opacity focus:outline-hidden"
              title="Silphor Technologies - Home"
            >
              <SilphorLogo variant="monochromeWhite" size="sm" />
            </button>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mt-3">
              Silphor Technologies acts as an international bridge connecting global hardware, software, and EDA tool vendors with industry requirements in Semiconductor, VLSI, Embedded, and Power Electronics engineering.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenGuide}
                className="px-3 py-1.5 rounded-lg bg-[#00828A]/20 hover:bg-[#00828A]/30 border border-[#00828A]/40 text-[#38BDF8] text-[11px] font-bold flex items-center gap-1.5 transition-colors"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Backend Menu Architecture</span>
              </button>
              <button
                onClick={onVerifyCert}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Award className="w-3.5 h-3.5 text-[#00828A]" />
                <span>Verify Credentials</span>
              </button>
              <button
                onClick={() => onNavigate('admin-login')}
                className="px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 text-[11px] font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links & Legal Governance */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                Navigation
              </h4>
              <ul className="space-y-2 mt-3 text-slate-400">
                <li>
                  <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer text-left">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer text-left">
                    About Us & Vision
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('industry')} className="hover:text-white transition-colors cursor-pointer text-left">
                    Industry Solutions & Vendors
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('technology')} className="hover:text-white transition-colors cursor-pointer text-left">
                    Technology & Silicon Stack
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('engineering-services')} className="hover:text-white transition-colors cursor-pointer text-left">
                    Engineering Staffing Services
                  </button>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-800/80">
              <h5 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider font-display">
                Legal & Policies
              </h5>
              <ul className="space-y-2 mt-2 text-slate-400">
                <li>
                  <button
                    onClick={() => onNavigate('privacy-policy')}
                    className="hover:text-[#38BDF8] transition-colors cursor-pointer text-left flex items-center gap-1.5 group"
                    aria-label="Navigate to Privacy Policy"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00828A] group-hover:text-[#38BDF8] transition-colors" />
                    <span className="group-hover:underline underline-offset-2">Privacy Policy</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('terms-of-service')}
                    className="hover:text-[#38BDF8] transition-colors cursor-pointer text-left flex items-center gap-1.5 group"
                    aria-label="Navigate to Terms of Service"
                  >
                    <Scale className="w-3.5 h-3.5 text-[#00828A] group-hover:text-[#38BDF8] transition-colors" />
                    <span className="group-hover:underline underline-offset-2">Terms of Service</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Training & Student Portal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider">
              Academics & LMS
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('training')} className="hover:text-white transition-colors">
                  VLSI & RTL Training
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('training')} className="hover:text-white transition-colors">
                  High-Speed PCB Design
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('students')} className="hover:text-white transition-colors">
                  Student Portal & LMS
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects-internship')} className="hover:text-white transition-colors">
                  Projects & Internship
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-white transition-colors">
                  EDA Setup Guides & Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Locations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider">
              Bengaluru Headquarters
            </h4>
            <div className="space-y-2 text-slate-400 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00828A] shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-200">#45 East Road, Malleswaram, Bangalore</div>
                  <div className="text-slate-400">Karnataka - 560003, India</div>
                  <div className="text-[11px] text-teal-400/90 mt-0.5">
                    Landmark: Near 8th Cross Cultural Hub & Malleswaram Ground
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+919876543210" className="text-slate-200 hover:text-white font-semibold">
                  +91 9876543210
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-xs">💬</span>
                <a
                  href="https://wa.me/919876543210?text=Hello%20Silphor%20Technologies,%20I%20would%20like%20to%20enquire%20about%20your%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-medium underline text-[11px]"
                >
                  Chat on WhatsApp (+91 9876543210)
                </a>
              </div>
              <div className="space-y-1 pt-1">
                <div className="flex items-center gap-2 text-[11px]">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a href="mailto:contact@silphortechnologies.com" className="hover:text-white font-mono">
                    contact@silphortechnologies.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-[11px] pl-5">
                  <a href="mailto:info@silphortechnologies.com" className="hover:text-white font-mono">
                    info@silphortechnologies.com
                  </a>
                </div>
              </div>
              <div className="pt-1 text-[11px] text-slate-400 border-t border-slate-800/80">
                <div className="font-semibold text-slate-300">Operational Hours:</div>
                <div>Mon - Fri: 9:00 AM - 7:00 PM IST</div>
                <div>Sat: 9:30 AM - 5:30 PM IST</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>&copy; {new Date().getFullYear()} Silphor Technologies. All Rights Reserved.</span>
            <span>&bull;</span>
            <span className="text-[#00828A] font-semibold">DESIGN &bull; INNOVATE &bull; VERIFY &bull; DELIVER</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('privacy-policy')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer focus:outline-hidden focus:text-[#38BDF8] underline-offset-4 hover:underline"
              aria-label="Silphor Technologies Privacy Policy"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700 hidden sm:inline">&bull;</span>
            <button
              onClick={() => onNavigate('terms-of-service')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer focus:outline-hidden focus:text-[#38BDF8] underline-offset-4 hover:underline"
              aria-label="Silphor Technologies Terms of Service"
            >
              Terms of Service
            </button>
            <span className="text-slate-700 hidden sm:inline">&bull;</span>
            <button
              onClick={onOpenGuide}
              className="text-[#38BDF8] hover:text-[#7dd3fc] hover:underline font-mono transition-colors cursor-pointer focus:outline-hidden"
              aria-label="View Dynamic Menu Architecture Documentation"
            >
              Dynamic Menu Architecture Docs
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
