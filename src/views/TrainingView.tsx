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
  Users
} from 'lucide-react';
import { Course } from '../types';
import { MOCK_COURSES } from '../data/mockDatabase';

interface TrainingViewProps {
  onRegisterCourse: (courseId?: string) => void;
  onNavigate: (tab: any) => void;
}

export const TrainingView: React.FC<TrainingViewProps> = ({ onRegisterCourse, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);

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

      {/* COURSE SYLLABUS & DETAILS MODAL */}
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
