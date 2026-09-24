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
  ChevronRight
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
            <SilphorLogo variant="horizontal" size="md" />

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
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About Us & Vision
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industry')} className="hover:text-white transition-colors">
                  Industry Solutions & Vendors
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('technology')} className="hover:text-white transition-colors">
                  Technology & Silicon Stack
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('engineering-services')} className="hover:text-white transition-colors">
                  Engineering Staffing Services
                </button>
              </li>
            </ul>
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
              Headquarters
            </h4>
            <div className="space-y-2 text-slate-400 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00828A] shrink-0 mt-0.5" />
                <span>Silphor Tower, Outer Ring Road, Bengaluru, Karnataka 560103</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>+91 (080) 4920-8800</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span>info@silphor.com</span>
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

          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300">Privacy Policy</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300">Terms of Service</button>
            <button onClick={onOpenGuide} className="text-[#38BDF8] hover:underline font-mono">
              Dynamic Menu Architecture Docs
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
