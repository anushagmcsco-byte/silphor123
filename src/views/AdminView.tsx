import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  BookOpen, 
  Award, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Plus, 
  Search, 
  Clock, 
  ShieldCheck,
  Building2,
  Send,
  Layers,
  Sparkles
} from 'lucide-react';
import { StudentRegistration, PaymentTransaction, CertificateRecord, NotificationLog } from '../types';
import { 
  MOCK_REGISTRATIONS, 
  MOCK_PAYMENTS, 
  MOCK_CERTIFICATES, 
  MOCK_NOTIFICATIONS, 
  MOCK_COURSES 
} from '../data/mockDatabase';

export const AdminView: React.FC = () => {
  const [activeAdminTab, setActiveAdminTab] = useState<
    'overview' | 'registrations' | 'payments' | 'courses' | 'certificates' | 'notifications'
  >('overview');

  const [registrations, setRegistrations] = useState<StudentRegistration[]>(MOCK_REGISTRATIONS);
  const [payments, setPayments] = useState<PaymentTransaction[]>(MOCK_PAYMENTS);
  const [notifications, setNotifications] = useState<NotificationLog[]>(MOCK_NOTIFICATIONS);

  // New Certificate Issuance State
  const [newCertStudent, setNewCertStudent] = useState('Rahul Verma');
  const [newCertCourse, setNewCertCourse] = useState('RTL Design & SystemVerilog / UVM Verification');
  const [newCertGrade, setNewCertGrade] = useState<'Distinction' | 'A+ Grade' | 'A Grade'>('Distinction');
  const [certIssuedSuccess, setCertIssuedSuccess] = useState(false);

  // Broadcast Message State
  const [broadcastChannel, setBroadcastChannel] = useState<'All Students' | 'Autumn 2026 Batch' | 'Trainers'>('All Students');
  const [broadcastSubject, setBroadcastSubject] = useState('');
  const [broadcastBody, setBroadcastBody] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const totalRevenue = payments.reduce((acc, p) => p.status === 'Success' ? acc + p.amount : acc, 0);

  const handleApproveRegistration = (id: string) => {
    setRegistrations(
      registrations.map((r) => (r.id === id ? { ...r, status: 'Admitted' } : r))
    );
  };

  const handleIssueCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    setCertIssuedSuccess(true);
    setTimeout(() => setCertIssuedSuccess(false), 3000);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastSubject || !broadcastBody) return;
    const newNotif: NotificationLog = {
      id: `notif-${Date.now()}`,
      type: 'Email',
      recipient: broadcastChannel,
      subjectOrPreview: broadcastSubject,
      eventTrigger: 'Class Reminder',
      status: 'Delivered',
      timestamp: 'Just now',
    };
    setNotifications([newNotif, ...notifications]);
    setBroadcastSent(true);
    setBroadcastSubject('');
    setBroadcastBody('');
    setTimeout(() => setBroadcastSent(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* HEADER */}
      <div className="bg-[#0B2545] rounded-3xl p-6 sm:p-8 text-white border border-[#00828A]/40 shadow-xl flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00828A]" />
            <span>Master Governance Console // Role: System Administrator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Administrative Management & Operations Portal
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Full governance across courses, admissions, payment gateways, attendance, certificates, and student communications.
          </p>
        </div>
      </div>

      {/* ADMIN NAVIGATION TABS */}
      <div className="flex border-b border-slate-200 bg-white rounded-xl px-4 shadow-2xs overflow-x-auto">
        {[
          { id: 'overview', label: 'Dashboard & Reports', icon: BarChart3 },
          { id: 'registrations', label: `Registrations (${registrations.length})`, icon: Users },
          { id: 'payments', label: `Transactions (${payments.length})`, icon: CreditCard },
          { id: 'courses', label: 'Course Catalog & Batches', icon: BookOpen },
          { id: 'certificates', label: 'Certificate Management', icon: Award },
          { id: 'notifications', label: 'Notifications & Broadcasts', icon: Mail },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeAdminTab === tab.id
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

      {/* TAB 1: OVERVIEW & REPORTS */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Enrolled Students</span>
              <div className="text-2xl font-extrabold text-[#0B2545] font-mono mt-1">1,850</div>
              <span className="text-[11px] text-emerald-600 font-semibold">+18% this quarter</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Tuition Revenue</span>
              <div className="text-2xl font-extrabold text-[#00828A] font-mono mt-1">
                ₹{totalRevenue.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-500">From verified gateways</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Batches</span>
              <div className="text-2xl font-extrabold text-amber-600 font-mono mt-1">12 Cohorts</div>
              <span className="text-[11px] text-slate-500">VLSI, RTL, PCB, Power</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Placement Success</span>
              <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">94.2%</div>
              <span className="text-[11px] text-slate-500">Across 45+ hiring MNCs</span>
            </div>
          </div>

          {/* Module-wise Registration Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Course-wise Enrollment Distribution</h3>
              <div className="space-y-3">
                {[
                  { course: 'Advanced VLSI Design & Physical Implementation', count: 680, pct: '38%' },
                  { course: 'RTL Design & SystemVerilog / UVM Verification', count: 520, pct: '28%' },
                  { course: 'High-Speed Multilayer PCB Design', count: 340, pct: '18%' },
                  { course: 'Embedded Systems & ARM Cortex-M', count: 210, pct: '11%' },
                  { course: 'Power Electronics & Inverter Design', count: 100, pct: '5%' },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-700">{item.course}</span>
                      <span className="font-mono text-slate-500">{item.count} students ({item.pct})</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-[#00828A]" style={{ width: item.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Payment Gateway Reconciliation</h3>
              <div className="space-y-3 text-xs">
                {[
                  { gateway: 'Razorpay Gateway', count: '₹65,000', txns: '42 Txns', status: 'Active (Instant)' },
                  { gateway: 'Cashfree Payments', count: '₹20,000', txns: '12 Txns', status: 'Active (NetBanking)' },
                  { gateway: 'PhonePe Gateway', count: '₹30,000', txns: '19 Txns', status: 'Active (UPI QR)' },
                  { gateway: 'PayU Corporate', count: '₹15,000', txns: '8 Txns', status: 'Active (Cards)' },
                ].map((gw, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-800">{gw.gateway}</div>
                      <div className="text-[10px] text-slate-500">{gw.txns} &bull; {gw.status}</div>
                    </div>
                    <div className="text-sm font-mono font-bold text-[#0B2545]">{gw.count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STUDENT REGISTRATIONS */}
      {activeAdminTab === 'registrations' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Student Course Applications</h3>
              <p className="text-xs text-slate-500">Review documents, approve enrollments, and verify fee receipts.</p>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">App Number</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Course & Batch</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-50/60">
                    <td className="p-3 font-mono font-bold text-slate-700">{reg.applicationNumber}</td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{reg.fullName}</div>
                      <div className="text-[10px] text-slate-500">{reg.collegeOrCompany}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-slate-800 line-clamp-1">{reg.courseTitle}</div>
                      <div className="text-[10px] text-[#00828A]">{reg.batchName}</div>
                    </td>
                    <td className="p-3 text-[11px] text-slate-600">
                      <div>{reg.email}</div>
                      <div>{reg.mobile}</div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        reg.paymentStatus === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        ₹{reg.amountPaid.toLocaleString()} ({reg.paymentStatus})
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {reg.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {reg.status !== 'Admitted' ? (
                        <button
                          onClick={() => handleApproveRegistration(reg.id)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-semibold"
                        >
                          Approve
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Admitted
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PAYMENTS AUDIT */}
      {activeAdminTab === 'payments' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-slate-900">Payment Gateway Reconciliation Audit</h3>
              <p className="text-xs text-slate-500">Live webhook transactions across Razorpay, Cashfree, PayU, and PhonePe.</p>
            </div>
            <button
              onClick={() => alert('Simulated Export: CSV file of all transaction records downloaded.')}
              className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Transaction ID</th>
                  <th className="p-3">Invoice No</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Gateway</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-50/60 font-mono">
                    <td className="p-3 font-bold text-[#0B2545]">{pay.transactionId}</td>
                    <td className="p-3 text-slate-600">{pay.invoiceNumber}</td>
                    <td className="p-3 font-sans font-bold text-slate-800">{pay.studentName}</td>
                    <td className="p-3 font-sans font-semibold text-slate-700">{pay.gateway}</td>
                    <td className="p-3 font-bold text-[#00828A]">₹{pay.amount.toLocaleString()}</td>
                    <td className="p-3 font-sans">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {pay.status}
                      </span>
                    </td>
                    <td className="p-3 font-sans text-slate-500 text-[11px]">{pay.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: COURSES & BATCHES */}
      {activeAdminTab === 'courses' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-slate-900">Course Catalog & Batches Management</h3>
              <p className="text-xs text-slate-500">Configure curriculum modules, trainers, seat capacity, and fees.</p>
            </div>
            <button
              onClick={() => alert('Simulated Action: Course Creator Form opened.')}
              className="px-3.5 py-2 bg-[#00828A] text-white text-xs font-bold rounded-lg hover:bg-[#007077] flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Course</span>
            </button>
          </div>

          <div className="space-y-3">
            {MOCK_COURSES.map((course) => (
              <div key={course.id} className="p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {course.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{course.title}</h4>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Duration: {course.duration} &bull; Mode: {course.mode} &bull; Fee: ₹{course.fee.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">
                    {course.upcomingBatches.length} Active Batches
                  </span>
                  <button
                    onClick={() => alert(`Configuring batches for ${course.title}`)}
                    className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Manage Batches
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CERTIFICATE MANAGEMENT */}
      {activeAdminTab === 'certificates' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Automatic Certificate Generation & Issuance Engine
            </h3>
            <p className="text-xs text-slate-500">
              Generate tamper-evident certificates with unique registration verification numbers and QR code payloads.
            </p>

            {certIssuedSuccess && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Certificate successfully generated and signed! Verification URL generated.</span>
              </div>
            )}

            <form onSubmit={handleIssueCertificate} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Student Legal Name</label>
                <input
                  type="text"
                  value={newCertStudent}
                  onChange={(e) => setNewCertStudent(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Course Title</label>
                <select
                  value={newCertCourse}
                  onChange={(e) => setNewCertCourse(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                >
                  {MOCK_COURSES.map((c) => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Performance Grade</label>
                <select
                  value={newCertGrade}
                  onChange={(e) => setNewCertGrade(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                >
                  <option value="Distinction">Distinction (Top 5%)</option>
                  <option value="A+ Grade">A+ Grade</option>
                  <option value="A Grade">A Grade</option>
                </select>
              </div>

              <div className="sm:col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs"
                >
                  <Award className="w-4 h-4" />
                  <span>Generate & Authorize Certificate</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 6: NOTIFICATIONS & BROADCASTS */}
      {activeAdminTab === 'notifications' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Send Automated Class Reminders & Broadcast Announcements
            </h3>
            <p className="text-xs text-slate-500">
              Dispatches multi-channel alerts (Email & SMS gateway) directly to enrolled students.
            </p>

            {broadcastSent && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Broadcast message queued and sent via Email/SMS gateway!</span>
              </div>
            )}

            <form onSubmit={handleSendBroadcast} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Target Audience</label>
                  <select
                    value={broadcastChannel}
                    onChange={(e) => setBroadcastChannel(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option>All Students</option>
                    <option>Autumn 2026 Batch</option>
                    <option>Trainers</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Broadcast Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Schedule Update: Live CTS Lab shifted to 7:30 PM"
                    value={broadcastSubject}
                    onChange={(e) => setBroadcastSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Message Content</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter message body to be dispatched to WhatsApp/SMS and Email..."
                  value={broadcastBody}
                  onChange={(e) => setBroadcastBody(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0B2545] hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Broadcast</span>
                </button>
              </div>
            </form>
          </div>

          {/* Log Table */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Recent Communication & Online Gateway Logs
            </h4>
            <div className="space-y-2">
              {notifications.map((n) => (
                <div key={n.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#0B2545]">{n.type} &bull; {n.recipient}:</span>
                    <span className="text-slate-700 ml-2">{n.subjectOrPreview}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-400 font-mono">{n.timestamp}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {n.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
