import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Edit2,
  Trash2,
  X,
  Filter,
  Check,
  AlertTriangle,
  FileText,
  Calendar,
  DollarSign,
  Tag,
  Phone,
  Eye,
  RefreshCw,
  Bell,
  Inbox
} from 'lucide-react';
import { AdminFormsManager } from '../components/AdminFormsManager';
import { getStoredFormSubmissions } from '../utils/formStorage';
import { 
  StudentRegistration, 
  PaymentTransaction, 
  CertificateRecord, 
  NotificationLog, 
  Course 
} from '../types';
import { 
  MOCK_REGISTRATIONS, 
  MOCK_PAYMENTS, 
  MOCK_CERTIFICATES, 
  MOCK_NOTIFICATIONS, 
  MOCK_COURSES 
} from '../data/mockDatabase';

interface AdminViewProps {
  onLogout?: () => void;
  onNavigateHome?: () => void;
  adminUser?: {
    name: string;
    email: string;
    role: string;
  };
}

interface OperationalNotice {
  id: string;
  title: string;
  category: 'Admissions' | 'Placement Drive' | 'Infrastructure' | 'Curriculum';
  priority: 'High' | 'Medium' | 'Normal';
  deadline: string;
  assignedTo: string;
  status: 'In Progress' | 'Completed' | 'Pending Review';
}

export const AdminView: React.FC<AdminViewProps> = ({
  onLogout,
  onNavigateHome,
  adminUser = {
    name: 'Dr. R. K. Nambiar',
    email: 'admin@silphor.com',
    role: 'Super Administrator',
  },
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<
    'overview' | 'forms' | 'registrations' | 'payments' | 'courses' | 'certificates' | 'notifications'
  >('forms');

  const [formSubmissionsCount, setFormSubmissionsCount] = useState(() => getStoredFormSubmissions().length);

  useEffect(() => {
    const handleFormUpdate = () => {
      setFormSubmissionsCount(getStoredFormSubmissions().length);
    };
    window.addEventListener('silphor-form-submissions-updated', handleFormUpdate);
    window.addEventListener('silphor-new-form-submission', handleFormUpdate);
    return () => {
      window.removeEventListener('silphor-form-submissions-updated', handleFormUpdate);
      window.removeEventListener('silphor-new-form-submission', handleFormUpdate);
    };
  }, []);

  // LIVE REACTIVE STATE FOR CRUD
  const [registrations, setRegistrations] = useState<StudentRegistration[]>(MOCK_REGISTRATIONS);
  const [payments, setPayments] = useState<PaymentTransaction[]>(MOCK_PAYMENTS);
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [certificates, setCertificates] = useState<CertificateRecord[]>(MOCK_CERTIFICATES);
  const [notifications, setNotifications] = useState<NotificationLog[]>(MOCK_NOTIFICATIONS);

  // Operational notices on Overview Tab
  const [operationalNotices, setOperationalNotices] = useState<OperationalNotice[]>([
    {
      id: 'not-01',
      title: 'Finalize Cadence Innovus 24.1 tool server license renewal for 7nm EDA lab',
      category: 'Infrastructure',
      priority: 'High',
      deadline: '2026-10-05',
      assignedTo: 'Systems Engineering',
      status: 'In Progress',
    },
    {
      id: 'not-02',
      title: 'Schedule Tier-1 Semiconductor Campus Placement Drive for 42 UVM candidates',
      category: 'Placement Drive',
      priority: 'High',
      deadline: '2026-10-18',
      assignedTo: 'Placement Cell',
      status: 'In Progress',
    },
    {
      id: 'not-03',
      title: 'Publish Autumn 2026 Batch timetable and seat confirmation list for Malleswaram center',
      category: 'Admissions',
      priority: 'Medium',
      deadline: '2026-09-30',
      assignedTo: 'Academic Registrar',
      status: 'Completed',
    },
  ]);

  // ACTION TOAST / NOTICE
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // SEARCH & FILTER STATES
  const [regSearch, setRegSearch] = useState('');
  const [regStatusFilter, setRegStatusFilter] = useState('All');

  const [paySearch, setPaySearch] = useState('');
  const [payGatewayFilter, setPayGatewayFilter] = useState('All');

  const [courseSearch, setCourseSearch] = useState('');
  const [courseCategoryFilter, setCourseCategoryFilter] = useState('All');

  const [certSearch, setCertSearch] = useState('');
  const [certGradeFilter, setCertGradeFilter] = useState('All');

  const [notifSearch, setNotifSearch] = useState('');
  const [notifChannelFilter, setNotifChannelFilter] = useState('All');

  // MODAL STATES
  // 1. Registration Modals
  const [regModalOpen, setRegModalOpen] = useState(false);
  const [editingReg, setEditingReg] = useState<StudentRegistration | null>(null);
  const [regForm, setRegForm] = useState<Partial<StudentRegistration>>({});

  // 2. Payment Modals
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [editingPay, setEditingPay] = useState<PaymentTransaction | null>(null);
  const [payForm, setPayForm] = useState<Partial<PaymentTransaction>>({});

  // 3. Course Modals
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseForm, setCourseForm] = useState<Partial<Course>>({});

  // 4. Batch Management Modal
  const [batchModalOpen, setBatchModalOpen] = useState(false);
  const [selectedCourseForBatch, setSelectedCourseForBatch] = useState<Course | null>(null);
  const [newBatchName, setNewBatchName] = useState('');
  const [newBatchDate, setNewBatchDate] = useState('2026-10-15');
  const [newBatchSeats, setNewBatchSeats] = useState(30);
  const [newBatchTrainer, setNewBatchTrainer] = useState('Dr. R. K. Nambiar');

  // 5. Certificate Modals
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificateRecord | null>(null);
  const [certForm, setCertForm] = useState<Partial<CertificateRecord>>({});

  // 6. Notification Modals
  const [notifModalOpen, setNotifModalOpen] = useState(false);
  const [editingNotif, setEditingNotif] = useState<NotificationLog | null>(null);
  const [notifForm, setNotifForm] = useState<Partial<NotificationLog>>({});

  // 7. Notice Modal (Overview)
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<OperationalNotice | null>(null);
  const [noticeForm, setNoticeForm] = useState<Partial<OperationalNotice>>({});

  // 8. Delete Confirmation Modal
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'registration' | 'payment' | 'course' | 'certificate' | 'notification' | 'notice';
    id: string;
    label: string;
  } | null>(null);

  // Dynamic Metrics Derived From State
  const totalRevenue = payments.reduce((acc, p) => p.status === 'Success' ? acc + p.amount : acc, 0);
  const totalEnrolled = registrations.filter(r => r.status === 'Admitted').length;
  const pendingApprovals = registrations.filter(r => r.status !== 'Admitted').length;
  const activeBatchesCount = courses.reduce((acc, c) => acc + c.upcomingBatches.length, 0);

  // ==========================================
  // CRUD HANDLERS: REGISTRATIONS
  // ==========================================
  const handleOpenAddReg = () => {
    setEditingReg(null);
    setRegForm({
      applicationNumber: `SIL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: '',
      email: '',
      mobile: '+91 7829455663',
      collegeOrCompany: '',
      courseTitle: courses[0]?.title || 'Advanced VLSI Design & Physical Implementation',
      batchName: 'Autumn 2026 Cohort A (Weekday Evening)',
      status: 'Admitted',
      paymentStatus: 'Paid',
      amountPaid: 45000,
      totalFee: 45000,
      registrationDate: new Date().toISOString().split('T')[0],
      otpVerified: true,
      documentsUploaded: ['Degree_Certificate.pdf', 'Govt_ID.pdf'],
    });
    setRegModalOpen(true);
  };

  const handleOpenEditReg = (reg: StudentRegistration) => {
    setEditingReg(reg);
    setRegForm({ ...reg });
    setRegModalOpen(true);
  };

  const handleSaveReg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.fullName || !regForm.email) {
      showNotice('Please complete Student Name and Email.');
      return;
    }

    if (editingReg) {
      // Update
      setRegistrations(registrations.map(r => r.id === editingReg.id ? { ...r, ...regForm } as StudentRegistration : r));
      showNotice(`Updated registration for ${regForm.fullName}`);
    } else {
      // Create
      const newEntry: StudentRegistration = {
        id: `reg-${Date.now()}`,
        applicationNumber: regForm.applicationNumber || `SIL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        fullName: regForm.fullName || '',
        email: regForm.email || '',
        mobile: regForm.mobile || '+91 7829455663',
        collegeOrCompany: regForm.collegeOrCompany || 'Independent Candidate',
        courseId: 'crs-vlsi-01',
        courseTitle: regForm.courseTitle || 'Advanced VLSI Design & Physical Implementation',
        batchId: 'batch-01',
        batchName: regForm.batchName || 'Autumn 2026 Cohort A',
        status: (regForm.status as any) || 'Admitted',
        paymentStatus: (regForm.paymentStatus as any) || 'Paid',
        amountPaid: Number(regForm.amountPaid) || 45000,
        totalFee: Number(regForm.totalFee) || 45000,
        documentsUploaded: ['Application_Form.pdf'],
        registrationDate: new Date().toISOString().split('T')[0],
        otpVerified: true,
      };
      setRegistrations([newEntry, ...registrations]);
      showNotice(`Created new student admission: ${newEntry.fullName}`);
    }
    setRegModalOpen(false);
  };

  const handleQuickApprove = (id: string, name: string) => {
    setRegistrations(registrations.map(r => r.id === id ? { ...r, status: 'Admitted' } : r));
    showNotice(`Approved admission for ${name}`);
  };

  // ==========================================
  // CRUD HANDLERS: PAYMENTS
  // ==========================================
  const handleOpenAddPay = () => {
    setEditingPay(null);
    setPayForm({
      transactionId: `pay_rzp_${Math.random().toString(36).substring(2, 9)}`,
      invoiceNumber: `SIL-INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: '',
      courseTitle: courses[0]?.title || 'Advanced VLSI Design & Physical Implementation',
      amount: 45000,
      gateway: 'Razorpay',
      paymentMode: 'UPI',
      status: 'Success',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    });
    setPayModalOpen(true);
  };

  const handleOpenEditPay = (pay: PaymentTransaction) => {
    setEditingPay(pay);
    setPayForm({ ...pay });
    setPayModalOpen(true);
  };

  const handleSavePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payForm.studentName || !payForm.amount) {
      showNotice('Please enter student name and transaction amount.');
      return;
    }

    if (editingPay) {
      setPayments(payments.map(p => p.id === editingPay.id ? { ...p, ...payForm } as PaymentTransaction : p));
      showNotice(`Updated transaction ${payForm.transactionId}`);
    } else {
      const newPay: PaymentTransaction = {
        id: `pay-${Date.now()}`,
        transactionId: payForm.transactionId || `pay_${Date.now()}`,
        applicationNumber: `SIL-APP-${Math.floor(1000 + Math.random() * 9000)}`,
        studentName: payForm.studentName || '',
        courseTitle: payForm.courseTitle || courses[0]?.title || 'VLSI Design',
        amount: Number(payForm.amount) || 0,
        gateway: (payForm.gateway as any) || 'Razorpay',
        paymentMode: (payForm.paymentMode as any) || 'UPI',
        status: (payForm.status as any) || 'Success',
        invoiceNumber: payForm.invoiceNumber || `SIL-INV-${Date.now()}`,
        date: payForm.date || 'Today',
      };
      setPayments([newPay, ...payments]);
      showNotice(`Recorded transaction of ₹${newPay.amount.toLocaleString()} for ${newPay.studentName}`);
    }
    setPayModalOpen(false);
  };

  // ==========================================
  // CRUD HANDLERS: COURSES
  // ==========================================
  const handleOpenAddCourse = () => {
    setEditingCourse(null);
    setCourseForm({
      title: '',
      category: 'VLSI',
      duration: '16 Weeks',
      mode: 'Hybrid',
      level: 'Advanced',
      fee: 45000,
      tagline: 'Comprehensive industry-aligned silicon curriculum',
      overview: 'Hands-on project work with modern EDA tools, tape-out methodologies, and physical implementation.',
      tools: ['Synopsys', 'Cadence Innovus', 'Siemens Calibre'],
      modules: [
        { week: 'Weeks 1-4', title: 'Silicon Fundamentals & RTL', topics: ['Verilog HDL', 'FSM Synthesis'] },
        { week: 'Weeks 5-12', title: 'Physical Design Flow', topics: ['Floorplan', 'Placement', 'CTS', 'Routing'] },
      ],
      upcomingBatches: [
        {
          id: `batch-${Date.now()}`,
          name: 'Autumn 2026 Batch',
          startDate: 'Oct 15, 2026',
          schedule: 'Mon - Fri (6:30 PM - 9:00 PM)',
          seatsTotal: 30,
          seatsFilled: 12,
          trainer: 'Dr. R. K. Nambiar',
        },
      ],
    });
    setCourseModalOpen(true);
  };

  const handleOpenEditCourse = (course: Course) => {
    setEditingCourse(course);
    setCourseForm({ ...course });
    setCourseModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title || !courseForm.fee) {
      showNotice('Please specify course title and fee.');
      return;
    }

    if (editingCourse) {
      setCourses(courses.map(c => c.id === editingCourse.id ? { ...c, ...courseForm } as Course : c));
      showNotice(`Updated course: ${courseForm.title}`);
    } else {
      const newCourse: Course = {
        id: `crs-${Date.now()}`,
        title: courseForm.title || '',
        category: (courseForm.category as any) || 'VLSI',
        duration: courseForm.duration || '16 Weeks',
        mode: (courseForm.mode as any) || 'Hybrid',
        level: (courseForm.level as any) || 'Advanced',
        fee: Number(courseForm.fee) || 35000,
        tagline: courseForm.tagline || '',
        overview: courseForm.overview || '',
        tools: courseForm.tools || ['Cadence', 'Synopsys'],
        modules: courseForm.modules || [],
        upcomingBatches: courseForm.upcomingBatches || [
          {
            id: `batch-${Date.now()}`,
            name: 'Cohort Alpha',
            startDate: 'Nov 01, 2026',
            schedule: 'Weekend Immersion',
            seatsTotal: 25,
            seatsFilled: 5,
            trainer: 'Industry Lead',
          },
        ],
      };
      setCourses([newCourse, ...courses]);
      showNotice(`Created new course: ${newCourse.title}`);
    }
    setCourseModalOpen(false);
  };

  // Course Batch Sub-CRUD
  const handleOpenBatchManager = (course: Course) => {
    setSelectedCourseForBatch(course);
    setNewBatchName(`${course.category} Cohort ${course.upcomingBatches.length + 1}`);
    setBatchModalOpen(true);
  };

  const handleAddBatchToCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseForBatch || !newBatchName) return;

    const newBatch = {
      id: `batch-${Date.now()}`,
      name: newBatchName,
      startDate: newBatchDate,
      schedule: 'Mon-Thu Evening (7:00 PM - 9:30 PM)',
      seatsTotal: Number(newBatchSeats) || 30,
      seatsFilled: 0,
      trainer: newBatchTrainer,
    };

    const updatedCourse = {
      ...selectedCourseForBatch,
      upcomingBatches: [...selectedCourseForBatch.upcomingBatches, newBatch],
    };

    setCourses(courses.map(c => c.id === selectedCourseForBatch.id ? updatedCourse : c));
    setSelectedCourseForBatch(updatedCourse);
    showNotice(`Added new batch "${newBatchName}" to ${selectedCourseForBatch.title}`);
  };

  const handleDeleteBatch = (batchId: string) => {
    if (!selectedCourseForBatch) return;
    const updatedCourse = {
      ...selectedCourseForBatch,
      upcomingBatches: selectedCourseForBatch.upcomingBatches.filter(b => b.id !== batchId),
    };
    setCourses(courses.map(c => c.id === selectedCourseForBatch.id ? updatedCourse : c));
    setSelectedCourseForBatch(updatedCourse);
    showNotice('Batch removed from course.');
  };

  // ==========================================
  // CRUD HANDLERS: CERTIFICATES
  // ==========================================
  const handleOpenAddCert = () => {
    setEditingCert(null);
    setCertForm({
      certificateNumber: `SIL-VLSI-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: '',
      courseTitle: courses[0]?.title || 'Advanced VLSI Design & Physical Implementation',
      issueDate: new Date().toISOString().split('T')[0],
      validUntil: 'Lifetime Verification',
      grade: 'Distinction',
      verificationCode: `0x${Math.random().toString(16).substring(2, 10).toUpperCase()}`,
      authorizedSignatory: 'Dr. R. K. Nambiar (Academic Dean)',
      skillsVerified: ['RTL Design', 'Static Timing Analysis', 'Innovus P&R', 'Calibre DRC/LVS'],
    });
    setCertModalOpen(true);
  };

  const handleOpenEditCert = (cert: CertificateRecord) => {
    setEditingCert(cert);
    setCertForm({ ...cert });
    setCertModalOpen(true);
  };

  const handleSaveCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certForm.studentName || !certForm.certificateNumber) {
      showNotice('Please enter student name and certificate number.');
      return;
    }

    if (editingCert) {
      setCertificates(certificates.map(c => c.certificateNumber === editingCert.certificateNumber ? { ...c, ...certForm } as CertificateRecord : c));
      showNotice(`Updated certificate for ${certForm.studentName}`);
    } else {
      const newCert: CertificateRecord = {
        certificateNumber: certForm.certificateNumber || `SIL-${Date.now()}`,
        studentName: certForm.studentName || '',
        courseTitle: certForm.courseTitle || courses[0]?.title || 'VLSI Design',
        issueDate: certForm.issueDate || new Date().toISOString().split('T')[0],
        validUntil: 'Lifetime Verification',
        grade: (certForm.grade as any) || 'Distinction',
        verificationCode: certForm.verificationCode || `0x${Math.random().toString(16).substring(2, 10).toUpperCase()}`,
        authorizedSignatory: certForm.authorizedSignatory || 'Dr. R. K. Nambiar (Dean)',
        skillsVerified: certForm.skillsVerified || ['Physical Design', 'Verilog HDL'],
      };
      setCertificates([newCert, ...certificates]);
      showNotice(`Authorized & issued certificate ${newCert.certificateNumber} for ${newCert.studentName}`);
    }
    setCertModalOpen(false);
  };

  // ==========================================
  // CRUD HANDLERS: NOTIFICATIONS
  // ==========================================
  const handleOpenAddNotif = () => {
    setEditingNotif(null);
    setNotifForm({
      type: 'Email',
      recipient: 'All Enrolled Students',
      subjectOrPreview: '',
      eventTrigger: 'Class Reminder',
      status: 'Delivered',
      timestamp: 'Just now',
    });
    setNotifModalOpen(true);
  };

  const handleOpenEditNotif = (notif: NotificationLog) => {
    setEditingNotif(notif);
    setNotifForm({ ...notif });
    setNotifModalOpen(true);
  };

  const handleSaveNotif = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifForm.subjectOrPreview) {
      showNotice('Please enter the broadcast message subject or preview.');
      return;
    }

    if (editingNotif) {
      setNotifications(notifications.map(n => n.id === editingNotif.id ? { ...n, ...notifForm } as NotificationLog : n));
      showNotice('Updated communication log.');
    } else {
      const newNotif: NotificationLog = {
        id: `notif-${Date.now()}`,
        type: (notifForm.type as any) || 'Email',
        recipient: notifForm.recipient || 'All Students',
        subjectOrPreview: notifForm.subjectOrPreview || '',
        eventTrigger: (notifForm.eventTrigger as any) || 'Class Reminder',
        status: (notifForm.status as any) || 'Delivered',
        timestamp: 'Just now',
      };
      setNotifications([newNotif, ...notifications]);
      showNotice(`Broadcast message transmitted to ${newNotif.recipient}`);
    }
    setNotifModalOpen(false);
  };

  // ==========================================
  // CRUD HANDLERS: OVERVIEW NOTICES
  // ==========================================
  const handleOpenAddNotice = () => {
    setEditingNotice(null);
    setNoticeForm({
      title: '',
      category: 'Admissions',
      priority: 'High',
      deadline: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      assignedTo: 'Governance Team',
      status: 'In Progress',
    });
    setNoticeModalOpen(true);
  };

  const handleOpenEditNotice = (n: OperationalNotice) => {
    setEditingNotice(n);
    setNoticeForm({ ...n });
    setNoticeModalOpen(true);
  };

  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeForm.title) {
      showNotice('Please enter the directive title.');
      return;
    }

    if (editingNotice) {
      setOperationalNotices(operationalNotices.map(o => o.id === editingNotice.id ? { ...o, ...noticeForm } as OperationalNotice : o));
      showNotice('Directive updated.');
    } else {
      const newNotice: OperationalNotice = {
        id: `notice-${Date.now()}`,
        title: noticeForm.title || '',
        category: (noticeForm.category as any) || 'Admissions',
        priority: (noticeForm.priority as any) || 'High',
        deadline: noticeForm.deadline || new Date().toISOString().split('T')[0],
        assignedTo: noticeForm.assignedTo || 'Operations Team',
        status: (noticeForm.status as any) || 'In Progress',
      };
      setOperationalNotices([newNotice, ...operationalNotices]);
      showNotice('New operational directive added.');
    }
    setNoticeModalOpen(false);
  };

  // ==========================================
  // GLOBAL DELETE CONFIRMATION HANDLER
  // ==========================================
  const triggerDelete = (
    type: 'registration' | 'payment' | 'course' | 'certificate' | 'notification' | 'notice',
    id: string,
    label: string
  ) => {
    setDeleteTarget({ type, id, label });
    setDeleteConfirmOpen(true);
  };

  const executeDelete = () => {
    if (!deleteTarget) return;
    const { type, id, label } = deleteTarget;

    if (type === 'registration') {
      setRegistrations(registrations.filter(r => r.id !== id));
      showNotice(`Deleted registration: ${label}`);
    } else if (type === 'payment') {
      setPayments(payments.filter(p => p.id !== id));
      showNotice(`Voided/Deleted transaction: ${label}`);
    } else if (type === 'course') {
      setCourses(courses.filter(c => c.id !== id));
      showNotice(`Removed course: ${label}`);
    } else if (type === 'certificate') {
      setCertificates(certificates.filter(c => c.certificateNumber !== id));
      showNotice(`Revoked/Deleted certificate: ${label}`);
    } else if (type === 'notification') {
      setNotifications(notifications.filter(n => n.id !== id));
      showNotice(`Removed notification log: ${label}`);
    } else if (type === 'notice') {
      setOperationalNotices(operationalNotices.filter(o => o.id !== id));
      showNotice(`Dismissed notice: ${label}`);
    }

    setDeleteConfirmOpen(false);
    setDeleteTarget(null);
  };

  // Filtered queries
  const filteredRegs = registrations.filter(r => {
    const matchesSearch = 
      r.fullName.toLowerCase().includes(regSearch.toLowerCase()) ||
      r.applicationNumber.toLowerCase().includes(regSearch.toLowerCase()) ||
      r.email.toLowerCase().includes(regSearch.toLowerCase()) ||
      r.courseTitle.toLowerCase().includes(regSearch.toLowerCase());
    const matchesStatus = regStatusFilter === 'All' || r.status === regStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredPayments = payments.filter(p => {
    const matchesSearch = 
      p.studentName.toLowerCase().includes(paySearch.toLowerCase()) ||
      p.transactionId.toLowerCase().includes(paySearch.toLowerCase()) ||
      p.invoiceNumber.toLowerCase().includes(paySearch.toLowerCase());
    const matchesGateway = payGatewayFilter === 'All' || p.gateway === payGatewayFilter;
    return matchesSearch && matchesGateway;
  });

  const filteredCourses = courses.filter(c => {
    const matchesSearch = 
      c.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
      c.overview.toLowerCase().includes(courseSearch.toLowerCase());
    const matchesCategory = courseCategoryFilter === 'All' || c.category === courseCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredCerts = certificates.filter(c => {
    const matchesSearch = 
      c.studentName.toLowerCase().includes(certSearch.toLowerCase()) ||
      c.certificateNumber.toLowerCase().includes(certSearch.toLowerCase()) ||
      c.courseTitle.toLowerCase().includes(certSearch.toLowerCase());
    const matchesGrade = certGradeFilter === 'All' || c.grade === certGradeFilter;
    return matchesSearch && matchesGrade;
  });

  const filteredNotifs = notifications.filter(n => {
    const matchesSearch = 
      n.subjectOrPreview.toLowerCase().includes(notifSearch.toLowerCase()) ||
      n.recipient.toLowerCase().includes(notifSearch.toLowerCase());
    const matchesChannel = notifChannelFilter === 'All' || n.type === notifChannelFilter;
    return matchesSearch && matchesChannel;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* HEADER BAR */}
      <div className="bg-[#0B2545] rounded-3xl p-6 sm:p-8 text-white border border-[#00828A]/40 shadow-xl flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00828A]" />
            <span>Master Governance Console // Role: {adminUser?.role || 'Super Administrator'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Administrative Management & Operations Portal
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Full CRUD governance across admissions, payment gateways, curriculum catalogs, active cohorts, signed credentials, and multi-channel student broadcasts.
          </p>
        </div>

        {/* User profile & Actions */}
        <div className="flex items-center flex-wrap gap-3">
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2 text-right">
            <div className="text-xs font-bold text-white flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{adminUser?.name || 'Administrator'}</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">{adminUser?.email || 'admin@silphor.com'}</div>
          </div>

          {onNavigateHome && (
            <button
              onClick={onNavigateHome}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all cursor-pointer"
            >
              Public Site
            </button>
          )}

          {onLogout && (
            <button
              onClick={onLogout}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-sm cursor-pointer"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>

      {/* Action Notification Banner */}
      {actionNotice && (
        <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs font-semibold flex items-center justify-between shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00828A]" />
            <span>{actionNotice}</span>
          </div>
          <button
            onClick={() => setActionNotice(null)}
            className="text-teal-700 hover:text-teal-900 text-xs underline font-bold cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ADMIN NAVIGATION TABS */}
      <div className="flex border-b border-slate-200 bg-white rounded-xl px-4 shadow-2xs overflow-x-auto">
        {[
          { id: 'overview', label: 'Dashboard & Directives', icon: BarChart3 },
          { id: 'forms', label: `Form Inquiries by Page Section (${formSubmissionsCount})`, icon: Inbox },
          { id: 'registrations', label: `Registrations (${registrations.length})`, icon: Users },
          { id: 'payments', label: `Transactions (${payments.length})`, icon: CreditCard },
          { id: 'courses', label: `Courses & Batches (${courses.length})`, icon: BookOpen },
          { id: 'certificates', label: `Certificates (${certificates.length})`, icon: Award },
          { id: 'notifications', label: `Broadcasts (${notifications.length})`, icon: Mail },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
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

      {/* ========================================================= */}
      {/* TAB 1: OVERVIEW & DIRECTIVES (CRUD FOR NOTICES & LIVE KPIS) */}
      {/* ========================================================= */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-8">
          {/* Dynamic KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Enrolled Students</span>
              <div className="text-2xl font-extrabold text-[#0B2545] font-mono mt-1">{totalEnrolled}</div>
              <span className="text-[11px] text-emerald-600 font-semibold">{pendingApprovals} pending review</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Reconciled Tuition Revenue</span>
              <div className="text-2xl font-extrabold text-[#00828A] font-mono mt-1">
                ₹{totalRevenue.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-500">From {payments.length} verified txns</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Course Batches</span>
              <div className="text-2xl font-extrabold text-amber-600 font-mono mt-1">{activeBatchesCount} Cohorts</div>
              <span className="text-[11px] text-slate-500">Across {courses.length} active courses</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Certified Alumni</span>
              <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">{certificates.length}</div>
              <span className="text-[11px] text-slate-500">QR Cryptographic verification</span>
            </div>
          </div>

          {/* Operational Directives Board (CRUD) */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#00828A]" />
                  <span>Administrative Strategic Directives & Operational Board</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Track, create, edit, and fulfill corporate priorities across admissions, infrastructure, and hiring drives.
                </p>
              </div>
              <button
                onClick={handleOpenAddNotice}
                className="px-3.5 py-2 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Strategic Directive</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {operationalNotices.map((notice) => (
                <div
                  key={notice.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-wrap items-center justify-between gap-4 bg-slate-50/50"
                >
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        notice.priority === 'High' 
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {notice.priority} Priority
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">[{notice.category}]</span>
                      <span className="text-[11px] text-slate-500">Assigned: <strong>{notice.assignedTo}</strong></span>
                    </div>
                    <div className="text-xs font-bold text-slate-800 leading-snug">{notice.title}</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-2">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>Target Date: {notice.deadline}</span>
                      <span>&bull;</span>
                      <span className={`font-semibold ${notice.status === 'Completed' ? 'text-emerald-600' : 'text-sky-600'}`}>
                        {notice.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditNotice(notice)}
                      className="p-1.5 text-slate-500 hover:text-[#00828A] hover:bg-white rounded-lg border border-slate-200 cursor-pointer"
                      title="Edit Directive"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => triggerDelete('notice', notice.id, notice.title)}
                      className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-white rounded-lg border border-slate-200 cursor-pointer"
                      title="Delete Directive"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB: FORM INQUIRIES & REQUISITIONS BY PAGE (ALL DEVICES) */}
      {/* ========================================================= */}
      {activeAdminTab === 'forms' && (
        <AdminFormsManager onNotify={showNotice} />
      )}

      {/* ========================================================= */}
      {/* TAB 2: STUDENT REGISTRATIONS (FULL CRUD) */}
      {/* ========================================================= */}
      {activeAdminTab === 'registrations' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">Student Course Applications & Admissions</h3>
              <p className="text-xs text-slate-500">Review documents, approve enrollments, edit candidate records, or create new admissions.</p>
            </div>
            <button
              onClick={handleOpenAddReg}
              className="px-3.5 py-2 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Admission</span>
            </button>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={regSearch}
                onChange={(e) => setRegSearch(e.target.value)}
                placeholder="Search by student name, email, application #, or course..."
                className="w-full pl-9 pr-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#00828A]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Status:</span>
              <select
                value={regStatusFilter}
                onChange={(e) => setRegStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#00828A]"
              >
                <option value="All">All Statuses ({registrations.length})</option>
                <option value="Admitted">Admitted</option>
                <option value="Document Verified">Document Verified</option>
                <option value="Application Received">Application Received</option>
              </select>
            </div>
          </div>

          {/* Registrations Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">App Number</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Course & Cohort</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Tuition Fee</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRegs.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-50/60 transition-colors">
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
                      <div className="font-mono text-[10px]">{reg.mobile}</div>
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
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        reg.status === 'Admitted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {reg.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {reg.status !== 'Admitted' && (
                          <button
                            onClick={() => handleQuickApprove(reg.id, reg.fullName)}
                            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-semibold cursor-pointer"
                            title="Quick Approve"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenEditReg(reg)}
                          className="p-1.5 text-slate-600 hover:text-[#00828A] hover:bg-slate-100 rounded-lg cursor-pointer"
                          title="Edit Student Record"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => triggerDelete('registration', reg.id, reg.fullName)}
                          className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                          title="Delete Student Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: PAYMENTS RECONCILIATION AUDIT (FULL CRUD) */}
      {/* ========================================================= */}
      {activeAdminTab === 'payments' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">Payment Gateway Reconciliation Audit</h3>
              <p className="text-xs text-slate-500">Live webhook transactions across Razorpay, Cashfree, PayU, and PhonePe gateways.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => showNotice('Export Complete: Reconciled transactions CSV generated and downloaded.')}
                className="px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={handleOpenAddPay}
                className="px-3.5 py-2 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Record Transaction</span>
              </button>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={paySearch}
                onChange={(e) => setPaySearch(e.target.value)}
                placeholder="Search by student, transaction ID, or invoice..."
                className="w-full pl-9 pr-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#00828A]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Gateway:</span>
              <select
                value={payGatewayFilter}
                onChange={(e) => setPayGatewayFilter(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#00828A]"
              >
                <option value="All">All Gateways</option>
                <option value="Razorpay">Razorpay</option>
                <option value="Cashfree">Cashfree</option>
                <option value="PhonePe">PhonePe</option>
                <option value="PayU">PayU</option>
              </select>
            </div>
          </div>

          {/* Payments Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Transaction ID</th>
                  <th className="p-3">Invoice No</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Gateway & Mode</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPayments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-50/60 font-mono">
                    <td className="p-3 font-bold text-[#0B2545]">{pay.transactionId}</td>
                    <td className="p-3 text-slate-600">{pay.invoiceNumber}</td>
                    <td className="p-3 font-sans font-bold text-slate-800">{pay.studentName}</td>
                    <td className="p-3 font-sans font-semibold text-slate-700">
                      <div>{pay.gateway}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{pay.paymentMode}</div>
                    </td>
                    <td className="p-3 font-bold text-[#00828A]">₹{pay.amount.toLocaleString()}</td>
                    <td className="p-3 font-sans">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        pay.status === 'Success'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {pay.status}
                      </span>
                    </td>
                    <td className="p-3 font-sans text-slate-500 text-[11px]">{pay.date}</td>
                    <td className="p-3 font-sans text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditPay(pay)}
                          className="p-1.5 text-slate-600 hover:text-[#00828A] hover:bg-slate-100 rounded-lg cursor-pointer"
                          title="Edit Transaction"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => triggerDelete('payment', pay.id, pay.transactionId)}
                          className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                          title="Void / Delete Transaction"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: COURSES & BATCHES CATALOG (FULL CRUD) */}
      {/* ========================================================= */}
      {activeAdminTab === 'courses' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">Course Catalog & Cohorts Management</h3>
              <p className="text-xs text-slate-500">Configure curriculum modules, trainers, seat capacity, fees, and launch new batches.</p>
            </div>
            <button
              onClick={handleOpenAddCourse}
              className="px-3.5 py-2 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Course</span>
            </button>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                placeholder="Search courses by title or curriculum topics..."
                className="w-full pl-9 pr-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#00828A]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Category:</span>
              <select
                value={courseCategoryFilter}
                onChange={(e) => setCourseCategoryFilter(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#00828A]"
              >
                <option value="All">All Categories</option>
                <option value="VLSI">VLSI</option>
                <option value="Embedded">Embedded</option>
                <option value="PCB">PCB</option>
                <option value="Power Electronics">Power Electronics</option>
              </select>
            </div>
          </div>

          {/* Courses List */}
          <div className="space-y-3">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all flex flex-wrap items-center justify-between gap-4 bg-slate-50/40"
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-[#00828A] border border-teal-200">
                      {course.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{course.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1">{course.tagline || course.overview}</p>
                  <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-3">
                    <span>Duration: <strong>{course.duration}</strong></span>
                    <span>&bull;</span>
                    <span>Mode: <strong>{course.mode}</strong></span>
                    <span>&bull;</span>
                    <span className="font-mono font-bold text-[#00828A]">Fee: ₹{course.fee.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => handleOpenBatchManager(course)}
                    className="px-3 py-1.5 border border-teal-300 bg-teal-50/60 hover:bg-teal-100 text-[#00828A] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{course.upcomingBatches.length} Batches</span>
                    <Plus className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleOpenEditCourse(course)}
                    className="p-2 text-slate-600 hover:text-[#00828A] hover:bg-white rounded-xl border border-slate-200 cursor-pointer"
                    title="Edit Course"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => triggerDelete('course', course.id, course.title)}
                    className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-slate-200 cursor-pointer"
                    title="Delete Course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: CERTIFICATES MANAGEMENT (FULL CRUD) */}
      {/* ========================================================= */}
      {activeAdminTab === 'certificates' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">Credential Registry & Certificate Authority</h3>
              <p className="text-xs text-slate-500">Authorize, issue, modify, and revoke cryptographically signed student credentials.</p>
            </div>
            <button
              onClick={handleOpenAddCert}
              className="px-3.5 py-2 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Issue New Certificate</span>
            </button>
          </div>

          {/* Search & Grade Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={certSearch}
                onChange={(e) => setCertSearch(e.target.value)}
                placeholder="Search by student name, cert number, or course..."
                className="w-full pl-9 pr-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#00828A]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Grade:</span>
              <select
                value={certGradeFilter}
                onChange={(e) => setCertGradeFilter(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#00828A]"
              >
                <option value="All">All Grades</option>
                <option value="Distinction">Distinction</option>
                <option value="A+ Grade">A+ Grade</option>
                <option value="A Grade">A Grade</option>
              </select>
            </div>
          </div>

          {/* Certificates Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Certificate Number</th>
                  <th className="p-3">Student Legal Name</th>
                  <th className="p-3">Course Title</th>
                  <th className="p-3">Grade Awarded</th>
                  <th className="p-3">Issue Date</th>
                  <th className="p-3">Verification Hash</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCerts.map((cert) => (
                  <tr key={cert.certificateNumber} className="hover:bg-slate-50/60">
                    <td className="p-3 font-mono font-bold text-[#0B2545]">{cert.certificateNumber}</td>
                    <td className="p-3 font-bold text-slate-900">{cert.studentName}</td>
                    <td className="p-3 font-semibold text-slate-700">{cert.courseTitle}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {cert.grade}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500">{cert.issueDate}</td>
                    <td className="p-3 font-mono text-[10px] text-slate-500">{cert.verificationCode}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditCert(cert)}
                          className="p-1.5 text-slate-600 hover:text-[#00828A] hover:bg-slate-100 rounded-lg cursor-pointer"
                          title="Edit Certificate Details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => triggerDelete('certificate', cert.certificateNumber, `${cert.studentName} (${cert.certificateNumber})`)}
                          className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                          title="Revoke / Delete Certificate"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 6: NOTIFICATIONS & BROADCASTS (FULL CRUD) */}
      {/* ========================================================= */}
      {activeAdminTab === 'notifications' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">Automated Communications & Multi-Channel Broadcasts</h3>
              <p className="text-xs text-slate-500">Dispatch, schedule, edit, or archive multi-channel alerts (Email, SMS, WhatsApp, In-App).</p>
            </div>
            <button
              onClick={handleOpenAddNotif}
              className="px-3.5 py-2 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Compose Broadcast</span>
            </button>
          </div>

          {/* Search & Channel Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={notifSearch}
                onChange={(e) => setNotifSearch(e.target.value)}
                placeholder="Search broadcast subject or recipient audience..."
                className="w-full pl-9 pr-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#00828A]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Channel:</span>
              <select
                value={notifChannelFilter}
                onChange={(e) => setNotifChannelFilter(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#00828A]"
              >
                <option value="All">All Channels</option>
                <option value="Email">Email</option>
                <option value="SMS">SMS Gateway</option>
                <option value="In-App">In-App Push</option>
              </select>
            </div>
          </div>

          {/* Notifications Log List */}
          <div className="space-y-2.5">
            {filteredNotifs.map((n) => (
              <div
                key={n.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-wrap items-center justify-between gap-4 bg-slate-50/50 text-xs"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-800">
                      {n.type}
                    </span>
                    <span className="font-bold text-[#0B2545]">{n.recipient}</span>
                    <span className="text-slate-400 font-mono text-[10px]">&bull; {n.eventTrigger}</span>
                  </div>
                  <div className="font-semibold text-slate-800 text-xs">{n.subjectOrPreview}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{n.timestamp}</div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    n.status === 'Delivered'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {n.status}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditNotif(n)}
                      className="p-1.5 text-slate-500 hover:text-[#00828A] hover:bg-white rounded-lg border border-slate-200 cursor-pointer"
                      title="Edit Log / Message"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => triggerDelete('notification', n.id, n.subjectOrPreview)}
                      className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-white rounded-lg border border-slate-200 cursor-pointer"
                      title="Delete Log Entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 1: REGISTRATION ADD / EDIT MODAL */}
      {/* ========================================================= */}
      {regModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-display">
                {editingReg ? 'Edit Student Admission Record' : 'Create New Student Admission'}
              </h3>
              <button onClick={() => setRegModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveReg} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={regForm.fullName || ''}
                    onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={regForm.email || ''}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                    placeholder="student@silphor.com"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mobile Contact</label>
                  <input
                    type="tel"
                    value={regForm.mobile || ''}
                    onChange={(e) => setRegForm({ ...regForm, mobile: e.target.value })}
                    placeholder="+91 7829455663"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">College / Organization</label>
                  <input
                    type="text"
                    value={regForm.collegeOrCompany || ''}
                    onChange={(e) => setRegForm({ ...regForm, collegeOrCompany: e.target.value })}
                    placeholder="RV College of Engineering"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Enrolled Course</label>
                <select
                  value={regForm.courseTitle || ''}
                  onChange={(e) => setRegForm({ ...regForm, courseTitle: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tuition Paid (₹)</label>
                  <input
                    type="number"
                    value={regForm.amountPaid || 0}
                    onChange={(e) => setRegForm({ ...regForm, amountPaid: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Payment Status</label>
                  <select
                    value={regForm.paymentStatus || 'Paid'}
                    onChange={(e) => setRegForm({ ...regForm, paymentStatus: e.target.value as any })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Partial">Partial</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Admission Status</label>
                  <select
                    value={regForm.status || 'Admitted'}
                    onChange={(e) => setRegForm({ ...regForm, status: e.target.value as any })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="Admitted">Admitted</option>
                    <option value="Document Verified">Document Verified</option>
                    <option value="Application Received">Application Received</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setRegModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00828A] hover:bg-[#007077] text-white font-bold cursor-pointer"
                >
                  {editingReg ? 'Save Changes' : 'Confirm Admission'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: PAYMENT TRANSACTION ADD / EDIT MODAL */}
      {/* ========================================================= */}
      {payModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-display">
                {editingPay ? 'Edit Reconciled Payment Transaction' : 'Record Manual / Gateway Transaction'}
              </h3>
              <button onClick={() => setPayModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePay} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Student Name *</label>
                  <input
                    type="text"
                    required
                    value={payForm.studentName || ''}
                    onChange={(e) => setPayForm({ ...payForm, studentName: e.target.value })}
                    placeholder="Candidate Name"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Transaction ID *</label>
                  <input
                    type="text"
                    required
                    value={payForm.transactionId || ''}
                    onChange={(e) => setPayForm({ ...payForm, transactionId: e.target.value })}
                    placeholder="pay_rzp_..."
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    value={payForm.amount || 0}
                    onChange={(e) => setPayForm({ ...payForm, amount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Invoice Number</label>
                  <input
                    type="text"
                    value={payForm.invoiceNumber || ''}
                    onChange={(e) => setPayForm({ ...payForm, invoiceNumber: e.target.value })}
                    placeholder="SIL-INV-2026-..."
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Gateway</label>
                  <select
                    value={payForm.gateway || 'Razorpay'}
                    onChange={(e) => setPayForm({ ...payForm, gateway: e.target.value as any })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="Razorpay">Razorpay</option>
                    <option value="Cashfree">Cashfree</option>
                    <option value="PhonePe">PhonePe</option>
                    <option value="PayU">PayU</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Payment Status</label>
                  <select
                    value={payForm.status || 'Success'}
                    onChange={(e) => setPayForm({ ...payForm, status: e.target.value as any })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="Success">Success (Settled)</option>
                    <option value="Failed">Failed</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Course Reference</label>
                <select
                  value={payForm.courseTitle || ''}
                  onChange={(e) => setPayForm({ ...payForm, courseTitle: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setPayModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00828A] hover:bg-[#007077] text-white font-bold cursor-pointer"
                >
                  {editingPay ? 'Update Transaction' : 'Record Transaction'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: COURSE ADD / EDIT MODAL */}
      {/* ========================================================= */}
      {courseModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-display">
                {editingCourse ? 'Edit Course Curriculum & Specs' : 'Create New Silicon Engineering Course'}
              </h3>
              <button onClick={() => setCourseModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  value={courseForm.title || ''}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  placeholder="e.g. Physical Design & Signoff 7nm"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={courseForm.category || 'VLSI'}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value as any })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="VLSI">VLSI</option>
                    <option value="Embedded">Embedded</option>
                    <option value="PCB">PCB</option>
                    <option value="Power Electronics">Power Electronics</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Duration</label>
                  <input
                    type="text"
                    value={courseForm.duration || '16 Weeks'}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                    placeholder="24 Weeks (6 Months)"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tuition Fee (₹) *</label>
                  <input
                    type="number"
                    required
                    value={courseForm.fee || 0}
                    onChange={(e) => setCourseForm({ ...courseForm, fee: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Delivery Mode</label>
                  <select
                    value={courseForm.mode || 'Hybrid'}
                    onChange={(e) => setCourseForm({ ...courseForm, mode: e.target.value as any })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="Hybrid">Hybrid (Lab + Online)</option>
                    <option value="Classroom Lab">Classroom Lab</option>
                    <option value="Online Live">Online Live</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Level</label>
                  <select
                    value={courseForm.level || 'Advanced'}
                    onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value as any })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="Advanced">Advanced (Post-Grad / Pro)</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Beginner">Beginner</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Brief Description / Tagline</label>
                <textarea
                  rows={3}
                  value={courseForm.tagline || ''}
                  onChange={(e) => setCourseForm({ ...courseForm, tagline: e.target.value })}
                  placeholder="Comprehensive RTL to GDSII flow covering Synthesis, Floorplanning, CTS, Routing..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCourseModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00828A] hover:bg-[#007077] text-white font-bold cursor-pointer"
                >
                  {editingCourse ? 'Save Changes' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: BATCH MANAGER SUB-MODAL */}
      {/* ========================================================= */}
      {batchModalOpen && selectedCourseForBatch && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Manage Cohort Batches
                </h3>
                <p className="text-xs text-slate-500">{selectedCourseForBatch.title}</p>
              </div>
              <button onClick={() => setBatchModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Existing Batches List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Current Scheduled Batches ({selectedCourseForBatch.upcomingBatches.length})
              </h4>
              {selectedCourseForBatch.upcomingBatches.map((b) => (
                <div key={b.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between bg-slate-50 text-xs">
                  <div>
                    <div className="font-bold text-slate-800">{b.name}</div>
                    <div className="text-[11px] text-slate-500">
                      Starts: {b.startDate} &bull; {b.schedule} &bull; Trainer: {b.trainer}
                    </div>
                    <div className="text-[10px] text-teal-700 font-semibold mt-0.5">
                      Seats: {b.seatsFilled} filled / {b.seatsTotal} total capacity
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteBatch(b.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg cursor-pointer"
                    title="Remove Batch"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Batch Form */}
            <form onSubmit={handleAddBatchToCourse} className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-3 text-xs">
              <h4 className="font-bold text-[#00828A]">Launch New Cohort Batch</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Batch / Cohort Name</label>
                  <input
                    type="text"
                    required
                    value={newBatchName}
                    onChange={(e) => setNewBatchName(e.target.value)}
                    placeholder="Autumn 2026 Batch B"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={newBatchDate}
                    onChange={(e) => setNewBatchDate(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Seat Capacity</label>
                  <input
                    type="number"
                    required
                    value={newBatchSeats}
                    onChange={(e) => setNewBatchSeats(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Faculty Lead / Trainer</label>
                  <input
                    type="text"
                    value={newBatchTrainer}
                    onChange={(e) => setNewBatchTrainer(e.target.value)}
                    placeholder="Dr. R. K. Nambiar"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  + Add Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 5: CERTIFICATE ADD / EDIT MODAL */}
      {/* ========================================================= */}
      {certModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-display">
                {editingCert ? 'Edit Verified Student Credential' : 'Issue & Sign New Verified Certificate'}
              </h3>
              <button onClick={() => setCertModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCert} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Student Legal Name *</label>
                <input
                  type="text"
                  required
                  value={certForm.studentName || ''}
                  onChange={(e) => setCertForm({ ...certForm, studentName: e.target.value })}
                  placeholder="e.g. Rahul Verma"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Certificate Number *</label>
                <input
                  type="text"
                  required
                  value={certForm.certificateNumber || ''}
                  onChange={(e) => setCertForm({ ...certForm, certificateNumber: e.target.value })}
                  placeholder="SIL-VLSI-2026-..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Course Title</label>
                <select
                  value={certForm.courseTitle || ''}
                  onChange={(e) => setCertForm({ ...certForm, courseTitle: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Performance Grade</label>
                  <select
                    value={certForm.grade || 'Distinction'}
                    onChange={(e) => setCertForm({ ...certForm, grade: e.target.value as any })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="Distinction">Distinction (Top 5%)</option>
                    <option value="A+ Grade">A+ Grade</option>
                    <option value="A Grade">A Grade</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={certForm.issueDate || ''}
                    onChange={(e) => setCertForm({ ...certForm, issueDate: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCertModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00828A] hover:bg-[#007077] text-white font-bold cursor-pointer"
                >
                  {editingCert ? 'Save Changes' : 'Authorize & Issue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 6: NOTIFICATION ADD / EDIT MODAL */}
      {/* ========================================================= */}
      {notifModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-display">
                {editingNotif ? 'Edit Broadcast Announcement' : 'Compose Multi-Channel Broadcast'}
              </h3>
              <button onClick={() => setNotifModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNotif} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Channel Type</label>
                  <select
                    value={notifForm.type || 'Email'}
                    onChange={(e) => setNotifForm({ ...notifForm, type: e.target.value as any })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="Email">Email</option>
                    <option value="SMS">SMS Gateway</option>
                    <option value="In-App">In-App Push</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Audience</label>
                  <input
                    type="text"
                    required
                    value={notifForm.recipient || ''}
                    onChange={(e) => setNotifForm({ ...notifForm, recipient: e.target.value })}
                    placeholder="e.g. All Students, Autumn Cohort A"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Subject / Header *</label>
                <input
                  type="text"
                  required
                  value={notifForm.subjectOrPreview || ''}
                  onChange={(e) => setNotifForm({ ...notifForm, subjectOrPreview: e.target.value })}
                  placeholder="e.g. Lab Update: Live CTS Simulation shifted to 7:30 PM"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setNotifModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00828A] hover:bg-[#007077] text-white font-bold cursor-pointer"
                >
                  {editingNotif ? 'Update Log' : 'Dispatch Broadcast'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 7: OVERVIEW DIRECTIVE ADD / EDIT MODAL */}
      {/* ========================================================= */}
      {noticeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-display">
                {editingNotice ? 'Edit Operational Directive' : 'Add Strategic Directive'}
              </h3>
              <button onClick={() => setNoticeModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNotice} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Directive Title *</label>
                <input
                  type="text"
                  required
                  value={noticeForm.title || ''}
                  onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                  placeholder="e.g. Expand Cadence Innovus 24.1 cloud nodes"
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={noticeForm.category || 'Admissions'}
                    onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value as any })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="Admissions">Admissions</option>
                    <option value="Placement Drive">Placement Drive</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Curriculum">Curriculum</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Priority</label>
                  <select
                    value={noticeForm.priority || 'High'}
                    onChange={(e) => setNoticeForm({ ...noticeForm, priority: e.target.value as any })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Status</label>
                  <select
                    value={noticeForm.status || 'In Progress'}
                    onChange={(e) => setNoticeForm({ ...noticeForm, status: e.target.value as any })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending Review">Pending Review</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Completion Date</label>
                  <input
                    type="date"
                    value={noticeForm.deadline || ''}
                    onChange={(e) => setNoticeForm({ ...noticeForm, deadline: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Assigned Department</label>
                  <input
                    type="text"
                    value={noticeForm.assignedTo || ''}
                    onChange={(e) => setNoticeForm({ ...noticeForm, assignedTo: e.target.value })}
                    placeholder="Admissions Directorate"
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setNoticeModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00828A] hover:bg-[#007077] text-white font-bold cursor-pointer"
                >
                  {editingNotice ? 'Update Directive' : 'Create Directive'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* GLOBAL DELETE CONFIRMATION DIALOG MODAL */}
      {/* ========================================================= */}
      {deleteConfirmOpen && deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-4 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Confirm Deletion / Revocation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Are you sure you want to permanently remove <strong>{deleteTarget.label}</strong> from the database? This action will update audit trails immediately.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeDelete}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
