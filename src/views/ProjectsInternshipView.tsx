import React, { useState } from 'react';
import { 
  Briefcase, 
  Cpu, 
  Send, 
  CheckCircle2, 
  Calendar, 
  Award, 
  Sparkles, 
  Layers, 
  Code2, 
  ExternalLink 
} from 'lucide-react';
import { saveFormSubmission } from '../utils/formStorage';

export const ProjectsInternshipView: React.FC = () => {
  const [internName, setInternName] = useState('');
  const [internEmail, setInternEmail] = useState('');
  const [internCollege, setInternCollege] = useState('');
  const [internDomain, setInternDomain] = useState('VLSI Physical Design & STA');
  const [internDuration, setInternDuration] = useState('6 Months (Full-Time Tape-Out)');
  const [internshipCategory, setInternshipCategory] = useState<'paid' | 'unpaid'>('paid');
  const [submitted, setSubmitted] = useState(false);
  const [internTrackingId, setInternTrackingId] = useState('');

  const capstoneProjects = [
    {
      title: 'RISC-V 32I Pipelined Core with AXI4 Bus Interface',
      domain: 'RTL & UVM Verification',
      tools: 'Verilog HDL, Siemens QuestaSim, Synopsys VCS',
      highlights: '5-stage in-order pipeline, hazard detection unit, branch predictor, UVM 1.2 testbench achieving 100% functional coverage.',
      status: 'Verified & Synthesized',
    },
    {
      title: '7nm FinFET Quad-Core Cryptographic Accelerator Signoff',
      domain: 'Physical Implementation',
      tools: 'Cadence Innovus, Synopsys PrimeTime, Calibre',
      highlights: 'Full floorplan with multi-voltage domains, low-power clock gating, CTS with under 15ps skew, zero DRC/LVS violations at signoff.',
      status: 'Ready for MPW Shuttle',
    },
    {
      title: 'Automotive 800V SiC Traction Inverter Gate Driver Board',
      domain: 'Power Electronics & PCB',
      tools: 'Altium Designer, LTspice, HyperLynx',
      highlights: '6-layer high-voltage isolated PCB, desaturation short-circuit protection under 1.2μs, planar transformer with low inter-winding capacitance.',
      status: 'Hardware Fabricated & Tested',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!internName || !internEmail) return;

    const saved = saveFormSubmission({
      pageSource: 'projects-internship',
      pageLabel: 'Projects & Internships',
      formTitle: 'IEEE Internship & Academic Project Application',
      senderName: internName,
      senderEmail: internEmail,
      organizationOrCollege: internCollege,
      subject: `Internship Application: ${internDomain} (${internDuration})`,
      message: `Applicant from ${internCollege} applying for ${internDomain} internship (${internDuration}).`,
      formData: {
        internName,
        internEmail,
        internCollege,
        internDomain,
        internDuration,
        internshipCategory,
        submittedAt: new Date().toISOString(),
      },
      status: 'New',
      priority: 'Medium',
      notes: `Internship applicant from ${internCollege}. Queue online technical screening test.`,
    });

    setInternTrackingId(saved.id);
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* HEADER */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00828A] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hands-on Industry Immersion</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] font-display">
          Industrial Projects & Internship Programs
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Gain real-world experience on live multi-project wafer (MPW) silicon tape-outs, FPGA emulation platforms, and automotive electronics. Silphor offers accredited 3-month and 6-month industrial internship cohorts.
        </p>
      </section>

      {/* 3 CORE CAPSTONE HIGHLIGHTS */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#00828A]">
            Student & Faculty Showcases
          </span>
          <h2 className="text-2xl font-bold text-[#0B2545] font-display mt-0.5">
            Featured Capstone Projects & Silicon Demonstrations
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real hardware and silicon IP developed during our intensive industrial internship programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capstoneProjects.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-[#00828A] uppercase tracking-wider">
                  {p.domain}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">{p.title}</h3>
                <div className="text-[11px] text-slate-500 font-mono mb-3">Tools: {p.tools}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{p.highlights}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  {p.status}
                </span>
                <span className="text-[#00828A] font-semibold text-[11px]">View Architecture</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERNSHIP APPLICATION FORM */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00828A]">
            Cohort Admissions
          </span>
          <h2 className="text-2xl font-bold text-[#0B2545] font-display mt-0.5">
            Apply for Silphor Industrial Internship
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Applications are accepted from B.E / B.Tech / M.Tech / M.S students in ECE, EEE, and Microelectronics.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {(['paid', 'unpaid'] as const).map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setInternshipCategory(category)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold capitalize transition-colors ${internshipCategory === category ? 'bg-[#00828A] text-white border-[#00828A]' : 'bg-white text-slate-600 border-slate-300 hover:border-[#00828A]'}`}
              >
                {category} Internship
              </button>
            ))}
          </div>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-emerald-950 font-display">
              Internship Application Registered
            </h3>
            <p className="text-xs text-emerald-800 max-w-md mx-auto">
              Our academic selection committee has recorded your application{' '}
              <span className="font-mono font-bold text-emerald-950">[{internTrackingId || 'SUB-2026-INT'}]</span> into Admin Governance. You will receive an invitation to the online technical screening test at <strong>{internEmail}</strong>.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-lg hover:bg-emerald-800"
            >
              Submit Another Application
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Iyer"
                  value={internName}
                  onChange={(e) => setInternName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="vikram.iyer@college.edu"
                  value={internEmail}
                  onChange={(e) => setInternEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">College / University Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. RV College of Engineering, Bengaluru"
                  value={internCollege}
                  onChange={(e) => setInternCollege(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Internship Specialization *</label>
                <select
                  value={internDomain}
                  onChange={(e) => setInternDomain(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                >
                  <option>VLSI Physical Design & STA</option>
                  <option>RTL Design & SystemVerilog / UVM</option>
                  <option>High-Speed Multilayer PCB Layout</option>
                  <option>Embedded Firmware & ARM Cortex</option>
                  <option>Power Electronics & Inverters</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">Internship Duration</label>
                <select
                  value={internDuration}
                  onChange={(e) => setInternDuration(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                >
                  <option>6 Months (Full-Time Tape-Out Project)</option>
                  <option>3 Months (Summer Intensive Project)</option>
                  <option>2 Months (Winter FastTrack)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">Internship Category</label>
                <select
                  value={internshipCategory}
                  onChange={(e) => setInternshipCategory(e.target.value as 'paid' | 'unpaid')}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                >
                  <option value="paid">Paid Internship</option>
                  <option value="unpaid">Unpaid Internship</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Internship Application</span>
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
