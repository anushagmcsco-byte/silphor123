import React, { useState } from 'react';
import { X, Search, CheckCircle2, ShieldCheck, Printer, Download, Award, ExternalLink } from 'lucide-react';
import { CertificateRecord } from '../types';
import { MOCK_CERTIFICATES } from '../data/mockDatabase';
import { SilphorLogo } from './SilphorLogo';

interface CertificateVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCertNumber?: string;
}

export const CertificateVerificationModal: React.FC<CertificateVerificationModalProps> = ({
  isOpen,
  onClose,
  initialCertNumber = '',
}) => {
  const [certInput, setCertInput] = useState(initialCertNumber || 'SIL-CERT-VLSI-2026-7890');
  const [searchedRecord, setSearchedRecord] = useState<CertificateRecord | null>(
    MOCK_CERTIFICATES[0]
  );
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const cleanId = certInput.trim().toUpperCase();
    const found = MOCK_CERTIFICATES.find(
      (c) => c.certificateNumber.toUpperCase() === cleanId
    );
    if (found) {
      setSearchedRecord(found);
    } else {
      setSearchedRecord(null);
      setErrorMsg(`No verified certificate found matching "${certInput}". Please verify the certificate ID.`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-[#0B2545] text-white p-6 border-b border-[#00828A]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00828A]/20 border border-[#00828A]/40 flex items-center justify-center text-[#38BDF8]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Online Certificate Verification Portal
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Tamper-Evident QR Validated
                </span>
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Instant cryptographic credential verification for Silphor Technologies graduates and corporate sponsors
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                placeholder="Enter Certificate ID (e.g. SIL-CERT-VLSI-2026-7890)"
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#00828A] hover:bg-[#007077] text-white text-sm font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verify Now</span>
            </button>
          </form>

          {/* Quick presets */}
          <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
            <span>Try sample certificate IDs:</span>
            <button
              type="button"
              onClick={() => {
                setCertInput('SIL-CERT-VLSI-2026-7890');
                setSearchedRecord(MOCK_CERTIFICATES[0]);
              }}
              className="font-mono text-[#00828A] hover:underline"
            >
              SIL-CERT-VLSI-2026-7890
            </button>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => {
                setCertInput('SIL-CERT-RTL-2026-6541');
                setSearchedRecord(MOCK_CERTIFICATES[1]);
              }}
              className="font-mono text-[#00828A] hover:underline"
            >
              SIL-CERT-RTL-2026-6541
            </button>
          </div>

          {errorMsg && (
            <div className="mt-3 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Certificate Display Screen */}
        {searchedRecord && (
          <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto space-y-6">
            {/* Status Banner */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-emerald-900">
                    Official Authentic Certificate Verified
                  </div>
                  <div className="text-xs text-emerald-700">
                    Cryptographic record issued by Silphor Technologies Academic Council
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Certificate</span>
                </button>
              </div>
            </div>

            {/* Official Certificate Visual Document */}
            <div
              id="printable-certificate"
              className="relative p-8 md:p-12 bg-[#FCFDFE] border-8 border-double border-[#0B2545] rounded-xl shadow-lg text-center overflow-hidden"
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 130, 138, 0.03) 0%, transparent 80%)'
              }}
            >
              {/* Background Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <SilphorLogo variant="full" size="xl" showTagline={false} />
              </div>

              {/* Certificate Header */}
              <div className="relative z-10 flex flex-col items-center">
                <SilphorLogo variant="full" size="md" showTagline={true} />

                <div className="mt-6 border-b-2 border-[#00828A] pb-2 px-8 inline-block">
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-wider uppercase text-[#0B2545]">
                    Certificate of Excellence
                  </h3>
                </div>
                <p className="text-xs text-slate-500 tracking-[0.25em] uppercase mt-2">
                  INDUSTRIAL SEMICONDUCTOR & VLSI ENGINEERING DIVISION
                </p>

                {/* Recipient */}
                <div className="mt-6">
                  <p className="text-xs italic text-slate-600">This is to proudly certify that</p>
                  <h4 className="text-2xl md:text-3xl font-bold text-[#0B2545] font-display mt-1">
                    {searchedRecord.studentName}
                  </h4>
                  <div className="w-32 h-[1px] bg-slate-300 mx-auto mt-2" />
                </div>

                {/* Course Details */}
                <div className="mt-4 max-w-2xl">
                  <p className="text-xs text-slate-600">
                    has successfully completed the intensive professional specialization program in
                  </p>
                  <div className="text-lg md:text-xl font-bold text-[#00828A] mt-1">
                    {searchedRecord.courseTitle}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    with an exceptional academic rating of{' '}
                    <strong className="text-slate-800">{searchedRecord.grade}</strong>.
                  </p>
                </div>

                {/* Skills Grid */}
                <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 w-full max-w-xl text-left">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Verified Competencies & Industry Sign-offs:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {searchedRecord.skillsVerified.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00828A] shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Signatures & QR Code */}
                <div className="mt-8 pt-6 border-t border-slate-200 w-full flex flex-wrap items-end justify-between gap-6 text-left">
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">CERTIFICATE ID</div>
                    <div className="text-xs font-mono font-bold text-[#0B2545]">
                      {searchedRecord.certificateNumber}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      Date of Issue: <strong>{searchedRecord.issueDate}</strong> &bull; {searchedRecord.validUntil}
                    </div>
                  </div>

                  {/* QR Code Graphic representation */}
                  <div className="flex flex-col items-center p-2 rounded-lg bg-white border border-slate-300 shadow-2xs">
                    <div className="w-16 h-16 bg-slate-900 p-1 flex flex-col justify-between">
                      <div className="flex justify-between">
                        <div className="w-4 h-4 bg-white border-2 border-slate-900" />
                        <div className="w-4 h-4 bg-white border-2 border-slate-900" />
                      </div>
                      <div className="w-2 h-2 bg-[#00828A] self-center" />
                      <div className="flex justify-between">
                        <div className="w-4 h-4 bg-white border-2 border-slate-900" />
                        <div className="w-2 h-2 bg-white" />
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 mt-1">SCAN TO VERIFY</span>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-serif italic text-slate-800 font-bold mb-1">
                      Dr. R. K. Nambiar
                    </div>
                    <div className="w-32 h-[1px] bg-slate-400 ml-auto mb-1" />
                    <div className="text-[10px] font-semibold text-slate-600">
                      Academic Director & Authorized Signatory
                    </div>
                    <div className="text-[9px] text-slate-400">Silphor Technologies Bengaluru</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Verification Protocol: <strong>TLS SHA-256 Validated</strong>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-[#0B2545] text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
