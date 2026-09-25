import React, { useState } from 'react';
import { 
  BookOpen, 
  Terminal, 
  HelpCircle, 
  Search, 
  FileText, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Cpu,
  Sparkles,
  Send,
  CheckCircle2
} from 'lucide-react';
import { MOCK_FAQS } from '../data/mockDatabase';
import { saveFormSubmission } from '../utils/formStorage';

export const ResourcesView: React.FC = () => {
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('All');
  const [faqSearch, setFaqSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [resourceNotice, setResourceNotice] = useState<string | null>(null);

  // Whitepaper & Manual Request Form State
  const [reqName, setReqName] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [reqPhone, setReqPhone] = useState('');
  const [reqOrg, setReqOrg] = useState('');
  const [reqDocType, setReqDocType] = useState('Synopsys PrimeTime MCMM Script Bundle');
  const [reqNotes, setReqNotes] = useState('');
  const [reqSubmitted, setReqSubmitted] = useState(false);
  const [reqTrackingId, setReqTrackingId] = useState('');

  const showNotice = (msg: string) => {
    setResourceNotice(msg);
    setTimeout(() => setResourceNotice(null), 3500);
  };

  const categories = ['All', 'Training', 'Industrial Solutions', 'Certifications', 'Placements'];

  const filteredFaqs = MOCK_FAQS.filter((f) => {
    const matchesCat = activeFaqCategory === 'All' || f.category === activeFaqCategory;
    const matchesSearch =
      f.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.answer.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const edaGuides = [
    {
      title: 'Synopsys EDA Suite Licensing & Environment Setup',
      tool: 'Design Compiler & PrimeTime',
      os: 'RHEL 8 / Ubuntu 22.04 LTS',
      file: 'synopsys_licensing_env_setup.pdf',
      summary: 'Setting up FlexNet license daemon, LM_LICENSE_FILE variables, and target standard cell .db libraries.',
    },
    {
      title: 'AMD / Xilinx Vivado ML Enterprise Board Support Installation',
      tool: 'Vivado ML Edition 2024.1',
      os: 'Windows 11 / Linux x86_64',
      file: 'xilinx_vivado_kria_board_install.pdf',
      summary: 'Installing cable drivers, Digilent JTAG support, and Kria KV260 / Zynq BSP definition files.',
    },
    {
      title: 'Cadence Innovus Implementation System FastStart',
      tool: 'Innovus 21.1 / Virtuoso',
      os: 'CentOS / Rocky Linux 9',
      file: 'cadence_innovus_pdk_import_guide.pdf',
      summary: 'Configuring LEF/DEF files, Liberty timing models (.lib), and multi-corner multi-mode (MCMM) view definitions.',
    },
  ];

  const blogArticles = [
    {
      title: 'Clock Domain Crossing (CDC) & Metastability in Multi-Gigahertz SoCs',
      author: 'Vikram Joshi (Principal RTL Specialist)',
      readTime: '6 min read',
      date: 'Sep 20, 2026',
      summary: 'Why dual-flop synchronizers fail for fast-to-slow clock domain signals, and how handshake FIFOs with Gray-coded pointers eliminate race conditions.',
    },
    {
      title: 'Silicon Carbide (SiC) vs Silicon IGBTs: Inverter Efficiency Breakdown',
      author: 'Dr. Anand Verma (Power Systems Consultant)',
      readTime: '8 min read',
      date: 'Sep 14, 2026',
      summary: 'Comparing conduction and switching losses in 800V EV traction inverters. Thermal resistance and high-frequency magnetics design implications.',
    },
    {
      title: 'Zero-Slack Timing Closure: Step-by-Step Guide in Synopsys PrimeTime',
      author: 'Dr. R. K. Nambiar (Academic Director)',
      readTime: '10 min read',
      date: 'Sep 05, 2026',
      summary: 'Engineering Change Order (ECO) cycles, buffer sizing, cell relocation, and fixing hold violations across worst-case and best-case PVT corners.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* HEADER */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00828A] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Technical Knowledge Base & Documentation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] font-display">
          Resources, EDA Tool Guides & Technical Articles
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Access verified tool installation guides, deep-dive semiconductor engineering blogs, and answers to frequently asked questions regarding admissions, certifications, and industrial technology bridging.
        </p>

        {resourceNotice && (
          <div className="p-3 bg-teal-50 border border-teal-200 text-teal-800 rounded-xl text-xs font-semibold flex items-center justify-between">
            <span>{resourceNotice}</span>
            <button onClick={() => setResourceNotice(null)} className="underline text-[11px]">Dismiss</button>
          </div>
        )}
      </section>

      {/* SECTION 1: EDA / FPGA SETUP GUIDES */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#00828A]">
            Lab Computing & Toolchains
          </span>
          <h2 className="text-2xl font-bold text-[#0B2545] font-display mt-0.5">
            EDA & FPGA Toolchain Installation Guides
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Step-by-step documentation for deploying industry-standard semiconductor design environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {edaGuides.map((guide, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-slate-100 text-[#0B2545] flex items-center justify-center mb-3">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{guide.title}</h3>
                <div className="text-[11px] text-[#00828A] font-semibold">{guide.tool}</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">OS: {guide.os}</div>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">{guide.summary}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-mono">PDF &bull; Official</span>
                <button
                  onClick={() => showNotice(`Downloading setup guide: ${guide.file}`)}
                  className="px-3 py-1.5 bg-teal-50 text-[#00828A] hover:bg-teal-100 font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Guide</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: BLOG & TECHNICAL ARTICLES */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#00828A]">
            Engineering Insights
          </span>
          <h2 className="text-2xl font-bold text-[#0B2545] font-display mt-0.5">
            Technical Articles & Whitepapers
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Written by senior faculty and field application engineers at Silphor Technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogArticles.map((art, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:border-[#00828A] transition-all"
            >
              <div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                  <span>{art.date}</span> &bull; <span>{art.readTime}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{art.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{art.summary}</p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 font-semibold">{art.author}</span>
                <button
                  onClick={() => showNotice(`Accessing whitepaper archive for: ${art.title}`)}
                  className="text-xs font-bold text-[#00828A] hover:underline"
                >
                  Read Article
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: FAQ */}
      <section className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#00828A]">
              Clear Answers
            </span>
            <h2 className="text-2xl font-bold text-[#0B2545] font-display mt-0.5">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Everything you need to know about our courses, corporate partnerships, and certificate validation.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search FAQ questions..."
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
            />
          </div>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveFaqCategory(c)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                activeFaqCategory === c
                  ? 'bg-[#0B2545] text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-3 pt-2">
          {filteredFaqs.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full text-left p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-xs font-bold text-slate-900">{faq.question}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#00828A] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* TECHNICAL DOCUMENT & EDA SCRIPT REQUISITION FORM */}
      <section className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-[#00828A] text-[11px] font-bold">
              <FileText className="w-3.5 h-3.5" />
              <span>Technical Whitepaper & Manual Dispatch</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B2545] font-display mt-1">
              Request Specific EDA Setup Manual or Engineering Script
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Need comprehensive Vivado BSP setup files, Synopsys PrimeTime MCMM scripts, or high-speed PCB stackup rules? Submit your requisition below.
            </p>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Dispatches to Admin Governance</span>
        </div>

        {reqSubmitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-emerald-950 font-display">
              Technical Resource Requisition Logged
            </h3>
            <p className="text-xs text-emerald-800 max-w-md mx-auto">
              Thank you, <strong>{reqName}</strong>. Your request for <strong>{reqDocType}</strong> has been assigned tracking ID{' '}
              <span className="font-mono font-bold">{reqTrackingId}</span> and queued in the Administrative Portal under the <strong>Resources</strong> page section.
            </p>
            <button
              onClick={() => {
                setReqSubmitted(false);
                setReqNotes('');
              }}
              className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-lg hover:bg-emerald-800 cursor-pointer"
            >
              Request Another Document
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!reqName || !reqEmail) return;

              const saved = saveFormSubmission({
                pageSource: 'resources',
                pageLabel: 'Resources & Technical Guides',
                formTitle: 'EDA Setup Manual & Technical Whitepaper Request',
                senderName: reqName,
                senderEmail: reqEmail,
                senderPhone: reqPhone,
                organizationOrCollege: reqOrg,
                subject: `Resource Request: ${reqDocType}`,
                message: reqNotes || `Requisition for ${reqDocType} by ${reqName} (${reqOrg || 'Independent Engineer'}).`,
                formData: {
                  documentRequested: reqDocType,
                  organization: reqOrg,
                  phone: reqPhone,
                  notes: reqNotes,
                  submittedAt: new Date().toISOString(),
                },
                status: 'New',
                priority: 'Medium',
                notes: `Technical document request from Resources Page for ${reqDocType}. Dispatch verified PDF bundle and instructions.`,
              });

              setReqTrackingId(saved.id);
              setReqSubmitted(true);
              showNotice(`Requisition ${saved.id} submitted! Logged in Admin Governance under Resources.`);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sanjay Deshmukh"
                  value={reqName}
                  onChange={(e) => setReqName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Official or University Email *</label>
                <input
                  type="email"
                  required
                  placeholder="sanjay.d@siliconcore.in"
                  value={reqEmail}
                  onChange={(e) => setReqEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Organization / College</label>
                <input
                  type="text"
                  placeholder="e.g. SiliconCore Technologies"
                  value={reqOrg}
                  onChange={(e) => setReqOrg(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98220 55119"
                  value={reqPhone}
                  onChange={(e) => setReqPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">Requested Whitepaper / Setup Manual *</label>
                <select
                  value={reqDocType}
                  onChange={(e) => setReqDocType(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#00828A] bg-white"
                >
                  <option>Synopsys PrimeTime MCMM Script Bundle & Timing Models</option>
                  <option>AMD / Xilinx Vivado ML Enterprise Board Support Manual</option>
                  <option>Cadence Innovus Implementation FastStart & PDK Setup</option>
                  <option>High-Speed Multilayer PCB Stackup & Impedance Rulebook</option>
                  <option>Silicon Carbide (SiC) 800V EV Inverter Technical Whitepaper</option>
                  <option>RISC-V 5-Stage Pipelined SoC Architecture Verification Guide</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Intended Application & Specific Notes</label>
              <textarea
                rows={3}
                placeholder="Mention tool version (e.g. Innovus 21.1, PrimeTime 2024.03), Linux OS flavor, or university lab requirements..."
                value={reqNotes}
                onChange={(e) => setReqNotes(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Technical Requisition</span>
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
