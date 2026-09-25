import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  UserCheck,
  Server,
  FileCheck2,
  AlertCircle,
  Mail,
  MapPin,
  Phone,
  Search,
  Printer,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  KeyRound,
  ShieldAlert
} from 'lucide-react';
import { MainNavId } from '../types';

interface PrivacyPolicyViewProps {
  onNavigate: (tab: MainNavId) => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('controller');

  const sections = [
    { id: 'controller', title: '1. Data Controller & Scope', icon: ShieldCheck },
    { id: 'data-collected', title: '2. Categories of Data Collected', icon: Database },
    { id: 'purpose', title: '3. Legal Basis & Processing Purpose', icon: FileCheck2 },
    { id: 'dpdp-rights', title: '4. India DPDP Act 2023 Rights', icon: UserCheck },
    { id: 'eda-telemetry', title: '5. Cloud EDA Workstation Telemetry', icon: Server },
    { id: 'sharing-vendors', title: '6. Third-Party Sharing & Zero Resale', icon: Eye },
    { id: 'security-encryption', title: '7. 256-Bit TLS Encryption & Retention', icon: Lock },
    { id: 'cookies', title: '8. Cookies & Session Storage', icon: KeyRound },
    { id: 'grievance-officer', title: '9. Grievance Officer & Redressal', icon: Mail },
    { id: 'updates', title: '10. Policy Amendments & Notifications', icon: AlertCircle },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#050D1A] min-h-screen text-slate-200">
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-[#081B33] via-[#051324] to-[#050D1A] border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#00828A_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00828A]/20 border border-[#00828A]/40 text-[#38BDF8] text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Data Protection & Privacy Architecture</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
                Global Privacy Policy & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00828A] to-[#38BDF8]">DPDP Act 2023 Compliance</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Silphor Technologies is committed to uncompromising standards of student identity protection, intellectual property encryption, cloud EDA session confidentiality, and strict adherence to the Digital Personal Data Protection (DPDP) Act 2023 of India.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Printer className="w-4 h-4 text-[#38BDF8]" />
                <span>Print Document</span>
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00828A] to-[#00A896] hover:from-[#00A896] hover:to-[#00828A] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Grievance Officer</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Primary Standard:</span>
              <strong className="text-white font-semibold">India DPDP Act 2023</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Encryption Standard:</span>
              <strong className="text-white font-semibold">256-Bit TLS / AES In-Flight & Rest</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Data Resale Policy:</span>
              <strong className="text-emerald-400 font-semibold">Strict 0% Third-Party Monetization</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Grievance SLA:</span>
              <strong className="text-[#38BDF8] font-semibold">Mandatory 48-Hour Response</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Table of Contents */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-[#0B1E36] rounded-2xl p-5 border border-slate-800/80 sticky top-24 space-y-5 shadow-xl">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#38BDF8]" />
                  <span>Privacy Navigator</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">Jump to specific data protection clauses</p>
              </div>

              {/* Filter */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search privacy terms (e.g. DPDP, cookies)..."
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

              {/* DPO Contact Box */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Data Protection Officer</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Exercise your DPDP access, correction, or erasure rights directly with our designated data privacy officer.
                </p>
                <div className="pt-1">
                  <a
                    href="mailto:contact@silphortechnologies.com?subject=DPDP%20Data%20Subject%20Request"
                    className="text-xs text-[#38BDF8] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>contact@silphortechnologies.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Detailed Privacy Clauses */}
          <main className="lg:col-span-8 space-y-10">
            {/* Section 1 */}
            <article id="controller" className="bg-[#0B1E36] rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00828A]/20 text-[#38BDF8] border border-[#00828A]/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display">1. Data Controller Identification & Operational Scope</h2>
                  <p className="text-xs text-slate-400">Identity of the Data Fiduciary managing your information</p>
                </div>
              </div>
              <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                <p>
                  Under the <strong>Digital Personal Data Protection Act, 2023 (&quot;DPDP Act&quot;)</strong>, the designated Data Fiduciary responsible for processing your personal data is:
                </p>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5 font-mono">
                  <div className="text-white font-bold">SILPHOR TECHNOLOGIES PRIVATE LIMITED</div>
                  <div className="text-slate-300">Registered Office: #45 East Road, Malleswaram, Bangalore, Karnataka - 560003, India</div>
                  <div className="text-slate-400">Landmark: Near 8th Cross Cultural Hub & Malleswaram Ground</div>
                  <div className="text-teal-400">Official Electronic Mail: contact@silphortechnologies.com / info@silphortechnologies.com</div>
                  <div className="text-slate-300">Direct Telephone & WhatsApp: +91 9876543210</div>
                </div>
                <p>
                  This Privacy Policy applies to personal data collected through our corporate website, academic student LMS, cloud Linux EDA workstation clusters, offline campus admissions, and recruitment placement portals.
                </p>
              </div>
            </article>

            {/* Section 2 */}
            <article id="data-collected" className="bg-[#0B1E36] rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00828A]/20 text-[#38BDF8] border border-[#00828A]/30">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display">2. Categories of Data Collected</h2>
                  <p className="text-xs text-slate-400">Transparent enumeration of information processed</p>
                </div>
              </div>
              <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                <p>We process only data necessary to fulfill specified educational, licensing, or commercial contractual obligations:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <strong className="text-white block font-bold text-sm">A. Student & Applicant Records</strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-300">
                      <li>Full Legal Name & Date of Birth</li>
                      <li>Contact details (Phone, WhatsApp, Email, Mailing Address)</li>
                      <li>Academic transcripts & engineering degree credentials</li>
                      <li>Resume/CV & GitHub portfolio URLs</li>
                      <li>Course attendance and lab completion scores</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <strong className="text-white block font-bold text-sm">B. Technical & Workstation Telemetry</strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-300">
                      <li>Cloud EDA Linux desktop login timestamps & IP addresses</li>
                      <li>Compute resource consumption (CPU/GPU core hours)</li>
                      <li>Browser client identifiers and device OS specs</li>
                      <li>Cryptographic certificate verification lookup hashes</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-slate-400">
                  <strong>Financial Data Security:</strong> Credit card numbers, UPI PINs, and bank authentication secrets are processed strictly through PCI-DSS compliant licensed banking gateways. Silphor Technologies never stores raw credit/debit card numbers on its servers.
                </p>
              </div>
            </article>

            {/* Section 3 */}
            <article id="purpose" className="bg-[#0B1E36] rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00828A]/20 text-[#38BDF8] border border-[#00828A]/30">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display">3. Legal Basis & Processing Purpose</h2>
                  <p className="text-xs text-slate-400">How your personal data is utilized lawfully</p>
                </div>
              </div>
              <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                <ul className="list-disc pl-5 space-y-2 text-xs">
                  <li><strong>Contractual Performance:</strong> Registering candidates into academic cohorts, provisioning cloud virtual workstation containers, issuing lab credentials, and processing fee transactions.</li>
                  <li><strong>Certificate Verification & Anti-Fraud:</strong> Generating immutable cryptographic verification records for employers and academic institutions to validate student credentials.</li>
                  <li><strong>Corporate Placement Assistance:</strong> Sharing authorized student profiles with semiconductor design hiring partners upon explicit student consent.</li>
                  <li><strong>Statutory Tax & Regulatory Compliance:</strong> Maintaining GST billing records and audit logs mandated by Indian corporate laws.</li>
                </ul>
              </div>
            </article>

            {/* Section 4 */}
            <article id="dpdp-rights" className="bg-[#0B1E36] rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00828A]/20 text-[#38BDF8] border border-[#00828A]/30">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display">4. India DPDP Act 2023 Data Principal Rights</h2>
                  <p className="text-xs text-slate-400">Enforceable statutory rights guaranteed to you</p>
                </div>
              </div>
              <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                <p>
                  Under Section 11-14 of the Digital Personal Data Protection Act, 2023, you as a <strong>Data Principal</strong> hold the following statutory rights:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-white block font-semibold mb-1">Right to Access Information</strong>
                    Request a summary of your personal data being processed and the identities of third-party hiring partners who received your profile.
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-white block font-semibold mb-1">Right to Correction & Erasure</strong>
                    Correct inaccurate biographical details, update academic scores, or request erasure of non-statutory records upon course graduation.
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-white block font-semibold mb-1">Right of Grievance Redressal</strong>
                    Direct escalation to our Grievance Officer, with subsequent recourse to the Data Protection Board of India.
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-white block font-semibold mb-1">Right to Nominate</strong>
                    Designate an individual who shall exercise your data rights in the event of incapacity or death.
                  </div>
                </div>
              </div>
            </article>

            {/* Section 5 */}
            <article id="eda-telemetry" className="bg-[#0B1E36] rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00828A]/20 text-[#38BDF8] border border-[#00828A]/30">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display">5. Cloud EDA Workstation Telemetry & Session Monitoring</h2>
                  <p className="text-xs text-slate-400">Security monitoring inside remote Linux design nodes</p>
                </div>
              </div>
              <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                <p>
                  To prevent unauthorized software piracy, illicit crypto-mining, and corporate espionage involving foundry PDKs, remote cloud EDA compute sessions are automatically scanned by kernel-level security telemetry for outbound botnet connections and anomalous CPU workloads.
                </p>
                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-200 text-xs">
                  <strong className="text-amber-400 block font-semibold mb-1 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" /> Workstation Content Isolation:
                  </strong>
                  Student Verilog/VHDL design source files are isolated in containerized sandboxes with automated nightly snapshots. Instructors review code exclusively for academic evaluation, rubric grading, and syntax guidance.
                </div>
              </div>
            </article>

            {/* Section 6 */}
            <article id="sharing-vendors" className="bg-[#0B1E36] rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00828A]/20 text-[#38BDF8] border border-[#00828A]/30">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display">6. Third-Party Sharing & Absolute Zero-Resale Guarantee</h2>
                  <p className="text-xs text-slate-400">Strict limitations on disclosures to external entities</p>
                </div>
              </div>
              <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                <p className="font-semibold text-white">
                  We guarantee unequivocally: Silphor Technologies does NOT sell, rent, monetize, or trade student or enterprise personal data to third-party telemarketers or advertising brokers.
                </p>
                <p>We share data exclusively with trusted Data Processors bound by stringent confidentiality agreements:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>EDA Software Licensors:</strong> Academic seat verification reporting to confirm legitimate educational licensing.</li>
                  <li><strong>Cloud Infrastructure Providers:</strong> AWS, Google Cloud Platform, and Microsoft Azure for hosting encrypted EDA clusters and LMS database pods.</li>
                  <li><strong>Payment Processors:</strong> Licensed payment aggregators in India for processing tuition and invoice remittances.</li>
                  <li><strong>Law Enforcement Agencies:</strong> Only when strictly mandated by a valid judicial court order under Indian law.</li>
                </ul>
              </div>
            </article>

            {/* Section 7 */}
            <article id="security-encryption" className="bg-[#0B1E36] rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00828A]/20 text-[#38BDF8] border border-[#00828A]/30">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display">7. 256-Bit TLS Encryption, Cyber Defense & Retention Protocols</h2>
                  <p className="text-xs text-slate-400">Enterprise data defense standards and archival timetables</p>
                </div>
              </div>
              <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                <p>
                  Silphor Technologies deploys defense-in-depth infrastructure to protect data against unauthorized exfiltration:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li><strong>In-Transit Encryption:</strong> All browser-to-server traffic is enforced over TLS 1.3 with SHA-256 RSA/ECDSA cipher suites.</li>
                  <li><strong>At-Rest Encryption:</strong> Student credentials and database backups are encrypted with AES-256 bit hardware-accelerated keys.</li>
                  <li><strong>Retention Schedule:</strong> Academic course completion records and issued certificates are preserved indefinitely in our cryptographic registry for lifetime credential verification. Transient lab VM scratch disks are wiped within 30 days of cohort conclusion.</li>
                </ul>
              </div>
            </article>

            {/* Section 8 */}
            <article id="cookies" className="bg-[#0B1E36] rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00828A]/20 text-[#38BDF8] border border-[#00828A]/30">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display">8. Cookies & Session Storage Policy</h2>
                  <p className="text-xs text-slate-400">Strictly functional and security session tokens</p>
                </div>
              </div>
              <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                <p>
                  Our web applications use strictly essential cookies and browser session storage tokens to maintain authenticated administrative sessions, remember your current active role, and store certificate search queries. We do not use third-party invasive ad tracking cookies.
                </p>
              </div>
            </article>

            {/* Section 9 */}
            <article id="grievance-officer" className="bg-[#0B1E36] rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-5 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00828A]/20 text-[#38BDF8] border border-[#00828A]/30">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display">9. Designated Grievance Officer & Redressal Mechanism</h2>
                  <p className="text-xs text-slate-400">Statutory contact under Rule 3 of Information Technology Rules</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-800/80 pt-4 text-xs">
                <div className="space-y-2">
                  <div className="font-semibold text-white flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#00828A]" />
                    <span>Grievance Officer Designation</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-6">
                    <strong>Grievance Redressal Desk</strong><br />
                    Attention: Data Protection Compliance Head<br />
                    Silphor Technologies<br />
                    #45 East Road, Malleswaram<br />
                    Bangalore, Karnataka - 560003, India
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="font-semibold text-white flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Electronic Redressal Desk</span>
                  </div>
                  <div className="space-y-1 text-slate-300 pl-6">
                    <div>Official Email: <a href="mailto:contact@silphortechnologies.com" className="text-[#38BDF8] hover:underline font-mono">contact@silphortechnologies.com</a></div>
                    <div>Support Email: <a href="mailto:info@silphortechnologies.com" className="text-[#38BDF8] hover:underline font-mono">info@silphortechnologies.com</a></div>
                    <div>Dedicated Hotline: <a href="tel:+919876543210" className="text-white hover:underline font-mono">+91 9876543210</a></div>
                    <div className="text-[11px] text-teal-400 pt-1">Response Timeframe: Acknowledgment within 24 hours, resolution within 15 working days.</div>
                  </div>
                </div>
              </div>
            </article>

            {/* Section 10 */}
            <article id="updates" className="bg-[#0B1E36] rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00828A]/20 text-[#38BDF8] border border-[#00828A]/30">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white font-display">10. Policy Amendments & Notifications</h2>
                  <p className="text-xs text-slate-400">Timely updates to our privacy posture</p>
                </div>
              </div>
              <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                <p>
                  We may periodically revise this Privacy Policy to reflect advancements in cloud architecture, semiconductor vendor agreements, or regulatory directives issued by the Data Protection Board of India. Significant changes will be prominently announced via portal broadcast banners and electronic mail.
                </p>
              </div>
            </article>

            {/* Bottom Navigation Ribbon */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
              <button
                onClick={() => onNavigate('terms-of-service')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold flex items-center gap-2 transition-colors"
              >
                <span>Read Terms of Service</span>
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
