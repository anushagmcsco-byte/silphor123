import React from 'react';
import { 
  Compass, 
  Target, 
  Cpu, 
  Award, 
  CheckCircle2, 
  Users, 
  Building2, 
  GraduationCap, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { SilphorLogo } from '../components/SilphorLogo';

interface AboutViewProps {
  onNavigate: (tab: any) => void;
  onRegisterCourse: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onRegisterCourse }) => {
  const trainers = [
    {
      name: 'Dr. R. K. Nambiar',
      role: 'Director of Academic Standards & Physical Design Lead',
      experience: '22+ Years in Semiconductor Domain',
      background: 'Ex-Intel & Texas Instruments. Supervised 15+ sub-14nm FinFET ASIC tape-outs and authored 8 IEEE publications.',
      specialization: 'Synthesis, STA Timing Closure, MCMM & Calibre Signoff',
    },
    {
      name: 'Vikram Joshi',
      role: 'Principal RTL & Functional Verification Specialist',
      experience: '16+ Years in EDA & ASIC Verification',
      background: 'Former Senior Staff Engineer at Synopsys and NXP. Specialized in UVM 1.2 architectures and PCIe Gen5 protocol verification.',
      specialization: 'SystemVerilog OOP, SVA Assertions, Formal Verification',
    },
    {
      name: 'Sunil Kumar',
      role: 'Chief Hardware & High-Speed PCB Architect',
      experience: '18+ Years in Avionics & Automotive Hardware',
      background: 'Designed 12-layer flight computer boards and DDR4 high-speed motherboards with stringent signal/power integrity constraints.',
      specialization: 'High-Speed Layout, HyperLynx SI/PI, EMI/EMC Compliance',
    },
    {
      name: 'Dr. Anand Verma',
      role: 'Lead Power Electronics & SiC Inverter Consultant',
      experience: '14+ Years in E-Mobility & Renewable Drives',
      background: 'Consultant for leading automotive EV OEMs designing 800V Silicon Carbide traction inverters and magnetics.',
      specialization: 'SiC/GaN Gate Drivers, FOC Motor Control, PLECS Simulation',
    },
  ];

  const testimonials = [
    {
      quote:
        'The hands-on exposure to Cadence Innovus and PrimeTime at Silphor gave me the confidence to crack the technical rounds at Qualcomm. The practical tape-out methodologies taught here mirror tier-1 semiconductor workflows.',
      author: 'Ananya Sharma',
      role: 'Associate Physical Design Engineer',
      company: 'Qualcomm India',
    },
    {
      quote:
        'Silphor has been our trusted engineering staffing partner for the past three years. The electronics and FAE engineers deputed to our automotive division hit the ground running with zero ramp-up time.',
      author: 'K. Venkatesh',
      role: 'Director of Hardware Engineering',
      company: 'ElectroDrive Mobility Solutions',
    },
    {
      quote:
        'As an academic head, the Faculty Development Program (FDP) conducted by Silphor upgraded our college labs with genuine industry-standard FPGA workflows and digital verification techniques.',
      author: 'Prof. S. Meenakshi',
      role: 'Head of ECE Department',
      company: 'Anna University Affiliated Campus',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* SECTION 1: HEADER & PHILOSOPHY */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00828A]">
          About Silphor Technologies
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] font-display">
          Bridging Global Silicon Technology with Engineering Excellence
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Founded by semiconductor industry veterans, Silphor Technologies acts as an international bridge connecting global EDA vendors, hardware manufacturers, and industrial clients with world-class training programs and on-demand engineering talent.
        </p>

        {/* 4 Pillars Emblem */}
        <div className="pt-6">
          <div className="p-6 rounded-2xl bg-[#0B2545] text-white shadow-xl max-w-xl mx-auto border border-[#00828A]/40">
            <div className="text-xs font-mono text-[#38BDF8] tracking-widest uppercase mb-2">
              Our Core Operating Tenet
            </div>
            <div className="grid grid-cols-4 divide-x divide-slate-700 text-center text-xs font-bold">
              <div className="px-2">
                <span className="text-[#00828A] block font-mono text-sm">01</span>
                DESIGN
              </div>
              <div className="px-2">
                <span className="text-[#00828A] block font-mono text-sm">02</span>
                INNOVATE
              </div>
              <div className="px-2">
                <span className="text-[#00828A] block font-mono text-sm">03</span>
                VERIFY
              </div>
              <div className="px-2">
                <span className="text-[#00828A] block font-mono text-sm">04</span>
                DELIVER
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: VISION & MISSION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#00828A] flex items-center justify-center mb-4">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#0B2545] font-display mb-3">
            Our Vision
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            To be the premier global ecosystem partner for semiconductor innovation, electronic design automation, and skilled engineering human capital, enabling seamless technology adoption and creating an industry-ready workforce for the next generation of silicon advancements.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0B2545] flex items-center justify-center mb-4">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#0B2545] font-display mb-3">
            Our Mission
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            To provide robust technical bridges between global technology vendors and local enterprise requirements; to deliver rigorous, project-grounded training in VLSI, RTL, PCB, and Embedded systems; and to supply highly competent engineering resources that accelerate client product delivery.
          </p>
        </div>
      </section>

      {/* SECTION 3: TRAINING METHODOLOGY & LAB INFRASTRUCTURE */}
      <section className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200 space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00828A]">
            Pedagogical Rigor
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] font-display mt-1">
            Industry-Grade Training Methodology
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Unlike theoretical academic courses, Silphor curriculum is engineered alongside active semiconductor production houses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: 'Phase 1',
              title: 'Fundamentals & HDL Modeling',
              desc: 'Deep grounding in CMOS physics, combinational/sequential logic, synthesizable Verilog and clock domain crossing.',
            },
            {
              step: 'Phase 2',
              title: 'EDA Tool Mastery & Lab Work',
              desc: 'Hands-on synthesis, static timing analysis (STA), constraint design (SDC), and interactive simulation on QuestaSim & PrimeTime.',
            },
            {
              step: 'Phase 3',
              title: 'Physical Implementation',
              desc: 'Floorplanning, CTS, routing, crosstalk avoidance, DRC/LVS physical signoff and stream-out using 7nm/14nm PDK rule decks.',
            },
            {
              step: 'Phase 4',
              title: 'Tape-Out Review & Placement',
              desc: 'Multi-Project Wafer (MPW) project defense, 1-on-1 mock interviews with industry architects, and direct hiring partner referrals.',
            },
          ].map((m, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200">
              <span className="text-xs font-mono font-bold text-[#00828A]">{m.step}</span>
              <h3 className="text-sm font-bold text-slate-900 mt-1 mb-2">{m.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: TRAINER & FACULTY PROFILES */}
      <section className="space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#00828A]">
            Faculty & Mentors
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] font-display mt-1">
            Taught by Senior Architects from Tier-1 Semiconductor MNCs
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Our faculty brings an aggregate of over 70+ years of active silicon tape-out and hardware product development experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainers.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-[#0B2545]">{t.name}</h3>
                    <div className="text-xs font-semibold text-[#00828A] mt-0.5">{t.role}</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">{t.experience}</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 font-bold text-xs">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">{t.background}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs">
                <span className="font-semibold text-slate-700">Specialization:</span>{' '}
                <span className="text-slate-600">{t.specialization}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: TESTIMONIALS & HIRING PARTNERS */}
      <section className="space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#00828A]">
            Social Proof & Hiring Network
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] font-display mt-1">
            Trusted by Engineers and Engineering Leaders Alike
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <p className="text-xs text-slate-700 italic leading-relaxed">
                &ldquo;{test.quote}&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="text-xs font-bold text-[#0B2545]">{test.author}</div>
                <div className="text-[11px] text-[#00828A] font-semibold">{test.role}</div>
                <div className="text-[10px] text-slate-500">{test.company}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-slate-900 text-white rounded-2xl p-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold font-display text-white">
            Join Our Next Semiconductor Engineering Cohort
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Admissions open for upcoming batches with scholarship discounts available.
          </p>
        </div>
        <button
          onClick={onRegisterCourse}
          className="px-6 py-2.5 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
        >
          Register for Next Batch
        </button>
      </section>
    </div>
  );
};
