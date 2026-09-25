import React, { useState } from 'react';
import { 
  Building2, 
  Cpu, 
  Search, 
  ExternalLink, 
  FileText, 
  Send, 
  CheckCircle2, 
  Download, 
  Layers, 
  ShieldCheck,
  PackageCheck,
  Sparkles
} from 'lucide-react';
import { MOCK_VENDORS, MOCK_PRODUCTS } from '../data/mockDatabase';
import { VendorPartner, IndustrialProduct } from '../types';
import { saveFormSubmission } from '../utils/formStorage';

interface IndustryViewProps {
  onRegisterTraining: (courseId?: string) => void;
  onNavigate: (tab: any) => void;
}

export const IndustryView: React.FC<IndustryViewProps> = ({ onRegisterTraining, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<IndustrialProduct | null>(null);

  // Request a Technology / Product Form State
  const [reqCompany, setReqCompany] = useState('');
  const [reqContactName, setReqContactName] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [reqPhone, setReqPhone] = useState('');
  const [reqType, setReqType] = useState('EDA Tool Licensing');
  const [reqDetails, setReqDetails] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);
  const [industryTrackingId, setIndustryTrackingId] = useState('');

  const categories = ['All', 'FPGA & Silicon', 'EDA Software', 'Test & Measurement', 'Embedded Platforms'];

  const filteredVendors = MOCK_VENDORS.filter((v) => {
    const matchesCat = selectedCategory === 'All' || v.category === selectedCategory;
    const matchesSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.products.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqCompany || !reqEmail) return;

    const saved = saveFormSubmission({
      pageSource: 'industry',
      pageLabel: 'Industry Solutions',
      formTitle: 'EDA Tool & Hardware Requisition',
      senderName: reqContactName || reqCompany,
      senderEmail: reqEmail,
      senderPhone: reqPhone,
      organizationOrCollege: reqCompany,
      subject: `${reqType} Requisition - ${reqCompany}`,
      message: reqDetails || `Requisition for ${reqType}`,
      formData: {
        company: reqCompany,
        contactPerson: reqContactName,
        category: reqType,
        details: reqDetails,
        phone: reqPhone,
        submittedAt: new Date().toISOString(),
      },
      status: 'New',
      priority: 'High',
      notes: `EDA / Industrial hardware enquiry for ${reqType}. Forwarded to FAE and procurement desks.`,
    });

    setIndustryTrackingId(saved.id);
    setRequestSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* HEADER SECTION */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00828A] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Industrial Technology & Engineering Solutions</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] font-display">
          Global Partner Distribution & Technology Bridge
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Silphor Technologies acts as an international bridge connecting global technology vendors with industry requirements in Electronics, Power Electronics, Semiconductor, VLSI, and Embedded Systems. We provide hardware, software, EDA tools, and bespoke engineering procurement.
        </p>
      </section>

      {/* 3-PILLAR INDUSTRIAL BRIDGE OVERVIEW */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00828A] flex items-center justify-center mb-4">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1.5">
            01. Global Partner Distributors
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Authorized channel distribution for tier-1 EDA software, FPGA evaluation boards, silicon IP, and semiconductor test equipment with full local technical support.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0B2545] flex items-center justify-center mb-4">
            <PackageCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1.5">
            02. Product Catalogue & Licensing
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Complete vendor library and product catalogue for research labs, university centers of excellence, and automotive hardware design houses.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1.5">
            03. Industry-Aligned Programs
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Custom corporate training for enterprise workforces in RTL Design, High-Speed Multilayer PCB layout, and SiC/GaN power electronics.
          </p>
        </div>
      </section>

      {/* VENDOR DIRECTORY & PROFILES */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#00828A]">
              Vendor Directory
            </span>
            <h2 className="text-2xl font-bold text-[#0B2545] font-display mt-0.5">
              Authorized Technology Vendors & Profiles
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Explore global silicon and EDA vendors represented and distributed by Silphor Technologies.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search vendor or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#0B2545] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:border-[#00828A] transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-[#0B2545]">{vendor.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
                    {vendor.country}
                  </span>
                </div>

                <div className="text-xs text-[#00828A] font-semibold mb-2">
                  {vendor.partnershipType}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{vendor.description}</p>

                {/* Products distributed */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Hardware & EDA Lines Distributed:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {vendor.products.map((p, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-700"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <a
                  href={vendor.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-500 hover:text-[#00828A] flex items-center gap-1 font-semibold"
                >
                  <span>Vendor Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={() => {
                    setReqDetails(`Enquiry regarding: ${vendor.name} products.`);
                    const el = document.getElementById('request-technology-form');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3 py-1 bg-teal-50 text-[#00828A] hover:bg-teal-100 rounded-md font-bold transition-colors"
                >
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT CATALOGUE & VENDOR LIBRARY */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#00828A]">
            Vendor Library
          </span>
          <h2 className="text-2xl font-bold text-[#0B2545] font-display mt-0.5">
            Industrial Hardware & EDA Product Catalogue
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select an industrial product to review technical specifications and request datasheets.
          </p>
        </div>

        {downloadNotice && (
          <div className="p-3 bg-teal-50 border border-teal-200 text-teal-800 rounded-xl text-xs font-semibold flex items-center justify-between">
            <span>{downloadNotice}</span>
            <button onClick={() => setDownloadNotice(null)} className="underline text-[11px]">Dismiss</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#00828A]">
                      {prod.category} &bull; {prod.vendorName}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">{prod.name}</h3>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
                    {prod.stockStatus}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{prod.summary}</p>

                {/* Specs */}
                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(prod.specs).map(([key, val]) => (
                    <div key={key}>
                      <span className="text-slate-400 text-[10px] block">{key}:</span>
                      <span className="font-semibold text-slate-800">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Lead time: <strong>{prod.leadTime}</strong></span>
                <div className="flex items-center gap-2">
                  {prod.datasheetAvailable && (
                    <button
                      onClick={() => {
                        setDownloadNotice(`Official Datasheet for ${prod.name} ready for download.`);
                        setTimeout(() => setDownloadNotice(null), 3000);
                      }}
                      className="px-2.5 py-1 text-xs border border-slate-300 rounded text-slate-700 hover:bg-slate-100 flex items-center gap-1 font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Datasheet</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setReqDetails(`Procurement enquiry for ${prod.name} (${prod.vendorName})`);
                      const el = document.getElementById('request-technology-form');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-3 py-1 bg-[#00828A] text-white hover:bg-[#007077] rounded font-semibold"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REQUEST A TECHNOLOGY / PRODUCT FACILITY FORM */}
      <section
        id="request-technology-form"
        className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6"
      >
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00828A]">
            Procurement & Solutions Enquiry
          </span>
          <h2 className="text-2xl font-bold text-[#0B2545] font-display mt-0.5">
            Request a Technology / Product Facility
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Submit your industrial requirement for specialized semiconductor silicon, EDA tool floating licenses, or FPGA prototype hardware.
          </p>
        </div>

        {requestSubmitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-emerald-950 font-display">
              Industrial Technology Enquiry Logged Successfully
            </h3>
            <p className="text-xs text-emerald-800 max-w-md mx-auto">
              Our Technical Application Engineering team has received your requisition{' '}
              <span className="font-mono font-bold text-emerald-950">[{industryTrackingId || 'SUB-2026-IND'}]</span>. It has been recorded in the central Administrative Portal. A Field Application Engineer (FAE) will contact you within 24 business hours with datasheet proposals and vendor pricing.
            </p>
            <button
              onClick={() => setRequestSubmitted(false)}
              className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-lg hover:bg-emerald-800"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleRequestSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Company / Organization Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aether Silicon Pvt Ltd"
                  value={reqCompany}
                  onChange={(e) => setReqCompany(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Contact Person Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Nair, Lead Hardware Eng"
                  value={reqContactName}
                  onChange={(e) => setReqContactName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Corporate Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="rajesh.nair@aethersilicon.com"
                  value={reqEmail}
                  onChange={(e) => setReqEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Mobile / Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98450 00000"
                  value={reqPhone}
                  onChange={(e) => setReqPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">Requirement Category</label>
                <select
                  value={reqType}
                  onChange={(e) => setReqType(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                >
                  <option>EDA Tool Floating Licenses (QuestaSim, PrimeTime, Innovus)</option>
                  <option>FPGA Prototyping Hardware (Xilinx Kria / Zynq / Artix)</option>
                  <option>Power Semiconductor Modules (SiC / GaN / Drivers)</option>
                  <option>Test & Measurement Instrumentation (Keysight / Tektronix)</option>
                  <option>Custom Silicon / ASIC IP Procurement</option>
                  <option>Corporate Workforce Training Alignment (RTL & PCB)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Specific Technology & Quantity Details *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail the target operating parameters, seat count, lead time requirement, or specific part numbers..."
                  value={reqDetails}
                  onChange={(e) => setReqDetails(e.target.value)}
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
                <span>Submit Technology Request</span>
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
