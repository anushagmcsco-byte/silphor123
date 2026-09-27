import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  Sparkles, 
  Award, 
  Cpu, 
  Layers, 
  Zap, 
  Radio, 
  Search,
  Users,
  Send,
  Download,
  Phone
} from 'lucide-react';
import { Course } from '../types';
import { MOCK_COURSES } from '../data/mockDatabase';
import { saveFormSubmission } from '../utils/formStorage';

interface TrainingViewProps {
  onRegisterCourse: (courseId?: string) => void;
  onNavigate: (tab: any) => void;
}

export const TrainingView: React.FC<TrainingViewProps> = ({ onRegisterCourse, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);

  // Training Page Consultation Form State
  const [inqName, setInqName] = useState('');
  const [inqEmail, setInqEmail] = useState('');
  const [inqPhone, setInqPhone] = useState('');
  const [inqCourse, setInqCourse] = useState('Advanced VLSI Design & Physical Implementation');
  const [inqBackground, setInqBackground] = useState('B.E / B.Tech Student (ECE/EEE)');
  const [inqMessage, setInqMessage] = useState('');
  const [inqSubmitted, setInqSubmitted] = useState(false);
  const [inqTrackingId, setInqTrackingId] = useState('');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inqName || !inqEmail) return;

    const saved = saveFormSubmission({
      pageSource: 'training',
      pageLabel: 'Training & Syllabus Inquiries',
      formTitle: 'Syllabus Brochure & Course Counseling Request',
      senderName: inqName,
      senderEmail: inqEmail,
      senderPhone: inqPhone,
      organizationOrCollege: inqBackground,
      subject: `Syllabus & Guidance Request: ${inqCourse}`,
      message: inqMessage || `Learner background: ${inqBackground}. Interested in ${inqCourse}.`,
      formData: {
        targetCourse: inqCourse,
        learnerBackground: inqBackground,
        phone: inqPhone,
        message: inqMessage,
        submittedAt: new Date().toISOString(),
      },
      status: 'New',
      priority: 'Medium',
      notes: `Prospective learner inquiry from Training Page for ${inqCourse}. Send syllabus brochure and arrange advisor callback.`,
    });

    setInqTrackingId(saved.id);
    setInqSubmitted(true);
  };

  const categories = ['All', 'VLSI', 'PCB', 'Embedded', 'Power Electronics'];

  const filteredCourses = MOCK_COURSES.filter((c) => {
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* HEADER */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00828A] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Professional & Industrial Engineering Training</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] font-display">
          Electronics, Semiconductor & VLSI Training Programs
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Master end-to-end silicon design flows, high-speed PCB layouts, embedded firmware, and power electronics under the guidance of veteran semiconductor architects.
        </p>
      </section>

      {/* FILTER & SEARCH STRIP */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
        {/* Category buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#0B2545] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search courses, EDA tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
          />
        </div>
      </div>

      {/* COURSE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-[#00828A] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="p-6">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-[#00828A] font-bold border border-teal-200">
                  {course.category}
                </span>
                <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {course.duration}
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-900 line-clamp-2">
                {course.title}
              </h2>
              <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                {course.overview}
              </p>

              {/* Tools Taught */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  EDA & Hardware Tools:
                </div>
                <div className="flex flex-wrap gap-1">
                  {course.tools.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Next Batch Info */}
              {course.upcomingBatches[0] && (
                <div className="mt-4 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                  <div className="font-semibold text-slate-800">
                    Next Batch: {course.upcomingBatches[0].name}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Starts: {course.upcomingBatches[0].startDate} &bull; {course.upcomingBatches[0].schedule}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 pt-0 mt-2">
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Tuition Fee</div>
                  <div className="text-lg font-extrabold text-[#0B2545] font-mono">
                    ₹{course.fee.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveCourseModal(course)}
                    className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50"
                  >
                    Syllabus
                  </button>
                  <button
                    onClick={() => onRegisterCourse(course.id)}
                    className="px-4 py-2 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span>Register</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* INTERACTIVE FORM: REQUEST SYLLABUS BROCHURE & COURSE COUNSELING */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00828A] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Academic Advisory & Syllabus Access</span>
            </div>
            <h3 className="text-2xl font-bold text-[#0B2545] font-display">
              Request Detailed Course Syllabus & 1-on-1 Trainer Counseling
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unsure which specialization matches your career objectives? Submit your details to receive the comprehensive 12-week lab curriculum PDF, tool license requirements, and a free 15-minute counseling session with Dr. R. K. Nambiar.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>What you will receive immediately:</span>
              </div>
              <ul className="space-y-1 pl-6 list-disc text-slate-600">
                <li>Complete day-by-day lab exercise workbook</li>
                <li>EDA Tool server remote login prerequisites</li>
                <li>Past placement salary benchmark dossier</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            {inqSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-950 font-display">
                  Syllabus & Advisory Request Registered
                </h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Thank you, <strong>{inqName}</strong>! Your inquiry{' '}
                  <span className="font-mono font-bold">[{inqTrackingId || 'SUB-2026-TRN'}]</span> has been logged in the Administrative Governance console. The syllabus package has been queued for <strong>{inqEmail}</strong>.
                </p>
                <button
                  onClick={() => setInqSubmitted(false)}
                  className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kavita Sundaram"
                      value={inqName}
                      onChange={(e) => setInqName(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="kavita.s@pes.edu"
                      value={inqEmail}
                      onChange={(e) => setInqEmail(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      WhatsApp / Mobile Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98450 12345"
                      value={inqPhone}
                      onChange={(e) => setInqPhone(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Current Learner Profile
                    </label>
                    <select
                      value={inqBackground}
                      onChange={(e) => setInqBackground(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                    >
                      <option>B.E / B.Tech Student (ECE/EEE)</option>
                      <option>M.Tech / M.S in VLSI or Microelectronics</option>
                      <option>Working Hardware Engineer looking to upskill</option>
                      <option>College Faculty / Academic Department Head</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Course Curriculum of Primary Interest
                    </label>
                    <select
                      value={inqCourse}
                      onChange={(e) => setInqCourse(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                    >
                      {MOCK_COURSES.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title} ({c.duration} - {c.mode})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Questions for Trainer / Specific Career Goals
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Can I attend the physical lab at Malleswaram on weekends? Do you cover Innovus CTS in detail?"
                      value={inqMessage}
                      onChange={(e) => setInqMessage(e.target.value)}
                      className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#00828A]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-500">
                    Direct Counselor Hotline: <strong className="text-[#00828A]">+91 7829455663</strong>
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch Inquiry to Admin</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {activeCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="bg-[#0B2545] text-white p-6 border-b border-[#00828A]/30 flex items-start justify-between">
              <div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00828A] text-white font-mono font-bold">
                  {activeCourseModal.category} Curricula
                </span>
                <h3 className="text-xl font-bold tracking-tight text-white mt-1">
                  {activeCourseModal.title}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {activeCourseModal.duration} &bull; {activeCourseModal.mode} &bull; Level: {activeCourseModal.level}
                </p>
              </div>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Program Overview:
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeCourseModal.overview}
                </p>
              </div>

              {/* Module-wise syllabus breakdown */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Comprehensive Syllabus & Hands-On Modules:
                </h4>
                <div className="space-y-3">
                  {activeCourseModal.modules.map((mod, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0B2545]">{mod.title}</span>
                        <span className="text-[10px] font-mono text-[#00828A] font-bold">{mod.week}</span>
                      </div>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {mod.topics.map((t, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700"
                          >
                            &bull; {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Batches */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Upcoming Cohorts & Availability:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeCourseModal.upcomingBatches.map((batch) => (
                    <div key={batch.id} className="p-3 rounded-xl border border-slate-200 text-xs">
                      <div className="font-bold text-slate-900">{batch.name}</div>
                      <div className="text-slate-600 mt-0.5">Start Date: <strong>{batch.startDate}</strong></div>
                      <div className="text-[11px] text-slate-500">{batch.schedule}</div>
                      <div className="text-[10px] text-amber-700 font-medium mt-1">
                        Trainer: {batch.trainer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500">Program Fee:</span>
                <span className="text-base font-extrabold text-[#0B2545] font-mono ml-2">
                  ₹{activeCourseModal.fee.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveCourseModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const cId = activeCourseModal.id;
                    setActiveCourseModal(null);
                    onRegisterCourse(cId);
                  }}
                  className="px-5 py-2 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-lg shadow-xs"
                >
                  Register for This Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
