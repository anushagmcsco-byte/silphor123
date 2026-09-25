import React from 'react';
import { 
  ArrowRight, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Award, 
  Users, 
  CheckCircle2, 
  ExternalLink, 
  Compass, 
  Sparkles,
  Zap,
  Building2,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { MOCK_COURSES, MOCK_VENDORS } from '../data/mockDatabase';
import { SilphorLogo } from '../components/SilphorLogo';
import heroCleanroomImg from '../assets/images/hero_semiconductor_cleanroom_1790264810712.jpg';
import engineeringLabImg from '../assets/images/engineering_lab_training_1790264847036.jpg';

interface HomeViewProps {
  onNavigate: (tab: any) => void;
  onRegisterCourse: (courseId?: string) => void;
  onOpenGuide: () => void;
  onVerifyCert: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onRegisterCourse,
  onOpenGuide,
  onVerifyCert,
}) => {
  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#07172B] text-white pt-12 pb-20 border-b border-[#00828A]/30">
        {/* Subtle high-tech circuit background grid */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#00828A 1px, transparent 1px), radial-gradient(#38BDF8 1px, #07172B 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Proposition */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00828A]/20 border border-[#00828A]/40 text-[#38BDF8] text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#00828A]" />
                <span>Global Bridge Between Technology Vendors & Industry Requirements</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display">
                Industrial Technology, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00828A] via-[#00A3A6] to-[#38BDF8]">
                  Semiconductor Solutions
                </span> <br />
                & VLSI Engineering.
              </h1>

              {/* Tagline / Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Silphor Technologies is an international bridge distributing global hardware, software, and EDA tools, providing on-demand skilled engineering staffing, and conducting industry-standard VLSI, RTL, PCB, and Embedded systems training.
              </p>

              {/* Brand Motto Pillars */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 py-1">
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00828A]" /> DESIGN
                </span>
                <span className="text-slate-600">&bull;</span>
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00828A]" /> INNOVATE
                </span>
                <span className="text-slate-600">&bull;</span>
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00828A]" /> VERIFY
                </span>
                <span className="text-slate-600">&bull;</span>
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00828A]" /> DELIVER
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onRegisterCourse()}
                  className="px-6 py-3.5 bg-[#00828A] hover:bg-[#007077] text-white text-sm font-bold rounded-xl shadow-lg shadow-teal-500/25 transition-all flex items-center gap-2 group"
                >
                  <span>Explore Courses & Register</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate('industry')}
                  className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-700/80 text-white text-sm font-semibold rounded-xl border border-slate-700 transition-colors flex items-center gap-2"
                >
                  <span>Industrial Vendor Directory</span>
                </button>
                <button
                  onClick={onOpenGuide}
                  className="px-4 py-3.5 bg-[#0B2545] hover:bg-slate-800 text-sky-300 text-xs font-semibold rounded-xl border border-sky-400/30 transition-colors flex items-center gap-1.5"
                >
                  <Cpu className="w-4 h-4 text-[#00828A]" />
                  <span>Dynamic Menu Architecture</span>
                </button>
              </div>

              {/* Quantitative Proof Strip */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-slate-300">
                <div>
                  <div className="text-2xl font-extrabold text-white font-mono">1,850+</div>
                  <div className="text-xs text-slate-400">VLSI & RTL Engineers Trained</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white font-mono">24+</div>
                  <div className="text-xs text-slate-400">Global Tech Partners & EDA Vendors</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white font-mono">94.2%</div>
                  <div className="text-xs text-slate-400">Industry Placement Rate</div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#00828A]/40 shadow-2xl bg-slate-900 group">
                <img
                  src={heroCleanroomImg}
                  alt="Silphor Semiconductor Cleanroom and Industrial Testing Facility"
                  className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== '/images/hero_semiconductor_cleanroom_1790264810712.jpg') {
                      target.src = '/images/hero_semiconductor_cleanroom_1790264810712.jpg';
                    }
                  }}
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07172B] via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60 text-xs text-slate-300">
                  <div className="flex items-center justify-between text-white font-bold mb-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Silphor Advanced Silicon & EDA Lab
                    </span>
                    <span className="font-mono text-[#38BDF8]">Bengaluru Hub</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Equipped with Synopsys, Cadence, Vivado, and industrial mixed-signal test equipment for tape-out ready engineers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL PARTNERS & EDA TOOL DISTRIBUTORS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00828A]">
            Authorized Ecosystem Partners
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] font-display mt-1">
            Global Partner Distributors & Technology Bridges
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Bridging international technology vendors with industry requirements for hardware, software, and EDA tools.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {MOCK_VENDORS.map((vendor) => (
            <div
              key={vendor.id}
              onClick={() => onNavigate('industry')}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[#00828A] hover:shadow-md transition-all cursor-pointer text-center group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-teal-50 text-[#0B2545] group-hover:text-[#00828A] flex items-center justify-center mx-auto mb-2 font-bold text-xs transition-colors">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#00828A] transition-colors line-clamp-1">
                {vendor.name}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">{vendor.category}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CORE CAPABILITIES: BENTO-GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#00828A]">
              Full Lifecycle Engineering
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] font-display mt-1">
              Industrial Technology & Engineering Solutions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              From silicon architecture to deployable printed circuit boards and technical human capital.
            </p>
          </div>
          <button
            onClick={() => onNavigate('engineering-services')}
            className="text-xs font-bold text-[#00828A] hover:underline flex items-center gap-1"
          >
            <span>View All Engineering Services</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: VLSI & Silicon EDA */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#00828A] transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00828A] flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                01. Semiconductor & VLSI Design
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Comprehensive RTL design, functional verification using SystemVerilog/UVM, logic synthesis, and physical design signoff down to advanced FinFET process nodes.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5 text-[11px] text-slate-500">
                <span>RTL / Verilog</span> &bull; <span>Physical Design</span> &bull; <span>STA Signoff</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('technology')}
              className="mt-6 text-xs font-semibold text-[#00828A] flex items-center gap-1 hover:underline"
            >
              <span>Explore VLSI Technology</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Industrial Hardware & PCB Layout */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#00828A] transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0B2545] flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                02. High-Speed Multilayer PCB Design
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rigorous PCB layout engineering for high-speed DDR4/5, PCIe, FPGA carrier boards, controlled impedance routing, signal integrity simulation and DFM signoff.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5 text-[11px] text-slate-500">
                <span>Impedance Matching</span> &bull; <span>EMI/EMC</span> &bull; <span>Altium / KiCad</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('training')}
              className="mt-6 text-xs font-semibold text-[#00828A] flex items-center gap-1 hover:underline"
            >
              <span>View Hardware Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Skilled Engineering Staffing */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#00828A] transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                03. Skilled Engineer Staffing & Deputation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Supplying verified Electronics Engineers, Field Application Engineers (FAE), Design & Testing Specialists on-demand for leading tier-1 semiconductor and automotive clients.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5 text-[11px] text-slate-500">
                <span>Electronics Engineers</span> &bull; <span>FAEs</span> &bull; <span>Design Specialists</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('engineering-services')}
              className="mt-6 text-xs font-semibold text-[#00828A] flex items-center gap-1 hover:underline"
            >
              <span>Submit Staffing Requisition</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED TRAINING PROGRAMS */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00828A]">
                Industry Aligned Curricula
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] font-display mt-1">
                Featured Electronics & VLSI Training Programs
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Hands-on project-centric cohorts designed in consultation with global semiconductor vendors.
              </p>
            </div>
            <button
              onClick={() => onNavigate('training')}
              className="px-5 py-2.5 bg-[#0B2545] hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
            >
              Browse All Programs
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_COURSES.slice(0, 3).map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-teal-50 text-[#00828A] font-bold border border-teal-200">
                      {course.category}
                    </span>
                    <span className="text-slate-500 font-mono text-[11px]">{course.duration}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {course.overview}
                  </p>

                  {/* Tools Taught */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      EDA & Hardware Tools Taught:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {course.tools.slice(0, 3).map((t, i) => (
                        <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-2">
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Tuition Fee</div>
                      <div className="text-lg font-extrabold text-[#0B2545] font-mono">
                        ₹{course.fee.toLocaleString()}
                      </div>
                    </div>
                    <button
                      onClick={() => onRegisterCourse(course.id)}
                      className="px-4 py-2 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LAB INFRASTRUCTURE & TRAINING METHODOLOGY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
              <img
                src={engineeringLabImg}
                alt="Silphor Electronics & VLSI Training Lab"
                className="w-full h-80 object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== '/images/engineering_lab_training_1790264847036.jpg') {
                    target.src = '/images/engineering_lab_training_1790264847036.jpg';
                  }
                }}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00828A]">
              Infrastructure & Labs
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] font-display">
              State-of-the-Art Silicon Verification & Hardware Testbenches
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our training methodology combines rigorous theoretical semiconductor physics with real hardware bring-up. Every student gets dedicated compute nodes with Synopsys, Cadence, and FPGA development boards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                '24/7 Cloud EDA Server Access (VPN)',
                'Physical FPGA Boards (AMD Zynq / Artix)',
                '16-Channel Keysight Logic Analyzers',
                'Pre-silicon & Post-silicon Bring-Up Labs',
                'Industrial Tape-Out Mock Reviews',
                'Direct Hiring Partner Connect (45+ MNCs)'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#00828A] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={() => onNavigate('about')}
                className="px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800"
              >
                Learn About Our Methodology
              </button>
              <button
                onClick={onVerifyCert}
                className="px-5 py-2.5 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 flex items-center gap-1.5"
              >
                <Award className="w-4 h-4 text-[#00828A]" />
                <span>Verify Issued Certificate</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B2545] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-[#00828A]/40 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-widest">
              Ready to Advance in Semiconductor & VLSI?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
              Accelerate Your Career with Industry-Certified Engineering Training.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Autumn batches are filling quickly. Register online today, submit your academic profile, and obtain instant multi-gateway confirmation.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onRegisterCourse()}
                className="px-6 py-3 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                Apply for Next Batch
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 bg-slate-800/90 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
              >
                Contact Academic Counselor
              </button>
            </div>
          </div>

          {/* Background Emblem Watermark */}
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none w-96 h-96">
            <SilphorLogo variant="iconOnly" size="xl" />
          </div>
        </div>
      </section>
    </div>
  );
};
