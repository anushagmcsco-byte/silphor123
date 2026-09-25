import React, { useState } from 'react';
import { 
  BookOpen, 
  Video, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Award, 
  Download, 
  Play, 
  Check, 
  HelpCircle, 
  Send, 
  Briefcase, 
  Sparkles, 
  UserCheck, 
  Cpu, 
  Layers, 
  ShieldCheck,
  Receipt
} from 'lucide-react';
import { SilphorLogo } from '../components/SilphorLogo';
import { saveFormSubmission } from '../utils/formStorage';

interface StudentsViewProps {
  onVerifyCert: () => void;
  onOpenRegister: () => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({ onVerifyCert, onOpenRegister }) => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'materials' | 'videos' | 'assignments' | 'quizzes' | 'attendance' | 'career'
  >('dashboard');

  // Interactive Quiz State
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Video Player state
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [studentNotice, setStudentNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setStudentNotice(msg);
    setTimeout(() => setStudentNotice(null), 3500);
  };

  const studentProfile = {
    name: 'Ananya Sharma',
    regNumber: 'SIL-2026-REG-8492',
    course: 'Advanced VLSI Design & Physical Implementation',
    batch: 'Autumn Batch 2026 (Mon-Thu 7:00 PM)',
    trainer: 'Dr. R. K. Nambiar',
    attendancePercent: 96,
    assignmentsCompleted: 8,
    totalAssignments: 10,
    testsTaken: 3,
    avgScore: 92,
  };

  const videoLectures = [
    {
      id: 1,
      title: 'Session 01: CMOS Inverter Characteristics & Dynamic Power',
      duration: '45 mins',
      date: 'Sep 15, 2026',
      notes: 'cmos_power_dissipation_notes.pdf',
    },
    {
      id: 2,
      title: 'Session 02: Setup & Hold Time Slack Analysis in PrimeTime',
      duration: '52 mins',
      date: 'Sep 17, 2026',
      notes: 'primetime_sta_timing_paths.pdf',
    },
    {
      id: 3,
      title: 'Session 03: Floorplanning & Core Utilization Strategies',
      duration: '58 mins',
      date: 'Sep 22, 2026',
      notes: 'innovus_floorplanning_manual.pdf',
    },
    {
      id: 4,
      title: 'Session 04: Clock Tree Synthesis (CTS) & Skew Budgeting',
      duration: '48 mins',
      date: 'Sep 24, 2026',
      notes: 'cts_mesh_vs_tree_optimization.pdf',
    },
  ];

  const assignments = [
    {
      id: 'asg-01',
      title: 'Parametric Synchronous FIFO Design in Verilog',
      due: 'Oct 02, 2026',
      status: 'Submitted',
      grade: '98 / 100',
    },
    {
      id: 'asg-02',
      title: 'Constrained SDC File Creation for 200MHz Clock Domain',
      due: 'Oct 08, 2026',
      status: 'Submitted',
      grade: '94 / 100',
    },
    {
      id: 'asg-03',
      title: 'Innovus Power Network Synthesis & IR Drop Verification',
      due: 'Oct 15, 2026',
      status: 'In Progress',
      grade: 'Pending Review',
    },
  ];

  const quizQuestions = [
    {
      q: 'Which condition causes setup time violation in digital flip-flops?',
      options: [
        'Data arrives too late before the active clock edge',
        'Data changes too soon after the clock edge',
        'Clock period is greater than the data propagation delay',
        'Hold slack is strictly positive',
      ],
      correct: 0,
    },
    {
      q: 'What is the primary function of Clock Tree Synthesis (CTS)?',
      options: [
        'To reduce dynamic power to zero',
        'To minimize clock skew and insertion delay across flip-flops',
        'To eliminate DRC errors on metal layer 1',
        'To generate GDSII layout mask',
      ],
      correct: 1,
    },
    {
      q: 'In SystemVerilog UVM, which phase is executed in bottom-up order?',
      options: ['build_phase', 'connect_phase', 'run_phase', 'report_phase'],
      correct: 1,
    },
  ];

  const handleQuizSubmit = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const jobPostings = [
    {
      company: 'Intel Technology India',
      role: 'Junior Physical Design Engineer',
      location: 'Bengaluru',
      stipend: '₹8.5 - 12 LPA',
      tags: ['Innovus', 'STA', 'FinFET'],
    },
    {
      company: 'Qualcomm India Pvt Ltd',
      role: 'ASIC Verification Engineer (UVM)',
      location: 'Hyderabad',
      stipend: '₹9.0 - 14 LPA',
      tags: ['SystemVerilog', 'UVM', 'PCIe'],
    },
    {
      company: 'NXP Semiconductors',
      role: 'Automotive Embedded Firmware Engineer',
      location: 'Noida',
      stipend: '₹7.5 - 11 LPA',
      tags: ['ARM Cortex', 'FreeRTOS', 'CAN-FD'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* STUDENT PORTAL HEADER CARD */}
      <div className="bg-[#0B2545] rounded-3xl p-6 sm:p-8 text-white border border-[#00828A]/40 shadow-xl flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] uppercase tracking-wider mb-1">
            <UserCheck className="w-3.5 h-3.5 text-[#00828A]" />
            <span>Authorized Student LMS Portal & Learning Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Welcome back, {studentProfile.name}
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            ID: <strong className="font-mono text-white">{studentProfile.regNumber}</strong> &bull; {studentProfile.course}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onVerifyCert}
            className="px-4 py-2 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5"
          >
            <Award className="w-4 h-4" />
            <span>View Earned Certificate</span>
          </button>
        </div>
      </div>

      {/* PORTAL NAV TABS */}
      {studentNotice && (
        <div className="p-3 bg-teal-50 border border-teal-200 text-teal-800 rounded-xl text-xs font-semibold flex items-center justify-between shadow-2xs">
          <span>{studentNotice}</span>
          <button onClick={() => setStudentNotice(null)} className="underline text-[11px]">Dismiss</button>
        </div>
      )}

      <div className="flex border-b border-slate-200 bg-white rounded-xl px-4 shadow-2xs overflow-x-auto">
        {[
          { id: 'dashboard', label: 'Overview Dashboard', icon: Layers },
          { id: 'videos', label: 'Video Lectures', icon: Video },
          { id: 'materials', label: 'Training Materials & Notes', icon: FileText },
          { id: 'assignments', label: 'Assignments', icon: BookOpen },
          { id: 'quizzes', label: 'Interactive Tests & Quizzes', icon: HelpCircle },
          { id: 'attendance', label: 'Attendance & Schedule', icon: Calendar },
          { id: 'career', label: 'Placement & Career Cell', icon: Briefcase },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#00828A] text-[#00828A] font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT 1: DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Attendance Rate
              </span>
              <div className="text-2xl font-extrabold text-[#0B2545] font-mono mt-1">
                {studentProfile.attendancePercent}%
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold">Eligible for Certification</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Assignments Submitted
              </span>
              <div className="text-2xl font-extrabold text-[#00828A] font-mono mt-1">
                {studentProfile.assignmentsCompleted} / {studentProfile.totalAssignments}
              </div>
              <span className="text-[11px] text-slate-500">2 Pending Review</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Avg. Quiz Score
              </span>
              <div className="text-2xl font-extrabold text-amber-600 font-mono mt-1">
                {studentProfile.avgScore}%
              </div>
              <span className="text-[11px] text-slate-500">Grade: Distinction</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Cloud EDA Access
              </span>
              <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">
                Active
              </div>
              <span className="text-[11px] text-slate-500">Synopsys & Innovus VPN</span>
            </div>
          </div>

          {/* Current Batch & Next Live Lecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Enrolled Batch Status</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Batch Cohort:</span>
                  <span className="font-bold text-slate-800">{studentProfile.batch}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Principal Trainer:</span>
                  <span className="font-bold text-[#00828A]">{studentProfile.trainer}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Current Phase:</span>
                  <span className="font-bold text-slate-800">Physical Design: Clock Tree Synthesis</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Fee Status:</span>
                  <span className="font-bold text-emerald-600">Paid in Full (Receipt: INV-0492)</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-teal-50/50 border border-teal-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#00828A] uppercase tracking-wider">
                  Upcoming Live Session
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00828A] text-white font-mono">
                  LIVE IN 3 HOURS
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900">
                CTS Routing & Hold Buffer Insertion Hands-on Lab
              </h4>
              <p className="text-xs text-slate-600">
                Join Dr. Nambiar on the live compute cluster for hands-on Cadence Innovus Clock Tree Optimization.
              </p>
              <button
                onClick={() => showNotice('Secure EDA Workstation: Initializing remote cloud Linux desktop on cluster...')}
                className="w-full py-2.5 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Cpu className="w-4 h-4" />
                <span>Launch Remote EDA Desktop</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: VIDEO LECTURES */}
      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Video Player */}
          <div className="lg:col-span-8 bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800 text-white">
            <div className="aspect-video bg-slate-950 flex flex-col items-center justify-center relative group p-6">
              <div className="w-16 h-16 rounded-full bg-[#00828A] flex items-center justify-center text-white shadow-xl cursor-pointer group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 ml-1" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-400 bg-slate-900/80 p-2.5 rounded-lg backdrop-blur-md">
                <span>{videoLectures[activeVideoIndex].title}</span>
                <span className="font-mono text-white">{videoLectures[activeVideoIndex].duration}</span>
              </div>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="text-base font-bold">{videoLectures[activeVideoIndex].title}</h3>
              <p className="text-xs text-slate-400">
                Recorded on {videoLectures[activeVideoIndex].date} &bull; Delivered by Dr. R. K. Nambiar
              </p>
            </div>
          </div>

          {/* Playlist */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Module Session Playlist ({videoLectures.length})
            </h3>
            {videoLectures.map((vid, idx) => (
              <div
                key={vid.id}
                onClick={() => setActiveVideoIndex(idx)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  activeVideoIndex === idx
                    ? 'border-[#00828A] bg-teal-50 text-[#0B2545]'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold line-clamp-1">{vid.title}</div>
                <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
                  <span>{vid.duration}</span>
                  <span className="text-[#00828A] font-semibold">Watch Recording</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: TRAINING MATERIALS */}
      {activeTab === 'materials' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Downloadable Lecture Slides, Verilog Source & Lab Manuals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Silphor_VLSI_Physical_Design_Complete_Manual.pdf', size: '28.4 MB', type: 'PDF Manual' },
              { name: 'Synopsys_PrimeTime_Timing_Constraints_TCL.zip', size: '4.2 MB', type: 'Scripts & Constraints' },
              { name: 'Cadence_Innovus_Flow_Scripts_7nm_PDK.tar.gz', size: '18.1 MB', type: 'PDK Rule Deck' },
              { name: 'SystemVerilog_UVM_1.2_Arbiter_Testbench.sv', size: '1.2 MB', type: 'HDL Source' },
            ].map((mat, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-[#00828A] flex items-center justify-center font-bold text-xs">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 line-clamp-1">{mat.name}</div>
                    <div className="text-[10px] text-slate-500">{mat.type} &bull; {mat.size}</div>
                  </div>
                </div>
                <button
                  onClick={() => showNotice(`Downloading file: ${mat.name}`)}
                  className="p-2 text-slate-600 hover:text-[#00828A] hover:bg-slate-50 rounded-lg"
                  aria-label="Download material"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: ASSIGNMENTS */}
      {activeTab === 'assignments' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Course Assignments & Lab Deliverables</h3>
          <div className="space-y-3">
            {assignments.map((asg) => (
              <div key={asg.id} className="p-5 rounded-xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#00828A]">{asg.id}</span>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">{asg.title}</h4>
                  <div className="text-xs text-slate-500 mt-0.5">Due Date: <strong>{asg.due}</strong></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-800">{asg.grade}</div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                      {asg.status}
                    </span>
                  </div>
                  <button
                    onClick={() => showNotice('Assignment upload confirmed: New archive submitted for grading.')}
                    className="px-3 py-1.5 text-xs font-semibold text-[#00828A] border border-teal-300 rounded-lg hover:bg-teal-50"
                  >
                    Resubmit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: INTERACTIVE QUIZZES */}
      {activeTab === 'quizzes' && (
        <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Module 04 Knowledge Check: STA & Clock Tree Synthesis
              </h3>
              <p className="text-xs text-slate-500">Test your mastery with 3 instant questions.</p>
            </div>
            {quizSubmitted && (
              <div className="text-right font-mono">
                <span className="text-xs text-slate-500">Your Score:</span>
                <span className="text-lg font-extrabold text-[#00828A] ml-2">
                  {quizScore} / {quizQuestions.length}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {quizQuestions.map((q, qIndex) => (
              <div key={qIndex} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-slate-900">
                  {qIndex + 1}. {q.q}
                </div>
                <div className="space-y-2">
                  {q.options.map((opt, optIndex) => {
                    const isSelected = selectedAnswers[qIndex] === optIndex;
                    const isCorrect = q.correct === optIndex;
                    return (
                      <div
                        key={optIndex}
                        onClick={() => {
                          if (!quizSubmitted) {
                            setSelectedAnswers({ ...selectedAnswers, [qIndex]: optIndex });
                          }
                        }}
                        className={`p-2.5 rounded-lg text-xs cursor-pointer border transition-colors flex items-center justify-between ${
                          quizSubmitted
                            ? isCorrect
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                              : isSelected
                              ? 'bg-rose-50 border-rose-300 text-rose-800'
                              : 'border-slate-200 bg-white'
                            : isSelected
                            ? 'border-[#00828A] bg-teal-50 text-[#0B2545] font-semibold'
                            : 'border-slate-200 bg-white hover:bg-slate-100'
                        }`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && (
                          <Check className="w-4 h-4 text-emerald-600" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {!quizSubmitted ? (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleQuizSubmit}
                className="px-6 py-2.5 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Submit Answers
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
              <span className="text-emerald-900 font-semibold">
                Test evaluated successfully! Results logged in academic gradebook.
              </span>
              <button
                onClick={() => {
                  setQuizSubmitted(false);
                  setSelectedAnswers({});
                  setQuizScore(null);
                }}
                className="px-3 py-1 bg-emerald-600 text-white rounded font-bold"
              >
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 6: ATTENDANCE & SCHEDULE */}
      {activeTab === 'attendance' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Attendance Log & Biometric Sign-ins</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-slate-200 text-xs">
            <div>
              <span className="text-slate-400">Total Classes Held:</span>
              <div className="font-bold text-slate-800 text-base">25 Sessions</div>
            </div>
            <div>
              <span className="text-slate-400">Classes Attended:</span>
              <div className="font-bold text-[#00828A] text-base">24 Sessions</div>
            </div>
            <div>
              <span className="text-slate-400">Excused Leaves:</span>
              <div className="font-bold text-slate-800 text-base">1 Session</div>
            </div>
            <div>
              <span className="text-slate-400">Punctuality Score:</span>
              <div className="font-bold text-emerald-600 text-base">98%</div>
            </div>
          </div>
          <div className="text-xs text-slate-500">
            All live video lectures are logged via automated single-sign-on (SSO) with time-in and time-out tracking.
          </div>
        </div>
      )}

      {/* TAB CONTENT 7: CAREER & PLACEMENTS */}
      {activeTab === 'career' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Exclusive Hiring Partner Job Openings
              </h3>
              <p className="text-xs text-slate-500">
                Direct interviews booked through Silphor Career Cell for certified students.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {jobPostings.map((job, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#00828A] uppercase tracking-wider">
                      {job.company}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 mt-1">{job.role}</h4>
                    <div className="text-[11px] text-slate-500 mt-0.5">{job.location} &bull; {job.stipend}</div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {job.tags.map((t, i) => (
                        <span key={i} className="text-[9px] px-1.5 py-0.2 rounded bg-white border border-slate-200 text-slate-600">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const entry = saveFormSubmission({
                        pageSource: 'students',
                        pageLabel: 'Student Career & Support',
                        formTitle: 'Placement Drive Application & Profile Submission',
                        senderName: studentProfile.name,
                        senderEmail: 'ananya.sharma@example.com',
                        senderPhone: '+91 98450 12345',
                        organizationOrCollege: studentProfile.course,
                        subject: `Job Application: ${job.role} at ${job.company}`,
                        message: `Student ${studentProfile.name} applied for ${job.role} at ${job.company} (${job.location}). Registered batch: ${studentProfile.batch}. Course Attendance: ${studentProfile.attendancePercent}%. Average Academic Score: ${studentProfile.avgScore}%.`,
                        formData: {
                          candidateName: studentProfile.name,
                          regNumber: studentProfile.regNumber,
                          course: studentProfile.course,
                          batch: studentProfile.batch,
                          targetCompany: job.company,
                          targetRole: job.role,
                          location: job.location,
                          stipend: job.stipend,
                          attendancePercent: `${studentProfile.attendancePercent}%`,
                          submittedAt: new Date().toISOString(),
                        },
                        status: 'New',
                        priority: 'High',
                        notes: `Placement application submitted from Student Portal for ${job.company}. Review verified academic records and arrange interview schedule.`,
                      });
                      showNotice(`Application ${entry.id} dispatched! Profile submitted for ${job.role} at ${job.company}. Logged in Admin Governance.`);
                    }}
                    className="mt-4 w-full py-1.5 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-2xs"
                  >
                    1-Click Apply
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
