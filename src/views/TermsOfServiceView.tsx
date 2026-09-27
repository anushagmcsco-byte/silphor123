import React, { useState } from 'react';
import {
  FileText,
  Shield,
  Scale,
  Cpu,
  Terminal,
  Award,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Printer,
  ChevronRight,
  BookOpen,
  Mail,
  MapPin,
  Phone,
  Search,
  ExternalLink,
  HelpCircle,
  Building2
} from 'lucide-react';
import { MainNavId } from '../types';

interface TermsOfServiceViewProps {
  onNavigate: (tab: MainNavId) => void;
}

export const TermsOfServiceView: React.FC<TermsOfServiceViewProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('acceptance');

  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms', icon: Scale },
    { id: 'eda-licensing', title: '2. EDA Tools & Software Licensing', icon: Cpu },
    { id: 'workstation-aup', title: '3. Cloud EDA Workstation AUP', icon: Terminal },
    { id: 'academic-cert', title: '4. Academic Programs & Certification', icon: Award },
    { id: 'ip-rights', title: '5. Intellectual Property & Silicon RTL', icon: Shield },
    { id: 'fees-refunds', title: '6. Payment, Fees & Cancellation', icon: CheckCircle2 },
    { id: 'confidentiality', title: '7. Confidentiality & NDA Standards', icon: FileText },
    { id: 'liability', title: '8. Disclaimer & Tapeout Limitations', icon: AlertTriangle },
    { id: 'jurisdiction', title: '9. Governing Law & Bengaluru Jurisdiction', icon: Building2 },
    { id: 'contact-legal', title: '10. Legal Notice & Inquiries', icon: Mail },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#050D1A] min-h-screen text-slate-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-[#081B33] via-[#051324] to-[#050D1A] border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#00828A_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00828A]/20 border border-[#00828A]/40 text-[#38BDF8] text-xs font-semibold uppercase tracking-wider">
                <Scale className="w-3.5 h-3.5" />
                <span>Legal & Regulatory Framework</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
                Enterprise & Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00828A] to-[#38BDF8]">Terms of Service</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                These Terms of Service govern all enterprise distributions, Electronic Design Automation (EDA) tool access, cloud virtual workstation allocations, student academic enrollments, and professional staffing engagements conducted by Silphor Technologies.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Printer className="w-4 h-4 text-[#38BDF8]" />
                <span>Print Copy</span>
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00828A] to-[#00A896] hover:from-[#00A896] hover:to-[#00828A] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Mail className="w-4 h-4" />
                <span>Consult Legal Counsel</span>
              </button>
            </div>
          </div>

          {/* Metadata Strip */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Entity:</span>
              <strong className="text-white font-semibold">Silphor Technologies</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Effective Date:</span>
              <strong className="text-white font-semibold">September 24, 2026</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Governing Law:</span>
              <strong className="text-white font-semibold">Karnataka / Indian Law</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Jurisdiction:</span>
              <strong className="text-white font-semibold">Bengaluru Courts</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar Table of Contents */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-[#0B1E36] rounded-2xl p-5 border border-slate-800/80 sticky top-24 space-y-5 shadow-xl">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#38BDF8]" />
                  <span>Table of Contents</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">Jump to specific contractual terms</p>
              </div>

              {/* In-page search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Filter terms (e.g. EDA, refund, IP)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#07172B] border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-[#38BDF8]"
                />
              </div>

              {/* Navigation Items */}
              <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
                {sections
                  .filter((sec) => sec.title.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((sec) => {
                    const Icon = sec.icon;
                    const isSelected = activeSection === sec.id;
                    return (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        onClick={() => setActiveSection(sec.id)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                          isSelected
                            ? 'bg-[#00828A]/20 text-[#38BDF8] font-bold border border-[#00828A]/40'
                            : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#38BDF8]' : 'text-slate-400'}`} />
                          <span className="truncate">{sec.title}</span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#38BDF8]' : 'text-slate-600'}`} />
                      </a>
                    );
                  })}
              </nav>

              {/* Direct Help Callout */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <HelpCircle className="w-4 h-4 text-[#38BDF8]" />
                  <span>Have Contractual Queries?</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Our compliance team provides clarifications for corporate master service agreements (MSAs) and vendor contracts.
                </p>
                <div className="pt-1">
                  <a
                    href="mailto:silphortechnologies@gmail.com?subject=Legal%20Query%20re:%20Terms%20of%20Service"
                    className="text-xs text-[#38BDF8] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>silphortechnologies@gmail.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Detailed Sections */}
          <main className="lg:col-span-8 space-y-10">
            {/* Section 1 */}
            <article id="acceptance" className="bg-[#0B1E36] rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00828A]/20 text-[#38BDF8] border border-[#00828A]/30">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display">1. Acceptance of Terms & Regulatory Scope</h2>
                  <p className="text-xs text-slate-400">Binding legal contract between you and Silphor Technologies</p>
                </div>
              </div>
              <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                <p>
                  By accessing, browsing, enrolling in, or using any software, cloud computing environment, classroom instruction, semiconductor design data, or physical facility operated by <strong>Silphor Technologies</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), having its registered operations at <strong>#45 East Road, Malleswaram, Bangalore, Karnataka - 560003, India</strong>, you (&quot;User&quot;, &quot;Student&quot;, &quot;Enterprise Client&quot;, or &quot;Subscriber&quot;) agree to be legally bound by these Terms of Service in full.
                </p>
                <p>
                  If you are entering into this agreement on behalf of a corporate entity, educational university, or research laboratory, you affirm that you have full legal authority to bind such entity to these provisions. If you do not accept all provisions, you must immediately terminate access to our portals and services.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-900/80 border-l-4 border-[#00828A] text-xs text-slate-300">
                  <strong className="text-white block font-semibold mb-1">Dual-Audience Application:</strong>
                  These terms encompass both <em>Individual Academic Users</em> (students, researchers, and interns) and <em>Enterprise Commercial Clients</em> (fabless semiconductor design firms, IP licensors, and staffing recruitment partners).
                </div>
              </div>
            </article>

            {/* Section 2 */}
            <article id="eda-licensing" className="bg-[#0B1E36] rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00828A]/20 text-[#38BDF8] border border-[#00828A]/30">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display">2. EDA Tools & Software Licensing</h2>
                  <p className="text-xs text-slate-400">Electronic Design Automation third-party compliance</p>
                </div>
              </div>
              <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                <p>
                  Silphor Technologies acts as an authorized distribution partner, systems integrator, and academic training bridge for proprietary Electronic Design Automation (EDA) software suites, FPGA synthesis toolchains, emulation accelerators, and Process Design Kits (PDKs).
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs">
                  <li>
                    <strong>Authorized Educational & Commercial Use:</strong> Software licenses made available inside our physical laboratories or cloud virtual machines are licensed strictly for educational coursework, authorized verification research, or stipulated client testbenches.
                  </li>
                  <li>
                    <strong>Prohibition of Reverse Engineering:</strong> Users shall not decompile, reverse engineer, disassemble, trace proprietary bitstreams, crack FlexLM / license server daemons, or attempt to circumvent digital rights management protections on any EDA tool.
                  </li>
                  <li>
                    <strong>Third-Party Vendor End-User License Agreements (EULAs):</strong> Use of specific industry tools (including Synopsys&reg;, Cadence&reg;, Siemens EDA / Mentor Graphics&reg;, and Intel / AMD FPGA suites) is subject to the respective licensor&apos;s master terms. Breach of vendor EULAs constitutes immediate grounds for termination and civil liability.
                  </li>
                </ul>
              </div>
            </article>

            {/* Section 3 */}
            <article id="workstation-aup" className="bg-[#0B1E36] rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00828A]/20 text-[#38BDF8] border border-[#00828A]/30">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display">3. Cloud EDA Workstation Acceptable Use Policy (AUP)</h2>
                  <p className="text-xs text-slate-400">Rules governing high-performance Linux simulation nodes</p>
                </div>
              </div>
              <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                <p>
                  When granted access to remote Linux cloud desktop containers, EDA compute pods, or GPU simulation clusters, users must strictly conform to our compute utilization guidelines:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-emerald-200">
                    <strong className="text-emerald-400 block font-bold mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Permitted Activities
                    </strong>
                    RTL coding, SystemVerilog verification, UVM testbench debugging, logic synthesis, static timing analysis (STA), FPGA bitstream compilation, and high-speed PCB schematics.
                  </div>
                  <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-800/40 text-rose-200">
                    <strong className="text-rose-400 block font-bold mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" /> Strictly Forbidden
                    </strong>
                    Cryptocurrency mining, network port scanning, hosting unauthorized web proxies, running automated scraping bots, storing pirated media, or sharing credentials with non-enrolled persons.
                  </div>
                </div>
                <p className="text-xs text-slate-400">
                  Cloud compute sessions are automatically monitored by administrative audit telemetry. Sessions violating the AUP will be killed immediately, and the associated student or corporate account will be permanently banned with zero refund.
                </p>
              </div>
            </article>

            {/* Section 4 */}
            <article id="academic-cert" className="bg-[#0B1E36] rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00828A]/20 text-[#38BDF8] border border-[#00828A]/30">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display">4. Academic Programs, Assessments & Certifications</h2>
                  <p className="text-xs text-slate-400">Credentialing, lab milestones, and grading honesty</p>
                </div>
              </div>
              <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                <p>
                  Silphor Technologies issues digitally verifiable, cryptographic certificates of completion and competency upon rigorous fulfillment of curriculum benchmarks:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li><strong>Attendance Criterion:</strong> Minimum 85% verified session attendance (physical or virtual).</li>
                  <li><strong>Lab Tapeout Benchmarks:</strong> Timely completion of scheduled RTL lab assignments, DFT scan chain insertions, or physical place-and-route milestones.</li>
                  <li><strong>Academic Integrity:</strong> Plagiarism of Verilog/VHDL code, uncredited copying of open-source SoC repositories, or proxy exam attendance will result in immediate disqualification without certification.</li>
                  <li><strong>Revocation Authority:</strong> The Company reserves the unilateral authority to revoke any issued certificate if discovered to have been obtained through fraud, misrepresentation, or academic dishonesty.</li>
                </ul>
              </div>
            </article>

            {/* Section 5 */}
            <article id="ip-rights" className="bg-[#0B1E36] rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00828A]/20 text-[#38BDF8] border border-[#00828A]/30">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display">5. Intellectual Property Rights & Silicon RTL</h2>
                  <p className="text-xs text-slate-400">Ownership of instructional collateral, student code, and client IP</p>
                </div>
              </div>
              <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                <p>
                  <strong>Company Proprietary Assets:</strong> All curricula, instructional slides, lab manuals, proprietary reference design testbenches, verification IP (VIP) models, and web application code are the exclusive intellectual property of Silphor Technologies. Unauthorized distribution, public GitHub republishing, or resale is strictly actionable under copyright law.
                </p>
                <p>
                  <strong>Student Project Rights:</strong> Students retain ownership of original RTL code and circuit layouts created independently during coursework, subject to the non-infringement of underlying vendor PDKs and reference scripts provided by the Company.
                </p>
                <p>
                  <strong>Enterprise Client Confidential IP:</strong> In corporate training or staffing scenarios, client-provided design data, proprietary standard cell libraries, and internal tapeout specifications remain the sole property of the client under strict bilateral NDA covenants.
                </p>
              </div>
            </article>

            {/* Section 6 */}
            <article id="fees-refunds" className="bg-[#0B1E36] rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00828A]/20 text-[#38BDF8] border border-[#00828A]/30">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display">6. Payment, Fees, Taxes & Cancellation Policy</h2>
                  <p className="text-xs text-slate-400">Financial transparency and transaction terms</p>
                </div>
              </div>
              <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                <p>
                  All program fees, enterprise tool licensing invoices, and corporate placement retainer costs are quoted in Indian Rupees (INR) or designated foreign currencies (USD/EUR) exclusive of applicable Goods and Services Tax (GST @ 18%), which shall be collected in accordance with Indian statutory tax requirements.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                  <strong className="text-white block font-semibold">Refund Schedule for Course Cohorts:</strong>
                  <ul className="list-disc pl-5 space-y-1 text-slate-300">
                    <li><strong>Written cancellation &gt;7 days prior to cohort kickoff:</strong> 85% refund (15% administrative processing fee withheld).</li>
                    <li><strong>Cancellation within 7 days prior to kickoff:</strong> 50% refund.</li>
                    <li><strong>Post-kickoff or access to cloud EDA workstation:</strong> Strictly non-refundable due to pre-provisioned cloud server reservation fees and vendor license seat allocation.</li>
                  </ul>
                </div>
              </div>
            </article>

            {/* Section 7 */}
            <article id="confidentiality" className="bg-[#0B1E36] rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00828A]/20 text-[#38BDF8] border border-[#00828A]/30">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display">7. Confidentiality & Non-Disclosure (NDA) Standards</h2>
                  <p className="text-xs text-slate-400">Protection of trade secrets and foundry design rules</p>
                </div>
              </div>
              <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                <p>
                  Users acknowledge that semiconductor design rules, foundry DRM files, PDK parameters, and commercial EDA compiler scripts contain proprietary trade secrets. Users agree to keep all non-public technical data strictly confidential, not to screenshot or extract SPICE simulation models, and not to reveal proprietary vendor pricing models.
                </p>
              </div>
            </article>

            {/* Section 8 */}
            <article id="liability" className="bg-[#0B1E36] rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00828A]/20 text-[#38BDF8] border border-[#00828A]/30">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display">8. Disclaimer of Warranties & Silicon Tapeout Liability Limitations</h2>
                  <p className="text-xs text-slate-400">Crucial limitation of engineering risks</p>
                </div>
              </div>
              <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                <p className="uppercase text-xs tracking-wider text-amber-400 font-bold">
                  Important Notice on Tapeout & Fabrication Outcomes:
                </p>
                <p>
                  While Silphor Technologies provides cutting-edge instruction, industry-grade tool access, and verified design flows, the Company does <strong>NOT</strong> guarantee that physical silicon chips manufactured at third-party foundries (e.g. TSMC, GlobalFoundries, Intel Foundry Services) will yield zero post-silicon defects, latch-up failures, or timing violations.
                </p>
                <p>
                  In no event shall Silphor Technologies, its directors, instructors, or affiliates be liable for indirect, punitive, incidental, or consequential damages, including loss of silicon mask fabrication costs, wafer lot scrappage, or loss of commercial contracts. The Company&apos;s total aggregate liability under any cause of action shall never exceed the total fee paid by the user to Silphor Technologies during the preceding six (6) months.
                </p>
              </div>
            </article>

            {/* Section 9 */}
            <article id="jurisdiction" className="bg-[#0B1E36] rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00828A]/20 text-[#38BDF8] border border-[#00828A]/30">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display">9. Governing Law, Arbitration & Bengaluru Jurisdiction</h2>
                  <p className="text-xs text-slate-400">Dispute resolution and judicial venue</p>
                </div>
              </div>
              <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                <p>
                  These Terms of Service and any contractual dispute arising from them shall be governed, interpreted, and construed in accordance with the substantive laws of the <strong>Republic of India</strong> and the State of Karnataka, without giving effect to conflicts of law principles.
                </p>
                <p>
                  Any dispute, controversy, or claim shall first be submitted to mutual amicable consultation for thirty (30) days. Failing resolution, it shall be referred to and finally resolved by sole arbitration under the Indian Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall be <strong>Bengaluru, Karnataka, India</strong>, and the proceedings shall be conducted in the English language. The competent civil courts of Bengaluru shall have exclusive territorial jurisdiction.
                </p>
              </div>
            </article>

            {/* Section 10 */}
            <article id="contact-legal" className="bg-[#0B1E36] rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-5 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00828A]/20 text-[#38BDF8] border border-[#00828A]/30">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display">10. Official Legal Notice & Entity Inquiries</h2>
                  <p className="text-xs text-slate-400">Formal legal correspondence addresses</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-800/80 pt-4 text-xs">
                <div className="space-y-2">
                  <div className="font-semibold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#00828A]" />
                    <span>Registered Headquarters</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-6">
                    Silphor Technologies<br />
                    #45 East Road, Malleswaram<br />
                    Bangalore, Karnataka - 560003, India<br />
                    <span className="text-[11px] text-teal-400">Landmark: Near 8th Cross Cultural Hub</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="font-semibold text-white flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Direct Telephone & Electronic Channels</span>
                  </div>
                  <div className="space-y-1 text-slate-300 pl-6">
                    <div>Direct Telephone: <a href="tel:+917829455663" className="text-white hover:underline font-mono">+91 7829455663</a></div>
                    <div>General Email: <a href="mailto:silphortechnologies@gmail.com" className="text-[#38BDF8] hover:underline font-mono">silphortechnologies@gmail.com</a></div>
                    <div>Support Email: <a href="mailto:silphortechnologies@gmail.com" className="text-[#38BDF8] hover:underline font-mono">silphortechnologies@gmail.com</a></div>
                  </div>
                </div>
              </div>
            </article>

            {/* Bottom Navigation Ribbon */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
              <button
                onClick={() => onNavigate('privacy-policy')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold flex items-center gap-2 transition-colors"
              >
                <span>Read Privacy Policy</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#38BDF8]" />
              </button>

              <button
                onClick={() => onNavigate('home')}
                className="text-[#38BDF8] hover:underline font-semibold"
              >
                Return to Homepage &rarr;
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
