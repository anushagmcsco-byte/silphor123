import React, { useState } from 'react';
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
  ShieldCheck,
  Send,
  Sparkles,
  Globe
} from 'lucide-react';
import { SilphorLogo } from '../components/SilphorLogo';
import { saveFormSubmission } from '../utils/formStorage';

interface AboutViewProps {
  onNavigate: (tab: any) => void;
  onRegisterCourse: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onRegisterCourse }) => {
  // Institutional MoU Partnership Form State
  const [mouInstName, setMouInstName] = useState('');
  const [mouContactPerson, setMouContactPerson] = useState('');
  const [mouEmail, setMouEmail] = useState('');
  const [mouPhone, setMouPhone] = useState('');
  const [mouType, setMouType] = useState('University / Autonomous Engineering College');
  const [mouScope, setMouScope] = useState('Setting up VLSI Centre of Excellence (CoE)');
  const [mouNotes, setMouNotes] = useState('');
  const [mouSubmitted, setMouSubmitted] = useState(false);
  const [mouTrackingId, setMouTrackingId] = useState('');

  const handleMouSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mouInstName || !mouEmail) return;

    const saved = saveFormSubmission({
      pageSource: 'about',
      pageLabel: 'About Us & Academic MoUs',
      formTitle: 'Institutional MoU & Academic Partnership Request',
      senderName: mouContactPerson || mouInstName,
      senderEmail: mouEmail,
      senderPhone: mouPhone,
      organizationOrCollege: mouInstName,
      subject: `MoU Partnership: ${mouScope} (${mouInstName})`,
      message: mouNotes || `Institution: ${mouInstName} (${mouType}). Scope: ${mouScope}.`,
      formData: {
        institutionName: mouInstName,
        contactPerson: mouContactPerson,
        institutionType: mouType,
        partnershipScope: mouScope,
        phone: mouPhone,
        notes: mouNotes,
        submittedAt: new Date().toISOString(),
      },
      status: 'New',
      priority: 'High',
      notes: `Academic MoU request from ${mouInstName}. Route to Director of Academic Standards (Dr. R. K. Nambiar).`,
    });

    setMouTrackingId(saved.id);
    setMouSubmitted(true);
  };
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
      <section className="space-y-8">
        <div className="p-8 md:p-10 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="max-w-3xl">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0B2545] flex items-center justify-center mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#0B2545] font-display mb-2">Our Mission</h2>
            <p className="text-sm font-bold text-[#00828A] mb-2">Innovate. Engineer. Enable. Educate.</p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We accelerate semiconductor and electronics innovation through advanced technology solutions, specialized engineering consultancy, global distribution and sales partnerships, and industry-aligned technical education.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 mt-8 pt-6 border-t border-slate-100">
            <div>
              <span className="text-xs font-mono font-bold text-[#00828A]">01</span>
              <h3 className="text-sm font-bold text-[#0B2545] mt-1">Global Distribution & Sales</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Connect semiconductor, EDA, FPGA, embedded, software, and hardware technology providers with customers across industry and academia through market access, technical sales, consulting, and channel development.
              </p>
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-[#00828A]">02</span>
              <h3 className="text-sm font-bold text-[#0B2545] mt-1">Engineering & Consultancy</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Support VLSI, analog and digital design, AMS, verification, DFT, FPGA, RTL, embedded systems, sensors, and semiconductor product development with robust, production-oriented solutions.
              </p>
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-[#00828A]">03</span>
              <h3 className="text-sm font-bold text-[#0B2545] mt-1">VLSI & Technology Education</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Build practical expertise through industry-oriented programs in analog and digital IC design, verification, DFT, FPGA, RTL, and embedded systems.
              </p>
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-[#00828A]">04</span>
              <h3 className="text-sm font-bold text-[#0B2545] mt-1">Industry–Academia Enablement</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Partner with universities and engineering colleges on VLSI, FPGA, and embedded labs, training, workshops, faculty development, certification, and student projects.
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed mt-6 pt-4 border-t border-slate-100">
            <strong className="text-slate-700">Technology focus:</strong> Chip Design, AI Chips, Power Semiconductors, Fabless Semiconductor, Sensors, Embedded Systems, FPGA, EDA, Semiconductor Software, and Electronic Hardware.
          </p>
        </div>

        <div className="p-8 md:p-10 rounded-2xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#00828A] flex items-center justify-center mb-4">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#0B2545] font-display mb-3">Our Vision</h2>
          <p className="text-sm font-bold text-[#00828A] mb-3">
            Technology That Reaches Further. Engineering That Delivers. Talent That Transforms.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            At Silphor Technologies Private Limited, we believe semiconductor innovation is strongest when technology, engineering, business, and talent come together. We are building a global ecosystem that connects technology providers, semiconductor companies, engineering organizations, universities, and emerging talent—enabling ideas to move from concept to design, design to silicon, and silicon to market.
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

      {/* ACADEMIC & INSTITUTIONAL MOU PARTNERSHIP FORM */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-semibold">
              <Globe className="w-3.5 h-3.5" />
              <span>Academic Alliances & Corporate Partnerships</span>
            </div>
            <h3 className="text-2xl font-bold text-[#0B2545] font-display mt-1">
              Institutional MoU & VLSI Centre of Excellence Proposal
            </h3>
            <p className="text-xs text-slate-600 max-w-2xl mt-0.5 leading-relaxed">
              Engineering colleges, universities, and corporate tech departments can partner with Silphor Technologies to establish certified semiconductor design labs, faculty development programs, and direct campus placement pipelines.
            </p>
          </div>
        </div>

        {mouSubmitted ? (
          <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="text-lg font-bold text-emerald-950 font-display">
              MoU Proposal Logged with Academic Directorate
            </h4>
            <p className="text-xs text-emerald-800 max-w-md mx-auto">
              Thank you, <strong>{mouContactPerson || mouInstName}</strong>. Your institutional proposal{' '}
              <span className="font-mono font-bold">[{mouTrackingId || 'SUB-2026-MOU'}]</span> has been recorded in our central Administrative Portal. Our Academic Standards team will review your proposal and contact <strong>{mouEmail}</strong> within 48 hours.
            </p>
            <button
              onClick={() => setMouSubmitted(false)}
              className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 transition-colors"
            >
              Submit Another Institutional Proposal
            </button>
          </div>
        ) : (
          <form onSubmit={handleMouSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Institution / University / Company Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. RV College of Engineering / Qualcomm Labs"
                  value={mouInstName}
                  onChange={(e) => setMouInstName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Designated Contact Person & Designation *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. H. S. Ramesh, Head of ECE Dept"
                  value={mouContactPerson}
                  onChange={(e) => setMouContactPerson(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Official Institutional Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="hod.ece@rvce.edu.in"
                  value={mouEmail}
                  onChange={(e) => setMouEmail(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Phone / Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98450 99881"
                  value={mouPhone}
                  onChange={(e) => setMouPhone(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Organization Classification
                </label>
                <select
                  value={mouType}
                  onChange={(e) => setMouType(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                >
                  <option>University / Autonomous Engineering College</option>
                  <option>Affiliated Technical Institute / Polytechnic</option>
                  <option>Semiconductor Enterprise / Design House</option>
                  <option>Government Research Lab (DRDO / ISRO / CSIR)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Primary Partnership Scope
                </label>
                <select
                  value={mouScope}
                  onChange={(e) => setMouScope(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                >
                  <option>Setting up VLSI Centre of Excellence (CoE)</option>
                  <option>EDA Software & Floating License Academic Distribution</option>
                  <option>Faculty Development Program (FDP) & Student Workshops</option>
                  <option>Joint Industry MPW Tape-out & Capstone Mentorship</option>
                  <option>Direct Campus Recruitment & Internship Drive</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">
                  Proposal Overview & Requirements
                </label>
                <textarea
                  rows={2}
                  placeholder="Detail your batch sizes, current lab infrastructure, target timeline, or specific EDA tools needed..."
                  value={mouNotes}
                  onChange={(e) => setMouNotes(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 text-[11px]">
                Bengaluru Head Office: <strong className="text-slate-700">Malleswaram Hub</strong> &bull; +91 9876543210
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#00828A] hover:bg-[#007077] text-white font-bold rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Institutional Proposal</span>
              </button>
            </div>
          </form>
        )}
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
