import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  MessageSquare,
  Building2,
  Navigation
} from 'lucide-react';
import { saveFormSubmission } from '../utils/formStorage';

export const ContactView: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMobile, setSenderMobile] = useState('');
  const [department, setDepartment] = useState('Training & Course Admissions');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  const offices = [
    {
      city: 'Bengaluru (Corporate Headquarters & Engineering Center)',
      address: '#45 East Road, Malleswaram, Bangalore, Karnataka - 560003, India',
      landmark: 'Near 8th Cross Cultural Hub & Malleswaram Ground',
      phone: '+91 9876543210',
      whatsapp: '+91 9876543210',
      whatsappUrl: 'https://wa.me/919876543210?text=Hello%20Silphor%20Technologies,%20I%20would%20like%20to%20enquire%20about%20your%20services',
      emails: ['contact@silphortechnologies.com', 'info@silphortechnologies.com'],
      hours: 'Mon - Fri: 9:00 AM - 7:00 PM IST | Sat: 9:30 AM - 5:30 PM IST',
      coordinates: '13.0031° N, 77.5685° E (Malleswaram)',
    },
    {
      city: 'Hyderabad (Silicon Design & Staffing Center)',
      address: 'Level 4, Cyber Gateway, HITEC City, Madhapur, Hyderabad, Telangana 500081',
      landmark: 'Opposite Cyber Towers',
      phone: '+91 9876543210',
      whatsapp: '+91 9876543210',
      whatsappUrl: 'https://wa.me/919876543210',
      emails: ['contact@silphortechnologies.com', 'info@silphortechnologies.com'],
      hours: 'Mon - Fri: 9:00 AM - 6:30 PM IST | Sat: 9:30 AM - 5:30 PM IST',
      coordinates: '17.4474° N, 78.3762° E',
    },
    {
      city: 'Chennai (Hardware & PCB Engineering Center)',
      address: 'Module 3, Tidel Park, Rajiv Gandhi Salai (OMR), Taramani, Chennai, Tamil Nadu 600113',
      landmark: 'Tidel Park Technology Corridor',
      phone: '+91 9876543210',
      whatsapp: '+91 9876543210',
      whatsappUrl: 'https://wa.me/919876543210',
      emails: ['contact@silphortechnologies.com', 'info@silphortechnologies.com'],
      hours: 'Mon - Fri: 9:00 AM - 6:00 PM IST | Sat: 9:30 AM - 5:30 PM IST',
      coordinates: '12.9892° N, 80.2483° E',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail) return;

    const saved = saveFormSubmission({
      pageSource: 'contact',
      pageLabel: 'Contact Us Page',
      formTitle: 'General & Technical Inquiry',
      senderName,
      senderEmail,
      senderPhone: senderMobile,
      subject: `Enquiry for ${department}`,
      message: message || `Enquiry routed to ${department}`,
      formData: {
        department,
        senderMobile,
        submittedAt: new Date().toISOString(),
      },
      status: 'New',
      priority: 'High',
      notes: `Received from Contact Page for ${department}. Automated dispatch queued.`,
    });

    setTrackingId(saved.id);
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* HEADER */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00828A] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Global & Regional Outreach</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] font-display">
          Contact Silphor Technologies
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Whether you are an industry partner seeking EDA software tools, a semiconductor company requiring specialized engineering resources, or a candidate applying for VLSI training, our specialists are ready to assist.
        </p>
      </section>

      {/* 2-COLUMN: CONTACT FORM & OFFICE LOCATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Enquiry Form */}
        <div className="lg:col-span-6 p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#0B2545] font-display">
              Send an Official Enquiry
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Fill out the form below. Automated routing ensures prompt dispatch to the relevant division.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-950 font-display">
                Enquiry Dispatched Successfully
              </h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto">
                Thank you, <strong>{senderName}</strong>. Your enquiry has been assigned tracking ID{' '}
                <span className="font-mono font-bold">{trackingId || 'SIL-ENQ-2026-9042'}</span>. Stored in Administrative Governance and dispatched to <strong>{senderEmail}</strong>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-lg hover:bg-emerald-800"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyadarshini Rao"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Corporate or Personal Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="priya.rao@company.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number (with Country Code)</label>
                  <input
                    type="tel"
                    placeholder="+91 98450 22222"
                    value={senderMobile}
                    onChange={(e) => setSenderMobile(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Department to Route *</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                  >
                    <option>Training & Course Admissions</option>
                    <option>Industrial EDA & Hardware Solutions</option>
                    <option>Skilled Engineering Staffing & Deputation</option>
                    <option>University & Academic Partnerships (FDP/SDP)</option>
                    <option>Certificate Verification Support</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Message or Technical Requirement *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your query, batch inquiry, or tool licensing requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Enquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Office Directory & Map Preview */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-4">
            {offices.map((office, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-[#0B2545]">{office.city}</h3>
                  <span className="text-[10px] font-mono text-[#00828A] font-bold">
                    {office.coordinates}
                  </span>
                </div>
                <div className="text-xs text-slate-600 flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#00828A] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-800">{office.address}</div>
                    {office.landmark && (
                      <div className="text-[11px] text-amber-700 font-medium mt-0.5">
                        Landmark: {office.landmark}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-xs text-slate-700 flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-medium">Direct Telephone & WhatsApp:</span>
                    <a href={`tel:${office.phone.replace(/[^0-9+]/g, '')}`} className="font-bold text-[#0B2545] hover:underline">
                      {office.phone}
                    </a>
                  </div>
                  {office.whatsappUrl && (
                    <a
                      href={office.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold hover:bg-emerald-100 transition-colors"
                    >
                      <span>💬 Chat on WhatsApp ({office.whatsapp})</span>
                    </a>
                  )}
                </div>

                <div className="text-xs text-slate-600 flex items-start gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                    <span className="font-medium text-slate-700">Official Electronic Mail:</span>
                    {office.emails.map((mail, mi) => (
                      <a key={mi} href={`mailto:${mail}`} className="text-[#00828A] hover:underline font-mono">
                        {mail}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 flex items-center gap-2 pt-0.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-700">Operational Hours: </span>
                    <span>Monday - Friday: 9:00 AM - 7:00 PM IST | Saturday: 9:30 AM - 5:30 PM IST</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SIMULATED GOOGLE MAPS COMPONENT */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs">
            <div className="p-3 bg-[#0B2545] text-white flex items-center justify-between text-xs">
              <span className="font-bold flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[#00828A]" />
                Google Maps Facility Navigator
              </span>
              <span className="text-[10px] font-mono text-slate-300">#45 East Road, Malleswaram, Bangalore - 560003</span>
            </div>

            {/* Map Canvas Graphic */}
            <div className="relative h-48 bg-slate-200 overflow-hidden flex items-center justify-center">
              {/* Map Road Patterns */}
              <svg className="w-full h-full opacity-40" viewBox="0 0 400 200">
                <path d="M 0 50 Q 150 70 400 40" stroke="#94A3B8" strokeWidth="8" fill="none" />
                <path d="M 0 140 Q 200 120 400 160" stroke="#94A3B8" strokeWidth="12" fill="none" />
                <path d="M 120 0 L 150 200" stroke="#CBD5E1" strokeWidth="6" fill="none" />
                <path d="M 280 0 L 250 200" stroke="#CBD5E1" strokeWidth="8" fill="none" />
              </svg>

              {/* Pin at center */}
              <div className="absolute flex flex-col items-center">
                <div className="p-2 rounded-full bg-[#00828A] text-white shadow-lg animate-bounce">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="mt-1 px-2.5 py-0.5 rounded bg-slate-900 text-white text-[10px] font-bold shadow-md text-center">
                  Silphor HQ Malleswaram, Bangalore
                  <div className="text-[9px] text-teal-300 font-normal">Near 8th Cross Cultural Hub & Malleswaram Ground</div>
                </div>
              </div>

              <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs p-1.5 rounded text-[10px] text-slate-700 shadow-xs">
                Malleswaram 8th Cross Hub &bull; Bangalore 560003
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
