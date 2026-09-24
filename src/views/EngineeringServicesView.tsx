import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  MapPin, 
  Clock, 
  Cpu, 
  Award,
  Sparkles
} from 'lucide-react';
import { MOCK_ENGINEER_REQUIREMENTS } from '../data/mockDatabase';
import { EngineerRequirement } from '../types';

export const EngineeringServicesView: React.FC = () => {
  const [requirementsList, setRequirementsList] = useState<EngineerRequirement[]>(
    MOCK_ENGINEER_REQUIREMENTS
  );

  // Form State
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [roleTitle, setRoleTitle] = useState('Senior Physical Design Engineer');
  const [domain, setDomain] = useState<'VLSI Design' | 'Embedded Systems' | 'Power Electronics' | 'Semiconductor Device' | 'PCB Hardware'>('VLSI Design');
  const [positionsCount, setPositionsCount] = useState(2);
  const [experienceRequired, setExperienceRequired] = useState('3-5 Years');
  const [skillsText, setSkillsText] = useState('Innovus, PrimeTime, 7nm FinFET, CTS');
  const [location, setLocation] = useState('Bengaluru (Hybrid)');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactEmail) return;

    const newReq: EngineerRequirement = {
      id: `req-${Date.now()}`,
      companyName,
      domain,
      roleTitle,
      positionsCount: Number(positionsCount),
      experienceRequired,
      requiredSkills: skillsText.split(',').map((s) => s.trim()),
      location,
      status: 'Open',
      dateSubmitted: new Date().toISOString().split('T')[0],
    };

    setRequirementsList([newReq, ...requirementsList]);
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* HEADER */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00828A] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Skilled Technical Resources & Staffing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] font-display">
          Skilled Engineer Deputation & Requirement Management
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Silphor Technologies provides high-caliber engineering resources across Electronics, Power Electronics, Semiconductor, VLSI, and Embedded Systems. We supply Electronics Engineers, Field Application Engineers (FAEs), Application, Design, and Testing Specialists to accelerate your development milestones.
        </p>
      </section>

      {/* 4 CORE RESOURCE CATEGORIES */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Electronics Engineers',
            desc: 'Board bring-up, schematic capture, analog/digital circuit validation, and component lifecycle management.',
            skills: ['Altium Designer', 'Lab Oscilloscopes', 'BOM Optimization', 'EMC Testing'],
          },
          {
            title: 'Field Application Engineers (FAE)',
            desc: 'Bridging silicon vendor product lines with customer design-in wins, technical troubleshooting, and SDK onboarding.',
            skills: ['Customer Demos', 'MCU/FPGA SDKs', 'Driver Porting', 'Design-In Support'],
          },
          {
            title: 'ASIC / VLSI Design Engineers',
            desc: 'RTL architecture, synthesizable Verilog, SystemVerilog UVM verification, and physical timing closure.',
            skills: ['Design Compiler', 'PrimeTime', 'Innovus', 'SystemVerilog/UVM'],
          },
          {
            title: 'Testing & Post-Silicon Engineers',
            desc: 'Automated test equipment (ATE), boundary scan, JTAG, wafer-level testing, and characterization across PVT corners.',
            skills: ['ATE Platforms', 'Python Test Scripting', 'Logic Analyzers', 'Failure Analysis'],
          },
        ].map((res, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00828A] flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{res.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{res.desc}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1">
              {res.skills.map((s, idx) => (
                <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* SUBMISSION FORM FOR INDUSTRY REQUIREMENTS */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00828A]">
            Corporate Talent Requisition
          </span>
          <h2 className="text-2xl font-bold text-[#0B2545] font-display mt-0.5">
            Industry Requirement Submission Form
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Submit your hiring requisition for skilled engineers. Our talent advisory team will match certified pre-vetted engineers within 48 hours.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-emerald-950 font-display">
              Skilled Engineer Requisition Successfully Registered
            </h3>
            <p className="text-xs text-emerald-800 max-w-md mx-auto">
              Our Technical Staffing Lead will contact <strong>{contactEmail}</strong> with qualified candidate dossiers and schedule technical screening calls.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-lg hover:bg-emerald-800"
            >
              Submit Another Requisition
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Hiring Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Renesas Design Center"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Corporate HR / Tech Lead Email *</label>
                <input
                  type="email"
                  required
                  placeholder="hr@renesas-talent.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Contact Phone</label>
                <input
                  type="tel"
                  placeholder="+91 98450 11111"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Technical Domain *</label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value as any)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                >
                  <option value="VLSI Design">VLSI Design & Physical Implementation</option>
                  <option value="Embedded Systems">Embedded Systems & Firmware</option>
                  <option value="Power Electronics">Power Electronics & Inverters</option>
                  <option value="PCB Hardware">High-Speed PCB Hardware</option>
                  <option value="Semiconductor Device">Semiconductor Device Characterization</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Target Role Title *</label>
                <input
                  type="text"
                  required
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Positions Count</label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={positionsCount}
                    onChange={(e) => setPositionsCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Experience Level</label>
                  <select
                    value={experienceRequired}
                    onChange={(e) => setExperienceRequired(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                  >
                    <option>0-2 Years (Fresh Certified)</option>
                    <option>2-5 Years (Mid-level)</option>
                    <option>5-10 Years (Senior Lead)</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">Required EDA / Technical Skills (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Synopsys PrimeTime, Cadence Innovus, 7nm FinFET, TCL"
                  value={skillsText}
                  onChange={(e) => setSkillsText(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">Work Location & Deployment Model</label>
                <input
                  type="text"
                  placeholder="e.g. Bengaluru On-site / Hyderabad Hybrid / Remote Contract"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Staffing Requisition</span>
              </button>
            </div>
          </form>
        )}
      </section>

      {/* ACTIVE REQUISITION PIPELINE */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#00828A]">
            Current Pipeline
          </span>
          <h2 className="text-2xl font-bold text-[#0B2545] font-display mt-0.5">
            Active Industrial Requisitions Managed by Silphor
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Live requisitions submitted by partner semiconductor houses currently undergoing talent matching.
          </p>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Req ID</th>
                <th className="p-3">Client Company</th>
                <th className="p-3">Role & Domain</th>
                <th className="p-3">Positions</th>
                <th className="p-3">Experience</th>
                <th className="p-3">Key Skills</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requirementsList.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/60">
                  <td className="p-3 font-mono font-bold text-slate-700">{req.id}</td>
                  <td className="p-3 font-semibold text-slate-900">{req.companyName}</td>
                  <td className="p-3">
                    <div className="font-bold text-[#0B2545]">{req.roleTitle}</div>
                    <div className="text-[11px] text-[#00828A]">{req.domain}</div>
                  </td>
                  <td className="p-3 font-mono font-bold">{req.positionsCount}</td>
                  <td className="p-3 text-slate-600">{req.experienceRequired}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {req.requiredSkills.map((s, idx) => (
                        <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
