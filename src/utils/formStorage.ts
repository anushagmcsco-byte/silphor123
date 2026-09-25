import { FormPageSource, FormSubmission } from '../types';

const STORAGE_KEY = 'silphor_admin_form_submissions';

// Initial realistic seed submissions across diverse pages so the admin panel is rich out of the box
export const INITIAL_FORM_SUBMISSIONS: FormSubmission[] = [
  {
    id: 'SUB-2026-0901',
    submissionDate: '2026-09-24T08:15:00.000Z',
    pageSource: 'contact',
    pageLabel: 'Contact Us Page',
    formTitle: 'General & Technical Inquiry',
    senderName: 'Priyadarshini Rao',
    senderEmail: 'priya.rao@aethersilicon.in',
    senderPhone: '+91 98450 22222',
    organizationOrCollege: 'Aether Silicon Systems',
    subject: 'Consultation for EDA Tool Floating Licenses & Academic Bundles',
    message: 'We are expanding our IC physical design team in Bengaluru and require floating seat licenses for Cadence Innovus and Synopsys PrimeTime alongside custom corporate training.',
    formData: {
      division: 'Commercial EDA Tools & Licenses',
      preferredContactMode: 'Email & WhatsApp',
      city: 'Bengaluru',
      budgetRange: '₹15L - ₹35L',
      timeline: 'Within 30 Days',
    },
    status: 'New',
    priority: 'High',
    notes: 'Assign to Field Application Engineer (FAE) team for enterprise proposal generation.',
    assignedStaff: 'Dr. R. K. Nambiar',
  },
  {
    id: 'SUB-2026-0894',
    submissionDate: '2026-09-24T06:30:00.000Z',
    pageSource: 'industry',
    pageLabel: 'Industry Solutions',
    formTitle: 'EDA Tool & Hardware Requisition',
    senderName: 'Rajesh Nair',
    senderEmail: 'rajesh.nair@vedic-semi.com',
    senderPhone: '+91 94480 33411',
    organizationOrCollege: 'Vedic Semiconductor Ltd',
    subject: 'Bulk Requisition for Xilinx UltraScale+ FPGA Development Boards',
    message: 'Urgent requisition for 8 units of Virtex UltraScale+ VCU118 evaluation boards and Vivado ML Enterprise floating licenses for defense radar prototyping.',
    formData: {
      requisitionType: 'FPGA Hardware & Silicon IP',
      productQuantity: '8 units + 10-user floating license',
      procurementType: 'Commercial Enterprise Purchase',
      estimatedBudget: '₹42,00,000',
      expectedDelivery: 'By end of October 2026',
    },
    status: 'In Review',
    priority: 'High',
    notes: 'Quotation draft prepared. Awaiting vendor import customs clearance confirmation.',
    assignedStaff: 'Procurement Cell',
  },
  {
    id: 'SUB-2026-0882',
    submissionDate: '2026-09-23T14:45:00.000Z',
    pageSource: 'engineering-services',
    pageLabel: 'Engineering Services',
    formTitle: 'Silicon Staffing & Turnkey Requirement',
    senderName: 'Vikramaditya Hegde',
    senderEmail: 'v.hegde@qual-micro.com',
    senderPhone: '+91 99001 88722',
    organizationOrCollege: 'QualMicro Design Services',
    subject: 'Staffing Requisition: 5 Physical Design Engineers (7nm FinFET)',
    message: 'Seeking 5 senior Physical Design and Timing Closure engineers with proven experience in Synopsys ICC2 / Innovus for a 6-month turnkey tapeout contract.',
    formData: {
      domain: 'VLSI Design & Physical Implementation',
      roleTitle: 'Senior Physical Design Engineer',
      openPositions: 5,
      experienceRequired: '3-5 Years',
      requiredSkills: 'Innovus, PrimeTime STA, 7nm FinFET, Low Power CTS',
      workLocation: 'Bengaluru (Onsite / Hybrid)',
    },
    status: 'Contacted',
    priority: 'High',
    notes: 'Conducted initial intake call with VP of Engineering. Shortlisted 7 certified Silphor alumni for client interview.',
    assignedStaff: 'Placement & Staffing Wing',
  },
  {
    id: 'SUB-2026-0870',
    submissionDate: '2026-09-23T11:10:00.000Z',
    pageSource: 'projects-internship',
    pageLabel: 'Projects & Internships',
    formTitle: 'IEEE Internship & Academic Project Application',
    senderName: 'Aditya Kulkarni',
    senderEmail: 'aditya.kulkarni@rvce.edu.in',
    senderPhone: '+91 98860 11993',
    organizationOrCollege: 'RV College of Engineering',
    subject: 'Internship Application: RISC-V 5-Stage Pipelined SoC Design with AXI4 Bus',
    message: 'Final year B.Tech ECE student applying for the 6-month industry internship in RTL design. I have basic Verilog experience and desire hands-on tapeout verification experience.',
    formData: {
      degree: 'B.E. in Electronics & Communication',
      graduationYear: '2025',
      cgpa: '8.92 / 10.0',
      domainInterest: 'VLSI & RISC-V SoC Architecture',
      preferredDuration: '6 Months (Full-Time)',
      portfolioUrl: 'https://github.com/aditya-vlsi/riscv-rv32i-core',
    },
    status: 'Action Taken',
    priority: 'Medium',
    notes: 'Technical test link sent via HackerEarth. Scored 88%. Offered internship starting Oct 2026.',
    assignedStaff: 'Academic Dean',
  },
  {
    id: 'SUB-2026-0855',
    submissionDate: '2026-09-22T16:20:00.000Z',
    pageSource: 'registration',
    pageLabel: 'Registration & Admissions',
    formTitle: 'Course Enrolment Application',
    senderName: 'Ananya Sharma',
    senderEmail: 'ananya.sharma@example.com',
    senderPhone: '+91 98450 12345',
    organizationOrCollege: 'BMS College of Engineering',
    subject: 'Course Admission: Advanced VLSI Design & Physical Implementation',
    message: 'Registered for Autumn 2026 cohort with UPI advance deposit. Uploaded degree transcript and Aadhaar document.',
    formData: {
      courseId: 'vlsi-01',
      courseTitle: 'Advanced VLSI Design & Physical Implementation',
      batchId: 'b-vlsi-01-a',
      batchName: 'Autumn Batch 2026 (Mon-Thu 7:00 PM)',
      amountPaid: 15000,
      totalFee: 45000,
      paymentStatus: 'Partial',
      documentsUploaded: ['BTech_Provisional_Degree.pdf', 'Aadhaar_National_ID.pdf'],
    },
    status: 'In Review',
    priority: 'Medium',
    notes: 'Document verification complete. Balance payment invoice generated.',
    assignedStaff: 'Admissions Office',
  },
  {
    id: 'SUB-2026-0840',
    submissionDate: '2026-09-22T09:05:00.000Z',
    pageSource: 'training',
    pageLabel: 'Training & Syllabus',
    formTitle: 'Syllabus Brochure & Course Counseling Request',
    senderName: 'Kavita Sundaram',
    senderEmail: 'kavita.s@pes.edu',
    senderPhone: '+91 97401 55667',
    organizationOrCollege: 'PES University, Ring Road Campus',
    subject: 'Detailed Syllabus & Lab Tool Setup for Embedded Firmware & RTOS',
    message: 'Requesting the detailed week-by-week curriculum for ARM Cortex-M4 and FreeRTOS course, along with EDA hardware kit availability for lab sessions.',
    formData: {
      courseCategory: 'Embedded Systems & RTOS',
      learnerBackground: 'Recent Graduate (ECE)',
      trainingMode: 'Weekend Classroom Lab (Malleswaram)',
      preferredStartDate: 'October 2026',
    },
    status: 'Contacted',
    priority: 'Medium',
    notes: 'Sent PDF syllabus via WhatsApp and arranged 15-min counseling call with lead trainer.',
    assignedStaff: 'Student Counseling',
  },
  {
    id: 'SUB-2026-0831',
    submissionDate: '2026-09-21T15:40:00.000Z',
    pageSource: 'about',
    pageLabel: 'About Us & MoUs',
    formTitle: 'Institutional MoU & Academic Partnership Request',
    senderName: 'Prof. S. R. Balaram',
    senderEmail: 'hod.ece@gitam.edu',
    senderPhone: '+91 98490 77123',
    organizationOrCollege: 'GITAM School of Technology',
    subject: 'MoU Proposal for Setting up VLSI Centre of Excellence (CoE)',
    message: 'Proposal to establish an industry-partnered VLSI semiconductor lab on our campus with tool licenses, student internships, and faculty development workshops.',
    formData: {
      institutionType: 'Deemed to be University / Engineering College',
      studentCapacity: '120 students / year',
      requestedDomains: ['VLSI Digital IC', 'High-Speed PCB Design', 'FPGA Prototyping'],
      proposedTimeline: 'Academic Year 2026-2027',
    },
    status: 'New',
    priority: 'High',
    notes: 'High-value institutional lead. Forward to Director of Academic Alliances.',
    assignedStaff: 'Dr. R. K. Nambiar',
  },
  {
    id: 'SUB-2026-0820',
    submissionDate: '2026-09-21T10:15:00.000Z',
    pageSource: 'privacy-policy',
    pageLabel: 'Privacy & Data Rights',
    formTitle: 'DPDP Act 2023 Data Subject Rights Request',
    senderName: 'Naveen Chandra',
    senderEmail: 'naveen.chandra@alumni.silphor.com',
    senderPhone: '+91 96112 44331',
    organizationOrCollege: 'Silphor Alumni (2024 Batch)',
    subject: 'Request for Summary of Telemetry & Verified Certificate Audit Log',
    message: 'Exercising my Right to Information under Section 11 of the India DPDP Act 2023. Requesting a copy of my stored workstation telemetry records and certificate verifications.',
    formData: {
      requestType: 'Data Access & Export Request',
      registeredStudentId: 'SIL-2024-REG-4102',
      verificationIdUploaded: 'Govt_ID_Naveen.pdf',
    },
    status: 'Action Taken',
    priority: 'Low',
    notes: 'DPO reviewed verification ID. Export package generated and securely emailed to verified address.',
    assignedStaff: 'Data Protection Officer (DPO)',
  },
  {
    id: 'SUB-2026-0810',
    submissionDate: '2026-09-20T17:00:00.000Z',
    pageSource: 'support-widget',
    pageLabel: 'Live Support Helpline',
    formTitle: 'Instant Callback & Technical Assistance Request',
    senderName: 'Deepak Varma',
    senderEmail: 'deepak.v@startupsemi.io',
    senderPhone: '+91 98765 00192',
    organizationOrCollege: 'StartupSemi Hardware Labs',
    subject: 'Quick Callback: EDA Cloud Workstation SSH Access Issue',
    message: 'Need urgent assistance resetting SSH key credentials for 7nm EDA Linux workstation node #04.',
    formData: {
      urgency: 'Immediate (within 30 mins)',
      clientType: 'Corporate Lab Subscriber',
      workstationCluster: 'Bengaluru-Cluster-02',
    },
    status: 'Action Taken',
    priority: 'High',
    notes: 'DevOps team reset SSH key pair and verified login within 15 minutes.',
    assignedStaff: 'Systems Engineering',
  },
  {
    id: 'SUB-2026-0801',
    submissionDate: '2026-09-20T11:30:00.000Z',
    pageSource: 'students',
    pageLabel: 'Students & Placement',
    formTitle: 'Placement Drive Registration & Resume Review',
    senderName: 'Megha Venkatesh',
    senderEmail: 'megha.v@example.com',
    senderPhone: '+91 99800 66221',
    organizationOrCollege: 'Silphor Technologies Training Wing',
    subject: 'Enrolment for Upcoming Qualcomm & Synopsys Campus Drive',
    message: 'Enrolled in VLSI Physical Design batch. Requesting mock technical interview and resume vetting for upcoming Tier-1 semiconductor recruitment drive.',
    formData: {
      batch: 'Summer 2026 Fast-Track',
      primarySkill: 'Static Timing Analysis & Calibre DRC',
      mockInterviewRequested: 'Yes',
      currentAttendance: '94%',
    },
    status: 'Contacted',
    priority: 'Medium',
    notes: 'Mock technical interview scheduled for Saturday 3:00 PM with Senior ASIC Architect.',
    assignedStaff: 'Placement Cell',
  }
];

// Helper to retrieve all stored submissions with fallback to default seeds
export function getStoredFormSubmissions(): FormSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_FORM_SUBMISSIONS));
      return INITIAL_FORM_SUBMISSIONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_FORM_SUBMISSIONS));
    return INITIAL_FORM_SUBMISSIONS;
  } catch (err) {
    console.error('Failed reading form submissions from localStorage:', err);
    return INITIAL_FORM_SUBMISSIONS;
  }
}

// Helper to save a new form submission from any page
export function saveFormSubmission(
  submission: Omit<FormSubmission, 'id' | 'submissionDate' | 'status'> & Partial<FormSubmission>
): FormSubmission {
  const currentList = getStoredFormSubmissions();
  
  const idPrefix = 'SUB-2026-';
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newId = submission.id || `${idPrefix}${randomNum}`;

  const newEntry: FormSubmission = {
    id: newId,
    submissionDate: submission.submissionDate || new Date().toISOString(),
    pageSource: submission.pageSource,
    pageLabel: submission.pageLabel,
    formTitle: submission.formTitle,
    senderName: submission.senderName || 'Anonymous',
    senderEmail: submission.senderEmail || '',
    senderPhone: submission.senderPhone || '',
    organizationOrCollege: submission.organizationOrCollege || '',
    subject: submission.subject || 'Form Inquiry',
    message: submission.message || '',
    formData: submission.formData || {},
    status: submission.status || 'New',
    priority: submission.priority || 'Medium',
    notes: submission.notes || 'Received through website portal form.',
    assignedStaff: submission.assignedStaff || 'Unassigned',
  };

  const updated = [newEntry, ...currentList];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Dispatch custom window event so any active admin view updates in real-time
    window.dispatchEvent(new CustomEvent('silphor-new-form-submission', { detail: newEntry }));
  } catch (err) {
    console.error('Error saving form submission to localStorage:', err);
  }

  return newEntry;
}

// Helper to update a submission's status or notes
export function updateFormSubmission(
  id: string,
  updates: Partial<FormSubmission>
): FormSubmission[] {
  const currentList = getStoredFormSubmissions();
  const updated = currentList.map((item) =>
    item.id === id ? { ...item, ...updates } : item
  );
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('silphor-form-submissions-updated'));
  } catch (err) {
    console.error('Error updating form submission:', err);
  }
  return updated;
}

// Helper to delete a submission
export function deleteStoredFormSubmission(id: string): FormSubmission[] {
  const currentList = getStoredFormSubmissions();
  const updated = currentList.filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('silphor-form-submissions-updated'));
  } catch (err) {
    console.error('Error deleting form submission:', err);
  }
  return updated;
}

// Helper to reset to seed data
export function resetStoredFormSubmissions(): FormSubmission[] {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_FORM_SUBMISSIONS));
    window.dispatchEvent(new CustomEvent('silphor-form-submissions-updated'));
  } catch (err) {
    console.error('Error resetting form submissions:', err);
  }
  return INITIAL_FORM_SUBMISSIONS;
}

// Helper to export submissions to CSV file
export function exportFormSubmissionsCSV(submissions: FormSubmission[]): void {
  const headers = [
    'ID',
    'Date Submitted',
    'Page Source',
    'Page Label',
    'Form Title',
    'Sender Name',
    'Email',
    'Phone',
    'Organization',
    'Subject',
    'Status',
    'Priority',
    'Message',
    'Assigned Staff',
    'Notes',
  ];

  const rows = submissions.map((s) => [
    `"${s.id}"`,
    `"${new Date(s.submissionDate).toLocaleString()}"`,
    `"${s.pageSource}"`,
    `"${s.pageLabel}"`,
    `"${s.formTitle}"`,
    `"${s.senderName.replace(/"/g, '""')}"`,
    `"${s.senderEmail}"`,
    `"${s.senderPhone || ''}"`,
    `"${(s.organizationOrCollege || '').replace(/"/g, '""')}"`,
    `"${(s.subject || '').replace(/"/g, '""')}"`,
    `"${s.status}"`,
    `"${s.priority}"`,
    `"${(s.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    `"${s.assignedStaff || ''}"`,
    `"${(s.notes || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Silphor_Form_Submissions_Export_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
